
import '../styles/Home.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import blankimg from '../assets/blankMovi.webp'
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = React.useState(1)


    let Api_key = 'c45a857c193f6302f2b5061c3b85e743';
    useEffect(() => {

        setLoading(true);

        axios.request(`https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${count}`).then((response) => {
            setAllMovies((allMovies) => [...allMovies, ...response.data.results]);
        })
            .catch((error) => {
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [count])

    const handledclick = (e) => {
        navigate('/movie-detail', { state: { key: e } });
    }

    const loadMoreData = () =>{
        setCount((prevCount) => prevCount + 1);
    }


    return (
        <div>

            <div>
                {loading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="container text-center">
                        <div className="row row-cols-4">
                            {
                                allMovies.map((name, index) => {
                                    return <div className="col" key={name?.id} onClick={() => handledclick(name?.id)}>
                                        <div className="movie-card my-5">
                                            <img src={`https://image.tmdb.org/t/p/w500${name?.poster_path}` ? `https://image.tmdb.org/t/p/w500${name?.poster_path}` : blankimg} alt={name?.title} />
                                            <p className='text-light fs-6 fw-bold'>{name?.title}</p>
                                            <p className='text-light'>{name?.vote_average}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <div className='d-flex justify-content-center m-5'>
                            <button className='btn btn-success' onClick={loadMoreData}>Load More</button>
                        </div>

                    </div>
                )}
            </div>

        </div>
    )
}

export default Home