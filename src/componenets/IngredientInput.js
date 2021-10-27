export default function IngredientInput(props){
    let amount= `amount ${(props.pos)}`
    let ingred= `ingred ${(props.pos)}`

    if(props.first === 'true') {
        amount= 'amount 0';
        ingred= 'ingred 0';
    }

    const checkFirst = props.first === 'true' ? <></> : <button className='minus' onClick={() => props.handleRemoveIngredient(props.pos)} type='button'>-</button>
       
    return(
        
        <div className='ingredient'>
            <input className='amInp' type='text' name={amount} 
                onChange={props.handleChange} placeholder='#'/>

            <input className='ingInp' type='text' name={ingred}
                onChange={props.handleChange} placeholder='Ingredient'/>

            {checkFirst}  
        </div>
    );
}
