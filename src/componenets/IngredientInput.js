export default function IngredientInput(props){
    const amount= `amount[${(props.pos)+1}]`
    const ingred= `ingredients[${(props.pos)+1}].ingred`

    const checkFirst = props.first === 'true' ? <></> : <button onClick={() => props.handleRemoveIngredient(props.pos)} type='button'>-</button>
       

    return(
        <div>
            <input type='text' name={amount} 
                onChange={props.handleChange} placeholder='#'/>

            <input type='text' name={ingred}
                onChange={props.handleChange} placeholder='Ingredient'/>

            {checkFirst}  
        </div>
    );
}
