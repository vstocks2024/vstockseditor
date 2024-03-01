"use client";
import { observer } from 'mobx-react';
import React from 'react'
import { IconType } from 'react-icons/lib';
import { StoreContext } from "@/store";
import { LuFlipHorizontal2, LuFlipVertical2 } from 'react-icons/lu';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { isHtmlVideoElement,isHtmlImageElement,isHtmlAudioElement } from '@/utils';

export const Flip = observer(() => {
  const store = React.useContext(StoreContext);
    const [expand,setExpand]=React.useState<boolean>(true);
    const flip_row:IconType[]=[LuFlipHorizontal2 ,LuFlipVertical2];
    const handleFlipHorizontal=()=>{
    if(!store.selectedElement) return ;
      store.setFlipHorizontal(store.selectedElement);
    }

    const handleFlipVertical=()=>{
      if(!store.selectedElement) return ;
      store.setFlipVertical(store.selectedElement);
    }
    
  return (
    <>
       <section onClick={()=>setExpand(!expand)} className={`cursor-pointer font-semibold flex flex-row justify-between items-center text-xs bg-[#151515] pl-3 pr-2 border-black ${expand===true ? "border-none":"border-b-2"}`}>
          <h3>Flip</h3>
          <button ><span>{expand ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
      </section>
      {expand   ? <section className={`cursor-pointer px-2 py-3 border-gray-900 bg-[#202020] ${expand ? "border-b-2":"border-none"}`}>
        <button onClick={handleFlipHorizontal}  className='w-[40px] h-[40px]'>
          <span><LuFlipHorizontal2 className={`cursor-pointer ${store.selectedElement?.placement.flipX===true ?"brightness-200" :"brightness-50"}`} size={24}/></span><span></span><span></span>
        </button>
        <button onClick={handleFlipVertical}  className='w-[40px] h-[40px]'>
          <span><LuFlipVertical2 className={`cursor-pointer ${store.selectedElement?.placement.flipY===true ?"brightness-200" :"brightness-50"}`} size={24}/></span><span></span><span></span>
        </button>
    </section>:null}
    </>
  )
});


