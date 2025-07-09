// Form validation and interaction
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const passwordInput = document.getElementById('pwd');
    const confirmPasswordInput = document.getElementById('confirm-pwd');
    const errorDiv = document.getElementById('error');
    const submitButton = document.querySelector('button[type="submit"]');

    // Password validation function
    function validatePasswords() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Clear previous error states
        passwordInput.classList.remove('pwd-error');
        confirmPasswordInput.classList.remove('pwd-error');
        errorDiv.textContent = '';
        
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                passwordInput.classList.add('pwd-error');
                confirmPasswordInput.classList.add('pwd-error');
                errorDiv.textContent = '* Passwords do not match';
                return false;
            }
        }
        
        return true;
    }

    // Real-time password validation
    passwordInput.addEventListener('input', validatePasswords);
    confirmPasswordInput.addEventListener('input', validatePasswords);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all required fields
        const requiredFields = form.querySelectorAll('input[required]');
        let allValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('pwd-error');
                allValid = false;
            } else {
                field.classList.remove('pwd-error');
            }
        });
        
        // Validate email format
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.classList.add('pwd-error');
            allValid = false;
        }
        
        // Validate passwords match
        if (!validatePasswords()) {
            allValid = false;
        }
        
        if (!allValid) {
            errorDiv.textContent = '* Please fill in all required fields correctly';
            return;
        }
        
        // If all validation passes
        errorDiv.textContent = '';
        alert('Account created successfully! (This is a demo form)');
        
        // Optional: Reset form
        // form.reset();
    });

    // Remove error styling when user starts typing
    const allInputs = form.querySelectorAll('input');
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('pwd-error') && this.value.trim()) {
                this.classList.remove('pwd-error');
            }
        });
    });

    // Add visual feedback for form interaction
    submitButton.addEventListener('click', function() {
        this.style.transform = 'translateY(2px)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});
