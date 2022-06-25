let messages = [];
const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
promise.then(getMessages);

function getMessages(response){
    messages = response.data;
}

let joinedMessageTemplate = (message) => `<li class="joined"><p><span>${message.time}</span> <strong>${message.from}</strong> ${message.text}</p></li>`

let toAlldMessageTemplate = (message) => `<li class="to-all"><p><span>${message.time}</span> <strong>${message.from}</strong> para <strong>${message.to}:</strong> ${message.text}</p></li>`

let resevedMessageTemplate = (message) => `<li class="reserved"><p><span>${message.time}</span> <strong>${message.from}</strong> reservadamente para <strong>${message.to}:</strong> ${message.text}</p></li>`

function renderMessages(messages){
    let messagesList = document.querySelector('ul');
    messagesList.innerHTML = '';
    for(let i = 0; i < messages.length; i++){
        const message = messages[i]
        if(message.text.toLowerCase() === 'entra na sala...'){
            messagesList.innerHTML += joinedMessageTemplate(message);
        } else if(message.to.toLowerCase() === 'todos'){
            messagesList.innerHTML += toAlldMessageTemplate(message);
        } else if(message.type.toLowerCase() === 'private_message'){
            messagesList.innerHTML += resevedMessageTemplate(message);
        }
    }
}


function enterRoom(){
    let chatRoom = document.querySelector('.texts-screen');
    chatRoom.classList.remove('hidden');
    let entryScreen = document.querySelector('.entry-screen');
    entryScreen.classList.add('hidden');
    renderMessages(messages);
}

function goHome(){
    let chatRoom = document.querySelector('.texts-screen');
    chatRoom.classList.add('hidden');
    let entryScreen = document.querySelector('.entry-screen');
    entryScreen.classList.remove('hidden');
}