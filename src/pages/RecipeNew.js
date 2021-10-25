import {useEffect, useState} from 'react';
import { createRecipe } from '../services/recipeService';
import IngredientInput from '../componenets/IngredientInput';

export default function RecipeNew(props){

    const [formState, setFormState] = useState({ 
        creator: '',
        access: '',
        name: '',
        ingredients: [{amount: '', ingred: ''}],
        steps: []
    });

    const [numOfI, setNumOfI] = useState([]);
    useEffect(() => setNumOfI([
        <IngredientInput first='true' onChange={handleChange} 
        key={0} setNumOfI={setNumOfI} numOfI={numOfI}/>]), []);
    
    const [numOfSteps, setNumOfSteps] = useState([]);

    console.log(numOfI);

    async function handleSubmit(event){
        event.preventDefault();       
        console.log(formState);
        

        createRecipe(formState);
        setFormState({
            creator: '',
            access: '',
            name: '',
            ingredients: [{amount: '', ingred: ''}],
            steps: []
        });
        props.history.push('/home');

    }

    function handleChange(event){
        console.log(event.target)
        setFormState({...formState, [event.target.name]: event.target.value});
    }


    function handleAdditionalIngredient(){
       
        const newArray = [];
        newArray.push(
            <IngredientInput pos={numOfI.length} key={numOfI.length} handleRemoveIngredient={handleRemoveIngredient} 
            handleChange={handleChange}
            setNumOfI={setNumOfI} numOfI={numOfI}/>)
        setNumOfI(prevArray => [...prevArray, ...newArray]);
        
        
        console.log('numOfI');
        console.log(numOfI);
        
    }

    function handleRemoveIngredient(pos){
        const newArray = [];
        
        console.log('numOfI before removal');
        console.log(numOfI)
        console.log('Pos Removed')
        console.log(pos)
        console.log('---------------')

        numOfI.forEach((ing, i) => {
            console.log('Ingred:')
            console.log(ing);
            console.log(' ');

            if(pos === i){
                return;
            } else{
                newArray.push(ing);
            }
            
            
        });
        console.log('================')
        console.log('New Array')
        console.log(newArray)
        setNumOfI([...newArray])
        console.log('Num Of I')
        console.log(numOfI)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className='ingred'>
                    <input type='text' name='name' 
                    placeholder='Name' onChange={handleChange} />

                    {numOfI}

                    <button type="button" onClick={handleAdditionalIngredient}>+</button>
                </div>

                <div className='steps'>
                    <input type="text" name='steps[]' placeholder={`Step ${numOfSteps+1}`}/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}