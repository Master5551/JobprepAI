import React from "react";
import { Link } from "react-router-dom";

export default function AmazingFeatures() {
    const featureData = [
        {
            icon: "mdi mdi-flip-horizontal",
            title: 'Interview Simulation',
            desc: 'Experience realistic mock interviews tailored to your field, providing an immersive environment to practice and refine your interview skills.'
        },
        {
            icon: "mdi mdi-email-edit-outline",
            title: 'Performance Analytics',
            desc: 'Gain valuable insights into your interview performance with comprehensive score tracking and analysis, enabling you to identify strengths and areas for improvement.'
        },
        {
            icon: "mdi mdi-star-outline",
            title: 'Data Visualization',
            desc: 'Visualize your progress and skill development over time with intuitive charts and graphs, empowering you to track your journey towards interview success.'
        },
        {
            icon: "mdi mdi-bookmark-outline",
            title: 'Resource Library',
            desc: 'Access a vast repository of articles, guides, and resources curated to enhance your interview preparation, ensuring you have the knowledge and tools you need to excel.'
        },
        {
            icon: "mdi mdi-account-check-outline",
            title: 'Personalized Recommendations',
            desc: 'Receive tailored tips and advice for optimizing your interview performance based on your unique strengths and areas for growth, maximizing your chances of success.'
        },
        {
            icon: "mdi mdi-comment-outline",
            title: 'Answer Optimization',
            desc: 'Refine and improve your interview responses with AI-powered content rewriting tools, helping you craft compelling and articulate answers to impress potential employers.'
        },
    ];

    return (
        <>
            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Amazing Features</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Unlock the power of JobPrepAI's innovative features tailored for interview preparation!</p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    {featureData.map((item, index) => {
                        return (
                            <div className="px-6 py-10 shadow hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-lg bg-white dark:bg-slate-900" key={index}>
                                <i className={`${item.icon} text-4xl bg-gradient-to-tl to-amber-400 from-fuchsia-600 text-transparent bg-clip-text`}></i>

                                <div className="content mt-7">
                                    <Link to="" className="title h5 text-lg font-medium hover:text-amber-400 duration-500">{item.title}</Link>
                                    <p className="text-slate-400 mt-3">{item.desc}</p>

                                    {/* <div className="mt-5">
                                        <Link to="" className="hover:text-amber-400 font-medium duration-500">Read More <i className="mdi mdi-arrow-right align-middle"></i></Link>
                                    </div> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}