import React, { useEffect, useState } from "react";
import DragElement from "./DragElement";
import { ItemProps } from "../items/Item";

interface DropAreaProps {
    grabOffset?: {x: number, y: number};
    PreviewItem?: React.FC | null;

    onDragEnter?: () => void;
    onDragLeave?: () => void;
    onDragOver?: () => void;
    onDrop?: () => void;
}

function DropArea({grabOffset, PreviewItem, onDragEnter, onDragLeave, onDragOver, onDrop}: DropAreaProps) {
    const [droppedItems, setDroppedItems] = useState<React.FC<ItemProps>[]>([]);


    useEffect(() => {        
    }, [PreviewItem]);

    const handleDragStart = (item: React.ReactNode) => (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", item as any);
    };

    const handleDragOver = (index: number) => (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // const draggedItem = e.dataTransfer.getData("text/plain");
        // const newItems = Array.from(droppedItems);

        // // 드래그 오버된 아이템과의 위치 변경
        // const draggedIndex = newItems.findIndex(item => item === draggedItem);
        // if (draggedIndex !== -1) {
        //     const draggedElement = newItems[draggedIndex];
        //     newItems.splice(draggedIndex, 1);
        //     newItems.splice(index, 0, draggedElement); // 새 위치에 아이템 추가
        //     setDroppedItems(newItems); // 상태 업데이트
        // }
    };

    return (
        <div className="drop-area"
        onDragEnter={(e) => {
            e.stopPropagation();
            if (onDragEnter) onDragEnter();
        }}
        onDragLeave={(e) => {
            if (onDragLeave) onDragLeave();
        }}
        onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onDragOver) onDragOver();
        }}
        onDrop={(e) => {
            if (PreviewItem && !droppedItems.includes(PreviewItem)) {
                setDroppedItems((prevItems) => [...prevItems, PreviewItem]);
            }

            if (onDrop) onDrop();
        }}     

        >
            {droppedItems.map((Item, index) => (
                <Item key={index}
                onDragOver={() => {
                    console.log(index);
                    //handleDragOver(index)
                }} // 드래그 오버 시 순서 변경
                ></Item>
            ))}
            
            <Preview>
                {PreviewItem && <PreviewItem />}
            </Preview>
        </div>
    );
}

export default DropArea;




function Preview({children}: {children?: React.ReactNode}) {
    return (
        <div 
        style={{
            width: "fit-content", 
            height: "fit-content",
            pointerEvents: "none"
        }}>
            {children}
        </div>
    );
}