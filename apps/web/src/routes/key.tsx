import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/key")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center mx-auto space-y-4">
        <h1 className="text-8xl">my ssh key</h1>
        <code className="bg-foreground text-background select-text inline leading-none">
          ssh-ed25519
          AAAAC3NzaC1lZDI1NTE5AAAAIDcVoP8jqMOSWStyP2NgnJQn3KusA3qjtOAfXph8iCBC
          admin@irazz.lol
        </code>
        <a href={"/"} className="hover:underline">
          go back
        </a>
      </div>
    </div>
  );
}
