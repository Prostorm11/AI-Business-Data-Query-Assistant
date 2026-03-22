# AI Business Data Query Assistant

An end-to-end AI application that lets users query business data in natural language, generate SQL automatically, and explore project knowledge through a lightweight RAG pipeline.

## Overview

This project combines a modern frontend, a Python backend, a local LLM workflow with Ollama, and a retrieval layer for documentation-based answers.

It supports two core experiences:

1. **Natural language to SQL**  
   Users ask business questions in plain English, the backend generates SQL, runs it on the database, and returns structured results.

2. **RAG-based document answering**  
   Users can ask questions about project or business documentation, and the system retrieves relevant chunks before generating a grounded answer.

## Why this project matters

This project demonstrates how to build a practical AI system that goes beyond a chatbot.

It shows how to combine:

- frontend product thinking
- backend API engineering
- LLM orchestration
- retrieval-augmented generation
- database querying
- Docker-based reproducibility

It is designed as both a portfolio-quality project and a foundation for a more production-ready analytics assistant.

## Architecture

### Frontend

The frontend provides the user interface for:

- asking natural-language business questions
- viewing generated SQL and query results
- interacting with RAG-powered answers
- managing the overall app experience

Typical stack:

- React
- Vite
- TypeScript

### Backend

The backend handles the application logic, including:

- request validation
- LLM prompt construction
- SQL generation
- database execution
- RAG retrieval
- API responses to the frontend

Typical stack:

- FastAPI
- SQLAlchemy
- Python services for LLM and RAG workflows

### Database

The application uses a lightweight SQLite database for business data.

This keeps setup simple while still demonstrating full natural-language-to-database workflows.

### LLM Layer

The project uses **Ollama** locally to run a model such as:

- `qwen2.5:1.5b`

The backend sends prompts to Ollama for:

- SQL generation
- RAG answer generation

### RAG Layer

The retrieval system supports document-aware answers by:

- ingesting text from project documents
- chunking text into manageable pieces
- storing embeddings in ChromaDB
- retrieving relevant chunks for a user query
- building a grounded prompt from retrieved context

## Core Features

### 1. Natural Language to SQL

Users can ask questions like:

- "Which country generated the most sales?"
- "What is the total revenue by category?"
- "Which customers made the highest purchases this quarter?"

The backend:

- builds a structured prompt
- sends it to Ollama
- receives generated SQL
- executes the SQL safely
- returns the SQL and results

### 2. Retrieval-Augmented Generation

Users can ask questions about the project or documentation, and the RAG pipeline:

- retrieves relevant text chunks
- builds a grounded context window
- generates a contextual answer with Ollama

### 3. Dockerized Development Workflow

The project is containerized for a cleaner, more reproducible setup.

Services are separated into:

- frontend container
- backend container
- local Ollama running on the host machine

This keeps development simple while reflecting a realistic multi-service architecture.

## Project Structure

```text
AI Business Data Query Assistant/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── services/
│   │   ├── rag/
│   │   └── ...
│   ├── db/
│   │   └── business.db
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .dockerignore
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── .dockerignore
│
└── docker-compose.yml
```

## How the system works

### SQL flow

1. User submits a business question from the frontend.
2. Frontend sends the question to the backend API.
3. Backend builds an LLM prompt.
4. Backend sends the prompt to Ollama.
5. Ollama returns SQL.
6. Backend cleans the SQL and runs it on SQLite.
7. Backend returns the generated SQL and result set.
8. Frontend displays the response.

### RAG flow

1. User submits a documentation-related question.
2. Backend retrieves relevant chunks from the vector store.
3. Backend builds a context-aware prompt.
4. Backend sends the prompt to Ollama.
5. Ollama returns a grounded answer.
6. Backend returns the answer and sources.
7. Frontend displays the response.

## Local Development Setup

### Prerequisites

Before starting, make sure you have:

- **Node.js** installed
- **Python 3.11+** installed
- **Docker Desktop** installed
- **Ollama** installed and running locally

You also need the model used by the backend, for example:

```bash
ollama pull qwen2.5:1.5b
```

## Running the project with Docker

This is the recommended way to run the project.

### 1. Start Ollama on your machine

Make sure Ollama is running on the host machine.

```bash
ollama serve
```

In another terminal, verify the model exists:

```bash
ollama list
```

### 2. Build and start the containers

From the project root:

```bash
docker compose up --build
```

### 3. Open the app

Once the services are up:

- Frontend: `http://localhost:5173`
- Backend docs: `http://localhost:8000/docs`

## Running without Docker

### Backend

Go into the backend directory and create a virtual environment.

```bash
cd backend
python -m venv venv
```

Activate it.

#### Windows

```bash
venv\Scripts\activate
```

#### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

The backend should now be available at:

```text
http://localhost:8000
```

### Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend should now be available at:

```text
http://localhost:5173
```

## Environment and configuration

### Backend Ollama configuration

The backend uses an environment variable for the Ollama base URL.

Example logic in Python:

```python
import os

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_URL = f"{OLLAMA_BASE_URL}/api/generate"
```

When running with Docker, the compose file points the backend container to the Ollama instance running on the host:

```yaml
environment:
  - OLLAMA_BASE_URL=http://host.docker.internal:11434
```

### Frontend API configuration

The frontend reads the backend base URL using Vite environment variables:

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
```

## Important implementation notes

### NLTK tokenizer setup

The backend uses NLTK tokenization for chunking. To make first-time setup smoother, the code can include a safe fallback:

```python
try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt", quiet=True)
```

This helps contributors who run the backend outside Docker for the first time.

### CPU-only PyTorch

The project uses a CPU-friendly ML stack to keep builds lighter and simpler.

This is especially useful for:

- local machines without GPU support
- Docker Desktop workflows
- portable development environments

## Example use cases

### Business analytics

- revenue by product category
- country-level sales performance
- customer purchasing behavior
- top-performing products

### Documentation support

- understanding project architecture
- explaining backend services
- answering questions about documentation content
- onboarding a new developer to the system

## Troubleshooting

### Docker Desktop is not running

If Docker commands fail with engine or pipe errors, make sure Docker Desktop is open and fully started.

Useful checks:

```bash
docker version
docker info
```

### Ollama connection fails

Make sure Ollama is running:

```bash
ollama serve
```

Also verify the backend is using the correct base URL.

### NLTK punkt error

If you see a tokenizer lookup error, either:

- let the fallback download it automatically
- or run:

```bash
python -m nltk.downloader punkt
```

### Dependency compatibility issues

If ML-related libraries fail during install or import:

- rebuild the Docker images
- verify CPU-only PyTorch is being used
- verify NumPy is pinned to a compatible version if needed

### Frontend cannot reach backend

Check:

- backend container is running
- backend is exposed on port `8000`
- frontend is using the correct API base URL

## Future improvements

Potential next steps for the project include:

- saved prompts and recent query history
- persistent user context across tabs
- authentication and multi-user support
- stronger SQL validation and safety checks
- deployment to cloud infrastructure
- separating the RAG pipeline into its own service
- observability and request tracing

## Resume-ready highlights

This project demonstrates experience with:

- AI application engineering
- LLM orchestration with local models
- retrieval-augmented generation
- FastAPI backend development
- React frontend integration
- SQLite and SQL execution workflows
- Docker-based multi-service development
- prompt design for structured outputs

## Author

**Derrick Marfo**

AI-focused software engineer building practical systems across backend engineering, data workflows, and applied AI.

## Quick Start

If you only want the fastest way to run the app:

```bash
# 1. Start Ollama
ollama serve

# 2. From the project root
Docker compose up --build
```

Then open:

- `http://localhost:5173`
- `http://localhost:8000/docs`

## Final Note

This project is a practical example of how traditional software engineering and applied AI can work together in one system.

It does not just generate text. It retrieves context, produces executable SQL, interacts with real data, and exposes everything through a usable product interface.

