<script lang="ts">
  import { ArrowLeft, ArrowRight, GitGraph, Globe } from "lucide-svelte";

  let page = $state(1);

  function handleIncrement() {
    page = page >= 5 ? 1 : page + 1;
  }

  function handleDecrement() {
    if (page === 1) return;
    page -= 1;
  }
</script>

<div class="border-b">
  <div class="flex items-center justify-between mr-40 border-l ml-17.5">

    <div class="w-full flex -mr-23">
      <div class="flex w-full border-l -ml-22.75">
        <div class="border-y w-full flex h-full">
          <div class="w-full justify-center items-center">
            <div class="relative mx-auto flex flex-col justify-center items-center h-182 w-full px-11.25">
              <img
                src={`/uptimekit/${page}.png`}
                alt="Bee.host images"
                class="h-auto ml-22.5 w-260 border-y"
              />
              <div class="absolute top-0 right-0 border-b border-l w-10 justify-center flex items-center">{page}/5</div>
            </div>

            <div class="flex items-center border-t w-full justify-center">
              <div class="flex">
                <button
                  type="button"
                  onclick={handleDecrement}
                  class="border-x hover:bg-foreground hover:text-background duration-200"
                  aria-label="Previous image"
                >
                  <ArrowLeft size={40} />
                </button>

                <button
                  type="button"
                  onclick={handleIncrement}
                  class="border-r hover:bg-foreground hover:text-background duration-200"
                  aria-label="Next image"
                >
                  <ArrowRight size={40} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="h-screen w-260 -mr-23 border-x bg-background">

      <div class="sticky top-14 flex justify-end w-full right-0 bg-background">
        <span class="border-l px-2 font-mono border-b w-25.25 flex items-center justify-center">active</span>
      </div>

      <div class="sticky top-20 mt-71.5 -mr-18 w-full border-y bg-background">
        <div class="p-4 border-y w-full -mt-px">
          <div class="justify-center flex items-center gap-4">
            <img
              src="/uptimekit/logo.svg"
              class="h-auto w-auto"
              width="100"
              height="80"
              alt="uptimekit logo"
              draggable="false"
            />
          </div>
        </div>

        <p class="flex mx-auto items-center justify-center p-1">
          The open-source worker driven uptime monitoring solution.
        </p>
      </div>

      <div class="justify-center items-center h-[43.75vh] flex">
        <a
          href="https://uptimekit.dev"
          target="_blank"
          class="p-4 gap-2 border flex items-center hover:bg-foreground hover:text-background hover:underline duration-300"
        >
          <Globe />
          <p class="text-lg">Website</p>
        </a>
        <a
          href="https://github.com/uptimekit/uptimekit"
          target="_blank"
          class="p-4 gap-2 border border-l-0 flex items-center hover:bg-foreground hover:text-background hover:underline duration-300"
        >
          <GitGraph />
          <p class="text-lg">Github</p>
        </a>
      </div>
    </div>
  </div>
</div>