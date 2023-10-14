import { useState } from "react";
import CalculateButton from "../../../components/CalculateButton";
import { root } from "../../../client/wrapper/Operations";

function Root({ showResult }: { showResult: (r: string) => void }) {
  const [number1, setNumber1] = useState(0);
  const [errorMessages, setErrorMessages] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const calculate = async () => {
    try {
      setIsWaiting(true);
      setErrorMessages("");
      showResult((await root(number1)).result);
    } catch (err) {
      if (err instanceof Error) setErrorMessages(err.message);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <>
      <div className="mb-3">
        <label>Number</label>
        <input
          type="number"
          className="form-control"
          value={number1}
          onChange={(e) => setNumber1(parseFloat(e.target.value))}
        />
      </div>
      {errorMessages && <div className="error">{errorMessages}</div>}
      <CalculateButton onClick={calculate} disabled={isWaiting} />
    </>
  );
}

export default Root;
