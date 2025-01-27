// Selección de la imagen central
document.querySelectorAll('.thumb').forEach(img => {
    img.addEventListener('click', function(){
        document.getElementById('main-image').src = this.src;
    })
});

// Selección de la talla
document.querySelectorAll('.size-btn').forEach(button => {
    button.addEventListener('click', function(){
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('bg-black', 'text-white'));
        this.classList.add('bg-black', 'text-white');
    })
});
