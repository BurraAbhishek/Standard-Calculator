// The extra code in the basic arithmetic operations
// overcomes JavaScript precision issues in almost all cases

function add(a, b) {
    var c = 0;
    if (a == Math.round(a) && b == Math.round(b)) {
        c = Math.round(a) + Math.round(b);
    } else if (a == Math.round(a)) {
        d = b.toString().split(".")[1].length || 0;
        f = (a + b).toFixed(d);
        c = (f - 1 + 1).toFixed(d);
    } else if (b == Math.round(b)) {
        d = a.toString().split(".")[1].length || 0;
        f = (a + b).toFixed(d);
        c = (f - 1 + 1).toFixed(d);
    } else {
        d = a.toString().split(".")[1].length || 0;
        g = b.toString().split(".")[1].length || 0;
        d > g ? (j = d) : (j = g);
        f = (a + b).toFixed(j);
        c = (f - 2 + 2).toFixed(j);
    }
    return Number(c);
}

function subtract(a, b) {
    var c = 0;
    if (a == Math.round(a) && b == Math.round(b)) {
        c = Math.round(a) - Math.round(b);
    } else if (a == Math.round(a)) {
        d = b.toString().split(".")[1].length || 0;
        f = (a - b).toFixed(d);
        c = (f - 1 + 1).toFixed(d);
    } else if (b == Math.round(b)) {
        d = a.toString().split(".")[1].length || 0;
        f = (a - b).toFixed(d);
        c = (f - 1 + 1).toFixed(d);
    } else {
        d = a.toString().split(".")[1].length || 0;
        g = b.toString().split(".")[1].length || 0;
        d > g ? (j = d) : (j = g);
        f = (a - b).toFixed(j);
        c = (f - 2 + 2).toFixed(j);
    }
    return Number(c);
}

function multiply(a, b) {
    var c = 1;
    if (a == Math.round(a) && b == Math.round(b)) {
        c = a * b;
    } else if (a == Math.round(a)) {
        d = b.toString().split(".")[1].length || 0;
        f = (a * b).toFixed(d);
        c = (f - 1 + 1).toFixed(d);
    } else if (b == Math.round(b)) {
        d = a.toString().split(".")[1].length || 0;
        f = (a * b).toFixed(d);
        c = (f - 1 + 1).toFixed(d);
    } else {
        d = a.toString().split(".")[1].length || 0;
        g = b.toString().split(".")[1].length || 0;
        f = (a * b).toFixed(d + g);
        c = (f - 2 + 2).toFixed(d + g);
    }
    return Number(c);
}

function divide(a, b) {
    if (b == 0) {
        c = "Cannot divide by zero";
    } else {
        c = a / b;
        return c;
    }
}

function modulo(a, b) {
    var c = 1;
    c = a % b;
    return c;
}

// Before we begin calculation, we have to do some pre-processing
// We analyze the string one character at the time,
// and generate the expression array

function calculate(x) {
    a = [];
    b = "";
    for (var i = 0, c; (c = x.charAt(i)); i++) {
        if ("^*/+-×÷(){}[]%".indexOf(c) > -1) {
            if (b == "" && c == "-" && x[i - 1] != ")") {
                b = "-";
            } else {
                a.push(parseFloat(b), c);
                b = "";
            }
        } else {
            b += x.charAt(i);
        }
    }
    if (b !== "") {
        a.push(parseFloat(b));
    }
    var h = a.filter(function (e) {
        return !Number.isNaN(e);
    });
    return splitBracket(h);
}

// This function encloses brackets in separate arrays. 
// Very useful if expressions have nested brackets.

function splitBracket(a) {
    if (a[0] == "+") {
        a.splice(0, 1);
    }
    var b = [];
    var c = [];
    var d = [];
    l = 0;
    g = 0;
    for (var i = 0; i < a.length; i++) {
        if (a[i] == "{" || a[i] == "[") {
            a[i] = "(";
        }
        if (a[i] == "}" || a[i] == "]") {
            a[i] = ")";
        }
    }
    for (var i = 0; i < a.length; i++) {
        if (a[i] == "(") {
            b.push(i);
            l++;
            g++;
            if (a[i + 1] == "+") {
                a.splice(i + 1, 1);
            }
        }
        if (a[i] == ")") {
            f = b.pop() + 1;
            c = a.slice(f, i);
            a[f - 1] = c;
            a.splice(f, c.length + 1);
            a = splitBracket(a);
            l--;
        }
    }
    return a;
}

// The two functions resolve() and solve() solves the given expression array.

// This function solve() evaluates mathematical expressions 
// and returns a solution

function solve(a) {
    try {
        for (i = 0; i < a.length; i++) {
            if (typeof a[i] === "object") {
                x = resolve(a[i]);
            }
        }
        for (i = 0; i < a.length; i++) {
            if (typeof a[i] === "object") {
                x = resolve(a[i]);
            }
        }
        for (i = 0; i < a.length; i++) {
            if (a[i] == "^") {
                q = Math.pow(resolve(a[i - 1]), resolve(a[i + 1]));
                a[i - 1] = q;
                a.splice(i, 2);
            }
        }
        for (i = 0; i < a.length; i++) {
            if (a[i] == "/" || a[i] == "÷") {
                if (
                    typeof a[i + 1] === "undefined" ||
                    typeof a[i + 1] === "null" ||
                    a[i + 1] == 0
                ) {
                    throw "Cannot divide by zero";
                } else {
                    q = divide(resolve(a[i - 1]), resolve(a[i + 1]));
                    a[i - 1] = q;
                    a.splice(i, 2);
                }
            } else if (a[i] == "*" || a[i] == "×") {
                q = multiply(resolve(a[i - 1]), resolve(a[i + 1]));
                if (
                    typeof a[i - 1] === "undefined" ||
                    typeof a[i + 1] === "undefined"
                ) {
                    q = 0;
                }
                a[i - 1] = q;
                a.splice(i, 2);
            } else if (a[i] == "%") {
                q = modulo(resolve(a[i - 1]), resolve(a[i + 1]));
                a[i - 1] = q;
                a.splice(i, 2);
            }
        }
        for (j = 1; j < a.length + 1; j++) {
            for (i = 0; i < 2; i++) {
                if (a[i] == "+") {
                    q = add(resolve(a[i - 1]), resolve(a[i + 1]));
                    a[i - 1] = q;
                    a.splice(i, 2);
                } else if (a[i] == "-") {
                    q = subtract(resolve(a[i - 1]), resolve(a[i + 1]));
                    a[i - 1] = q;
                    a.splice(i, 2);
                }
            }
        }
        return resolve(a);
    } catch (err) {
        if (err != "Cannot divide by zero") {
            err = "Syntax error";
        }
        zeroerror(err);
    }
}

// Sometimes, we get an array or an invalid result as the solution. 
// This function resolves them into valid solutions,
// or generates appropriate errors.

function resolve(a) {
    try {
        if (typeof a === "number") {
            c = a;
        } else if (typeof a === "object") {
            if (a.length == 0) {
                c = 0;
            } else if (a.length == 1) {
                c = resolve(a[0]);
            } else {
                for (var i = 0; i < a.length; i++) {
                    if (typeof (a[i] === "object")) {
                        if (a[i].length == 1) {
                            a[i] = a[i][0];
                        }
                    }
                }
                c = solve(a);
            }
        }
        return c;
    } catch (err) {
        zeroerror("Syntax error");
    }
}
