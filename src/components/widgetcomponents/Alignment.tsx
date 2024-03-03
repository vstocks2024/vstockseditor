"use client";
import React from 'react'
import { observer } from 'mobx-react';
import { Element } from '@/components/entity/Element';
import { StoreContext } from "@/store";
import { IconType } from 'react-icons/lib';
import {MdOutlineExpandMore,MdOutlineExpandLess, MdAlignHorizontalLeft ,MdAlignHorizontalCenter, MdAlignHorizontalRight ,MdAlignVerticalTop ,MdAlignVerticalCenter ,MdAlignVerticalBottom ,MdVerticalDistribute,MdHorizontalDistribute ,MdLock,MdLockOpen } from "react-icons/md";
import { MdFormatAlignLeft,MdFormatAlignCenter,MdFormatAlignRight,MdFormatAlignJustify } from "react-icons/md";


export const Alignment =  observer(() => {
  const store = React.useContext(StoreContext);
    const [expand,setExpand]=React.useState<boolean>(true);
    const handleAlignHorizontalLeft=()=>{
      if(!store.selectedElement) return;
      store.setObjectAlignmentToLeft(store.selectedElement);
    }
    const handleAlignHorizontalCenter=()=>{
      if(!store.selectedElement) return;
      store.setObjectAlignmentHorizontalCenter(store.selectedElement);

    }
    const handleAlignHorizontalRight=()=>{
      if(!store.selectedElement) return;
      store.setObjectAlignmentToRight(store.selectedElement);      
    }

    const handleHorizontalDistribute=()=>
    {
      if(!store.selectedElement) return;
      store.setObjectAlignmentCanvasCenter(store.selectedElement);
    }

    const handleAlignVerticalTop=()=>
    {
      if(!store.selectedElement) return;
      store.setObjectAligmentToTop(store.selectedElement);

    }
    const handleAlignVerticalCenter=()=>{
      if(!store.selectedElement) return;
      store.setObjectAlignmentVerticalCenter(store.selectedElement);

    }
    const handleAlignVerticalBottom=()=>{
      if(!store.selectedElement) return;
      store.setObjectAlignmentToBottom(store.selectedElement);
    }
    
    

  return ( <>
<section onClick={()=>setExpand(!expand)} className={`comphead ${expand===true ? "border-none":"border-b-[0.2px]"}`}>
          <h3>Alignment</h3>
          <button ><span>{expand ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
</section>
{expand  ? <section className={`cursor-pointer px-2 py-3 w-[233px] max-w-[233px] h-[96px] max-h-[96px] border-white bg-[#202020] ${expand ? "border-b-[0.2px]":"border-none"}`}>
      <div className='block w-[209px] max-w-[209px] h-10 max-h-10'>
     <button className='w-[40px] h-[40px]' type='button' onClick={handleAlignHorizontalLeft}>
          <span><MdAlignHorizontalLeft className={`cursor-pointer `} size={24}/></span>
          <span></span>
        </button>
        <button className='w-[40px] h-[40px]' onClick={handleAlignHorizontalCenter} type='button'>
          <span><MdAlignHorizontalCenter size={24}/></span>
          <span></span>
        </button>
        <button className='w-[40px] h-[40px]' onClick={handleAlignHorizontalRight} type='button'>
          <span><MdAlignHorizontalRight size={24}/></span>
          <span></span>
        </button>
        <button className='w-[40px] h-[40px]' onClick={handleHorizontalDistribute} type='button'>
          <span><MdHorizontalDistribute size={24}/></span>
          <span></span>
        </button>
        
      </div>
      <div className='block w-[209px] max-w-[209px] h-10 max-h-10'>
      <button   className='w-[40px] h-[40px]' onClick={handleAlignVerticalTop} type='button'>
          <span><MdAlignVerticalTop size={24}/></span>
          <span></span>
        </button>
        <button   className='w-[40px] h-[40px]' type='button'>
          <span><MdAlignVerticalCenter onClick={handleAlignVerticalCenter} size={24}/></span>
          <span></span>
        </button>
        <button   className='w-[40px] h-[40px]' onClick={handleAlignVerticalBottom}  type='button'>
          <span><MdAlignVerticalBottom size={24}/></span>
          <span></span>
        </button>
        <button   className='w-[40px] h-[40px]' onClick={handleHorizontalDistribute} type='button'>
          <span><MdVerticalDistribute size={24}/></span>
          <span></span>
        </button>
      </div>
    </section> :null}
    </>);});
  

