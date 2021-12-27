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
        await sendFamilyRequest(form.username, form.id).then(() => {
            props.handleModal();
        });
    }

    return(
        <div className='addMem'>
            <h1>Add Member</h1>
            <input type='text' placeholder='Username' name='username'
                    value={form.username} onChange={handleChange}/>
            <div style={{width: '200px'}}onClick={handleSubmit} className='button'>
                <p>Add Memeber</p>
            </div>
        </div>
    );
}