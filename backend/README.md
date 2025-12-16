# ⚡ Todo Backend

FastAPI Backend für die Todo-App mit JWT-Authentifizierung.

## Tech Stack

- **FastAPI** 0.124
- **SQLite** als Datenbank
- **Uvicorn** ASGI Server
- **Pydantic** für Validierung
- **Python-Jose** für JWT
- **Bcrypt** für Passwort-Hashing

## Installation

```bash
# Virtual Environment erstellen
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Dependencies installieren
pip install -r requirements.txt
```

## Starten

```bash
uvicorn app.main:app --reload --port 8000
```

API läuft unter: **http://localhost:8000**

## API Endpoints

### Auth

| Methode | Endpoint    | Beschreibung             |
| ------- | ----------- | ------------------------ |
| POST    | `/register` | Benutzer registrieren    |
| POST    | `/login`    | Login, gibt JWT zurück   |

### Todos (Auth erforderlich)

| Methode | Endpoint      | Beschreibung         |
| ------- | ------------- | -------------------- |
| GET     | `/todos`      | Alle Todos abrufen   |
| GET     | `/todos/{id}` | Einzelnes Todo       |
| POST    | `/todos`      | Todo erstellen       |
| PATCH   | `/todos/{id}` | Todo aktualisieren   |
| DELETE  | `/todos/{id}` | Todo löschen         |

## Projektstruktur

```
app/
├── main.py       # FastAPI App & CORS
├── routes.py     # API Endpoints
├── models.py     # Pydantic Models
├── database.py   # SQLite Verbindung
└── auth.py       # JWT & Passwort-Handling
```
