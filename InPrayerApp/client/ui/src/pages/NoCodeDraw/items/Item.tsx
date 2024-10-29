import React from "react";
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
    onDragStart?: () => void;
    onDragEnd?: () => void;
    onDrag?: () => void;
    onDragOver?: () => void;
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
        DrawItem: ({onDragStart, onDragEnd, onDrag, onDragOver}: ItemProps) => (
            <DragElement 
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrag={onDrag} 
            onDragOver={onDragOver}            
            >
                <div
                style={{
                    width: "300px",
                    height: "45px",
                    backgroundColor: "#ccccff"
                }}
                >
    
                </div>
            </DragElement>
        )
    };
}

export default Item;


