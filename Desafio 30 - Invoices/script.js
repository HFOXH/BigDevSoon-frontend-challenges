document.querySelectorAll('.row-check').forEach(cb => {
    const tr = cb.closest('tr');
    if (cb.checked) tr.classList.add('bg-gray-200');
    cb.addEventListener('change', () => {
      tr.classList.toggle('bg-gray-200', cb.checked);
    })
  });