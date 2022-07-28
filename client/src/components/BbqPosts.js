import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';


const BbqPosts = (props) => {

    const [user, setUser] = useState({});
    const [bbqList, setBbqList] = useState([]);


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


    return (
        <div>
            <Header />

            <div className="content">

                <div className="welcomeUser">
                    <h1>Welcome {user.username}</h1>
                    <Link to={'/newbbq'}>Add New BBQ</Link>
                </div>

                <div className="bbqposts">
                    {
                        bbqList.map((bbq, index) => (
                            <div className='eachposts' key={bbq._id}>
                                {/* <Link to={`/user/profile/${bbq.uploadedBy?.username}`}>{bbq.uploadedBy?.username}</Link> */}
                                <Link to={`/bbq/${bbq._id}`}>{bbq.name}</Link>
                                <br />
                                <img src={bbq.photo} style={{ width: '150px', height: '150px' }} />
                                <br />

                                <div className='recipe'>
                                    <h3>Recipe</h3>
                                    <p>{bbq.recipe}</p>
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}


export default BbqPosts;

