const seats = document.querySelectorAll('.seat');

seats.forEach(seat => {
    seat.addEventListener('click', () => {
        if (seat.classList.contains('reserved')) return;

        seat.classList.toggle('selected');
        seat.classList.toggle('bg-orange');
        seat.classList.toggle('border-orange');
        seat.classList.toggle('avaialable');
    });
})

const updateSelection = (selector, activeClasses, inactiveClasses) => {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => {
        btn.addEventListener('click', () =>{
            buttons.forEach(b => {
                b.classList.remove(...activeClasses);
                b.classList.add(...inactiveClasses);
            });
            btn.classList.remove(...inactiveClasses);
            btn.classList.add(...activeClasses);
        })
    })
}

updateSelection(
    '.date-btn',
    ['text-orange-500', 'border-orange-500', 'bg-orange-50'],
    ['text-gray-400', 'border-gray-300', 'bg-white']
);

updateSelection(
    '.time-btn',
    ['text-orange-500', 'border-orange-500', 'bg-orange-50'],
    ['text-gray-400', 'border-gray-300', 'bg-white']
);