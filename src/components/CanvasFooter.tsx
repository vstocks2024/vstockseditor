"use client";
import React from 'react'
import { FaMinus,FaPlus } from "react-icons/fa";


export const CanvasFooter = () => {
  return (
    <div className='flex bg-[#202020]  justify-end w-[1349px] h-10 px-4 '>
      <div className='flex flex-row w-[138px]  h-10 gap-1'>
        <button className='w-10 h-10 '><span> <FaMinus size={18}/></span><span></span><span></span></button>
        <div className='w-[50px] h-10'>
            <label htmlFor='Zoom' className='w-[50px] text-[10px] h-[14px] bg-transparent'>Zoom</label>
            <input value={97} disabled className='w-[34px] h-[20px] text-xs bg-transparent' type='text'/>
        </div>
        <button className='w-10 h-10'><span><FaPlus size={18}/></span><span></span><span></span></button>
      </div>
    </div>
  )
}


