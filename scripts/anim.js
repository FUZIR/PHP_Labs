document.addEventListener("DOMContentLoaded", () => {
    const leftContent = document.querySelector('.left-content');
    const rightContent = document.querySelector('.right-content');

    // Створення кнопки PLAY
    const playContainer = document.createElement('div');
    playContainer.id = 'play-btn-container';
    playContainer.innerHTML = '<strong>Блок 4</strong><br><button id="btn-play" class="btn btn-primary">PLAY</button>';
    leftContent.prepend(playContainer);

    // Створення зони WORK в правій колонці (Блок 5)
    // Очистимо rightContent при старті анімації
    const workHTML = `
        <div id="work-area">
            <div id="controls-area">
                <button id="btn-close" class="btn btn-sm btn-danger">Close</button>
                <div id="controls-buttons">
                    <button id="btn-start" class="btn btn-sm btn-success">Start</button>
                    </div>
                <div id="log-message-box">Готовий до роботи</div>
            </div>
            <div id="anim-area">
                <div id="anim-circle"></div>
            </div>
        </div>
    `;

    const workWrapper = document.createElement('div');
    workWrapper.innerHTML = workHTML;
    rightContent.appendChild(workWrapper);

    // Змінні стану
    let animInterval = null;
    let eventId = 0;
    let stepSize = 0;
    let x = 0, y = 0;
    let direction = 0; // 0:Left, 1:Down, 2:Right, 3:Up
    const circle = document.getElementById('anim-circle');
    const animArea = document.getElementById('anim-area');
    const msgBox = document.getElementById('log-message-box');
    const controlsBtns = document.getElementById('controls-buttons');

    // Елементи кнопок
    const btnPlay = document.getElementById('btn-play');
    const btnClose = document.getElementById('btn-close');
    const btnStart = document.getElementById('btn-start');

    // Кнопки Stop/Reload
    const createBtn = (id, text, cls, onClick) => {
        const btn = document.createElement('button');
        btn.id = id;
        btn.className = `btn btn-sm ${cls}`;
        btn.innerText = text;
        btn.onclick = onClick;
        return btn;
    };

    function resetCircle() {
        let w = animArea.clientWidth || animArea.offsetWidth || 800;
        let h = animArea.clientHeight || animArea.offsetHeight || 350;

        console.log(`Виміряні розміри: ${w}x${h}`);

        if (w === 0) w = 800;
        if (h === 0) h = 350;

        // Центруємо круг
        x = w / 2;
        y = h / 2;

        // Показуємо круг
        circle.style.display = 'block';
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';

        // Скидаємо змінні
        stepSize = 1;
        direction = 0;
        eventId = 0;
        localStorage.setItem('anim_logs', JSON.stringify([]));
    }

    function logEvent(message) {
        eventId++;
        const now = Date.now();
        const logData = {
            eventId: eventId,
            time: now,
            msg: message
        };

        // Вивід повідомлення у controls
        msgBox.innerText = `${eventId}. ${message}`;

        // Негайне відправлення
        fetch('server_logs.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(logData)
        }).catch(err => console.error(err));

        // LocalStorage
        const history = JSON.parse(localStorage.getItem('anim_logs') || "[]");
        history.push(logData);
        localStorage.setItem('anim_logs', JSON.stringify(history));
    }

    function moveStep() {
        if (!circle) return;

        // Розрахунок нових координат
        let oldX = x;
        let oldY = y;

        switch(direction) {
            case 0: x -= stepSize; break; // Left
            case 1: y += stepSize; break; // Down
            case 2: x += stepSize; break; // Right
            case 3: y -= stepSize; break; // Up
        }

        stepSize += 1; // Нарощуємо крок
        direction = (direction + 1) % 4; // Змінюємо напрямок

        // Перевірка на зіткнення зі стінками
        const maxX = animArea.clientWidth;
        const maxY = animArea.clientHeight;
        const r = 15; // Радіус

        // Перевірка "Вильоту"

        // Перевірка дотику
        let isTouching = (x - r <= 0) || (x + r >= maxX) || (y - r <= 0) || (y + r >= maxY);
        let isOut = (x + r < 0) || (x - r > maxX) || (y + r < 0) || (y - r > maxY);

        circle.style.left = x + 'px';
        circle.style.top = y + 'px';

        logEvent(`Step: ${stepSize}, Dir: ${direction}, Pos: ${Math.round(x)}:${Math.round(y)}`);

        if (isTouching) {
            // Якщо доторкнувся - змінюємо кнопку Stop на Reload (згідно завдання g)
            const btnStop = document.getElementById('btn-stop');
            if (btnStop) {
                btnStop.replaceWith(createBtn('btn-reload', 'Reload', 'btn-warning', reloadAnim));
                stopAnim(false); // Зупиняємо, але не вертаємо Start
                logEvent("Wall touched! Animation paused.");
            }
        }

        if (isOut) {
            stopAnim();
            logEvent("Circle flew out! Stopped.");
            alert("Circle flew out!");
        }
    }

    function startAnim() {
        resetCircle();
        btnStart.style.display = 'none';
        controlsBtns.appendChild(createBtn('btn-stop', 'Stop', 'btn-danger', () => stopAnim(true)));

        logEvent("Animation Started");
        animInterval = setInterval(moveStep, 200); // 200мс між кроками
    }

    function stopAnim(returnStart = true) {
        clearInterval(animInterval);
        const btnStop = document.getElementById('btn-stop');
        if (btnStop && returnStart) {
            btnStop.remove();
            btnStart.style.display = 'inline-block';
        }
    }

    function reloadAnim() {
        const btnReload = document.getElementById('btn-reload');
        if (btnReload) btnReload.remove();
        btnStart.style.display = 'inline-block';
        resetCircle();
    }

    btnPlay.addEventListener('click', () => {
        document.querySelectorAll('.right-content > *').forEach(el => {
            if (el.id !== 'work-area' && !el.contains(document.getElementById('work-area'))) {
                el.style.display = 'none';
            }
        });

        const workArea = document.getElementById('work-area');
        workArea.style.display = 'block';

        setTimeout(() => {
            resetCircle();
        }, 50);
    });

    btnClose.addEventListener('click', async () => {
        document.getElementById('work-area').style.display = 'none';
        document.querySelectorAll('.right-content > *').forEach(el => el.style.display = 'block');
        stopAnim();

        // Відображення таблиці (Завдання h)
        const localData = JSON.parse(localStorage.getItem('anim_logs') || "[]");

        if (localData.length > 0) {
            await fetch('server_logs.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ batch: localData })
            });
        }

        showResultsTable(localData);
    });

    btnStart.addEventListener('click', startAnim);

    function showResultsTable(logs) {
        let tableContainer = document.getElementById('results-container');
        if (!tableContainer) {
            tableContainer = document.createElement('div');
            tableContainer.id = 'results-container';
            tableContainer.style.maxHeight = '300px';
            tableContainer.style.overflowY = 'scroll';
            tableContainer.style.background = 'white';
            leftContent.appendChild(tableContainer);
        }

        let html = '<h5>Результати (Local vs Server)</h5>';
        html += '<table id="logs-table" class="table table-bordered table-sm">';
        html += '<thead><tr><th>ID</th><th>Event</th><th>Client Time</th></tr></thead><tbody>';

        logs.forEach(row => {
            const date = new Date(row.time).toLocaleTimeString();
            html += `<tr>
                <td>${row.eventId}</td>
                <td>${row.msg}</td>
                <td>${date}</td>
            </tr>`;
        });
        html += '</tbody></table>';
        tableContainer.innerHTML = html;
    }
});