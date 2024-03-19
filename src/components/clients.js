import React from "react";
import { Link } from "react-router-dom";

import client1 from '../assets/images/client/01.jpg';
import client2 from '../assets/images/client/02.jpg';
import client3 from '../assets/images/client/03.jpg';
import client4 from '../assets/images/client/04.jpg';
import client5 from '../assets/images/client/05.jpg';
import client6 from '../assets/images/client/06.jpg';

export default function Clients() {
    const clientData = [
        {
            image: client1,
            image1: client2,
            name: 'Thomas Israel',
            name1: 'Barbara McIntosh',
            desc: "I recently used JobPrepAI for mock interviews, and I must say, it greatly enhanced my preparation. The detailed feedback provided helped me identify my strengths and areas needing improvement. Now, I feel more confident and well-prepared for my upcoming interviews. Highly recommended!",
            desc1: "The personalized feedback I received from JobPrepAI after each mock interview was invaluable. It highlighted specific areas where I needed to focus and improve, ultimately helping me refine my interview skills. Thanks to JobPrepAI, I feel much more prepared and confident for my job interviews."
        },
        {
            image: client3,
            image1: client4,
            name: 'Carl Oliver',
            name1: 'Jill Webb',
            desc: "I can't thank JobPrepAI enough for the incredible support it provided during my job preparation journey. The mock interviews, coupled with detailed feedback, helped me identify my strengths and weaknesses. I particularly appreciated the constructive criticism, which enabled me to refine my interview techniques and communication skills. As a result, I feel more confident and well-prepared to tackle any interview scenario. JobPrepAI is definitely a game-changer!",
            desc1: "JobPrepAI has been an indispensable tool in my job preparation process. The mock interviews provided a realistic simulation of the actual interview experience, allowing me to practice and refine my responses. The feedback I received was thorough and insightful, offering valuable suggestions for improvement. Thanks to JobPrepAI, I feel more confident and prepared to ace my upcoming interviews. I highly recommend it to anyone seeking to enhance their interview skills!"
        },
        {
            image: client5,
            image1: client6,
            name: 'Barbara McIntosh',
            name1: 'Janisha Doll',
            desc: "JobPrepAI has been instrumental in my job preparation journey. The mock interviews provided me with a platform to practice and refine my interview skills in a simulated environment. The feedback I received was constructive and tailored to my individual needs, helping me identify areas for improvement. Thanks to JobPrepAI, I feel more confident and prepared to tackle any interview challenges that come my way.",
            desc1: "I cannot overstate the impact JobPrepAI has had on my job preparation journey. The mock interviews, coupled with detailed feedback, have been invaluable in helping me hone my interview skills and build confidence. The personalized recommendations provided by JobPrepAI have enabled me to address my weaknesses and capitalize on my strengths. As a result, I feel more prepared and self-assured in my ability to excel in interviews. JobPrepAI is a must-have tool for anyone serious about securing their dream job!"
        }
    ];

    return (
        <>
            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">What Our Users Say</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Artificial intelligence makes it fast easy to create content for your blog, social media, website, and more!</p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    {clientData.map((item, index) => {
                        return (
                            <div className="grid grid-cols-1 gap-6 h-fit" key={index}>
                                <div className="rounded-lg shadow dark:shadow-gray-800 p-6 border-b-4 border-amber-400 bg-white dark:bg-slate-900 h-fit">
                                    <div className="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
                                        <img src={item.image} className="h-16 w-16 rounded-full shadow dark:shadow-gray-800" alt="" />

                                        <div className="ps-4">
                                            <Link to="" className="text-lg hover:text-amber-400 duration-500 ease-in-out">{item.name}</Link>
                                            <p className="text-slate-400">User</p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <p className="text-slate-400">{item.desc}</p>
                                        <ul className="list-none mb-0 text-amber-400 mt-2">
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="rounded-lg shadow dark:shadow-gray-800 p-6 border-b-4 border-amber-400 bg-white dark:bg-slate-900 h-fit">
                                    <div className="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
                                        <img src={item.image1} className="h-16 w-16 rounded-full shadow dark:shadow-gray-800" alt="" />

                                        <div className="ps-4">
                                            <Link to="" className="text-lg hover:text-amber-400 duration-500 ease-in-out">{item.name1}</Link>
                                            <p className="text-slate-400">User</p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <p className="text-slate-400">{item.desc1}</p>
                                        <ul className="list-none mb-0 text-amber-400 mt-2">
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                            <li className="inline"><i className="mdi mdi-star"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}