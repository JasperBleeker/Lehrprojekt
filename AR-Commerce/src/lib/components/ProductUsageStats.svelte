<script lang="ts">
    export let avgDuration: number; // in Sekunden
    export let sessionCount: number;
    export let browserPercent: Record<string, number>;
  </script>
  
  <div class="bg-white mt-8 max-w-2xl mx-auto">
    <h2 class="text-xl text-brandblack font-bold mb-4">Nutzungsstatistik</h2>
  
    <div class="mb-4">
      <p class="text-gray-600">⏱️ <strong>Durchschnittliche AR-Verweildauer:</strong> {avgDuration.toFixed(1)} Sekunden</p>
      <p class="text-gray-600">👥 <strong>Anzahl Sessions:</strong> {sessionCount}</p>
    </div>
  
    <div class="mt-4">
      <h3 class="font-semibold mb-2 text-brandblack">🌐 Browserverteilung</h3>
      {#each Object.entries(browserPercent) as [browser, percent]}
        <div class="mb-2">
          <div class="flex justify-between text-sm text-gray-700 mb-1">
            <span>{browser}</span>
            <span>{percent}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              class="h-3 bg-secondary rounded-full"
              style="width: {percent}%"
            ></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  