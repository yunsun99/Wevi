import TopNavigationBar from "@/components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "@/components/Navigators/BottomNavigationBar";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { plannerState } from "../atoms/AIPlannerState";
import AiPlannerMessage from "../components/AIPlanner/AIPlannerMessage";

export default function AiPlanner() {
  // 화면 띄우기를 위한 스텝
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useRecoilState(plannerState);

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  return (
    <>
      <TopNavigationBar title="AI플래너" />
      <div className="h-[86vh]">
        <AiPlannerMessage />
      </div>
    </>
  );
}
