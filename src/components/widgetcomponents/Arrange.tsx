"use client";
import { observer } from 'mobx-react'
import React from 'react'
import { StoreContext } from "@/store";
import { RiBringToFront, RiBringForward,RiSendBackward,RiSendToBack } from "react-icons/ri";
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';


export const Arrange = observer(() => {
  const store = React.useContext(StoreContext);
    const [expand,setExpand]=React.useState<boolean>(true);
    const handleBringToFront=()=>{
      try{
        
      if(!store.selectedElement) return;
      console.log("hello");
    }
    catch(err)
    {
      console.log(err);
    }
    }
    const handleBringForward =()=>{
      try{
        if(!store.selectedElement) return;
        store.selectedElement.fabricObject.bringForward(true);
      }
      catch(err)
      {
        console.log(err);
      }
    }
    const handleSendBackward=()=>{
      try{
        if(!store.selectedElement) return;
        store.selectedElement.fabricObject.sendBackwards(true);
      }
      catch(err)
      {
        console.log(err);
      }
    }
    const handleSendToBack=()=>{
          try{
        if(!store.selectedElement) return;
        store.selectedElement.fabricObject.sendToBack();
      }
      catch(err)
      {
        console.log(err);
      }}

    
  return (
    <>
   <section onClick={()=>setExpand(!expand)} className={`cursor-pointer font-semibold flex flex-row justify-between items-center text-xs bg-[#151515] pl-3 pr-2 border-white ${expand===true ? "border-none":"border-b-2"}`}>
          <h3>Arrange</h3>
          <button ><span>{expand ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
      </section>
      {expand  ? <section className={`cursor-pointer px-3 py-2 w-[233px] max-w-[233px] h-[56px] max-h-[56px] border-white bg-[#202020] ${expand ? "border-b-2":"border-none"}`}>
     <button onClick={handleBringToFront}  className='w-[40px] h-[40px]' type='button'>
        <span><RiBringToFront size={24}/></span><span></span><span></span>
      </button>
      <button onClick={handleBringForward} className='w-[40px] h-[40px]' type='button'>
        <span><RiBringForward size={24}/></span><span></span><span></span>
      </button>
      <button onClick={handleSendBackward} className='w-[40px] h-[40px]' type='button'>
        <span><RiSendBackward size={24}/></span><span></span><span></span>
      </button>
      <button onClick={handleSendToBack} className='w-[40px] h-[40px]' type='button'>
        <span><RiSendToBack size={24}/></span><span></span><span></span>
      </button>
    
    </section>:null}

    </>
  )
});

