// client/js/gigs.js
document.getElementById('addGigForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('gigTitle').value;
    const description = document.getElementById('gigDescription').value;
    const price = document.getElementById('gigPrice').value;
    const category = document.getElementById('gigCategory').value;

    try {
        const res = await fetch('http://localhost:5000/api/gigs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title, description, price, category })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Gig added successfully');
            location.reload(); // Reload the page to show the new gig
        } else {
            alert(data.msg || 'Failed to add gig');
        }
    } catch (err) {
        console.error(err);
        alert('Error adding gig');
    }
});
// client/js/gigs.js (continued)
// Functionality for purchasing a gig (example feature)

document.getElementById('gigList').addEventListener('click', async (e) => {
    if (e.target && e.target.matches('button.purchaseGig')) {
        const gigId = e.target.dataset.gigId;

        try {
            const res = await fetch(`http://localhost:5000/api/gigs/purchase/${gigId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await res.json();
            if (res.ok) {
                alert('Gig purchased successfully');
                location.reload();
            } else {
                alert(data.msg || 'Failed to purchase gig');
            }
        } catch (err) {
            console.error(err);
            alert('Error purchasing gig');
        }
    }
});


// Fetch and display gigs
async function loadGigs() {
    try {
        const res = await fetch('http://localhost:5000/api/gigs', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const gigs = await res.json();
        const gigList = document.getElementById('gigList');

        gigs.forEach(gig => {
            const li = document.createElement('li');
            li.textContent = `${gig.title} - ${gig.description} - $${gig.price} - ${gig.category}`;
            gigList.appendChild(li);
        });
    } catch (err) {
        console.error(err);
        alert('Error loading gigs');
    }
}

loadGigs();
