import { setToken, getUserFromToken, removeToken } from './tokenService';

//const URL = 'https://the-family-table.herokuapp.com/users/'
const URL = "http://localhost:4000/users/";

async function signup(user) {
  return fetch(URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  .then(({token}) => {setToken(token);});
  //or .then(({token}) => token);
}

function getUser(){
    return getUserFromToken();
}

async function login(creds){
    return fetch(URL+'login', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}), //Authorization: `bearer `,
        body: JSON.stringify(creds)
    })
    .then(res => {
        if(res.ok) return res.json();
        throw new Error('Bad Credentials!');
    })
    .then(({token}) => setToken(token));
}


function logout(){
    removeToken(); //tokenServices
}

async function deleteUser(id){
    await fetch(URL+'/'+id, {
      method: "DELETE",
    });
}

export {
    signup,
    login,
    logout,
    getUser,
    deleteUser
  }