// In your book.js file

document.addEventListener("DOMContentLoaded", function () {
    const appointmentForm = document.getElementById("appointmentForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const appointmentsContainer = document.getElementById("appointments");

    // Initialize appointments array from local storage or create an empty one
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // Function to display appointments on the page
    function displayAppointments() {
        appointmentsContainer.innerHTML = "";
        appointments.forEach((appointment, index) => {
            const appointmentDiv = document.createElement("div");
            appointmentDiv.classList.add("appointment");

            const nameParagraph = document.createElement("p");
            nameParagraph.innerText = `Name: ${appointment.name}`;

            const emailParagraph = document.createElement("p");
            emailParagraph.innerText = `Email: ${appointment.email}`;

            const editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.addEventListener("click", () => editAppointment(index));

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", () => deleteAppointment(index));
            const deleteIcon = document.createElement("span");
            deleteIcon.innerHTML = "&#128465;"; // Unicode representation of a trash can icon
            deleteIcon.classList.add("delete-icon");
            deleteIcon.addEventListener("click", () => deleteUserDetail(appointment._id)); // Pass the _id to the delete function
            const editIcon = document.createElement("span");
            editIcon.innerHTML = "&#9998;"; // Unicode representation of a pencil icon
            editIcon.classList.add("edit-icon");
            editIcon.addEventListener("click", () => editUserDetail(appointment)); // Pass the appointment object to the edit function

            appointmentDiv.appendChild(nameParagraph);
            appointmentDiv.appendChild(emailParagraph);
            appointmentDiv.appendChild(editButton);
            appointmentDiv.appendChild(deleteButton);

            appointmentsContainer.appendChild(appointmentDiv);
            appointmentDiv.appendChild(deleteIcon);
            appointmentDiv.appendChild(editIcon);
        });
    }

    // Function to add a new appointment
    function addAppointment(name, email) {
        const newAppointment = { name, email };
        appointments.push(newAppointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        displayAppointments();
    }

    // Function to edit an appointment
    function editAppointment(index) {
        const updatedName = prompt("Enter the updated name:");
        const updatedEmail = prompt("Enter the updated email:");
        if (updatedName !== null && updatedEmail !== null) {
            appointments[index].name = updatedName;
            appointments[index].email = updatedEmail;
            localStorage.setItem("appointments", JSON.stringify(appointments));
            displayAppointments();
        }
    }

    // Function to delete an appointment
    function deleteAppointment(index) {
        const confirmDelete = confirm("Are you sure you want to delete this appointment?");
        if (confirmDelete) {
            appointments.splice(index, 1);
            localStorage.setItem("appointments", JSON.stringify(appointments));
            displayAppointments();
        }
    }

    async function storeAppointmentInCloud(name, email) {
        try {
            const apiUrl = 'YOUR_CRUDCRUD_API_URL'; // Replace with your CRUD CRUD API URL
            const appointmentData = { name, email };
            const response = await axios.post(apiUrl, appointmentData);

            if (response.status === 201) {
                console.log('Appointment stored in the cloud successfully.');
            } else {
                console.error('Failed to store appointment in the cloud.');
            }
        } catch (error) {
            console.error('An error occurred while storing the appointment:', error);
        }
    }

    // Function to retrieve appointments from the cloud
    async function retrieveAppointmentsFromCloud() {
        try {
            const apiUrl = 'YOUR_CRUDCRUD_API_URL'; // Replace with your CRUD CRUD API URL
            const response = await axios.get(apiUrl);

            if (response.status === 200) {
                // Clear the local appointments and populate with retrieved data
                appointments = response.data;
                localStorage.setItem("appointments", JSON.stringify(appointments));
                displayAppointments();
            } else {
                console.error('Failed to retrieve appointments from the cloud.');
            }
        } catch (error) {
            console.error('An error occurred while retrieving appointments from the cloud:', error);
        }
    }

    // Call the function to retrieve appointments when the DOM is loaded
    retrieveAppointmentsFromCloud();
    // In your book.js file

    // ... (previous code)

    // Function to delete a user detail
    async function deleteUserDetail(id) {
        try {
            const apiUrl = `YOUR_CRUDCRUD_API_URL/${id}`; // Replace with your CRUD CRUD API URL and user _id
            const response = await axios.delete(apiUrl);

            if (response.status === 200) {
                // Remove the deleted user detail from the local appointments array
                const indexToDelete = appointments.findIndex(appointment => appointment._id === id);
                if (indexToDelete !== -1) {
                    appointments.splice(indexToDelete, 1);
                }

                // Update local storage with the modified appointments array
                localStorage.setItem("appointments", JSON.stringify(appointments));

                // Re-display appointments to remove the deleted detail from the website
                displayAppointments();
            } else {
                console.error('Failed to delete the user detail from the cloud.');
            }
        } catch (error) {
            console.error('An error occurred while deleting the user detail:', error);
        }
    }

    // ... (remaining code)


    // Event listener for form submission
    function editUserDetail(appointment) {
        // Populate the registration form with the user's details for editing
        nameInput.value = appointment.name;
        emailInput.value = appointment.email;
        // Store the index of the appointment being edited
        const editingIndex = appointments.findIndex(appt => appt._id === appointment._id);
    
        // Update the form submission event listener to handle edits
        appointmentForm.onsubmit = function (e) {
            e.preventDefault();
            const updatedName = nameInput.value.trim();
            const updatedEmail = emailInput.value.trim();
    
            if (updatedName === "" || updatedEmail === "") {
                alert("Please fill in both Name and Email fields.");
                return;
            }
    
            // Update the local appointments array
            appointments[editingIndex].name = updatedName;
            appointments[editingIndex].email = updatedEmail;
            // Update the cloud and re-display appointments
            storeAppointmentInCloud(updatedName, updatedEmail);
            localStorage.setItem("appointments", JSON.stringify(appointments));
            displayAppointments();
    
            // Clear the form inputs and reset the form submission listener
            nameInput.value = "";
            emailInput.value = "";
            appointmentForm.onsubmit = function (e) {
                e.preventDefault();
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
    
                if (name === "" || email === "") {
                    alert("Please fill in both Name and Email fields.");
                    return;
                }
    
                addAppointment(name, email);
                storeAppointmentInCloud(name, email);
    
                // Clear the form inputs
                nameInput.value = "";
                emailInput.value = "";
            };
        };
    }
    
    
    
    
    