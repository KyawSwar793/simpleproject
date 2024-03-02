let num = 0;
let display="";
let temp = 0;
let numArr=[];
let operatorArr=[];
let openParen=0;
let closeParen=0;
let isDecimal=false;
let decimalMultiplier=10;

const text = document.getElementById("text");
const sout = document.getElementById("sout");
const sout1 = document.getElementById("sout1");
const excludedItems = new Set(['C','=','(',')']);

function calculate(item){

    if(item=='='){
        for(let i=0; i<display.length;i++){
            if(!isNaN(parseInt(display.charAt(i),10))){
                if(!isDecimal){
                    temp*=10;
                    temp+=parseInt(display.charAt(i),10);
                }
                else{
                    temp+=parseInt(display.charAt(i),10)/decimalMultiplier;
                    decimalMultiplier*=10;
                }

                if(i==display.length-1 || isNaN(display.charAt(i+1))){
                    if(display.charAt(i+1)!='.'){
                    numArr[numArr.length]=temp;
                    temp=0;
                    }
                }
            }
            else if(display.charAt(i)=='.'){
                isDecimal=true;
            }
            else{
                operatorArr[operatorArr.length]=display.charAt(i);
                if(display.charAt(i)=='(')
                numArr[numArr.length]=9973.37;
                if(display.charAt(i)==')')
                numArr[numArr.length]=9973.73;
                isDecimal=false;
                decimalMultiplier=10;
            }
        }

        let result;
        while(operatorArr.indexOf(')') != -1){
            let first=0;
            let last=0;
            for(let i=0;i<operatorArr.length;i++){
                if(operatorArr[i]=='('){
                    first=i;
                }else if(operatorArr[i]==')'){
                    last=i;
                    break;
                }
            }
            for(let i=first+1;i<last;i++){
                if(operatorArr[i]=='x' || operatorArr[i]=='%' || operatorArr[i]=='/') {
                    if(operatorArr[i]=='x')
                        result = numArr[i] * numArr[i+1];
                    if(operatorArr[i]=='/')
                        result = numArr[i] / numArr[i+1];
                    if(operatorArr[i]=='%')
                        result = numArr[i] % numArr[i+1];
                    numArr[i]=result;
                    numArr.splice(i+1,1);
                    operatorArr.splice(i,1);
                    i--;
                    last--;
                }
            }
            for(let i=first+1;i<last;i++){
                if(operatorArr[i]=='+' || operatorArr[i]=='-') {
                    if(operatorArr[i]=='+')
                        result = numArr[i] + numArr[i+1];
                    if(operatorArr[i]=='-')
                        result = numArr[i] - numArr[i+1];
                    numArr[i]=result;
                    numArr.splice(i+1,1);
                    operatorArr.splice(i,1);
                    i--;
                    last--;
                }
            }
            operatorArr.splice(first,1);
            operatorArr.splice(last-1,1);
            numArr.splice(first,1);
            numArr.splice(last,1);
            // sout1.innerText+=`\nNumbers: [${numArr.join(', ')}]`+`\nOperators: [${operatorArr.join(', ')}]`+" "+closeParen;
        }
        
        numArr = numArr.filter(num => num !== 9973.37);

        operatorArr = operatorArr.filter(operator => operator !== '(');
        
        sout1.innerText+=`\nNumbers: [${numArr.join(', ')}]`+`\nOperators: [${operatorArr.join(', ')}]`+" "+closeParen;

        for(let i=0;i<operatorArr.length;i++){
            if(operatorArr[i]=='x' || operatorArr[i]=='%' || operatorArr[i]=='/') {
                if(operatorArr[i]=='x')
                    result = numArr[i] * numArr[i+1];
                if(operatorArr[i]=='/')
                    result = numArr[i] / numArr[i+1];
                if(operatorArr[i]=='%')
                    result = numArr[i] % numArr[i+1];
                numArr[i]=result;
                numArr.splice(i+1,1);
                operatorArr.splice(i,1);
                i--;
            }
        }
        // sout.innerText=`\nNumbers: [${numArr.join(', ')}]`+`\nOperators: [${operatorArr.join(', ')}]`;
        for(let i=0;i<operatorArr.length;i++){
            if(operatorArr[i]=='+' || operatorArr[i]=='-') {
                if(operatorArr[i]=='+')
                    result = numArr[i] + numArr[i+1];
                if(operatorArr[i]=='-')
                    result = numArr[i] - numArr[i+1];
                numArr[i]=result;
                numArr.splice(i+1,1);
                operatorArr.splice(i,1);
                i--;
            }
        }
        text.innerText=numArr;
        if(display=="")text.innerText="0";
        display="";
    }


    else if(display.length==0 && isNaN(item) && !excludedItems.has(item)){
        text.innerText="Invalid format used";
    }
    else if(isNaN(item) && isNaN(display.charAt(display.length-1)) && !excludedItems.has(item) && display.charAt(display.length-1) != ')'){
        
    }
    else if(item=='C'){
        display="";
        text.innerText="0"
        numArr.splice(0, numArr.length);
        operatorArr.splice(0, operatorArr.length);
        openParen=0;
        closeParen=0;
    }
    else if(((!isNaN(display.charAt(display.length-1))&&item=="(") || (display.charAt(display.length-1)==')'&&!isNaN(item)))&&display.length!=0){

    }
    else if(item==')' && (closeParen==openParen||closeParen>openParen)){

    }
    else{
        display+=item;
        text.innerText=display;
        if(item=='(')openParen++;
        if(item==')')closeParen++;
    }
}