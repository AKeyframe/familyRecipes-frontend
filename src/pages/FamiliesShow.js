import { Link } from "react-router-dom";
import { useParams } from "react-router";

//Services
import { getOneFamily } from "../services/familyServices";

export default function FamiliesShow(props){
    console.log(props.focusFamily);

    const params = useParams();

    const updateFocusFamily = async () => {
        props.setFocusFamily(await getOneFamily(params.id));
    }

    if(!props.focusFamily){
        updateFocusFamily();

        return <h1>loading...</h1>
    } else {

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
}