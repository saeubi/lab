import React, { useEffect, useState } from "react";
import { DragElement } from "../components";

// icon
interface IconProps {
    onDragStart?: () => void;
    onDragEnd?: () => void;
    onDrag?: () => void;
}

function Icon({onDragStart, onDragEnd, onDrag}: IconProps) {
    return (
        <DragElement onDragStart={onDragStart} onDragEnd={onDragEnd} onDrag={onDrag}>
            <div
            style={{ width: "30px", height: "30px", backgroundColor: "#ccccff" }}
            >
            </div>
        </DragElement>
    );
}

// item
export interface ItemProps {
    onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrag?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;

    checkParent?: (flag: boolean) => void;
}

interface ItemReturn {
    Icon: React.FC<IconProps>;
    DrawItem: React.FC<ItemProps>;
}

function Item(): ItemReturn {
    const itemInfo = {
        type: 'item',
        props: { /* 필요한 프로퍼티 */ }        
    };

    return {
        Icon: Icon,
        DrawItem: ({onDragStart, onDragEnd, onDrag, onDragOver, checkParent}: ItemProps) => {
            const [isDrag, setIsDrag] = useState<boolean>(false);
            const [parentItem, setParentItem] = useState<React.FC | null>(null);

            return (
            <DragElement 
            onDragStart={(event) => {
                if (onDragStart) onDragStart(event);
                setIsDrag(true);
            }}
            onDragEnd={onDragEnd}
            onDrag={onDrag} 
            onDragOver={(event) => {
                if (onDragOver) onDragOver(event);
                setIsDrag(false);
            }}            
            checkParent={checkParent}
            >
            {isDrag ?
            <div
            style={{
                width: "300px",
                height: "45px",
                border: "1px solid #000000",
                backgroundColor: "#ffffff"                
            }}
            >
            </div>
            :
            <div
                style={{
                    width: "300px",
                    height: "45px",
                    backgroundColor: "#ccccff"
                }}
            >
            </div>
            }
                
    
            </DragElement>
        )}
    };
}

export default Item;


