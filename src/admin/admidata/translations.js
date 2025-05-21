// translations.js
import adminAddProect from '../../assets/adminAddProect.png';
import adminAddProduct from '../../assets/adminAddProduct.png';
import adminAplication from '../../assets/bookmark.png';
const translations = {
    en: {
        menu: [
            {
                id: 1,
                name: "Upload Completed Work",
                description: "adminAddProect", // Unique description
                image: adminAddProduct // Ensure you import this at the top
            },
            {
                id: 2,
                name: "Add Assortment",
                description: "adminAddProduct",
                image: adminAddProect // Ensure you import this at the top
            },
            {
                id: 3,
                name: "Admin Application",
                description: "adminAplicatipon",
                image: adminAplication // Ensure you import this at the top
            },
        ]
    },
    ru: {
        menu: [
            {
                id: 1,
                name: "Загрузить выполненную работу",
                description: "adminAddProect",
                image: adminAddProduct // Ensure you import this at the top
            },
            {
                id: 2,
                name: "добавить ассортимент",
                description: "adminAddProduct",
                image: adminAddProect // Ensure you import this at the top
            },
            {
                id: 3,
                name: "Административное приложение",
                description: "adminAplicatipon",
                image: adminAplication // Ensure you import this at the top
            },
        ]
    },
    uz: {
        menu: [
            {
                id: 1,
                name: "Bajarilgan ishni yuklash",
                description: "adminAddProect",
                image: adminAddProduct // Ensure you import this at the top
            },
            {
                id: 2,
                name: "Tavarlarni qo'shish",
                description: "adminAddProduct",
                image: adminAddProect // Ensure you import this at the top
            },
            {
                id: 3,
                name: "Arizalar",
                description: "adminAplicatipon",
                image: adminAplication // Ensure you import this at the top
            },
        ]
    },
    // Add more languages as needed
};

export default translations;
