<script lang="ts">
	  import MyWork from "$lib/components/intersections/myWork.svelte";
    import FirstSection from "$lib/components/sections/first.svelte"
	  import Footer from "$lib/components/sections/footer.svelte";
    import SecondSection from "$lib/components/sections/second.svelte"
    import ThirdSection from "$lib/components/sections/third.svelte"
</script>

<main class="border-foreground">
    <div class="text-foreground">
      <div class="sticky inset-0 top-14.25 flex items-center justify-center z-20 lg:hidden mx-auto">
        <p class="text-foreground bg-background text-lg font-mono border-b border-x px-1">
          use a device with a wider screen pls
        </p>
      </div>
      <FirstSection />
      <MyWork />
      <SecondSection />
      <ThirdSection />
      <Footer />
    </div>
</main>