import {useState, useEffect, useRef} from 'react';
import { createRecipe } from '../services/recipeService';
import IngredientInput from '../componenets/IngredientInput';


export default function RecipeNew(props) {
    
    const [formState, setFormState] = useState({
        creator: '',
        access: '',
        recipeName: '',
        ingredients: [{ amount: '', ingred: '' }],
        steps: []
    });

    const [name, setName] = useState('');
    const [submitForm, setSubmitForm] = useState({});
    const [subTime, setSubTime] = useState(false);
    const bool = useRef(false);

    const [numOfI, setNumOfI] = useState([<IngredientInput first='true' handleChange={handleChange}
    key={0}/>]);
   
    const [amount, setAmount] = useState([-1]);
    const [ingred, setIngred] = useState([-1]);

    const [numOfSteps, setNumOfSteps] = useState([]);

    
    useEffect(() => {
        if(bool.current){
            submit()
        } else {
            bool.current = true;
        }
        }, [subTime]);


    console.log(props);
    console.log('numOfI');
    console.log(numOfI);
    console.log('submitForm');
    console.log(submitForm);
    console.log('formstate');
    console.log(formState);
   

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('================================');
        setFormState(prevForm => {
            let amountArray = [];
            let ingredArray = [];
            let ingredients = [];
            let newForm = {};
      
            setAmount(prevA => {
                prevA.map((am, i) => {
                    if(am === undefined || am === -1){
                        return;
                    } else {
                        amountArray.push(am);
                    }
                });
                console.log(amountArray);

                setIngred(prev => {
                    prev.map((ing, i) => {
                        if(ing === undefined || ing === -1){
                            return;
                        } else {
                            ingredArray.push(ing);
                        }
                    });
                    console.log(ingredArray);


                    for(let i=0; i<amountArray.length; i++){
                        ingredients.push({amount: amountArray[i],
                                            ingred: ingredArray[i]});
                    }
                    
                    newForm = 
                    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
                    console.log(newForm);
                    console.log(prevForm.recipeName);
                    setSubmitForm({
                        creator: props.user.user._id,
                        access: 'private',
                        name: name,
                        ingredients: [...ingredients],
                        steps: []
                    });
                    
                    setSubTime(true);

                    return [...prev];
                }); //Ingred State


                return [...prevA];
            }); // Amount State

            return [newForm];
        }); //Form State
        

        
    }

    async function submit(){
        bool.current = false;
        setSubTime(false);
        createRecipe(submitForm);
        setFormState({
            creator: '',
            access: '',
            name: '',
            ingredients: [{ amount: '', ingred: '' }],
            steps: []
        });
        setSubmitForm({});
       
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

        if(event.target.name === 'recipeName'){
            setName(event.target.value);
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
                        <input type='hidden' name='creator' 
                                value={props.user._id} />
                        <input type='text' name='recipeName'
                            placeholder='Recipe Name' onChange={handleChange} />

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