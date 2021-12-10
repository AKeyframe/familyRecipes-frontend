import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

//Services
import { getProfile, getProfileFamilies } from "../services/profileServices";

export default function Families(props){

    const [families, setFamilies] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const getFamilies = async () => {
            setFamilies(await getProfileFamilies(props.profile._id));
        }

        const getUserProfile = async () => {
            props.setProfile(await getProfile(props.userState.user.profile)); 
        }

        if(props.profile){
            getFamilies();

            //if the user Refreshed
        } else {
            getUserProfile();
        }
    }, [props.profile]);

    function handleClick(fam){
        props.setFocusFamily(fam);
        navigate(`/families/${fam._id}`);
    }

    if(families){
        console.log(families);
        return(
            <div>
                <h1>Families Page</h1>
                {families.map((fam, i) =>{
                    return(
                        <div key={i}>
                            
                            <h1 onClick={() => handleClick(fam)}>
                                    {fam.name}
                            </h1>
                            
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return(
            <div>
                <h1>loading...</h1>
            </div>
        );
    }
}