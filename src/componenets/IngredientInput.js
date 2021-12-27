export default function IngredientInput(props){
    let amount= `amount ${(props.pos)}`
    let ingred= `ingred ${(props.pos)}`

    if(props.first === 'true') {
        amount= 'amount 0';
        ingred= 'ingred 0';
    }

    const checkFirst = props.first === 'true' ? <div style={{width: '48px'}}></div> : <button className='minus' onClick={() => props.handleRemoveIngredient(props.pos)} type='button'>-</button>
    
    if(!props.edit){
        return(
            
            <div className='ingredient'>
                <input className='amInp' type='text' name={amount} 
                    onChange={props.handleChange} placeholder='#'/>

                <input className='ingInp' type='text' name={ingred}
                    onChange={props.handleChange} placeholder='Ingredient'/>

                {checkFirst}  
            </div>
        );

    //When Editing
    } else {
        if((props.amount[props.pos] && props.ingred[props.pos]) || (props.amount[props.pos] === '' || props.ingred[props.pos] === '')){
           return(
                <div className='ingredient'>
                    <input className='amInp' type='text' name={amount} 
                        onChange={props.handleChange} placeholder='#'
                        value={props.amount[props.pos]} //
                    />

                    <input className='ingInp' type='text' name={ingred}
                        onChange={props.handleChange} placeholder='Ingredient'
                        value={props.ingred[props.pos]} //
                    />

                    {checkFirst}  
                </div>
            );

        } else {
            return(
                
                <div className='ingredient'>
                    <input className='amInp' type='text' name={amount} 
                        onChange={props.handleChange} placeholder='#'
                        value={props.amValue} //
                        />

                    <input className='ingInp' type='text' name={ingred}
                        onChange={props.handleChange} placeholder='Ingredient'
                        value={props.ingValue} //
                        />

                    {checkFirst}  
                </div>
            );
        }
    }
}
