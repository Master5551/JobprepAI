import { Route, Routes } from "react-router-dom";

import BlogDetails from "./pages/blog-detail";
import Contact from "./pages/contact";
import Error from "./pages/error";
import Helpcenter from "./pages/helpcenter";
import Login from "./pages/login";
import Pricing from "./pages/pricing";
import Privacy from "./pages/privacy";
import ResetPassword from "./pages/reset-password";
import Services from "./pages/services";
import Signup from "./pages/signup";
import SpeechPage from "./pages/speechInput";
import SubjectsPage from "./pages/subjectpage";
import Terms from "./pages/terms";
import Dashboard from "./dashboard/Dashboard";
import Layout from "./dashboard/Layout";

import Scorepage from "./dashboard/Scorepage";
import Answers from "./dashboard/Answers";
import AboutUs from "./pages/aboutus";
import Subjects from "./dashboard/admin_pages/Subjects/Subject_page";
import SubjectQuestions from "./dashboard/admin_pages/Subjects/Subject_Question";
import ProfilePage from "./dashboard/Profilepage";
import CandidateTable from "./dashboard/admin_pages/Subjects/Student_page";
import IndexLight from "./pages/index-light";
import ScoreTable from "./dashboard/Scorepage_table";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="scores/:id" element={<ScoreTable />} />
        <Route path="answer" element={<Answers />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/an" element={<ProfilePage />} />
      </Route>
      <Route path="/interview" element={<SpeechPage />} />
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/admin/subject" element={<Subjects />} />
        <Route path="/admin/students" element={<CandidateTable />} />
        <Route
          path="/admin/subject/:subjectName"
          element={<SubjectQuestions />}
        />
      </Route>

      <Route path="/blog" element={<ProfilePage />} />
      <Route path="/index" element={<IndexLight />} />

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
      <Route path="/jobrole" element={<SubjectsPage />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
