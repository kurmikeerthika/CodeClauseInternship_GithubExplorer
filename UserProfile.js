import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, getUserRepos } from "../api/github"; // ✅ Correct imports

import RepoCard from "../components/RepoCard";

const UserProfile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserProfile(username);
                const userRepos = await getUserRepos(username);
                setUser(userData);
                setRepos(userRepos);
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username]);

    if (loading) {
        return <p className="text-center text-gray-500">Loading user profile...</p>;
    }

    if (!user) {
        return <p className="text-center text-red-500">User not found.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-center">
                <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-24 h-24 rounded-full border"
                />
                <div className="ml-4">
                    <h1 className="text-3xl font-bold">{user.name || user.login}</h1>
                    <p className="text-gray-600">@{user.login}</p>
                    <p className="text-gray-500">{user.bio || "No bio available."}</p>
                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded mt-2 inline-block"
                    >
                        View on GitHub
                    </a>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Repositories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.length > 0 ? (
                    repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
                ) : (
                    <p className="text-gray-500">No repositories found.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
