document.addEventListener("DOMContentLoaded", () => {
    const calendarContainer = document.getElementById("calendar-container");
    const currentMonthYear = document.getElementById("current-month-year");
    const calendarDays = document.getElementById("calendar-days");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const calendarIconCheckIn = document.getElementById("calendar-icon-check-in");
    const calendarIconCheckOut = document.getElementById("calendar-icon-check-out");
    const checkInInput = document.getElementById("check-in");
    const checkOutInput = document.getElementById("check-out");

    let currentDate = new Date();
    let startDate = null;
    let endDate = null;

    // Función para formatear la fecha
    const formatDate = (date) => {
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    // Función para renderizar el calendario
    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Actualizar el mes y año mostrado
        currentMonthYear.textContent = new Intl.DateTimeFormat("en-US", {
            month: "long",
            year: "numeric",
        }).format(currentDate);

        // Obtener el primer día del mes y el último día del mes
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        // Limpiar los días anteriores
        calendarDays.innerHTML = "";

        // Añadir días vacíos hasta el primer día del mes
        for (let i = 0; i < firstDay.getDay() - 1; i++) {
            calendarDays.innerHTML += `<div class="text-sm p-1"></div>`;
        }

        // Añadir los días del mes
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(year, month, day);
            const isStart = startDate && date.toDateString() === startDate.toDateString();
            const isEnd = endDate && date.toDateString() === endDate.toDateString();
            const isInRange = startDate && endDate && date > startDate && date < endDate;

            calendarDays.innerHTML += `
                <div class="text-sm text-center p-1 cursor-pointer
                    ${isStart || isEnd ? "bg-orange-500 text-white" : ""}
                    ${isInRange ? "bg-gray-200" : "hover:bg-gray-200"}"
                    onclick="selectDate(new Date(${year}, ${month}, ${day}))">
                    ${day}
                </div>
            `;
        }
    };

    // Función para seleccionar una fecha
    window.selectDate = (date) => {
        if (!startDate || (startDate && endDate)) {
            startDate = date;
            endDate = null;
            checkInInput.value = formatDate(date);
            checkOutInput.value = "";
        } else if (date > startDate) {
            endDate = date;
            checkOutInput.value = formatDate(date);
        } else {
            startDate = date;
            checkInInput.value = formatDate(date);
            checkOutInput.value = "";
        }

        renderCalendar();
    };

    // Mostrar el calendario y posicionarlo
    const showCalendar = (icon) => {
        // Obtener la posición del ícono
        const iconRect = icon.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // Posicionar el calendario a la derecha del ícono
        calendarContainer.style.top = `${iconRect.bottom + scrollTop}px`;
        calendarContainer.style.left = `${iconRect.left + scrollLeft}px`;

        // Mostrar el calendario
        calendarContainer.classList.remove("hidden");
        calendarIconCheckIn.classList.remove("active");
        calendarIconCheckOut.classList.remove("active");
        icon.classList.add("active");
    };

    // Eventos para mostrar el calendario
    calendarIconCheckIn.addEventListener("click", () => showCalendar(calendarIconCheckIn));
    calendarIconCheckOut.addEventListener("click", () => showCalendar(calendarIconCheckOut));

    // Cambiar al mes anterior
    prevMonthButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    // Cambiar al siguiente mes
    nextMonthButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Ocultar el calendario al hacer clic fuera
    document.addEventListener("click", (event) => {
        if (!calendarContainer.contains(event.target) &&
            !calendarIconCheckIn.contains(event.target) &&
            !calendarIconCheckOut.contains(event.target)) {
            calendarContainer.classList.add("hidden");
        }
    });

    // Renderizar el calendario inicial
    renderCalendar();

    // Función para manejar la lógica de un select
    const setupSelect = (buttonId, optionsId, selectedId, arrowId) => {
        const button = document.getElementById(buttonId);
        const options = document.getElementById(optionsId);
        const selected = document.getElementById(selectedId);
        const arrow = document.getElementById(arrowId);

        // Abrir/cerrar el menú
        button.addEventListener("click", () => {
            const isOpen = options.classList.toggle("hidden");
            arrow.classList.toggle("rotate-180", !isOpen);
        });

        // Cerrar el menú al hacer clic fuera
        document.addEventListener("click", (event) => {
            if (!button.contains(event.target) && !options.contains(event.target)) {
                options.classList.add("hidden");
                arrow.classList.remove("rotate-180");
            }
        });

        // Seleccionar una opción
        options.querySelectorAll("li").forEach((option) => {
            option.addEventListener("click", () => {
                selected.textContent = option.textContent;
                options.classList.add("hidden");
                arrow.classList.remove("rotate-180");
            });
        });
    };

    // Configurar los selects
    setupSelect("adults-button", "adults-options", "adults-selected", "adults-arrow");
    setupSelect("children-button", "children-options", "children-selected", "children-arrow");
});