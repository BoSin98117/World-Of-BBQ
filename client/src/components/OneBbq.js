import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";



const OneBbq = (props) => {

    const [bbq, setBbq] = useState({});
    const [bbqList, setBbqList] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();







    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get("http://localhost:8000/api/users",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/bbqblogs")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setBbqList(res.data);
            })
            .catch((err) => console.log(err));
    }, [])









    useEffect(() => {
        axios.get(`http://localhost:8000/api/bbqblogs/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setBbq(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id])

    const deleteBBQ = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/bbqblogs/${idFromBelow}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setBbqList(bbqList.filter(bbq => bbq._id !== idFromBelow));
                navigate('/home');
            })
            .catch((err) => console.log(err));
    }


    return (
        <div>
            <Header />

            <div className="onebbqeditdelete">
                <div className="bbqposts">
                    <div className="eachposts">
                        <p>{bbq.name}</p>
                        <img src={bbq.photo} style={{ width: '150px', height: '150px' }} />
                    </div>
                </div>

                <div>
                    <button onClick={() => deleteBBQ(bbq._id)} className='btn__delete' >Delete</button>
                    <Link to={`/editbbq/${bbq._id}`}>Edit</Link>
                </div>

                {/* {
                    bbqList.map((bbq, index) => (
                        <div key={bbq._id}>
                            {
                                user.id == bbq.uploadedBy._id ?
                                    <div>
                                        <button onClick={() => deleteBBQ(bbq._id)} >Delete</button>
                                        <Link to={`/editbbq/${bbq._id}`}>Edit</Link>
                                    </div>
                                    : null
                            }

                        </div>
                    ))
                } */}

            </div>
        </div>
    )
}



export default OneBbq;