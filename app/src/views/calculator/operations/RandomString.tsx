import { useState } from "react";
import CalculateButton from "../../../components/CalculateButton";
import { randomString, root } from "../../../client/wrapper/Operations";

function RandomString({ showResult }: { showResult: (r: string) => void }) {
  const [errorMessages, setErrorMessages] = useState("");

  const calculate = async () => {
    try {
      setErrorMessages("");
      showResult((await randomString()).result);
    } catch (err) {
      if (err instanceof Error) setErrorMessages(err.message);
    }
  };

  return (
    <>
      {errorMessages && <div className="error">{errorMessages}</div>}
      <CalculateButton onClick={calculate} />
    </>
  );
}

export default RandomString;
