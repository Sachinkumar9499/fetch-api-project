const API_URL = 'https://jsonplaceholder.typicode.com/users';
const userContainer = document.getElementById('user-container');
const errorMessage = document.getElementById('error-message');
const reloadBtn = document.getElementById('reload-btn');

// Fetch and display users
async function fetchUsers() {
  userContainer.innerHTML = ''; // Clear previous data
  errorMessage.textContent = ''; // Clear error message

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.className = 'user-card';
      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userContainer.appendChild(userCard);
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    errorMessage.textContent = '⚠ Failed to load data. Check your internet connection.';
  }
}

// Event listener for reload button
reloadBtn.addEventListener('click', fetchUsers);

// Fetch users when page loads
fetchUsers();
