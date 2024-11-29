import React from "react";
import Item from "./Item";

function UIItem({children}: {children?:React.ReactNode}) {
    return (
        <Item>
            {children}
        </Item>
    );
}

export default UIItem;