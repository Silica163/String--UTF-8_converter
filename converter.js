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
        var lttr = String.fromCharCode(parseInt(this.UTF_8ToUni(hexVal),16));
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
    var bitlen = bina.length;
    let sl8 = [];
    var slStatus = (()=>{
        if (bina.startsWith('0')||bitlen<=7){return 1}
        if (bina.startsWith('110')){return 2}
        if (bina.startsWith('1110')){return 3}
        if (bina.startsWith('11110')){return 4}
    })();
    sl8.unshift(bina.slice(-8, bina.length));
    for (let by = 1; by < bina.length / 8; by++) {
        sl8.unshift(bina.slice(-8 * (by + 1), -8 * by));
    }
    sl8[0] = sl8[0].slice(sl8.length-1);
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
    let slt = {
        1:function (bina){
            return '0'+('0'.repeat(7-bitlen))+bina;
        },
        2:function (bina){
            var bitlist = '0'.repeat(11-bitlen)+bina;
            var lby = bitlist.slice(-sln[0],bitlist.length);
            var fby = bitlist.slice(0,-7);
            return `110${fby}10${lby}`;
        },
        3:function (bina){
            var bitlist = '0'.repeat(16-bitlen)+bina;
            var lby = bitlist.slice(-sln[0],bitlist.length);
            var mby = bitlist.slice(-sln[1],-sln[0]);
            var fby = bitlist.slice(0,-sln[1]);
            return `1110${fby}10${mby}10${lby}`;
        },
        4:function (bina){
            var bitlist = '0'.repeat(21-bitlen)+bina;
            var lby = bitlist.slice(-sln[0],bitlist.length);
            var mby = bitlist.slice(-sln[1],-sln[0]);
            var mfby = bitlist.slice(-sln[2],-sln[1]);
            var fby = bitlist.slice(0,-sln[2]);
            return `11110${fby}10${mfby}10${mby}10${lby}`;
        },
    };
    var bitout = slt[slStatus](bina);
    var hexout = parseInt(bitout,2).toString(16);
    return hexout;

};