"use client";
import React from "react";
import { StoreContext } from "@/store";
import { formatTimeToMinSec } from "@/utils";
import { observer } from "mobx-react";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";

import axios from "axios";
type AssetsResourceProps = {
  filename:string;
  filesource: string;
  index: number;
};
export const AssetsResource = observer(
  ({filename,filesource, index }: AssetsResourceProps) => {
    const store = React.useContext(StoreContext);
    const ref = React.useRef<HTMLVideoElement>(null);
    const [formatedVideoLength, setFormatedVideoLength] =React.useState("00:00");

    return (
      <div className="rounded-lg overflow-hidden items-center bg-slate-800 m-[15px] flex flex-col relative">
        <div className="bg-[rgba(0,0,0,.25)] text-white py-1 absolute text-base bottom-2 left-2">
          {formatedVideoLength}
          </div>
          <button className="hover:bg-[#00a0f5] bg-[rgba(0,0,0,.25)] rounded z-10 text-white font-bold py-1 absolute text-lg top-2 left-2">
            <IoIosPricetag size={20}/>
          </button>
          <button className="hover:bg-[#00a0f5] bg-[rgba(0,0,0,.25)] rounded z-10 text-white font-bold py-1 absolute text-lg top-2 right-2"
          onClick={() => {}}><MdDelete size={20}/></button>
        <button className="hover:bg-[#00a0f5] bg-[rgba(0,0,0,.25)] rounded z-10 text-white font-bold py-1 absolute text-lg bottom-2 right-2">
          <MdAdd size={20} />
        </button>
        <video
          onLoadedData={() => {
            const videoLength = ref.current?.duration ?? 0;
            setFormatedVideoLength(formatTimeToMinSec(videoLength));
          }}
          crossOrigin="anonymous"
          ref={ref}
          className="max-h-[100px] max-w-[150px]"
          src={filesource}
          height={200}
          width={200}
          id={`video-${index}`}></video>
      </div>
    );
  }
);



