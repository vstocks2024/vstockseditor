"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";

type StickersSelectionResourceProps = {
 name:string;
};

export const StickerSelectionResource = observer(({name}:StickersSelectionResourceProps) => {
  const store = React.useContext(StoreContext);
  return (
    <div>
      {name}
    </div>
  )
})


