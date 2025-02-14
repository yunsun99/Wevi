import TopNavigationBar from "../components/Navigators/TopNavigationBar";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import character_background from "../assets/characters/character_background2.png";
import character_dress from "../assets/characters/character_dress.png";
import character_hair from "../assets/characters/character_hair.png";
import character_original from "../assets/characters/character_original.png";
import character_camera from "../assets/characters/character_camera2.png";

import { useEffect, useState } from "react";
import { getContractList } from "../api/schedule";

export default function Home() {
  const [contractList, setContractList] = useState([]);
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

    axiosContractList();
  }, []);
  useEffect(() => {
    console.log(categoryExists);
  }, [categoryExists]);

  return (
    <>
      <TopNavigationBar />
      <div className="h-[86vh]">
        <div className="h-20 flex justify-end items-center px-4">
          <div className="text-2xl font-bold">1 일째</div>
        </div>
        <main className="flex flex-col w-screen items-center justify-center overflow-hidden h-[calc(100vh-144px)]">
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

            {/* 드레스 계약이 있으면 드레스 이미지 추가 */}
            {categoryExists.dress && (
              <img
                src={character_dress}
                alt="Character Dress"
                className="absolute object-contain"
              />
            )}

            {/* 헤어(메이크업) 계약이 있으면 헤어 이미지 추가 */}
            {categoryExists.makeup && (
              <img
                src={character_hair}
                alt="Character Hair"
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
