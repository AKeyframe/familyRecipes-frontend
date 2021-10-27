import {useState} from 'react';
import { createRecipe } from '../services/recipeService';
import IngredientInput from '../componenets/IngredientInput';


export default function RecipeNew(props) {
    
    const [formState, setFormState] = useState({
        creator: '',
        access: '',
        name: '',
        ingredients: [{ amount: '', ingred: '' }],
        steps: []
    });

    const [numOfI, setNumOfI] = useState([<IngredientInput first='true' handleChange={handleChange}
    key={0}/>]);
   
    const [amount, setAmount] = useState([-1]);
    const [ingred, setIngred] = useState([-1]);

    const [numOfSteps, setNumOfSteps] = useState([]);
    
    console.log('numOfI');
    console.log(numOfI);
    console.log('formstate');
    console.log(formState);
    console.log('amount');
    console.log(amount);
    console.log('ingred');
    console.log(ingred);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(formState);


        createRecipe(formState);
        setFormState({
            creator: '',
            access: '',
            name: '',
            ingredients: [{ amount: '', ingred: '' }],
            steps: []
        });
        props.history.push('/home');

    }

    function handleChange(event) {
        if((event.target.name).split(' ')[0] === 'amount'){
            setAmount(prev => {
                let newArray=[...prev];
                prev.forEach((am, i) => {
                    if((event.target.name).split(' ')[1] == i){
                        newArray[i]=event.target.value;
                    }
                });
               return [...newArray] 
            });
        }

        if((event.target.name).split(' ')[0] === 'ingred'){
            setIngred(prev => {
                let newArray=[...prev];
                prev.forEach((ing, i) => {
                    if((event.target.name).split(' ')[1] == i){
                        newArray[i]=event.target.value;
                    }
                });
               return [...newArray] 
            });
        }
            
            //[(event.target.name).split(' ')[1]] = event.target.value;
        

        setFormState({ ...formState, [event.target.name]: event.target.value });
    }


    function handleAdditionalIngredient() {
        const newArray = [];
        newArray.push(
            <IngredientInput pos={numOfI.length} key={numOfI.length} handleRemoveIngredient={handleRemoveIngredient}
                handleChange={handleChange}
                setNumOfI={setNumOfI} numOfI={numOfI} />)
        setNumOfI(prevArray => [...prevArray, ...newArray]);

        setAmount(prev => [...prev, -1]);
        setIngred(prev => [...prev, -1]);
    }

    function handleRemoveIngredient(pos) {
        setNumOfI(prev => [...prev.map( (ing, i) => {
            if(pos === i){
                return;
            } else {
               
               return ing; 
            }
        })]);

        setAmount(prev => [...prev.map((am, i) => {
            if(pos === i) {
                return;
            } else {
                return am;
            }
        })]);

        setIngred(prev => [...prev.map((ing, i) => {
            if(pos === i) {
                return;
            } else {
                return ing;
            }
        })]);
    }


    return (
        <div className='recipeNewPage'>
            <div className='background new'>
                <form onSubmit={handleSubmit}>
                    <div className='ingred'>
                        <input type='text' name='name'
                            placeholder='Name' onChange={handleChange} />

                        {numOfI}

                        <button className='plus' type="button" onClick={handleAdditionalIngredient}>+</button>
                    </div>

                    <div className='steps'>
                        <textarea cols="40" rows="5" type="" name='steps[]' placeholder={`Step ${numOfSteps + 1}`} />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}