import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
// import './index.css'; // Import the main CSS file

function Login() {
    const [initialValues, setInitialValues] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        // setInitialValues(prevValues => ({
        //     ...prevValues,
        //     email: 'ajmal@gmail.com'
        // }));
    }, []);

    const validate = (values) => {
        let errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Invalid email ID";
        }

        if (!values.password) {
            errors.password = {};
            errors.password.required = "Password is required";
        } else {
            if (values.password.length < 8) {
                errors.password = { ...errors.password, length: "Password must be at least 8 characters long" };
            }
            if (!/[A-Z]/.test(values.password)) {
                errors.password = { ...errors.password, uppercase: "Password must include at least one uppercase letter" };
            }
            if (!/[a-z]/.test(values.password)) {
                errors.password = { ...errors.password, lowercase: "Password must include at least one lowercase letter" };
            }
            if (!/\d/.test(values.password)) {
                errors.password = { ...errors.password, number: "Password must include at least one number" };
            }
            if (!/[@$!%*?&]/.test(values.password)) {
                errors.password = { ...errors.password, special: "Password must include at least one special character" };
            }
        }

        return errors;
    };

    const submitForm = (values) => {
        console.log(values);
    };

    return (
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-gray-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                    <div className="card bg-green-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                        <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                            Login
                        </label>
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            validate={validate}
                            onSubmit={submitForm}
                        >
                            {({ values, handleChange, handleSubmit, errors, touched, handleBlur, isValid, dirty }) => (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <small className="font-bold">Email</small>
                                        <input
                                            type="email"
                                            placeholder="User Name"
                                            name="email"
                                            id="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`mt-1 block w-full border bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 ${errors.email && touched.email ? 'input-error' : ''}`}
                                        />
                                        {errors.email && touched.email && (
                                            <span className="error">{errors.email}</span>
                                        )}
                                    </div>

                                    <div className="mt-7">
                                        <small className="font-bold">Password</small>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            id="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`mt-1 block w-full border bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 ${errors.password && touched.password ? 'input-error' : ''}`}
                                        />
                                        {errors.password && touched.password && (
                                            <div className="error">
                                                {errors.password.required && <span>{errors.password.required}</span>}
                                                {errors.password.length && <span>{errors.password.length}</span>}
                                                {errors.password.uppercase && <span>{errors.password.uppercase}</span>}
                                                {errors.password.lowercase && <span>{errors.password.lowercase}</span>}
                                                {errors.password.number && <span>{errors.password.number}</span>}
                                                {errors.password.special && <span>{errors.password.special}</span>}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-7 flex">
                                        {/* <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                                            <input
                                                id="remember_me"
                                                type="checkbox"
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                name="remember"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Remember ME
                                            </span>
                                        </label> */}

                                        <div className="w-full text-right">
                                            <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                                                Forget Password?
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-7">
                                        <button
                                            type="submit"
                                            className="bg-black w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>

                        <div className="flex mt-7 items-center text-center">
                            <hr className="border-gray-300 border-1 w-full rounded-md" />
                            <label className="block font-medium text-sm text-gray-600 w-full">
                                Other method
                            </label>
                            <hr className="border-gray-300 border-1 w-full rounded-md" />
                        </div>

                        <div className="flex mt-7 justify-center w-full">
                            <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                Facebook
                            </button>
                            <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                Google
                            </button>
                        </div>

                        <div className="mt-7">
                            <div className="flex justify-center items-center">
                                <label className="mr-2">Have an account?</label>
                                <a href="#" className="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                    Create an account
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
