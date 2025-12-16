# 🎨 Todo Frontend

Angular 19 Frontend für die Todo-App mit **Neobrutalist Design**.

## Tech Stack

- **Angular** 19.2 mit Standalone Components
- **TypeScript** 5.7
- **SCSS** für Styling
- **RxJS** für reaktive Programmierung
- **Angular SSR** für Server-Side Rendering

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm start
# oder
ng serve
```

App läuft unter: **http://localhost:4200**

## Build

```bash
npm run build
```

## Projektstruktur

```
src/app/
├── components/
│   ├── login/           # Login & Registrierung
│   └── todo-list/       # Todo-Verwaltung
├── services/
│   ├── api.service.ts   # HTTP-Kommunikation mit Backend
│   └── auth.service.ts  # Authentication State
└── models/              # TypeScript Interfaces
```

## Design

Das UI verwendet den **Neobrutalist-Stil**:

- Kräftige Farben (Gelb, Pink, Türkis)
- Dicke schwarze Borders
- Harte Schatten ohne Blur
- Space Grotesk Schriftart
