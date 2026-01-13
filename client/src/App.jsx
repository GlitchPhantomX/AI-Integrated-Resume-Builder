import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import api from "./configs/api";
import { login, setLoading } from "./app/features/authSlice";
import { Toaster } from "react-hot-toast";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Expertise from "./pages/Expertise";
import DemoResumeBuilder from "./pages/DemoResumeBuilder";
import Feedback from "./pages/Feedback";

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: token },
        });

        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }

        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/expertise" element={<Expertise/>}/>
        <Route path="/demoResumeBuilder" element={<DemoResumeBuilder/>}/>
        <Route path="/feedback" element={<Feedback/>}/>


        <Route path="view/:resumeId" element={<Preview />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
