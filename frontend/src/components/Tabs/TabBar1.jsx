export default function TabBar1({
  children,
  buttons,
  ButtonsContainer = "menu",
}) {
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
