"use client";
import React, { useEffect } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { VideoResource } from "../entity/VideoResource";
import { UploadButton } from "../shared/UploadButton";
import { getObjectURL, putObject } from "../functions/get_put_url";
import { FabricUitls } from "@/utils/fabric-utils";
import { fabric } from "fabric";

import axios from "axios";
import { getUid } from "@/utils";
import { URL } from "url";

export const VideoResourcesPanel = observer(() => {
  const store = React.useContext(StoreContext);
const init1=async ()=>
{
  try{
store.setVideos([]);
await axios.get(`http://localhost:8000/list_videos`)
.then(async (resolve)=>{
  if(resolve.data.data?.length>0)
  {
    resolve.data.data.forEach(async (ele:any)=>
    {
      const fileid=ele.id;
      const videoid_fileid=ele.id.split(".");
      const filename=ele.video_name;
      const url:string=await getObjectURL(`users/uploads/videos/category/mahashivaratri/${videoid_fileid[0]}`);
      store.addVideoResource({fileid:fileid,filename:filename,filesource:url});
    })
  }
})
.catch((reject)=>{
  console.log(reject);
})
  }
  catch(err)
  {
    console.log(err);
  }
}

/*const init=async ()=>
  {
    try{
    store.setVideos([]);
    await axios.get("https://d2x8kz5mzitaig.cloudfront.net/list_videos").then((resolve)=>
    {
      const result=resolve.data;
      if(result.resolve.Contents?.length>0)
      {
      result.resolve.Contents.forEach(async (ele:any)=>
      {
        const file=ele["Key"];
        const arrfile=file.split('/');
        const filename:string=arrfile[arrfile.length-1];
        const url:string=await getObjectURL(file);
        //console.log({filename:filename,filesource:url})
       store.addVideoResource({filename:filename,filesource:url});
      });
  }
})
    }
  catch(err)
  {
    console.log(err);
  }
  
  }*/

  const handleFileChange =async  (event: React.ChangeEvent<HTMLInputElement>) => {
    try{
    const file = event.target.files?.[0];
    if (!file) return;
    console.log(file.name);
    const formData=new FormData();
    formData.append("newvideo",file)
    await axios.post(`http://localhost:8000/new_video`, formData, { headers: {'Content-Type': 'multipart/form-data'}}).then((resolve)=>
    {
      console.log(resolve);
      init1();
    }).catch((reject)=>
    {
      console.log(reject);
    })
  }
  catch(err)
  {
    console.log(err);
  }
  }
 
 useEffect(()=>
  {
    init1();
  },[])

  return (
    <>
    <div className="w-auto">
      <div className="text-sm px-[16px] pt-[16px] pb-[8px] text-center font-semibold">
    Add Video
      </div>
    {store.videos.map((file, index) => {
          return <VideoResource  key={file["fileid"]} fileid={file["fileid"]} filename={file["filename"]} filesource={file["filesource"]} index={index} />;
    })}
    </div>
    <UploadButton
      accept="video/mp4,video/x-m4v,video/*"
      className="uploadbutton"
      onChange={handleFileChange}/>
      {/* <button onClick={init1}>init1</button> */}
      
     
  </>);
});

