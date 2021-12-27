import { useState } from 'react'; 
import { useNavigate } from "react-router";
import { getProfile } from "../services/profileServices";

export default function Favorites(props) {

    const [width, setWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    

    const updateProfile = async () => {
        props.setProfile(await getProfile(props.userState.user.profile));
    }

    const goToRecipe = (fav) =>{
        props.setFocusRecipe(fav);
        navigate(`/recipes/${fav._id}`);
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
        if(props.profile.favorites.length > 0){
            return(
                <div>
                    {nav()}

                    <div className='favorites background'>
                        <h1>Your Favorites</h1>
                        {props.profile.favorites.map((fav, i) => {
                            return(
                                <div key={i} className='recipe'>
                                    <a href='#' onClick={() => goToRecipe(fav)}>
                                        <h1>{fav.name}</h1>
                                    </a>
                                    <p>This is a temporary fake description for the recipe. Whatever it is, it's probably delicious.</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    {nav()}

                    <div className='favorites background'>
                        <h1>Your Favorites</h1>
                        <p>You havne't favorited any recipes yet.</p>
                    </div>
                </div>
            );
        }
    } else {
        if(!props.profile){
            updateProfile();
        }
        return(
            <h1>Loading...</h1>
        );
    }

}