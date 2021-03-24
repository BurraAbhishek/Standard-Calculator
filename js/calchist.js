// This function creates the BLOB file saving interface.
var savedata = (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    return function(f, t) {
        blob = new Blob([t], {
            type: "octet/stream"
        }),
        url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = f;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

// This function downloads the calculation history locally as a JavaScript file
function download_history() {
    var dt = new Date().getTime();
    var y = {
        "timesaved": dt,
        "history_data": ephst
    }
    var x = "var calc_history_file=";
    x += JSON.stringify(y);
    x += ";";
    var z = "calculation_history_";
    z += dt;
    z += ".js";
    savedata(z, x);
}

// This function uploads the calculation history file for use in this calculator
function upload_history() {
    if (confirm("NOTICE: \n 1. You can choose whether to select the files or to manually type the file URL.\n 2. If you are using Internet Explorer or other older browsers, you have to type the file URL manually. \n 3. Click OK to select files. \n 4. Click Cancel to manually type the file URL. \n 5. To cancel this operation, select Cancel twice.")) {
        var file;
        var s = document.createElement("input");
        s.setAttribute("type", "file");
        s.onchange = function(e) {
            file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                var contents = event.target.result;
                eval(contents);
                if (typeof(calc_history_file) !== "undefined") {
                    var d = calc_history_file["history_data"];
                    for (var i = 0; i < d.length; i++) {
                        ephst.push(d[i]);
                    }
                    gethst();
                }
            }
            reader.readAsText(file);
        }
        s.click();
    } else {
        var t = prompt("Enter the file path. To cancel this operation, select 'Cancel'.");
        if (typeof(t) !== "undefined" && t !== null) {
            var c = document.createElement("script");
            c.src = t;
            c.async = false;
            c.onload = function() {
                loadCalcHistoryFile();
            }
            c.onerror = function() {
                alert("Invalid URL typed. The file must be accessible.");
            }
            document.body.appendChild(c);
        }
    }

}

// Once the file is loaded into the application, load it into the UI
function loadCalcHistoryFile() {
    if (typeof(calc_history_file) !== "undefined") {
        var d = calc_history_file["history_data"];
        for (var i = 0; i < d.length; i++) {
            ephst.push(d[i]);
        }
        gethst();
    }
}