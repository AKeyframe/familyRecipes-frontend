import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";

import Modal from 'react-modal';

//Componenets
import AddMemberModal from "../componenets/modals/AddMemberModal";

//Services
import { getOneFamily } from "../services/familyServices";


export default function FamiliesShow(props){
    console.log('=======================')
    console.log(props);
    const [modal, setModal] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const updateFocusFamily = async () => {
        props.setFocusFamily(await getOneFamily(params.id));
    }

    const handleModal = () => {
        setModal(!modal);
    }

    const goBack = () => {
        navigate(-1);
    }

    if(!props.focusFamily){
        updateFocusFamily();

        return <h1>loading...</h1>
    } else {

        return(
            <div>
                <h1>Families Show Page</h1>
                <div onClick={goBack}className='button'>
                    <p>Back</p>
                </div>
                <h1>{props.focusFamily.name}</h1>
                <h2>Memebers</h2>
                <p>{props.focusFamily.members[0]}</p>

                <Link to={`/families/${props.focusFamily._id}/recipes`}>
                        <div className= 'button'>
                            <p style={{fontSize: "13px"}}>Family Recipes</p>
                        </div>
                </Link>

                <div onClick={handleModal}className='button'>
                    <p style={{fontSize: '13px'}}>Add a Member</p>
                </div>
                <Modal isOpen={modal}
                        ariaHideApp={false} 
                        onRequestClose={handleModal}
                        // style={{
                        //     overlay: {
                        //     },
                        //     content : {
                                
                        //     },
                        // }}
                
                >
                    <AddMemberModal />
                </Modal>
            </div>
            
        );
    }
}