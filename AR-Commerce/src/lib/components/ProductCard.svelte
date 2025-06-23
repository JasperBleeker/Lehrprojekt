<script lang="ts">
  export let image: string;
  export let category: string;
  export let name: string;
  export let slug: string;
</script>

<a href={`/product/${slug}`} class="block">
  <div class="flex items-center border-b border-gray-300 py-4 hover:bg-gray-50 transition">
    <img src={image} alt={name} class="w-24 h-24 object-contain mr-6 bg-white rounded" />
    <div class="flex flex-col flex-1">
      <span class="text-lg font-semibold">{category}</span>
      <span class="text-base text-gray-600 mt-1">{name}</span>
    </div>
  </div>
</a> 