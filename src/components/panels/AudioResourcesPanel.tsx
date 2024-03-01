"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { AudioResource } from "../entity/AudioResource";
import { UploadButton } from "../shared/UploadButton";
import axios from "axios";
import { getObjectURL } from "../functions/get_put_url";

export const AudioResourcesPanel = observer(() => {
  const store = React.useContext(StoreContext);
  const init1=async ()=>
{
  try{
store.setAudios([]);
await axios.get(`https://d38u9dccxrq1p2.cloudfront.net/list_audios`)
.then(async (resolve)=>{
  if(resolve.data.data?.length>0)
  {
    resolve.data.data.forEach(async (ele:any)=>
    {
      const fileid=ele.id;
      const audioid_fileid=ele.id.split(".");
      const filename=ele.audio_name;
      const url:string=await getObjectURL(`users/uploads/audios/category/mahashivaratri/${audioid_fileid[0]}`);
      store.addAudioResource({fileid:fileid,filename:filename,filesource:url});
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
  const handleFileChange =async  (event: React.ChangeEvent<HTMLInputElement>) => {
    try{
    const file = event.target.files?.[0];
    if (!file) return;
    console.log(file.name);
    const formData=new FormData();
    formData.append("newaudio",file)
    await axios.post(`https://d38u9dccxrq1p2.cloudfront.net/new_audio`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
    .then((resolve)=>
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
  return (
    <>
      <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">
        Add Audio
      </div>
      {store.audios.map((audio, index) => {
        return <AudioResource key={`${audio["fileid"]}_${index}`} fileid={audio["fileid"]} filename={audio["filename"]} filesource={audio["filesource"]} index={index} />;
      })}
      <UploadButton
        accept="audio/mp3,audio/*"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-center mx-2 py-2 px-4 rounded"
        onChange={handleFileChange}/>
    </>
  );
});
