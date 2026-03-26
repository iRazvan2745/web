import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex-1 p-6">
      <div className="max-w-3xl space-y-2">
        <h1 className="font-mono text-xl">Subscriptions</h1>
        <p className="text-sm text-muted-foreground">
          Minimal dashboard shell with a single sidebar navigation item.
        </p>
      </div>
    </div>
  );
}
