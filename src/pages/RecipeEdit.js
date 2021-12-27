import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router';

//Components
import IngredientInput from "../componenets/IngredientInput";
import StepInput from '../componenets/StepInput';

//Services
import { getOneRecipe, 
         updateRecipe, 
         deleteRecipe } from "../services/recipeService";

import { getProfile } from '../services/profileServices';

export default function RecipeEdit(props){
    //The code is still wonky cause of how I originally did it but this 
    //is a lot cleaner then the recipe new page's nested setStates that I 
    //originally did when first learning react. 

    const [first, setFirst] = useState(false);

    const [numOfI, setNumOfI] = useState(); //Input fields for Amount / Ingred
    const [numOfSteps, setNumOfSteps] = useState(); //Input fields for Steps

    const [name, setName] = useState(); //Recipe name input state
    const [amount, setAmount] = useState([]); //Values for amount input fields
    const [ingred, setIngred] = useState([]); //Values for ingred input fields
    const [steps, setSteps] = useState(); //Values for step input fiedls
    
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        //If the page was loaded set the inital states
        if(props.focusRecipe && first !== true){
            setName(props.focusRecipe.name);
            importIngred();
            importSteps();
        }

        //If the states have been set render the inputs
        if(amount.length > 0 && ingred.length > 0){
            renderIngredients();
            renderSteps();
       } 

    }, [props.focusRecipe, amount, ingred, steps]);


//===========================================================
//                   Import / Render
//===========================================================
    //setAmount and setIngred
    function importIngred(){
        let setA = [];
        let setI = [];
        props.focusRecipe.ingredients.forEach((ing, i) => {
            setA.push(ing.amount);
            setI.push(ing.ingred);
        });

        setAmount(setA);
        setIngred(setI);
    }

    //setSteps
    function importSteps(){
        let stepsArray = [];
        props.focusRecipe.steps.forEach((step, i) => {
            stepsArray.push(step);
        });
        setSteps(stepsArray);
    }

    function renderIngredients(){
        let data = [];
       
            if(!first){
                props.focusRecipe.ingredients.forEach((ing, i) => {
                    if(i === 0){
                        data.push(
                            <IngredientInput 
                                first={'true'}
                                edit={true}
                                pos={i}
                                amValue={ing.amount}
                                ingValue={ing.ingred}
                                amount={amount}
                                ingred={ingred}
                                handleChange={handleChange}
                                handleRemoveIngredient={handleRemoveIngredient}
                                key={i}
                            />
                        );

                    } else{
                        data.push(
                            <IngredientInput 
                                edit={true}
                                pos={i}
                                amValue={ing.amount}
                                ingValue={ing.ingred}
                                amount={amount}
                                ingred={ingred}
                                handleChange={handleChange}
                                handleRemoveIngredient={handleRemoveIngredient}
                                key={i}
                            />
                        );
                    }
                });
            } else {
                if(numOfI){
                    for(let i = 0; i< numOfI.length; i++){
                        if(numOfI[i] !== ''){
                            if(i === 0){
                                data.push(
                                    <IngredientInput
                                        first={'true'} 
                                        edit={true}
                                        pos={i}
                                        amValue={amount[i]}
                                        ingValue={ingred[i]}
                                        amount={amount}
                                        ingred={ingred}
                                        handleChange={handleChange}
                                        handleRemoveIngredient={handleRemoveIngredient}
                                        key={i}
                                    />);
                            } else {
                                data.push(
                                    <IngredientInput 
                                        edit={true}
                                        pos={i}
                                        amValue={amount[i]}
                                        ingValue={ingred[i]}
                                        amount={amount}
                                        ingred={ingred}
                                        handleChange={handleChange}
                                        handleRemoveIngredient={handleRemoveIngredient}
                                        key={i}
                                    />);
                            }
                            
                        } else {
                            data.push('');
                        }
                    }
                }
            }
        
            setNumOfI(data);
         
    }

    function renderSteps(){
        let data = [];
        if(!first){
            props.focusRecipe.steps.forEach((step, i) => {
                if(i === 0){
                    data.push(
                        <StepInput 
                            first={'true'}
                            edit={true}
                            pos={i}
                            stepValue={step}
                            steps={steps}
                            name={`step ${i}`}
                            handleChange={handleChange}
                            handleRemoveStep={handleRemoveStep}
                            key={i}
                        />
                    );
                } else {
                    data.push(
                        <StepInput 
                            edit={true}
                            pos={i}
                            stepValue={step}
                            steps={steps}
                            name={`step ${i}`}
                            handleChange={handleChange}
                            handleRemoveStep={handleRemoveStep}
                            key={i}
                        />
                    );
                }
            });
        } else {
            if(numOfSteps){
                for(let i = 0; i<numOfSteps.length; i++){
                    if(numOfSteps[i] !== ''){
                        if(i === 0){
                            data.push(
                                <StepInput
                                    first={'true'} 
                                    edit={true}
                                    pos={i}
                                    stepValue={steps[i]}
                                    steps={steps}
                                    name={`step ${i}`}
                                    handleChange={handleChange}
                                    handleRemoveStep={handleRemoveStep}
                                    key={i}
                                />
                            );


                        } else {
                            data.push(
                                <StepInput 
                                    edit={true}
                                    pos={i}
                                    stepValue={steps[i]}
                                    steps={steps}
                                    name={`step ${i}`}
                                    handleChange={handleChange}
                                    handleRemoveStep={handleRemoveStep}
                                    key={i}
                                />
                            );
                        }
                    } else {
                        data.push('');
                    }
                }
            }
        }

        setNumOfSteps(data);
        if(!first) setFirst(true);
    }

//===========================================================
//                         handles
//===========================================================

    function handleChange(event){
        let type = (event.target.name).split(' ')[0];
        let pos = event.target.name.split(' ')[1];

        if(type === 'amount'){
            setAmount(prev => {
                let array = [...prev];
                array[pos] = event.target.value;
                return array;
            });
        }

        if(type === 'ingred'){
            setIngred(prev => {
                let array = [...prev];
                array[pos] = event.target.value;
                return array;
            });
        }

        if(type === 'step'){
            setSteps(prev => {
                let array = [...prev];
                array[pos] = event.target.value;
                return array;
            });
        }

        if(event.target.name === 'recipeName'){
            setName(event.target.value)
        }
    }

    function handleAdditionalIngredient(){
        setAmount(prev => [...prev, '']);
        setIngred(prev => [...prev, '']);
        setNumOfI(prev => [...prev, 
            <IngredientInput 
                edit={true}
                pos={prev.length}
                amValue={''}
                ingValue={''}
                amount={amount}
                ingred={ingred}
                handleChange={handleChange}
                handleRemoveIngredient={handleRemoveIngredient}
                key={prev.length}
            />
        ]);
    }

    function handleAdditionalStep(){
        setSteps(prev => [...prev, '']);
        setNumOfSteps(prev => [...prev,
            <StepInput 
                edit={true}
                pos={prev.length}
                stepValue={''}
                steps={steps}
                name={`step ${prev.length}`}
                handleChange={handleChange}
                handleRemoveStep={handleRemoveStep}
                key={prev.length}
            />
        ]);
    }

    function handleRemoveIngredient(pos){
        setNumOfI(prev => {
            let array = [...prev];
            array[pos] = '';
            return array;
        });

        setAmount(prev => {
            let array = [...prev];
            array[pos] = '';
            return array;
        });

        setIngred(prev => {
            let array = [...prev];
            array[pos] = '';
            return array; 
        });
    }

    function handleRemoveStep(pos){
        setNumOfSteps(prev => {
            let array = [...prev];
            array[pos] = '';
            return array;
        });

        setSteps(prev => {
            let array = [...prev];
            array[pos] = '';
            return array;
        });
    }

    function handleSubmit(event){
        event.preventDefault();

        let am = [...amount];
        let ing = [...ingred];
        let stepsArray = [...steps];
        let filteredSteps = [];
        let ingredientsArray = [];

        for(let i = 0; i < amount.length; i++){
            if(am[i] !== '' && ing[i] !== ''){
                ingredientsArray.push(
                    {
                        amount: am[i],
                        ingred: ing[i]
                });
            }
        }

        stepsArray.forEach((s, i) => {
            if(s !== ''){
                filteredSteps.push(s);
            }
        });


        let data = {
            name: name,
            ingredients: [...ingredientsArray],
            steps: [...filteredSteps]
        };
      

        updateRecipe(data, params.id).then(async () => {
            setFirst(false);

            props.setFocusRecipe(await getOneRecipe(params.id));
            navigate(`/recipes/${params.id}`);
        });
    }

    async function handleDelete(){
        deleteRecipe(params.id);
        navigate("/");
        props.setProfile(await getProfile(props.userState.user.profile));
    }

//===========================================================
//                     Essentials / Return
//===========================================================

    const goBack = () => {
        navigate(-1);
    }

    async function update(){
        props.setFocusRecipe(await getOneRecipe(params.id));
    }

    if(props.focusRecipe){
        return(
            <div>
                <div className='navButtons'>
                    <div onClick={goBack} className='button'>
                        <p>Back</p>
                    </div>

                    <div onClick={handleDelete} className='button'>
                        <p>Delete</p>
                    </div>
                </div>
                
                
                <div className='background new'>
                    <form> {/*onSubmit={handleSubmit}*/}
                        <div className='ingred'>
                            <h1>Recipe Name</h1>
                            <input  type='text' name='recipeName'
                                    placeholder='Recipe Name'
                                    value={name} 
                                    onChange={handleChange}
                                    className='rNameInput'
                            />

                            <div id='editTH' className='inline'>
                                <h3>Amount</h3>
                                <h3>Ingredient</h3>
                                <div style={{width: '60px'}}></div>
                            </div>
                            {numOfI}

                            <button className='plus' type="button" onClick={handleAdditionalIngredient}>+</button>
                        </div>
                        <h3>Instructions</h3>
                        {numOfSteps}
                        
                        <button className="plus" onClick={handleAdditionalStep}type='button'>+</button> <br />
                        <button onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        );
    } else {
        update();
        return <h1>loading...</h1>
    }
}