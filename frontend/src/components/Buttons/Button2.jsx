export default function Button1({ children, onClick = () => {}, disabled }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        className={`w-12 h-12 bg-[#C7E3CA] text-xs text-[#535353] border border-[#BDBDBD] rounded-lg transition ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-400"
            : "hover:bg-green-600"
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
