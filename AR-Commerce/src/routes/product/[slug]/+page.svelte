<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  type Product = {
    name: string;
    category: string;
    image: string;
    description: string;
    model?: string;
  };
  $: product = $page.data.product as Product | undefined;
  $: modelFile = product?.model;
  const environmentImage = '/AR-Assets/poly_haven_studio_1k.hdr';

  onMount(() => {
    if (typeof window !== 'undefined' && !window.customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      document.body.appendChild(script);
    }
  });
</script>

{#if product}
  <div class="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow">
    <div class="flex flex-col md:flex-row gap-8 items-center">
      <div class="flex-1">
        
        {#if modelFile}
          <div class="w-full h-80 bg-gray-50 rounded flex items-center justify-center">
            <model-viewer src={modelFile} alt={product.name} poster={product.image} camera-controls auto-rotate ar environment-image={environmentImage} style="width:100%;height:100%;background:transparent;"></model-viewer>
          </div>
        {:else}
          <div class="w-full h-80 flex items-center justify-center text-gray-400 italic">
            Kein 3D-Modell verfügbar.
          </div>
        {/if}
        <h1 class="text-3xl font-bold mb-2">{product.name}</h1>
        <p class="text-lg text-gray-600 mb-2">Kategorie: {product.category}</p>
        <p class="mb-4 text-gray-700">{product.description}</p>

      </div>
    </div>
  </div>
{:else}
  <div class="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow text-center text-red-600">
    Produkt nicht gefunden.
  </div>
{/if} 