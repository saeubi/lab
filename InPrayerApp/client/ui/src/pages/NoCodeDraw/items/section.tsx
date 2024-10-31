import React, { useState } from "react";
import createItem, { ChildProps, ItemProps } from "../utils/createItem";
import DragElement, { DragElementProps } from "../components/DragElement";
import DropArea, { DropAreaProps } from "../components/DropArea";


export default createItem("red", 
    (ItemProps: ItemProps & ChildProps) => {
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
            checkParent: ItemProps.checkParent
        };

        const dropAreaProps: DropAreaProps = {
            
        };

        return (
        <DragElement {...dragElementProps}>
            <DropArea {...ItemProps} name="section" onDrop={() => {console.log("막아")}}/>
        </DragElement>
    )}


);