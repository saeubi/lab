import React, { useEffect, useState, useRef } from "react";
import './dropDraw.css'

import DragIcon from "./sub/DragIcon";
import DropArea from "./sub/DropArea";

// 이페이지에서 draw 가능한 컴포넌트 리스트데이터같은걸 가지고있어야한다.
// 그걸 기반으로 icon들을 그리고 각 icon에 컴포넌트들도 연결해둔다.
// draw가능한 컴포넌트는 top, left등 위치에 관련된 속성을 가질 수 있어야한다. ( 솔찍히 부모가 뭐냐에 따라서 달라지긴 할듯 )

// 지금처럼 칸으로 되어있는 경우 겹쳐질때 어떤 로직을 처리해야할지 고민이다.
// 모양이 다채로울 경우 배치내부로직이 너무 복잡해질것 같다. 
// 위치를 검색한후 겹치는 요소가 있으면 자리를 바꾸던지 해야하는데 row단위 배치가 아니면 가로세로를 다 커버하기가 너무 어렵다.
// 자리바꾸는 로직을 배제하고 그냥 겹쳐져버리게 해버리면 상관없을듯 하긴 하다. 
// -> 이부분은 추후에 변경될 부분이 많기떄문에... header / content / section 이정도는 DropArea느낌이고 나머지는 다 드래그엘리먼트로해야할듯하다
// -> icon과 실제 배치된 컴포넌트가 동작이 다르다.


function DropDraw() {
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const [grabOffset, setGrabOffset] = useState<{x:number,y:number}>({x:0,y:0})
    const [previewedComponent, setPreviewedComponent] = useState<React.ReactNode>(null);

    const [drawComponentList, setDrawComponentList] = useState<React.ReactNode[]>([]);

    const dragStart = (x: number, y: number, component: React.ReactNode) => {
        setGrabOffset({x, y});
        setPreviewedComponent(component);
    };

    const callbackDrag = (flag: boolean) => {
        setIsDrag(flag);        
    };

    const handleDrop = (x: number, y:number) => {
        setDrawComponentList((prev) => [...prev, previewedComponent]);
        setPreviewedComponent(null);
    }


    return (        
        <div id="drop-draw" className="page">
            <div className="component-area">
                <DragIcon setGrabOffset={dragStart} isDrag={callbackDrag} ownComponent={null}/>
            </div>

            <div className="draw-area">                
                <DropArea isDrag={isDrag} grabOffset={grabOffset} previewComponent={previewedComponent} onDrop={handleDrop}></DropArea>
                {}
            </div>
        </div>
    );
}


export default DropDraw;