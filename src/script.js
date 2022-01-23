const Converter = require("../converter.js")

const textIn = document.getElementsByname("textin")[0];

textIn.onchange(
    ()=>update(textIn.value)
);