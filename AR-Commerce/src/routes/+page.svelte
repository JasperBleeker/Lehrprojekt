<script lang="ts">
	import IndexHeader from '$lib/components/IndexHeader.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	export let data;
</script>

<IndexHeader />

<div class="max-w-3xl mx-auto mt-8 min-h-[70vh]">
	{#each data.products as product}
		{#if product.name}
			<ProductCard image={product.image} category={product.category} name={product.name} slug={product.name.toLowerCase()} />
		{/if}
	{/each}
</div>
