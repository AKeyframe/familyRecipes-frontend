import Home from "./Home";
import Login from "./Login";

export default function Index(props){
    return( props.userState.user ? 
        <div>
            <Home   profile={props.profile}
                    focusRecipe={props.focusRecipe}
                    setFocusRecipe={props.setFocusRecipe}
                    focusFamily={props.focusFamily}
                    setFocusFamily={props.setFocusFamily}/>
        </div>
        :
        <div className='gridAccess'>
            <Login handleSignupOrLogin={props.handleSignupOrLogin} />
        </div>
    );
}