import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import translations from '../admidata/translations'; // Adjust the path

const Home = ({ language }) => {
    // Get the menu for the current language
    const currentMenu = translations[language].menu;

    return (
        <div className="min-h-screen flex justify-center items-center p-8">
            <div className="mt-12 w-full max-w-6xl overflow-hidden">
                <div className="absolute top-16 left-20 flex items-center justify-center w-[91%] h-[90%] rounded-[80px] overflow-hidden">
                    <div className="flex flex-col overflow-x-auto md:overflow-y-auto mt-15 pb-10 hide-scroll-bar">
                        <div className="flex flex-nowrap items-center justify-center">
                            <img src={logo} alt="Logo" className="md:w-96" />
                        </div>
                        <div className="flex flex-nowrap items-center justify-center">
                            {currentMenu.map(card => (
                                <div key={card.id} className="inline-block items-center justify-center m-4">
                                    <Link to={`/home/${card.description}`}>
                                        <div className="w-80 h-60 max-w-xs overflow-hidden rounded-3xl shadow-md bg-green-700 hover:bg-black hover:text-amber-400 hover:border-dashed hover:border-4 transition-border duration-500 ease-in-out hover:border-amber-500">
                                            <div className="w-80 h-60 flex items-center flex-col justify-center">
                                                <h1 className="mb-4 font-semibold">{card.name}</h1>
                                                <img
                                                    className="w-24 h-auto object-cover"
                                                    src={card.image}
                                                    alt={card.name}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
