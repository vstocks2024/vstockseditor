"use client";
import { observer } from 'mobx-react';
import React from 'react';
import { StoreContext } from "@/store";
import { MdFormatAlignCenter, MdFormatAlignJustify, MdFormatAlignLeft, MdFormatAlignRight, MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';

export const TextAlignment = observer(() => {
  const store = React.useContext(StoreContext);
  const [expand,setExpand]=React.useState<boolean>(true);
  const handleLeftTextAlignment=()=>{
      if(!store.selectedElement) return ;
      store.setTextAlignmentToLeft(store.selectedElement);
    }
    const handleCenterTextAlignment=()=>{
      if(!store.selectedElement) return ;
      store.setTextAlignmentToCenter(store.selectedElement);
    }
    const handleRightTextAlignment=()=>{
      if(!store.selectedElement) return ;
      store.setTextAlignmentToRight(store.selectedElement);
    }
    const handleJustifyTextAlignment=()=>
    {
      if(!store.selectedElement) return ;
      store.setTextAlignmentToJustify(store.selectedElement);
    }
    return (
      <>
      <section onClick={()=>setExpand(!expand)} className={`comphead ${expand===true ? "border-none":"bordet-b-[0.2px]"}`}>
          <h3 className=''>Text Alignment</h3>
          <button ><span>{expand ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
      </section>
    {expand  ? <section className={`cursor-pointer px-2 py-3 border-white bg-[#202020] ${expand ? "bordet-b-[0.2px]":"border-none"}`}>
      <div className='flex flex-row w-full min-w-full px-2 gap-1'>
        <div className='relative border-r-2 pr-1 '>
        <button onClick={handleLeftTextAlignment} className='cursor-pointer'><span><MdFormatAlignLeft className={`cursor-pointer ${store.selectedElement?.placement.textAlign==="left" ? "brightness-200":"brightness-50"}`} size={24}/></span></button><span></span><span></span>
        </div>
        <div  className='relative border-r-2 pr-1 cursor-pointer'>
        <button onClick={handleCenterTextAlignment}><span className=' cursor-pointer'><MdFormatAlignCenter className={`cursor-pointer ${store.selectedElement?.placement.textAlign==="center" ? "brightness-200":"brightness-50"}`} size={24}/></span></button><span></span><span></span>
        </div>
        <div className='relative border-r-2 pr-1 cursor-pointer '>
        <button onClick={handleRightTextAlignment}><span className=' cursor-pointer'><MdFormatAlignRight className={`cursor-pointer ${store.selectedElement?.placement.textAlign==="right" ? "brightness-200":"brightness-50"}`} size={24}/></span></button> <span></span><span></span>
        </div>
        <div className='relative cursor-pointer'>
        <button onClick={handleJustifyTextAlignment}><span className=' cursor-pointer'><MdFormatAlignJustify className={`cursor-pointer ${store.selectedElement?.placement.textAlign==="justify" ? "brightness-200":"brightness-50"}`} size={24}/></span></button><span></span><span></span>
        </div>
        </div>
    </section>:null}
      </>
  )
});


