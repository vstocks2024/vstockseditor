"use client";

import { fabric } from "fabric";
import React, { useEffect, useState } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Resources } from "@/components/Resources";
import { ElementsPanel } from "@/components/panels/ElementsPanel";
import { Menu } from "@/components/Menu";
import { TimeLine } from "@/components/TimeLine";
import { Store } from "@/store/Store";
import "@/utils/fabric-utils";
import { MainPart } from "./MainPart";
import {BackCustomize} from "@/components/BackCustomize";
import { MainCanvas } from "@/components/MainCanvas";
import { CanvasFooter } from "@/components/CanvasFooter";




export const EditorWithStore = () => {
  const [store] = useState(new Store());
  return (
    <StoreContext.Provider value={store}>
      <Editor></Editor>
    </StoreContext.Provider>
  );
}

export const Editor = observer(() => {
  const store = React.useContext(StoreContext);
  document.title="Editor--VSTOCKS";
  

  useEffect(() => {
    const canvas = new fabric.Canvas("lower-canvas", {
      height: store.height,
      width: store.width,
      backgroundColor: "#242728",
    });
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#00a0f5";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerStrokeColor = "#0063d8";
    fabric.Object.prototype.cornerSize = 10;
    
    // canvas mouse down without target should deselect active object
    canvas.on("mouse:down", function (e) {
      if (!e.target) {
        store.setSelectedElement(null);
      }
      
    });
    
  
    store.setCanvas(canvas);
    fabric.util.requestAnimFrame(function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  }, []);
  return (
    <React.Fragment >
  
      <main className='min-w-[1349px] max-w-[1349px] min-h-[676px] max-h-[676px] overflow-hidden'>
      <div className="flex flex-col">
      <BackCustomize/>
      <MainPart/>
      </div>
      <div className="flex flex-row">
        <Menu />
       {store.selectedMenuOption ? <Resources/> :null}
        <MainCanvas/>
        <ElementsPanel elementtype={store.selectedElement?.type} />
        </div>
        <CanvasFooter/>
        <TimeLine />
      </main>
    </React.Fragment>
  );
});
