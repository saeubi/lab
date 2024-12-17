import React, { useEffect, useState } from "react";

function Main() {

  const [count, setCount] = useState<number>(0);

  window.resultSignal = (result: string) => {
    let count1 = count + 1
    setCount(count1);
    alert(result);
  };

  return (
    <div>

      <button
        onClick={() => {
          console.log("클릭됨");
          window.ui_channel?.sendMessage("hi");
        }}
      >send</button>
      <div>{count}</div>
    </div>
  );

}

export default Main;