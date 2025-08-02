<script lang="ts">
	import { onMount } from 'svelte';
	import ProductUsageStats from '$lib/components/ProductUsageStats.svelte';
	import { page } from '$app/stores';
	import ArIcon from '$lib/svg/ArIcon.svelte';
	import ThreeDIcon from '$lib/svg/ThreeDIcon.svelte';
	import Arrow from '$lib/svg/Arrow.svelte';
	type Product = {
		name: string;
		category: string;
		image: string;
		description: string;
		model?: string;
		modelIOS?: string;
		placement: string;
		staticImages?: string[];
	};
	$: product = $page.data.product as Product | undefined;
	$: modelFile = product?.model;
	$: modelFileIOS = product?.modelIOS;
	const environmentImage = '/AR-Assets/poly_haven_studio_1k.hdr';

	let arStartTime = 0;
	let show3DModal = false;
	let swiper: any = null;
	let hasTrackedStaticImage = false;

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
		//Modelviewer initialization
		if (typeof window !== 'undefined' && !window.customElements.get('model-viewer')) {
			const script = document.createElement('script');
			script.type = 'module';
			script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
			document.body.appendChild(script);
		}

		//swiper.js initializaton
		//@ts-ignore
		if (!window.Swiper) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
			document.head.appendChild(link);

			const script = document.createElement('script');
			script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
			script.onload = () => {
				setTimeout(() => initSwiper(), 0);
			};
			document.body.appendChild(script);
		} else {
			initSwiper();
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
			
			// Handle static image session end
			// This logic is removed as per the edit hint to simplify duration tracking.
		});

		// Track static image interactions
		if (typeof window !== 'undefined') {
			// Start tracking when user interacts with the gallery
			document.addEventListener('click', (e) => {
				if (e.target && (e.target as Element).closest('.swiper')) {
					handleStaticImageView();
					// Reset timeout when user interacts
					// This logic is removed as per the edit hint to simplify duration tracking.
				}
			});

			// Track when user leaves the page
			window.addEventListener('beforeunload', () => {
				// This logic is removed as per the edit hint to simplify duration tracking.
			});
		}

		// Cleanup function
		return () => {
			// This logic is removed as per the edit hint to simplify duration tracking.
		};
	});

	let modelViewerEl: any = null;

	function handleCustomARButton() {
		arStartTime = Date.now();
		console.log('AR-Button pressed, session started');
	}

	function handleStaticImageView() {
		if (!hasTrackedStaticImage) {
			// Tracking-Event für statisches Bild
			fetch('/api/log', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					product: product?.name,
					event: 'static-image-view',
					userAgent: navigator.userAgent,
					screen: { width: window.innerWidth, height: window.innerHeight },
					sessionId: getSessionId(),
					timestamp: Date.now()
				})
			});
			hasTrackedStaticImage = true;
		}
	}

	function handleStaticImageEnd() {
		// This function is removed as per the edit hint to simplify duration tracking.
	}

	function initSwiper() {
		//@ts-ignore
		if (window.Swiper && product?.staticImages?.length > 0) {
			//@ts-ignore
			swiper = new window.Swiper('.swiper', {
				zoom: {
					maxRatio: 3,
					minRatio: 1,
					toggle: true
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				on: {
					slideChange(this: any) {
						// Start tracking when user first interacts with gallery
						if (!hasTrackedStaticImage) {
							handleStaticImageView();
						}
						
						// This logic is removed as per the edit hint to simplify duration tracking.
					},
					slideChangeTransitionEnd(this: any) {
						// Reset timeout for tracking when user stops viewing
						// This logic is removed as per the edit hint to simplify duration tracking.
					}
				}
			});
		}
	}

	// Analytics
	let arStats: any = null;
	let staticImageStats: any = null;
	let productName = '';
	let showStats = false;

	$: productName = $page.data.product?.name;

	// Reset Swiper to first slide when product changes
	$: if (productName && swiper) {
		swiper.slideTo(0, 300); // 300ms transition
		hasTrackedStaticImage = false;
	}

	onMount(() => {
		if (productName) {
			fetchARStats(productName);
			fetchStaticImageStats(productName);
		}
	});

	$: if (productName) {
		if (typeof window !== 'undefined') {
			fetchARStats(productName);
			fetchStaticImageStats(productName);
		}
	}

	async function fetchARStats(name: string) {
		const res = await fetch(`/api/analytics?product=${encodeURIComponent(name)}&type=ar`);
		arStats = await res.json();
	}

	async function fetchStaticImageStats(name: string) {
		const res = await fetch(`/api/analytics?product=${encodeURIComponent(name)}&type=static-image`);
		staticImageStats = await res.json();
	}
</script>

{#if product}
	<div class="max-w-3xl mx-auto pt-20 p-4 mb-10 bg-white rounded shadow">
		<!-- Swiper Galerie -->
		{#if product.staticImages && product.staticImages.length > 0}
			<div class="swiper w-full mb-8 rounded">
				<div class="swiper-wrapper">
					{#each product.staticImages as img, i}
						<div class="swiper-slide flex items-center justify-center relative">
							<div class="swiper-zoom-container">
								<img src={img} alt="Produktbild" class="object-contain h-96 w-full" />
							</div>
							{#if i === 0}
								<!-- 3D-Button auf erstem Bild -->
								<button
									class="threedbutton font-(family-name: --font-body) text-brandblack"
									on:click={() => (show3DModal = true)}
									aria-label="In 3D anschauen"
								>
									<ThreeDIcon class="h-4 w-4" />
									3D Ansicht
								</button>
							{/if}
						</div>
					{/each}
				</div>
				<!-- Swiper Pagination/Navigation falls gewünscht -->
				<!-- <div class="swiper-pagination"></div> -->
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
			</div>
		{/if}

		<!-- Modal für 3D-Ansicht -->
		{#if show3DModal}
			<div class="fixed inset-0 bg-brandwhite/70 backdrop-blur-sm flex items-center justify-center z-50">
				<div class="bg-white rounded shadow-lg p-4 relative max-w-3xl w-full">
					<button class="absolute top-2 right-2 text-2xl" on:click={() => (show3DModal = false)}
						>&times;</button
					>
					{#if modelFile}
						<model-viewer
							src={modelFile}
							ios-src={modelFileIOS}
							alt={product.name}
							poster={product.image}
							camera-controls
							auto-rotate
							ar-modes="scene-viewer quick-look"
							ar-placement={product.placement}
							ar
							environment-image={environmentImage}
							style="width:100%;height:500px;background:transparent;"
						>
							<button
								slot="ar-button"
								class="ar-custom-btn"
								on:click={handleCustomARButton}
								aria-label="AR starten"
							>
								<ArIcon class="w-8 h-8" />
							</button>
						</model-viewer>
					{:else}
						<div class="h-80 flex items-center justify-center text-gray-400 italic">
							Kein 3D-Modell verfügbar.
						</div>
					{/if}
				</div>
			</div>
		{/if}
		<h1 class="text-3xl text-brandblack font-bold mb-2">{product.name}</h1>
		<p class="text-lg text-gray-600 mb-2">Kategorie: {product.category}</p>
		<p class="mb-4 text-gray-700">{product.description}</p>

		{#if arStats || staticImageStats}
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
					<div class="mt-4 space-y-6">
						{#if arStats}
							<ProductUsageStats
								avgDuration={arStats.avgDuration}
								browserPercent={arStats.browserPercent}
								type="ar"
								totalViews={arStats.totalViews}
								uniqueSessions={arStats.uniqueSessions}
							/>
						{/if}
						{#if staticImageStats}
							<ProductUsageStats
								avgDuration={staticImageStats.avgDuration}
								browserPercent={staticImageStats.browserPercent}
								type="static-image"
								totalViews={staticImageStats.totalViews}
								uniqueSessions={staticImageStats.uniqueSessions}
							/>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<div class="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow text-center text-red-600">
		Produkt nicht gefunden.
	</div>
{/if}

<style>
	.threedbutton {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: white;
		padding: 4px 8px;
		gap: 8px;
		border-radius: 5px;
		font-size: medium;
		height: 36px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		transition:
			box-shadow 0.2s,
			background 0.2s;
		cursor: pointer;
		z-index: 10;
	}

	.swiper-button-prev,
	.swiper-button-next {
		color: #2d2d2d;
	}

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
	.ar-custom-btn:focus,
	.threedbutton:hover,
	.threedbutton:focus {
		background: #f1f5f9;
		box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);
		outline: none;
	}
</style>
