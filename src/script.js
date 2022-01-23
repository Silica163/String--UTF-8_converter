const textIn = document.getElementsByName("textin")[0];

textIn.onchange(
    ()=>update(textIn.value)
);