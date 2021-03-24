function toggledarkmode(){
    if(typeof(Storage)!=="undefined"){
        if(!localStorage.calccolormode){
            var d = new Date();
            //Initially toggle light and dark mode based on time. Light mode between 6 A.M. and 6 P.M.
            if(d.getHours()>=6&&d.getHours()<18){
                localStorage.setItem("calccolormode","Default");
            }else{
                localStorage.setItem("calccolormode","Dark");
            }
        }
        //Toggle light and dark mode based on user preferences
        var x = localStorage.getItem("calccolormode");
        if(x=="Default"){
            default_color_mode();
        }else if(x=="Dark"){
            dark_color_mode();
        }
    }
}

//Default color setting
function default_color_mode() {
    var a = document.getElementsByClassName("appbar");
    for (var i = 0; i < a.length; i++) {
        a[i].style.backgroundColor = "#FF0000";
        a[i].style.color = "#00FFFF";
    }
    var c = document.getElementsByClassName("calcbutton");
    for (var i = 0; i < c.length; i++) {
        c[i].style.backgroundColor = "#00FF00";
        c[i].style.color = "initial";
    }
    var ha = document.getElementsByTagName("h1");
    for (var i = 0; i < ha.length; i++) {
        ha[i].style.backgroundColor = "#3399FF";
        ha[i].style.color = "#CCFFEE";
    }
    var hb = document.getElementsByTagName("h2");
    for (var i = 0; i < hb.length; i++) {
        hb[i].style.backgroundColor = "#3399FF";
        hb[i].style.color = "#CCFFEE";
    }
    var hs = document.getElementsByClassName("histtablevalues");
    for (var i = 0; i < hs.length; i++) {
        hs[i].style.backgroundColor = "#FFFFFF";
        hs[i].style.color = "#000000";
    }
    document.getElementById("myresult").style.backgroundColor = "initial";
    document.getElementById("myresult").style.color = "initial";
    document.body.style.backgroundColor = "transparent";
}

//Dark mode color setting
function dark_color_mode() {
    var a = document.getElementsByClassName("appbar");
    for (var i = 0; i < a.length; i++) {
        a[i].style.backgroundColor = "#111111";
        a[i].style.color = "#FF0000";
    }
    var c = document.getElementsByClassName("calcbutton");
    for (var i = 0; i < c.length; i++) {
        c[i].style.backgroundColor = "#0000FF";
        c[i].style.color = "#CCFFEE";
    }
    var ha = document.getElementsByTagName("h1");
    for (var i = 0; i < ha.length; i++) {
        ha[i].style.backgroundColor = "#1122AA";
        ha[i].style.color = "#CCFFEE";
    }
    var hb = document.getElementsByTagName("h2");
    for (var i = 0; i < hb.length; i++) {
        hb[i].style.backgroundColor = "#1122AA";
        hb[i].style.color = "#CCFFEE";
    }
    var hs = document.getElementsByClassName("histtablevalues");
    for (var i = 0; i < hs.length; i++) {
        hs[i].style.backgroundColor = "#000000";
        hs[i].style.color = "#FFFFFF";
    }
    document.getElementById("myresult").style.backgroundColor = "#000000";
    document.getElementById("myresult").style.color = "#FF0000";
    document.body.style.backgroundColor = "#777777";
}

toggledarkmode();
