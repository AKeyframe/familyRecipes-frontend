
import { useNavigate } from "react-router";

//Services
import { deleteUser } from "../services/userService";
import { getProfile} from "../services/profileServices";

export default function Profile(props){

    const width = window.innerWidth;
    const navigate = useNavigate();

    async function updateProfile(){
        props.setProfile(await getProfile(props.userState.user.profile));
    }

    const handleDelete = async () => {
        await deleteUser(props.userState.user._id).then(() => {
            navigate('/');
            props.handleLogout();
            
        });
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
                    <div className='button'>
                            <p style={{ fontSize: "19px"}}>In Development</p>
                    </div>
                </div>
            );
        }
    }

    if(props.profile){
        return(
            <div>
                {nav()}

                <div className='profile background'>
                    <h1>{props.profile.username}</h1>
                    <p>Profile Details are in development</p>
                    <div onClick={handleDelete} className='button' style={{width: '200px'}}>
                        <p>Delete Account</p>
                    </div>
                    <p>WARNING: Deleting your account will remove any recipe you've created. Any table you've joined will no longer have access to them.</p>
                </div>
            </div>
        );
    } else {
        updateProfile();
        return(<h1>Loading...</h1>)
    }
}