const textIn = document.getElementsByName("textin")[0];
const textOut = document.getElementsByName("textout")[0];
const select = document.getElementById("selector");

var txtin = "txtin";
var choice = "choice";
var inputData = new DataStore("inputdata");
function setup() {
    inputData.setup();
}

setTimeout(()=>{},1000);

textIn.value = inputData.get(txtin);
select.value = inputData.get(choice);

function update(value,type){
    console.log(inputData.data[txtin]);
    if(type){
        inputData.set(choice,value);
    }else{
        inputData.set(txtin,value);
    }
};

var timeoutId = null;

textIn.addEventListener("input",
    (e)=>{
        clearTimeout(timeoutId);
        timeoutId = setTimeout(update.bind(this,textIn.value, 0),100);
    }
);

select.addEventListener("change",
    (e)=>{
        clearTimeout(timeoutId);
        timeoutId = setTimeout(update.bind(this,select.value, 1),100);
    }
);

const storedata = ()=>{
    inputData.Update();
}
window.onload = () => {setup};
window.onclose = ()=>{storedata};