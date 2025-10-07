document.addEventListener("DOMContentLoaded", () => {
    const startTime = performance.now();

    const getElementKey = (el) => {
        const page = window.location.pathname.split("/").pop() || "index";
        const tag = el.tagName.toLowerCase();
        const index = Array.from(document.querySelectorAll(tag)).indexOf(el);
        return `${page}_${tag}_${index}`;
    };

    document.querySelectorAll("h1, h2, p, div, span").forEach((el) => {
        const key = getElementKey(el);
        const savedValue = localStorage.getItem(key);
        if (savedValue) el.innerText = savedValue;
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
            form.style.position = "absolute";
            form.style.left = rect.left + window.scrollX + "px";
            form.style.top = rect.top + window.scrollY + "px";
            form.style.background = "white";
            form.style.border = "2px solid #333";
            form.style.padding = "10px";
            form.style.borderRadius = "10px";
            form.style.zIndex = 9999;

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

            form.appendChild(input);
            form.appendChild(document.createElement("br"));
            form.appendChild(saveBtn);
            form.appendChild(cancelBtn);
            document.body.appendChild(form);

            input.focus();

            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const newText = input.value.trim();
                const key = getElementKey(el);
                el.innerText = newText;
                localStorage.setItem(key, newText);
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
            const existingText = footer.innerText;
            footer.innerText = `${existingText} | Час завантаження: ${loadTime} мс`;
        }
    });
});