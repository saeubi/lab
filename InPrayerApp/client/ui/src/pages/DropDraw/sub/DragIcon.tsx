import React, { useState, useEffect } from "react";
import DragElement from "./DragElement";

interface DragIconPops {
    setGrabOffset?: (x: number, y: number, component: React.ReactNode) => void;
    isDrag?: (flag: boolean) => void;
    ownComponent:React.ReactNode;
}

function DragIcon({ setGrabOffset, isDrag, ownComponent}: DragIconPops) {
    let storedNode: React.ReactNode = <TmpComponent />;

    return (
        <DragElement 
        onDragStart={(e) => {
            const element = e.target as HTMLDivElement;
            const rect = element.getBoundingClientRect();
            const x = e.clientX-Math.ceil(rect.x);
            const y = e.clientY-Math.ceil(rect.y);

            //e.dataTransfer.setData('text', 'test data');
            if (isDrag) isDrag(true);
            if (setGrabOffset) setGrabOffset(x, y, storedNode);

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



function TmpComponent() {
    return (
        <div
        style={{
            width: "200px",
            height: "50px",
            backgroundColor: "green"
        }}></div>
    );
}