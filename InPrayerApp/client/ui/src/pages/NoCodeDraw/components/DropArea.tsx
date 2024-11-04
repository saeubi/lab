import React, { useEffect, useState } from "react";
import DragElement from "./DragElement";
import { ItemProps, ChildProps } from "../utils/createItem";

export interface DropAreaProps {
    PreviewItem?: React.FC<ItemProps> | null;
    setPreviewItem?: (item:React.FC<ItemProps> | null) => void;

    onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;

    // 임시속성
    color?: string;
    name?: string;
    
    // 리렌더링 시점 Item 관리
    getDroppedItems?: () => React.FC<ItemProps>[]; // 부모로 전달할 상태 조회 함수
}

function DropArea({PreviewItem, setPreviewItem, onDragEnter, onDragLeave, onDragOver, onDrop, color, name,

    getDroppedItems
}: DropAreaProps) {
    const [droppedItems, setDroppedItems] = useState<React.FC<ItemProps>[]>([]);
    const [grabIndex, setGrabIndex] = useState<number>(-1);
    const [hoverIndex, setHoverIndex] = useState<number>(-1);

    const [isHover, setIsHover] = useState<boolean>(false);
    const [isChild, setIsChild] = useState<boolean>(false);

    useEffect(() => {        
    }, [PreviewItem]);


    // 부모가 `droppedItems`를 가져갈 수 있도록 함수 설정
    if (getDroppedItems) {
        getDroppedItems = () => droppedItems;
    }
    // const handleDragStart = (item: React.ReactNode) => (e: React.DragEvent<HTMLDivElement>) => {
    //     e.dataTransfer.setData("text/plain", item as any);
    // };

    const rearrangeItems = (arr: React.FC<ItemProps & ChildProps>[], grabIndex: number, hoverIndex: number): React.FC<ItemProps>[] => {
        const newArray = [...arr]; // 원본 배열 복사    
        // 요소 제거 후 변수에 저장
        const [grabbedItem] = newArray.splice(grabIndex, 1);
    
        // 타입 체크: grabbedItem이 DropAreaProps인지 확인
        if (grabbedItem && isDropAreaProps(grabbedItem)) {
            // DropAreaProps일 경우 getDroppedItems 호출
            const droppedItems = grabbedItem.getDroppedItems?.();
            console.log('DropArea에서 가져온 droppedItems:', droppedItems);
        }


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





// DropAreaProps 타입인지 확인하는 타입 가드
function isDropAreaProps(props: any): props is DropAreaProps {
    return (props as DropAreaProps).getDroppedItems !== undefined;
}