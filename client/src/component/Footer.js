import React from 'react';

export default function Footer({ team }) {
    let textColor, strokeColor;

    if(team === 'musk') {
        textColor = 'text-red-400 hover:text-red-500';
        strokeColor = 'hover:stroke-red-400'
    } else if (team === 'zuck') {
        textColor = 'text-blue-400 hover:text-blue-500';
        strokeColor = 'hover:stroke-blue-400'
    } else {
        textColor = 'text-yellow-400 hover:text-yellow-500';
        strokeColor = 'hover:stroke-yellow-400'
    }
    
    return (
        <footer className="max-w-7xl w-full md:w-9/12 px-12 py-8 md:py-8s mx-auto flex flex-col gap-6 md:gap-4 border-t text-white">
            <div className="flex flex-col items-center justify-between gap-6 md:gap-4 sm:flex-row">
                <a href="/">
                    <h2 className="text-center text-4xl font-black hover:cursor-pointer sm:text-3xl">Billionaire Brawls</h2>
                </a>
                <div className="flex gap-12 sm:gap-8">
                    <a href="https://twitter.com/brawlofbillion/" target="_blank" rel="noopener noreferrer">
                        <svg stroke="white" className={`${strokeColor} transition-all duration-250`} fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={20} width={20} xmlns="http://www.w3.org/2000/svg"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/billionaire.brawls/" target="_blank" rel="noopener noreferrer">
                        <svg stroke="white" className={`${strokeColor} transition-all duration-250`} fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={20} width={20} xmlns="http://www.w3.org/2000/svg"><rect x={2} y={2} width={20} height={20} rx={5} ry={5} /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                    </a>
                </div>
            </div>
            <div className="">
                <p className="text-center sm:text-left">© Copyright 2023, All Rights Reserved</p>

            </div>
            <p className="flex justify-center gap-1 whitespace-nowrap">Built with ❤️ by
                <a href="https://twitter.com/0xsatyajit" className={`${textColor} transition-all duration-250`} target="_blank" rel="noopener noreferrer">Satyajit</a>
                &
                <a href="https://twitter.com/teen_founder" className={`${textColor} transition-all duration-250`} target="_blank" rel="noopener noreferrer">Siddhant</a>
            </p>
        </footer>
    )
}