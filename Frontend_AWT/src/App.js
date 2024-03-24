import { Route, Routes } from "react-router-dom";
import "./assets/css/materialdesignicons.min.css";
import "./assets/css/tailwind.css";
import Blog from "./pages/blog";

import AboutUs from "./pages/aboutus";
import BlogDetails from "./pages/blog-detail";
import Contact from "./pages/contact";
import Error from "./pages/error";
import Helpcenter from "./pages/helpcenter";
import IndexLight from "./pages/index-light";
import Login from "./pages/login";
import Pricing from "./pages/pricing";
import Privacy from "./pages/privacy";
import ResetPassword from "./pages/reset-password";
import Services from "./pages/services";
import Signup from "./pages/signup";
import SpeechPage from "./pages/speechInput";
import SubjectsPage from "./pages/subjectpage";
import Terms from "./pages/terms";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexLight />} />
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
      <Route path="*" element={<Error />} />
      <Route path="contact" element={<Contact />} />
      <Route path="/speech" element={<SpeechPage />} />
      <Route path="/subject" element={<SubjectsPage />} />
    </Routes>
  );
}

export default App;
