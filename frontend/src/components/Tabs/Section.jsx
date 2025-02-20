export default function Section({ title, children, ...props }) {
  return (
    <menu {...props}>
      <h2>{title}</h2>
      {children}
    </menu>
  );
}
