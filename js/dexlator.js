let elementDexlator = document.createElement("div");
let elementDexlatorFrom = document.createElement("select");
let elementDexlatorTo = document.createElement("select");
let dexlatorTextarea;
let dexlatorDatabase;

function getDatabase(){
    fetch("csv/pokemon.csv")
        .then(response => response.text())
        .then(text => dexlatorDatabase = text.trim())
        .then(() => makeDroplists());
}

function makeDroplists(){
    let fromOptionElements = [];
    let toOptionElements = [];
    dexlatorDatabase.split("\n")[0].split(",").forEach((element, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.text = element.trim();
        toOptionElements.push(option);
        let option2 = document.createElement("option");
        option2.value = index;
        option2.text = element.trim();
        fromOptionElements.push(option2);
    });
    fromOptionElements.sort((a, b) => {
        if (a.text.toUpperCase() > b.text.toUpperCase())
            return 1;
        else if (a.text.toUpperCase() < b.text.toUpperCase())
            return -1;
        else
            return 0;
    });
    toOptionElements.sort((a, b) => {
        if (a.text.toUpperCase() > b.text.toUpperCase())
            return 1;
        else if (a.text.toUpperCase() < b.text.toUpperCase())
            return -1;
        else
            return 0;
    });
    fromOptionElements.forEach(element => {
        elementDexlatorFrom.appendChild(element);
    })
    toOptionElements.forEach(element => {
        elementDexlatorTo.appendChild(element);
    })
}

function insertMenu(){
    element = document.activeElement;
    if(element.tagName && element.tagName.toLowerCase() == "textarea"){
        dexlatorTextarea = element;
        elementDexlator.style.left = element.getBoundingClientRect().left + "px";
        elementDexlator.style.top  = element.getBoundingClientRect().bottom + "px";
        document.body.appendChild(elementDexlator);
    }
}

function reportWindowSize(){
    if(dexlatorTextarea != null){
        elementDexlator.style.left = dexlatorTextarea.getBoundingClientRect().left + "px";
        elementDexlator.style.top  = dexlatorTextarea.getBoundingClientRect().bottom + "px";
    }
}

function translate(){
    let from = elementDexlatorFrom.value;
    let to = elementDexlatorTo.value;
    let db = dexlatorDatabase.split("\n")
    db.pop().split(",");
    db.sort((a, b) => b.split(",")[from].length - a.split(",")[from].length);
    db.forEach((element) => {
        let pokeFrom = element.split(",")[from].trim();
        if(pokeFrom.length > 0){
            pokeFrom = new RegExp('('+pokeFrom+')', 'gi');
            let pokeTo = element.split(",")[to].trim();
            if(pokeTo.length > 0){
                dexlatorTextarea.value = dexlatorTextarea.value.replace(pokeFrom, pokeTo);
            }
        }
    });
}

// ------ Start ------
let elementDexlatorGo = document.createElement("button");
let elementDexlatorClose = document.createElement("a");

elementDexlator.style.position = "absolute"; 
elementDexlator.style.background = "white";
elementDexlatorFrom.ariaLabel = "From";
elementDexlatorFrom.style.margin = "5px";
elementDexlatorTo.ariaLabel = "To";
elementDexlatorTo.style.margin = "5px";
elementDexlatorGo.style.margin = "5px";
elementDexlatorClose.style.textDecoration = "none";
elementDexlatorClose.style.margin = "5px";

getDatabase();

elementDexlatorGo.textContent = "Go";
elementDexlatorGo.type = "button";
elementDexlatorGo.onclick = () => translate();
elementDexlatorClose.textContent = "✖";
elementDexlatorClose.onclick = () => elementDexlator.remove();

elementDexlator.appendChild(elementDexlatorFrom);
elementDexlator.appendChild(elementDexlatorTo);
elementDexlator.appendChild(elementDexlatorGo);
elementDexlator.appendChild(elementDexlatorClose);

document.addEventListener("contextmenu", insertMenu);
window.addEventListener('resize', reportWindowSize);