import React, { useEffect, useState } from "react";

export interface DragElementProps {
    children?: React.ReactNode;
    onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrag?: (event: React.DragEvent<HTMLDivElement>) => void;

    onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;

    checkParent?: (flag: boolean) => void;
}

function DragElement({    
    children,
    onDragStart,
    onDragEnd,
    onDrag,
    onDragOver,
    onDrop,
    checkParent
    }: DragElementProps) {

    const [parent, setParent] = useState<HTMLElement | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [style, setStyle] = useState<Object>({
        width: "fit-content",
        height: "fit-content",
        cursor: "grab"
    });

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {      
        // 현재 드래그하고 있는 아이템의 부모 요소 확인
        const targetElement = event.currentTarget; // 드래그하는 요소
        const parentElement = targetElement.parentElement; // 부모 요소
        setParent(parentElement);

        setIsDragging(true);
        if (onDragStart) {
            onDragStart(event);
        }
    };

    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {        
        // 드롭된 위치의 마우스 좌표
        const x = event.clientX;
        const y = event.clientY;
        
        // 해당 좌표에 있는 요소 확인
        const dropPosElement = document.elementFromPoint(x, y) as HTMLElement;

        let draggedElement: HTMLElement | null = null;
        let dropAreaElement: HTMLElement | null = null;
        let foundDragElement = false;
        let foundDropArea = false;

        let currentElement: HTMLElement | null = dropPosElement;
        while (currentElement) {
            if (!foundDragElement && currentElement.classList.contains('drag-element')) {
                foundDragElement = true;
                draggedElement = currentElement;
            }
            if (!foundDropArea && currentElement.classList.contains('drop-area')) {
                foundDropArea = true;
                dropAreaElement = currentElement;
            } 
            if (foundDragElement && foundDropArea) break;
            currentElement = currentElement.parentElement;
        }
        console.log(dropAreaElement);
        if (checkParent) {
            if (foundDragElement && draggedElement === event.currentTarget) {
                console.log("나다");
                checkParent(true);
            }
            if (foundDropArea && dropAreaElement === event.currentTarget) {
                console.log("같은부모다");
                checkParent(true);
            }
        }

        setParent(null);
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
            onDrop={(event: React.DragEvent<HTMLDivElement>) => {
                console.log("드롭");
                if (isDragging) {
                    event.preventDefault(); // 드롭 방지
                    return;
                }
                if (onDrop) onDrop(event);
            }}

            style={style}>
            {children}
        </div>
    );
}

export default DragElement;