<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import Lenis from 'lenis';
	import Header from '$lib/components/sections/header.svelte';
	import { asset } from '$app/paths';

	let { children } = $props();

	onMount(() => {
		const lenis = new Lenis({
			autoRaf: true
		});

		return () => {
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={asset("/favicon.ico")} />
	<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.23/dist/lenis.css" />
	<title>irazz.lol</title>
</svelte:head>
<div class="border-foreground bg-background h-svh">
    <div class="z-99">
        <Header />
        {@render children()}
    </div>
</div>
