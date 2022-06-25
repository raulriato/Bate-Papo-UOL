function enterRoom(){
    let chatRoom = document.querySelector('.texts-screen');
    chatRoom.classList.remove('hidden');
    let entryScreen = document.querySelector('.entry-screen');
    entryScreen.classList.add('hidden');
}

function goHome(){
    let chatRoom = document.querySelector('.texts-screen');
    chatRoom.classList.add('hidden');
    let entryScreen = document.querySelector('.entry-screen');
    entryScreen.classList.remove('hidden');
}