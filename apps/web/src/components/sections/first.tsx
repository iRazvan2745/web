import { BetterAuth } from "../icons/ba";
import { Bun } from "../icons/bun";
import { Docker } from "../icons/docker";
import { Nextjs } from "../icons/next";
import { TypeScript } from "../icons/ts";
import { Turborepo } from "../icons/turborepo";
import { PostgreSQL } from "../icons/postgres";
import { Prisma } from "../icons/prisma";
import { React } from "../icons/react";
import { TailwindCSS } from "../icons/tailwind";

export function FirstSection() {
  return (
    <div className="border-b -mt-1">
      <div className="flex items-center justify-between mx-40">
        <div className="flex">
          <div className="h-screen w-fit -ml-42.5 lg:-ml-22.5 border-l-0 lg:border-l border-r">
            <div className="sticky top-10 mt-33.25 -ml-18 w-full border-t">
              <div className="ml-18 border-y w-full -m-px">
                <div className="h-auto w-full p-4">
                  <p className="text-9xl">Răzvan</p>
                  <p className="font-serif text-xl mx-auto flex italic">
                    "An idiot admires complexity, a genius admires simplicity"
                  </p>
                </div>
                <div className="border-t p-4 -ml-17.75">
                  <div className="ml-17.75 flex gap-4">
                    <h3 className="">My usual tech stack:</h3>
                    <div className="grid grid-cols-5 gap-3">
                      <Bun className="size-8" />
                      <Nextjs className="size-8" />
                      <React className="size-8" />
                      <TailwindCSS className="size-8" />
                      <PostgreSQL className="size-8" />
                      <Prisma className="size-8 invert" />
                      <BetterAuth className="size-8" />
                      <Docker className="size-8" />
                      <TypeScript className="size-8" />
                      <Turborepo className="size-8" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full border-t h-33.5" />
            </div>
          </div>
        </div>
        <div className="border-r w-full h-screen -mr-23 hidden lg:flex">
          <div className="border-y w-full flex my-33.25 items-center justify-center">
            <img
              src={"/head.png"}
              className="h-fit w-180"
              alt="head"
              draggable={false}
            />
            <p className="absolute bottom-0">O-i-i-a-i-o, o-i-i-i-a-i</p>
          </div>
        </div>
      </div>
    </div>
  );
}
