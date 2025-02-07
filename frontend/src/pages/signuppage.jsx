import { useState } from "react";
import { useRecoilState } from "recoil";
import { signupState } from "../atoms/userState";
import Signup1 from "@/components/Forms/Signup1";
import Signup2 from "@/components/Forms/Signup2";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useRecoilState(signupState);

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  return (
    <>
      {step === 1 && (
        <Signup1
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <Signup2
          formData={formData}
          setFormData={setFormData}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
};

export default Signup;
