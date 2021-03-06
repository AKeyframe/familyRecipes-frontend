import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";

import Modal from 'react-modal';

//Componenets
import AddMemberModal from "../componenets/modals/AddMemberModal";

//Services
import { getOneFamily } from "../services/familyServices";


export default function FamiliesShow(props){
    const [modal, setModal] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const width = window.innerWidth;

    const updateFocusFamily = async () => {
        props.setFocusFamily(await getOneFamily(params.id));
    }

    const handleModal = () => {
        setModal(!modal);
    }

    const goBack = () => {
        navigate(-1);
    }

    function nav(){
        if(width <= 650){
            return(
                <div className='navButtons'>
                    <div onClick={goBack}className='button'>
                        <p>Back</p>
                    </div>
                    <div onClick={handleModal}className='button'>
                        <p style={{fontSize: '23px'}}>Add Member</p>
                    </div>

                    <Link to={`/families/${props.focusFamily._id}/recipes`}>
                        <div className= 'button'>
                            <p style={{fontSize: "20px"}}>Family Recipes</p>
                        </div>
                    </Link>

                    <div className='button'>
                        <p style={{ fontSize: "19px"}}>In Development</p>
                    </div>
                </div>
            );
        }
    }

    function navDesk(){
        if(width > 650){
            return(
                <div className='navDeskButtons'>
                    <div onClick={handleModal}className='deskButton'>
                        <p style={{fontSize: '11px'}}>Add Member</p>
                    </div>

                    <Link to={`/families/${props.focusFamily._id}/recipes`}>
                        <div className= 'deskButton'>
                            <p style={{fontSize: "10px"}}>Family Recipes</p>
                        </div>
                    </Link>

                    <div className='deskButton'>
                        <p style={{ fontSize: "8px"}}>In Development</p>
                    </div>
                </div>
            );
        }
    }

    if(!props.focusFamily){
        updateFocusFamily();

        return <h1>loading...</h1>
    } else {

        return(
            <div>
                {nav()}
                <div className='famShow background'>
                    <h1>The {props.focusFamily.name} Table</h1>
                    <div>
                        <h3>Table Head - {props.focusFamily.head.username}</h3>
                    </div>

                    {navDesk()}

                    <h1 className='title'>Memebers</h1>

                    <div className='members'>
                        {props.focusFamily.members.map((mem, i) => {
                            return(
                                <div key={i}>
                                    <h3>{mem.username} - {mem.recipes.length} Recipes</h3>
                                </div>
                            );
                        })}
                    </div>
                    

                    
                    <Modal isOpen={modal}
                            ariaHideApp={false} 
                            onRequestClose={handleModal}
                            centered
                            style={{
                                overlay: {
                                    background: 'rgba(0, 0, 0, 0.25)'
                                },
                                // content : {
                                    
                                // },
                            }}
                    
                    >
                        <AddMemberModal handleModal={handleModal}/>
                    </Modal>
                </div>
            </div>
            
        );
    }
}