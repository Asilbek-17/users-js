const loginToken = localStorage.getItem("token");

if(!loginToken) {
    window.location.pathname = "/login.html"   
}

const elUsersList = document.querySelector(".js-list");

function renderUsers(arr, node) {
    arr.forEach(item => {
        node.innerHTML += `
        <li class="user-list">
        <img class="user-img" src="${item.avatar}" width="150" height="150" alt="${item.first_name}">
        <h2 class="fs-5">${item.first_name} ${item.last_name}</h2>
        <a href="mailto:${item.email}">${item.email}</a>
        </li>
        `
    });
};

async function getUsersFromReqResIn() {
    try {
        const res = await fetch("https://reqres.in/api/users?page=1")
        
        const data = await res.json()
        renderUsers(data.data, elUsersList)
    } catch (error) {
        console.log(error);
    }
};

getUsersFromReqResIn()