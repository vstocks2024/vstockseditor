"use client";
import React from "react";
import { StoreContext } from "@/store";
import { formatTimeToMinSec } from "@/utils";
import { observer } from "mobx-react";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";

import axios from "axios";
type VideoResourceProps = {
  fileid:string
  filename:string;
  filesource: string;
  index: number;
};
export const VideoResource = observer(
  ({fileid,filename,filesource,index }: VideoResourceProps) => {
    const store = React.useContext(StoreContext);
    const ref = React.useRef<HTMLVideoElement>(null);
    const [formatedVideoLength, setFormatedVideoLength] =React.useState("00:00");

    const handleDeleteButton=async (videoname:string)=>
    {
      try{
      //console.log(videoname);
      await axios.delete(`http://localhost:8000/videos/delete_videos/${videoname}`).then(resolve=>
      {
        console.log(resolve)
      }).catch((err)=>
        {
          console.log(err)
        })
    }
    catch(error:unknown)
    {
      console.log(error);
    }
    }


    return (
      <div className="rounded-lg overflow-hidden items-center bg-slate-800 m-[15px] flex flex-col relative">
        <div className="bg-transparent text-white py-1 absolute  text-sm bottom-2 left-2">
          {formatedVideoLength}
          </div>
          <button className="hover:bg-[#00a0f5]  rounded z-10 text-white font-bold py-1 absolute text-lg top-2 left-2  bg-transparent">
            <IoIosPricetag size={20}/>
          </button>
          <button className="hover:bg-[#00a0f5] rounded z-10 text-white font-bold py-1 absolute text-lg top-2 right-2 bg-transparent"
          onClick={() => {handleDeleteButton(filename)}}><MdDelete size={20}/></button>
        <button
          className="hover:bg-[#00a0f5] bg-transparent rounded z-10 text-white font-bold py-1 absolute text-lg bottom-2 right-2"
          onClick={() => {store.addVideo(fileid,filename,index) }}>
          <MdAdd size={20} />
        </button>
        <video
          onLoadedData={() => {
            const videoLength = ref.current?.duration ?? 0;
            setFormatedVideoLength(formatTimeToMinSec(videoLength));
          }}
          crossOrigin="anonymous"
          ref={ref}
          className="max-h-[100px] max-w-[150px] transition-all"
          src={filesource}
          height={200}
          width={200}
          id={`video-${index}`}
          muted
          onMouseOver={()=>
          {
            ref.current?.play();
          }}
          onMouseOut={()=>
          {
            ref.current?.pause();
          }}
          ></video>
      </div>
    );
  }
);



