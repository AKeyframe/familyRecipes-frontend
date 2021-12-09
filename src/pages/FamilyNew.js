import { useState } from "react";
import { useNavigate } from "react-router";
import { createFamily } from "../services/familyServices";

import '../App.scss';

export default function FamilyNew(props){

    const [form, setForm] = useState(
        {name: '',
        head: props.profile._id,
        members: [props.profile._id],
        whoCanInvite: 'Head Only'
        }
    );

    const navigate = useNavigate();

    function handleChange(e){
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        
        createFamily(form).then( () => {
            navigate('/families');
        });
    }

    return(
        <div>
            <h1>New Family Page</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <input type='text' placeholder='Family Name' name='name'
                            value={form.name} onChange={handleChange} />
                </div>

                <div>
                    <button className='btn'>Create This Family's Table</button>
                </div>
            </form>
        </div>
    );
}