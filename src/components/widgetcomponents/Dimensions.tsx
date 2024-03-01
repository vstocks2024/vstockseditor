"use client";
import React from 'react'
import { observer } from 'mobx-react';
import { Element } from '@/components/entity/Element';
import { StoreContext } from "@/store";
import { MdOutlineExpandLess,MdOutlineExpandMore } from 'react-icons/md';

export const Dimensions = observer(() => {
    const [expand,setExpand]=React.useState<boolean>(true);
    return (
      <>
      <section onClick={()=>setExpand(!expand)} className={`cursor-pointer font-semibold flex flex-row justify-between items-center text-xs bg-[#151515] pl-3 pr-2 border-black ${expand===true ? "border-none":"border-b-2"}`}>
          <h3>Dimensions</h3>
          <button ><span>{expand ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
      </section>
      {expand ? <section className={`cursor-pointer px-2 py-3 border-gray-900 bg-[#202020] ${expand ? "border-b-2":"border-none"}`}>
    <div className="flex flex-row w-[226px] h-[34px] gap-2 text-gray-500 font-semibold">
      <div className='flex flex-col'>
        <label className='w-[48px] text-center text-[10px] ' htmlFor='width'>Width</label>
        <input readOnly value={1920} disabled className='bg-transparent text-[12px] border-none text-center w-[48px]'/>
      </div>
      <div className=' flex flex-col'>
        <label className='w-[48px] text-center text-[10px]' htmlFor="height">Height</label>
        <input readOnly value={1080} disabled className='bg-transparent text-[12px] border-none text-center w-[48px]'/>
      </div>
       
    </div>
      </section>:null}
      </>
    
  )
});


