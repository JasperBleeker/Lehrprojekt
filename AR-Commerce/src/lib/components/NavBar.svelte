<script lang="ts">
	import Logo from '../svg/Logo.svelte';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let products: { name: string; slug: string }[] = [];
	let menuOpen = false;
    

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	$: if (browser) {
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	onDestroy(() => {
		if (browser) {
			document.body.style.overflow = '';
		}
	});
</script>

<nav class="bg-[#044040] text-brandwhite z-80 px-4 py-3 fixed w-full flex items-center justify-between shadow-md">
	<a href="/" aria-label="Home">
		<div class="flex items-center gap-2">
			<Logo class="w-10 h-10" />
			<span class="font-bold text-lg hidden sm:inline">AR Commerce</span>
		</div>
	</a>
	<div class="hidden md:flex gap-6">
		<a href="/" class="hover:text-blue-400 transition-colors">Home</a>
		{#each products as product}
			<a href={`/product/${product.slug}`} class="hover:text-blue-400 transition-colors"
				>{product.name}</a
			>
		{/each}
	</div>
	<button class="md:hidden flex flex-col gap-1.25 box-content items-center justify-center" on:click={toggleMenu} aria-label="Open menu">
		<span
			class="w-7 h-1 bg-brandwhite rounded transition-all ease-in-out origin-center"
			style:transform={menuOpen ? 'translateY(9px) rotate(45deg)' : ''}
		></span>
		<span class="w-7 h-1 bg-brandwhite rounded transition-all ease-in-out origin-center" style:opacity={menuOpen ? 0 : 1}></span>
		<span
			class="w-7 h-1 bg-brandwhite rounded transition-all ease-in-out origin-center"
			style:transform={menuOpen ? 'translateY(-9px) rotate(-45deg)' : ''}
		></span>
	</button>
</nav>

<!-- Mobile menu -->
{#if menuOpen}
	<div
		class="md:hidden bg-primary/90 backdrop-blur-md text-brandwhite px-4 py-2 flex flex-col justify-center gap-4 z-50 fixed top-0 left-0 w-full h-full animate-fade-in text-center"
	>
		<a href="/" class="hover:text-blue-400 transition-colors text-2xl" on:click={() => (menuOpen = false)}
			>Home</a
		>
		{#each products as product}
			<a
				href={`/product/${product.slug}`}
				class="hover:text-blue-400 transition-colors text-2xl"
				on:click={() => (menuOpen = false)}>{product.name}</a
			>
		{/each}
	</div>
{/if}

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in {
		animation: fade-in 0.4s ease;
	}
</style>
