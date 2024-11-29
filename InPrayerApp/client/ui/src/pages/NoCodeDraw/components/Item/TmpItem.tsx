import React, { useState } from "react";

function TmpItem() {
    const [cnt, setCnt] = useState<number>(0);
    return (
        <div onClick={() => setCnt(cnt + 1)}>
            임시 아이템
            <div>{cnt}</div>
        </div>
    );
}

export default TmpItem;