import { Link } from "react-router-dom";


export default function FamiliesShow(props){
    console.log(props.focusFamily);
        return(
            <div>
                <h1>Families Show Page</h1>
                <h1>{props.focusFamily.name}</h1>
                <h2>Memebers</h2>
                <p>{props.focusFamily.members[0]}</p>

                <Link to={`/families/${props.focusFamily._id}/recipes`}>
                        <div className= 'button'>
                            <p style={{fontSize: "13px"}}>Family Recipes</p>
                        </div>
                </Link>
            </div>
            
        );
  
}