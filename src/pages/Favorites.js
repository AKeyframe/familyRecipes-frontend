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

    if(props.profile){
        return(
            <div>
                <h1>Favorites Page</h1>
                {props.profile.favorites.map((fav, i) => {
                    return(
                        <div key={i} className='recipe background'>
                            <a href='#' onClick={() => goToRecipe(fav)}>
                                {fav.name}
                            </a>
                        </div>
                    );
                })}
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