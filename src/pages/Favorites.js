import { useNavigate } from "react-router";
import { getProfile } from "../services/profileServices";

export default function Favorites(props) {

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

    if(props.profile){
        return(
            <div>
                <div className='navButtons'>
                    <div onClick={goBack}className='button'>
                        <p>Back</p>
                    </div>
                </div>

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
        if(!props.profile){
            updateProfile();
        }
        return(
            <h1>Loading...</h1>
        );
    }

}