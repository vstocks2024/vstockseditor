import React from 'react'
import Image from 'next/image'
import { StickerSelectionResource } from './StickersSelectionResource'
export const StickersResource = () => {
  const stickers_name=["Beach","Clouds","Doodles","Emoticon","Landmark","Bubble","Star","Transport"]
  return (
    <>
    <div className='grid grid-cols-2 gap-1 justify-items-center font-sans py-2 px-1'>
     {
     stickers_name.map((name,index)=>
     { return  <div className='m-1 p-1' key={name} ><button onClick={()=>{<StickerSelectionResource name={`${name}`}/>}} className=' font-bold text-xs justify-items-center'><Image alt="" src={`/images/stickers/${name}.svg`} width={50} height={50}/>{name}</button></div>})
     }
    </div>
    </>
  )
}

