import React, { createContext, useState } from "react";
import { searchRepositories, getRepositoryDetails, getUserProfile } from "../api/github";

// Create Context
export const GithubContext = createContext();

// Context Provider Component
export const GithubProvider = ({ children }) => {
    const [repos, setRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch Repositories
    const fetchRepositories = async (query) => {
        setLoading(true);
        const result = await searchRepositories(query);
        setRepos(result);
        setLoading(false);
    };

    // Fetch Repository Details
    const fetchRepositoryDetails = async (owner, repo) => {
        setLoading(true);
        const result = await getRepositoryDetails(owner, repo);
        setSelectedRepo(result);
        setLoading(false);
    };

    // Fetch User Profile
    const fetchUserProfile = async (username) => {
        setLoading(true);
        const result = await getUserProfile(username);
        setUserProfile(result);
        setLoading(false);
    };

    return (
        <GithubContext.Provider value={{ repos, selectedRepo, userProfile, fetchRepositories, fetchRepositoryDetails, fetchUserProfile, loading }}>
            {children}
        </GithubContext.Provider>
    );
};
