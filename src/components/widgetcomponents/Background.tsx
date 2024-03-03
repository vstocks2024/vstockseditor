"use client";
import React from 'react'
import { observer } from 'mobx-react';
import { Element } from '@/components/entity/Element';
import { StoreContext } from "@/store";
import { MdOutlineExpandLess,MdOutlineExpandMore,MdColorLens } from 'react-icons/md';

export const Background = observer(() => {
    const [expand,setExpand]=React.useState<boolean>(true);
    const [disable,setDisable]=React.useState<boolean>(false);
    const store = React.useContext(StoreContext);
    const refBgColor=React.useRef<HTMLInputElement>(null);
    const handleCanvasBackgroundColor=(event: React.ChangeEvent<HTMLInputElement>)=>
    {
      if(!store.canvas) return ;
      if(!refBgColor.current) return ;
      if(!refBgColor.current.checked) return;
      store.setBackgroundColor(event.target.value);
    }
    return (
      <>
      <section onClick={()=>setExpand(!expand)} className={`cursor-pointer font-semibold flex flex-row justify-between items-center text-xs bg-[#151515] pl-3 pr-2 border-white ${expand===true ? "border-none":"border-b-2"}`}>
          <h3>Background</h3>
          <button><span>{expand ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
      </section>
   {expand ? <section className={`cursor-pointer px-3 py-2 border-white bg-[#202020] ${expand ? "border-b-2":"border-none"}`}>
      <form noValidate className='flex flex-row items-center'>
        <input  type='checkbox' ref={refBgColor}  className='bg-transparent accent-black size-4 border text-xs'/>
        <div className='flex text-xs  box-border flex-row my-2 h-[28px]'>
          <input type='color' disabled={disable} onChange={handleCanvasBackgroundColor} className='bg-transparent border-none mx-2 mt-[2.5px] align-middle w-[24px] h-[24px] ' />
          <label  htmlFor='Background Color' className='pt-[6.4px] items-center align-middle'>Background Color</label>
          <span className='grow shrink basis-0 w-[90px]  self-stretch '></span>
          </div>
          <button><span className='align-middle'><MdColorLens size={24}/></span></button>
      </form>
    </section> :null}
    </>
    )
});

