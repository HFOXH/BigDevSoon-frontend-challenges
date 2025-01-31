const images = [
    "https://plus.unsplash.com/premium_photo-1674831528132-7d4a29b6ab4f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/27168244/pexels-photo-27168244/free-photo-of-dark-green-photo-of-a-sumac-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/30364108/pexels-photo-30364108/free-photo-of-vibrant-kingfisher-resting-on-a-stump-vietnam.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/27272191/pexels-photo-27272191/free-photo-of-rapidos-de-bacalar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/29975655/pexels-photo-29975655/free-photo-of-solitary-tree-in-lush-green-wheat-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/30088193/pexels-photo-30088193/free-photo-of-lush-green-terraced-fields-in-ooty-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
]

let currentIndex = 0;
const mainImage = document.getElementById('mainImage');

function changeImage(src){
    mainImage.src = src;
    currentIndex = images.indexOf(src);
}

function nextImage(){
    currentIndex = (currentIndex + 1) % images.length;
    mainImage.src = images[currentIndex];
}

function prevImage(){
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    mainImage.src = images[currentIndex];
}