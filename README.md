# Ollama Gateway

Локальный API-шлюз для подключения локальных LLM-моделей Ollama к внешним клиентам (Cline, Continue и другим AI-инструментам), которым требуется совместимый OpenAI API интерфейс.

Проект работает как промежуточный сервер:

```text
Cline / Continue / AI Client
            |
            v
   Ollama Gateway (localhost:11435)
            |
            v
   Ollama Server (localhost:11434)
            |
            v
      Local LLM Model
```

---

# Назначение проекта

Основные задачи:

- предоставить OpenAI-compatible API для локальных моделей Ollama;
- скрыть особенности нативного Ollama API;
- использовать локальные модели без облачных API;
- фильтровать нежелательный служебный вывод моделей;
- обеспечить работу Cline через локальный AI backend;
- подготовить основу для локального AI-агента.

---

# Возможности

- HTTP API gateway между клиентом и Ollama;
- OpenAI API compatible endpoint;
- работа с локальными моделями Ollama;
- обработка Chat Completion запросов;
- фильтрация `<thinking>` блоков;
- логирование запросов для отладки;
- возможность расширения MCP-инструментами.

---

# Структура проекта

```text
ollama-gateway/
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
│
└── node_modules/
```

---

# Описание файлов

## server.js

Главный файл приложения.

Отвечает за:

- запуск HTTP сервера;
- прием запросов от AI клиентов;
- передачу запросов в Ollama;
- обработку ответов модели;
- фильтрацию служебных тегов;
- возврат совместимого ответа.

---

## package.json

Конфигурация Node.js проекта.

Содержит:

- название проекта;
- зависимости;
- команды запуска;
- информацию о проекте.

---

## package-lock.json

Автоматически создаваемый npm-файл.

Фиксирует:

- версии зависимостей;
- дерево пакетов;
- стабильность установки.

Редактировать вручную не рекомендуется.

---

## .gitignore

Список файлов, которые не должны попадать в Git.

Пример:

```text
node_modules/
.env
logs/
.DS_Store
```

---

## README.md

Документация проекта:

- назначение;
- установка;
- запуск;
- тестирование;
- описание файлов.

---

# Требования

Необходимо установить:

## Node.js

Проверка:

```bash
node -v
```

---

## Ollama

Проверка:

```bash
ollama --version
```

Проверка API:

```bash
curl http://localhost:11434/api/version
```

---

# Установка

Перейти в папку проекта:

```bash
cd ollama-gateway-v2
```

Установить зависимости:

```bash
npm install
```

---

# Запуск Ollama

Запуск сервера Ollama:

```bash
ollama serve
```

Проверка:

```bash
curl http://localhost:11434/api/version
```

---

# Запуск Gateway

Запуск:

```bash
node server.js
```

Ожидаемый вывод:

```text
ollama-gateway listening on 11435
```

---

# Проверка Gateway

Проверить доступность API:

```bash
curl http://localhost:11435/v1/models
```

Должен вернуться список моделей Ollama.

---

# Подключение Cline

Настройки:

```text
Provider:
OpenAI Compatible

Base URL:
http://localhost:11435/v1
```

Модель выбирается из списка Ollama:

```bash
ollama list
```

Пример:

```text
qwen3.5-dev:latest
```

---

# Тестирование запросов

## Напрямую через Ollama

```bash
curl http://localhost:11434/api/generate \
-d '{
  "model":"qwen3.5-dev:latest",
  "prompt":"Hello"
}'
```

---

## Через Gateway

```bash
curl http://localhost:11435/v1/chat/completions \
-H "Content-Type: application/json" \
-d '{
  "model":"qwen3.5-dev:latest",
  "messages":[
    {
      "role":"user",
      "content":"Hello"
    }
  ]
}'
```

---

# Диагностика

## Проверка процессов

```bash
ps aux | grep ollama
```

---

## Проверка порта Ollama

```bash
lsof -i :11434
```

---

## Проверка порта Gateway

```bash
lsof -i :11435
```

---

# Возможные проблемы

## Invalid API Response в Cline

Проверить:

1. Gateway запущен:

```bash
curl http://localhost:11435/v1/models
```

2. Ollama работает:

```bash
curl http://localhost:11434/api/version
```

3. Модель существует:

```bash
ollama list
```

---

# Используемые технологии

- Node.js
- Express
- Ollama
- OpenAI Compatible API
- Cline
- MCP

```

---

# Дальнейшее развитие

Возможные расширения:

- поддержка нескольких моделей;
- автоматический выбор модели;
- интеграция MCP tools;
- память агента;
- очередь задач;
- веб-интерфейс управления;
- расширенное логирование;
- управление контекстом.

---

# Автор

Local AI Agent Infrastructure Project
