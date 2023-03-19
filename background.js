
const redirectURL = chrome.identity.getRedirectURL(); //'https://canedhcmepdfiipjpagpmmpbbjeidihn.chromiumapp.org/';

const clientId = '652532905857-gek42c9h3b6hev20hpshn72p748c20t0.apps.googleusercontent.com'; // Web Application not CHrome App


async function getToken(){
    const authParams = new URLSearchParams({
        client_id: clientId,
        response_type: 'token',
        redirect_uri: redirectURL,
        scope: ['https://mail.google.com/',"https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/admin.reports.audit.readonly","https://www.googleapis.com/auth/calendar.events.readonly"].join(' '),
      });

      const authURL = `https://accounts.google.com/o/oauth2/auth?${authParams.toString()}`;
    var responseUrl= await chrome.identity.launchWebAuthFlow({ url: authURL, interactive: true });
    const url = new URL(responseUrl);
    const urlParams = new URLSearchParams(url.hash.slice(1));
    const params = Object.fromEntries(urlParams.entries());
    var accessToken = params['access_token'];
    return accessToken;
}


chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    if(message='authorization'){
        getToken().then(sendResponse);
    }
    return true;
});
