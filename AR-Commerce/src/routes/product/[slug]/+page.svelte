<script lang="ts">
	import { onMount } from 'svelte';
	import ProductUsageStats from '$lib/components/ProductUsageStats.svelte';
	import { page } from '$app/stores';
	import ArIcon from '$lib/svg/ArIcon.svelte';
	import Arrow from '$lib/svg/Arrow.svelte';
	type Product = {
		name: string;
		category: string;
		image: string;
		description: string;
		model?: string;
		placement: string;
	};
	$: product = $page.data.product as Product | undefined;
	$: modelFile = product?.model;
	const environmentImage = '/AR-Assets/poly_haven_studio_1k.hdr';

	let arStartTime = 0;

	// Generate or retrieve a session/visitor ID
	function getSessionId() {
		let sessionId = localStorage.getItem('sessionId');
		if (!sessionId) {
			if (window.crypto && typeof window.crypto.randomUUID === 'function') {
				sessionId = crypto.randomUUID();
			} else {
				// Fallback: simple UUID v4 generator
				sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
					const r = (Math.random() * 16) | 0,
						v = c === 'x' ? r : (r & 0x3) | 0x8;
					return v.toString(16);
				});
			}
			localStorage.setItem('sessionId', sessionId);
		}
		return sessionId;
	}

	onMount(() => {
		if (typeof window !== 'undefined' && !window.customElements.get('model-viewer')) {
			const script = document.createElement('script');
			script.type = 'module';
			script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
			document.body.appendChild(script);
		}

		// Listen for page visibility changes to estimate AR session duration for analytics
		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'visible' && arStartTime > 0) {
				const arDuration = Date.now() - arStartTime;
				console.log(`AR-Verweildauer (Visibility API): ${arDuration} ms`);
				fetch('/api/log', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						product: product?.name,
						arDuration,
						event: 'ar-session-heuristic',
						userAgent: navigator.userAgent,
						screen: { width: window.innerWidth, height: window.innerHeight },
						sessionId: getSessionId(),
						timestamp: Date.now()
					})
				});
				arStartTime = 0;
			}
		});
	});

	let modelViewerEl: any = null;

	function handleCustomARButton() {
		arStartTime = Date.now();
		console.log('AR-Button pressed, session started');
	}

	// Analytics
	let stats: any = null;
	let productName = '';
	let showStats = false;

	$: productName = $page.data.product?.name;

	onMount(() => {
		if (productName) fetchStats(productName);
	});

	$: if (productName) {
		if (typeof window !== 'undefined') fetchStats(productName);
	}

	async function fetchStats(name: string) {
		const res = await fetch(`/api/analytics?product=${encodeURIComponent(name)}`);
		stats = await res.json();
	}
</script>

{#if product}
	<div class="max-w-3xl mx-auto pt-20 p-4 mb-10 bg-white rounded shadow">
		<div class="flex flex-col md:flex-row gap-8">
			<div class="flex-1">
				{#if modelFile}
					<div
						class="w-full h-80 mb-8 bg-gray-50 rounded flex items-center justify-center relative"
					>
						<model-viewer
							bind:this={modelViewerEl}
							src={modelFile}
							alt={product.name}
							poster={product.image}
							camera-controls
							auto-rotate
							ar-placement={product.placement}
							ar
							environment-image={environmentImage}
							style="width:100%;height:100%;background:transparent;"
							><button
								slot="ar-button"
								class="ar-custom-btn"
								on:click={handleCustomARButton}
								aria-label="AR starten"
							>
								<ArIcon class="w-8 h-8" />
							</button></model-viewer
						>
					</div>
				{:else}
					<div class="w-full h-80 flex items-center justify-center text-gray-400 italic">
						Kein 3D-Modell verfügbar.
					</div>
				{/if}
				<h1 class="text-3xl text-brandblack font-bold mb-2">{product.name}</h1>
				<p class="text-lg text-gray-600 mb-2">Kategorie: {product.category}</p>
				<p class="mb-4 text-gray-700">{product.description}</p>

				{#if stats}
					<div class="mt-6">
						<button
							class="px-3 py-1.5 bg-gray-100 text-brandblack rounded border border-gray-300 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center gap-2"
							on:click={() => (showStats = !showStats)}
							aria-expanded={showStats}
						>
							<Arrow
								class="w-4 h-4 transition-transform duration-200 text-brandblack"
								style={`transform: rotate(${showStats ? 90 : 0}deg);`}
							/>
							<span
								>{showStats
									? 'Interaktionsstatistiken ausblenden'
									: 'Interaktionsstatistiken anzeigen'}</span
							>
						</button>
						{#if showStats}
							<div class="mt-4">
								<ProductUsageStats
									avgDuration={stats.avgDuration}
									sessionCount={stats.sessionCount}
									browserPercent={stats.browserPercent}
								/>
							</div>
						{/if}
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

<style>
	.ar-custom-btn {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		background: white;
		border: none;
		border-radius: 50%;
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		transition:
			box-shadow 0.2s,
			background 0.2s;
		cursor: pointer;
		z-index: 10;
	}
	.ar-custom-btn:hover,
	.ar-custom-btn:focus {
		background: #f1f5f9;
		box-shadow: 0 4px 16px rgba(37, 99, 235, 0.15);
		outline: none;
	}
</style>
