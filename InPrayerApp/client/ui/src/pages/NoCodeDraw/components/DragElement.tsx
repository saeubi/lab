import React, { useEffect, useState } from "react";

interface DragElementProps {
    children?: React.ReactNode;
    onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrag?: (event: React.DragEvent<HTMLDivElement>) => void;

    onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
}

function DragElement({    
    children,
    onDragStart,
    onDragEnd,
    onDrag,
    onDragOver
    }: DragElementProps) {

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [style, setStyle] = useState<Object>({
        width: "fit-content",
        height: "fit-content",
        cursor: "grab"
    });

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(true);
        if (onDragStart) {
            onDragStart(event);
        }
    };

    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(false);
        if (onDragEnd) {
            onDragEnd(event);
        }
    };

    useEffect(() => {
        // 아무런 요소가 등록되지 않았을 때
        if (children === undefined) {
            setStyle({
                width: "30px",
                height: "30px",
                backgroundColor: "#cececece",
                cursor: "grab"
            });
        }

    }, [children]);    

    return (
        <div className="drag-element" 
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={onDrag}      
            
            onDragOver={onDragOver}

            style={style}>
            {children}
        </div>
    );
}

export default DragElement;