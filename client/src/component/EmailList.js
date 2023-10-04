import React, { useState } from 'react';

export default function EmailList({ team, toast }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(' ');
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

    let bgColor;
    if (team === 'musk') {
        bgColor = 'bg-red-500 hover:bg-red-600';
    } else if (team === 'zuck') {
        bgColor = 'bg-blue-500 hover:bg-blue-600';
    } else {
        bgColor = 'bg-yellow-500 hover:bg-yellow-600';
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (validEmail.test(email)) {
            try {
                const response = await fetch("https://billionairebrawls-backend.vercel.app/api/saveemail", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ email: email })
                }
                );
                setEmail('');
                setEmailError('');

                console.log(response);
                if (response.status === 200) {
                    toast.success('We will remeber your support!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            } catch (err) {
                console.log("Error in saving email:", err);
                toast.error('Sorry, we are facing some issue!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        else {
            setEmailError('Please, Enter valid email address')
        }
    }

    return (
        <section className="max-w-7xl w-full md:w-9/12 m-auto">
            <div className="m-8 md:mx-0 py-16 px-8 bg-gray-900 text-white rounded-xl">
                <h2 className="text-center mb-12 text-2xl md:text-3xl font-bold">Stay updated with our Comming Soon things!</h2>
                <form onSubmit={handleSubmit} method="POST" className="w-full">
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <div className="flex justify-center items-center flex-col sm:flex-row mb-1 gap-4">
                        <input type="email" id="email" name="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white text-black focus:outline-none focus:shadow-outline rounded-full py-3 px-4 w-full sm:1/2 md:w-3/5" />
                        <button type="submit" className={`${bgColor} active:scale-95 transition-all duration-250 text-white font-semibold rounded-full py-3 px-6 sm:mt-0`}>Join</button>
                    </div>
                    <p className="text-red-500 text-sm text-center mt-3">{emailError}</p>
                </form>
            </div>
        </section>
    );
}