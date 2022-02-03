function Main(){
    // extends Converter
    Converter.call(this);

    const select = document.getElementById("selector");
    const textIn = document.getElementsByName("textin")[0];

    this.toid2 = null;
    this.txtinname = "txtin";
    this.choicename = "choice";
    this.storename = "inputdata";

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
    // load data from localStore
    this.storevarable = new DataStore(this.storename);
    console.log(this.storevarable);
    var selectvar = this.storevarable.get(this.choicename);
    document.querySelector("#selector").value = selectvar==undefined?"textToHex":selectvar;
    document.querySelector("textarea").value = this.storevarable.get(this.txtinname);
    this.afterChange();
};

Main.prototype.convert = function(){
    switch (this.choice) {
        case "textToBin": return this.hexToBinary(this.stringToHex(this.datain));
        case "textToHex": return this.stringToHex(this.datain);
        case "hexToText": return this.hexToString(this.datain.split(" "));
        case "hexToBin": return this.hexToBinary(this.datain.split(" "));
        case "binToHex": return this.binaryToHex(this.datain.split(" "));
        case "binToText": return this.hexToString(this.binaryToHex(this.datain.split(' ')));
        default:return [];
    }
};

Main.prototype.frSlicer = function(str,len){
    if(typeof str == "object"){
        // if length of value less than <len> add 0 at front until it equal to <len>
        // join array to string
        str = str.map(val=>val.length%len==0?val:("0".repeat(len-(val.length%len))+val)).join('');
        // remove space from <str>
        str.replace(" ",'');
    }
    var strout=[];
    var posnow = 0;
    while(true){
        var value = str.slice(posnow,posnow+len);
        strout.push(value);
        if(posnow >= str.length){
            break;
        }
        posnow += len;
    }
    return strout;
};

Main.prototype.fomat =function(){
    if(this.choice == "hexToText"||this.choice =="binToText"){
        // output = text
        return this.convert();
    }else if(this.choice == "hexToBin"||this.choice =="textToBin"){
        // output = binary
        return this.frSlicer(this.convert(),8).join(' ');
    }else{
        // output = hex
        return this.frSlicer(this.convert(),2).join(' ');
    }
};

Main.prototype.output = function(){
    document.getElementsByName("textout")[0].value = this.fomat();
};

Main.prototype.upDate = function(){
    clearTimeout(this.toid2);
    this.choice = document.querySelector("#selector").value;
    this.datain = document.querySelector("textarea").value;
    this.output();
    this.toid2 = setTimeout(this.store.bind(this),5000);
};

Main.prototype.store = function(){
    this.storevarable.set(this.choicename,this.choice);
    this.storevarable.set(this.txtinname,this.datain);
    this.storevarable.Update()}