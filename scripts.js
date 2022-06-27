let messages = [];
let userName;

function requestMessages(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(getMessages);
}

setInterval(requestMessages, 3000)

function getMessages(response){
    messages = response.data;
    renderMessages(messages);
}

let statusMessageTemplate = (message) => `<li class="joined"><p><span>${message.time}</span> <strong>${message.from}</strong> ${message.text}</p></li>`

let toAlldMessageTemplate = (message) => `<li class="to-all"><p><span>${message.time}</span> <strong>${message.from}</strong> para <strong>${message.to}:</strong> ${message.text}</p></li>`

let resevedMessageTemplate = (message) => `<li class="reserved"><p><span>${message.time}</span> <strong>${message.from}</strong> reservadamente para <strong>${message.to}:</strong> ${message.text}</p></li>`

function renderMessages(messages){
    let ul = document.querySelector('ul');
    userName = document.querySelector('.entry-screen input').value;
    ul.innerHTML = '';
    for(let i = 0; i < messages.length; i++){
        const message = messages[i]
        if(message.text.toLowerCase() === 'entra na sala...' || message.text.toLowerCase() === 'sai da sala...' ){
            ul.innerHTML += statusMessageTemplate(message);
        } else if(message.to.toLowerCase() === 'todos'){
            ul.innerHTML += toAlldMessageTemplate(message);
        } else if(message.type.toLowerCase() === 'private_message'){
            if(message.to.toLowerCase() === userName.toLowerCase()){
                ul.innerHTML += resevedMessageTemplate(message);
            }
        }
    }
    const shownMessages = document.querySelectorAll('li');
    const lastMessage = shownMessages[shownMessages.length-1]
    lastMessage.scrollIntoView(); 
}

let idIntervalStatus = 0;

function enterRoom(){
    let chatRoom = document.querySelector('.texts-screen');
    chatRoom.classList.remove('hidden');
    let entryScreen = document.querySelector('.entry-screen');
    entryScreen.classList.add('hidden');
    userName = document.querySelector('.entry-screen input').value;
    const user = {
        name: userName
    }
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user)
    promise.then(requestMessages);
    promise.catch(alertOnlineUser);

    idIntervalStatus = setInterval(() => {
        axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);
    }, 5000);
}

function alertOnlineUser(){
    alert('Já existe um usuário conectado com esse nome')
    goHome();
}
function goHome(){
    let chatRoom = document.querySelector('.texts-screen');
    chatRoom.classList.add('hidden');
    let entryScreen = document.querySelector('.entry-screen');
    entryScreen.classList.remove('hidden');
    clearInterval(idIntervalStatus);
}

function sendMessage(){
    const text = document.querySelector('.typing-box input').value;
    const message = {
        from: userName,
        to: 'Todos',
        text: text,
        type: 'message'
    }
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message);
    promise.then(requestMessages);
    promise.catch(() => {
        window.location.reload();
    });
    document.querySelector('.typing-box input').value = '';
}