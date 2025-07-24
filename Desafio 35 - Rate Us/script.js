const faces = document.querySelectorAll('.emoji-face');

faces.forEach(face => {
    face.addEventListener('click', () => {
        faces.forEach(f => f.classList.remove('active'));
        face.classList.add('active');
    })
})