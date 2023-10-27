import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import "../cssFiles/cart.css";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Step } from "react-step-progress-bar";
// import { useNavigate } from "react-router-dom";
export const ProgressBar = () => {
  // const Navigate =useNavigate()
  // const toogle = useSelector((state) => state.auth.fromToogle);
  const [toogle, setToogle] = useState(false);
  console.log("toogle state", toogle);
  const onFormSubmit = () => {
    console.log(" submitting ");
  };
  const step2Validator = () => {
    console.log("step2Validator", toogle);
    return true;
  };
  useEffect(() => {
    if (toogle) {
      setToogle(true);
    }
  }, [toogle]);
  const step1Content = <Step1 />;
  const step2Content = <Step2 setToogle={setToogle} />;
  const step3Content = <Step3 />;
  return (
    <>
      <StepProgressBar
        startingStep={0}
        onSubmit={() => {
          onFormSubmit();
        }}
        steps={[
          {
            name: "step 1",
            content: step1Content,
          },
          {
            name: "step 2",
            content: step2Content,
            validator: step2Validator,
          },
          {
            name: "step 3",
            content: step3Content,
          },
        ]}
      />
    </>
  );
};
