import React, { useState } from "react";
import styled from 'styled-components';


const ItemBox = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    box-sizing: border-box;

  /* 바로 하위 자식 요소에 스타일 적용 */
  > .emphasize-draw {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    pointer-events: none;
  }

  /* 특정 클래스에 스타일 적용 */
  &.emphasize > .emphasize-draw {
    border: 2px solid black;
    background-color: #00000033;
  }
`;

function Item({children} : {children?:React.ReactNode}) {
    const [empFlag, setEmpFlag] = useState<boolean>(false);

    return (
        <ItemBox
        className={(empFlag ? "emphasize" : "")}
        onMouseEnter={() => {setEmpFlag(true);}}
        onMouseLeave={() => {setEmpFlag(false);}}
        >        
        {children}
        <div className="emphasize-draw"></div>            
        </ItemBox>
    );
}

export default Item;