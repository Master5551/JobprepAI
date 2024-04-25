import { Route, Routes } from "react-router-dom";

import Blog from "./pages/blog";
import { useState } from "react";
import AboutUs from "./pages/aboutus";
import BlogDetails from "./pages/blog-detail";
import Contact from "./pages/contact";
import Error from "./pages/error";
import Helpcenter from "./pages/helpcenter";
import Login from "./pages/login";
import Pricing from "./pages/pricing";
import Privacy from "./pages/privacy";
import Reports from "./pages/report";
import ResetPassword from "./pages/reset-password";
import Services from "./pages/services";
import Signup from "./pages/signup";
import SpeechPage from "./pages/speechInput";
import SubjectsPage from "./pages/subjectpage";
import Terms from "./pages/terms";
import Dashboard from "./dashboard/Dashboard";
import Layout from "./dashboard/Layout";
import Scores from "./dashboard/scores";
import Scorepage from "./dashboard/Scorepage";
import Answers from "./dashboard/Answers";

function App() {
  return (
    <Routes>
      {/* <Route path="/sides" element={<Dashboard />} /> */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="scores" element={<Scorepage />} />
        <Route path="answer" element={<Answers />} />
      </Route>
      <Route path="/blog" element={<Blog />} />

      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/services" element={<Services />} />
      <Route path="/blog-detail" element={<BlogDetails />} />
      <Route path="/blog-detail/:id" element={<BlogDetails />} />
      <Route path="/helpcenter" element={<Helpcenter />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/error" element={<Error />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/speech" element={<SpeechPage />} />
      <Route path="/subject" element={<SubjectsPage />} />
<<<<<<< HEAD
      <Route path="*" element={<Error />} />
=======
      <Route path="/report" element={<Reports />} />
  
>>>>>>> c87e8289b4dd53f06a9d1c5b524df5f774bbee5e
    </Routes>
  );
}

export default App;
