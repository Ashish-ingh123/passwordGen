
const inputSlider=document.querySelector(".slider");
const lengthDisplay=document.querySelector(".dataLen");
const passwordDisplay=document.querySelector("#data-passworddisplay");
const copyBtn=document.querySelector("#data-copy");
const copyMsg=document.querySelector("data-copyMsg");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#number");
const symbolCheck=document.querySelector("#symbol");
const indicator=document.querySelector("data-indicator");
const genrateBtn=document.querySelector(".genrate-btn")
const allcheckBox=document.querySelectorAll("input[type=checkbox]");
// console.log(allcheckBox);-
// console.log("helo")
let password="";
const symbols="!@#$%^&*()_\+=</>,.|";
let passwordLength=10;
let checkCount=0;
// lengthDisplay.innerHTML=1;
// inputSlider.value=15;
handleSlider();
function handleSlider()
{
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;

    
}
function setIndicator(color)
{
    indicator.style.backgroudColor=color;
    
}
function getRandInteger(min=0,max=10)
{
    let randomNumber=Math.floor(Math.random()*(max-min))+min;
    return randomNumber;
}
// let random=getRandInteger(0,105);
// console.log(random);
// let random=getRandInteger(0,7);
// console.log(random);
//  console.log("hello");
function genrateLowercase()
{
    return String.fromCharCode(getRandInteger(97,123));
}
function genrateUppercase(){
    // return String(fromCharCode(65,91));
    return String.fromCharCode(getRandInteger(65,91));
}
function genrateSymbol()
{
    // return Symbols[getRandInteger(0,symbols.lenght())];
    const randNum=getRandInteger(0,symbols.length);
    // console.log(randNum);
    return symbols.charAt(randNum);
}
// console.log(symbols.charAt(1));
// console.log(genrateSymbol());
// let ransym=genrateSymbol();
// console.log(ransym);
function calStrength()
{
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numberCheck.checked) hasNum=true;
    if(symbolCheck.checked) hasSym=true;
    if(hasLower&&hasLower&&(hasNum||hasSym)&&passwordLength>=8)
    {
        setIndicator("#0f0");
    }
    else if((hasLower||hasUpper)&&
    (hasNum||hasSym)&&passwordLength>=6)
    {
        setIndicator("#ff0");
    }
    else
    {
        setIndicator("0f00");
    }
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}
function shufflePass(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) =>(str += el) );
    return str;
}

function handleCheckoboxChange()
{
    checkCount=0;
    allcheckBox.forEach((checkbox)=>
    {
        if(checkbox.checked)
        checkCount++;
});
if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}
}
allcheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckoboxChange);
})
inputSlider.addEventListener('input',(e)=>
{
    passwordLength=e.target.value;
    handleSlider();
});
// console.log("hello");
copyBtn.addEventListener('click',()=>
{
    if(passwordLength!=0)
    copyContent();
});
genrateBtn.addEventListener('click',()=>{

    if(checkCount==0)
    return;
// console.log("You are in gen btn");
if(passwordLength<checkCount)
{
    passwordLength=checkCount;
    handleSlider();
    
}
// // password="";
// // if(uppercaseCheck.checked)
// // {
    // //     password+=genrateUppercase();
    // // }
    // // if(lowercaseCheck.checked)
    // // {
        // //     password+=genrateLowercase();
        // // }
        // // if(numberCheck.checked)
        // // {
            // //     password+=getRandInteger();
            // // }
            // // if(symbolCheck.checked)
            // // {
                // //     password+=genrateSymbol();
                // // }
                let funcArr=[];
                if(uppercaseCheck.checked)
                funcArr.push(genrateUppercase);
            if(lowercaseCheck.checked)
            funcArr.push(genrateLowercase);
        if(numberCheck.checked)
        funcArr.push(getRandInteger);
    if(symbolCheck.checked)
    funcArr.push(genrateSymbol);


for(let i=0;i<funcArr.length;i++)
{
    // console.log(i);
    password+=funcArr[i]();
}

for(let i=0;i<passwordLength-funcArr.length;i++)
{
    let randI=getRandInteger(0,funcArr.length);
    // console.log(randI);
    // let len=funcArr.length;
    // console.log(len);
    // console.log(getRandInteger(0,funcArr.length));
    password+=funcArr[randI]();
    
}
console.log(password);
password=shufflePass(Array.from(password));
console.log("after suffle");
console.log(password);
passwordDisplay.value=password;
calStrength();
// console.log(funcArr);
});
