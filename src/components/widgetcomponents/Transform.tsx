"use client";
import React from 'react'
import { observer } from 'mobx-react';
import { StoreContext } from "@/store";
import { MdLock, MdLockOpen, MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';

export const Transform = observer(() => {
  const store = React.useContext(StoreContext);
    const [expand,setExpand]=React.useState<boolean>(true);
    const [lock,setLock]=React.useState<boolean>(false);
    //const refWidth=React.useRef<HTMLInputElement>(null);
    const handleChangeWidth=(event:React.ChangeEvent<HTMLInputElement>)=>{
      try{
        if(!store.selectedElement) return;
        const newwidth:number=parseFloat(event.target.value);
        store.setObjectWidth(store.selectedElement,newwidth);

      }
      catch(err)
      {
        console.log(err);
      }
    }
    const handleChangeHeight=(event:React.ChangeEvent<HTMLInputElement>)=>{
      try{
        if(!store.selectedElement) return;
        const newHeight:number=parseFloat(event.target.value);
        store.setObjectHeight(store.selectedElement,newHeight);
      }
      catch(err)
      {
        console.log(err);
      }

    }
    const handleChangeLeft=(event:React.ChangeEvent<HTMLInputElement>)=>{
      try{
        if(!store.selectedElement) return;
        const newLeft:number=parseFloat(event.target.value);
        store.setObjectLeftPosition(store.selectedElement,newLeft)
      }
      catch(err)
      {
        console.log(err);
      }
    }
    const handleChangeTop=(event:React.ChangeEvent<HTMLInputElement>)=>{
      try{
        if(!store.selectedElement) return;
        const newTop:number=parseFloat(event.target.value);
        store.setObjectTopPosition(store.selectedElement,newTop)
      }
      catch(err)
      {
        console.log(err);
      }

    }

    const handleChangeRotation=(event:React.ChangeEvent<HTMLInputElement>)=>{
      try{
        if(!store.selectedElement) return;
        const newAngle:number=parseFloat(event.target.value);
        store.setObjectRotation(store.selectedElement,newAngle);
      }
      catch(err)
      {
        console.log(err);
      }

    }
    return (
      <>
       <section onClick={()=>setExpand(!expand)} className={`comphead ${expand===true ? "border-none":"border-b-[0.2px]"}`}>
          <h3>Transform</h3>
          <button ><span>{expand ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
      </section>
      {expand   ? <section className={`cursor-pointer px-2 py-3 border-white bg-[#202020] ${expand ? "border-b-2":"border-none"}`}>
        <div className='flex flex-row py-2 items-center   text-gray-500 gap-2'>
          <div  className='flex flex-col gap-1'>
            <div className='w-12 min-w-[48px] gap-2 block font-semibold text-center items-center py-1 text-xs'>
              <label htmlFor='Width' className='w-full text-[11px] '>Width</label>
              <input disabled={lock} onChange={handleChangeWidth} value={store.selectedElement?.placement.width ? store.selectedElement.placement.width.toFixed(2) : 0} id='width' className=" w-full text-white text-center bg-transparent focus:outline-none text-xs" />
            </div>
            <div className='w-12 min-w-[48px] gap-2 block font-semibold text-center text-xs'>
              <label htmlFor='height' className='w-full text-[11px]'>Height</label>
              <input disabled={lock} onChange={handleChangeHeight} value={store.selectedElement?.placement.height ? store.selectedElement.placement.height.toFixed(2) :0} className="w-full text-white text-center bg-transparent focus:outline-none text-xs" />
            </div>
            </div>
            <button className=' relative flex justify-center items-center'>
              <span onClick={()=>{setLock(!lock)}}  className=' text-white'>{ lock ? <MdLock size={20}/> :<MdLockOpen size={20}/>}</span><span className='overflow-hidden'></span><span></span>
            </button>
        <div  className='flex flex-col gap-1'>
            <div className='w-12 min-w-[48px] gap-2 block font-semibold text-center items-center py-1 text-xs'>
              <label htmlFor='Left' className='w-full text-[11px] '>Left</label>
              <input disabled={lock} onChange={handleChangeLeft} value={store.selectedElement?.placement.x ? store.selectedElement.placement.x.toFixed(2) :0}  className=" w-full text-center text-white bg-transparent focus:outline-none  text-xs"  />
            </div>
            <div className='w-12 min-w-[48px] gap-2 block font-semibold text-center text-xs'>
              <label htmlFor='Top' className='w-full text-[11px]'>Top</label>
              <input disabled={lock}  onChange={handleChangeTop} value={store.selectedElement?.placement.y ? store.selectedElement.placement.y.toFixed(2) :0}   className="w-full text-white text-center bg-transparent focus:outline-none text-xs"  />
            </div>
            </div>
        <div  className='block'>
            <div className='w-12 min-w-12 gap-2  flex flex-col  font-semibold '>
              <label htmlFor='Rotation' className=' text-center w-full text-[11px]'>Rotation</label>
              <input value={store.selectedElement?.placement.rotation ? store.selectedElement.placement.rotation : 0} disabled={lock} onChange={handleChangeRotation} className=" w-full text-white text-center  bg-transparent focus:outline-none text-xs" />
            </div>
            <div className='w-12 min-w-[48px]'></div>
          </div>
        </div>
    </section>:null}
      </>
  )
})


