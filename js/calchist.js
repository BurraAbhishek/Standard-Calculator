// This function creates the BLOB file saving interface.
var savedata = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    return function (f, t) {
        (blob = new Blob([t], {
            type: "octet/stream",
        })),
            (url = window.URL.createObjectURL(blob));
        a.href = url;
        a.download = f;
        a.click();
        window.URL.revokeObjectURL(url);
    };
})();

// This function downloads the calculation history locally as a JavaScript file
function download_history() {
    var time_stamp = new Date().getTime();
    var y = {
        timesaved: time_stamp,
        history_data: calculation_history_object,
    };
    var filedata = "var calc_history_file=";
    filedata += JSON.stringify(y);
    filedata += ";";
    var filename = "calculation_history_";
    filename += time_stamp;
    filename += ".js";
    savedata(filename, filedata);
}

// This function uploads the calculation history file for use in this calculator
function upload_history() {
    if (
        confirm(
            "NOTICE: \n 1. You can choose whether to select the files or to manually type the file URL.\n 2. If you are using Internet Explorer or other older browsers, you have to type the file URL manually. \n 3. Click OK to select files. \n 4. Click Cancel to manually type the file URL. \n 5. To cancel this operation, select Cancel twice."
        )
    ) {
        var file;
        var fileinput = document.createElement("input");
        fileinput.setAttribute("type", "file");
        fileinput.onchange = function (e) {
            file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (event) {
                var contents = event.target.result;
                eval(contents);
                if (typeof calc_history_file !== "undefined") {
                    var filecontents = calc_history_file["history_data"];
                    for (var i = 0; i < filecontents.length; i++) {
                        calculation_history_object.push(filecontents[i]);
                    }
                    get_calculation_history();
                }
            };
            reader.readAsText(file);
        };
        fileinput.click();
    } else {
        var filepath = prompt(
            "Enter the file path. To cancel this operation, select 'Cancel'."
        );
        if (typeof filepath !== "undefined" && filepath !== null) {
            var calc_datascript = document.createElement("script");
            calc_datascript.src = filepath;
            calc_datascript.async = false;
            calc_datascript.onload = function () {
                loadCalcHistoryFile();
            };
            calc_datascript.onerror = function () {
                alert("Invalid URL typed. The file must be accessible.");
            };
            document.body.appendChild(calc_datascript);
        }
    }
}

// Once the file is loaded into the application, load it into the UI
function loadCalcHistoryFile() {
    if (typeof calc_history_file !== "undefined") {
        var d = calc_history_file["history_data"];
        for (var i = 0; i < d.length; i++) {
            calculation_history_object.push(d[i]);
        }
        get_calculation_history();
    }
}
