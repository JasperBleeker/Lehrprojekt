<script lang="ts">
    export let avgDuration: number; // in Sekunden
    export let browserPercent: Record<string, number>;
    export let type: string = 'ar'; // 'ar' or 'static-image'
    export let totalViews: number = 0;
    export let uniqueSessions: number = 0;
  </script>
  
  <div class="bg-white mt-8 max-w-2xl mx-auto">
    <h2 class="text-xl text-brandblack font-bold mb-4">
      {type === 'ar' ? 'AR-Nutzungsstatistik' : 'Bild-Nutzungsstatistik'}
    </h2>
  
    <div class="mb-4">
      {#if type === 'ar'}
        <p class="text-gray-600">⏱️ <strong>Durchschnittliche AR-Verweildauer:</strong> {avgDuration.toFixed(1)} Sekunden</p>
        <p class="text-gray-600">🎯 <strong>AR-Interaktionen:</strong> {totalViews}</p>
        <p class="text-gray-600">👥 <strong>Eindeutige Sessions:</strong> {uniqueSessions}</p>
      {:else}
        <p class="text-gray-600">📸 <strong>Galerie-Aufrufe:</strong> {totalViews}</p>
        <p class="text-gray-600">👥 <strong>Eindeutige Sessions:</strong> {uniqueSessions}</p>
      {/if}
    </div>
  
    {#if browserPercent && Object.keys(browserPercent).length > 0}
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
    {:else}
      <div class="mt-4">
        <p class="text-gray-500 text-sm">Keine Browserdaten verfügbar</p>
      </div>
    {/if}
  </div>
  