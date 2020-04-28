let input = document.getElementById('myInput');
let list = document.getElementById('list');
input.addEventListener("keyup",getText());

async function launch(){
    let dataMaster = await fetch('/chat/api');
    let dataMasterJson = await dataMaster.json();
    let messages = dataMasterJson.messages;

    let messagesHTML = [];
    for(let i = 0; i < messages.length;i++){
        messagesHTML.push(`
        <div class="d-flex flex-row${messages[i].position}">
            <div class="d-flex flex-column bd-highlight mb-3" style="width:300px">
                <div class="name">${messages[i].email}</div>
                <div class="bg-${messages[i].color_bg} text-${messages[i].color_text} p-2">
                    <span class="align-middle">${messages[i].content}</span>
                </div>
            </div>
        </div>`);
    };
    list.innerHTML = messagesHTML.join('');
}
launch();
setInterval(() => {
    launch();
}, 2000);
function getText(){
    return async (event) => {
        if(event.keyCode === 13){
            // console.log(await getResponse.json())
            let dataMaster = await fetch('/chat/api');
            let dataMasterJson = await dataMaster.json();
            let messages = dataMasterJson.messages;

            let messagesHTML = [];

            if(document.cookie.indexOf(dataMasterJson.id) !== -1){
                messages.push({
                    id:dataMasterJson.id,
                    email:dataMasterJson.email,
                    content:input.value,
                    color_bg:'dark',
                    color_text:'white',
                    position:'-reverse'
                })
            } else {
                messages.push({
                    id:dataMasterJson.id,
                    email:dataMasterJson.email,
                    content:input.value,
                    color_bg:'dark',
                    color_text:'white',
                    position:''
                })

            };

            for(let i = 0; i < messages.length;i++){
                messagesHTML.push(`
                <div class="d-flex flex-row${messages[i].position}">
                    <div class="d-flex flex-column bd-highlight mb-3" style="width:300px">
                        <div class="name">${messages[i].email}</div>
                        <div class="bg-${messages[i].color_bg} text-${messages[i].color_text} p-2">
                            <span class="align-middle">${messages[i].content}</span>
                        </div>
                    </div>
                </div>`);
            };
            
            fetch('/chat/interface',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(messages) // body data type must match "Content-Type" header
            })
            
            
            list.innerHTML = messagesHTML.join('');
            input.value = '';
        }
    }
}

