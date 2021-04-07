function ExpBySymbol(value) {
    let ret = value;
    let length = ret.length;
    let isPlus = true;
    if (ret.charAt() === '-'){
        ret = ret.substring(1,length);
        length -= 1;
        isPlus =false;
    } 
    // let color = isPlus ?  '#e53935' : '#1e88e5';
    let color = 'white';
    let ans = '';
    if (length >= 9) {
        // 199489230 -> 1억 9948만 9230
        ans += ret.substring(0, ret.length - 9 + 1) + '억 '; // 1억
        ret = ret.substring(ret.length - 9 + 1);
        
    }
    if (length >= 5) {
        // value 99489230
        ans += ret.substring(0, ret.length - 5 + 1) + '만 '; // 9948만
        ret = ret.substring(ret.length - 5 + 1);
    }
    ans+=ret;
    let minus = isPlus ? '' : '-';
    ans = minus+ans;
    return (ans);
}

const parseWonToStr = (won) => {
    if (typeof won == 'number') {
        // won = won - 100000000;
        won = won.toString();
    }
    return won;
};

function SplitByThree(value) {
    if (!value) return 'Something wrong.';
    if (value.length <= 3) return value;
    return (
        SplitByThree(value.substring(0, value.length - 3)) +
        ',' +
        value.substring(value.length - 3, value.length)
    );
}

// * 이전 값과 현재 값을 비교해서
//*  +/-에 맞는 색으로 출력. 값이 같다면 출력하지 않는다.
function showProfit(id , diff) {
    // const asset = document.getElementById();
    // let diff = curValue - bfValue; 
    let result = '';
    
    if (diff === 0) {
        return result;
    }
    const asset = document.getElementById(id);
    if (asset) asset.classList.remove('default');
    
    if(diff > 0) {     // ! 흑자
        if (asset) asset.classList.add('plus');
        result += '+';
    }
    else {                  // ? 적자
        if (asset) asset.classList.add('minus');
    }
    
    
    if (asset) asset.classList.add('blinking');
    setTimeout(function () {
        if (asset) asset.classList.remove('blinking');
        if (asset) asset.classList.remove('plus');
        if (asset) asset.classList.remove('minus');  
        if (asset) asset.classList.add('default');
    }, 700);
    // document.getElementById(id).fadeOut(1000);

    result += ExpBySymbol(parseWonToStr(diff));
    result += ' 원';
    // console.log(result);
    return (result);
}
// {ExpBySymbol(parseWonToStr(myWallet.myCash))}

export {ExpBySymbol, parseWonToStr, SplitByThree ,showProfit};