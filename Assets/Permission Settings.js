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
        // You can add an API request here or process the data further
        alert("Role assigned successfully!");
        closeModal(); // Close the modal after successful assignment
    }
}
