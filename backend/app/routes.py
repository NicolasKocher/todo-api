from fastapi import APIRouter, Depends
from .models import TodoCreate, TodoUpdate
from .storage import load_todos, save_todos
from .database import get_connection
from .auth import create_access_token, get_current_user, hash_password, verify_password

router = APIRouter()

@router.get("/todos")
def get_todos(user_id: str = Depends(get_current_user)):
  conn = get_connection()
  cursor = conn.cursor()

  cursor.execute("SELECT id, title, done FROM todos WHERE user_id = ?", (user_id,))
  rows = cursor.fetchall()

  conn.close()

  todos = []
  for row in rows: 
     todos.append({
        "id": row[0],
        "title": row[1],
        "done": bool(row[2])
     })
  
  return todos

@router.get("/todos/{id}")
def get_todo(id: int, user_id: str = Depends(get_current_user)):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id, title, done FROM todos WHERE id = ? AND user_id = ?",
        (id, user_id)
    )
    row = cursor.fetchone()
    conn.close()

    if not row:
        return {"error": "Todo nicht gefunden"}

    return {
        "id": row[0],
        "title": row[1],
        "done": bool(row[2])
    }


@router.post("/todos")
def create_todo(todo: TodoCreate, user_id: str = Depends(get_current_user)):
  conn = get_connection()
  cursor = conn.cursor()

  cursor.execute(
     "INSERT INTO todos (title, done, user_id) VALUES (?, ?, ?)",
     (todo.title, 0, user_id)
  )

  conn.commit()

  new_id = cursor.lastrowid
  conn.close()

  return {
     "id": new_id,
     "title": todo.title,
     "done": False
  }

@router.patch("/todos/{id}")
def update_todo(id: int, update: TodoUpdate, user_id: str = Depends(get_current_user)):
  conn = get_connection()
  cursor = conn.cursor()

  cursor.execute(
     "UPDATE todos SET done = ? WHERE id = ? AND user_id = ?",
     (1 if update.done else 0, id, user_id)
  )

  conn.commit()

  if cursor.rowcount == 0: 
     conn.close()
     return {"error": "Todo nicht gefunden"}
  
  cursor.execute(
     "SELECT id, title, done FROM todos WHERE id = ? AND user_id = ?",
     (id, user_id)
  )
  row = cursor.fetchone()
  conn.close()

  return {
     "id": row[0],
     "title": row[1],
     "done": bool(row[2])
  }

@router.delete("/todos/{id}")
def delete_todo(id: int, user_id: str = Depends(get_current_user)):
  conn = get_connection()
  cursor = conn.cursor()

  cursor.execute(
     "DELETE FROM todos WHERE id = ? AND user_id = ?",
     (id, user_id)
  )

  conn.commit()

  if cursor.rowcount == 0:
     conn.close()
     return {"error": "Todo nicht gefunden"}
  
  conn.close()
  return {"ok": True}


# Register
@router.post("/register")
def register(username: str, password: str):
   conn = get_connection()
   cursor = conn.cursor()

   password_hash = hash_password(password)

   cursor.execute(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      (username, password_hash)
   )

   conn.commit()
   conn.close()

   return {"ok": True}

# Login
@router.post("/login")
def login(username: str, password: str):
   conn = get_connection()
   cursor = conn.cursor()

   cursor.execute(
      "SELECT id, password_hash FROM users WHERE username = ?",
      (username,)
   )
   row = cursor.fetchone()
   conn.close()

   if not row:
      return {"error": "User nicht gefunden"}
   
   user_id, password_hash = row

   if not verify_password(password, password_hash):
      return {"error": "Falsches Passwort oder Benutzername"}
   
   token = create_access_token({"sub": str(user_id)})
   return {"access_token": token}