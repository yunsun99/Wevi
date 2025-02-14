import { useEffect, useState } from "react";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import TopNavigationBar from "../components/Navigators/TopNavigationBar";
import ProgressCard from "../components/Progress/ProgressCard";
import { getProgressList } from "../api/schedule";

export default function Progress() {
  const [progressList, setProgressList] = useState();
  useEffect(() => {
    const axiosProgressList = async () => {
      try {
        const progressData = await getProgressList();
        setProgressList(progressData);
      } catch (err) {
        console.log(err);
      }
    };
    axiosProgressList();
  }, []);

  useEffect(() => {
    console.log(progressList);
  }, [progressList]);
  return (
    <>
      {progressList && progressList.length > 0 ? (
        <ProgressCard data={progressList} />
      ) : (
        <div className="flex flex-col h-[calc(100vh-0rem)]">
          <p className="text-gray-500 text-center">계약한 내역이 없습니다.</p>
        </div>
      )}
      <BottomNavigationBar />
    </>
  );
}
