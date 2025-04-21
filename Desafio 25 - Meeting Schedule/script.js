const daysGrid = document.getElementById('days-grid');
const title = document.getElementById('calendar-title');

let currentDate = new Date(2024, 1);

function renderCalendar(date){
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const startDay = (firstDay.getDay() + 6) % 7;

    title.textContent = `${date.toLocaleString('default', {month: 'long'})} ${year}`;
    daysGrid.innerHTML = '';

    // Días del mes anterior (Más opacos)
    for (let i = startDay - 1; i >= 0; i--) {
        daysGrid.innerHTML = `<div class="opacity-50">${prevLastDay.getDate() - i}</div>`;
    }

    // Días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const isToday = (year === 2024 && month === 1 && i === 23);
        const className = isToday ? "bg-dark-green text-white rounded-full h-5 w-5" : "" ;
        daysGrid.innerHTML += `<div class="${className}">${i}</div>`;
    }

    // Rellenamos las filas que falten para completar las 42 celdas que equivalen a 6 semanas
    const totalCells = daysGrid.children.length;
    for (let i = 1; totalCells + i <= 42; i++) {
        daysGrid.innerHTML += `<div class="opacity-50">${i}</div>`;
    }
}

function changeMonth(offset){
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar(currentDate);
}

renderCalendar(currentDate);

function scrollToIndex(containerId, index) {
    const container = document.getElementById(containerId);
    const option = container.querySelectorAll('.time-option')[index];
    const offset = option.offsetTop - (container.offsetHeight / 2) + (option.offsetHeight / 2);
    container.scrollTop = offset;        
}

// Función para obtener la hora, por si futuro se necesita ;D
function getSelectedValue(containerId){
    const container = document.getElementById(containerId);
    const options = container.querySelectorAll('.time-option');
    const centerY = container.getBoundingClientRect().top + container.offsetHeight / 2;

    let closest = null, offset = Infinity;

    options.forEach(el => {
        const y = el.getBoundingClientRect().top + el.offsetHeight / 2;
        const diff = Math.abs(y - centerY);
        if (diff < offset){
            offset = diff;
            closest = el;
        }
    });

    options.forEach(el => el.classList.toggle('selected', el === closest));
    return closest?.innerText || '--';
}

function updateSelection(){
    const h = getSelectedValue('hours');
    const m = getSelectedValue('minutes');
    const ap = getSelectedValue('ampm');
    document.getElementById('result').innerHTML = `${h}:${m} ${ap}`;
}

function selectTime(){
    updateSelection();
    console.log(`La hora seleccionada fue: ${document.getElementById('result').innerText}`);
}

function cancelTime(){
    document.getElementById('result').innerHTML = '--:-- --';
    document.querySelectorAll('.time-option').forEach(el => el.classList.remove('selected'));
}

document.addEventListener('DOMContentLoaded', () => {
    const padY = 76;
    const genOptions = (parentId, list) => {
        const parent = document.getElementById(parentId);
        parent.innerHTML = `<div class="flex flex-col items-center" style="padding-top: ${padY}px; padding-bottom: ${padY}px;">
        ${list.map(v => `<div class="snap-center time-option">${v}</div>`).join('')}
        </div>`;
    };

    genOptions('hours', Array.from({length: 12}, (_, i) => String(i + 1).padStart(2,'0')));
    genOptions('minutes', Array.from({length: 60}, (_, i) => String(i).padStart(2,'0')));
    genOptions('ampm', ['AM', 'PM']);

    setTimeout(() => {
        scrollToIndex('hours',10);
        scrollToIndex('minutes',0);
        scrollToIndex('ampm',0);
    }, 100);
    
});