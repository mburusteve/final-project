// client/js/wallet.js
document.getElementById('sendMoneyForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('recipientEmail').value;
    const amount = document.getElementById('sendAmount').value;

    try {
        const res = await fetch('http://localhost:5000/api/wallet/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ email, amount })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Money sent successfully');
            loadBalance();
        } else {
            alert(data.msg || 'Failed to send money');
        }
    } catch (err) {
        console.error(err);
        alert('Error sending money');
    }
});

document.getElementById('receiveMoneyForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const amount = document.getElementById('receiveAmount').value;

    try {
        const res = await fetch('http://localhost:5000/api/wallet/receive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ amount })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Money received successfully');
            loadBalance();
        } else {
            alert(data.msg || 'Failed to receive money');
        }
    } catch (err) {
        console.error(err);
        alert('Error receiving money');
    }
});

async function loadBalance() {
    try {
        const res = await fetch('http://localhost:5000/api/wallet/balance', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await res.json();
        document.getElementById('balance').textContent = data.balance.toFixed(2);
    } catch (err) {
        console.error(err);
        alert('Error loading balance');
    }
}

loadBalance();
