// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MovieResponse } from '../../types';
import Layout from '../../components/templates/Layouts';
import { SuspenseLoading } from '../../components';

const apiKey = 'f177310f';
const baseUrl = 'http://www.omdbapi.com/';

const HomePage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchMovies = async (page: number) => {
        try {
            const response = await axios.get<MovieResponse>(`${baseUrl}?s=matrix&page=${page}&apikey=${apiKey}`);
            if (response.data.Response === 'True') {
                setMovies(response.data.Search);
                // Assuming totalResults is available and each page contains 10 results
                setTotalPages(Math.ceil(parseInt(response.data.totalResults) / 10));
            } else {
                setError(response.data.Error || 'An unknown error occurred.');
            }
        } catch (error) {
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    if (loading) return (
        <Layout>
            <SuspenseLoading />
        </Layout>
    );
    if (error) return <div>Error: {error}</div>;

    return (
        <Layout>
            <div className="flex flex-wrap justify-center my-10 mx-auto gap-5">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">
                            <img className="rounded-t-lg" src={movie.Poster} alt={movie.Title} />
                        </a>
                        <div className="p-5">
                            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.Title}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.Year}</p>
                            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mb-10">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="self-center text-lg font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </Layout>
    );
}

export default HomePage;
