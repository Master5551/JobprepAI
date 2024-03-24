import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Switcher from '../components/switcher';

const subjects = [
    {
        name: 'Data Structure',
        description: 'Data structures are a specific way of organizing data in a specialized format on a computer so that the information can be organized, processed, stored, and retrieved quickly and effectively.'
    },
    {
        name: 'Algorithms',
        description: 'Algorithms are step-by-step procedures or formulas for solving problems, with each step defined and clear.'
    },
    {
        name: 'Database Management Systems',
        description: 'Database Management Systems (DBMS) are software applications that interact with end-users, applications, and the database itself to capture and analyze data.'
    },
    {
        name: 'Computer Networks',
        description: 'Computer Networks are a collection of interconnected devices, such as computers, servers, and other hardware devices, that can communicate with each other to share resources and information.'
    },
    {
        name: 'Operating Systems',
        description: 'An Operating System (OS) is software that manages computer hardware and provides services for computer programs to run.'
    },
    {
        name: 'Object-Oriented Programming (OOP)',
        description: 'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects," which can contain data in the form of fields and code in the form of procedures.'
    },
    {
        name: 'Web Development',
        description: 'Web Development involves creating web applications or websites using various technologies such as HTML, CSS, JavaScript, and server-side programming languages like Node.js, PHP, or Python.'
    },
    {
        name: 'Artificial Intelligence (AI)',
        description: 'Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and mimic human actions.'
    },
    {
        name: 'Machine Learning',
        description: 'Machine Learning is a subset of Artificial Intelligence that enables computers to learn from data and improve their performance over time without being explicitly programmed.'
    },
    {
        name: 'Cybersecurity',
        description: 'Cybersecurity involves protecting computer systems, networks, and data from digital attacks, unauthorized access, and data breaches.'
    },
    // Add more subjects here
];

const SubjectCard = ({ name, description }) => {
    return (
        <Link to={`/speech?subject=${encodeURIComponent(name)}`} className="bg-black rounded-lg shadow-lg p-6 m-4 transition-transform duration-300 transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-600">{description}</p>
        </Link>
    );
};

const SubjectsPage = () => {
    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-20">
                <div className="p-10">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl text-center leading-normal font-semibold">
                        <span className="bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text">Subjects</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {subjects.map((subject, index) => (
                            <SubjectCard key={index} name={subject.name} description={subject.description} />
                        ))}
                    </div>
                </div>
            </div>
            <Switcher />
        </>
    );
};

export default SubjectsPage;
