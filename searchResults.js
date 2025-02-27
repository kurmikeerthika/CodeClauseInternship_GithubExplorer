import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchRepositories } from "../api/github";

const SearchResults = () => {
    const { query } = useParams();
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("stars");
    const [topic, setTopic] = useState("sharks"); // Default topic: sharks

    useEffect(() => {
        const fetchRepos = async () => {
            setLoading(true);
            const data = await searchRepositories(query, topic, sort);
            setRepos(data);
            setLoading(false);
        };

        fetchRepos();
    }, [query, topic, sort]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

            {/* Sorting & Filtering */}
            <div className="mb-4 flex space-x-4">
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="stars">Sort by Stars</option>
                    <option value="forks">Sort by Forks</option>
                    <option value="updated">Sort by Last Updated</option>
                </select>

                <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="sharks">Sharks</option>
                    <option value="ocean">Ocean</option>
                    <option value="marine">Marine Biology</option>
                </select>
            </div>

            {/* Results */}
            {loading ? (
                <p className="text-center">Loading repositories...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {repos.length > 0 ? (
                        repos.map((repo) => (
                            <div key={repo.id} className="border p-4 rounded bg-gray-100">
                                <h2 className="text-lg font-bold">{repo.name}</h2>
                                <p>{repo.description || "No description available."}</p>
                                <p>⭐ Stars: {repo.stargazers_count}</p>
                                <p>🍴 Forks: {repo.forks_count}</p>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    View on GitHub
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No repositories found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
