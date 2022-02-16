const bkSlicer = (str,frstr,sllen) => {
    if(typeof frstr != "string"){frstr = frstr.toString()}
    if(typeof str != "string"){str = str.toString()}
    str = str.split('').reverse().join('');
    str = str.length % sllen == 0 ? str : str + frstr.repeat(sllen - (str.length % sllen));
    var slis = [];
    for (var id = 0;id<str.length;id+=sllen){
        slis.push(str.slice(id,id+sllen));
    }
    slis = slis.reverse().map(
        val=>{
            return val.split('').reverse().join('');
        }
    );
    return slis;
}

function Converter(){}

Converter.prototype.stringToHex = function(str){
    const hexlist = [];
    for (let letter of str){
        var hexvalue = this.uniToUTF_8(letter.codePointAt().toString(16));
        if (hexvalue.length%2 == 0){
            hexvalue = '0'.repeat(hexvalue.length%2)+hexvalue;
        }
        hexlist.push(hexvalue);
    }
    return hexlist;
};

Converter.prototype.hexToString = function(hexlist){
    const lttrList = [];
    for (let hexVal of hexlist){
        var lttr = String.fromCodePoint(parseInt(this.UTF_8ToUni(hexVal),16));
        lttrList.push(lttr);
    }
    return lttrList.join('');
};

Converter.prototype.hexToBinary = function(hexlist){
    const bitlist = [];
    for (let byte of hexlist){
        var bitValue = parseInt(byte,16).toString(2);
        if(bitValue.length%4 !=0 ){
            bitValue = '0'.repeat(4-bitValue.length%4)+bitValue;
        }
        bitlist.push(bitValue);
    }
    return bitlist;
};

Converter.prototype.binaryToHex = function(binlist){
    const hexlist = [];
    for (let byte of binlist){
        var hexVal = parseInt(byte,2).toString(16);
        if(hexVal.length%2 !=0 ){
            hexVal = '0'.repeat(hexVal.length%2)+hexVal;
        }
        hexlist.push(hexVal);
    }
    return hexlist;
};

Converter.prototype.UTF_8ToUni = function(hexval){
    var bina = parseInt(hexval,16).toString(2);
    let sl8 = bkSlicer(bina,0,8);

    sl8[0] = sl8[0].slice(sl8.length);
    for(let ti = 1;ti<sl8.length;ti++){
        sl8[ti] = sl8[ti].slice(2);
    }
    var bitout = sl8.join('');
    var hexout = parseInt(bitout,2).toString(16);
    return hexout;
};

Converter.prototype.uniToUTF_8 = function(hexvalue){;
    var bina = parseInt(hexvalue,16).toString(2);
    var bitlen = bina.length;
    var slStatus = (()=>{
        if(bitlen <= 7){return 1}
        if(bitlen > 7&&bitlen <=11){return 2}
        if(bitlen > 11&&bitlen <=16){return 3}
        if(bitlen > 16&&bitlen <=21){return 4}
    })();
    var stsl = {1:7,2:11,3:16,4:21}
    var prefix = {1:'0',2:'110',3:'1110',4:'11110'}
    var bitlist = '0'.repeat(stsl[slStatus]-bitlen)+bina;
    // slice 6 bit 
    let sl6 = bitlen<8?[bitlist]:bkSlicer(bitlist,'',6);
    for(var id in sl6){
        // add code at front
        if(id==0){
            sl6[id] = prefix[slStatus]+sl6[id];
        }else{
            sl6[id] = '10'+sl6[id];
        }
    }
    var bitout = sl6.join('');
    var hexout = parseInt(bitout,2).toString(16);
    return hexout;

};
