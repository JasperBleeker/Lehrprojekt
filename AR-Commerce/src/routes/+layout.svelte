<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import IndexHeader from '$lib/components/IndexHeader.svelte';

	let { children } = $props();
</script>

<NavBar />

{@render children()}
