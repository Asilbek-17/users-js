const loginToken = localStorage.getItem("token");

if(loginToken) {
    window.location.pathname = "/index.html"   
};

const elForm = document.querySelector(".js-form");
const elInpEmail = document.querySelector(".js-inp-email");
const elInpPassword = document.querySelector(".js-inp-password");
const elBtneys = document.querySelector(".btn-koz");

async function loginPost() {
    const elInpPasswordValue = elInpPassword.value.trim();
    try {
        const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                email: "eve.holt@reqres.in",
                password: elInpPasswordValue
            }
            )
        });
        
        const data = await res.json();
        if(data.token) {
            localStorage.setItem("token", data.token);
            window.location.pathname = "/index.html";
        }
        
    } catch (error) {
        console.log(error);
    }
};

elBtneys.addEventListener("mousedown", function(){
    elInpPassword.type = "text"
});

window.addEventListener("mouseup", function(){
    elInpPassword.type = "password"
});

elForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    loginPost()
});