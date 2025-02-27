import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RepoDetails from "./pages/RepoDetails";
import UserProfile from "./pages/UserProfile";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100 p-4">
                <h1 className="text-3xl font-bold text-center mb-6">GitHub Explorer</h1>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/repo/:owner/:repo" element={<RepoDetails />} />
                    <Route path="/user/:username" element={<UserProfile />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
