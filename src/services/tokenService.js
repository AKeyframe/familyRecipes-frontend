
function getToken(){
    let token = localStorage.getItem('token');
    if(token){
        //If expired, remove the token
        const payload = JSON.parse(atob(token.split('.')[1]));
        if(payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            token=null;
            //JS returns milliseconds so have to divide by 1000
            //to convert milliseconds for unix time
        }
    }
    return token;
}

function getUserFromToken(){
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}


function setToken(token){
    if(token){
        localStorage.setItem('token', token);

    } else {
        localStorage.removeItem('token', token);
    }
}

function removeToken() {
    localStorage.removeItem('token');
}

export {
    setToken,
    getToken,
    removeToken,
    getUserFromToken
  };