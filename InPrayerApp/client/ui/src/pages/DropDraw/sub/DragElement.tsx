import React, { useEffect, useState } from "react";

interface DragElementProps {
    children?: React.ReactNode;
    onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrag?: (event: React.DragEvent<HTMLDivElement>) => void;
}

function DragElement({    
    children,
    onDragStart,
    onDragEnd,
    onDrag
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
        //
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
            style={style}>
            {children}
        </div>
    );
}

export default DragElement;