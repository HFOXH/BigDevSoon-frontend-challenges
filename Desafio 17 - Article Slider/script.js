let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.flex.justify-center.items-end.mt-4.space-x-2 > div');

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('hidden');
            slide.classList.add('active');
        } else {
            slide.classList.add('hidden');
            slide.classList.remove('active');
        }
    });

    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.remove('bg-gray-500');
            indicator.classList.add('bg-blue-600');
        } else {
            indicator.classList.remove('bg-blue-600');
            indicator.classList.add('bg-gray-500');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

showSlide(currentSlide);