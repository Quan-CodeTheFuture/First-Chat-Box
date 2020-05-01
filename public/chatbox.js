let input = document.getElementById('myInput');
let list = document.getElementById('list');
let buttonUpload = document.getElementById('button_upload');
let uploadfileInput = document.getElementById('uploadfile');

input.addEventListener("keyup", getText());
buttonUpload.addEventListener("click", getFile());

async function getFile() {
    console.log('uploading');
    let data = await fetch('/chat/api');
    let dataJson = await data.json();
    let messages = dataJson.messages;
    if (dataJson.imagePath && dataJson.imagePath !== '') {
        if (document.cookie.indexOf(dataJson.id) !== -1) {
            messages.push({
                id: dataJson.id,
                username: dataJson.username,
                image: dataJson.imagePath,
                color_bg: 'dark',
                color_text: 'white',
                position: '-reverse'
            })
        } else {
            messages.push({
                id: dataJson.id,
                username: dataJson.username,
                image: dataJson.imagePath,
                color_bg: 'dark',
                color_text: 'white',
                position: ''
            })

        }
    }
    fetch('/chat/interface', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(messages) // body data type must match "Content-Type" header
    }).then(a => a.json()).then(value => console.log(value));
}
async function launch() {
    let dataMaster = await fetch('/chat/api');
    let dataMasterJson = await dataMaster.json();
    let messages = dataMasterJson.messages;

    let messagesHTML = [];
    let temp = ``;
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].content && messages[i].content !== '') {
            let width = '';
            if (messages[i].content.length > 30) {
                width = 'style="width:300px"'
            }
            temp = `
            <div class="d-flex flex-row${messages[i].position}">
                <div class="d-flex flex-column bd-highlight mb-3" ${width}>
                    <div class="name">${messages[i].username}</div>
                    <div class="bg-${messages[i].color_bg} text-${messages[i].color_text} p-2">
                        <span class="align-middle">${messages[i].content}</span>
                    </div>
                </div>
            </div>`
        }
        if (messages[i].image && messages[i].image !== '') {
            let path = '../' + messages[i].image
            temp = `
                <div class="d-flex flex-row${messages[i].position}">
                    <div class="d-flex flex-column bd-highlight mb-3" style="width:300px">
                        <div class="name">${messages[i].username}</div>
                        <img src="${path}" style="width:300px"/>
                    </div>
                </div>`;
        }
        messagesHTML.push(temp);
    };
    list.innerHTML = messagesHTML.join('');
}
launch();
setInterval(() => {
    launch();
}, 2000);
function getText() {
    return async (event) => {
        if (event.keyCode === 13) {
            // console.log(await getResponse.json())
            let dataMaster = await fetch('/chat/api');
            let dataMasterJson = await dataMaster.json();
            let messages = dataMasterJson.messages;
            if (document.cookie.indexOf(dataMasterJson.id) !== -1) {
                messages.push({
                    id: dataMasterJson.id,
                    username: dataMasterJson.username,
                    content: input.value,
                    color_bg: 'dark',
                    color_text: 'white',
                    position: '-reverse'
                })
            } else {
                messages.push({
                    id: dataMasterJson.id,
                    username: dataMasterJson.username,
                    content: input.value,
                    color_bg: 'dark',
                    color_text: 'white',
                    position: ''
                })

            };
            fetch('/chat/interface', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(messages) // body data type must match "Content-Type" header
            }).then(a => a.json()).then(value => console.log(value));
            input.value = '';
        }
    }
}

