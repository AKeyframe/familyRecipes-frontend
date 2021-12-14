
import { useNavigate } from "react-router";
import { deleteUser } from "../services/userService";

export default function Profile(props){

    const navigate = useNavigate();

    const handleDelete = async () => {
        await deleteUser(props.userState.user._id).then(() => {
            props.handleLogout();
            navigate('/');
        });
    }

    return(
        <div>
            <h1>Profile Page</h1>
            <h1>{props.profile.username}</h1>

            <div onClick={handleDelete} className='button'>
                <p>Delete Account</p>
            </div>
        </div>
    );
}