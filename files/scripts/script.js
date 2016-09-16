const domain = "https://vaisselle-vrn.github.io/";
const path = domain + "files/blocks/";

function setFlags() {
    const countries = document.getElementsByClassName("card-country");
    for (let i = 0; i != countries.length; i++) {
        const country = countries[i];
        const name = country.dataset.country.toLowerCase();
        const flag = domain + "files/img/flags/" + name + ".png";
        countries[i].style.backgroundImage = "url(" + flag + ")";
    }
}

function loadFile(path, file, callback = () => {}) {
    let xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();        
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", path + file, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (file.indexOf("skeleton") != -1)
            { 
                document.body.innerHTML += this.responseText;
            }
            else {
                document.querySelector("head").innerHTML += this.responseText;
            }
            callback();
        }
    };
}

function forIE() {
    document.createElement("header");
    document.createElement("nav");
    document.createElement("main");
    document.createElement("aside");
    document.createElement("footer");
}

loadFile(path, "head.html", () => loadFile(path, "skeleton.html"));
window.onload = function() {
    forIE();
    setFlags();
}