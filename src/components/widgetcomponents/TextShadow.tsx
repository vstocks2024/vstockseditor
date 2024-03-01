"use client";
import React from 'react'
import { observer } from 'mobx-react';
import { StoreContext } from "@/store";
import { MdColorLens, MdOutlineExpandLess,MdOutlineExpandMore } from 'react-icons/md';
import {Shadow} from 'fabric/fabric-impl';
import {fabric} from 'fabric';


export const TextShadow =  observer(() => {
  const store = React.useContext(StoreContext);
    const [expand,setExpand]=React.useState<boolean>(true);
    const reftextshadowcolor=React.useRef<HTMLInputElement>(null);
    const reftextshadowoffsetX=React.useRef<HTMLInputElement>(null);
    const reftextshadowoffsetY=React.useRef<HTMLInputElement>(null);
    const reftextshadowblur=React.useRef<HTMLInputElement>(null);
    
    
    const handleTextBoxShadow=(event:React.ChangeEvent<HTMLInputElement>)=>{
      try{
        if(!store.selectedElement) return;
        if(!reftextshadowcolor.current || !reftextshadowoffsetX.current || !reftextshadowoffsetY.current || !reftextshadowblur.current) return;
        const newShadow=new fabric.Shadow({color:`${reftextshadowcolor.current.value}`,offsetX:parseFloat(`${reftextshadowoffsetX.current.value}`),offsetY:parseFloat(`${reftextshadowoffsetY.current.value}`),blur:parseFloat(`${reftextshadowblur.current.value}`)})
        store.setTextBoxShadow(store.selectedElement,newShadow);
          }
    catch(err){
      console.log(err);
    }
  }
  return (
    <>
    <section onClick={()=>setExpand(!expand)} className={`cursor-pointer font-semibold flex flex-row justify-between items-center text-xs bg-[#151515] pl-3 pr-2 border-black ${expand===true ? "border-none":"border-b-2"}`}>
        <h3>Shadow</h3>
        <button ><span>{expand ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
    </section>
    {expand ? <section className={`cursor-pointer max-w-[233px] px-3 py-2  flex flex-row border-gray-900 bg-[#202020] ${expand ? "border-b-2":"border-none"}`}>
      <form className='flex flex-col' >
        <div className='flex items-center'>
        <input type='checkbox'  className='w-4 h-4  accent-white bg-transparent cursor-pointer border-[0.1px] '/>
                <div className='ml-1 flex items-center w-[105px] h-7'>
                    <input type='color' onChange={handleTextBoxShadow} ref={reftextshadowcolor} className='h-6 w-6 bg-transparent cursor-pointer'/>
                    <label className=' flex items-center cursor-default text-[11px] w-[77px] h-7 ml-2'>Shadow Color</label>
                </div>
                 <span className=' flex flex-col h-10 w-[52px] self-stretch'></span> 
                <button className='flex justify-center items-center ml-1 h-10 w-10'><span><MdColorLens size={24}/></span><span></span><span></span></button>
        </div>
        <div  className=' flex items-center gap-3'>
          <div className='flex flex-col'>
          <label className='w-12 flex items-center text-center text-[11px] h-[14px] text-[#999999]' htmlFor='Offset X'>Offset X</label>
          <input ref={reftextshadowoffsetX}   className='w-12 h-5 focus:outline-none text-sm bg-transparent border-b'/>
          </div>
          <div className='flex flex-col'>
          <label className='w-12 flex items-center text-center text-[11px] h-[14px] text-[#999999]' htmlFor='Offset Y'>Offset Y</label>
          <input ref={reftextshadowoffsetY}   className='w-12 h-5 focus:outline-none text-sm bg-transparent border-b'/>
          </div>
          <div className='flex flex-col'>
          <label className='w-12 flex items-center text-center text-[11px] h-[14px] text-[#999999]' htmlFor='Blur'>Blur</label>
          <input ref={reftextshadowblur}   className='w-12 h-5 focus:outline-none text-sm bg-transparent border-b'/>
          </div>
        </div>
      </form>
        
 
    </section>:null}
    </>
  )
});
