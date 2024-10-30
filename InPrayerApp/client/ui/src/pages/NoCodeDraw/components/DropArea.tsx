import React, { useEffect, useState } from "react";
import DragElement from "./DragElement";
import { ItemProps } from "../items/Item";

interface DropAreaProps {
    grabOffset?: {x: number, y: number};
    PreviewItem?: React.FC<ItemProps> | null;
    setPreviewItem?: (item:React.FC<ItemProps> | null) => void;

    onDragEnter?: () => void;
    onDragLeave?: () => void;
    onDragOver?: () => void;
    onDrop?: () => void;
}

function DropArea({grabOffset, PreviewItem, setPreviewItem, onDragEnter, onDragLeave, onDragOver, onDrop}: DropAreaProps) {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [droppedItems, setDroppedItems] = useState<React.FC<ItemProps>[]>([]);
    const [grabIndex, setGrabIndex] = useState<number>(-1);
    const [hoverIndex, setHoverIndex] = useState<number>(-1);

    useEffect(() => {        
    }, [PreviewItem]);

    // const handleDragStart = (item: React.ReactNode) => (e: React.DragEvent<HTMLDivElement>) => {
    //     e.dataTransfer.setData("text/plain", item as any);
    // };

    const rearrangeItems = (arr: React.FC<ItemProps>[], grabIndex: number, hoverIndex: number): React.FC<ItemProps>[] => {
        const newArray = [...arr]; // 원본 배열 복사    

        // 요소 제거 후 변수에 저장
        const [grabbedItem] = newArray.splice(grabIndex, 1);
    
        // 요소를 overIndex 앞에 삽입
        newArray.splice(hoverIndex, 0, grabbedItem);    
        return newArray;
    };
    
    // 사용 예시
    const handleRearrange = () => {
        setDroppedItems((prevItems) => rearrangeItems(prevItems, grabIndex, hoverIndex));
    };

    return (
        <div className="drop-area"
        onDragEnter={(e) => {
            e.stopPropagation();
            if (onDragEnter) onDragEnter();
        }}
        onDragLeave={(e) => {
            setIsHover(false);
            if (onDragLeave) onDragLeave();
        }}
        onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsHover(true);
            if (onDragOver) onDragOver();
        }}
        onDrop={(e) => {
            setIsHover(false);
            if (PreviewItem && !droppedItems.includes(PreviewItem)) {
                setDroppedItems((prevItems) => [...prevItems, PreviewItem]);
            }
            else if (grabIndex !== hoverIndex && grabIndex !== -1 && hoverIndex !== -1) {
                handleRearrange();
            }

            if (onDrop) onDrop();
        }}     

        >
            {droppedItems.map((Item: any, index) => (
                <Item key={index}
                onDragStart={() => {
                    setGrabIndex(index);
                    // if (setPreviewItem && Item) setPreviewItem(Item);
                    if (setPreviewItem) setPreviewItem(() => Item);
                }}
                onDragOver={() => {
                    setHoverIndex(index);
                    console.log(index);
                    //handleDragOver(index)
                }} // 드래그 오버 시 순서 변경
                onDragEnd={() => {
                    setGrabIndex(-1);
                    setHoverIndex(-1);
                }}
                ></Item>
            ))}
            
            <Preview>
                {isHover && PreviewItem && <PreviewItem />}
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