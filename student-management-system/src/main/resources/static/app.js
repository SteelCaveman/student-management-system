const API_URL = "/api/students";

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");

let editingId = null;

// Display all students
async function loadStudents() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not retrieve students");
        }

        const students = await response.json();

        table.innerHTML = "";

        students.forEach(student => {
            const row = document.createElement("tr");

            const values = [
                student.id,
                student.firstName,
                student.lastName,
                student.email,
                student.course
            ];

            values.forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            const actions = document.createElement("td");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = () => editStudent(student);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteStudent(student.id);

            actions.appendChild(editButton);
            actions.appendChild(deleteButton);
            row.appendChild(actions);

            table.appendChild(row);
        });

    } catch (error) {
        message.textContent = error.message;
    }
}

// Add or update student
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const student = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

    const method = editingId ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        if (!response.ok) {
            throw new Error("Unable to save student");
        }

        message.textContent = editingId
            ? "Student updated successfully!"
            : "Student added successfully!";

        resetForm();
        loadStudents();

    } catch (error) {
        message.textContent = error.message;
    }
});

// Load student details into the form
function editStudent(student) {
    editingId = student.id;

    document.getElementById("firstName").value = student.firstName;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;

    document.getElementById("formTitle").textContent = "Update Student";
    document.getElementById("submitButton").textContent = "Update Student";
    document.getElementById("cancelButton").hidden = false;
}

// Delete student
async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Unable to delete student");
        }

        message.textContent = "Student deleted successfully!";
        loadStudents();

    } catch (error) {
        message.textContent = error.message;
    }
}

// Reset form
function resetForm() {
    form.reset();
    editingId = null;

    document.getElementById("formTitle").textContent = "Add Student";
    document.getElementById("submitButton").textContent = "Add Student";
    document.getElementById("cancelButton").hidden = true;
}

document.getElementById("cancelButton").addEventListener("click", resetForm);

// Load students when the page opens
loadStudents();