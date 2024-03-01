// import React from 'react'
// import { observer } from 'mobx-react';
// import { Element } from './Element';
// import { StoreContext } from "@/store";
// import { IoColorPalette } from "react-icons/io5";
// import {getfonturl} from '@/components/shared/getfonturl';
// import {MdOutlineExpandMore,MdOutlineExpandLess, MdAlignHorizontalLeft ,MdAlignHorizontalCenter, MdAlignHorizontalRight ,MdAlignVerticalTop ,MdAlignVerticalCenter ,MdAlignVerticalBottom ,MdVerticalDistribute,MdHorizontalDistribute ,MdLock,MdLockOpen } from "react-icons/md";
// import { MdFormatAlignLeft,MdFormatAlignCenter,MdFormatAlignRight,MdFormatAlignJustify } from "react-icons/md";
// import { RiBringToFront, RiBringForward,RiSendBackward,RiSendToBack } from "react-icons/ri";
// import { LuFlipHorizontal2 ,LuFlipVertical2  } from "react-icons/lu";
// import { ColorPicker, useColor } from "react-color-palette";
// import "react-color-palette/css";
// import { IconType } from 'react-icons/lib';
// import axios from 'axios';




// type WidgetWrapperProps={
//     widgetwrappername:string;
// }

// const WidgetWrapper = observer(({widgetwrappername}:WidgetWrapperProps) => {
//   const handleFontFamily=async ()=>
//   {
//     const results=await axios.get(getfonturl);
//     fontFamilyItems=results.data.items;
//     console.log(fontFamilyItems);
//   }

//   const handleTransformLock=()=>{
//         setLock(!lock);
//   }

//   var fontFamilyItems:Object[]=[];
//   const store = React.useContext(StoreContext);
//   const [lock,setLock]=React.useState(false);
//   const alignment_top_row:IconType[]=[MdAlignHorizontalLeft,MdAlignHorizontalCenter,MdAlignHorizontalRight,MdHorizontalDistribute];
//   const alignment_bottom_row:IconType[]=[MdAlignVerticalTop,MdAlignVerticalCenter,MdAlignVerticalBottom,MdVerticalDistribute];
//   const arrangement_row:IconType[]=[RiBringToFront, RiBringForward,RiSendBackward,RiSendToBack];
//   const flip_row:IconType[]=[LuFlipHorizontal2 ,LuFlipVertical2];
//     const [expand,setExpand]=React.useState(store.expandall);
//     const [color, setColor] = useColor("#561ecb");

//     React.useEffect(()=>
//     {
//       handleFontFamily();
//     },[]);

//   return (
//     <>
//     <section onClick={()=>setExpand(!expand)} className={`flex ${expand===true ? "border-none" : "border-b-2"} justify-between mt-1 cursor-pointer w-full border-gray-900 items-center text-xs`}>
//         <h3>{widgetwrappername}</h3>
//         <button >{expand ? <MdOutlineExpandLess  size={20}/> :<MdOutlineExpandMore size={20} />}</button>
//     </section>
//    {(expand && widgetwrappername==="Layers") ? <section className='cursor-pointer '>
//           <div className='flex grow overflow-hidden box-border z-[1]'>
//             <div role='tablist' className=' justify-between grow relative translate-x-0 transition-transform'>
//               <div className='flex flex-row'>
//                 <div role='tab'>
//                   <div className=' text-xs inline-flex justify-center items-center whitespace-nowrap text-nowrap'>
//                     Objects
//                   </div>
//                 </div>
//                 <div role='tab'>
//                 <div className=' text-xs inline-flex justify-center items-center whitespace-nowrap text-nowrap'>
//                     Audio
//                   </div>
//                 </div>
//                 </div>
//                 </div>
//                 </div>
      
          
//         {store.editorElements.map((element) => {
//           return <Element key={element.id} element={element} />;
//         })}
   
//     </section> :null}
//     { (expand && widgetwrappername==="Dimensions") ? <section className={`cursor-pointer border-gray-900 bg-[#181A1B] ${expand ? "border-b-2":"border-none"}`}>
//     <div className="flex flex-row mx-2 my-2 text-xs text-gray-500 font-semibold">
//       <div className='flex flex-col mx-1 my-1'>
//         <label className='w-[48px] text-center ' htmlFor='width'>Width</label>
//         <input readOnly value={1920} disabled className='mt-1 bg-transparent border-none text-center w-[48px]'/>
//       </div>
//       <div className=' flex flex-col mx-1 my-1'>
//         <label className='w-[48px] text-center' htmlFor="height">Height</label>
//         <input readOnly value={1080} disabled className='mt-1 bg-transparent border-none text-center w-[48px]'/>
//       </div>
       
//     </div>
//     </section> :null}
//     { (expand && widgetwrappername==="Background") ? <section className={`cursor-pointer border-gray-900 bg-[#181A1B] ${expand ? "border-b-2":"border-none"}`}>
//       <form noValidate className=' box-border ml-4 flex flex-row items-center'>
//         <input type='checkbox' checked className=' bg-transparent  w-[16px] h-[16px]   border  text-xs'/>
//         <div className='flex text-xs  box-border flex-row my-2 h-[28px]'>
//           <input type='color' className=' bg-transparent border-none mx-2 mt-[2.5px] align-middle w-[24px] h-[24px] ' />
//           <label  htmlFor='Background Color' className='pt-[6.4px] items-center align-middle'>Background Color</label>
//           <span className='grow shrink basis-0 w-[90px]  self-stretch '></span>
//           </div>
//           <button><span className=' align-middle'><IoColorPalette size={25}/></span></button>

//       </form>
//     </section> :null}
//     {(expand  && widgetwrappername==="Alignment") ? <section className={` flex flex-col box-border  border-gray-900 bg-[#181A1B] ${expand ? "border-b-2":"border-none"} `}>
//       <div className='block pl-4'>
//         {
//         alignment_top_row.map((Icon,ind,oa)=>{
//          return <button  key={`${Icon}_${ind}`}  className='w-[40px] h-[40px]' type='button'>
//           <span><Icon size={25}/></span>
//           <span></span>
//         </button>})
//         }
//       </div>
//       <div className='block pl-4'>
//         {
//         alignment_bottom_row.map((Icon,ind,oa)=>{
//          return <button  key={`${Icon}_${ind}`}  className='w-[40px] h-[40px]' type='button'>
//           <span><Icon size={25}/></span>
//           <span></span>
//         </button>})
//         }
//       </div>

//     </section> :null} 
//     {(expand  && widgetwrappername==="Arrange") ? <section className={`flex flex-row pl-4 box-border  border-gray-900 bg-[#181A1B] ${expand ? "border-b-2":"border-none"}`}>
//     {arrangement_row.map((Icon,ind,oa)=>
//     {
//       return <button key={`${Icon}_${ind}`} className='w-[40px] h-[40px]' type='button'>
//         <span><Icon size={25}/></span><span></span><span></span>
//       </button>
//     })}
//     </section>:null}

//     {(expand  && widgetwrappername==="Flip") ? <section className={`flex flex-row pl-4 box-border border-gray-900 bg-[#181A1B] ${expand ? "border-b-2":"border-none"}`}>
//     {
//       flip_row.map((Icon,ind,oa)=>{
//         return <button className='w-[40px] h-[40px]' key={`${Icon}_${ind}`}>
//           <span><Icon size={25}/></span><span></span><span></span>

//         </button>
//       })
//     }
//     </section>:null}

//     {(expand  && widgetwrappername==="Transform") ? <section className={`flex flex-row pl-4 box-border border-gray-900 bg-[#181A1B] ${expand ? "border-b-2":"border-none"}`}>
//         <div className='flex flex-row py-2 items-center   text-gray-500 gap-2'>
//           <div  className='flex flex-col gap-1'>
//             <div className='w-12 min-w-[48px] gap-2 block font-semibold text-center items-center py-1 text-[12px]'>
//               <label htmlFor='Width' className='w-full text-[10px] '>Width</label>
//               <input value={865} className=" w-full text-white text-center bg-transparent text-[12px]" autoComplete='off' />
//             </div>
//             <div className='w-12 min-w-[48px] gap-2 block font-semibold text-center text-[12px]'>
//               <label htmlFor='height' className='w-full text-[10px]'>Height</label>
//               <input value={865} className="w-full text-white text-center bg-transparent text-[12px]"  autoComplete='off' />
//             </div>
//             </div>
//             <button   className=' relative flex justify-center items-center'>
//               <span onClick={handleTransformLock}  className=' text-white'>{ lock ? <MdLock size={20}/> :<MdLockOpen size={20}/>}</span><span className='overflow-hidden'></span><span></span>
//             </button>
//         </div>
//         <div className='flex flex-row py-2 items-center   text-gray-500 gap-2'>
//         <div  className='flex flex-col gap-1'>
//             <div className='w-12 min-w-[48px] gap-2 block font-semibold text-center items-center py-1 text-[12px]'>
//               <label htmlFor='Left' className='w-full text-[10px] '>Left</label>
//               <input value={865}  className=" w-full text-center text-white bg-transparent text-[12px]" autoComplete='off' />
//             </div>
//             <div className='w-12 min-w-[48px] gap-2 block font-semibold text-center text-[12px]'>
//               <label htmlFor='Top' className='w-full text-[10px]'>Top</label>
//               <input value={865}  className="w-full text-white text-center bg-transparent text-[12px]"  autoComplete='off' />
//             </div>
//             </div>

//         </div>
//         <div className='flex flex-row py-2 ml-6   text-gray-500 gap-2'>
//         <div  className='flex flex-col gap-1'>
//             <div className='w-12 min-w-[48px] gap-2 block font-semibold text-center  py-1 text-[12px]'>
//               <label htmlFor='Rotation' className='w-full text-[10px] '>Rotation</label>
//               <input value={865} className=" w-full text-white text-center bg-transparent text-[12px]" autoComplete='off' />
//             </div>
//           </div>

//         </div>
       
//     </section>:null}

//     {(expand  && widgetwrappername==="Text Alignment") ? <section className={`flex flex-row w-full h-[44px] px-2 py-2 box-border border-gray-900 bg-[#181A1B] ${expand ? "border-b-2":"border-none"}`}>
//       <div className='flex flex-row w-full min-w-full gap-1'>
//         <div className='relative border-r-2 pr-1 '>
//         <button className='cursor-pointer'><span><MdFormatAlignLeft size={24}/></span></button><span></span><span></span>
//         </div>
//         <div className='relative border-r-2 pr-1 cursor-pointer'>
//         <button><span className=''><MdFormatAlignCenter size={24}/></span></button><span></span><span></span>
//         </div>
//         <div className='relative border-r-2 pr-1 cursor-pointer '>
//         <button><span className=''><MdFormatAlignRight size={24}/></span></button> <span></span><span></span>
//         </div>
//         <div className='relative cursor-pointer'>
//         <button><span className=''><MdFormatAlignJustify size={24}/></span></button><span></span><span></span>
//         </div>
//         </div>
//     </section>:null}

//     {(expand  && widgetwrappername==="Font") ? <section className={`flex flex-row w-full h-[44px] px-2 py-2 box-border border-gray-900 bg-[#181A1B] ${expand ? "border-b-2":"border-none"}`}>
//     <button onClick={handleFontFamily}>Hello</button>
//         <div className='flex flex-col items-center gap-3'>
//           <div className='flex flex-col'>
//           <label htmlFor='Family'>Family</label>
//           <select onChange={handleFontFamily} className=''>
//             {
//             fontFamilyItems.map((item,ind,oa)=>{
//               return <option key={`${item}_${ind}`}>{`${item}["family"]`}</option>
//             })
//           }
//           </select>
//           </div>
//         </div>
//         <div className='flex flex-col items-center'></div>
//         <div className='flex flex-col items-center'></div>
//         <div className='flex flex-col items-center'></div>
      

//     </section>:null}


//     </>
//   )
// });

// export default WidgetWrapper;
