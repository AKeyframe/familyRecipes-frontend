import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

//Services
import { getProfile, 
         acceptOrDeclineFamilyReq } from "../services/profileServices";

export default function Requests(props) {

    const [requests, setRequests] = useState();

    useEffect(() => {
        if(props.profile){
            setRequests(props.profile.requests);
        }
    }, [props.profile]);

    const navigate = useNavigate();

    const updateProfile = async () => {
        props.setProfile(await getProfile(props.userState.user.profile));
    }

    const toFamily = (req) => {
        console.log(req);
        props.setFocusFamily(req);
        navigate(`/families/${req._id}`);
    }

    const handleAccept = async (req) => {
        console.log('accepted');
        console.log(req._id)
        const data = {  dec: 'accept', 
                        famID: req.from._id,
                        reqID: req._id, 
                        profID: props.profile._id
                    };
        

        await acceptOrDeclineFamilyReq(data).then(() => {
            updateProfile();
            props.setFocusFamily(req.from);
            navigate(`/families/${req.from._id}`);
        });
        
    }

    const handleDecline = async (req) => {
        console.log('declined');
        console.log(req._id)
        const data = {  dec: 'decline', 
                        famID: req.from._id,
                        reqID: req._id, 
                        profID: props.profile._id
                    };

        await acceptOrDeclineFamilyReq(data).then(() => {
            updateProfile();
        });
    }


    if (props.profile && requests) {
        return (
            <div>
                <h1>Requests</h1>
                {requests.map((req, i) => {
                    return (
                        <div className='background' key={i}>
                            <h1 onClick={() => toFamily(req.from)}>
                                {req.from.name}
                            </h1>
                            <div>
                                <div onClick={() => handleAccept(req)} className='button'>
                                    <p>Accept</p>
                                </div>
                                <div onClick={() => handleDecline(req)} className='button'>
                                    <p>Decline</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        updateProfile();
        return (
            <h1>loading...</h1>
        );
    }
}