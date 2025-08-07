<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Impressum - AR-Commerce</title>
	<meta name="description" content="Impressum und rechtliche Informationen von AR-Commerce" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="max-w-4xl mx-auto px-4 py-12">
		<div class="bg-white rounded-lg shadow-lg p-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>
			
			<div class="space-y-8">
				<!-- Angaben gemäss Schweizer Recht -->
				<section>
					<h2 class="text-2xl font-semibold text-gray-800 mb-4">Angaben gemäss Schweizer Recht</h2>
					<div class="space-y-2 text-gray-700">
						<p><strong>Jasper Bleeker</strong></p>
						<p>Clavadelerstrasse 20</p>
						<p>7272 Davos Clavadel</p>
						<p>Schweiz</p>
					</div>
				</section>

				<!-- Studium -->
				<section>
					<h2 class="text-2xl font-semibold text-gray-800 mb-4">Studium</h2>
					<div class="space-y-2 text-gray-700">
						<p><strong>Hochschule:</strong> Fachhochschule Graubünden</p>
						<p><strong>Studiengang:</strong> Multi Media Production mit Major in Media Applications</p>
						<p><strong>Semester:</strong> 6. Semester (Bachelor-Semester)</p>
					</div>
				</section>

				<!-- Betreuer -->
				<section>
					<h2 class="text-2xl font-semibold text-gray-800 mb-4">Betreuer</h2>
					<div class="space-y-2 text-gray-700">
						<p><strong>Alen Doko</strong></p>
						<p><strong>Nick Schneeberger</strong></p>
						<p>Fachhochschule Graubünden</p>
					</div>
				</section>

				<!-- Kontakt -->
				<section>
					<h2 class="text-2xl font-semibold text-gray-800 mb-4">Kontakt</h2>
					<div class="space-y-2 text-gray-700">
						<p><strong>E-Mail:</strong> jasper.bleeker@stud.fhgr.ch</p>
						<p><strong>Website:</strong> AR-Commerce Demonstrationsprojekt</p>
					</div>
				</section>

				<!-- Projekt -->
				<section>
					<h2 class="text-2xl font-semibold text-gray-800 mb-4">Projekt</h2>
					<div class="space-y-2 text-gray-700">
						<p><strong>Projekttyp:</strong> Bachelor-Thesis Demonstrationsprojekt</p>
						<p><strong>Zweck:</strong> Untersuchung der Potenziale und Herausforderungen von AR im E-Commerce</p>
						<p><strong>Status:</strong> Forschungsprojekt, nicht kommerziell</p>
					</div>
				</section>

				<!-- Redaktionell verantwortlich -->
				<section>
					<h2 class="text-2xl font-semibold text-gray-800 mb-4">Redaktionell verantwortlich</h2>
					<div class="space-y-2 text-gray-700">
						<p>Jasper Bleeker</p>
						<p>Clavadelerstrasse 20</p>
						<p>7272 Davos Clavadel</p>
						<p>Schweiz</p>
					</div>
				</section>

				<!-- Schweizer Recht -->
				<section>
					<h2 class="text-2xl font-semibold text-gray-800 mb-4">Rechtliche Grundlagen</h2>
					<div class="space-y-2 text-gray-700">
						<p>Diese Website unterliegt dem Schweizer Recht. Für Streitigkeiten ist das Gericht am Wohnsitz des Betreibers zuständig.</p>
						<p>Als Studentenprojekt ist diese Website nicht gewerblich tätig und unterliegt daher nicht den strengen Anforderungen des Schweizer Datenschutzgesetzes (DSG) für kommerzielle Websites.</p>
					</div>
				</section>

				<!-- Haftung für Inhalte -->
				<section>
					<h2 class="text-2xl font-semibold text-gray-800 mb-4">Haftung für Inhalte</h2>
					<div class="space-y-2 text-gray-700">
						<p>Als Betreiber dieser Website sind wir für eigene Inhalte nach dem Schweizer Recht verantwortlich. 
						Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen 
						oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
						<p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
						Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
						der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
						Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
					</div>
				</section>

				<!-- Haftung für Links -->
				<section>
					<h2 class="text-2xl font-semibold text-gray-800 mb-4">Haftung für Links</h2>
					<div class="space-y-2 text-gray-700">
						<p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss 
						haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte 
						der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. 
						Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. 
						Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
						<p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte 
						einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige 
						Links umgehend entfernen.</p>
					</div>
				</section>

				<!-- Urheberrecht -->
				<section>
					<h2 class="text-2xl font-semibold text-gray-800 mb-4">Urheberrecht</h2>
					<div class="space-y-2 text-gray-700">
						<p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
						Schweizer Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung 
						ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors 
						bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen 
						Gebrauch gestattet.</p>
						<p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
						Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem 
						auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. 
						Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
					</div>
				</section>
			</div>
		</div>
	</div>
</div> 