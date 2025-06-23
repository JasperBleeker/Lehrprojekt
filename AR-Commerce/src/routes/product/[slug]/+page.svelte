<script lang="ts">
  import { onMount } from 'svelte';
  export let data;
  type Product = {
    name: string;
    category: string;
    image: string;
    description: string;
    model?: string;
  };
  const product = data.product as Product | undefined;
  const modelFile = product?.model;

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
      <img src={product.image} alt={product.name} class="w-48 h-48 object-contain bg-gray-100 rounded" />
      <div class="flex-1">
        <h1 class="text-3xl font-bold mb-2">{product.name}</h1>
        <div class="text-lg text-gray-600 mb-2">Kategorie: {product.category}</div>
        <div class="mb-4 text-gray-700">{product.description}</div>
        {#if modelFile}
          <div class="w-full h-80 bg-gray-50 rounded flex items-center justify-center">
            <model-viewer src={modelFile} alt={product.name} camera-controls auto-rotate style="width:100%;height:100%;background:transparent;" />
          </div>
        {:else}
          <div class="w-full h-80 flex items-center justify-center text-gray-400 italic">
            Kein 3D-Modell verfügbar.
          </div>
        {/if}
      </div>
    </div>
  </div>
{:else}
  <div class="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow text-center text-red-600">
    Produkt nicht gefunden.
  </div>
{/if} 