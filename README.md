# 📋 Todo App

Eine moderne, vollständige Todo-Anwendung mit **Neobrutalist Design**, gebaut mit Angular 19 und FastAPI.

![Neobrutalist Design](https://img.shields.io/badge/Design-Neobrutalist-yellow?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-19-red?style=for-the-badge&logo=angular)
![FastAPI](https://img.shields.io/badge/FastAPI-0.124-green?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.12+-blue?style=for-the-badge&logo=python)

---

## ✨ Features

- 🔐 **Benutzer-Authentifizierung** - Registrierung & Login mit JWT-Tokens
- ✅ **Todo-Verwaltung** - Erstellen, Bearbeiten, Löschen und Abhaken von Todos
- 👤 **Benutzerspezifische Todos** - Jeder Benutzer sieht nur seine eigenen Todos
- 🎨 **Neobrutalist Design** - Modernes, auffälliges UI mit kräftigen Farben und harten Schatten
- 📱 **Responsive** - Funktioniert auf Desktop und Mobile
- ⚡ **Server-Side Rendering** - Angular SSR für schnelle Ladezeiten

---

## 🛠️ Tech Stack

### Backend

| Technologie     | Version | Beschreibung                  |
| --------------- | ------- | ----------------------------- |
| **FastAPI**     | 0.124   | Modernes Python Web-Framework |
| **SQLite**      | -       | Leichtgewichtige Datenbank    |
| **Uvicorn**     | 0.38    | ASGI Server                   |
| **Python-Jose** | 3.5     | JWT Token Handling            |
| **Bcrypt**      | 5.0     | Passwort-Hashing              |
| **Pydantic**    | 2.12    | Datenvalidierung              |

### Frontend

| Technologie     | Version | Beschreibung           |
| --------------- | ------- | ---------------------- |
| **Angular**     | 19.2    | Frontend Framework     |
| **TypeScript**  | 5.7     | Typisiertes JavaScript |
| **RxJS**        | 7.8     | Reactive Extensions    |
| **SCSS**        | -       | CSS Präprozessor       |
| **Angular SSR** | 19.2    | Server-Side Rendering  |

---

## 📁 Projektstruktur

```
todo-api/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI App Entry Point
│   │   ├── routes.py        # API Endpoints
│   │   ├── models.py        # Pydantic Models
│   │   ├── database.py      # SQLite Verbindung
│   │   ├── auth.py          # JWT Authentication
│   │   └── storage.py       # Hilfsfunktionen
│   ├── requirements.txt     # Python Dependencies
│   └── todos.db             # SQLite Datenbank
│
├── frontend/
│   └── todo-frontend/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   │   ├── login/        # Login/Register Komponente
│       │   │   │   └── todo-list/    # Todo-Liste Komponente
│       │   │   ├── services/
│       │   │   │   ├── api.service.ts    # HTTP Requests
│       │   │   │   └── auth.service.ts   # Auth State Management
│       │   │   └── models/           # TypeScript Interfaces
│       │   └── styles.scss           # Globale Styles
│       ├── package.json
│       └── angular.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### Voraussetzungen

- **Python** 3.12 oder höher
- **Node.js** 18 oder höher
- **npm** 9 oder höher

### 1. Repository klonen

```bash
git clone <repository-url>
cd todo-api
```

### 2. Backend einrichten

```bash
# Virtual Environment erstellen
python -m venv .venv

# Virtual Environment aktivieren
# macOS/Linux:
source .venv/bin/activate
# Windows:
.venv\Scripts\activate

# Dependencies installieren
pip install -r backend/requirements.txt
```

### 3. Frontend einrichten

```bash
cd frontend/todo-frontend

# Dependencies installieren
npm install
```

---

## ▶️ Anwendung starten

### Backend starten

```bash
# Im Hauptverzeichnis (todo-api/)
cd backend
uvicorn app.main:app --reload --port 8000
```

Das Backend läuft nun unter: **http://localhost:8000**

### Frontend starten

```bash
# In einem neuen Terminal
cd frontend/todo-frontend
npm start
```

Das Frontend läuft nun unter: **http://localhost:4200**

---

## 🔌 API Endpoints

### Authentifizierung

| Methode | Endpoint                        | Beschreibung                       |
| ------- | ------------------------------- | ---------------------------------- |
| `POST`  | `/register?username=&password=` | Neuen Benutzer registrieren        |
| `POST`  | `/login?username=&password=`    | Benutzer anmelden, gibt JWT zurück |

### Todos (erfordert Authentifizierung)

| Methode  | Endpoint      | Beschreibung                     |
| -------- | ------------- | -------------------------------- |
| `GET`    | `/todos`      | Alle Todos des Benutzers abrufen |
| `GET`    | `/todos/{id}` | Einzelnes Todo abrufen           |
| `POST`   | `/todos`      | Neues Todo erstellen             |
| `PATCH`  | `/todos/{id}` | Todo aktualisieren (done Status) |
| `DELETE` | `/todos/{id}` | Todo löschen                     |

### Beispiel-Requests

```bash
# Registrieren
curl -X POST "http://localhost:8000/register?username=testuser&password=test123"

# Login
curl -X POST "http://localhost:8000/login?username=testuser&password=test123"

# Todos abrufen (mit Token)
curl -H "Authorization: Bearer <token>" http://localhost:8000/todos

# Todo erstellen
curl -X POST -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"title": "Einkaufen gehen"}' \
     http://localhost:8000/todos
```

---

## 🎨 Design: Neobrutalism

Das UI verwendet den **Neobrutalist Design-Stil**, charakterisiert durch:

- **Kräftige Farben** - Gelb, Pink, Türkis, Lila
- **Dicke schwarze Borders** (3px)
- **Harte Schatten** ohne Blur
- **Keine abgerundeten Ecken** - Alles blockartig
- **Interaktive Hover-Effekte** - Elemente "schweben" nach oben
- **Schrift**: Space Grotesk

### Farbpalette

| Farbe    | Hex       | Verwendung         |
| -------- | --------- | ------------------ |
| 🟡 Gelb  | `#ffde59` | Header, Highlights |
| 🩷 Pink   | `#ff6b9d` | Login Hintergrund  |
| 🩵 Türkis | `#4ecdc4` | Buttons            |
| 🟣 Lila  | `#a855f7` | Sekundäre Aktionen |
| 🟢 Grün  | `#6bff6b` | Erfolgszustände    |
| 🔴 Rot   | `#ff4757` | Löschen, Fehler    |
| 🟫 Creme | `#fffef0` | Hintergrund        |

---

## 📄 Lizenz

Dieses Projekt ist für Lernzwecke erstellt.

---

## 🤝 Mitwirken

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

---

<div align="center">

**Built with ❤️ using Angular & FastAPI**

</div>
