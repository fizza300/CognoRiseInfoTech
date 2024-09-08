document.getElementById('startBtn').addEventListener('click', function() {
    const targetDate = new Date(document.getElementById('datetime').value).getTime();

    if (isNaN(targetDate)) {
        alert("Please select a valid date and time.");
        return;
    }

    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const remainingTime = targetDate - now;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "Countdown Ended!";
            return;
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
    }, 1000);
});
