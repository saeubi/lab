import React, { useState } from "react";
import DragElement from "./DragElement";

interface DragIconPops {
    setGrabOffset?: (x: number, y: number) => void;
    isDrag?: (flag: boolean) => void;

}

function DragIcon({ setGrabOffset, isDrag }: DragIconPops) {

    return (
        <DragElement 
        onDragStart={(e) => {
            const element = e.target as HTMLDivElement;
            const rect = element.getBoundingClientRect();
            const x = e.clientX-Math.ceil(rect.x);
            const y = e.clientY-Math.ceil(rect.y);

            //e.dataTransfer.setData('text', 'test data');
            if (isDrag) isDrag(true);
            if (setGrabOffset) setGrabOffset(x, y);

        }}
        onDragEnd={(e) => {
            if (isDrag) isDrag(false);
        }}
        >
            <div style={{width: "30px", height: "30px", backgroundColor: "#cccccc"}}></div>
        </DragElement>
    );
}

export default DragIcon;