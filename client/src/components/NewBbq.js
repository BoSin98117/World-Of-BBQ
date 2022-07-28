import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";


const NewBbq = (props) => {

    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [recipe, setRecipe] = useState('[]');
    // const [ingredient, setIngredient] = useState('');

    const [errors, setErrors] = useState('');
    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/bbqblogs',
        {
            name, 
            photo, 
            recipe
        }, 
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate('/home');
            })
            .catch((err) => {
                console.log(err);
                console.log('err.response:', err.response);
                console.log('err.response.data:', err.response.data);
                console.log('err.response.data.errors', err.response.data.errors);
                setErrors(err.response.data.errors);
            })
    }



    return (
        <div>
            <Header />
            
            <form onSubmit={submitHandler}>

                <div>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type='text' />
                    <br/>
                    {
                        errors.name?
                        <span>{errors.name.message}</span>
                        :null
                    }
                </div>

                <div>
                    <label>Photo</label>
                    <input value={photo} onChange={(e) => setPhoto(e.target.value)} type='text' />
                    <br/>
                    {
                        errors.photo?
                        <span>{errors.photo.message}</span>
                        :null
                    }
                </div>

                <div>
                    <label>Recipe</label>
                    <input value={recipe} onChange={(e) => setRecipe(e.target.value)} type='text' />
                    {
                        errors.recipe?
                        <span>{errors.recipe.message}</span>
                        :null
                    }
                </div>

                <button>Add BBQ Blog</button>

            </form>
        </div>
    )
}


export default NewBbq;
