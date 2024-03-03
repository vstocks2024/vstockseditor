"use client";
import React from 'react'
import { observer } from 'mobx-react';
import { Element } from '@/components/entity/Element';
import { StoreContext } from "@/store";
import { MdOutlineExpandLess,MdOutlineExpandMore } from 'react-icons/md';

export const Layers = observer(() => {
    const store = React.useContext(StoreContext);
    const [expand,setExpand]=React.useState<boolean>(true);
  return (
    <>
    <section onClick={()=>setExpand(!expand)} className={`comphead ${expand===true ? "border-none":"border-b-[0.2px]"}`}>
        <h3>Layers</h3>
        <button ><span>{expand  ? <MdOutlineExpandLess  size={24}/> :<MdOutlineExpandMore size={24} />}</span></button>
    </section>
    {expand  ? <section className={`cursor-pointer px-2 py-3 border-white bg-[#202020] ${expand ? "border-b-[0.2px]":"border-none"}`}>
        {store.editorElements.map((element) => {
          return <Element key={element.id} element={element} />;
        })}
    </section>:null}
    </>
  )
});


