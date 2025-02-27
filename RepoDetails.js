import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import { getRepoDetails } from "../api/github";
import { getRepositoryDetails } from "../api/github"; // ✅ Correct

const RepoDetails = () => {
    const { owner, repo } = useParams(); // Get owner and repo name from URL
    const [repoDetails, setRepoDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepoDetails = async () => {
            try {
                const data = await getRepositoryDetails(owner, repo);
                setRepoDetails(data);
            } catch (error) {
                console.error("Error fetching repository details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepoDetails();
    }, [owner, repo]);

    if (loading) {
        return <p className="text-center text-gray-500">Loading repository details...</p>;
    }

    if (!repoDetails) {
        return <p className="text-center text-red-500">Repository not found.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">{repoDetails.full_name}</h1>

            <p className="text-gray-600 text-center mb-6">{repoDetails.description || "No description available."}</p>

            <div className="flex justify-center space-x-4">
                <a
                    href={repoDetails.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    View on GitHub
                </a>
                {repoDetails.homepage && (
                    <a
                        href={repoDetails.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Visit Website
                    </a>
                )}
            </div>

            <div className="mt-6 p-4 border rounded-lg bg-gray-100">
                <p><strong>Stars:</strong> {repoDetails.stargazers_count}</p>
                <p><strong>Forks:</strong> {repoDetails.forks_count}</p>
                <p><strong>Open Issues:</strong> {repoDetails.open_issues_count}</p>
                <p><strong>Language:</strong> {repoDetails.language || "N/A"}</p>
            </div>
        </div>
    );
};

export default RepoDetails;
