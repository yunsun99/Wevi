export default function Input({ label, id, error, disabled, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-lg font-pretendard">
        {label}
      </label>
      <input
        id={id}
        className={`w-full p-3 border bg-[rgba(214,214,214,0.5)] border-[#BDBDBD] rounded-md 
          focus:outline-none focus:ring-2 focus:ring-gray-500 
          ${disabled ? "opacity-50 cursor-not-allowed bg-gray-200" : ""}`} // ✅ 비활성화 스타일 추가
        disabled={disabled} // ✅ 비활성화 적용
        {...props}
      />
      <div className="text-red-600 min-h-6">{error && <p>{error}</p>}</div>
    </div>
  );
}
