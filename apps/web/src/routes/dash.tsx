import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dash")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-[calc(100vh-3.4rem)]">
      {/* Left panel */}
      <div className="fixed flex top-14 left-0 h-[calc(100vh-3.5rem)] w-[15.9%] border-r flex-col">
        <p className="border-b p-1.5 text-sm font-medium">tech stack</p>

        <div className="text-sm h-full">
          <div className="p-2">
            <p className="mb-1 text-xs font-bold text-muted-foreground">
              frontend
            </p>
            <ul className="ml-2 space-y-1 border-l border-border">
              <li className="cursor-default rounded-sm pl-2 hover:bg-muted">
                next.js
              </li>
              <li className="cursor-default rounded-sm pl-2 hover:bg-muted">
                tailwind
              </li>
              <li className="cursor-default rounded-sm pl-2 hover:bg-muted">
                shadcn (heavily modified)
              </li>
            </ul>
          </div>

          <div className="p-2">
            <p className="mb-1 text-xs font-bold text-muted-foreground">
              backend
            </p>
            <ul className="ml-2 space-y-1 border-l border-border">
              <li className="cursor-default rounded-sm pl-2 hover:bg-muted">
                elysia
              </li>
              <li className="cursor-default rounded-sm pl-2 hover:bg-muted">
                prisma
              </li>
              <li className="cursor-default rounded-sm pl-2 hover:bg-muted">
                valkey
              </li>
            </ul>
          </div>

          <div className="p-2">
            <p className="mb-1 text-xs font-bold text-muted-foreground">
              infra & auth
            </p>
            <ul className="ml-2 space-y-1 border-l border-border">
              <li className="cursor-default rounded-sm pl-2 hover:bg-muted">
                turborepo
              </li>
              <li className="cursor-default rounded-sm pl-2 hover:bg-muted">
                better-auth
              </li>
              <li className="cursor-default rounded-sm pl-2 hover:bg-muted">
                pterodactyl api
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Center panel */}
      <div className="fixed top-14 left-[15.9%] h-[calc(100vh-3.5rem)] w-[69%]">
        <p className="border-b px-2 py-1">main</p>
        <div className="flex h-[calc(100%-2.25rem)] items-center justify-center">
          video and images go here
        </div>
      </div>

      {/* Right panel */}
      <div className="fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-65 border-l flex flex-col">
        <p className="border-b px-2 py-1">overview</p>

        <p className="p-2">
          tired of all the generic pterodactyl themes? here's beedash, a
          complete rewrite of pterodactyl’s frontend, designed to offer a
          modern, future-proof alternative to its outdated react 16 mess. the
          dashboard also includes several extra features you can opt out of,
          such as server metrics, letting users track their usage over time.
        </p>

        <a
          href="mailto:contact@irazz.lol"
          className="mt-auto text-[3.75rem] flex w-full items-center justify-center border-t p-4 transition duration-200 hover:bg-foreground hover:text-background hover:underline"
        >
          Contact me
        </a>
      </div>
    </div>
  );
}
