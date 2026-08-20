document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            let isValid = true;
            
            // Validate Name
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                showError(nameInput, 'name-error', 'Full Name is required.');
                isValid = false;
            }
            
            // Validate Email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, 'email-error', 'Email Address is required.');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'email-error', 'Please enter a valid email address.');
                isValid = false;
            }
            
            // Validate Subject
            const subjectInput = document.getElementById('subject');
            if (!subjectInput.value.trim()) {
                showError(subjectInput, 'subject-error', 'Subject is required.');
                isValid = false;
            }
            
            // Validate Message
            const messageInput = document.getElementById('message');
            if (!messageInput.value.trim()) {
                showError(messageInput, 'message-error', 'Message is required.');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const statusDiv = document.getElementById('form-status');
                statusDiv.textContent = 'Thank you! Your message has been sent successfully.';
                statusDiv.className = 'form-status status-success';
                
                // Reset form
                contactForm.reset();
            }
        });
    }
    
    function showError(inputElement, errorId, message) {
        inputElement.setAttribute('aria-invalid', 'true');
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearErrors() {
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.removeAttribute('aria-invalid');
        });
        
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => {
            error.textContent = '';
        });
        
        const statusDiv = document.getElementById('form-status');
        if (statusDiv) {
            statusDiv.textContent = '';
            statusDiv.className = 'form-status';
        }
    }
    
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Get current theme from localStorage or system preference
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else if (currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            let theme = document.documentElement.getAttribute("data-theme");
            // Treat missing attribute as light if user preference wasn't explicitly dark
            if (theme === "dark") {
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
            }
        });
    }
});
