import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Header.css';
// import { Link } from 'react-router-dom';


const Header = (props) => {


    const navigate = useNavigate();


    const logout = (e) => {
        axios
            .post(
                "http://localhost:8000/api/users/logout",
                {}, // As a post request, we MUST send something with our request.
                // Because we're not adding anything, we can send a simple MT object
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const home = (e) => {
        navigate('/home');
    }


    return (
        <div className='header'>
            <div className="header__title">
                <h1 className='fire'>World of BBQ</h1>
            </div>

            <div className="nav">

                <div className="btn__home">
                {/* <Link to={'/home'}>Home</Link> */}
                    <button className='btnHeader' onClick={home}>Home</button>
                </div>

                <div className="btn__logout">
                    <button className='btnHeader' onClick={logout}>Logout</button>
                </div>

            </div>
        </div>
    )
}


export default Header

