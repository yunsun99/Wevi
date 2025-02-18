import TopNavigationBar from "@/components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "@/components/Navigators/BottomNavigationBar";
import AiPlannerMessage from "../components/AIPlanner/AIPlannerMessage";

export default function AIConsultationSummary() {
  return (
    <>
      <TopNavigationBar title="AI 상담 요약" />
      <AiPlannerMessage />
      <BottomNavigationBar />
    </>
  );
}
