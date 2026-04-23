import ollama
import subprocess
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

MODEL = "llama3.2:1b"

# System prompt
SYSTEM = """
You are a IT pro
if someone ask a question give them at least three different solutions and tips
"""

# Store history (simple global version)
history = [{"role": "system", "content": SYSTEM}]


# Request format
class ChatRequest(BaseModel):
    prompt: str
    stream: bool = False

# <<<<<<< HEAD
# def chat(user_message: str, stream: bool = False):
#     print("Hello")
#     messages = [
#         {"role": "user", "content": user_message}
#     ]

#     if stream:
#         reply = ""
#         for chunk in ollama.chat(model=MODEL, messages=messages, stream=True):
#             token = chunk['message']['content']
#             reply += token
#     else:
#         response = ollama.chat(model=MODEL, messages=messages)
#         reply = response['message']['content']

#     return reply


# >>>>>>> 7bcb3d1aa04c617e85669632b04c457117262037
def chat(history: list, user_message: str, stream: bool = False) -> tuple:
    history.append({"role": "user", "content": user_message})

    if stream:
        reply = ""
        for chunk in ollama.chat(model=MODEL, messages=history, stream=True):
            token = chunk['message']['content']
            reply += token
    else:
        response = ollama.chat(model=MODEL, messages=history)
        reply = response['message']['content']

    history.append({"role": "assistant", "content": reply})
    return history, reply


@app.get("/")
def home():
    return {"status": "API is running"}


@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    global history
    history, reply = chat(history, req.prompt, req.stream)
    return {"response": reply}


@app.post("/reset")
def reset():
    global history
    history = [{"role": "system", "content": SYSTEM}]
    return {"status": "conversation reset"}


@app.post("/stop")
def stop_model():
    try:
        subprocess.run(
            ["ollama", "stop", MODEL],
            check=True,
            capture_output=True,
            text=True,
        )
        return {"status": f"Stopped model: {MODEL}"}
    except subprocess.CalledProcessError as e:
        return {"error": e.stderr}
# <<<<<<< HEAD
#     #uvicorn api:app --reload --port 8000
# =======


# >>>>>>> 7bcb3d1aa04c617e85669632b04c457117262037
