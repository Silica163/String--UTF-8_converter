function Main(){
    Converter.call(this);
    console.dir(this.dataout);

    const select = document.getElementById("selector");
    const textIn = document.getElementsByName("textin")[0];

    this.timeoutId = null;
    textIn.addEventListener("change",this.afterChange.bind(this));
    textIn.addEventListener("input",this.afterChange.bind(this));
    select.addEventListener("change",this.afterChange.bind(this));
    this.setup();
}
Main.prototype.afterChange = function(e){
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.upDate.bind(this), 100);
};

Object.setPrototypeOf(Main.prototype,Converter.prototype);

Main.prototype.setup = function(){
    var txtin = "txtin";
    var choice = "choice";
    var storename = "inputdata";
    this.storevarable = new DataStore(storename);
};

Main.prototype.convert = function(){
    switch (this.choice) {
        case "textToBin": return this.hexToBinary(this.stringToHex(this.datain));
        case "textToHex": return this.stringToHex(this.datain);
        case "hexToText": return this.hexToString(this.datain.split(" "));
        case "hexToBin": return this.hexToBinary(this.datain.split(" "));
        case "binToHex": return this.binaryToHex(this.datain.split(" "));
        case "binToText": return this.hexToString(this.binaryToHex(this.datain.split(' ')));
    }
};

Main.prototype.frSlicer = function(str,len){
    str = str.join('');
    if(!this.choice.startsWith("text")){
        str.replace(" ",'');
    }
    var strout=[];
    var posnow = 0;
    while(true){
        strout.push(str.slice(posnow,posnow+len));
        if(posnow >= str.length){break}
        posnow += len;
    }
    console.log(strout)
    return strout;
};

Main.prototype.fomat =function(){
    if(this.choice == "hexToText"||this.choice =="binToText"){
        return this.convert();
    }else if(this.choice == "hexToBin"||this.choice =="textToBin"){
        return this.frSlicer(this.convert(),8).join(' ');
    }else{
        return this.frSlicer(this.convert(),2).join(' ');
    }
};

Main.prototype.output = function(){
    document.getElementsByTagName("textarea")[1].value = this.fomat();
};

Main.prototype.upDate = function(){
    this.choice = document.querySelector("#selector").value;
    this.datain = document.querySelector("textarea").value;
    this.output();
};