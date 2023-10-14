import { useState } from "react";
import CalculatorButton from "../../components/CalculatorButton";
import Addition from "./operations/Addition";
import Substraction from "./operations/Substraction";
import Multiplication from "./operations/Multiplication";
import Division from "./operations/Division";
import Root from "./operations/Root";

const Calculator = () => {
  const [active, setActive] = useState("+");
  const [result, setResult] = useState("");

  return (
    <>
      <h3>Sign In</h3>
      <div className="container">
        <div className="row row-cols-3">
          <CalculatorButton icon="+" active={active} onClick={setActive} />
          <CalculatorButton icon="-" active={active} onClick={setActive} />
          <CalculatorButton icon="x" active={active} onClick={setActive} />
          <CalculatorButton icon="/" active={active} onClick={setActive} />
          <CalculatorButton icon="√" active={active} onClick={setActive} />
          <CalculatorButton icon="RS" active={active} onClick={setActive} />
        </div>
        {active === "+" ? (
          <Addition showResult={setResult} />
        ) : active === "-" ? (
          <Substraction showResult={setResult} />
        ) : active === "x" ? (
          <Multiplication showResult={setResult} />
        ) : active === "/" ? (
          <Division showResult={setResult} />
        ) : active === "√" ? (
          <Root showResult={setResult} />
        ) : (
          <Addition showResult={setResult} />
        )}
        <label>Number 1</label>
        <input
          type="string"
          className="form-control"
          value={result}
          disabled={true}
        />
      </div>
    </>
  );
};

export default Calculator;
