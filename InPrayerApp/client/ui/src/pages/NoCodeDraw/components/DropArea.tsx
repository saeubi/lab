import React, { useEffect, useState } from "react";
import DragElement from "./DragElement";
import { ItemProps } from "../items/Item";

export interface DropAreaProps {
    PreviewItem?: React.FC<ItemProps> | null;
    setPreviewItem?: (item:React.FC<ItemProps> | null) => void;

    onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;

    color?: string;
    name?: string;
}

function DropArea({PreviewItem, setPreviewItem, onDragEnter, onDragLeave, onDragOver, onDrop, color, name}: DropAreaProps) {
    const [droppedItems, setDroppedItems] = useState<React.FC<ItemProps>[]>([]);
    const [grabIndex, setGrabIndex] = useState<number>(-1);
    const [hoverIndex, setHoverIndex] = useState<number>(-1);

    const [isHover, setIsHover] = useState<boolean>(false);
    const [isChild, setIsChild] = useState<boolean>(false);

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
        <div className="drop-area" style={{backgroundColor:color}}
        onDragEnter={(event) => {
            event.preventDefault();
            event.stopPropagation();

            if (onDragEnter) onDragEnter(event);
        }}
        onDragLeave={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setIsHover(false);
            if (onDragLeave) onDragLeave(event);
        }}
        onDragOver={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsHover(true);
            if (onDragOver) onDragOver(event);
        }}
        onDrop={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setIsHover(false);
            if (PreviewItem && !droppedItems.includes(PreviewItem)) {
                const CopiedItem = (props: any) => <PreviewItem {...props} />;
                setDroppedItems((prevItems) => [...prevItems, CopiedItem]);

                if (setPreviewItem) setPreviewItem(null);
            }            
            else if (grabIndex !== hoverIndex && grabIndex !== -1 && hoverIndex !== -1) {
                handleRearrange();
                // 이부분이 드래그앤드로 가야할지도.
            }
            console.log(name);
            console.log("DropArea드롭시작전");
            if (onDrop) onDrop(event);
            console.log("DropArea드롭시작후");
        }}     

        >
            {droppedItems.map((Item: any, index) => {
                // const existingProps = Item.props || {}; // 기존 props 유지
                const ItemProps = {
                    // ...existingProps,
                    onDragStart: () => {
                        setIsChild(true);
                        setGrabIndex(index);
                        if (setPreviewItem && Item) setPreviewItem(() => Item);
                    },
                    onDragOver: () => {
                        setHoverIndex(index);                
                    },
                    onDragEnd: () => {                        
                        setIsChild(false);
                        setGrabIndex(-1);
                        setHoverIndex(-1);
                        if (setPreviewItem) setPreviewItem(null);                        
                    },
                    onDrop: () => {
                        console.log("여기에이렇게구현하면 이게 먼저?");
                    },
                    checkParent: (result: boolean) => {                        
                        // if (!result) setDroppedItems((prevItems) => prevItems.filter((_, i) => i !== index));
                    },

                    PreviewItem: PreviewItem,
                    setPreviewItem: setPreviewItem
                };

                return (<Item key={index} {...ItemProps}></Item>);
            })}
            
            <Preview>
                {!isChild && isHover && PreviewItem && <PreviewItem />}
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