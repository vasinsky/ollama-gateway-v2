# Ollama Smart Gateway — запуск, тестирование и настройка Cline

## Назначение

Этот файл содержит инструкции по запуску, проверке работы Ollama Smart Gateway и подключению его к Cline.

Архитектура:

```text
Cline
 |
 | OpenAI Compatible API
 |
 v
Ollama Smart Gateway
localhost:11435
 |
 | Ollama API
 |
 v
Ollama Server
localhost:11434
 |
 v
Local LLM Model
```

---

# 1. Проверка Ollama

Проверить версию Ollama:

```bash
ollama --version
```

Проверить доступность API:

```bash
curl http://localhost:11434/api/version
```

Ожидаемый результат:

```json
{
  "version": "0.31.1"
}
```

---

# 2. Проверка установленных моделей

Список моделей:

```bash
ollama list
```

Пример:

```text
qwen3.5-dev:latest
qwen3.5-cline:latest
gemma4:12b-it-qat
deepseek-r1:latest
```

---

# 3. Запуск Gateway

Перейти в папку проекта:

```bash
cd /Users/vasinsky/VibeCode/gateway
```

Запуск:

```bash
node server.js
```

Ожидаемый вывод:

```text
ollama-gateway listening on 11435
```

Не закрывать этот терминал.

---

# 4. Проверка Gateway

## Проверка доступности

```bash
curl http://localhost:11435/
```

Ожидаемый ответ:

```json
{
  "status":"ok",
  "service":"ollama-smart-gateway"
}
```

---

## Проверка списка моделей

```bash
curl http://localhost:11435/v1/models
```

Ответ должен содержать:

```json
{
  "object":"list",
  "data":[
    {
      "id":"qwen3.5-dev:latest"
    }
  ]
}
```

---

# 5. Тест генерации через Gateway

Команда:

```bash
curl http://localhost:11435/v1/chat/completions \
-H "Content-Type: application/json" \
-d '{
  "model":"qwen3.5-dev:latest",
  "messages":[
    {
      "role":"user",
      "content":"Привет. Ответь одним коротким предложением."
    }
  ]
}'
```

Ожидаемый результат:

```json
{
  "choices":[
    {
      "message":{
        "role":"assistant",
        "content":"Привет! Чем я могу вам помочь?"
      }
    }
  ]
}
```

---

# 6. Настройка Cline

Открыть:

```
VS Code
→ Cline
→ Settings
```

---

## API Provider

Выбрать:

```
OpenAI Compatible
```

---

## Base URL

Указать:

```
http://localhost:11435/v1
```

---

## API Key

Использовать любое значение:

```
ollama
```

Gateway не использует настоящий API ключ.

---

## Model

Основная модель:

```
qwen3.5-dev:latest
```

Для Cline-ориентированной работы:

```
qwen3.5-cline:latest
```

---

# 7. Первый тест Cline

В Cline отправить:

```
Создай файл test.txt с текстом Hello Local AI
```

Проверить:

- Cline получил ответ;
- файл создан;
- в терминале Gateway появились запросы.

---

# 8. Проверка ошибок

## Gateway не запускается

Проверить порт:

```bash
lsof -i :11435
```

Если порт занят:

```bash
kill PID
```

---

## Ollama недоступен

Проверить:

```bash
curl http://localhost:11434/api/version
```

---

## Cline показывает:

```
Invalid API Response
```

Проверить:

1. Gateway запущен:

```bash
curl http://localhost:11435/v1/models
```

2. Модель существует:

```bash
ollama list
```

3. Тест напрямую через curl проходит.

---

# 9. Рабочее состояние проекта

На текущем этапе:

✅ Ollama работает  
✅ Gateway работает  
✅ OpenAI API совместимость работает  
✅ Модели доступны через `/v1/models`  
✅ Chat Completion работает  
✅ Thinking-фрагменты фильтруются  
✅ Cline может использовать локальную модель  

---

# 10. Следующие этапы развития

План развития:

## Streaming SSE

Добавить потоковую генерацию для полноценной работы Cline.

## Model Router

Автоматический выбор модели:

```text
Код:
qwen3.5-dev

Анализ:
deepseek

Общие задачи:
gemma
```

## MCP Integration

Подключение:

- Context7
- файловых инструментов
- внешних MCP серверов

## Agent Layer

Добавление:

- памяти;
- истории;
- планирования задач;
- управления инструментами.
