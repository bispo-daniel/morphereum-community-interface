const Footer = () => {
  return (
    <footer className="xs:mb-8 mb-12 mt-6 flex h-[75px] w-full select-none items-center justify-between px-4 py-2 text-center">
      <div className="w-full rounded-[12px] border bg-transparent bg-opacity-20 p-4 backdrop-blur-md backdrop-filter">
        Feito com{" "}
        <span className="transition-colors hover:text-[var(--coin-pink)]">
          ❤
        </span>{" "}
        pela Comunidade{" "}
        <span className="transition-colors hover:text-[var(--coin-pink)] hover:underline">
          $Morphereum
        </span>
      </div>
    </footer>
  );
};

export default Footer;
