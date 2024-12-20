 // Load saved profile data from localStorage when the page loads
 window.onload = function() {
    loadProfile();
};

function loadProfile() {
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
        document.getElementById('email').value = profileData.email || '';
        document.getElementById('username').value = profileData.username || '';
        document.getElementById('password').value = profileData.password || '';
        document.getElementById('dob').value = profileData.dob || '';
        document.getElementById('contact').value = profileData.contact || '';
    }
}

document.getElementById('profile-form').addEventListener('input', function() {
    // Save profile data to localStorage on input change
    localStorage.setItem('profileData', JSON.stringify(getProfileData()));
});

function getProfileData() {
    return {
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        dob: document.getElementById('dob').value,
        contact: document.getElementById('contact').value
    };
}

document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Save the profile data to localStorage
    localStorage.setItem('profileData', JSON.stringify(getProfileData()));

    // Optionally, you can perform validation here before redirecting
    // Redirect to the dashboard
    window.location.href = "dashboard.html"; // Change to your actual dashboard page URL
}); // Load saved profile data from localStorage when the page loads
window.onload = function() {
    loadProfile();
};

function loadProfile() {
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
        document.getElementById('email').value = profileData.email || '';
        document.getElementById('username').value = profileData.username || '';
        document.getElementById('password').value = profileData.password || '';
        document.getElementById('dob').value = profileData.dob || '';
        document.getElementById('contact').value = profileData.contact || '';
    }
}

document.getElementById('profile-form').addEventListener('input', function() {
    // Save profile data to localStorage on input change
    localStorage.setItem('profileData', JSON.stringify(getProfileData()));
});

function getProfileData() {
    return {
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        dob: document.getElementById('dob').value,
        contact: document.getElementById('contact').value
    };
}

document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Save the profile data to localStorage
    localStorage.setItem('profileData', JSON.stringify(getProfileData()));

    // Optionally, you can perform validation here before redirecting
    // Redirect to the dashboard
    window.location.href = "dashboard.html"; // Change to your actual dashboard page URL
});