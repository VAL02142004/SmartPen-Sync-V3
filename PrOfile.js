// Load saved profile data and signup data from localStorage on page load
window.onload = function() {
    loadSignupData();
    loadProfile();
};

function loadSignupData() {
    const signupData = JSON.parse(localStorage.getItem('signupData'));
    if (signupData) {
        // Auto-fill profile form with signup data
        document.getElementById('email').value = signupData.email || '';
        document.getElementById('username').value = signupData.username || '';
        document.getElementById('password').value = signupData.password || '';
        document.getElementById('dob').value = signupData.dob || '';
        document.getElementById('contact').value = signupData.contact || '';
    }
}

function loadProfile() {
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
        document.getElementById('email').value = profileData.email || '';
        document.getElementById('username').value = profileData.username || '';
        document.getElementById('password').value = profileData.password || '';
        document.getElementById('dob').value = profileData.dob || '';
        document.getElementById('contact').value = profileData.contact || '';
        if (profileData.profilePic) {
            document.getElementById('profile-pic').src = profileData.profilePic;
        }
    }
}

function loadFile(event) {
    const image = document.getElementById('profile-pic');
    image.src = URL.createObjectURL(event.target.files[0]);
    // Save the new profile picture URL to localStorage
    localStorage.setItem('profileData', JSON.stringify({
        ...getProfileData(),
        profilePic: image.src
    }));
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
    // Optionally, you can perform validation here before redirecting
    // Redirect to the dashboard
    window.location.href = "dashboard.html"; // Change to your actual dashboard page URL
});