import json
import os

FILE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "todos.json")

def load_todos():
    if os.path.exists(FILE_PATH):
        with open(FILE_PATH, "r") as file:
            return json.load(file)
    return []

def save_todos(todos):
    with open(FILE_PATH, "w") as file:
        json.dump(todos, file)
