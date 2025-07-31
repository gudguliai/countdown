class YearCountdown {
    constructor() {
        this.init();
        this.updateCountdown();
        // Update every hour
        setInterval(() => this.updateCountdown(), 3600000);
    }

    init() {
        this.currentYearElement = document.getElementById('currentYear');
        this.daysRemainingElement = document.getElementById('daysRemaining');
        this.daysPassedElement = document.getElementById('daysPassed');
        this.percentageRemainingElement = document.getElementById('percentageRemaining');
        this.progressFillElement = document.getElementById('progressFill');
        this.currentDateElement = document.getElementById('currentDate');
    }

    updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        
        // Start and end of current year
        const yearStart = new Date(currentYear, 0, 1); // January 1st
        const yearEnd = new Date(currentYear + 1, 0, 1); // January 1st of next year
        
        // Calculate days
        const totalDaysInYear = Math.ceil((yearEnd - yearStart) / (1000 * 60 * 60 * 24));
        const daysPassed = Math.ceil((now - yearStart) / (1000 * 60 * 60 * 24));
        const daysRemaining = totalDaysInYear - daysPassed;
        
        // Calculate percentage
        const percentagePassed = (daysPassed / totalDaysInYear) * 100;
        const percentageRemaining = 100 - percentagePassed;
        
        // Update DOM elements
        this.currentYearElement.textContent = currentYear;
        this.daysRemainingElement.textContent = daysRemaining;
        this.daysPassedElement.textContent = daysPassed;
        this.percentageRemainingElement.textContent = percentageRemaining.toFixed(1) + '%';
        
        // Update progress bar
        this.progressFillElement.style.width = percentagePassed.toFixed(1) + '%';
        
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