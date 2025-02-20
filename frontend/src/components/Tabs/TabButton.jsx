export default function TabButton({ label, onSelect, isSelected }) {
  return (
    <li>
      <button className={isSelected ? "active" : undefined} onClick={onSelect}>
        {label}
      </button>
    </li>
  );
}
