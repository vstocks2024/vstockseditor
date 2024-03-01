"use client";
import React, { useEffect } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { VideoResource } from "../entity/VideoResource";
import { UploadButton } from "../shared/UploadButton";
import { getObjectURL, putObject } from "../functions/get_put_url";
import { FabricUitls } from "@/utils/fabric-utils";
import { fabric } from "fabric";

import axios from "axios";
import { AssetsResource } from "../entity/AssetsResource";

export const AssetsPanel = observer(() => {
  const store = React.useContext(StoreContext);
 
   return (
    <>
    <div className="overflow-y-scroll">
      <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">
        Add Video
      </div>
    {store.videos.map((file, index) => {
          return <AssetsResource  key={file["filename"]} filename={file["filename"]} filesource={file["filesource"]} index={index} />;
    })}
    </div>
  </>);
});

