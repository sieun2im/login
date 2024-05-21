const Username = document.querySelector("#Username");
const UsernameInput = document.querySelector("#Username input");
const Email = document.querySelector("#Email");
const EmailInput = document.querySelector("#Email input");
const Password = document.querySelector("#Password");
const PasswordInput = document.querySelector("#Password input");
const ConfirmPassword = document.querySelector("#ConfirmPassword");
const ConfirmPasswordInput = document.querySelector("#ConfirmPassword input");
const UsernameError = document.querySelector("#errorU");
const EmailError = document.querySelector("#errorE");
const PasswordError = document.querySelector("#errorP");
const ConfirmPasswordError = document.querySelector("#errorC");
const Submit=document.querySelector("#Submit");

const GREENCLASSNAME="green";
const REDCLASSNAME="red";

let 회원정보=[];
const 회원정보KEY="회원정보";

function 유저이름(){
    if (UsernameInput.value !== "") {
        UsernameInput.classList.add(GREENCLASSNAME);
        UsernameInput.classList.remove(REDCLASSNAME);
        UsernameError.innerText = "";
    } else {
        UsernameInput.classList.add(REDCLASSNAME);
        UsernameInput.classList.remove(GREENCLASSNAME);
        UsernameError.innerText = "유저 이름을 입력해주세요.";
    }
}

function 이메일(){
    if (EmailInput.value.includes("@")) {
        let isEmailStored = false;
        const 정보 = localStorage.getItem(회원정보KEY);
        if (정보) {
            const parsed정보 = JSON.parse(정보);
            회원정보 = parsed정보;
            parsed정보.forEach(password => {
                if (EmailInput.value === password.이메일) {
                    isEmailStored = true;
                }
            });
        }

        if (isEmailStored) {
            EmailInput.classList.add(REDCLASSNAME);
            EmailInput.classList.remove(GREENCLASSNAME);
            EmailError.innerText = "이미 저장된 이메일입니다.";
        } else {
            EmailInput.classList.add(GREENCLASSNAME);
            EmailInput.classList.remove(REDCLASSNAME);
            EmailError.innerText = "";
        }
    } else {
        EmailInput.classList.add(REDCLASSNAME);
        EmailInput.classList.remove(GREENCLASSNAME);
        EmailError.innerText = "올바른 이메일을 입력해주세요.";
    }
}

function 비밀번호(){
    if (PasswordInput.value.length >= 8) {
        PasswordInput.classList.add(GREENCLASSNAME);
        PasswordInput.classList.remove(REDCLASSNAME);
        PasswordError.innerText = "";
    } else {
        PasswordInput.classList.add(REDCLASSNAME);
        PasswordInput.classList.remove(GREENCLASSNAME);
        PasswordError.innerText = "비밀번호 양식에 맞춰 입력해주세요.(8자 이상)";
    }
}

function 비밀번호확인(){
    let PI = PasswordInput.value;
    let CI = ConfirmPasswordInput.value;
    if (PI !== CI) {
        ConfirmPasswordInput.classList.add(REDCLASSNAME);
        ConfirmPasswordInput.classList.remove(GREENCLASSNAME);
        ConfirmPasswordError.innerText = "비밀번호가 일치하지 않습니다.";
    } else {
        ConfirmPasswordInput.classList.add(GREENCLASSNAME);
        ConfirmPasswordInput.classList.remove(REDCLASSNAME);
        ConfirmPasswordError.innerText = "";
    }
}

function 정보저장(){
    localStorage.setItem(회원정보KEY,JSON.stringify(회원정보));
}
function storage제작(){
    const 유저이름=UsernameInput.value;
    const 이메일=EmailInput.value;
    const 비밀번호=PasswordInput.value;
    UsernameInput.value="";
    EmailInput.value="";
    PasswordInput.value="";
    ConfirmPasswordInput.value="";
    const 회원정보obj={
        이름:유저이름,
        이메일: 이메일,
        비밀번호: 비밀번호,
        id:Date.now(),
    }
    회원정보.push(회원정보obj);
    정보저장();
    location.reload();//form의 색 없애기 위함
}


function 제출(){
    console.log("제출");
    유저이름();
    이메일();
    비밀번호();
    비밀번호확인();
    setTimeout(() => {//딜레이
    if(UsernameInput.classList.contains(GREENCLASSNAME)){
        if(EmailInput.classList.contains(GREENCLASSNAME)){
            if(ConfirmPasswordInput.classList.contains(GREENCLASSNAME)){
                console.log("확인");
                storage제작();
            }
        }
    }
    }, 500);
    
}

Submit.addEventListener("click",제출);


const 정보=localStorage.getItem(회원정보KEY);

if(정보 !==null){
    const parsed정보=JSON.parse(정보);
    회원정보=parsed정보;
}

