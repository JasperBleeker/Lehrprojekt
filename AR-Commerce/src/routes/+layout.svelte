<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import IndexHeader from '$lib/components/IndexHeader.svelte';

	let { data, children } = $props();
</script>

<NavBar products={data.navProducts.filter(Boolean) as { name: string; slug: string }[]} />

{@render children()}
