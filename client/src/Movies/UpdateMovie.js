import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(()=>{
        axios
            .get(`http://localhost:5000/api/moviesById/${id}`)
            .then(res=>console.log('UpdateMovie.js: get: res: ',res))
            .catch(err=>console.log('UpdateMovie.js: get: err: ', err.message, err.response))
    }, [id])

    const handleChange = e => {
        setMovie({
            ...movie,
            // [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios   
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res=>('handleSubmit: put: res: ', res))
            .catch(err=>console.log('handleSubmit: put: err: ', err.message, err.response))
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='title'
                    onChange={handleChange}
                    placeholder='title'
                    value={movie.title}
                />
                <input 
                    type='text'
                    name='director'
                    onChange={handleChange}
                    placeholder='director'
                    value={movie.director}
                />
                <input 
                    type='text'
                    name='metascore'
                    onChange={handleChange}
                    placeholder='metascore'
                    value={movie.metascore}
                />
                <input 
                    type='text'
                    name='stars'
                    onChange={handleChange}
                    placeholder='stars'
                    value={movie.stars}
                />
            </form>
        </div>
    )
}

export default UpdateMovie;