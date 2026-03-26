export function Header() {
  return (
    <header className="flex sticky top-0 bottom-0 bg-background/60 backdrop-blur-md z-50 justify-between border-b h-14">
      <div className="px-4">
        <div className="flex items-center h-14 w-17.75 -ml-4 border-r">
          <a
            href="/"
            className="font-mono hover:underline cursor-pointer px-3.75 hover:bg-foreground duration-300 hover:text-background h-full flex items-center justify-center"
          >
            home
          </a>
        </div>
      </div>
      <div className="flex h-14">
        <div className="flex items-center h-14 border-x">
          <a
            href="/key"
            className="font-mono hover:underline cursor-pointer px-4 hover:bg-foreground duration-300 hover:text-background h-full flex items-center justify-center"
          >
            ssh
          </a>
        </div>
        <div className="flex items-center h-14 border-r">
          <a
            href="https://github.com/iRazvan2745"
            className="font-mono hover:underline cursor-pointer px-4 hover:bg-foreground duration-300 hover:text-background h-full flex items-center justify-center"
          >
            github
          </a>
        </div>
        <div className="flex items-center h-14">
          <a
            href="mailto:contact@irazz.lol"
            className="font-mono hover:underline cursor-pointer px-4 hover:bg-foreground duration-300 hover:text-background h-full flex items-center justify-center border-r -mr-0.5"
          >
            contact
          </a>
        </div>
        <div className="w-[70.4px] h-14 " />
      </div>
    </header>
  );
}
