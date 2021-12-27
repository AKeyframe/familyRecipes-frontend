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
    const width = window.innerWidth;

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
            </div>
            );
        } 
    }

    return(
        <div>
            {nav()}
            <div className='famNew background'>
                <h1>Set a new Table</h1>
                <form onSubmit={handleSubmit}>

                    <div>
                        <input type='text' placeholder='Family Name' name='name'
                                value={form.name} onChange={handleChange} />
                    </div>

                    <div>
                        <button className='button'>Create Table</button>
                    </div>
                </form>
            </div>
        </div>
    );
}