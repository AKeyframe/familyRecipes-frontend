import Home from "./Home";
import Login from "./Login";

export default function Index(props){
    console.log(props);
    return( props.userState.user ? 
        <div>
            <Home   profile={props.profile}
                    focusRecipe={props.focusRecipe}
                    setFocusRecipe={props.setFocusRecipe}/>
        </div>
        :
        <div>
            <Login handleSignupOrLogin={props.handleSignupOrLogin} />
        </div>
    );
}