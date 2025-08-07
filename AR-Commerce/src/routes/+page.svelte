<script lang="ts">
	import IndexHeader from '$lib/components/IndexHeader.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	export let data;
</script>

<svelte:head>
	<title>AR-Commerce - Entdecke die Zukunft des Einkaufens</title>
	<meta name="description" content="Entdecke die Zukunft des Einkaufens mit innovativer AR-Technologie. Visualisiere Produkte in deiner Umgebung vor dem Kauf." />
	<meta name="keywords" content="AR, Augmented Reality, E-Commerce, 3D-Modelle, Produktvisualisierung" />
</svelte:head>

<IndexHeader />

<div class="max-w-3xl mx-auto mt-8 min-h-[70vh]">
	{#each data.products as product}
		{#if product.name}
			<ProductCard image={product.image} category={product.category} name={product.name} slug={product.name.toLowerCase()} />
		{/if}
	{/each}
</div>
