import React, { useEffect, useState, useRef, useMemo } from "react";

interface DropAreaProps {
    isDrag: boolean;
    grabOffset: {x: number, y: number};
    previewComponent?: React.ReactNode;
}

function DropArea({isDrag, grabOffset, previewComponent} : DropAreaProps) {
    const dropAreaRef = useRef<HTMLDivElement | null>(null);
    const [areaSize, setAreaSize] = useState({ width: 0, height: 0 });

    // preview component 관련 속성
    const [isShow, setIsShow] = useState<boolean>(false);
    const [left, setLeft] = useState<string>("");
    const [top, setTop] = useState<string>("");
    const [opacity, setOpacity] = useState<number>(0);

    // Area 크기 업데이트 함수
    const updateSize = () => {
        if (dropAreaRef.current) {
            setAreaSize({
                width: dropAreaRef.current.offsetWidth,
                height: dropAreaRef.current.offsetHeight,
            });
        }
    };
    useEffect(() => {
        // Area 리사이즈될 때 크기 업데이트
        updateSize();
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    // 슬롯 갯수 계산 로직 ( Area 크기에 따라 결정 )
    const calculateSlots = () => {
        const { width, height } = areaSize;
        return Math.floor(width / 16) * Math.floor(height / 16);;
    };
    
    // 슬롯을 useMemo로 캐싱하여 불필요한 재계산 방지
    const slots = useMemo(() => {
        return Array(calculateSlots()).fill(null).map((_, i) => (
            <Slot key={i} />
        ));
    }, [areaSize]);

    //
    useEffect(() => {        
        if (!isDrag) {
            setIsShow(false);
            setLeft("");
            setTop("");
            setOpacity(0);
        }
        // 추가로 애니메이션, 스타일 변경 등 필요한 로직 실행
    }, [isDrag, grabOffset]);

    // 슬롯 위치 검색
    const findChildAtCoordinates = (x: number, y: number) => {
        const elementAtPoint = document.elementFromPoint(x, y);
        if (!elementAtPoint) {
            return null; // 해당 좌표에 요소가 없으면 null 반환
        }
        if (dropAreaRef.current && dropAreaRef.current.contains(elementAtPoint)) {
            return elementAtPoint; // 해당 위치의 자식 요소 반환
        }
        return null; // 자식 요소가 없으면 null 반환
    };


    return (
        <div className="drop-area" 
        ref={dropAreaRef}
        style={{
            display: "flex",
            alignContent: "flex-start",
            flexWrap: "wrap",
            position: "relative",
            width: "100%",
            height: "100%",
            // padding: "5px"
        }}
        // Drag
        onDragEnter={(e) => {
            e.stopPropagation();
            setIsShow(true);            
        }}
        onDragOver={(e) => {
            e.preventDefault(); // 드래그 가능하도록 기본 동작 방지
            e.stopPropagation();                    
            //console.log("Over 이벤트 발생");

            const x = e.clientX - grabOffset.x;
            const y = e.clientY - grabOffset.y;
            //console.log(x, y);

            const childElement = findChildAtCoordinates(x, y) as HTMLElement;                        

            if (childElement && !childElement.classList.contains("draw-area")) {
                if (dropAreaRef.current) {
                    const pRect = dropAreaRef.current.getBoundingClientRect();
                    const cRect = childElement.getBoundingClientRect();

                    const cPosX = `${cRect.x - pRect.x}px`;
                    const cPosY = `${Math.round(cRect.y - pRect.y)}px`;
                    console.log(cPosY);
                    setLeft(cPosX);
                    setTop(cPosY);
                    setOpacity(1);
                }
            }   
        }}  

        onDragLeave={(e) => {}}
        onDrop={(e) => {
            e.preventDefault();
            console.log("Drop 이벤트 발생");
            console.log(`Left: ${left}, Top: ${top}`)
        }}     
        
        >
            {slots}
            {(isDrag && isShow) && <PositionPreview left={left} top={top} opacity={opacity}>{previewComponent}</PositionPreview>}
        </div>
    );

}

export default DropArea;


// 지금은 버블링 방지로 관리하지만 이벤트를 아예 막고 위치를 검색할 수 있는 방안을 찾거나
// 그냥 프리뷰 위치 자체를 일정 픽셀단위로 이동시키는 방안으로 진행하는 것도 생각해보아야 한다.
function Slot() {
    return (
        <div style={{
            width: "16px",
            height: "16px",
            backgroundColor: "#cececeaa",
        }}
        // onDragEnter={(e) => {e.stopPropagation();}}
        // onDragOver={(e) => {e.stopPropagation();}}  
        // onDragLeave={(e) => {e.stopPropagation();}}
        >

        </div>
    );
}


function PositionPreview({children, left, top, opacity}: {children?: React.ReactNode ,left:string, top:string, opacity:number}) {
    useEffect(() => {}, [left, top, opacity]);

    return (
        <div 
        style={{
            position: "absolute", 
            left: left,
            top: top,
            width: "fit-content", 
            height: "fit-content", 
            opacity: opacity,
            pointerEvents: "none"
        }}>
            {children}
        </div>
    );
}