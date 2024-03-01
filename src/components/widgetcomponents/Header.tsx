"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type HeaderProps={
    header:string;
}

export const Header =observer (({header}:HeaderProps) => {
  const store = React.useContext(StoreContext);
  return (
  <>
      <section className="flex flex-row w-[250px] min-w-[233px] h-10 bg-[#101010] align-middle justify-between px-[2px] text-base items-center box-border">
            <div className="left items-center px-[2px]">
              <h2 className="title text-[14px] font-bold pl-3">{header} Properties</h2>
            </div>
            <div className="right px-2">
              <button onClick={()=>store.toggleExpandAll(true)}><AddCircleOutlineIcon/></button>&nbsp;&nbsp;
              <button onClick={()=>store.toggleExpandAll(false)}><RemoveCircleOutlineIcon/></button>
            </div>
      </section>
  </>
  )
})


