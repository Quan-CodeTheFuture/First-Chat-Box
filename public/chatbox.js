let input = document.getElementById('myInput');
let list = document.getElementById('list');
input.addEventListener("keyup",getText());

async function renderMessageFirstLaunch(){
    let getAPI = await fetch("/chat/api");    
    let temp = await getAPI.json();
    let arrMessages = []
    let arrRawMessages = temp.messages;
    for (let i = 0; i < arrRawMessages.length;i++){
        arrMessages.push(`
        <div class="d-flex flex-row-reverse">
            <div class="bg-dark text-white p-2">
        <span class="align-middle">${arrRawMessages[i]}</span></div></div>`);
    }
    list.innerHTML = arrMessages.join('');
    input.value = '';
}

renderMessageFirstLaunch();
function getText(){
    return async (event) => {
        if(event.keyCode === 13){
            let getAPI = await fetch("/chat/api");    
            let temp = await getAPI.json();
            let arrMessages = []
            let arrRawMessages = temp.messages;
            for (let i = 0; i < arrRawMessages.length;i++){
                arrMessages.push(`
                <div class="d-flex flex-row-reverse">
                    <div class="bg-dark text-white p-2">
                <span class="align-middle">${arrRawMessages[i]}</span></div></div>`);
            }
            arrRawMessages.push(input.value);
            arrMessages.push(`
                <div class="d-flex flex-row-reverse">
                    <div class="bg-dark text-white p-2">
                <span class="align-middle">${input.value}</span></div></div>`);

            await fetch("/chat/interface",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(arrRawMessages) // body data type must match "Content-Type" header
            })    


            // console.log(await getResponse.json())
            list.innerHTML = arrMessages.join('');
            input.value = '';
        }
    }
}

