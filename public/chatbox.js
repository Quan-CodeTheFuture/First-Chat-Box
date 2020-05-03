let input = document.getElementById('myInput');
let list = document.getElementById('list');
let buttonUpload = document.getElementById('button_upload');
let uploadFileInput = document.getElementById('uploadFile');
let lengthText = 35;
let messagesHTML = [];

async function getUrl(url) {
    let req = await fetch(url);
    let json = await req.json();
    return json
}

input.addEventListener("keyup", getText());
uploadFileInput.addEventListener('change', () => {
    buttonUpload.disabled = false;
})
async function launch() {
    let tempMessages = await getUrl('/chat/api');
    tempMessages = tempMessages.messages;
    if (tempMessages !== [] && tempMessages) {
        messagesHTML = [];
        for (let i = 0; i < tempMessages.length; i++) {
            if (tempMessages[i].content) {
                messagesHTML.push(`
                    <div class="d-flex flex-row${tempMessages[i].pos}">
                        <div class="d-flex flex-column bd-highlight mb-3">
                            <div class="name">${tempMessages[i].username}</div>
                            <div class="bg-dark text-white p-2">
                                <span class="align-middle">${tempMessages[i].content}</span>
                            </div>
                        </div>
                    </div>
                    `
                )
            };
            if (tempMessages[i].imagePath) {
                messagesHTML.push(`
                    <div class="d-flex flex-row${tempMessages[i].pos}">
                        <div class="d-flex flex-column bd-highlight mb-3" style="width:300px">
                            <div class="name">${tempMessages[i].username}</div>
                            <img src="${tempMessages[i].imagePath}" style="width:300px"/>
                        </div>
                    </div>
                    `
                )
            }
        }
    }
    if (messagesHTML !== [] && messagesHTML) {
        list.innerHTML = messagesHTML.join('');
    }
}

launch();
setInterval(() => {
    launch();
}, 2000);

function getText() {
    return async (event) => {
        if (event.keyCode === 13) {
            if (input.value == '') {
                return;
            }
            let text = input.value;
            input.value = '';
            let responseTextChatBox = await fetch('/chat/interface', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text
                }),
            })
            responseTextChatBox = await responseTextChatBox.json();

            let messages = responseTextChatBox.messages;
            messagesHTML = [];
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].content) {
                    messagesHTML.push(`
                        <div class="d-flex flex-row${messages[i].pos}">
                            <div class="d-flex flex-column bd-highlight mb-3">
                                <div class="name">${messages[i].username}</div>
                                <div class="bg-dark text-white p-2">
                                    <span class="align-middle">${messages[i].content}</span>
                                </div>
                            </div>
                        </div>
                        `
                    )
                }
            }

            list.innerHTML = messagesHTML.join('');
        }
    }
}

