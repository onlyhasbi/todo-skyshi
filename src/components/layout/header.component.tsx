import Wrapper from "./wrapper.component";

function Header() {
  return (
    <nav className="h-[6.563rem] bg-primary flex items-center shadow-md">
      <Wrapper>
        <h1
          className="text-white font-bold tracking-wide text-2xl"
          data-cy="header-title"
        >
          TO DO LIST APP
        </h1>
      </Wrapper>
    </nav>
  );
}

export default Header;
