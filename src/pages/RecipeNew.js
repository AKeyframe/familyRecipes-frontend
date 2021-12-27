import {useState, useEffect, useRef, forwardRef} from 'react';
import { useNavigate } from 'react-router';

//Components
import IngredientInput from '../componenets/IngredientInput';
import StepInput from '../componenets/StepInput';
import { getProfile } from '../services/profileServices';

//Services
import { createRecipe } from '../services/recipeService';
// import { getProfile } from '../services/profileServices';


export default forwardRef(function RecipeNew (props, ref) {
    //Eventually want to rewrite this.
    //For anyone reading this, this was one of my first times really exporing  more than the basic use of state. So while the solution I came up with for what I was doing works, it's obviously very messy. 

    //Probably don't need this
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
    const bool = useRef(false); //wish i found useRef earlier 
    const navigate = useNavigate();
    const width = window.innerWidth;

    //Responsible for the Components associated with Ingredients
    const [numOfI, setNumOfI] = useState([<IngredientInput first='true' handleChange={handleChange} key={0} />]);
   
    //Responsible for the value of each amount/ingred input
    const [amount, setAmount] = useState([-1]);
    const [ingred, setIngred] = useState([-1]);

    //Responsible for the Components associated with Steps
    const [numOfSteps, setNumOfSteps] = useState([<StepInput first='true'       
        name='step 0' key='0' placeholder='Step 1' 
        handleRemoveStep={handleRemoveStep} handleChange={handleChange}/>]);
    
    //Responsible for the value of each step input/textarea
    const [steps, setSteps] = useState([-1]);

    //Checks to see if ready to submit, 
    useEffect(() => {
        if(bool.current){
            submit();
        } else {
            bool.current = true;
        }
        if(amount || ingred){
            
        }
        }, [subTime]);

    
    //This function gets everything ready for submission.
    async function handleSubmit(event) {
        event.preventDefault();

        setSteps(prev => [...prev.map((step, i) => {
            if(step === undefined || step === -1){
                return;
            } else {
                return step;
            }
        })]);

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

                setIngred(prev => {
                    prev.map((ing, i) => {
                        if(ing === undefined || ing === -1){
                            return;
                        } else {
                            ingredArray.push(ing);
                        }
                    });


                    for(let i=0; i<amountArray.length; i++){
                        ingredients.push({amount: amountArray[i],
                                            ingred: ingredArray[i]});
                    }
                    
            
                    setSubmitForm({
                        creator: props.profile._id,
                        access: 'private',
                        name: name,
                        ingredients: [...ingredients],
                        steps: [...steps]
                    });
                    
                    setSubTime(true);

                    return [...prev];
                }); //Ingred State


                return [...prevA];
            }); // Amount State

            return [newForm];
        }); //Form State
        

        
    }

    //Sends the information to the backend
    async function submit(){
        bool.current = false;
        setSubTime(false);
        createRecipe(submitForm).then((value) => {
            props.setUpdate(true);
            setFormState({
                creator: '',
                access: '',
                name: '',
                ingredients: [{ amount: '', ingred: '' }],
                steps: []
            });
            setSubmitForm({});

            navigate('/');
        })
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

        if((event.target.name).split(' ')[0] === 'step'){
            setSteps(prev => {
                let newArray = [...prev];
                prev.forEach((step, i) => {
                    if((event.target.name).split(' ')[1] == i){
                        newArray[i]=event.target.value;
                    }
                });
                return [...newArray];
            });
        }

        if(event.target.name === 'recipeName'){
            setName(event.target.value);
        }
            
            //[(event.target.name).split(' ')[1]] = event.target.value;
        

        setFormState({ ...formState, [event.target.name]: event.target.value });
    }

    //When a + button for ingredients is pushed
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

    //When a + button for steps is pushed
    function handleAdditionalStep(){
        setNumOfSteps(prev => [...prev, 
            <StepInput pos={numOfSteps.length}
                key={numOfSteps.length}
                name={`step ${numOfSteps.length}`}
                placeholder={`Step ${numOfSteps.length+1}`}
                handleChange={handleChange}
                handleRemoveStep={handleRemoveStep}/>]);

        setSteps(prev => [...prev, -1]);
    }

    //When a - button for ingredients is pushed
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

    //When a - button for Steps is pushed
    function handleRemoveStep(pos){
        setNumOfSteps(prev => [...prev.map((step, i) => {
            if(pos === i) {
                return;
            } else {
                return step;
            }
        })]);

        setSteps(prev => [...prev.map((step, i) => {
            if(pos === i) {
                return;
            } else {
                return step;
            }
        })]);
    }
    
    async function updateProfile(){
        props.setProfile(await getProfile(props.user.user.profile));
    }

    const goBack = () => {
        navigate(-1);
    }

    function nav(){
        if(width < 650){
            return(
                <div className='navButtons'>
                    <div onClick={goBack}className='button'>
                        <p>Back</p>
                    </div>
                </div>
            );
        }
    }

    if(props.profile){
        return (
            <div>
               
                <div className='new'>
                     {nav()}
                    <form onSubmit={handleSubmit}>
                        <div className='ingred'>
                            <input type='hidden' name='creator' 
                                    value={props.profile._id} />
                            <h1>Recipe Name</h1>
                            <input  className='rNameInput' type='text'
                                    name='recipeName'                    placeholder='Recipe Name' 
                                    onChange={handleChange} 
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
                        <button style={{
                            width: '150px',
                            height: '40px',
                            
                        }}><h2 style={{margin: '0px'}}>Submit</h2></button>
                    </form>
                </div>
            </div>
            
        );
    } else {
        updateProfile();
        return(<h1>loading...</h1>)
    }
})