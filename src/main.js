const readline = require('readline');

// Initialize the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promisified question function for easier async/await usage
const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

console.log("Welcome to Currency Converter!");
console.log("1 USD equals  1 USD\n" +
    "1 USD equals  113.5 JPY\n" +
    "1 USD equals  0.89 EUR\n" +
    "1 USD equals  74.36 RUB\n" +
    "1 USD equals  0.75 GBP");

let currencyArray = ["JPY", "EUR", "RUB", "USD", "GBP"];

// Helper Functions
function isACurrency(currency, currencyArray) {
    return currencyArray.includes(currency);
}

function USConverter(to, amount) {
    switch (to) {
        case "JPY":
            return amount * 113.5;
        case "EUR":
            return amount * 0.89;
        case "RUB":
            return amount * 74.36;
        case "GBP":
            return amount * 0.75;
    }
}

function currencyConverter(from, to, amount) {
    if (from === "USD") {
        return USConverter(to, amount);
    } else if (to === "USD") {
        switch (from) {
            case "JPY":
                return amount / 113.5;
            case "EUR":
                return amount / 0.89;
            case "RUB":
                return amount / 74.36;
            case "GBP":
                return amount / 0.75;
        }
    } else {
        switch (from) {
            case "JPY":
                return USConverter(to, amount / 113.5);
            case "EUR":
                return USConverter(to, amount / 0.89);
            case "RUB":
                return USConverter(to, amount / 74.36);
            case "GBP":
                return USConverter(to, amount / 0.75);
        }
    }
}

// Main Program Logic
async function main() {
    let action;
    do {
        console.log("\nWhat do you want to do?");
        console.log("1-Convert currencies 2-Exit program");

        action = parseInt(await askQuestion("> "));

        while (isNaN(action) || action < 1 || action > 2) {
            if (isNaN(action)) {
                console.log("The amount has to be a number.");
            } else {
                console.log("Unknown input.");
            }
            action = parseInt(await askQuestion("> "));
        }

        if (action === 1) {
            console.log("What do you want to convert?");
            console.log("From:");
            let convertFrom = (await askQuestion("> ")).toUpperCase();

            if (isACurrency(convertFrom, currencyArray)) {
                console.log("To:");
                let convertTo = (await askQuestion("> ")).toUpperCase();

                if (isACurrency(convertTo, currencyArray)) {
                    console.log("Amount:");
                    let amount = parseFloat(await askQuestion("> "));

                    if (!isNaN(amount) && amount >= 1) {
                        let converted = currencyConverter(convertFrom, convertTo, amount);
                        console.log(`Result: ${amount} ${convertFrom} equals ${converted.toFixed(4)} ${convertTo}`);
                    } else if (amount < 1) {
                        console.log("The amount cannot be less than 1.");
                    } else {
                        console.log("The amount has to be a number.");
                    }
                } else {
                    console.log("Unknown currency.");
                }
            } else {
                console.log("Unknown currency.");
            }
        }
    } while (action !== 2);

    console.log("Have a nice day!");
    rl.close();
}

// Run the program
main();
