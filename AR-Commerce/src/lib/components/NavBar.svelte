<script lang="ts">
  import Logo from '../svg/Logo.svelte';
  

  let menuOpen = false;
  const products: { name: string; slug: string }[] = [
    { name: 'Product 1', slug: 'product-1' },
    { name: 'Product 2', slug: 'product-2' },
    { name: 'Product 3', slug: 'product-3' },
    { name: 'Product 4', slug: 'product-4' }
  ];

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<nav class="bg-[#044040] text-white px-4 py-3 flex items-center justify-between shadow-md">
  <div class="flex items-center gap-2">
    <Logo class="w-10 h-10" />
    <span class="font-bold text-lg hidden sm:inline">AR Commerce</span>
  </div>
  <div class="hidden md:flex gap-6">
    <a href="/" class="hover:text-blue-400 transition-colors">Home</a>
    {#each products as product}
      <a href={`/products/${product.slug}`} class="hover:text-blue-400 transition-colors">{product.name}</a>
    {/each}
  </div>
  <button class="md:hidden flex flex-col gap-1" on:click={toggleMenu} aria-label="Open menu">
    <span class="w-7 h-1 bg-white rounded transition-all" style:transform={menuOpen ? 'rotate(45deg) translateY(8px)' : ''}></span>
    <span class="w-7 h-1 bg-white rounded transition-all" style:opacity={menuOpen ? 0 : 1}></span>
    <span class="w-7 h-1 bg-white rounded transition-all" style:transform={menuOpen ? 'rotate(-45deg) translateY(-8px)' : ''}></span>
  </button>
</nav>

<!-- Mobile menu -->
{#if menuOpen}
  <div class="md:hidden bg-gray-900 text-white px-4 py-2 flex flex-col gap-4 shadow-lg z-50 absolute top-16 left-0 w-full animate-fade-in">
    <a href="/" class="hover:text-blue-400 transition-colors" on:click={() => menuOpen = false}>Home</a>
    {#each products as product}
      <a href={`/products/${product.slug}`} class="hover:text-blue-400 transition-colors" on:click={() => menuOpen = false}>{product.name}</a>
    {/each}
  </div>
{/if}

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.2s ease;
  }
</style> 