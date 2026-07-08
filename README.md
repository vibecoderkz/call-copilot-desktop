# Call Copilot Desktop

Реалтайм-ассистент звонков: живой транскрипт (Я / Они), автоматическое извлечение задач, объяснение контекста и подсказки «что ответить» — во время звонка в Google Meet, Zoom, Teams или любом другом приложении.

Клиент захватывает микрофон и звук собеседников и отправляет их на ваш сервер Call Copilot (распознавание речи и аналитика выполняются на сервере, RU/EN/KK).

## Установка

Скачайте сборку из [Releases](../../releases):

| ОС | Файл |
|---|---|
| macOS (Apple Silicon / Intel) | `CallCopilot-*-mac-*.dmg` |
| Windows 10/11 | `CallCopilot-*-win-x64.exe` |
| Linux | `CallCopilot-*-linux-x86_64.AppImage` или `.deb` |

Сборки не подписаны сертификатами:
- **macOS**: первый запуск — правый клик по приложению → «Открыть» (или `xattr -cr "/Applications/Call Copilot.app"`).
- **Windows**: SmartScreen → «Подробнее» → «Выполнить в любом случае».
- **Linux**: `chmod +x CallCopilot-*.AppImage`.

## Звук собеседников

- **Windows** — выберите «Системный звук (loopback)», работает из коробки.
- **Linux** — выберите устройство «Monitor of …» (PulseAudio/PipeWire).
- **macOS** — установите [BlackHole 2ch](https://existential.audio/blackhole/), создайте Multi-Output Device (динамики + BlackHole) в «Настройка Audio-MIDI» и выберите BlackHole 2ch в приложении.

## Сервер

В настройках укажите адрес вашего сервера Call Copilot. Серверная часть: FastAPI + faster-whisper (GPU) + PostgreSQL.

## Лицензия

Проприетарная — см. [LICENSE](LICENSE).

---

Разработано [Dias Zhumagaliyev — dias.now](https://dias.now) · hello@dias.now
