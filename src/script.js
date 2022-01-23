const textIn = document.getElementsByName("textin")[0];
const textOut = document.getElementsByName("textout")[0];
const selvalue = document.getElementById("selector");





textIn.addEventListener("change",
    (e)=>update(textIn.value)
);
selvalue.addEventListener("change",
    (e)=>update(selvalue.value)
);