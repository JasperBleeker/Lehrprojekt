<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let isVisible = false;

	onMount(() => {
		if (browser) {
			setTimeout(() => {
				isVisible = true;
			}, 100);
		}
	});
</script>

<svelte:head>
	<title>Über dieses Projekt - AR Commerce</title>
	<meta
		name="description"
		content="Technische Details und Entwicklungshintergründe des AR Commerce Projekts"
	/>
</svelte:head>

<div class="min-h-screen bg-brandwhite text-brandblack">
	<div class="container mx-auto px-4 py-8 pt-24">
		<div class="max-w-4xl mx-auto">
			<!-- Header -->
			<div
				class="text-center mb-12 transition-all duration-1000"
				class:opacity-100={isVisible}
				class:opacity-0={!isVisible}
				class:translate-y-0={isVisible}
				class:translate-y-8={!isVisible}
			>
				<h1 class="text-4xl md:text-5xl font-bold mb-4">Über dieses Projekt</h1>
				<p class="text-xl text-brandblack">
					AR Commerce - Ein modernes E-Commerce Erlebnis mit Augmented Reality
				</p>
				<p class="text-lg text-secondary mt-2">
					Bachelor Thesis - Multi Media Producer (Media Engineering)
				</p>
				<p class="text-lg text-secondary mt-2">
					Entwickler: <a
						href="https://github.com/JasperBleeker"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:underline">Jasper Bleeker</a
					>
				</p>
			</div>

			<!-- Projektbeschreibung -->
			<div
				class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 transition-all duration-1000 delay-200"
				class:opacity-100={isVisible}
				class:opacity-0={!isVisible}
				class:translate-y-0={isVisible}
				class:translate-y-8={!isVisible}
			>
				<h2 class="text-2xl font-bold mb-4 text-primary">Das Projekt</h2>
				<p class="mb-4">
					AR Commerce ist eine moderne E-Commerce Plattform, die Augmented Reality (AR) Technologie
					nutzt, um Kunden ein immersives Shopping-Erlebnis zu bieten. Das Projekt entstand als Teil
					meiner Bachelor Thesis an der Fachhochschule Graubünden und demonstriert die Kombination
					aus modernen Webtechnologien und innovativer AR-Implementierung.
				</p>
				<div class="grid md:grid-cols-2 gap-4 mt-4">
					<div class="bg-secondary/10 rounded p-3">
						<h3 class="font-semibold text-secondary mb-2">Entwicklungszeit</h3>
						<p class="text-sm">4 Wochen intensive Entwicklung</p>
						<p class="text-sm text-secondary">
							Basierend auf bereits erstelltem UX-Testing Prototyp
						</p>
					</div>
					<div class="bg-secondary/10 rounded p-3">
						<h3 class="font-semibold text-secondary mb-2">Bachelor Thesis</h3>
						<p class="text-sm">Multi Media Producer (Media Engineering)</p>
						<p class="text-sm text-secondary">Fachhochschule Graubünden</p>
					</div>
				</div>
			</div>
			<!-- Persönlicher Beitrag -->
			<div class="grid md:grid-cols-2 gap-4 mt-4">
				<div
					class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 transition-all duration-1000 delay-300"
					class:opacity-100={isVisible}
					class:opacity-0={!isVisible}
					class:translate-y-0={isVisible}
					class:translate-y-8={!isVisible}
				>
					<h2 class="text-2xl font-bold mb-4 text-primary">Mein Beitrag</h2>
					<ul class="list-disc ml-5 text-sm space-y-2">
						<li>Konzeption, UX-Design & Usability-Testplanung</li>
						<li>3D-Modellierung in Blender (inkl. Optimierung für Web)</li>
						<li>Frontend-Entwicklung mit Svelte 5, AR-Integration mit Model Viewer</li>
						<li>Self-Hosting auf Unraid + Docker + MongoDB</li>
						<li>Datenerhebung und -auswertung mit Python (AttrakDiff™ Analyse)</li>
						<li>Deployment inkl. Reverse Proxy via Cloudflare Tunnel</li>
					</ul>
				</div>

				<!-- Wissenschaftlicher Hinweis -->
				<div
					class="bg-secondary/5 backdrop-blur-sm rounded-lg p-6 mb-8 transition-all duration-1000 delay-350"
					class:opacity-100={isVisible}
					class:opacity-0={!isVisible}
					class:translate-y-0={isVisible}
					class:translate-y-8={!isVisible}
				>
					<div class="text-center">
						<div class="text-3xl mb-3">🔬</div>
						<h3 class="text-lg font-semibold text-secondary mb-2">Wissenschaftlicher Hinweis</h3>
						<p class="text-sm text-brandblack">
							Diese Webanwendung ist Teil einer wissenschaftlichen Untersuchung zur User Experience
							im E-Commerce und wurde im Rahmen meiner Bachelor Thesis an der FH Graubünden
							entwickelt.
						</p>
					</div>
				</div>
			</div>

			<!-- Technologie-Stack -->
			<div
				class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 transition-all duration-1000 delay-400"
				class:opacity-100={isVisible}
				class:opacity-0={!isVisible}
				class:translate-y-0={isVisible}
				class:translate-y-8={!isVisible}
			>
				<h2 class="text-2xl font-bold mb-4 text-primary">Technologie-Stack</h2>

				<!-- Technologie-Listen -->
				<div class="grid md:grid-cols-2 gap-6 mb-6">
					<div>
						<h3 class="text-lg font-semibold mb-3 text-secondary">Frontend & AR</h3>
						<div class="space-y-2 text-sm">
							<div class="flex items-center gap-3">
								<div class="w-3 h-3 bg-green-400 rounded-full"></div>
								<span
									><strong>Svelte 5</strong> -
									<a
										href="https://svelte.dev/"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:underline">Moderne Frontend-Framework</a
									></span
								>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-3 h-3 bg-blue-400 rounded-full"></div>
								<span
									><strong>Model Viewer</strong> -
									<a
										href="https://modelviewer.dev/"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:underline">AR ohne Kopfschmerzen</a
									></span
								>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-3 h-3 bg-purple-400 rounded-full"></div>
								<span
									><strong>TypeScript</strong> -
									<a
										href="https://www.typescriptlang.org/"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:underline">Typsichere Entwicklung</a
									></span
								>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
								<span
									><strong>Tailwind CSS</strong> -
									<a
										href="https://tailwindcss.com/"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:underline">Utility-First CSS</a
									></span
								>
							</div>
						</div>
					</div>
					<div>
						<h3 class="text-lg font-semibold mb-3 text-secondary">Backend & Hosting</h3>
						<div class="space-y-2 text-sm">
							<div class="flex items-center gap-3">
								<div class="w-3 h-3 bg-red-400 rounded-full"></div>
								<span
									><strong>MongoDB</strong> -
									<a
										href="https://www.mongodb.com/"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:underline">NoSQL Datenbank</a
									></span
								>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-3 h-3 bg-orange-400 rounded-full"></div>
								<span
									><strong>Docker</strong> -
									<a
										href="https://www.docker.com/"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:underline">Containerisierung</a
									></span
								>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-3 h-3 bg-indigo-400 rounded-full"></div>
								<span
									><strong>Unraid Server</strong> -
									<a
										href="https://unraid.net/"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:underline">Self-Hosting</a
									></span
								>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-3 h-3 bg-pink-400 rounded-full"></div>
								<span
									><strong>Portainer</strong> -
									<a
										href="https://github.com/portainer/portainer"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:underline">Container Management</a
									></span
								>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-3 h-3 bg-green-400 rounded-full"></div>
								<span
									><strong>Cloudflare Tunnel</strong> -
									<a
										href="https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:underline">Reverse Proxy</a
									></span
								>
							</div>
						</div>
					</div>
				</div>

				<!-- Erklärungsblöcke in Grid -->
				<div class="grid md:grid-cols-2 gap-6">
					<div class="bg-secondary/5 rounded p-3">
						<h4 class="font-semibold text-secondary mb-2">Zur Entwicklung</h4>
						<p class="text-sm text-brandblack">
							Die Entwicklung erfolgte mit Svelte 5, das eine moderne und reaktive
							Benutzeroberfläche ermöglicht. Model Viewer wurde für die AR-Integration gewählt, da
							es die komplexe WebXR-Implementierung vereinfacht und eine nahtlose 3D-Erfahrung
							bietet. TypeScript sorgt für typsichere Entwicklung und bessere Code-Qualität, während
							Tailwind CSS ein schnelles und konsistentes Styling ermöglicht.
						</p>
					</div>
					<div class="bg-secondary/5 rounded p-3">
						<h4 class="font-semibold text-secondary mb-2">Zum Deployment</h4>
						<p class="text-sm text-brandblack">
							Das Projekt wird auf einem Unraid Server mit Docker-Containerisierung gehostet.
							Portainer vereinfacht das Container-Management, während Cloudflare Tunnel als Reverse
							Proxy fungiert und sicheren externen Zugriff ermöglicht. MongoDB läuft in einem
							separaten Container und stellt die Datenpersistenz sicher. Diese Architektur
							ermöglicht einfache Updates und skalierbare Bereitstellung.
						</p>
					</div>
				</div>
			</div>

			<!-- Herausforderungen & Lösungen -->
			<div
				class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 transition-all duration-1000 delay-600"
				class:opacity-100={isVisible}
				class:opacity-0={!isVisible}
				class:translate-y-0={isVisible}
				class:translate-y-8={!isVisible}
			>
				<h2 class="text-2xl font-bold mb-4 text-primary">Herausforderungen & Lösungen</h2>
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<h3 class="text-xl font-semibold mb-3 text-secondary">3D-Modelle & AR</h3>
						<ul class="space-y-2 text-sm">
							<li>• <strong>Challenge:</strong> Optimierung für Web-Kompatibilität (GLTF)</li>
							<li>• <strong>Problem:</strong> Transparenz-Texturen in Blender</li>
							<li>• <strong>Lösung:</strong> Transparenz Node in Blender löschen</li>
							<li>
								• <strong>Erkenntnis:</strong> unterschiedliche 3D-Formate = unterschiedliches Rendering
							</li>
						</ul>
					</div>
					<div>
						<h3 class="text-xl font-semibold mb-3 text-secondary">Self-Hosting Setup</h3>
						<ul class="space-y-2 text-sm">
							<li>• <strong>Challenge:</strong> Mehrere fehlgeschlagene Builds</li>
							<li>• <strong>Problem:</strong> Environment-Variablen Konfiguration</li>
							<li>• <strong>Lösung:</strong> Portainer + FTP für einfaches Deployment</li>
							<li>• <strong>Bonus:</strong> Zero-Downtime Updates möglich</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Persönliche Erfahrungen -->
			<div
				class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 transition-all duration-1000 delay-800"
				class:opacity-100={isVisible}
				class:opacity-0={!isVisible}
				class:translate-y-0={isVisible}
				class:translate-y-8={!isVisible}
			>
				<h2 class="text-2xl font-bold mb-4 text-primary">Persönliche Erfahrungen</h2>
				<div class="grid md:grid-cols-3 gap-4">
					<div class="text-center p-4 bg-white/5 rounded-lg">
						<div class="text-3xl mb-2">🎨</div>
						<h3 class="font-semibold mb-2">Svelte 5</h3>
						<p class="text-sm text-brandblack">
							Sehr interessant, erinnert stark an Nuxt. Framework-Abstraktion kann für Lernzwecke
							hinderlich sein, aber für Produktivität optimal.
						</p>
					</div>
					<div class="text-center p-4 bg-white/5 rounded-lg">
						<div class="text-3xl mb-2">👁️</div>
						<h3 class="font-semibold mb-2">AR-Entwicklung</h3>
						<p class="text-sm text-brandblack">
							Model Viewer macht AR zum Kinderspiel. Kreative Workarounds für Touch-Interaktionen
							auf Mobile erforderlich.
						</p>
					</div>
					<div class="text-center p-4 bg-white/5 rounded-lg">
						<div class="text-3xl mb-2">🏠</div>
						<h3 class="font-semibold mb-2">Self-Hosting</h3>
						<p class="text-sm text-brandblack">
							Tolle Möglichkeit, Internet-Hintergründe zu verstehen. Kostengünstig und erfüllend,
							eigene Projekte auf eigener Hardware zu hosten.
						</p>
					</div>
				</div>
			</div>

			<!-- Thesis-Erkenntnisse -->
			<div
				class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 transition-all duration-1000 delay-1000"
				class:opacity-100={isVisible}
				class:opacity-0={!isVisible}
				class:translate-y-0={isVisible}
				class:translate-y-8={!isVisible}
			>
				<h2 class="text-2xl font-bold mb-4 text-primary">Thesis-Erkenntnisse</h2>
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<h3 class="text-lg font-semibold mb-3 text-secondary">AR vs. Statische Bilder</h3>
						<div class="space-y-2 text-sm">
							<div class="bg-green-100 p-3 rounded">
								<strong>AR Vorteile:</strong> Verbessert hedonische UX-Qualitäten (Stimulation)
							</div>
							<div class="bg-blue-100 p-3 rounded">
								<strong>Statische Bilder:</strong> Bessere pragmatische Qualitäten, gewohnte Interaktion
							</div>
							<div class="bg-purple-100 p-3 rounded">
								<strong>Empfehlung:</strong> Kombination beider Visualisierungsarten
							</div>
						</div>
					</div>
					<div>
						<h3 class="text-lg font-semibold mb-3 text-secondary">Technische Innovationen</h3>
						<ul class="space-y-2 text-sm">
							<li>• <strong>Markdown CMS:</strong> Einfaches Dev-CMS für Produktdaten</li>
							<li>• <strong>Flexibilität:</strong> Sehr entwicklerfreundlich</li>
							<li>• <strong>Nachteil:</strong> Nicht nutzerfreundlich für Nicht-Entwickler</li>
							<li>• <strong>Performance:</strong> Top auf alter Hardware (4 Kerne, 8GB RAM)</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Zukunftspläne -->
			<div
				class="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-all duration-1000 delay-1200"
				class:opacity-100={isVisible}
				class:opacity-0={!isVisible}
				class:translate-y-0={isVisible}
				class:translate-y-8={!isVisible}
			>
				<h2 class="text-2xl font-bold mb-4 text-primary">Zukunftspläne</h2>
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<h3 class="text-lg font-semibold mb-3 text-secondary">Geplante Features</h3>
						<ul class="space-y-2 text-sm">
							<li>• <strong>Virtual Try-On:</strong> Für Mode (anspruchsvoll aber spannend)</li>
							<li>• <strong>Admin-Panel:</strong> Nutzer-Authentifikation für eigene Produkte</li>
							<li>• <strong>PWA:</strong> Progressive Web App</li>
							<li>• <strong>Payment:</strong> Mit Wirtschaftspartnern</li>
						</ul>
					</div>
					<div>
						<h3 class="text-lg font-semibold mb-3 text-secondary">Technologie-Interessen</h3>
						<ul class="space-y-2 text-sm">
							<li>• <strong>Machine Vision:</strong> Pose-Erkennung für Virtual Try-On</li>
							<li>• <strong>Home Lab:</strong> High Availability, Kubernetes</li>
							<li>• <strong>Load Balancing:</strong> Erweiterte Self-Hosting Experimente</li>
							<li>• <strong>Portfolio:</strong> Wird definitiv auf Portfolio erscheinen</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Link zu Github Repository -->
			<div class="text-center flex flex-col gap-4 mt-12 pt-8 border-t border-gray-200 transition-all duration-1000 delay-1400">
				<p class="text-sm text-brandblack">
					Mehr Informationen zum Projekt sind in den Github Repositories zu finden.
				</p>
				<a href="https://github.com/JasperBleeker/Lehrprojekt" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
					Zum Projekt Github Repository
				</a>
				<a href="https://github.com/JasperBleeker/UX-Test-Platform" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
					Zum Thesis Github Repository
				</a>
			</div>

			<!-- Footer -->
			<div
				class="text-center mt-12 pt-8 border-t border-gray-200 transition-all duration-1000 delay-1400"
				class:opacity-100={isVisible}
				class:opacity-0={!isVisible}
				class:translate-y-0={isVisible}
				class:translate-y-8={!isVisible}
			>
				<p class="text-brandblack mb-4">
					Dieses Projekt demonstriert die Möglichkeiten moderner Webtechnologien, Self-Hosting und
					AR-Integration. Ein Beweis dafür, dass mit der richtigen Technologie auch komplexe
					Projekte in kurzer Zeit realisierbar sind.
				</p>
				<a
					href="/"
					class="inline-block bg-primary hover:bg-primary/80 text-brandwhite transition-colors px-6 py-3 rounded-lg font-semibold"
				>
					Zurück zur Startseite
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	/* Custom scrollbar for better UX */
	:global(::-webkit-scrollbar) {
		width: 8px;
	}

	:global(::-webkit-scrollbar-track) {
		background: rgba(0, 0, 0, 0.1);
	}

	:global(::-webkit-scrollbar-thumb) {
		background: rgba(0, 0, 0, 0.3);
		border-radius: 4px;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: rgba(0, 0, 0, 0.5);
	}
</style>
