// Function to open the role assignment modal
function openRoleAssignment(userName) {
    document.getElementById("roleAssignmentModal").style.display = "flex";
    document.getElementById("userNameDisplay").textContent = userName;
}

// Function to close the role assignment modal
function closeModal() {
    document.getElementById("roleAssignmentModal").style.display = "none";
}

// Form validation
function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    const role = document.getElementById("role").value;
    const errorMessage = document.getElementById("errorMessage");

    // Simulate role assignment error if the role is 'User' (for demonstration)
    if (role === "User") {
        errorMessage.textContent = "You cannot assign the 'User' role to this user.";
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
        // Here you can add code to submit the form or make a backend API request
        alert("Role assigned successfully!");
        closeModal(); // Close the modal after successful assignment
    }
}

// Navigation functions
function navigateTo(page) {
    alert(`Navigating to: ${page}`);
    // Here you can implement actual navigation (e.g., changing page content or redirecting)
}

function logout() {
    alert("Logging out...");
    // Handle logout process (e.g., clear session, redirect to login page)
}
