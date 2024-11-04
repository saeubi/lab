import React, { useState } from "react";
import "./noCodeDraw.css";
import { Icon, DropArea } from "./components"

import loadItems from "./utils/loadItems";
import { ItemProps } from "./items/Item";


function NoCodeDraw() {
    const items = loadItems(require.context("./items", false, /\.tsx$/));

    const [grabbedItem, setGrabbedItem] = useState<React.FC<ItemProps> | null>(null);

    const handleItemDragStart = (item: React.FC<ItemProps> | null) => {
        if (item) {
            setGrabbedItem(item);
        }
        // 여기에 아이템을 저장하거나 다른 로직을 구현할 수 있습니다.
    };

    return (
        <div id="no-code-draw">
            {/* icon list area */}
            <div id="icon-list-area">
                <div id="header-n-content-icon">
                </div>

                {items.map(({ name, item }, index) => {
                    
                    const {Icon, DrawItem} = item();
                    
                    return (
                        <Icon key={index}
                        onDragStart={() => {setGrabbedItem(() => DrawItem);}}
                        onDragEnd={() => {setGrabbedItem(null);}}
                        onDrag={() => {}}
                        />
                    );
                })}
            </div>


            {/* draw area */}
            <div id="draw-area">
                <DropArea PreviewItem={grabbedItem} setPreviewItem={handleItemDragStart} onDrop={() => {console.log("draw ondrop");}} color="#ffcccc" name="base"></DropArea>
              {/* <TmpItem></TmpItem> */}
            </div>
        </div>
    );
}

export default NoCodeDraw;