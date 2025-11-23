document.addEventListener("DOMContentLoaded", () => {
    const isIndexPage = document.getElementById("variant-builder"); // Перевірка, чи ми на 1-й сторінці
    const isViewPage = document.getElementById("variant-display");  // Перевірка, чи ми на 2-й сторінці

    if (isIndexPage) {
        const countInput = document.getElementById("obj-count");
        const generateBtn = document.getElementById("btn-generate");
        const inputsContainer = document.getElementById("inputs-container");
        const saveBtn = document.getElementById("btn-save-variant");

        generateBtn.addEventListener("click", () => {
            inputsContainer.innerHTML = "";
            const count = parseInt(countInput.value);

            if (!count || count < 0) return alert("Введіть коректну кількість");

            for (let i = 0; i < count; i++) {
                const div = document.createElement("div");
                div.style.border = "1px solid #ccc";
                div.style.padding = "10px";
                div.style.marginBottom = "10px";
                div.style.background = "#fff";
                div.innerHTML = `
                    <strong>Елемент №${i + 1}</strong><br>
                    <input type="text" placeholder="Заголовок" class="obj-title" style="width: 100%; margin-bottom: 5px;"><br>
                    <textarea placeholder="Опис" class="obj-desc" style="width: 100%;"></textarea>
                `;
                inputsContainer.appendChild(div);
            }
            saveBtn.style.display = "block";
        });

        saveBtn.addEventListener("click", async () => {
            const items = [];
            const titles = document.querySelectorAll(".obj-title");
            const descs = document.querySelectorAll(".obj-desc");

            titles.forEach((input, index) => {
                items.push({
                    title: input.value,
                    desc: descs[index].value
                });
            });

            // Асинхронне збереження (fetch)
            try {
                const res = await fetch("api_variant.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ data: items })
                });
                const result = await res.json();
                if (result.success) alert("Дані успішно збережено на сервері!");
            } catch (err) {
                console.error(err);
                alert("Помилка збереження");
            }
        });
    }

    if (isViewPage) {
        const loadData = async () => {
            try {
                const res = await fetch("api_variant.php");
                const data = await res.json();
                renderObjects(data);
            } catch (err) {
                console.error("Помилка отримання даних:", err);
            }
        };

        const renderObjects = (data) => {
            const container = document.getElementById("variant-display");
            container.innerHTML = "";

            data.forEach(item => {
                const card = document.createElement("div");

                card.style.border = "2px solid #007acc";
                card.style.borderRadius = "8px";
                card.style.padding = "15px";
                card.style.marginBottom = "15px";
                card.style.backgroundColor = "#f9f9f9";
                card.style.fontFamily = "Arial, sans-serif";
                card.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.1)";

                const title = document.createElement("h3");
                title.innerText = item.title;
                title.style.color = "#333";
                title.style.marginTop = "0";

                const desc = document.createElement("p");
                desc.innerText = item.desc;
                desc.style.color = "#555";

                card.appendChild(title);
                card.appendChild(desc);
                container.appendChild(card);
            });

            const timeInfo = document.createElement("div");
            timeInfo.style.fontSize = "10px";
            timeInfo.style.color = "#888";
            timeInfo.innerText = "Оновлено: " + new Date().toLocaleTimeString();
            container.appendChild(timeInfo);
        };

        loadData();

        setInterval(loadData, 5000);
    }
});