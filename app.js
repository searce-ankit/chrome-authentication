const init = async () => {
    await apiCall();
}

async function apiCall(apiUrl) {

    var token = await chrome.runtime.sendMessage('authorization');
    console.log(token);

    if(apiUrl){
        let headers = {
            method : 'GET',
            async: true,
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }

        fetch(apiUrl, headers)
            .then(res => {
                console.log(res);
            })
            .error(err=>{
                console.log(err);
        });
    }
}

const app = async () => {
    await init();
}
app();