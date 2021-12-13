import { useState } from "react";
import { useParams } from "react-router";

//Services
import { sendFamilyRequest } from "../../services/profileServices";

export default function AddMemberModal(props){
    const params = useParams();
    const [form, setForm] = useState({username: '', id: params.id});

    function handleChange(e){
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async () => {
        console.log(form.username);
        console.log(form.id);

        await sendFamilyRequest(form.username, form.id).then(() => {
            console.log('time to close the modal');
        });
    }

    return(
        <div>
            <h1>Add A member Modal</h1>
            <input type='text' placeholder='Username' name='username'
                    value={form.username} onChange={handleChange}/>
            <div onClick={handleSubmit} className='button'>
                <p>Add Memeber</p>
            </div>
        </div>
    );
}