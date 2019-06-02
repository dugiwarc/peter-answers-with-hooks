import React, { useState } from "react";

export default function CounterHooks() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>The count is:{count} </h1>
      <button onClick={() => setCount(count + 1)}>Add 1</button>
    </div>
  );
}
