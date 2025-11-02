document.addEventListener("DOMContentLoaded", async () => {
    const startTime = performance.now();

    const getElementKey = (el) => {
        const page = window.location.pathname.split("/").pop() || "index.php";
        const tag = el.tagName.toLowerCase();
        const index = Array.from(document.querySelectorAll(tag)).indexOf(el);
        return `${page}_${tag}_${index}`;
    };

    let savedData = {};
    try {
        const page = window.location.pathname.split("/").pop() || "index.php";
        const res = await fetch(`load.php?page=${page}`);
        savedData = await res.json();
    } catch (err) {
        console.error("Помилка завантаження:", err);
    }

    document.querySelectorAll("h1, h2, p, div, span").forEach((el) => {
        const key = getElementKey(el);
        if (savedData[key]) el.innerText = savedData[key];
    });

    document.querySelectorAll("h1, h2, p, div, span").forEach((el) => {
        if (el.querySelector("img") || el.querySelector("li") || el.querySelector("a")) return;

        el.style.cursor = "pointer";
        el.addEventListener("click", (e) => {
            e.stopPropagation();
            if (document.getElementById("editForm")) return;

            const rect = el.getBoundingClientRect();
            const form = document.createElement("form");
            form.id = "editForm";
            Object.assign(form.style, {
                position: "absolute",
                left: rect.left + window.scrollX + "px",
                top: rect.top + window.scrollY + "px",
                background: "white",
                border: "2px solid #333",
                padding: "10px",
                borderRadius: "10px",
                zIndex: 9999,
            });

            const input = document.createElement("textarea");
            input.value = el.innerText;
            input.style.width = "300px";
            input.style.height = "100px";

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Зберегти";
            saveBtn.type = "submit";

            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Скасувати";
            cancelBtn.type = "button";
            cancelBtn.style.marginLeft = "10px";

            form.append(input, document.createElement("br"), saveBtn, cancelBtn);
            document.body.appendChild(form);
            input.focus();

            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const newText = input.value.trim();
                const key = getElementKey(el);
                const page = window.location.pathname.split("/").pop() || "index.php";
                el.innerText = newText;

                try {
                    await fetch("save.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            page: page,
                            element_key: key,
                            text_content: newText,
                        }),
                    });
                } catch (err) {
                    console.error("Помилка збереження:", err);
                }

                form.remove();
            });

            cancelBtn.addEventListener("click", () => form.remove());
        });
    });

    window.addEventListener("load", () => {
        const endTime = performance.now();
        const loadTime = (endTime - startTime).toFixed(2);
        console.log(`Час формування сторінки: ${loadTime} мс`);
        const footer = document.querySelector(".footer h2");
        if (footer) {
            footer.innerText += ` | Час завантаження: ${loadTime} мс`;
        }
    });
});
