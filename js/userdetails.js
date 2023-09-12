// Function to validate a credit card number using the Luhn algorithm
function validateLuhn(cardNumber) {
    const reversedCardNumber = cardNumber.replace(/\s/g, '').split('').reverse().join('');

    let sum = 0;
    for (let i = 0; i < reversedCardNumber.length; i++) {
        let digit = parseInt(reversedCardNumber[i]);

        if (i % 2 !== 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
    }

    return sum % 10 === 0;
}

// Function to check if a string is a valid email address
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to check if a full name contains at least two words separated by a space
function validateFullName(fullName) {
    // Define a regular expression pattern to match the permitted characters
    const pattern = /^[a-zA-Z!#$%&'*+\-\/=?^_`{|}~ ]+$/;
    
    // Test if the full name matches the pattern
    return pattern.test(fullName);
}

// Function to validate the form and highlight fields with errors
function validateAndHighlight(event) {
    event.preventDefault(); // Prevent the form from submitting

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const creditCardInput = document.getElementById("creditcard");

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const creditCard = creditCardInput.value.trim();

    // Reset previous error highlighting
    usernameInput.classList.remove("error");
    emailInput.classList.remove("error");
    creditCardInput.classList.remove("error");

    if (!validateFullName(username)) {
        alert("Please enter a valid full name.");
        usernameInput.classList.add("error");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        emailInput.classList.add("error");
        return;
    }

    if (!validateLuhn(creditCard)) {
        alert("Invalid Credit Card Number. Please check and try again.");
        creditCardInput.classList.add("error");
        return;
    }

    // If all validations pass, proceed to the next page (replace with your actual logic)
    alert("Validation successful. Proceeding to the next page.");
    // You can add code here to navigate to the next page using JavaScript, e.g., window.location.href = "next-page.html";
}

// Add an event listener for the form's submit button
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', validateAndHighlight);
});