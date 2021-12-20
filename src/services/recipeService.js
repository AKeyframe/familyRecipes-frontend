    
//const URL = "https://the-family-table.herokuapp.com/recipes";
const URL = "http://localhost:4000/recipes";

const getRecipes = async () => {
    const response = await fetch(URL+'/results'); 
    const data = await response.json();
    const ret = await data;
    return(ret);
};


const getOneRecipe = async (id) => {
    const response = await fetch(URL+'/'+id);
    const data = await response.json();
    const ret = await data;
    return(ret);
}

const createRecipe = async (recipe) => {
    await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify(recipe),
    })
    
};

const deleteRecipe = async (id) => {
    await fetch(URL+'/'+id, {
        method: "DELETE",
    });
    
}

const updateRecipe = async (data, id) => {
    console.log(data);
    await fetch(URL +'/'+ id, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
    });
}



export {
    getRecipes,
    getOneRecipe,
    createRecipe,
    deleteRecipe,
    updateRecipe
}