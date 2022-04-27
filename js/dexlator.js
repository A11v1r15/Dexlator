let elementDexlator = document.createElement("div");
let elementDexlatorFrom = document.createElement("select");
let elementDexlatorTo = document.createElement("select");
let dexlatorTextarea;
let dexlatorDatabase;

function getDatabase(){
    fetch("csv/pokemon.csv")
        .then(response => response.text())
        .then(text => dexlatorDatabase = text)
        .then(() => makeDroplists());
}

function makeDroplists(){
    let fromOptions = [];
    dexlatorDatabase.split("\n")[0].split(",").forEach((element, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.text = element.trim();
        if(!option.text.includes("!")){
            elementDexlatorTo.appendChild(option);
        }
        if(!fromOptions.includes(element.trim().split("_")[0])){
            let option2 = document.createElement("option");
            option2.value = element.trim().split("_")[0];
            option2.text = element.trim().split("_")[0];
            elementDexlatorFrom.appendChild(option2);
            fromOptions.push(element.trim().split("_")[0]);
        }
    });
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
    let fromCode = elementDexlatorFrom.value;
    let to = elementDexlatorTo.value;
    let db = dexlatorDatabase.split("\n").reverse();
    let headers = db.pop().split(",");
    let froms = [];
    headers.forEach((element, index) => {
        if(element.includes(fromCode)){
            froms.push(index);
        }
    })
    froms.forEach((from) => {
        db.forEach((element) => {
            let pokeFrom = element.split(",")[from];
            if(pokeFrom.length > 2){
                pokeFrom = new RegExp('('+pokeFrom+')', 'gi');
                let pokeTo = element.split(",")[to];
                dexlatorTextarea.value = dexlatorTextarea.value.replace(pokeFrom, pokeTo);
            }
        });
    });
}

// ------ Start ------
let elementDexlatorGo = document.createElement("button");
let elementDexlatorClose = document.createElement("a");

elementDexlator.style.position = "absolute"; 
elementDexlator.style.background = "white";
elementDexlatorFrom.style.margin = "10px";
elementDexlatorTo.style.margin = "10px";
elementDexlatorGo.style.margin = "10px";
elementDexlatorClose.style.textDecoration = "none";
elementDexlatorClose.style.margin = "10px";

getDatabase();

elementDexlatorGo.textContent = "Go";
elementDexlatorGo.onclick = () => translate();
elementDexlatorClose.textContent = "X";
elementDexlatorClose.onclick = () => elementDexlator.remove();

elementDexlator.appendChild(elementDexlatorFrom);
elementDexlator.appendChild(elementDexlatorTo);
elementDexlator.appendChild(elementDexlatorGo);
elementDexlator.appendChild(elementDexlatorClose);

document.addEventListener("contextmenu", insertMenu);
window.addEventListener('resize', reportWindowSize);