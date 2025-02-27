const BASE_URL = "https://api.github.com";

/**
 * Search repositories on GitHub based on query, topic, and sorting criteria.
 * @param {string} query - The search term.
 * @param {string} topic - GitHub topic (optional).
 * @param {string} sort - Sorting parameter (stars, forks, updated).
 * @returns {Promise<Array>} - List of repositories.
 */
export const searchRepositories = async (query, topic = "", sort = "stars") => {
    try {
        let searchQuery = `${query}+in:name,description`;

        if (topic) {
            searchQuery += `+topic:${topic}`;
        }

        const response = await fetch(
            `${BASE_URL}/search/repositories?q=${searchQuery}&sort=${sort}&order=desc`
        );

        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
};

/**
 * Get repository details.
 * @param {string} owner - Owner of the repository.
 * @param {string} repo - Repository name.
 * @returns {Promise<Object>} - Repository details.
 */
export const getRepositoryDetails = async (owner, repo) => {
    try {
        const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}`);

        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching repository details:", error);
        return null;
    }
};

/**
 * Get user profile details from GitHub.
 * @param {string} username - GitHub username.
 * @returns {Promise<Object>} - User details.
 */
export const getUserProfile = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${username}`);

        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
};

/**
 * Get a user's repositories from GitHub.
 * @param {string} username - GitHub username.
 * @returns {Promise<Array>} - List of user repositories.
 */
export const getUserRepos = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${username}/repos?sort=updated`);

        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user repositories:", error);
        return [];
    }
};
