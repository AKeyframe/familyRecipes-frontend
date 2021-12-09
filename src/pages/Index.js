import Home from "./Home";
import Login from "./Login";

export default function Index(props){
    return( props.userState.user ? 
        <div>
            <Home profile={props.profile}/>
        </div>
        :
        <div>
            <Login handleSignupOrLogin={props.handleSignupOrLogin} />
        </div>
    );
}