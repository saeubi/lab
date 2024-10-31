import React, { useState } from "react";
import createItem, { ItemProps } from "../utils/createItem";
import DragElement, { DragElementProps } from "../components/DragElement";


export default createItem("#ffff00", 
    (ItemProps: ItemProps) => {
        const [isDrag, setIsDrag] = useState<boolean>(false);

        const dragElementProps: DragElementProps = {
            onDragStart: (event: React.DragEvent<HTMLDivElement>) => {
                if (ItemProps.onDragStart) ItemProps.onDragStart(event);
                setIsDrag(true);
            },
            onDragEnd: ItemProps.onDragEnd,
            onDrag: ItemProps.onDrag,
            onDragOver: (event: React.DragEvent<HTMLDivElement>) => {
                if (ItemProps.onDragOver) ItemProps.onDragOver(event);
                setIsDrag(false);
            },
            onDrop: ItemProps.onDrop,         
            checkParent: ItemProps.checkParent
        }

        return (
        <DragElement {...dragElementProps}>
            <div
                style={{
                    width: "400px",
                    height: "35px",
                    backgroundColor: "#ddccdd"
                }}
            >
            </div>
        </DragElement>
    )}


);