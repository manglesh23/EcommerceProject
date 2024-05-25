import { useState } from "react";
export const Contact = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  return (
    <>
      <h3>React Router DOM Intalled</h3>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+++ </button>
      <button onClick={() => setCount(count - 1)}>--- </button>
    </>
  );
};
