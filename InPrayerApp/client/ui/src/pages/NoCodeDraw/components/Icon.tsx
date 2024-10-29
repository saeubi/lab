import React from "react";
import DragElement from "./DragElement";

function Icon({name}: {name:string}) {
    return (
        <DragElement>
            <div style={{width:"30px", height: "30px", backgroundColor:"#aa0000"}}></div>
        </DragElement>
    );
}

export default Icon;