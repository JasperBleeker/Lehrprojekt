# AR-Commerce

AR-Commerce ist eine Webanwendung, die im Rahmen meines Bachelorprojekts entstanden ist. Ziel ist es, Produkte mittels Augmented Reality (AR) direkt in der realen Umgebung zu visualisieren und zu testen. Die Anwendung wurde im Kontext meiner Bachelor-Thesis entwickelt, um die Potenziale und Herausforderungen von AR im E-Commerce zu untersuchen.

## Features

- **Produktvisualisierung in AR:** Nutzer:innen können verschiedene Produkte (z.B. Möbel, Pflanzen, Uhren, Küchengeräte) als 3D-Modelle in ihrer Umgebung platzieren.
- **Plattformübergreifend:** Unterstützung für Android (Scene Viewer) und iOS (Quick Look) via [model-viewer](https://modelviewer.dev/).
- **Produktkatalog:** Übersichtliche Darstellung aller verfügbaren Produkte mit Bild, Kategorie und Beschreibung.
- **Interaktionsstatistiken:** Anzeige von Nutzungsdaten wie durchschnittliche AR-Verweildauer, Session-Anzahl und Browserverteilung.
- **Docker- und Node.js-Support:** Einfache lokale Entwicklung und Deployment.

## Technologien

- [SvelteKit](https://kit.svelte.dev/) (Frontend & Backend)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [MongoDB](https://www.mongodb.com/) (Analytics-Datenbank)
- [model-viewer](https://modelviewer.dev/) (3D/AR-Rendering)
- Docker (Containerisierung)

## Installation & Setup

### Voraussetzungen
- Node.js (>= 20)
- npm
- MongoDB-Datenbank (z.B. lokal oder als Cloud-Service)
- Optional: Docker

### Lokale Entwicklung
1. Repository klonen:
   ```bash
   git clone <repo-url>
   cd AR-Commerce
   ```
2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
3. Umgebungsvariable setzen:
   - Erstelle eine Datei `.env` im Projektverzeichnis mit folgendem Inhalt:
     ```env
     MONGODB_URI=<deine-mongodb-verbindungszeichenfolge>
     ```
4. Entwicklung starten:
   ```bash
   npm run dev
   ```
   Die App ist dann unter [http://localhost:5173](http://localhost:5173) erreichbar.

### Mit Docker
1. Baue und starte den Container:
   ```bash
   docker build -t ar-commerce .
   docker run -e MONGODB_URI=<deine-mongodb-verbindungszeichenfolge> -p 3000:3000 ar-commerce
   ```
2. Die Anwendung läuft dann unter [http://localhost:3000](http://localhost:3000).

## Nutzung
- Im Katalog ein Produkt auswählen.
- Auf der Produktseite das 3D-Modell in AR starten (AR-Button).
- Interaktionsstatistiken können auf der Produktseite angezeigt werden.

## Verzeichnisstruktur (Auszug)

```
AR-Commerce/
├── src/
│   ├── app.css                # Zentrales Styling (Tailwind)
│   ├── app.html               # HTML-Template
│   ├── lib/
│   │   ├── components/        # Svelte-Komponenten (UI)
│   │   └── server/            # Serverseitige Hilfsfunktionen (z.B. MongoDB)
│   ├── products/              # Produktdaten als Markdown
│   └── routes/                # SvelteKit-Routen (Pages & API)
├── static/                    # Statische Assets (3D-Modelle, Bilder)
├── Dockerfile                 # Docker-Konfiguration
├── package.json               # Projekt- und Abhängigkeitsverwaltung
└── README.md                  # Projektdokumentation
```

## Mitwirken

Aktuell ist das Projekt nicht für externe Beiträge geöffnet.

## Lizenz

© Jasper Bleeker, 2025. Alle Rechte vorbehalten.

## Roadmap

Denkbare Erweiterungen für die Zukunft:

- **Nutzerauthentifikation:**  
  Ermöglichen, dass sich Nutzer:innen registrieren und anmelden können.
- **Upload eigener 3D-Modelle:**  
  Authentifizierte Nutzer:innen können eigene 3D-Modelle hochladen und in AR testen.
- **Microservice-Architektur:**  
  Umstellung auf eine Microservice-Architektur, um einzelne Funktionen (z.B. Modell-Upload, AR-Rendering, Analytics) unabhängig skalieren und bereitstellen zu können.
- **Erweiterte Analytics:**  
  Detailliertere Auswertungen zu Nutzerinteraktionen und Modell-Performance.
- **Admin-Panel:**  
  Verwaltung von Produkten, Nutzern und Statistiken über ein eigenes Dashboard.
- **Mehrsprachigkeit:**  
  Unterstützung für weitere Sprachen (z.B. Englisch).
