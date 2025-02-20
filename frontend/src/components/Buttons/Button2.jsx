export default function Button2({ children, onClick = () => {}, disabled }) {
  return (
    <button
      className={`w-12 h-12 bg-[#609966] text-[#FFFDFA] border border-[#BDBDBD] rounded-lg transition 
        ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-400"
            : "hover:bg-[#609966]"
        }`}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault(); // 🔥 버튼이 비활성화된 경우 클릭 이벤트 방지
          console.log("🚫 버튼이 비활성화되어 클릭되지 않음");
          return;
        }
        console.log("✅ 버튼 클릭됨!"); // ✅ 클릭 이벤트가 실행되는지 확인
        onClick(e);
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
