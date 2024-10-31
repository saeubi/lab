import React from "react";
import DragElement from "./DragElement";

export interface IconProps {
    color?: string;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    onDrag?: () => void;
}
function Icon(iconProps: IconProps) {
    const backgroundColor = iconProps.color ? iconProps.color : "#000000";

    return (
        <DragElement {...iconProps}>
            <div style={{
                width:"30px", 
                height: "30px", 
                backgroundColor: backgroundColor
                }}></div>
        </DragElement>
    );
}
export default Icon;