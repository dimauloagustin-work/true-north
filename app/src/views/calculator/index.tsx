import { useState } from "react";
import CalculatorButton from "../../components/CalculatorButton";
import Addition from "./operations/Addition";
import Substraction from "./operations/Substraction";
import Multiplication from "./operations/Multiplication";
import Division from "./operations/Division";
import Root from "./operations/Root";
import RandomString from "./operations/RandomString";

const Calculator = () => {
  const [active, setActive] = useState("+");
  const [result, setResult] = useState("");

  return (
    <div className="wrapper">
      <div className="inner s-inner">
        <h3>Calculator</h3>
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
            <RandomString showResult={setResult} />
          )}
          <label>Result</label>
          <input
            type="string"
            className="form-control"
            value={result}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};
//TODO - show balance
export default Calculator;
