import { useState } from "react";
import CalculateButton from "../../../components/CalculateButton";
import { randomString, root } from "../../../client/wrapper/Operations";

function RandomString({ showResult }: { showResult: (r: string) => void }) {
  const [errorMessages, setErrorMessages] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const calculate = async () => {
    try {
      setIsWaiting(true);
      setErrorMessages("");
      showResult((await randomString()).result);
    } catch (err) {
      if (err instanceof Error) setErrorMessages(err.message);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <>
      {errorMessages && <div className="error">{errorMessages}</div>}
      <CalculateButton onClick={calculate} disabled={isWaiting} />
    </>
  );
}

export default RandomString;
