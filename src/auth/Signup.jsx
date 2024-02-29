import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createuserAsync, setAuthenticated } from '../features/authSlice';
import { Button } from '@nextui-org/react';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cpassword, setCpassword] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const user = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.loading);


    useEffect(() => {
        if (user === true) {
            navigate('/');
        }
    }, [user, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (formData.password !== cpassword) {
                alert('Passwords do not match');
            }
            dispatch(createuserAsync(formData));
            dispatch(setAuthenticated(true));

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section className='flex justify-center bg-gray-500 items-center' style={{ minHeight: '90vh' }}>
                <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="px-6 py-4">
                        <div className="flex justify-center mx-auto">
                            {/* <img
                                alt=""
                                className="w-auto h-7 sm:h-20"
                                src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/SuHeeR_1.png?v=1709116420"
                            /> */}
                        </div>
                        <p className="text-2xl my-3 font-medium text-center text-gray-800 dark:text-gray-400">
                            Create an account
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="w-full mt-4">
                                <input
                                    aria-label="Username"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Username"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="w-full mt-4">
                                <input
                                    aria-label="Email Address"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="w-full mt-4">
                                <input
                                    aria-label="Password"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="w-full mt-4">
                                <input
                                    aria-label="Password"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Confirm Password"
                                    type="password"
                                    autocomplete
                                    value={cpassword}
                                    onChange={(e) => setCpassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                {/* <button type='submit' className="w-full px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Sign Up
                                </button> */}
                                <Button type='submit' isLoading={loading} className='bg-blue-500 text-white w-40 mx-auto' color="primary" variant="flat" style={{ outline: 'none' }}>
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-200">
                            Already have an account?{' '}
                        </span>
                        <Link to="/login"
                            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup