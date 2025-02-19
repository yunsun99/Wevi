export default function ButtonLogin({
  children,
  onClick = () => {},
  disabled,
}) {
  return (
    <button
      className={`w-full bg-[rgba(96,153,102,0.9)] border-[#609765] text-[#FFFDFA] py-3 rounded-lg transition 
        ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-400"
            : "hover:bg-green-600"
        }`}
      onClick={disabled ? undefined : onClick} // ✅ disabled 시 클릭 막기
      disabled={disabled} // ✅ 여기에 추가!
    >
      {children}
    </button>
  );
}
