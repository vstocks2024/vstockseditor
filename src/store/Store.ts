import { action, makeAutoObservable } from 'mobx';
import { fabric } from 'fabric';
import { getUid, isHtmlAudioElement, isHtmlImageElement, isHtmlVideoElement } from '@/utils';
import anime, { get } from 'animejs';
import { MenuOption, EditorElement, Animation, TimeFrame, VideoEditorElement, AudioEditorElement, Placement, ImageEditorElement, Effect, TextEditorElement } from '@/types';
import { FabricUitls } from '@/utils/fabric-utils';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { CoverImage, Gradient, IShadowOptions, Image, Pattern, Shadow,Textbox } from 'fabric/fabric-impl';


export class Store {
  canvas: fabric.Canvas | null;
  backgroundColor: string;
  width:number;
  height:number;

  selectedMenuOption: MenuOption;
  audios: {fileid:string;filename:string;
    filesource:string;}[]
  videos: {fileid:string;filename:string;
              filesource:string;}[]
  images: {fileid:string;filename:string;
       filesource:string;}[]
  editorElements: EditorElement[]
  selectedElement: EditorElement | null;
  maxTime: number
  animations: Animation[]
  animationTimeLine: anime.AnimeTimelineInstance;
  playing: boolean;
  currentKeyFrame: number;
  fps: number;
  possibleVideoFormats: string[] = ['mp4', 'webm'];
  selectedVideoFormat: 'mp4' | 'webm';
  expandAll:boolean;
  
   

  constructor() {
    this.canvas = null;
    this.videos = [];
    this.images = [];
    this.audios = [];
    this.editorElements = [];
    this.width=775;
    this.height=436;
    this.backgroundColor = '#242728';
    this.maxTime = 15 * 1000;
    this.playing = false;
    this.currentKeyFrame = 0;
    this.selectedElement = null;
    this.fps = 60;
    this.animations = [];
    this.animationTimeLine = anime.timeline();
    this.selectedMenuOption = null;
    this.selectedVideoFormat = 'mp4';
    this.expandAll=true;
    

    makeAutoObservable(this);
  }

  toggleExpandAll(expand:boolean){
    this.expandAll=expand;
  }

  get currentTimeInMs() {
    return this.currentKeyFrame * 1000 / this.fps;
  }

  setCurrentTimeInMs(time: number) {
    this.currentKeyFrame = Math.floor(time / 1000 * this.fps);
  }

  setSelectedMenuOption(selectedMenuOption: MenuOption) {
    this.selectedMenuOption = selectedMenuOption;
  }

  setCanvas(canvas: fabric.Canvas | null) {
    this.canvas = canvas;
    if (canvas) {
      canvas.backgroundColor = this.backgroundColor;
    }
  }
  
  setFlipHorizontal(element:EditorElement){
    if(isEditorAudioElement(element)) return;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:!element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
    overline:element.placement.overline,
    linethrough:element.placement.linethrough,
  lineHeight:element.placement.lineHeight,
fill:element.placement.fill,
backgroundColor:element.placement.backgroundColor,
selectable:element.placement.selectable,
visible:element.placement.visible,
hasControls:element.placement.hasControls,
hasBorders: element.placement.hasBorders,
hasRotatingPoint: element.placement.hasRotatingPoint,
lockMovementX:element.placement.lockMovementX,
stroke:element.placement.stroke,
strokeWidth:element.placement.strokeWidth,
strokeUniform:element.placement.strokeUniform,
strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
  }

  setFlipVertical(element:EditorElement){
    if(isEditorAudioElement(element)) return;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:!element.placement.flipY,
    textAlign:element.placement.textAlign,opacity:element.placement.opacity,
    underline:element.placement.underline,
    overline:element.placement.overline,
    linethrough:element.placement.linethrough,
    lineHeight:element.placement.lineHeight,
fill:element.placement.fill,
backgroundColor:element.placement.backgroundColor,
selectable:element.placement.selectable,
visible:element.placement.visible,
hasControls:element.placement.hasControls,
hasBorders: element.placement.hasBorders,
hasRotatingPoint: element.placement.hasRotatingPoint,
lockMovementX:element.placement.lockMovementX,
stroke:element.placement.stroke,
strokeWidth:element.placement.strokeWidth,
strokeUniform:element.placement.strokeUniform,
strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
  }

  setTextAlignmentToLeft(element:EditorElement){
    if(isEditorVideoElement(element) || isEditorImageElement(element) || isEditorAudioElement(element)) return;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
    textAlign:"left",opacity:element.placement.opacity,
    underline:element.placement.underline,
    overline:element.placement.overline,
    linethrough:element.placement.linethrough,
    lineHeight:element.placement.lineHeight,
fill:element.placement.fill,
backgroundColor:element.placement.backgroundColor,
selectable:element.placement.selectable,
visible:element.placement.visible,
hasControls:element.placement.hasControls,
hasBorders: element.placement.hasBorders,
hasRotatingPoint: element.placement.hasRotatingPoint,
lockMovementX:element.placement.lockMovementX,
stroke:element.placement.stroke,
strokeWidth:element.placement.strokeWidth,
strokeUniform:element.placement.strokeUniform,
strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
  }

  setTextAlignmentToRight(element:EditorElement){
    if(isEditorVideoElement(element) || isEditorImageElement(element) || isEditorAudioElement(element)) return;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
    textAlign:"right",opacity:element.placement.opacity,
    underline:element.placement.underline,
    overline:element.placement.overline,
    linethrough:element.placement.linethrough,
    lineHeight:element.placement.lineHeight,
fill:element.placement.fill,
backgroundColor:element.placement.backgroundColor,
selectable:element.placement.selectable,
visible:element.placement.visible,
hasControls:element.placement.hasControls,
hasBorders: element.placement.hasBorders,
hasRotatingPoint: element.placement.hasRotatingPoint,
lockMovementX:element.placement.lockMovementX,
stroke:element.placement.stroke,
strokeWidth:element.placement.strokeWidth,
strokeUniform:element.placement.strokeUniform,
strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
  }

  setTextAlignmentToCenter(element:EditorElement){
    if(isEditorVideoElement(element) || isEditorImageElement(element) || isEditorAudioElement(element)) return;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
    textAlign:"center",opacity:element.placement.opacity,
    underline:element.placement.underline,
    overline:element.placement.overline,
    linethrough:element.placement.linethrough,
    lineHeight:element.placement.lineHeight,
fill:element.placement.fill,
backgroundColor:element.placement.backgroundColor,
selectable:element.placement.selectable,
visible:element.placement.visible,
hasControls:element.placement.hasControls,
hasBorders: element.placement.hasBorders,
hasRotatingPoint: element.placement.hasRotatingPoint,
lockMovementX:element.placement.lockMovementX,
stroke:element.placement.stroke,
strokeWidth:element.placement.strokeWidth,
strokeUniform:element.placement.strokeUniform,
strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
  }

  setTextAlignmentToJustify(element:EditorElement){
    if(isEditorVideoElement(element) || isEditorImageElement(element) || isEditorAudioElement(element)) return;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
    textAlign:"justify",opacity:element.placement.opacity,
    underline:element.placement.underline,
    overline:element.placement.overline,
    linethrough:element.placement.linethrough,
    lineHeight:element.placement.lineHeight,
fill:element.placement.fill,
backgroundColor:element.placement.backgroundColor,
selectable:element.placement.selectable,
visible:element.placement.visible,
hasControls:element.placement.hasControls,
hasBorders: element.placement.hasBorders,
hasRotatingPoint: element.placement.hasRotatingPoint,
lockMovementX:element.placement.lockMovementX,
stroke:element.placement.stroke,
strokeWidth:element.placement.strokeWidth,
strokeUniform:element.placement.strokeUniform,
strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
  }

  setObjectAlignmentToLeft(element:EditorElement){
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:0,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
fill:element.placement.fill,
backgroundColor:element.placement.backgroundColor,
selectable:element.placement.selectable,
visible:element.placement.visible,
hasControls:element.placement.hasControls,
hasBorders: element.placement.hasBorders,
hasRotatingPoint: element.placement.hasRotatingPoint,
lockMovementX:element.placement.lockMovementX,
stroke:element.placement.stroke,
strokeWidth:element.placement.strokeWidth,
strokeUniform:element.placement.strokeUniform,
strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
  }

  setObjectAlignmentCanvasCenter(element:EditorElement){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:(this.canvas.getWidth()-element.placement.width)/2,y:(this.canvas.getHeight()-element.placement.height)/2,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
fill:element.placement.fill,
backgroundColor:element.placement.backgroundColor,
selectable:element.placement.selectable,
visible:element.placement.visible,
hasControls:element.placement.hasControls,
hasBorders: element.placement.hasBorders,
hasRotatingPoint: element.placement.hasRotatingPoint,
lockMovementX:element.placement.lockMovementX,
stroke:element.placement.stroke,
strokeWidth:element.placement.strokeWidth,
strokeUniform:element.placement.strokeUniform,
strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
  }

  setObjectAlignmentHorizontalCenter(element:EditorElement){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:(this.canvas.getWidth()-element.placement.width)/2,y:element.placement.y,scaleX:element.placement.scaleX
    ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
    ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
    textAlign:element.placement.textAlign,opacity:element.placement.opacity,
    underline:element.placement.underline,
    overline:element.placement.overline,
    linethrough:element.placement.linethrough,
    lineHeight:element.placement.lineHeight,
fill:element.placement.fill,
backgroundColor:element.placement.backgroundColor,
selectable:element.placement.selectable,
visible:element.placement.visible,
hasControls:element.placement.hasControls,
hasBorders: element.placement.hasBorders,
hasRotatingPoint: element.placement.hasRotatingPoint,
lockMovementX:element.placement.lockMovementX,
stroke:element.placement.stroke,
strokeWidth:element.placement.strokeWidth,
strokeUniform:element.placement.strokeUniform,
strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
  const newElement={...element,placement:newPlacement};
  this.updateEditorElement(newElement);
  }

  setObjectAlignmentVerticalCenter(element:EditorElement){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:(this.canvas.getHeight()-element.placement.height)/2,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
fill:element.placement.fill,
backgroundColor:element.placement.backgroundColor,
selectable:element.placement.selectable,
visible:element.placement.visible,
hasControls:element.placement.hasControls,
hasBorders: element.placement.hasBorders,
hasRotatingPoint: element.placement.hasRotatingPoint,
lockMovementX:element.placement.lockMovementX,
stroke:element.placement.stroke,
strokeWidth:element.placement.strokeWidth,
strokeUniform:element.placement.strokeUniform,
strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
  }

  setObjectAlignmentToRight(element:EditorElement){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:this.canvas.getWidth()-element.placement.width,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
fill:element.placement.fill,
backgroundColor:element.placement.backgroundColor,
selectable:element.placement.selectable,
visible:element.placement.visible,
hasControls:element.placement.hasControls,
hasBorders: element.placement.hasBorders,
hasRotatingPoint: element.placement.hasRotatingPoint,
lockMovementX:element.placement.lockMovementX,
stroke:element.placement.stroke,
strokeWidth:element.placement.strokeWidth,
strokeUniform:element.placement.strokeUniform,
strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);    
  }
  setObjectAlignmentToBottom(element:EditorElement){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:this.canvas.getHeight()-element.placement.height,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);    
  }
  
  setObjectAligmentToTop(element:EditorElement){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:0,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);    
  }
  
   setObjectOpacity(element:EditorElement,opacity:number)
   {
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);    
   }

   setObjectWidth(element:EditorElement,newwidth:number){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:newwidth,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);   
   }

   setObjectHeight(element:EditorElement,newHeight:number){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:newHeight
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);   
   }

   setObjectLeftPosition(element:EditorElement,newLeft:number){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:newLeft,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
   }

   setObjectTopPosition(element:EditorElement,newTop:number){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:newTop,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
   }
   

   setObjectRotation(element:EditorElement,newAngle:number){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:newAngle,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,
      overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
   }
   setTextBoxUnderLine(element:EditorElement){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:!element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX, 
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);

   }
   setTextBoxOverLine(element:EditorElement){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:!element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
   }
   setTextBoxLineThrough(element:EditorElement){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:!element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
   }
   
   setTextBoxLineHeight(element:EditorElement,newlineHeight:number){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:newlineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);

   }

      
   setTextBoxFill(element:EditorElement,newFill:string|Pattern|Gradient|undefined){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:newFill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
   }

   setTextBoxBackgroundColor(element:EditorElement,newBackgroundColor:string|undefined){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:newBackgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
      strokeWidth:element.placement.strokeWidth,
      strokeUniform:element.placement.strokeUniform,
      strokeLineCap:element.placement.strokeLineCap,
      strokeLineJoin:element.placement.strokeLineJoin,
      strokeMiterLimit:element.placement.strokeMiterLimit,
      shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
   }
   
   setObjectHidden(element:EditorElement){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:!element.placement.selectable,
      visible:!element.placement.visible,
      hasControls:!element.placement.hasControls,
      hasBorders: !element.placement.hasBorders,
      hasRotatingPoint: !element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
      stroke:element.placement.stroke,
    strokeWidth:element.placement.strokeWidth,
    strokeUniform:element.placement.strokeUniform,
    strokeLineCap:element.placement.strokeLineCap,
    strokeLineJoin:element.placement.strokeLineJoin,
    strokeMiterLimit:element.placement.strokeMiterLimit,
    shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);

   }

   setTextBoxStrokeColor(element:EditorElement,newStroke:string|undefined){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
    stroke:newStroke,
    strokeWidth:element.placement.strokeWidth,
    strokeUniform:element.placement.strokeUniform,
    strokeLineCap:element.placement.strokeLineCap,
    strokeLineJoin:element.placement.strokeLineJoin,
    strokeMiterLimit:element.placement.strokeMiterLimit,
    shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);

   }

   setTextBoxStrokeWidth(element:EditorElement,newStrokeWidth:number|undefined){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
    stroke:element.placement.stroke,
    strokeWidth:newStrokeWidth,
  strokeUniform:element.placement.strokeUniform,
  strokeLineCap:element.placement.strokeLineCap,
  strokeLineJoin:element.placement.strokeLineJoin,
  strokeMiterLimit:element.placement.strokeMiterLimit,
  shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);

   }

   setTextBoxUniformStrokeWidth(element:EditorElement,newstrokeUniform:boolean|undefined){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
    stroke:element.placement.stroke,
    strokeWidth:element.placement.strokeWidth,
  strokeUniform:newstrokeUniform,
  strokeLineCap:element.placement.strokeLineCap,
  strokeLineJoin:element.placement.strokeLineJoin,
  strokeMiterLimit:element.placement.strokeMiterLimit,
  shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
   }
   setTextBoxStrokeLineCap(element:EditorElement,newStrokeLineCap: string | undefined){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
    stroke:element.placement.stroke,
    strokeWidth:element.placement.strokeWidth,
  strokeUniform:element.placement.strokeUniform,
  strokeLineCap:newStrokeLineCap,
  strokeLineJoin:element.placement.strokeLineJoin,
  strokeMiterLimit:element.placement.strokeMiterLimit,
  shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
   }
   setTextBoxStrokeLineJoin(element:EditorElement,newStrokeLineJoin: string | undefined){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
    stroke:element.placement.stroke,
    strokeWidth:element.placement.strokeWidth,
  strokeUniform:element.placement.strokeUniform,
  strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:newStrokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);
   }

   setTextBoxStrokeMiterLimit(element:EditorElement,newStrokeMiterLimit: number | undefined){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
    stroke:element.placement.stroke,
    strokeWidth:element.placement.strokeWidth,
  strokeUniform:element.placement.strokeUniform,
  strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:newStrokeMiterLimit,
shadow:element.placement.shadow,};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);

   }

  setTextBoxShadow(element:EditorElement,newShadow:Shadow | string | undefined){
    if(!this.canvas) return;
    if(isEditorAudioElement(element)) return ;
    const newPlacement={x:element.placement.x,y:element.placement.y,scaleX:element.placement.scaleX
      ,scaleY:element.placement.scaleY,width:element.placement.width,height:element.placement.height
      ,rotation:element.placement.rotation,flipX:element.placement.flipX,flipY:element.placement.flipY,
      textAlign:element.placement.textAlign,opacity:element.placement.opacity,
      underline:element.placement.underline,overline:element.placement.overline,
      linethrough:element.placement.linethrough,
      lineHeight:element.placement.lineHeight,
      fill:element.placement.fill,
      backgroundColor:element.placement.backgroundColor,
      selectable:element.placement.selectable,
      visible:element.placement.visible,
      hasControls:element.placement.hasControls,
      hasBorders: element.placement.hasBorders,
      hasRotatingPoint: element.placement.hasRotatingPoint,
      lockMovementX:element.placement.lockMovementX,
    stroke:element.placement.stroke,
    strokeWidth:element.placement.strokeWidth,
  strokeUniform:element.placement.strokeUniform,
  strokeLineCap:element.placement.strokeLineCap,
strokeLineJoin:element.placement.strokeLineJoin,
strokeMiterLimit:element.placement.strokeMiterLimit,
shadow:newShadow};
    const newElement={...element,placement:newPlacement};
    this.updateEditorElement(newElement);

    
  
  }

  setBackgroundColor(backgroundColor: string) {
    this.backgroundColor = backgroundColor;
    if (this.canvas) {
      this.canvas.backgroundColor = backgroundColor;
    }
  }



  updateEffect(id: string, effect: Effect) {
    const index = this.editorElements.findIndex((element) => element.id === id);
    const element = this.editorElements[index];
    if (isEditorVideoElement(element) || isEditorImageElement(element)) {
      element.properties.effect = effect;
    }
    this.refreshElements();
  }

  setVideos(videos:{fileid:string,filename:string,filesource:string}[]) {
    this.videos = videos;
  }
  setImages(images:{fileid:string,filename:string, filesource:string}[])
  {
    this.images=images;
  }
  setAudios(audios:{fileid:string;filename:string;
    filesource:string;}[])
    {
      this.audios=audios;
    }

  addVideoResource(video:{fileid:string,filename:string,filesource:string}) {
    this.videos = [...this.videos, video];
  }
  addAudioResource(audio: {fileid:string ;filename:string;
    filesource:string;}) {
    this.audios = [...this.audios, audio];
  }
  addImageResource(image: {fileid:string,filename:string;filesource:string;}) {
    this.images = [...this.images, image];
  }

  addAnimation(animation: Animation) {
    this.animations = [...this.animations, animation];
    this.refreshAnimations();
  }
  updateAnimation(id: string, animation: Animation) {
    const index = this.animations.findIndex((a) => a.id === id);
    this.animations[index] = animation;
    this.refreshAnimations();
  }

  refreshAnimations() {
    anime.remove(this.animationTimeLine);
    this.animationTimeLine = anime.timeline({
      duration: this.maxTime,
      autoplay: false,
    });
    for (let i = 0; i < this.animations.length; i++) {
      const animation = this.animations[i];
      const editorElement = this.editorElements.find((element) => element.id === animation.targetId);
      const fabricObject = editorElement?.fabricObject;
      if (!editorElement || !fabricObject) {
        continue;
      }
      fabricObject.clipPath = undefined;
      switch (animation.type) {
        case "fadeIn": {
          this.animationTimeLine.add({
            opacity: [0, 1],
            duration: animation.duration,
            targets: fabricObject,
            easing: 'linear',
          }, editorElement.timeFrame.start);
          break;
        }
        case "fadeOut": {
          this.animationTimeLine.add({
            opacity: [1, 0],
            duration: animation.duration,
            targets: fabricObject,
            easing: 'linear',
          }, editorElement.timeFrame.end - animation.duration);
          break
        }
        case "slideIn": {
          const direction = animation.properties.direction;
          const targetPosition = {
            left: editorElement.placement.x,
            top: editorElement.placement.y,
          }
          const startPosition = {
            left: (direction === "left" ? - editorElement.placement.width : direction === "right" ? this.canvas?.width : editorElement.placement.x),
            top: (direction === "top" ? - editorElement.placement.height : direction === "bottom" ? this.canvas?.height : editorElement.placement.y),
          }
          if (animation.properties.useClipPath) {
            const clipRectangle = FabricUitls.getClipMaskRect(editorElement, 50);
            fabricObject.set('clipPath', clipRectangle)
          }
          if (editorElement.type === "text" && animation.properties.textType === "character") {
            this.canvas?.remove(...editorElement.properties.splittedTexts)
            // @ts-ignore
            editorElement.properties.splittedTexts = getTextObjectsPartitionedByCharacters(editorElement.fabricObject, editorElement);
            editorElement.properties.splittedTexts.forEach((textObject) => {
              this.canvas!.add(textObject);
            })
            const duration = animation.duration / 2;
            const delay = duration / editorElement.properties.splittedTexts.length;
            for (let i = 0; i < editorElement.properties.splittedTexts.length; i++) {
              const splittedText = editorElement.properties.splittedTexts[i];
              const offset = {
                left: splittedText.left! - editorElement.placement.x,
                top: splittedText.top! - editorElement.placement.y
              }
              this.animationTimeLine.add({
                left: [startPosition.left! + offset.left, targetPosition.left + offset.left],
                top: [startPosition.top! + offset.top, targetPosition.top + offset.top],
                delay: i * delay,
                duration: duration,
                targets: splittedText,
              }, editorElement.timeFrame.start);
            }
            this.animationTimeLine.add({
              opacity: [1, 0],
              duration: 1,
              targets: fabricObject,
              easing: 'linear',
            }, editorElement.timeFrame.start);
            this.animationTimeLine.add({
              opacity: [0, 1],
              duration: 1,
              targets: fabricObject,
              easing: 'linear',
            }, editorElement.timeFrame.start + animation.duration);

            this.animationTimeLine.add({
              opacity: [0, 1],
              duration: 1,
              targets: editorElement.properties.splittedTexts,
              easing: 'linear',
            }, editorElement.timeFrame.start);
            this.animationTimeLine.add({
              opacity: [1, 0],
              duration: 1,
              targets: editorElement.properties.splittedTexts,
              easing: 'linear',
            }, editorElement.timeFrame.start + animation.duration);
          }
          this.animationTimeLine.add({
            left: [startPosition.left, targetPosition.left],
            top: [startPosition.top, targetPosition.top],
            duration: animation.duration,
            targets: fabricObject,
            easing: 'linear',
          }, editorElement.timeFrame.start);
          break
        }
        case "slideOut": {
          const direction = animation.properties.direction;
          const startPosition = {
            left: editorElement.placement.x,
            top: editorElement.placement.y,
          }
          const targetPosition = {
            left: (direction === "left" ? - editorElement.placement.width : direction === "right" ? this.canvas?.width : editorElement.placement.x),
            top: (direction === "top" ? -100 - editorElement.placement.height : direction === "bottom" ? this.canvas?.height : editorElement.placement.y),
          }
          if (animation.properties.useClipPath) {
            const clipRectangle = FabricUitls.getClipMaskRect(editorElement, 50);
            fabricObject.set('clipPath', clipRectangle)
          }
          this.animationTimeLine.add({
            left: [startPosition.left, targetPosition.left],
            top: [startPosition.top, targetPosition.top],
            duration: animation.duration,
            targets: fabricObject,
            easing: 'linear',
          }, editorElement.timeFrame.end - animation.duration);
          break
        }
        case "breathe": {
          const itsSlideInAnimation = this.animations.find((a) => a.targetId === animation.targetId && (a.type === "slideIn"));
          const itsSlideOutAnimation = this.animations.find((a) => a.targetId === animation.targetId && (a.type === "slideOut"));
          const timeEndOfSlideIn = itsSlideInAnimation ? editorElement.timeFrame.start + itsSlideInAnimation.duration : editorElement.timeFrame.start;
          const timeStartOfSlideOut = itsSlideOutAnimation ? editorElement.timeFrame.end - itsSlideOutAnimation.duration : editorElement.timeFrame.end;
          if (timeEndOfSlideIn > timeStartOfSlideOut) {
            continue;
          }
          const duration = timeStartOfSlideOut - timeEndOfSlideIn;
          const easeFactor = 4;
          const suitableTimeForHeartbeat = 1000 * 60 / 72 * easeFactor
          const upScale = 1.05;
          const currentScaleX = fabricObject.scaleX ?? 1;
          const currentScaleY = fabricObject.scaleY ?? 1;
          const finalScaleX = currentScaleX * upScale;
          const finalScaleY = currentScaleY * upScale;
          const totalHeartbeats = Math.floor(duration / suitableTimeForHeartbeat);
          if (totalHeartbeats < 1) {
            continue;
          }
          const keyframes = [];
          for (let i = 0; i < totalHeartbeats; i++) {
            keyframes.push({ scaleX: finalScaleX, scaleY: finalScaleY });
            keyframes.push({ scaleX: currentScaleX, scaleY: currentScaleY });
          }

          this.animationTimeLine.add({
            duration: duration,
            targets: fabricObject,
            keyframes,
            easing: 'linear',
            loop: true
          }, timeEndOfSlideIn);

          break
        }
      }
    }
  }

  removeAnimation(id: string) {
    this.animations = this.animations.filter(
      (animation) => animation.id !== id
    );
    this.refreshAnimations();
  }

  setSelectedElement(selectedElement: EditorElement | null) {
    this.selectedElement = selectedElement;
    if (this.canvas) {
      if (selectedElement?.fabricObject)
        this.canvas.setActiveObject(selectedElement.fabricObject);
      else
        this.canvas.discardActiveObject();
    }
    
  }
  updateSelectedElement() {
    this.selectedElement = this.editorElements.find((element) => element.id === this.selectedElement?.id) ?? null;
  }

  setEditorElements(editorElements: EditorElement[]) {
    this.editorElements = editorElements;
    this.updateSelectedElement();
    this.refreshElements();
    // this.refreshAnimations();
  }

  updateEditorElement(editorElement: EditorElement) {
    this.setEditorElements(this.editorElements.map((element) =>
      element.id === editorElement.id ? editorElement : element
    ));
  }

  updateEditorElementTimeFrame(editorElement: EditorElement, timeFrame: Partial<TimeFrame>) {
    if (timeFrame.start != undefined && timeFrame.start < 0) {
      timeFrame.start = 0;
    }
    if (timeFrame.end != undefined && timeFrame.end > this.maxTime) {
      timeFrame.end = this.maxTime;
    }
    const newEditorElement = {
      ...editorElement,
      timeFrame: {
        ...editorElement.timeFrame,
        ...timeFrame,
      }
    }
    this.updateVideoElements();
    this.updateAudioElements();
    this.updateEditorElement(newEditorElement);
    this.refreshAnimations();
  }

  addEditorElementAfterFetch(editorElement:EditorElement)
  {
    this.setEditorElements([...this.editorElements, editorElement]);
    this.refreshElements();
  }
  addEditorElement(editorElement: EditorElement) {
    this.setEditorElements([...this.editorElements, editorElement]);
    this.refreshElements();
    this.setSelectedElement(this.editorElements[this.editorElements.length - 1]);
  }

  removeEditorElement(id: string) {
    this.setEditorElements(this.editorElements.filter(
      (editorElement) => editorElement.id !== id
    ));
    this.refreshElements();
  }

  removeAllEditorElements()
  {
    this.editorElements=[];
  }
  setMaxTime(maxTime: number) {
    this.maxTime = maxTime;
  }


  setPlaying(playing: boolean) {
    this.playing = playing;
    this.updateVideoElements();
    this.updateAudioElements();
    if (playing) {
      this.startedTime = Date.now();
      this.startedTimePlay = this.currentTimeInMs
      requestAnimationFrame(() => {
        this.playFrames();
      });
    }
  }

  startedTime = 0;
  startedTimePlay = 0;

  playFrames() {
    if (!this.playing) {
      return;
    }
    const elapsedTime = Date.now() - this.startedTime;
    const newTime = this.startedTimePlay + elapsedTime;
    this.updateTimeTo(newTime);
    if (newTime > this.maxTime) {
      this.currentKeyFrame = 0;
      this.setPlaying(false);
    } else {
      requestAnimationFrame(() => {
        this.playFrames();
      });
    }
  }
  updateTimeTo(newTime: number) {
    this.setCurrentTimeInMs(newTime);
    this.animationTimeLine.seek(newTime);
    if (this.canvas) {
      this.canvas.backgroundColor = this.backgroundColor;
    }
    this.editorElements.forEach( e => {
        if (!e.fabricObject) return;
        const isInside = e.timeFrame.start <= newTime && newTime <= e.timeFrame.end;
        e.fabricObject.visible = isInside;
      }
    )
  }

  handleSeek(seek: number) {
    if (this.playing) {
      this.setPlaying(false);
    }
    this.updateTimeTo(seek);
    this.updateVideoElements();
    this.updateAudioElements();
  }
  
  addVideo(fileid:string,filename:string,index: number) {
    const videoElement = document.getElementById(`video-${index}`)
    if (!isHtmlVideoElement(videoElement)) {
      return;
    }
    const videoDurationMs = videoElement.duration * 1000;
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    const id = `${fileid}.${getUid()}`;
    this.addEditorElement(
      {
        id,
        name: `${filename}`,
        type: "video",
        placement: {
          x: 400,
          y: 250,
          width: 100 * aspectRatio,
          height: 100,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          flipX: false,
          flipY: false,
          opacity: 1.0,
          crossOrigin:"allow-credentials",
        },
        timeFrame: {
          start: 0,
          end: videoDurationMs,
        },
        properties: {
          elementId: `${id}`,
          src: videoElement.src,
          effect: {
            type: "none",
          }
        },
        fabricObject: new fabric.Object
      },
    );
  }

  addImage(fileid:string,filename:string,index: number) {
    const imageElement = document.getElementById(`image-${index}`)
    if (!isHtmlImageElement(imageElement)) {
      return;
    }
    const aspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
    const id = `${fileid}.${getUid()}`;
    this.addEditorElement(
      {
        id,
        name: `${filename}`,
        type: "image",
        placement: {
          x: 0,
          y: 0,
          width: 100 * aspectRatio,
          height: 100,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          flipX: false,
          flipY: false,
          opacity: 1.0,
          stroke: undefined,
          strokeWidth: 1,
          strokeUniform: undefined,
          strokeLineCap: "butt",
          shadow: new fabric.Shadow({ color: "blue", blur: 0.6, offsetX: 2, offsetY: 2 }),
          crossOrigin: "allow-credentials",
        },
        timeFrame: {
          start: 0,
          end: this.maxTime,
        },
        properties: {
          elementId: `${id}`,
          src: imageElement.src,
          effect: {
            type: "none",
          }
        },
        fabricObject: new fabric.Object
      },
    );
  }

  addAudio(fileid:string,filename:string,index: number) {
    const audioElement = document.getElementById(`audio-${index}`)
    if (!isHtmlAudioElement(audioElement)) {
      return;
    }
    const audioDurationMs = audioElement.duration * 1000;
    const id = getUid();
    this.addEditorElement(
      {
        id,
        name: `Media(audio) ${index + 1}`,
        type: "audio",
        placement: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          rotation: 0,
          scaleX: 0,
          scaleY: 0,
          flipX: false,
          flipY: false,
          opacity: 0,
          crossOrigin:"allow-credentials",
        },
        timeFrame: {
          start: 0,
          end: audioDurationMs,
        },
        properties: {
          elementId: `audio-${id}`,
          src: audioElement.src,
        },
        fabricObject: new fabric.Object
      },
    );

  }
  addText(options: {
    text: string ,
    fontSize: number | undefined,
    fontWeight: string | number | undefined
  }) {
    const id = getUid();
    const index = this.editorElements.length;
    this.addEditorElement(
      {
        id,
        name: `Text ${index + 1}`,
        type: "text",
        placement: {
          x:300,
          y:200,
          width: 200,
          height: 100,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          flipX: false,
          flipY: false,
          textAlign: "center",
          opacity: 1.0,
          underline: false,
          overline: false,
          linethrough: false,
          lineHeight: 1.6,
          fill: "#FFFFFF",
          backgroundColor: undefined,
          selectable: true,
          visible: true,
          hasControls: true,
          hasBorders: true,
          hasRotatingPoint: true,
          lockMovementX: false,
          stroke: undefined,
          strokeWidth: 1,
          strokeUniform: undefined,
          strokeLineCap: "butt",
          strokeLineJoin: "milter",
          strokeMiterLimit: 1,
          shadow: new fabric.Shadow({ color: "blue", blur: 0, offsetX: 0, offsetY: 0 }),
          crossOrigin:"allow-credentials"
        },
        timeFrame: {
          start: 0,
          end: this.maxTime,
        },
        properties: {
          text: options.text,
          fontSize: options.fontSize,
          fontWeight: options.fontWeight,
          fontFamily:undefined,
          splittedTexts: []
        },
        fabricObject: new fabric.Object
      },
    );
  }

  updateVideoElements() {
    this.editorElements.filter(
      (element): element is VideoEditorElement =>
        element.type === "video"
    )
      .forEach((element) => {
        const video = document.getElementById(element.properties.elementId);
        if (isHtmlVideoElement(video)) {
          const videoTime = (this.currentTimeInMs - element.timeFrame.start) / 1000;
          video.currentTime = videoTime;
          if (this.playing) {
            video.play();
          } else {
            video.pause();
          }
        }
      })
  }
  updateAudioElements() {
    this.editorElements.filter(
      (element): element is AudioEditorElement =>
        element.type === "audio"
    )
      .forEach((element) => {
        const audio = document.getElementById(element.properties.elementId);
        if (isHtmlAudioElement(audio)) {
          const audioTime = (this.currentTimeInMs - element.timeFrame.start) / 1000;
          audio.currentTime = audioTime;
          if (this.playing) {
            audio.play();
          } else {
            audio.pause();
          }
        }
      })
  }
  // saveCanvasToVideo() {
  //   const video = document.createElement("video");
  //   const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  //   const stream = canvas.captureStream();
  //   video.srcObject = stream;
  //   video.play();
  //   const mediaRecorder = new MediaRecorder(stream);
  //   const chunks: Blob[] = [];
  //   mediaRecorder.ondataavailable = function (e) {
  //     console.log("data available");
  //     console.log(e.data);
  //     chunks.push(e.data);
  //   };
  //   mediaRecorder.onstop = function (e) {
  //     const blob = new Blob(chunks, { type: "video/webm" });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "video.webm";
  //     a.click();
  //   };
  //   mediaRecorder.start();
  //   setTimeout(() => {
  //     mediaRecorder.stop();
  //   }, this.maxTime);

  // }

  setVideoFormat(format: 'mp4' | 'webm') {
    this.selectedVideoFormat = format;
  }

  saveCanvasToVideoWithAudio() {
    this.saveCanvasToVideoWithAudioWebmMp4();
  }

  saveCanvasToVideoWithAudioWebmMp4() {
    try{
    console.log('modified')
    let mp4 = this.selectedVideoFormat === 'mp4'
    const canvas = document.getElementById("lower-canvas") as HTMLCanvasElement;
    canvas
    //canvas.crossOrigin="allow-credentials";
    const stream = (canvas as HTMLCanvasElement).captureStream(30);
    const audioElements = this.editorElements.filter(isEditorAudioElement)
    const audioStreams: MediaStream[] = [];
    audioElements.forEach((audio) => {
      const audioElement = document.getElementById(audio.properties.elementId) as HTMLAudioElement;
      let ctx = new AudioContext();
      let sourceNode = ctx.createMediaElementSource(audioElement);
      let dest = ctx.createMediaStreamDestination();
      sourceNode.connect(dest);
      sourceNode.connect(ctx.destination);
      audioStreams.push(dest.stream);
    });
    audioStreams.forEach((audioStream) => {
      stream.addTrack(audioStream.getAudioTracks()[0]);
    });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.height = 500;
    video.width = 800;
    // video.controls = true;
    // document.body.appendChild(video);
    video.play().then(() => {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = function (e) {
        console.log(e.data);
        chunks.push(e.data);
        console.log("data available");
      };
      mediaRecorder.onstop = async function (e) {
        const blob = new Blob(chunks, { type: "video/webm" });

        if (mp4) {
          // lets use ffmpeg to convert webm to mp4
          const data = new Uint8Array(await (blob).arrayBuffer());
          const ffmpeg = new FFmpeg();
          const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd"
          await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            // workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
          });
          await ffmpeg.writeFile('video.webm', data);
          await ffmpeg.exec(["-y", "-i", "video.webm", "-c", "copy", "video.mp4"]);
          // await ffmpeg.exec(["-y", "-i", "video.webm", "-c:v", "libx264", "video.mp4"]);

          const output = await ffmpeg.readFile('video.mp4');
          const outputBlob = new Blob([output], { type: "video/mp4" });
          const outputUrl = URL.createObjectURL(outputBlob);
          const a = document.createElement("a");
          a.download = "video.mp4";
          a.href = outputUrl;
          a.click();
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "video.webm";
          a.click();
        }
      };
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, this.maxTime);
      video.remove();
    })
  }
  catch(err)
  {
    console.log(err);
  }
  }

 

  refreshElements() {
    const store = this;
    if (!store.canvas) return;
    const canvas = store.canvas;
    
    store.canvas.remove(...store.canvas.getObjects());
    for (let index = 0; index < store.editorElements.length; index++) {
      const element = store.editorElements[index];
      switch (element.type) {
        case "video": {
          //console.log("elementid", element.properties.elementId);
          if (document.getElementById(element.properties.elementId) == null)
            continue;
          const videoElement = document.getElementById(
            element.properties.elementId
          );
          if (!isHtmlVideoElement(videoElement)) continue;
          // const filters = [];
          // if (element.properties.effect?.type === "blackAndWhite") {
          //   filters.push(new fabric.Image.filters.Grayscale());
          // }
          const videoObject = new fabric.CoverVideo(videoElement, {
            name: element.id,
            left: element.placement.x,
            top: element.placement.y,
            width: element.placement.width,
            height: element.placement.height,
            scaleX: element.placement.scaleX,
            scaleY: element.placement.scaleY,
            flipX:element.placement.flipX,
            flipY:element.placement.flipY,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
        
            opacity:element.placement.opacity,
            crossOrigin:element.placement.crossOrigin,
            // filters: filters,
            // @ts-ignore
            customFilter: element.properties.effect.type,
          });

          element.fabricObject = videoObject;
          element.properties.imageObject = videoObject;
          videoElement.width = 100;
          videoElement.height =
            (videoElement.videoHeight * 100) / videoElement.videoWidth;
          canvas.add(videoObject);
          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target as fabric.CoverVideo;
            if (target != videoObject) return;
            const placement = element.placement;
            const newPlacement: Placement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              width:
                target.width && target.scaleX
                  ? target.width * target.scaleX
                  : placement.width,
              height:
                target.height && target.scaleY
                  ? target.height * target.scaleY
                  : placement.height,
              scaleX: 1,
              scaleY: 1,
              flipX:target.flipX ??placement.flipX,
              flipY:target.flipY ?? placement.flipY,
              opacity:target.opacity ?? placement.opacity,
              crossOrigin:target.crossOrigin ?? placement.crossOrigin,
   
            };
            const newElement = {
              ...element,
              placement: newPlacement,
            };
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "image": {
          if (document.getElementById(element.properties.elementId) == null)
            continue;
          const imageElement = document.getElementById(
            element.properties.elementId
          );
          if (!isHtmlImageElement(imageElement)) continue;
          
          // const filters = [];
          // if (element.properties.effect?.type === "blackAndWhite") {
          //   filters.push(new fabric.Image.filters.Grayscale());
          // }
          const imageObject:Image = new fabric.CoverImage(imageElement, {
            name: element.id,
            left: element.placement.x,
            top: element.placement.y,
            flipX:element.placement.flipX,
            flipY:element.placement.flipY,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
            opacity:element.placement.opacity,
            stroke:element.placement.stroke,
            strokeWidth:element.placement.strokeWidth,
            strokeUniform:element.placement.strokeUniform,
            strokeLineCap:element.placement.strokeLineCap,
            shadow:element.placement.shadow,
            crossOrigin:element.placement.crossOrigin,
            // filters
            // @ts-ignore
            customFilter: element.properties.effect.type,
          });
          // imageObject.applyFilters();
          element.fabricObject = imageObject;
          element.properties.imageObject = imageObject;
          const image = {
            w: imageElement.naturalWidth,
            h: imageElement.naturalHeight,
          };
          //console.log(imageElement.naturalWidth,imageElement.width);
          imageObject.width = image.w;
          imageObject.height = image.h;
          imageElement.width = image.w;
          imageElement.height = image.h;
  
          imageObject.scaleToHeight(image.w);
          imageObject.scaleToWidth(image.h);
          const toScale = {
            x: element.placement.width / image.w,
            y: element.placement.height / image.h,
          };
          imageObject.scaleX = toScale.x * element.placement.scaleX;
          imageObject.scaleY = toScale.y * element.placement.scaleY;
          canvas.add(imageObject);
          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target as Image;
            if (target != imageObject) return;
            const placement = element.placement;
            let fianlScale = 1;
            if (target.scaleX && target.scaleX > 0) {
              fianlScale = target.scaleX / toScale.x;
            }
            const newPlacement: Placement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              flipX:target.flipX ?? placement.flipX,
              flipY:target.flipY ?? placement.flipY,
              rotation: target.angle ?? placement.rotation,
              scaleX: fianlScale,
              scaleY: fianlScale,
              opacity:target.opacity ?? placement.opacity,
              stroke:target.stroke ?? placement.stroke,
              strokeWidth:target.strokeWidth ?? placement.strokeWidth,
              strokeUniform:target.strokeUniform ?? placement.strokeUniform,
              strokeLineCap:target.strokeLineCap ?? placement.strokeLineCap,
              shadow:target.shadow ?? placement.shadow,
              crossOrigin:target.crossOrigin ?? placement.crossOrigin,
              
              
              
            };
            const newElement = {
              ...element,
              placement: newPlacement,
            };
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "audio": {
          break;
        }
        case "text": {
 

          const textObject:fabric.Textbox = new fabric.Textbox(element.properties.text, {
            name: element.id,
            left: element.placement.x,
            top: element.placement.y,
            scaleX:element.placement.scaleX,
            scaleY:element.placement.scaleY,
            width:element.placement.width,
            height:element.placement.height,
            flipX:element.placement.flipX,
            flipY:element.placement.flipY,
            angle:element.placement.rotation,

      
            
            textAlign:element.placement.textAlign,
            underline:element.placement.underline,
            overline:element.placement.overline,
            linethrough:element.placement.linethrough,
            lineHeight:element.placement.lineHeight,
            opacity:element.placement.opacity,
            objectCaching: false,
            lockUniScaling: true,
            fill:element.placement.fill,
            backgroundColor:element.placement.backgroundColor,
            selectable:element.placement.selectable,
            visible:element.placement.visible,
            hasControls:element.placement.hasControls,
            hasBorders:element.placement.hasBorders,
            hasRotatingPoint:element.placement.hasRotatingPoint,
            lockMovementX:element.placement.lockMovementX,

            stroke:element.placement.stroke,
            strokeWidth:element.placement.strokeWidth,
            strokeUniform:element.placement.strokeUniform,
            strokeLineCap:element.placement.strokeLineCap,
            strokeLineJoin:element.placement.strokeLineJoin,
            strokeMiterLimit:element.placement.strokeMiterLimit,
            shadow:element.placement.shadow,
          });
          element.fabricObject = textObject;
          
          canvas.add(textObject);
          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target as fabric.Textbox;
            if (target != textObject) return;
            
            const placement = element.placement;
            const newPlacement: Placement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              width: target.width ?? placement.width,
              height: target.height ?? placement.height,
              scaleX: target.scaleX ?? placement.scaleX,
              scaleY: target.scaleY ?? placement.scaleY,
              flipX:target.flipX ??placement.flipX,
              flipY:target.flipY ?? placement.flipY,
              textAlign:target.textAlign ?? placement.textAlign,
              opacity:target.opacity ?? placement.opacity,
              underline:target.underline ?? placement.underline,
              overline:target.overline ?? placement.overline,
              linethrough:target.linethrough ?? placement.linethrough,
              lineHeight:target.lineHeight ?? placement.lineHeight,
              fill:target.fill ?? placement.fill,
              backgroundColor:target.backgroundColor ?? placement.backgroundColor,
              selectable: target.selectable ?? element.placement.selectable,
              visible:target.visible ?? placement.visible,
              hasControls: target.hasControls ?? placement.hasControls,
              hasBorders: target.hasBorders ?? placement.hasBorders,
              hasRotatingPoint:target.hasRotatingPoint ?? placement.hasRotatingPoint,
              lockMovementX:target.lockMovementX ?? placement.lockMovementX,
              stroke:target.stroke ?? placement.stroke,
              strokeWidth:target.strokeWidth ?? placement.strokeWidth,
              strokeUniform:target.strokeUniform ?? placement.strokeUniform,
              strokeLineCap:target.strokeLineCap ?? placement.strokeLineCap,
              strokeLineJoin:target.strokeLineJoin ?? placement.strokeLineJoin,
              strokeMiterLimit:target.strokeMiterLimit ?? placement.strokeMiterLimit,
              shadow:target.shadow ?? placement.shadow,
              
              

            };
            const newElement = {
              ...element,
              placement: newPlacement,
              properties: {
                ...element.properties,
                // @ts-ignore
                text: target.text ?? element.properties.text,
              
                
                
              },
           
            };
   
            store.updateEditorElement(newElement);
        

            
          });
          break;
        }
        default: {
          throw new Error("Not implemented");
        }
      }
      if (element.fabricObject) {
        element.fabricObject.on("selected", function (e) {
          store.setSelectedElement(element);
        });
      }
    }
    const selectedEditorElement = store.selectedElement;
    if (selectedEditorElement && selectedEditorElement.fabricObject) {
      canvas.setActiveObject(selectedEditorElement.fabricObject);
    }
    this.refreshAnimations();
    this.updateTimeTo(this.currentTimeInMs);
    store.canvas.renderAll();
  }

}


export function isEditorAudioElement(
  element: EditorElement
): element is AudioEditorElement {
  return element.type === "audio";
}
export function isEditorVideoElement(
  element: EditorElement
): element is VideoEditorElement {
  return element.type === "video";
}

export function isEditorImageElement(
  element: EditorElement
): element is ImageEditorElement {
  return element.type === "image";
}


function getTextObjectsPartitionedByCharacters(textObject: fabric.Text, element: TextEditorElement): fabric.Text[] {
  let copyCharsObjects: fabric.Text[] = [];
  // replace all line endings with blank
  const characters = (textObject.text ?? "").split('').filter((m) => m !== '\n');
  const charObjects = textObject.__charBounds;
  if (!charObjects) return [];
  const charObjectFixed = charObjects.map((m, index) => m.slice(0, m.length - 1).map(m => ({ m, index }))).flat();
  const lineHeight = textObject.getHeightOfLine(0);
  for (let i = 0; i < characters.length; i++) {
    if (!charObjectFixed[i]) continue;
    const { m: charObject, index: lineIndex } = charObjectFixed[i];
    const char = characters[i];
    const scaleX = textObject.scaleX ?? 1;
    const scaleY = textObject.scaleY ?? 1;
    const charTextObject = new fabric.Text(char, {
      left: charObject.left * scaleX + (element.placement.x),
      scaleX: scaleX,
      scaleY: scaleY,
      top: lineIndex * lineHeight * scaleY + (element.placement.y),
      fontSize: textObject.fontSize,
      fontWeight: textObject.fontWeight,
      fill: '#fff',
    });
    copyCharsObjects.push(charTextObject);
  }
  return copyCharsObjects;
}