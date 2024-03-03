"use client";
import { observer } from 'mobx-react';
import React,{useRef} from 'react'
import { StoreContext } from "@/store";
import {MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';

export const Opacity = observer(() => {
  const [expand,setExpand]=React.useState<boolean>(true);
  const store = React.useContext(StoreContext);
  const refPercent=React.useRef<HTMLInputElement>(null);
  const handleChangeSlider=(event:React.ChangeEvent<HTMLInputElement>)=>{
    try{
    if(!refPercent.current) return;
    refPercent.current.value=event.target.value;
    const a=parseFloat(refPercent.current.value);
    const p=a/100;
    if(!store.selectedElement) return ;
    store.setObjectOpacity(store.selectedElement,p);
     }
     catch(err)
     {
      console.log(err);
     }
  }

  return (<> <section onClick={()=>setExpand(!expand)} className={`comphead ${expand===true ? "border-none":"border-b-[0.2px]"}`}>
  <h3>Opacity</h3>
  <button ><span>{expand ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
</section>
{expand ? <section className={`cursor-pointer px-2 py-3 border-white bg-[#202020] ${expand ? "border-b-[0.2px]":"border-none"}`}>
         <div className='flex flex-row items-center'>
         <div className='flex-1 grow shrink basis-0'><input id="slider" value={store.selectedElement?.placement.opacity ? store.selectedElement?.placement.opacity*100 : 0 } onChange={handleChangeSlider}  className=' appearance-none block rounded-s-lg  accent-black cursor-pointer h-2 ' type="range" max="100" min="0"/></div>
         <div className='flex flex-col'>
          <label className='text-[10px] max-w-[48px]  max-h-[14px]' htmlFor='opacity'>Opacity</label>
          <input className='text-sm max-w-[48px] max-h-5' ref={refPercent} disabled value={store.selectedElement?.placement.opacity ? store.selectedElement.placement.opacity*100:0}  id="opacity" type='text' />
         </div>
         <span>%</span>
         </div>
        </section>:null}
        </>
  )
});


