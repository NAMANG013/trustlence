document.addEventListener('DOMContentLoaded', () => {

    // UI Elements
    const simulateBtn = document.getElementById('simulate-btn');
    const scoreDisplay = document.getElementById('trust-score');
    const statusResult = document.getElementById('status-result');
    const statusText = document.getElementById('status-text');
    const statusIcon = document.getElementById('status-icon');
    const circle = document.querySelector('.progress-ring__circle');
    const scanTime = document.getElementById('scan-time');
    const feedback = document.getElementById('scan-feedback');

    // Constants
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    // Setup Circle
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    // Color Logic
    function getColor(score) {
        if (score >= 80) return ['#00ff9d', 'SAFE', 'shield-check'];
        if (score >= 50) return ['#ffb700', 'WARNING', 'shield-alert'];
        return ['#ff4d4d', 'RISK', 'shield-off'];
    }

    // Simulation Function
    function runSimulation() {
        // Disable button during scan "processing"
        simulateBtn.disabled = true;
        simulateBtn.innerHTML = '<span class="pulse-dot"></span> Scanning...';

        // Reset UI temporarily
        scoreDisplay.textContent = '--';
        statusText.textContent = 'ANALYZING...';
        statusResult.style.color = '#fff';
        circle.style.stroke = '#555';
        setProgress(0);

        // Fake processing delay
        setTimeout(() => {
            // Generate random score between 30 and 99
            // Weighted slightly towards high scores for demo positivity, but random enough
            const randomScore = Math.floor(Math.random() * (99 - 30 + 1)) + 30;
            const [color, text, iconName] = getColor(randomScore);

            // Animate Score
            animateValue(scoreDisplay, 0, randomScore, 1000);

            // Update UI
            setTimeout(() => {
                circle.style.stroke = color;
                setProgress(randomScore);

                statusText.textContent = text;
                statusResult.style.color = color;

                // Update Icon (requires re-running Lucide)
                statusIcon.setAttribute('data-lucide', iconName);
                lucide.createIcons();

                // Timestamp
                scanTime.textContent = 'Last scan: Just now';

                // Success Feedback
                feedback.classList.add('visible');
                setTimeout(() => feedback.classList.remove('visible'), 3000);

                // Reset Button
                simulateBtn.disabled = false;
                simulateBtn.innerHTML = '<i data-lucide="scan-line"></i> Simulate Scan';
                lucide.createIcons();

            }, 100);

        }, 1500); // 1.5s delay for "processing" feel
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    simulateBtn.addEventListener('click', runSimulation);
});
