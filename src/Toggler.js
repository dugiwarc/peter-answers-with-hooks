import React, { useState } from "react";
import useToggle from "./hooks/useToggle";

export default function Toggler() {
  const [isHappy, toggleIsHappy] = useToggle(true);
  const [isHeartBroken, toggleHeartState] = useToggle(false);
  return (
    <div>
      <h1 onClick={toggleIsHappy}>{isHappy ? ":)" : ":("}</h1>
      <h1>{isHeartBroken ? "</3" : "<3"}</h1>
      <h2 onClick={toggleHeartState}>Cheat</h2>
    </div>
  );
}
