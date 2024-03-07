"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { ExportVideoPanel } from "./panels/ExportVideoPanel";
import { AnimationsPanel } from "./panels/AnimationsPanel";
import { AudioResourcesPanel } from "./panels/AudioResourcesPanel";
import { FillPanel } from "./panels/FillPanel";
import { ImageResourcesPanel } from "./panels/ImageResourcesPanel";
import { TextResourcesPanel } from "./panels/TextResourcesPanel";
import { VideoResourcesPanel } from "./panels/VideoResourcesPanel";
import { EffectsPanel } from "./panels/EffectsPanel";
import { AssetsPanel } from "./panels/AssetsPanel";
import {ShapesPanel} from "./panels/ShapesPanel";
import {StickersPanel} from "./panels/StickersPanel";
import { IoMdArrowBack } from "react-icons/io";


export const Resources = observer(() => {
  const store = React.useContext(StoreContext);
  const selectedMenuOption = store.selectedMenuOption;
  return (
    <div className="max-w-[250px] w-auto max-h-[510px] bg-[#101010]" >
      <div className="h-10 flex justify-end">
        <button onClick={()=>{store.selectedMenuOption=null}} className="w-10 h-10">
          <span><IoMdArrowBack size={24}/></span><span></span><span></span>
        </button>
        </div>
        
      {selectedMenuOption === "Video" ? <VideoResourcesPanel /> : null}
      {selectedMenuOption === "Audio" ? <AudioResourcesPanel /> : null}
      {selectedMenuOption === "Image" ? <ImageResourcesPanel /> : null}
      {selectedMenuOption === "Text" ? <TextResourcesPanel /> : null}
      {selectedMenuOption === "Animation" ? <AnimationsPanel /> : null}
      {selectedMenuOption === "Effect" ? <EffectsPanel /> : null}
      {selectedMenuOption === "Export" ? <ExportVideoPanel /> : null}
      {selectedMenuOption === "Fill" ? <FillPanel /> : null}
      {selectedMenuOption === "Assets" ? <AssetsPanel /> : null}
      {selectedMenuOption === "Stickers" ? <StickersPanel /> : null}
      {selectedMenuOption === "Shapes" ? <ShapesPanel /> : null}
      
    </div>
  );
});
