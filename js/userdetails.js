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
    
    // Split the full name into parts
    const nameParts = fullName.split(' ');

    // Check if there are at least two name parts and if all parts match the pattern
    return nameParts.length >= 2 && nameParts.every(part => pattern.test(part));
}

function validateAndSendEmail(event) {
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

    // Create an array to store error messages
    const errors = [];

    // Check for empty fields and add error messages to the array
    if (!username) {
        errors.push("Please enter your name.");
        usernameInput.classList.add("error");
    }

    if (!email) {
        errors.push("Please enter your email address.");
        emailInput.classList.add("error");
    }

    if (!creditCard) {
        errors.push("Please enter a credit card number.");
        creditCardInput.classList.add("error");
    }

    // Check for valid full name and add an error message to the array if needed
    if (!validateFullName(username)) {
        errors.push("Please enter a valid full name.");
        usernameInput.classList.add("error");
    }

    // Check for valid email address and add an error message to the array if needed
    if (!validateEmail(email)) {
        errors.push("Please enter a valid email address.");
        emailInput.classList.add("error");
    }

    // Check for valid credit card using Luhn algorithm and add an error message to the array if needed
    if (!validateLuhn(creditCard)) {
        errors.push("Invalid Credit Card Number. Please check and try again.");
        creditCardInput.classList.add("error");
    }

    // If there are errors, display them in an alert message
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    // If all validations pass, send an email using the mailto: link
    const emailSubject = "Form Submission";
    const emailBody = `Name: ${username}\nEmail: ${email}\nCredit Card: ${creditCard}`;
    const emailLink = `mailto:challenge@dn-uk.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Trigger the email link to open the user's default email client
    window.location.href = emailLink;

    window.location.href = "validation-success.html";
}

// Add an event listener for the form's submit button
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', validateAndSendEmail);
});