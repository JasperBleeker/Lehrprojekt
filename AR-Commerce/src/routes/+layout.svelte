<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import IndexHeader from '$lib/components/IndexHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data, children } = $props();
</script>

<div class="min-h-screen flex flex-col">
	<NavBar products={data.navProducts.filter(Boolean) as { name: string; slug: string }[]} />
	
	<main class="flex-1 pt-16">
		{@render children()}
	</main>
	
	<Footer />
</div>
