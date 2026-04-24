<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import Lenis from 'lenis';
	import Header from '$lib/components/sections/header.svelte';

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
	<link rel="icon" href={"/favicon.ico"} />
	<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.23/dist/lenis.css" />
	<title>irazz.lol</title>
</svelte:head>
<div class="border-foreground bg-background">
	<Header />
	{@render children()}
</div>
