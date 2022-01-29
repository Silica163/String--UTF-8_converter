function Main(){
    Converter.call(this);
}

Object.setPrototypeOf(Main.prototype,Converter.prototype);

Main.prototype.upDate = function(){
    this.choice = document.querySelector("#selector").value;
    this.datain = document.querySelector("textarea").value;
    this.next();
}

Main.prototype.convert = function(){
    switch (this.choice) {
        case "textToBin": return this.hexToBinary();
        case "textToHex": '';
        case "hexToText": '';
        case "hexToBin": '';
        case "binToHex": '';
        case "binToText": '';
    }
};

Main.prototype.frSlicer = function(str,len){
    str.replace(" ",'');
    var strout=[];
    var posnow = 0;
    while(true){
        strout.push(str.slice(posnow,posnow+2));
        if(posnow >= str.length){break}
        posnow += 2;
    }
    return strout.join(' ');
}

Main.prototype.fomat =function(){
}