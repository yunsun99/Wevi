export default function Input({ label, id, error, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className="w-full p-3 border bg-[rgba(214,214,214,0.5)] border-[#BDBDBD] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        {...props}
      />
      <div className="text-red-600 min-h-6">{error && <p>{error}</p>}</div>
    </div>
  );
}
