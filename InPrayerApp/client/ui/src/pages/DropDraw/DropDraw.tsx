import React, { useEffect, useState, useRef } from "react";
import './dropDraw.css'

import DragIcon from "./sub/DragIcon";
import DropArea from "./sub/DropArea";

function DropDraw() {
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const [grabOffset, setGrabOffset] = useState<{x:number,y:number}>({x:0,y:0})

    const dragStart = (x:number, y:number) => {
        setGrabOffset({x, y});
    };

    const callbackDrag = (flag: boolean) => {
        setIsDrag(flag);        
    };

    return (        
        <div id="drop-draw" className="page">
            <div className="component-area">
                <DragIcon setGrabOffset={dragStart} isDrag={callbackDrag}/>
            </div>

            <div className="draw-area">                
                <DropArea isDrag={isDrag} grabOffset={grabOffset} previewComponent={
                    <div style={{width: "500px", height: "200px", backgroundColor: "red"}}></div>
                }></DropArea>
            </div>
        </div>
    );
}


export default DropDraw;