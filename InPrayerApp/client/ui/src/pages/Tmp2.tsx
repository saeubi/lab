import React from "react";

import { setNo } from "../utils/store/tmp";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../utils/store";

function Tmp2() {
    const dispatch = useDispatch();
    const no = useSelector((state: RootState) => state.tmp.no);
    return (
        <div>
            hello, world!2
            <button onClick={() => {
                dispatch(setNo(no + 1));
            }}>{no}</button>
        </div>
    );
}

export default Tmp2;