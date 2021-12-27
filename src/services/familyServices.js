
//const URL = "https://the-family-table.herokuapp.com/families";
const URL = "http://localhost:4000/families";


const createFamily = async (data) => {
    await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify(data),
    })
}

const getOneFamily = async (id) => {
    const response = await fetch(URL+'/'+id);
    const data = await response.json();
    return data;
}

const getFamilyRecipes = async (id) => {
    const response = await fetch(URL+'/'+id+'/recipes');
    const data = await response.json();
    return data;
}

const changeHead = async (id) => {
    await fetch(URL+'/'+id, {
        method: "PUT",
        headers: {"Content-Type": "Application/json",},
        body: JSON.stringify(id) 
    });
}

// const sendFamilyRequest = async (id) => {
//     await fetch(URL+'/'+id+'request')
// }


const deleteFamily = async (id) => {
    await fetch(URL+'/'+id, {
        method: "DELETE",
    });
}

export {
    createFamily,
    deleteFamily,
    changeHead,
    getOneFamily,
    getFamilyRecipes
}