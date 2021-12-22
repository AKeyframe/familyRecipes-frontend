import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

//Services
import { getProfile, getProfileFamilies } from "../services/profileServices";
import { getOneFamily } from "../services/familyServices";


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

    async function handleClick(fam){
        props.setFocusFamily(await getOneFamily(fam._id));
        navigate(`/families/${fam._id}`);
    }

    function goBack(){
        navigate(-1);
    }

    if(families){
        console.log(families);
        return(
            <div className='families'>
                <div className='navButtons'>
                    <div onClick={goBack}className='button'>
                        <p>Back</p>
                    </div>
                    <div>
                        <Link to='/families/new'>
                            <div className='button'>
                                <p>New Table</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className='background'>
                    <h1>Your Family Tables</h1>
               

                    <div className='smallFams'>
                        {families.map((fam, i) =>{
                            return(
                                <div className='sFam' key={i}>
                                    
                                    <h2 onClick={() => handleClick(fam)}>
                                            {fam.name} 
                                    </h2>
                                    
                                </div>
                            );
                        })}
                    </div>
                </div>
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