<script lang="ts">
  import BetterAuth from "../icons/ba.svelte";
  import Bun from "../icons/bun.svelte";
  import Docker from "../icons/docker.svelte";
  import Nextjs from "../icons/next.svelte";
  import TypeScript from "../icons/ts.svelte";
  import Turborepo from "../icons/turborepo.svelte";
  import PostgreSQL from "../icons/postgres.svelte";
  import Prisma from "../icons/prisma.svelte";
  import React from "../icons/react.svelte";
  import TailwindCSS from "../icons/tailwind.svelte";
</script>

<div class="border-b -mt-1">
  <div class="flex items-center justify-between mx-40">
    <div class="flex">
      <div class="h-screen w-fit -ml-42.5 lg:-ml-22.5 border-l-0 lg:border-l border-r">
        <div class="sticky top-10 mt-33.25 -ml-18 w-full border-t">
          <div class="ml-18 border-y w-full -m-px">
            <div class="h-auto w-full p-4">
              <p class="text-9xl">Răzvan</p>
              <p class="font-serif text-xl mx-auto flex italic">
                "An idiot admires complexity, a genius admires simplicity"
              </p>
            </div>

            <div class="border-t p-4 -ml-17.75">
              <div class="ml-17.75 flex gap-4">
                <h3>My usual tech stack:</h3>
                <div class="grid grid-cols-5 gap-3">
                  <Bun class="size-8" />
                  <Nextjs class="size-8" />
                  <React class="size-8" />
                  <TailwindCSS class="size-8" />
                  <PostgreSQL class="size-8" />
                  <Prisma class="size-8 invert" />
                  <BetterAuth class="size-8" />
                  <Docker class="size-8" />
                  <TypeScript class="size-8" />
                  <Turborepo class="size-8" />
                </div>
              </div>
            </div>
          </div>

          <div class="w-full border-t h-33.5"></div>
        </div>
      </div>
    </div>

    <div class="border-r w-full h-screen -mr-23 hidden lg:flex">
      <div class="border-y relative my-33.25 flex w-full items-center justify-center overflow-hidden px-12">
        <picture class="flex w-full justify-center">
          <source
            type="image/avif"
            srcset="/head-720.avif 720w, /head-1440.avif 1440w"
            sizes="(min-width: 1024px) min(100vw - 38rem, 52rem), 0px"
          />
          <source
            type="image/webp"
            srcset="/head-720.webp 720w, /head-1440.webp 1440w"
            sizes="(min-width: 1024px) min(100vw - 38rem, 52rem), 0px"
          />
          <img
            src="/head.png"
            width="1440"
            height="1606"
            class="block h-auto max-h-[calc(100vh-20rem)] w-full max-w-208 object-contain"
            alt="Portrait of Razvan"
            sizes="(min-width: 1024px) min(100vw - 38rem, 52rem), 0px"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            draggable="false"
          />
        </picture>

        <p class="absolute bottom-0 left-1/2 -translate-x-1/2 bg-background px-2">
          O-i-i-a-i-o, o-i-i-i-a-i
        </p>
      </div>
    </div>
  </div>
</div>
