import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GithubContext } from "../context/GithubContext";
import RepoCard from "../components/RepoCard";

const Home = () => {
    const { repos, loading } = useContext(GithubContext);
    const [query, setQuery] = useState("");
    const navigate = useNavigate(); // ✅ For redirecting to the search page

    // Handle search action
    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search?q=${query}`); // ✅ Redirects to SearchResults.js page
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                GitHub Repository Explorer
            </h1>

            {/* Search Input */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search GitHub Repositories..."
                    className="border p-2 rounded-l w-2/3 focus:outline-none"
                />
                <button 
                    onClick={handleSearch} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
                >
                    Search
                </button>
            </div>

            {/* Display Repositories */}
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {repos.length > 0 ? (
                        repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
                    ) : (
                        <p className="text-center text-gray-500">
                            No repositories found. Try searching for something else.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
