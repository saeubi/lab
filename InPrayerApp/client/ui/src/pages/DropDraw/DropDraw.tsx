import React, { useEffect, useState, useRef } from "react";
import './dropDraw.css'

function DropDraw() {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragPosition, setDragPosition] = useState<{x:number, y:number} | null>(null);
    const dragItemRef = useRef<HTMLDivElement | null>(null);

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        if (isDragging) setDragPosition({x:e.clientX, y:e.clientY});
    };

    return (        
        <div id="drop-draw" className="page">
            <div className="component-area">
                <div
                    className="tmp-component"
                    style={{ width: "50px", height: "50px", backgroundColor: "#ccccff" }}
                    draggable="true"
                    onDragStart={(e) => {
                        e.dataTransfer.setData('text', 'ccc');
                        setIsDragging(true);
                    }}
                    onDragEnd={() => {
                        setIsDragging(false);
                        setDragPosition(null);
                    }}
                    onDrag={handleDrag}
                    ref={dragItemRef}
                ></div>
            </div>
            <div className="draw-area"
                onDragOver={(e) => {
                    e.preventDefault(); // 드래그 가능하도록 기본 동작 방지
                    console.log("Over 이벤트 발생");
                }}
                onDragLeave={(e) => {
                    //console.log("Leave 이벤트 발생");
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    console.log(dragPosition);
                    console.log("Drop 이벤트 발생");
                }}
            >     
                {Array(5).fill(null).map((_, i) => (
                    <TmpBox key={i} index={i} onDrop={(e) => {

                    }}/>
                ))}
            </div>
        </div>
    );
}

// 드래그 존? 에어리어? 를 상속받던 어쩌던 그런 영역지정하는부분이 여러개가 있어야함
// 예를들면 header / content / section 뭐 이런느낌으로? 블록화를 할 수 있어야할 듯 
// 섹션이 최상위로하고 header / content 가 별도의 스타일이나 속성을 가진 영역으로
// section은 기본적으로 본인 격자를 가지고있고 컴포넌트들도 가로 몇 세로몇 이런 영역이 정해져있으면 좋을것같음.

// 드래그되는 컴포넌트들이 가지고있어야할 정보들
/*
    이름?
    icon 이미지같은거
    격자크기 or 그냥 크기
    그려지는 컴포넌트 자체의 정보 <- 얘는 매니저같은걸만들어서 한번에 관리해야하나?
    드래그해서 가져가면 마우스위치기준으로 판단해야하나 아니면 좌측상단 위치 기준으로 해당 위치에 걸리는 위치로 지정해야하나 구현후 확인이 필요함

*/


interface TmpBoxProps {
    index: number;
    onDrop: () => void;
}

function TmpBox({index, onDrop}: TmpBoxProps) {


    return (
        <div style={{ width: "50px", height: "50px", backgroundColor: "red", margin: "10px" }} onDrop={onDrop}>

        </div>
    );
}



export default DropDraw;