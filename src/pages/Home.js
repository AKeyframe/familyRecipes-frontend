import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router';

//Services
import { getOneRecipe } from '../services/recipeService';
import { getOneFamily } from '../services/familyServices';
import UserRecipes from './UserRecipes';

export default function Home(props){

    const width = window.innerWidth;
    const navigate = useNavigate();

    async function handleRecLink(id){
        props.setFocusRecipe(await getOneRecipe(id));
        navigate(`recipes/${id}`)
    }

    async function handleFamLink(id){
        props.setFocusFamily(await getOneFamily(id));
        navigate(`/families/${id}`);
    }

    function smallFavs(){

        if(props.profile){
            if(props.profile.favorites.length === 0){
                return(<p>You haven't favorited a recipe yet.</p>);
            } else {
                for(let i=0; i < props.profile.favorites.length; i++){
                    if(i < 5){
                        return(
                            <div className='sFav' key={i}>
                                <div>
                                    <a onClick={() => 
                                        handleRecLink(props.profile.favorites[i]._id)}href='#'>
                                        <h3>{props.profile.favorites[i].name}</h3>
                                    </a>
                                </div>
                            </div>
                        );
                    }
                }
            }
        }
    }

    function smallFams(){
        if(props.profile){
            if(props.profile.families.length === 0){
                return(<p>You haven't accepted a Table invitation yet.</p>)
            } else{
                
                return props.profile.families.map((fam, i) => {
                    return(
                        <div className='sFam' key={i}>
                            <div>
                                <a onClick={() => handleFamLink(fam._id)}href='#'>
                                    <h3>{fam.name}</h3>
                                </a>
                            </div>

                            <div>
                                <p>- {fam.members.length} places set</p>
                            </div>
                        </div>
                    );
                });
            }
        }
    }

    if(width > 650){
        return(
            <div className='indexPage'>
                <div className='index'>
                     <UserRecipes 
                        profile={props.profile}
                        setProfile={props.setProfile}
                        focusRecipe={props.focusRecipe}
                        setFocusRecipe={props.setFocusRecipe}
                     />
                </div>
            </div>
        );
    } else {
        return(
            <div className='homePage'>
                <div className='home'>
                    <div className='quick'>
                        <Link to='/recipes/new'>
                            <div className='button'>
                                <p>New Recipe</p>
                            </div>
                        </Link>
                        
                        <Link to='/families/new'>
                            <div className='button'>
                                <p>New Table</p>
                            </div>
                        </Link>
                    </div>

                    <div className='smallFavs background'>
                        
                        <Link to='/favorites'>
                            <h2 className='title'>Favorites</h2>
                        </Link>
                        
                        {smallFavs()}
                    </div>

                    <div className='smallFams background'>
                        <Link to='/families'>
                            <h2>Tables</h2>
                        </Link>
                        {smallFams()}
                    </div>
                </div>
            </div>
        );
    }
}