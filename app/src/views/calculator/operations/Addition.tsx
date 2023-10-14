import { useState } from "react";
import CalculateButton from "../../../components/CalculateButton";
import { add } from "../../../client/wrapper/Operations";

function Addition({ showResult }: { showResult: (r: string) => void }) {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [errorMessages, setErrorMessages] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const calculate = async () => {
    try {
      setIsWaiting(true);
      setErrorMessages("");
      showResult((await add(number1, number2)).result);
    } catch (err) {
      if (err instanceof Error) setErrorMessages(err.message);
    } finally {
      setIsWaiting(false);
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
      <CalculateButton onClick={calculate}  disabled={isWaiting}/>
    </>
  );
}

export default Addition;
