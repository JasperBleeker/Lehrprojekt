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
</script>

{#if product}
	<div class="max-w-3xl mx-auto mt-8 p-4 bg-white rounded shadow">
		<div class="flex flex-col md:flex-row gap-8 items-center">
			<div class="flex-1">
				{#if modelFile}
					<div class="w-full h-80 bg-gray-50 rounded flex items-center justify-center relative">
						<model-viewer
							bind:this={modelViewerEl}
							src={modelFile}
							alt={product.name}
							poster={product.image}
							camera-controls
							auto-rotate
							ar-placement="floor"
							ar
							environment-image={environmentImage}
							style="width:100%;height:100%;background:transparent;"
						><button
						slot="ar-button"
						class="ar-custom-btn"
						on:click={handleCustomARButton}
						aria-label="AR starten"
					>
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 23 23" fill="none">
						<g clip-path="url(#clip0_383_68)">
						  <path d="M5.19121 0H2.73013C1.22231 0 0 1.22707 0 2.74077V5.21144H2.1141V2.81341C2.1141 2.40618 2.44299 2.07601 2.84865 2.07601H5.19121V0Z" fill="black"/>
						  <path d="M0 17.7886V20.2592C0 21.7729 1.22231 23 2.73013 23H5.19121V20.8777H2.80249C2.39683 20.8777 2.06795 20.5475 2.06795 20.1403V17.7886H0Z" fill="black"/>
						  <path d="M17.809 23H20.2701C21.7779 23 23.0002 21.7729 23.0002 20.2592V17.7886H20.8861V20.1866C20.8861 20.5938 20.5572 20.924 20.1516 20.924H17.809V23Z" fill="black"/>
						  <path d="M23 5.21144V2.74077C23 1.22707 21.7777 0 20.2699 0H17.8088V2.12234H20.1975C20.6031 2.12234 20.932 2.45251 20.932 2.85975V5.21144H23Z" fill="black"/>
						  <path d="M17.8236 7.12494L11.931 3.62511C11.6594 3.46375 11.322 3.46375 11.0506 3.62511L5.15803 7.12494C4.89501 7.28117 4.73358 7.56524 4.73358 7.87189V15.1025C4.73358 15.4092 4.89478 15.6932 5.15779 15.8495L11.0504 19.3507C11.322 19.5121 11.6597 19.5121 11.9313 19.3507L17.8239 15.8495C18.0869 15.6932 18.2481 15.4092 18.2481 15.1025V7.87189C18.2481 7.565 18.0866 7.28117 17.8236 7.12494ZM9.99669 16.891L6.49978 14.7856C6.40538 14.7288 6.3474 14.6264 6.3474 14.5155V9.78328C6.3474 9.59817 6.54779 9.48338 6.70643 9.57768L10.3175 11.7224C10.4128 11.779 10.4715 11.8821 10.4715 11.9934V16.6209C10.4715 16.8656 10.2057 17.0167 9.99669 16.891ZM11.8434 10.1537C11.6627 10.2636 11.4361 10.2636 11.2554 10.1537L7.5806 8.05863C7.44678 7.97737 7.44283 7.78388 7.57295 7.69703L11.1798 5.44406C11.3677 5.31856 11.6119 5.31693 11.8014 5.43987L15.5186 7.69819C15.6511 7.78411 15.6483 7.97946 15.5135 8.06142L11.8431 10.1537H11.8434ZM16.5201 14.7859L13.0232 16.8912C12.8143 17.0169 12.5485 16.8658 12.5485 16.6211V11.9936C12.5485 11.8823 12.6069 11.7794 12.7025 11.7226L16.3135 9.57791C16.4721 9.48361 16.6725 9.5984 16.6725 9.78351V14.5158C16.6725 14.6264 16.6148 14.7288 16.5201 14.7859Z" fill="black"/>
						</g>
						<defs>
						  <clipPath id="clip0_383_68">
							<rect width="23" height="23" fill="white"/>
						  </clipPath>
						</defs>
					  </svg>
					</button></model-viewer>
						
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

<style>
.ar-custom-btn {
	position: absolute;
	bottom: 1.5rem;
	right: 1.5rem;
	background: white;
	color: #2563eb; /* Tailwind blue-600 */
	border: none;
	border-radius: 50%;
	width: 56px;
	height: 56px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 2px 8px rgba(0,0,0,0.15);
	transition: box-shadow 0.2s, background 0.2s;
	cursor: pointer;
	z-index: 10;
}
.ar-custom-btn:hover, .ar-custom-btn:focus {
	background: #f1f5f9;
	box-shadow: 0 4px 16px rgba(37,99,235,0.15);
	outline: none;
}
.ar-custom-btn svg {
	display: block;
	margin: 0 auto;
}
</style>
