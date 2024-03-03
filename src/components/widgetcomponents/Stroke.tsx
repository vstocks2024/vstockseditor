"use client";
import React, { memo } from 'react'
import { observer } from 'mobx-react';
import { StoreContext } from "@/store";
import { MdColorLens, MdOutlineExpandLess,MdOutlineExpandMore } from 'react-icons/md';

export const Stroke =  observer(() => {
    const store=React.useContext(StoreContext);
    const [expand,setExpand]=React.useState<boolean>(true);
    const handleTextBoxStrokeMiterLimit=(event:React.ChangeEvent<HTMLInputElement>)=>{
        try{
            if(!store.selectedElement) return;
            if(!event.target) return;
            store.setTextBoxStrokeMiterLimit(store.selectedElement,parseFloat(event.target.value));

        }
        catch(err){
            console.log(err);
        }
    }
    const handleTextBoxStrokeLineJoin=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        try{
            if(!store.selectedElement) return;
            if(!event.target) return;
            if(!event.currentTarget) return;
            store.setTextBoxStrokeLineJoin(store.selectedElement,event.currentTarget.value);
        }
        catch(err){
            console.log(err);
        }
    }
    const handleTextBoxStrokeLineCap=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        try{
            if(!store.selectedElement) return;
            if(!event.target) return;
            if(!event.currentTarget) return;
            store.setTextBoxStrokeLineCap(store.selectedElement,event.currentTarget.value);
        }
        catch(err){
            console.log(err);
        }
    }
    const handleTextBoxUniformStroke=(event:React.ChangeEvent<HTMLInputElement>)=>{
        try{
            if(!store.selectedElement) return;
            if(!event.target) return;
            store.setTextBoxUniformStrokeWidth(store.selectedElement,event.target.checked);
        }
        catch(err){
         console.log(err)
        }
    }
    const handleTextBoxStrokeWidth=(event:React.ChangeEvent<HTMLInputElement>)=>{
        try{
            if(!store.selectedElement) return;
            if(!event.target) return;
            store.setTextBoxStrokeWidth(store.selectedElement,parseFloat(event.target.value));
        }
        catch(err){
            console.log(err)
        }

    }
    const handleTextBoxStrokeColor=(event:React.ChangeEvent<HTMLInputElement>)=>{
        try{
        if(!store.selectedElement) return;
        if(!event.target) return;
        store.setTextBoxStrokeColor(store.selectedElement,event.target.value);
    }
    catch(err){
        console.log(err);
    }

    }
  return (
    <>
    <section onClick={()=>setExpand(!expand)} className={`comphead ${expand===true ? "border-none":"border-b-2"}`}>
        <h3>Stroke</h3>
        <button ><span>{expand ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
    </section>
    {expand   ? <section className={`cursor-pointer px-2 py-3 border-white bg-[#202020] ${expand ? "border-b-2":"border-none"}`}>
        <div className='flex flex-col gap-3'>
        <form onSubmit={()=>{addEventListener("submit",(event)=>{event.preventDefault()})}} action={"#"} noValidate autoComplete='off' className='flex flex-col gap-3 max-w-[209px] max-h-[176px]'>
            <section className=' flex items-center w-[233px] h-[40px] min-w-[233px] min-h-[40px]'>
                <input type='checkbox' checked={store.selectedElement?.placement.stroke ? true :false}  className='w-4 h-4  accent-white bg-transparent cursor-pointer border-[0.1px] '/>
                <div className='ml-1 flex items-center w-[98px] h-7'>
                    <input type='color' value={store.selectedElement?.placement.stroke ? store.selectedElement.placement.stroke: undefined} onChange={handleTextBoxStrokeColor} className='h-6 w-6 bg-transparent cursor-pointer'/>
                    <label className=' flex items-center cursor-default text-[11px] w-[67px] h-7 ml-2'>Stroke Color</label>
                </div>
                <div className=' flex flex-col ml-3 w-12 h-7 items-center'>
                   <label className='w-12 flex items-center text-center text-[11px] h-[14px] text-[#999999]' htmlFor='width'>Width</label>
                   <input onChange={handleTextBoxStrokeWidth} value={store.selectedElement?.placement.strokeWidth ? store.selectedElement.placement.strokeWidth : 1} className='w-12 h-5 focus:outline-none text-sm bg-transparent border-b'/>
                    <span className=' flex flex-col h-10 w-2 self-stretch'></span> 
                </div>
                <button className=' flex justify-end items-center  h-10 w-10'><span><MdColorLens size={24}/></span><span></span><span></span></button>
            </section>
            <section className='w-[209px] h-4 flex items-center'>
                <input type='checkbox' checked={store.selectedElement?.placement.strokeUniform ? store.selectedElement.placement.strokeUniform :false} onChange={handleTextBoxUniformStroke} className='w-4 h-4 accent-white text-black bg-transparent cursor-pointer border '/>
                <label htmlFor='uniform stroke' className='ml-2 w-20 text-[11px] items-center'>Uniform Stroke</label>
            </section>
            <section className='w-[209px] h-[34px] flex flex-row items-center gap-3'>
                <div className='block'>
                    <label htmlFor='Line Cap' className='text-[11px] font-semibold w-fit text-[#999999]'>Line Cap</label>
                    <select onChange={handleTextBoxStrokeLineCap}  value={store.selectedElement?.placement.strokeLineCap ? store.selectedElement.placement.strokeLineCap : "butt"} className='text-[11px] w-fit font-semibold appearance-none border-b focus:outline-none border-[#444444] bg-transparent'>
                        <option value={"butt"}>Butt</option>
                        <option value={"round"}>Round</option>
                        <option value={"square"}>Square</option>
                    </select>
                </div>
                <div className='block'>
                    <label htmlFor='Line Join' className='text-[11px] w-fit font-semibold text-[#999999]'>Line Join</label>
                    <select onChange={handleTextBoxStrokeLineJoin} value={store.selectedElement?.placement.strokeLineJoin ? store.selectedElement.placement.strokeLineJoin : "milter"} className='text-[11px] w-fit border-b font-semibold appearance-none focus:outline-none border-[#444444] bg-transparent'>
                        <option value={"bevil"}>Bevill</option>
                        <option value={"round"}>Round</option>
                        <option value={"milter"}>Milter</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='Milter' className='text-[11px] w-fit font-semibold text-[#999999]'>Milter</label>
                    <input value={store.selectedElement?.placement.strokeMiterLimit ? store.selectedElement.placement.strokeMiterLimit :undefined} onChange={handleTextBoxStrokeMiterLimit} disabled={store.selectedElement?.placement.strokeLineJoin ? store.selectedElement.placement.strokeLineJoin==="milter" ? false : true : true } className='w-12 h-5 focus:outline-none text-sm bg-transparent border-b'/>
                </div>
            </section>
        

        </form>
        <form onSubmit={()=>{addEventListener("submit",(event)=>{event.preventDefault()})}} noValidate autoComplete='off' className='flex flex-row gap-3'>
            <div className='min-w-9 w-9 block'>
                <label className='text-[11px] w-9 h-[14px] text-[#999999]' htmlFor='Dash'>Dash</label>
                <input autoComplete='off' className=' w-9 h-5 focus:outline-none text-sm bg-transparent border-b-[1px] '/>
            </div>
            <div className='min-w-9 w-9 block'>
            <label className='text-[11px] text-[#999999]  w-9 h-[14px]' htmlFor='Gap'>Gap</label>
            <input autoComplete='off' className=' w-9 h-5 focus:outline-none text-sm bg-transparent border-b-[1px] '/>
            </div>
            <div className='min-w-9 w-9 block'>
            <label className='text-[11px] text-[#999999]  w-9 h-[14px]' htmlFor='Dash'>Dash</label>
                <input autoComplete='off' className=' w-9 h-5 focus:outline-none text-sm bg-transparent border-b-[1px] '/>
            </div>
            <div className='min-w-9 w-9 block'>
            <label className='text-[11px] text-[#999999]  w-9 h-[14px]' htmlFor='Gap'>Gap</label>
                <input autoComplete='off' className=' w-9 h-5 focus:outline-none text-sm bg-transparent border-b-[1px] '/>
            </div>
        </form>
        </div>
      
    </section>:null}
    </>
  )
});


