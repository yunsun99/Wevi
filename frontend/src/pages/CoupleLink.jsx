import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";

import { useEffect, useState } from "react";
import { getCoupleLinkState } from "../api/user";
import CoupleLinked from "../components/CoupleLink/CoupleLinked";
import CoupleLinkedNot from "../components/CoupleLink/CoupleLinkedNot";

export default function CoupleLink() {
  const [link, setLink] = useState({
    spouseId: null,
  });

  useEffect(() => {
    const axiosLink = async () => {
      try {
        const data = await getCoupleLinkState();
        setLink(data);
      } catch (error) {
        console.log(error);
      }
    };
    axiosLink();
  }, []);

  return (
    <>
      <TopNavigationBar title="커플 연동" />
      {link.spouseId ? (
        <CoupleLinked link={link} />
      ) : (
        <CoupleLinkedNot link={link} />
      )}

      <BottomNavigationBar />
    </>
  );
}
