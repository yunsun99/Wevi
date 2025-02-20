import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { initialFormData, signupState } from "../atoms/userState";
import Signup1 from "@/components/Forms/Signup1";
import Signup2 from "@/components/Forms/Signup2";
import backgroundImage from "../assets/backgroundImages/appBackground3.png";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useRecoilState(signupState);

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  useEffect(() => {
    return () => {
      setFormData(initialFormData);
    };
  }, []);

  return (
    <div
      className="min-h-[100vh]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
    </div>
  );
};

export default Signup;
