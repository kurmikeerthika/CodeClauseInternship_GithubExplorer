import React from "react";
import { Link } from "react-router-dom";

const RepoCard = ({ repo }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {repo.name}
                </a>
            </h2>
            <p className="text-gray-600">{repo.description || "No description available"}</p>
            <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">⭐ {repo.stargazers_count}</span>
                <span className="text-sm text-gray-500">🍴 {repo.forks_count}</span>
                <Link to={`/repo/${repo.owner.login}/${repo.name}`} className="text-blue-500 text-sm hover:underline">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default RepoCard;
