

//const URL = "https://the-family-table.herokuapp.com/profile";
const URL = "http://localhost:4000/profile";


async function getProfile(id){
    const response = await fetch(URL+'/'+id);
    const data = await response.json();
    console.log(data);
    return data;
}

const getProfileRecipes = async (id) => {
    const response = await fetch(URL+'/'+id+'/recipes');
    const data = await response.json();
    return (data);
  };

const getProfileFamilies = async (id) =>{
    const response = await fetch(URL+'/'+id+'/families');
    const data = await response.json();
    console.log('Families');
    console.log(data);
    return data;
}

export {
   getProfile,
   getProfileRecipes,
   getProfileFamilies,
}