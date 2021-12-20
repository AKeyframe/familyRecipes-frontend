

export default function StepInput(props) {
  const checkFirst = props.first === 'true' ? 
    <div className='blankMinusDiv'></div> 
      : 
    <button className='minus' onClick={() => props.handleRemoveStep(props.pos)} type='button'>-</button>

  if(!props.edit){
    return (
      <div>
        <div className='stepInp'>
          <div className='stepText'>
            <textarea onChange={props.handleChange} cols="40" rows="5" type="" name={props.name} placeholder='Recipe Instructions' />
          </div>

          <div className='center'>
            {checkFirst}
          </div>
        </div>
      </div>
    );
  } else {
      if(props.steps[props.pos] || props.steps[props.pos] === ''){
        return(
          <div className='stepInp'>
            <div className='stepText'>
              <textarea onChange={props.handleChange} cols="40" rows="5" 
                        type="" name={props.name} placeholder='Recipe Instructions' 
                        value={props.steps[props.pos]}
              />
            </div>

            <div className='center'>
              {checkFirst}
            </div>
          </div>
        );
      }  else {
        return(
          <div className='stepInp'>
            <div className='stepText'>
              <textarea onChange={props.handleChange} cols="40" rows="5" 
                        type="" name={props.name} placeholder='Recipe Instructions' 
                        value={props.stepValue}
              />
            </div>

            <div className='center'>
              {checkFirst}
            </div>
          </div>
        );
      }
  }
}