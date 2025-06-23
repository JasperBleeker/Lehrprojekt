<script lang="ts">
	import IndexHeader from '$lib/components/IndexHeader.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	export let data;
</script>

<IndexHeader />

<div class="max-w-3xl mx-auto mt-8">
	{#each data.products as product}
		<ProductCard image={product.image} category={product.category} name={product.name} />
	{/each}
</div>
