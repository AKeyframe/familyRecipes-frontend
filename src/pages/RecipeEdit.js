import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { useParams } from 'react-router';

//Components
import IngredientInput from "../componenets/IngredientInput";
import StepInput from '../componenets/StepInput';

//Services
import { getOneRecipe, updateRecipe } from "../services/recipeService";

export default function RecipeEdit(props){

    const [first, setFirst] = useState(false);
    const [rend, setRend] = useState(false);

    const [subData, setSubData] = useState({});
    const [numOfI, setNumOfI] = useState();
    const [numOfSteps, setNumOfSteps] = useState();

    const [amount, setAmount] = useState([]);
    const [ingred, setIngred] = useState([]);
    const [steps, setSteps] = useState();
    
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if(props.focusRecipe && first !== true){
            importIngred();
            importSteps();
        }
        console.log(amount)
        console.log(ingred)
        if(amount.length > 0 && ingred.length > 0){
            renderIngredients();
            renderSteps();
       } 

    }, [props.focusRecipe, amount, ingred, rend, steps]);



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
        
            console.log(data)
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
            console.log(event.target.name)
            console.log(event.target.value);
            setIngred(prev => {
                let array = [...prev];
                array[pos] = event.target.value;
                return array;
            });
        }

        if(type === 'step'){
            console.log(event.target.value)
            setSteps(prev => {
                let array = [...prev];
                array[pos] = event.target.value;
                return array;
            });
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

    function handleSubmit(){

    }

    const goBack = () => {
        navigate(-1);
    }

    const log = () => {
        console.log('Amount')
        console.log(amount)
        console.log('Ingred')
        console.log(ingred)
        console.log('numOfI')
        console.log(numOfI);
        console.log('steps')
        console.log(steps);
        console.log('first')
        console.log(first)
    }

    async function update(){
        props.setFocusRecipe(await getOneRecipe(params.id));
    }

    if(props.focusRecipe){
        return(
            <div>
                <h1>Edit Page</h1>
                <div onClick={goBack} className='button'>
                    <p>Back</p>
                </div>

                <div onClick={log}className='button'>
                    <p>Click for log</p>
                </div>
                
                <div className='background new'>
                    <form> {/*onSubmit={handleSubmit}*/}
                        <div className='ingred'>
                            

                            {numOfI}

                            <button className='plus' type="button" onClick={handleAdditionalIngredient}>+</button>
                        </div>

                        {numOfSteps}
                        
                        <button className="plus" onClick={handleAdditionalStep}type='button'>+</button> <br />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        );
    } else {
        update();
        return <h1>loading...</h1>
    }
}