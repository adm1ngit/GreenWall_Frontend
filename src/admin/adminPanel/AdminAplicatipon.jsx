import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

// Translation content
const content = {
    ru: {
        totalApplications: "Общее количество заявок",
        newApplications: "Новые заявки",
        viewedApplications: "Просмотренные заявки",
        noData: "Данные недоступны",
        name: "Имя:",
        lastName: "Фамилия:",
        phone: "Телефон:",
        squareMeters: "Квадратные метры",
        lengthMeters: "Длина",
        height: "Высота",
        date: "Дата:",
    },
    en: {
        totalApplications: "Total Applications",
        newApplications: "New Applications",
        viewedApplications: "Viewed Applications",
        noData: "No data available",
        name: "Name:",
        lastName: "Last Name:",
        phone: "Phone:",
        squareMeters: "Square Meters",
        lengthMeters: "Length",
        height: "Height",
        date: "Date:",
    },
    uz: {
        totalApplications: "Jami arizalar soni",
        newApplications: "Yangi arizalar",
        viewedApplications: "Ko'rilgan arizalar",
        noData: "Ma'lumot mavjud emas",
        name: "Ism:",
        lastName: "Familiya:",
        phone: "Telefon:",
        squareMeters: "Metr kvadrat",
        lengthMeters: "Uzunligi",
        height: "Bosh",
        date: "Sana:",
    },
};

const AdminApplication = ({ language  }) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("new");
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No token found. Please log in again.");
                }

                const response = await fetch("https://greenwalluz-4a1f8b314ff2.herokuapp.com/api/orders/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(`Failed to fetch orders. Status: ${response.status}, Message: ${errorResponse.message}`);
                }

                const result = await response.json();
                const formattedData = result.map(order => ({
                    id: order.id,
                    firstName: order.first_name || "N/A",
                    lastName: order.last_name || "N/A",
                    phone: order.phone_number || "N/A",
                    squareMeters: order.product_area || "N/A",
                    lengthMeters: order.product_length || "N/A",
                    widthMeters: order.product_width || "N/A",
                    description: order.description || "No description",
                    date: order.date || "N/A",
                    viewed: order.is_verified || false,
                }));

                setData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setErrorMessage(error.message);
            }
        };

        fetchData();
    }, []);

    // Handle view confirmation
    const handleView = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found. Please log in again.");
                return;
            }

            const response = await fetch(`https://greenwalluz-4a1f8b314ff2.herokuapp.com/api/orders/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ is_verified: true }), // Sending the update
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(`Error: ${response.status}, Message: ${errorResponse.message || "No additional info available"}`);
                throw new Error(`Error: ${response.status}, Message: ${errorResponse.message || "No additional info available"}`);
            }

            const updatedData = await response.json();
            setData(prevData => prevData.map(item => 
                item.id === id ? { ...item, viewed: true, is_verified: true } : item
            ));
        } catch (error) {
            console.error("Error updating item:", error.message);
            setErrorMessage(error.message); // Update the error message state
        }
    };

    const totalApplications = data.length;
    const viewedApplications = data.filter(item => item.viewed).length;
    const newApplications = totalApplications - viewedApplications;

    const filteredData = data.filter(item => (filter === "new" ? !item.viewed : item.viewed));

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#0C4840] p-8">
            <div className="w-full max-w-4xl">
                <Link to="/home">
                    <div className="absolute top-6 left-10 text-white cursor-pointer">
                        <BiArrowBack className="text-3xl" />
                    </div>
                </Link>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-white mt-1">
                    <div className="bg-green-600 p-4 rounded-lg shadow-md">
                        <p className="text-xl font-semibold">{content[language].totalApplications}</p>
                        <strong className="text-3xl">{totalApplications}</strong>
                    </div>
                    <div className="bg-green-600 p-4 rounded-lg shadow-md">
                        <p className="text-xl font-semibold">{content[language].newApplications}</p>
                        <strong className="text-3xl">{newApplications}</strong>
                    </div>
                    <div className="bg-green-600 p-4 rounded-lg shadow-md">
                        <p className="text-xl font-semibold">{content[language].viewedApplications}</p>
                        <strong className="text-3xl">{viewedApplications}</strong>
                    </div>
                </div>

                <div className="py-5 px-8 relative">
                    <div className="flex justify-center space-x-6 mb-8 border-b-2 pb-4">
                        <button 
                            onClick={() => setFilter("viewed")} 
                            className={`pb-2 text-white hover:text-green-300 font-bold ${filter === "viewed" ? "border-b-4" : ""}`}
                        >
                            {content[language].viewedApplications}
                        </button>
                        <button 
                            onClick={() => setFilter("new")} 
                            className={`pb-2 text-white hover:text-green-300 font-bold ${filter === "new" ? "border-b-4" : ""}`}
                        >
                            {content[language].newApplications}
                        </button>
                    </div>

                    {filteredData.length === 0 ? (
                        <div className="flex justify-center items-center min-h-[100vh]">
                            <p className="text-white text-2xl">{content[language].noData}</p>
                        </div>
                    ) : (
                        <div className="max-h-screen overflow-y-auto space-y-6 hide-scroll-bar">
                            {filteredData.map(item => (
                                <div key={item.id} className="bg-green-800 text-white rounded-lg p-6 relative grid grid-cols-1">
                                    <div className="grid grid-cols-1 gap-1 w-full">
                                        <div className="col-span-1 flex items-center justify-around">
                                            <div className="font-semibold text-lg m-4">
                                                <p>{content[language].name}</p>
                                                <span>{item.firstName}</span>
                                            </div>
                                            <div className="font-semibold text-lg m-4">
                                                <p>{content[language].lastName}</p>
                                                <span>{item.lastName}</span>
                                            </div>
                                            <div className="font-semibold text-lg m-4">
                                                <p>{content[language].phone}</p>
                                                <span className='text-'>{item.phone}</span>
                                            </div>
                                            <div className="font-semibold flex text-lg m-4 flex-col">
                                                <p className="text-xl">{content[language].date}</p>
                                                <span>{item.date}</span>
                                            </div>
                                        </div>

                                        <div className="col-span-1 flex items-center justify-around">
                                            <div className="text-center">
                                                <p className="text-xl">{content[language].squareMeters}</p>
                                                <p className="text-3xl font-bold text-black mt-3">{item.squareMeters}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xl">{content[language].lengthMeters}</p>
                                                <p className="text-3xl font-bold text-black  mt-3">{item.lengthMeters}</p>
                                            </div>
                                            <div>
                                            <div className="text-center">
                                                <p className="text-lg mt-3">{item.description}</p>
                                            </div>
                                            
                                        </div>
                                        </div>
                                    </div>

                                    <div className="col-span-1 flex flex-col justify-between">
                                        

                                        <div className="absolute bottom-2 right-2">
                                            <button
                                                onClick={() => handleView(item.id)}
                                                className={`text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ${item.viewed  ?"" : "bg-blue-600"}`}
                                            >
                                                {item.viewed ? "" : "View"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminApplication;
