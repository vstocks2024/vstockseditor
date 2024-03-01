"use client";
import axios from 'axios';
import { observer } from 'mobx-react';
import { StoreContext } from "@/store";
import React, { useEffect } from 'react'
import { MdColorLens, MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';
//import { getfonturl } from '@/components/shared/getfonturl';
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdFormatUnderlined,MdFormatOverline,MdFormatStrikethrough  } from "react-icons/md";


export const Font = observer(() => {
  const store = React.useContext(StoreContext);
    const [expand,setExpand]=React.useState<boolean>(true);
    const [results,setResults]=React.useState([]);
    const [family,setFamily]=React.useState<string>("");
    const reffamily=React.useRef<HTMLSelectElement>(null);
    const reftextcolorfill=React.useRef<HTMLInputElement>(null);
    


    const handleTextBoxFill=(event:React.ChangeEvent<HTMLInputElement>)=>{
      try{
        if(!store.selectedElement) return;
        if(!reftextcolorfill.current) return;
        if(!event.target.checked) return;
        store.setTextBoxFill(store.selectedElement,reftextcolorfill.current.value);
      }
      catch(err){
        console.log(err);
      }
    }
    
    const handleLineHeight=(event:React.ChangeEvent<HTMLInputElement>)=>{
      try{
      if(!store.selectedElement) return;
      store.setTextBoxLineHeight(store.selectedElement,parseFloat(event.target.value));
      }
      catch(err){
        console.log(err);
      }
    } 

    const handleLineThrough=()=>{
     try{
      if(!store.selectedElement) return;
      store.setTextBoxLineThrough(store.selectedElement);
     }
     catch(err){
      console.log(err);
     } 
    }
    const handleOverLine=()=>{
      try
      {
        if(!store.selectedElement) return;
        store.setTextBoxOverLine(store.selectedElement);
      }
      catch(err){
        console.log(err);
      }
    }
    const handleUnderLine=()=>{
      try{

      if(!store.selectedElement) return;
      store.setTextBoxUnderLine(store.selectedElement);
      }
      catch(err){
        console.log(err);
      }
    }
    const getFonts= async (url:any)=>
    {
      try{
      const query= await fetch(url);
      const response=await query.json();
      if(response['items'].length>0)
      {
      setResults(response['items']);
      }
      
       }
    catch(err)
    {
      console.log(err);
    }
    }
      React.useEffect(()=>{
        getFonts(process.env.NEXT_PUBLIC_GET_FONT_URL as string);
        },[])
    return (
      <>
      <section onClick={()=>setExpand(!expand)} className={`cursor-pointer font-semibold flex flex-row justify-between items-center text-xs bg-[#151515] pl-3 pr-2 border-black ${expand===true ? "border-none":"border-b-2"}`}>
          <h3>Font</h3>
          <button ><span>{expand ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
      </section>
    {expand  ? <section className={`cursor-pointer px-2 py-3 border-gray-900 bg-[#202020] ${expand ? "border-b-2":"border-none"}`}>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row items-center'>
          <div className='flex flex-col'>
          <label htmlFor='Family' className='font-semibold text-[10px] w-[121px] h-[14px] text-[#999999]'>Family</label>
          { results? <select ref={reffamily}  className=' appearance-none focus:outline-none border-b-[1px] border-[#444444] bg-transparent w-[121px] h-[20px] text-xs pr-4 cursor-pointer'>
    { 
    results.map((val:any,ind:any,oa:any)=>{
    return <option key={`${val[`family`]}_${ind}`}>{val[`family`]}</option>
    })} </select> :<select></select>}
        
          </div>
          <button  className=' flex w-10 h-10 justify-center items-center'>
            <span ><BsThreeDotsVertical  size={24}/></span>
            <span></span><span></span>
          </button>
          <div className='flex flex-col w-12 h-[34px] justify-center items-center'>
            <label className='w-12 h-[14px] font-semibold text-[10px] text-[#999999]'>Size</label>
            <input type='text' className='w-12 h-[20px] border-b-[1px] border-[#444444] bg-transparent text-[#999999] focus:outline-none'></input>
          </div>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <div className='flex flex-col max-w-[93px] h-[34px]'>
            <label htmlFor='Variant' className=' font-semibold text-[10px] w-[93px] h-[14px] text-[#999999]'>Variant</label>
              
           {
     (reffamily.current?.value && results) ? <select className=' focus:outline-none appearance-none h-5 w-[93px] border-b-[1px] border-[#444444] bg-transparent text-xs  cursor-pointer'>
         <option>{reffamily.current.value}</option>  
      </select> :<select></select>} 
          </div>
          <div className='max-w-[104px] h-7 items-end gap-1'>
            <button onClick={handleUnderLine}  className='w-8 h-7'><span><MdFormatUnderlined className={` cursor-pointer ${store.selectedElement?.placement.underline===true ? "brightness-200":"brightness-50"} `} size={24}/></span></button><span></span><span></span>
            <button onClick={handleOverLine} className='w-8 h-7'><span><MdFormatOverline className={` cursor-pointer ${store.selectedElement?.placement.overline===true ? "brightness-200":"brightness-50"} `} size={24}/></span></button><span></span><span></span>
            <button onClick={handleLineThrough}  className='w-8 h-7'><span><MdFormatStrikethrough className={` cursor-pointer ${store.selectedElement?.placement.linethrough===true ? "brightness-200":" brightness-50"} `} size={24}/></span></button><span></span><span></span></div>
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='flex flex-col'>
            <label htmlFor='L. Height' className=' font-semibold text-[10px] w-[48px] h-[14px] text-[#999999]'>L.Height</label>
            <input className='w-12 h-5 border-[#444444] bg-transparent text-xs focus:outline-none  cursor-pointer' onChange={handleLineHeight} value={ store.selectedElement?.placement.lineHeight ? store.selectedElement?.placement.lineHeight:""}/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='Spacing' className=' font-semibold text-[10px] w-[48px] h-[14px]  text-[#999999]'>Spacing</label>
            <input className='w-12 h-5 border-[#444444] bg-transparent text-xs focus:outline-none  cursor-pointer' value={0.5}/>
          </div>
        </div>
        <div className='flex flex-row items-center'>
        <input type='checkbox' onChange={handleTextBoxFill}     className='bg-transparent w-[16px] h-[16px] border text-xs '/>
        <div className='flex text-xs  box-border flex-row my-2 h-[28px]'>
          <input type='color' ref={reftextcolorfill}   className='bg-transparent border-none mx-2 mt-[2.5px] align-middle w-[24px] h-[24px] ' />
          <label  htmlFor='Background Color' className='pt-[6.4px] items-center align-middle'>Text Color</label>
          <span className='grow shrink basis-0 w-[90px]  self-stretch '></span>
          </div>
          <button><span className='align-middle'><MdColorLens size={24}/></span></button>
        </div>
      </div>
      

    </section>:null}

      </>
  )
})


