

const URL = "https://the-family-table-backend.herokuapp.com/profile";
//const URL = "http://localhost:4000/profile";


async function getProfile(id){
    const response = await fetch(URL+'/'+id);
    const data = await response.json();
    return data;
}

const getProfileRecipes = async (id) => {
    const response = await fetch(URL+'/'+id+'/recipes');
    const data = await response.json();
    return (data);
  };

const getProfileFamilies = async (id) => {
    const response = await fetch(URL+'/'+id+'/families');
    const data = await response.json();
    return data;
}

const FavoriteARecipe = async (profId, id) => {
    const data = {id: id}
    await fetch(URL + '/' + profId + '/favorite', {
        method: 'PUT',
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
    });
}

const sendFamilyRequest = async (username, id) => {
    const data = {reqType: 'family', from: id, seen: false}
    await fetch(URL+'/'+username+'/recieve-request', {
        method: 'PUT',
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
    });
}

const acceptOrDeclineFamilyReq = async (data) => {
    await fetch(URL+'/request/'+data.profID, {
        method: 'PUT',
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
    });
}

export {
   getProfile,
   getProfileRecipes,
   getProfileFamilies,
   FavoriteARecipe,
   sendFamilyRequest,
   acceptOrDeclineFamilyReq
}