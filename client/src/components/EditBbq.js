import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";



const EditBbq = (props) => {

    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [recipe, setRecipe] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8000/api/bbqblogs/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setName(res.data.name);
                setPhoto(res.data.photo);
                setRecipe(res.data.recipe);
            })
            .catch((err) => console.log(err));
    }, [id])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/bbqblogs/${id}`, 
            {
                name, 
                photo, 
                recipe
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate('/home');
            })
            .catch((err) => console.log(err));
    }


    return (
        <div>

            <Header />
            
            <form onSubmit={submitHandler}>

                <div>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type='text' />
                </div>

                <div>
                    <label>Photo</label>
                    <input value={photo} onChange={(e) => setPhoto(e.target.value)} type='text' />
                </div>

                <div>
                    <label>Recipe</label>
                    <input value={recipe} onChange={(e) => setRecipe(e.target.value)} type='text' />
                </div>

                <button>Update BBQ</button>

            </form>
        </div>
    )
}

export default EditBbq;