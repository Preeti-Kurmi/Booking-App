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

            appointmentDiv.appendChild(nameParagraph);
            appointmentDiv.appendChild(emailParagraph);
            appointmentDiv.appendChild(editButton);
            appointmentDiv.appendChild(deleteButton);

            appointmentsContainer.appendChild(appointmentDiv);
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

    // Event listener for form submission
    appointmentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (name === "" || email === "") {
            alert("Please fill in both Name and Email fields.");
            return;
        }

        addAppointment(name, email);

        // Clear the form inputs
        nameInput.value = "";
        emailInput.value = "";
    });

    // Initial display of appointments
    displayAppointments();
});
