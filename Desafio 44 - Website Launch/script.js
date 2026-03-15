const launchDate = new Date("2026-04-01T00:00:00").getTime();
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountDown() {
    const now = new Date().getTime();
    const difference = launchDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / (1000));

    daysElement.innerText = String(days).padStart(2, '0');
    hoursElement.innerText = String(hours).padStart(2, '0');
    minutesElement.innerText = String(minutes).padStart(2, '0');
    secondsElement.innerText = String(seconds).padStart(2, '0');
}

updateCountDown()

const timer = setInterval(updateCountDown, 1000);