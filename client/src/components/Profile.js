import React, {useState, useEffect} from "react";
import  {useParams} from "react-router-dom";
import axios from "axios";


const Profile = (props) => {
    const { username } = useParams();
    const [ userBbqList, setUserBbqList ] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/bbqbyuser/${username}`,
        { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setUserBbqList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            {
                userBbqList.map((bbq, index) => (
                    <div key={index}>
                        <p>{bbq.name}</p>
                        <p>{bbq.photo}</p>
                        <p>{bbq.recipe}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Profile;