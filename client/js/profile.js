// client/js/profile.js
// JavaScript to handle user profile functionalities

document.addEventListener("DOMContentLoaded", () => {
    loadProfileDetails();
});

async function loadProfileDetails() {
    try {
        const res = await fetch('http://localhost:5000/api/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await res.json();
        if (res.ok) {
            document.getElementById('profileUsername').textContent = data.username;
            document.getElementById('profileEmail').textContent = data.email;
            document.getElementById('profileRole').textContent = data.role; // Either 'Client' or 'Freelancer'
            document.getElementById('profileBio').textContent = data.bio || 'No bio provided';
            // Populate other profile details as needed
        } else {
            alert(data.msg || 'Failed to load profile details');
        }
    } catch (err) {
        console.error(err);
        alert('Error loading profile details');
    }
}

// Function to handle profile update
document.getElementById('updateProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('profileUsernameInput').value;
    const email = document.getElementById('profileEmailInput').value;
    const bio = document.getElementById('profileBioInput').value;

    try {
        const res = await fetch('http://localhost:5000/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username, email, bio })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Profile updated successfully');
            loadProfileDetails();
        } else {
            alert(data.msg || 'Failed to update profile');
        }
    } catch (err) {
        console.error(err);
        alert('Error updating profile');
    }
});
