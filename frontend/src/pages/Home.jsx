import TopNavigationBar from "../components/Navigators/TopNavigationBar";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import character_background from "../assets/characters/character_background2.png";
import character_dress from "../assets/characters/character_dress.png";
import character_hair from "../assets/characters/character_hair.png";
import character_original from "../assets/characters/character_original.png";
import character_camera from "../assets/characters/character_camera2.png";

import { useEffect, useState } from "react";
import { getContractList } from "../api/schedule";
import { getUserInfo } from "../api/user";
import dayjs from "dayjs"; // ✅ dayjs 라이브러리 사용

// D-day날짜계산기
function getDaysDifference(updatedDate) {
  const today = dayjs().startOf("day"); // 🔹 오늘 날짜 (시간 제외)
  const updated = dayjs(updatedDate).startOf("day"); // 🔹 coupleUpdatedAt (시간 제외)

  const diff = today.diff(updated, "day"); // 🔹 날짜 차이 계산
  return diff >= 0 ? `D+${diff}일` : `D-${diff}일`;
}

export default function Home() {
  const [contractList, setContractList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [dateDiff, setDateDiff] = useState("");

  const [categoryExists, setCategoryExists] = useState({
    weddinghall: false,
    dress: false,
    studio: false,
    makeup: false,
  });

  useEffect(() => {
    const axiosContractList = async () => {
      try {
        const contractData = await getContractList();
        if (!contractData) {
          return;
        }
        setContractList(contractData);

        // 🔥 각 카테고리가 존재하는지 확인
        const categoryStatus = {
          weddinghall: contractData.some(
            (c) => c.categoryName === "weddinghall"
          ),
          dress: contractData.some((c) => c.categoryName === "dress"),
          studio: contractData.some((c) => c.categoryName === "studio"),
          makeup: contractData.some((c) => c.categoryName === "makeup"),
        };

        setCategoryExists(categoryStatus);
      } catch (err) {
        console.log(err);
      }
    };

    const axiosUserInfo = async () => {
      console.log("userinfo 실행");
      try {
        const userData = await getUserInfo();
        if (!userData) {
          return;
        }
        setUserInfo(userData);
      } catch (err) {
        console.log(err);
      }
    };

    axiosContractList();
    axiosUserInfo(); // ✅ 이제 정상적으로 실행됨
  }, []);

  useEffect(() => {
    if (userInfo.coupleUpdatedAt) {
      console.log("으악");
      setDateDiff(getDaysDifference(userInfo.coupleUpdatedAt));
    } else {
      return;
    }
  }, [userInfo]);

  // useEffect(() => {
  //   console.log(categoryExists);
  // }, [categoryExists]);
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  let comment =
    "예식장/스튜디오/드레스/메이크업 샵을 | 계약하면 홈 화면이 바뀌어요!";

  return (
    <>
      <TopNavigationBar />
      <div className="h-[86vh]">
        <div className="h-20 flex justify-end items-center px-4">
          {userInfo ? (
            <div className="text-2xl font-bold">{dateDiff}</div>
          ) : null}
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[30vh] text-md text-center">
            {comment.split("|").map((line, index) => (
              <span key={index} className="whitespace-nowrap">
                {line}
                {index !== comment.split("|").length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>

        <main className="flex flex-col w-screen items-center justify-center overflow-hidden h-[75vh]">
          <div className="relative w-full flex items-center justify-center">
            {/* 기본 캐릭터 배경 (항상 표시) */}
            <img
              src={character_background}
              alt="Character Background"
              className="absolute object-contain"
            />

            {/* 기본 캐릭터 (항상 표시) */}
            <img
              src={character_original}
              alt="Character Original"
              className="absolute object-contain"
            />

            {/* 헤어(메이크업) 계약이 있으면 헤어 이미지 추가 */}
            {categoryExists.makeup && (
              <img
                src={character_hair}
                alt="Character Hair"
                className="absolute object-contain"
              />
            )}
            {/* 드레스 계약이 있으면 드레스 이미지 추가 */}
            {categoryExists.dress && (
              <img
                src={character_dress}
                alt="Character Dress"
                className="absolute object-contain"
              />
            )}

            {/* 스튜디오 계약이 있으면 카메라 이미지 추가 */}
            {categoryExists.studio && (
              <img
                src={character_camera}
                alt="Character Camera"
                className="absolute object-contain"
              />
            )}
          </div>
        </main>
      </div>
      <BottomNavigationBar />
    </>
  );
}
