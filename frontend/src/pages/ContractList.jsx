import { useEffect, useState } from "react";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import TopNavigationBar2 from "../components/Navigators/TopNavigationBar2";
import { getContractList } from "../api/schedule";
import ScheduleList from "../components/Schedule/ScheduleList";
import CardListView from "../components/ListView/CardListView";
import CardSchedule from "../components/Cards/CardSchedule";
import CardContract from "../components/Cards/CardContract";

export default function ContractList() {
  const [contractList, setContractList] = useState();
  useEffect(() => {
    const axiosContractList = async () => {
      try {
        const contractData = await getContractList();
        setContractList(contractData);
      } catch (err) {
        console.log(err);
      }
    };
    axiosContractList();
  }, []);

  useEffect(() => {
    console.log(contractList);
  }, [contractList]);
  return (
    <>
      <TopNavigationBar2 title="계약 내역" />
      <div className="h-[86vh]">
        {contractList ? (
          <CardListView data={contractList} CardComponent={CardContract} />
        ) : null}
      </div>
      <BottomNavigationBar />
    </>
  );
}
