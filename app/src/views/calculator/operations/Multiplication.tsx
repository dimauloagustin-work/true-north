import { useState } from "react";
import CalculateButton from "../../../components/CalculateButton";
import { multiply } from "../../../client/wrapper/Operations";

function Multiplication({ showResult }: { showResult: (r: string) => void }) {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [errorMessages, setErrorMessages] = useState("");

  const calculate = async () => {
    try {
      setErrorMessages("");
      showResult((await multiply(number1, number2)).result);
    } catch (err) {
      if (err instanceof Error) setErrorMessages(err.message);
    }
  };

  return (
    <>
      <div className="mb-3">
        <label>Number 1</label>
        <input
          type="number"
          className="form-control"
          value={number1}
          onChange={(e) => setNumber1(parseFloat(e.target.value))}
        />
        <label>Number 2</label>
        <input
          type="number"
          className="form-control"
          value={number2}
          onChange={(e) => setNumber2(parseFloat(e.target.value))}
        />
      </div>
      {errorMessages && <div className="error">{errorMessages}</div>}
      <CalculateButton onClick={calculate} />
    </>
  );
}

export default Multiplication;
