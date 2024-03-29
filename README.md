# Standard-Calculator

<img src="https://github.com/BurraAbhishek/Standard-Calculator/blob/main/screenshots/darkmode_ui.png" alt="Homepage" title="This calculator comes with light and dark theme, this screenshot shows the dark theme" />

This program is a JavaScript-based standard calculator which can solve many expressions, even with nested brackets

This app is mobile friendly and supports nested brackets.

Supported operations: 
- Exponent, 
- Addition, 
- Subtraction, 
- Multiplication,
- Division, 
- Remainder, 
- Brackets, 
- Nested brackets

Supported features:
- Support for light and dark mode
- Save your calculations for future use
- Calculations without using the insecure JavaScript `eval()` function

Mathematical constants `Pi` (3.14 approx.) and `e` (2.71 approx.) are also supported by this calculator

## Getting Started

Want to try this calculator? Visit [https://burraabhishek.github.io/Standard-Calculator/](https://burraabhishek.github.io/Standard-Calculator/)

To use this calculator locally on your device, 
1. Either download this entire repository or clone using:
```
$ git clone https://github.com/BurraAbhishek/Standard-Calculator.git
```
2. Next, open the index.html file in your preferred browser. This program works well across all modern browsers, including Internet Explorer 11.

NOTE: This repository uses [prettier](https://prettier.io) for code formatting.

## Usage

### Calculations
You can either type the expression or press the calculator buttons to generate your expressions.

### Accessing the options menu
1. Click the three green bars in the top left corner of the app:

    <img src="https://github.com/BurraAbhishek/Standard-Calculator/blob/main/images/menu_bar.png" height=24px width=24px alt="Three green bars">

2. The dropdown will look like this: 

    <img src="https://github.com/BurraAbhishek/Standard-Calculator/blob/main/screenshots/darkmode_all.png" alt="Site-dropdown">
    
3. Select the appropriate option to perform a given task. For example, clicking on "Hide calculation history" will immediately hide your calculation history. 
    To show it again, select "Show calculation history".

NOTE: Clicking outside the dropdown won't hide it! Click the three green bars again to hide it.

## Privacy Policy

1. All operations are performed in the browser. No information is transmitted over the Internet while you're using this app.
2. This application uses browser storage (DOM storage) to store user preferences on light mode and dark mode.
3. When you're saving a calculation history, it downloads a JavaScript file. This file contains an array which stores the timestamp of saving the file and the saved calculations. You can only upload these JavaScript files to load your calculation history. This file is described in the following section:

### The saved calculation history
The calculation history JavaScript file is as follows (The downloaded file is not indented, and everything is in one line):
```
var calc_history_file = {
    "timesaved": // The timestamp when the file was saved
    "history_data": [
    // Each calculation is saved like this: [
        // The original expression,
        // The formatted expression,
        // The result
        ]
    ]
};
```
- [This file](https://github.com/BurraAbhishek/Standard-Calculator/blob/main/sample_saved_calculations/calculation_history_1620392276251.js) is an example of the file which will be downloaded when you're saving calculation history.
- [This file](https://github.com/BurraAbhishek/Standard-Calculator/blob/main/sample_saved_calculations/calculation_history_1620392276251.pretty.js) is a more readable version of the above file.
- [This file](https://github.com/BurraAbhishek/Standard-Calculator/blob/main/sample_saved_calculations/calculation_history_1620392276251.json) is the JSON version of the above file: remove `var calc_history_file = ` at the beginning and `;` at the end of the downloaded file, and save it as a JSON file.

## Testing
This site is tested using [webhint.io](https://webhint.io) for improving the following:
- Accessibility
- Cross-browser compatibility
- Performance
- Security

The test results depend on two factors:
- Site code
- Server configuration

## License
The source code is licensed under the terms of the MIT License, unless mentioned otherwise.

The icons and images used in this web application are licensed under the Creative Commons CC0 License.
