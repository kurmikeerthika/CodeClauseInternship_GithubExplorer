document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-btn");
    const searchBox = document.getElementById("search-box");

    searchButton.addEventListener("click", () => {
        const query = searchBox.value.trim();
        if (query) {
            fetchUserProfile(query);
        } else {
            alert("Please enter a username!");
        }
    });

    searchBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchButton.click();
        }
    });
});

const BASE_URL = "https://api.github.com/users/";

// Fetch GitHub User Profile
const fetchUserProfile = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}${username}`);
        if (!response.ok) throw new Error("User not found");

        const userData = await response.json();
        displayUserProfile(userData);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("results").innerHTML = `<p style="color: red;">User not found.</p>`;
    }
};

// Display User Profile
const displayUserProfile = (user) => {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    const userCard = document.createElement("div");
    userCard.classList.add("repo-card");

    userCard.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
        <h3><a href="${user.html_url}" target="_blank">${user.login}</a></h3>
        <p>${user.bio || "No bio available"}</p>
        <div class="badges">
            <span class="badge">👥 Followers: ${user.followers}</span>
            <span class="badge">🌟 Public Repos: ${user.public_repos}</span>
            <span class="badge">🏢 Company: ${user.company || "N/A"}</span>
        </div>
    `;

    resultsDiv.appendChild(userCard);
};
