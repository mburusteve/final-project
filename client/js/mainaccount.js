// client/js/mainaccount.js
// JavaScript for the account page if needed
// Assuming there will be features like updating user information or viewing account details

async function loadAccountDetails() {
    try {
        const res = await fetch('http://localhost:5000/api/account', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await res.json();
        document.getElementById('accountUsername').textContent = data.username;
        document.getElementById('accountEmail').textContent = data.email;
        // Populate other account details as needed
    } catch (err) {
        console.error(err);
        alert('Error loading account details');
    }
}

loadAccountDetails();

// Function to update account details (if required)
document.getElementById('updateAccountForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('accountUsernameInput').value;
    const email = document.getElementById('accountEmailInput').value;

    try {
        const res = await fetch('http://localhost:5000/api/account', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username, email })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Account updated successfully');
            loadAccountDetails();
        } else {
            alert(data.msg || 'Failed to update account');
        }
    } catch (err) {
        console.error(err);
        alert('Error updating account');
    }
});
