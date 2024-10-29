import React, { useState } from "react";
import "./noCodeDraw.css";
import { Icon, DropArea } from "./components"

import loadItems from "./utils/loadItems";


function NoCodeDraw() {
    const items = loadItems(require.context("./items", false, /\.tsx$/));

    const [PreviewItem, setPreviewItem] = useState<React.FC | null>(null);


    return (
        <div id="no-code-draw">
            {/* icon list area */}
            <div id="icon-list-area">
            {items.map(({ name, item }, index) => {
                
                const {Icon, DrawItem} = item();
                return (
                    <Icon key={index}
                    onDragStart={() => {
                        setPreviewItem(() => DrawItem);
                    }}
                    onDragEnd={() => {
                        console.log("드래그 종료");
                        setPreviewItem(null);
                    }}
                    onDrag={() => console.log("드래그 중")}
                    />
                );
            })}
            </div>


            {/* draw area */}
            <div id="draw-area">
                <DropArea PreviewItem={PreviewItem} onDrop={() => {console.log("draw ondrop");}}></DropArea>
                <DropArea PreviewItem={PreviewItem} onDrop={() => {console.log("draw ondrop");}}></DropArea>
              {/* <TmpItem></TmpItem> */}
            </div>
        </div>
    );
}

export default NoCodeDraw;