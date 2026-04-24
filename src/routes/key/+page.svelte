<script>
    import { resolve } from "$app/paths"
</script>

<div class="flex justify-center items-center h-screen">
    <div class="flex flex-col items-center justify-center mx-auto space-y-4">
        <h1 class="text-8xl">my ssh key</h1>
        <code class="bg-foreground text-background select-text inline leading-none">
          ssh-ed25519
          AAAAC3NzaC1lZDI1NTE5AAAAIDcVoP8jqMOSWStyP2NgnJQn3KusA3qjtOAfXph8iCBC
          admin@irazz.lol
        </code>
        <a href={resolve("/")} class="hover:underline">
          go back
        </a>
    </div>
</div>