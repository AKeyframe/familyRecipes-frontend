import { findRenderedComponentWithType } from "react-dom/test-utils";

    
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
    });
    getRecipes();
};

const deleteRecipe = async (recipe) => {
    console.log(recipe);
    
}



export {
    getRecipes,
    getOneRecipe,
    createRecipe,
    deleteRecipe
}