import ollama
import anywidget
import subprocess
from fastapi import FastAPI

MODEL = "llama3.2:1b"
MAX_TOKENS = 200
question =input("What It question can I help with (enter q to quit)")
running = True

def chat(history: list, user_message: str, stream: bool = True) -> list:
    """Send a message and return updated history."""
    history.append({"role": "user", "content": user_message})

    if stream:
        reply = ""
        for chunk in ollama.chat(model=MODEL, messages=history, stream=True):
            token = chunk['message']['content']
            reply += token
            print(token, end="", flush=True)
        print()
    else:
        response = ollama.chat(model=MODEL, messages=history)
        reply = response['message']['content']
        print(reply)
    history.append({"role": "assistant", "content": reply})
    return history


# Give the model a role relevant to your project domain
SYSTEM = """
You are a IT pro
if someone ask a question give them at least three different solutions and tips
"""

history = [{"role": "system", "content": SYSTEM}]
while running == True:
    if question.lower() == 'q':
        running = False
        try:
            subprocess.run(
            ["ollama", "stop", MODEL],
            check=True,
            capture_output=True,
            text=True,
            )
            print(f"Stopped model: {MODEL}")
        except subprocess.CalledProcessError as e:
            print(f"Error stopping model: {e.stderr}")
        break
    history = chat(history, question)
    question = input("anything else I can help with: ")



