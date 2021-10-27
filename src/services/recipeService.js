    
const URL = "https://the-family-table.herokuapp.com/recipes";

const getRecipes = async () => {
    const response = await fetch(URL);
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
          "Content-Type": "Application/json",
          'Access-Control-Allow-Origin': '*'
        },
        mode:'no-cors',
        body: JSON.stringify(recipe),
    });
    getRecipes();
};



export {
    getRecipes,
    getOneRecipe,
    createRecipe
}