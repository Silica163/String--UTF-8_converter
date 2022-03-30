function utf8Checker(hVal){
    if(typeof hVal == 'string'){
        hVal = parseInt(hVal,16);
    }
    var status = {
        0:(hVal&128)==128,
        1:(hVal&64)==64,
        2:(hVal&32)==32,
        3:(hVal&16)==16,
        4:(hVal&8)==8,
        5:(hVal&4)==4,
    };
    return status;
};
function utf8Fomator(hStr){
    var hArr = hStr.split(' '),
    buffer = [],
    utfArr = [],
    countBk = 0;
    for (let id = 0 ; id<hArr.length;id ++){
        if(hArr[id].length > 2){
            var dataArr = bkSlicer(hArr[id],0,2);
            const state = utf8Checker(dataArr[0]);
            utfArr.push(hArr[id]);
            continue;
        }
        const state = utf8Checker(hArr[id]);
        if (countBk > 0) {
            buffer.push(hArr[id]);
            if (countBk == 1) {
                utfArr.push(buffer.join(''));
                buffer = [];
            }
            countBk--;
            continue;
        }
        if (!state[0]) {
            // 0xxx xxxx
            utfArr.push(hArr[id]);
            continue;
        }
        if(state[1]){
            //11xx xxxx
            //110x xxxx
            //1110 xxxx 
            //1111 0xxx
            //1111 10xx
            if(!state[2]){
                buffer.push(hArr[id]);
                countBk = 1;
                continue;
            }
            if(!state[3]){
                buffer.push(hArr[id]);
                countBk = 2;
                continue;
            }
            if(!state[4]){
                buffer.push(hArr[id]);
                countBk = 3;
                continue;
            }
            if(!state[5]){
                buffer.push(hArr[id]);
                countBk = 4;
                continue;
            }
        }
    }
    return utfArr;
};