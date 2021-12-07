

//const URL = "https://the-family-table.herokuapp.com/profile";
const URL = "http://localhost:4000/profile";


async function getProfile(id){
    const response = await fetch(URL+'/'+id);
    const data = await response.json();
    console.log(data);
    return data;
}


export {
   getProfile,
}