# IRIS

Лендинг Iris Design. Frontend — React, backend — FastAPI.

## Хранение заявок

Хранение заявок отключено, персональные данные не сохраняем.

Переменная `PD_STORAGE_ENABLED` должна быть `false`. Значение `true` не даёт сервису запуститься. MongoDB для работы API не нужна: заявки с форм получают успешный ответ и никуда не записываются.

Пример окружения: `backend/.env.example`.

Если MongoDB уже поднимали, коллекции `contacts`, `partner_requests`, `cost_requests` и `status_checks` нужно удалить и не хранить дампы с этими данными. В unit-файле `iris-api` не должно быть `Requires=mongod.service`.

В production `CORS_ORIGINS` задаётся списком доменов через запятую, без `*`.
