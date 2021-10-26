    
const URL = "http://localhost:4000/recipes";

const getRecipes = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    const ret = await data;
    return(ret);
};

const createRecipe = async (recipe) => {

    console.log('==========---------------==================');
    console.log(recipe);
    await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(recipe),
    });
    getRecipes();
};



export {
    getRecipes,
    createRecipe
}