class YearCountdown {
    constructor() {
        this.init();
        this.updateCountdown();
        // Update every second for real-time display
        setInterval(() => this.updateCountdown(), 1000);
    }

    init() {
        this.currentYearElement = document.getElementById('currentYear');
        this.daysRemainingElement = document.getElementById('daysRemaining');
        this.daysPassedElement = document.getElementById('daysPassed');
        this.percentageRemainingElement = document.getElementById('percentageRemaining');
        this.hoursRemainingElement = document.getElementById('hoursRemaining');
        this.minutesRemainingElement = document.getElementById('minutesRemaining');
        this.secondsRemainingElement = document.getElementById('secondsRemaining');
        this.progressRingElement = document.getElementById('progressRing');
        this.secondsRingElement = document.getElementById('secondsRing');
        this.centerPercentageElement = document.getElementById('centerPercentage');
        this.currentDateElement = document.getElementById('currentDate');
        
        // Calculate circle circumferences for progress animation
        const yearRadius = 130;
        const secondsRadius = 115;
        this.yearCircumference = 2 * Math.PI * yearRadius;
        this.secondsCircumference = 2 * Math.PI * secondsRadius;
        
        // Set initial stroke-dasharray
        this.progressRingElement.style.strokeDasharray = this.yearCircumference;
        this.secondsRingElement.style.strokeDasharray = this.secondsCircumference;
    }

    updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        
        // Start and end of current year
        const yearStart = new Date(currentYear, 0, 1); // January 1st
        const yearEnd = new Date(currentYear + 1, 0, 1); // January 1st of next year
        
        // Calculate total time remaining in milliseconds
        const totalTimeInYear = yearEnd - yearStart;
        const timeRemaining = yearEnd - now;
        const timePassed = now - yearStart;
        
        // Calculate days
        const totalDaysInYear = Math.ceil(totalTimeInYear / (1000 * 60 * 60 * 24));
        const daysPassed = Math.floor(timePassed / (1000 * 60 * 60 * 24));
        const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
        
        // Calculate remaining hours, minutes, seconds
        const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Calculate percentages
        const percentagePassed = (timePassed / totalTimeInYear) * 100;
        const percentageRemaining = 100 - percentagePassed;
        
        // Calculate seconds progress (for the inner circle)
        const currentSecond = now.getSeconds();
        const secondsProgress = (currentSecond / 60) * 100;
        
        // Update DOM elements
        this.currentYearElement.textContent = currentYear;
        this.daysRemainingElement.textContent = daysRemaining;
        this.daysPassedElement.textContent = daysPassed;
        this.percentageRemainingElement.textContent = percentageRemaining.toFixed(1) + '%';
        
        // Update time display with zero padding
        this.hoursRemainingElement.textContent = hoursRemaining.toString().padStart(2, '0');
        this.minutesRemainingElement.textContent = minutesRemaining.toString().padStart(2, '0');
        this.secondsRemainingElement.textContent = secondsRemaining.toString().padStart(2, '0');
        
        // Update circular progress rings
        const yearProgressOffset = this.yearCircumference - (percentagePassed / 100) * this.yearCircumference;
        const secondsProgressOffset = this.secondsCircumference - (secondsProgress / 100) * this.secondsCircumference;
        
        this.progressRingElement.style.strokeDashoffset = yearProgressOffset;
        this.secondsRingElement.style.strokeDashoffset = secondsProgressOffset;
        
        // Update center percentage
        this.centerPercentageElement.textContent = percentagePassed.toFixed(1) + '%';
        
        // Update current date
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.currentDateElement.textContent = now.toLocaleDateString('en-US', options);
        
        // Add some visual feedback based on how much time is left
        this.updateTheme(percentageRemaining);
    }

    updateTheme(percentageRemaining) {
        const container = document.querySelector('.container');
        
        // Remove existing theme classes
        container.classList.remove('theme-green', 'theme-yellow', 'theme-orange', 'theme-red');
        
        // Add theme based on remaining percentage
        if (percentageRemaining > 75) {
            container.classList.add('theme-green');
        } else if (percentageRemaining > 50) {
            container.classList.add('theme-yellow');
        } else if (percentageRemaining > 25) {
            container.classList.add('theme-orange');
        } else {
            container.classList.add('theme-red');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new YearCountdown();
});