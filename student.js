var students = []

$(document).ready(() => {
    if(localStorage.getItem('students') != null) {
        students = JSON.parse(localStorage.getItem('students'));
    }
    
    renderStudentsTable();
})


function createStudent(){
    console.log("Create Student");

    let prename = $('#inputPrename').val();
    let lastname = $('#inputLastname').val();
    let id = $('#inputId').val();

    let newStudent = new Student(prename, lastname, id)
    students.push(newStudent);

    localStorage.setItem('students', JSON.stringify(students));
    
    renderStudentsTable();
}

function deleteStudent(studentId) {
    // Finden Sie den Index des Schülers im Array anhand seiner ID
    const index = students.findIndex(student => student.id === studentId);
    
    if (index !== -1) {
        students.splice(index, 1);
        
        localStorage.setItem('students', JSON.stringify(students));
        
        renderStudentsTable();
    }
}

function editStudent(student) {
    // Füllen Sie das Formular mit den Schülerdaten
    $('#inputPrename').val(student.prename);
    $('#inputLastname').val(student.lastname);
    $('#inputId').val(student.id);

    // Fordern Sie den Benutzer auf, aktualisierte Werte einzugeben, wobei der aktuelle Wert als Standardwert dient
    const updatedPrename = prompt("Enter the updated prename:", student.prename) || student.prename;
    const updatedLastname = prompt("Enter the updated lastname:", student.lastname) || student.lastname;
    const updatedId = prompt("Enter the updated ID:", student.id) || student.id;

    // Aktualisieren Sie die Schülerdaten im localStorage
    const updatedStudent = {
        prename: updatedPrename,
        lastname: updatedLastname,
        id: updatedId
    };

    // Suchen Sie den Index des zu bearbeitenden Schülers im Array
    const index = students.findIndex(s => s.id === student.id);

    if (index !== -1) {
        // Aktualisieren Sie den Schüler im Array
        students[index] = updatedStudent;

        // Aktualisieren Sie den Schüler im localStorage
        localStorage.setItem('students', JSON.stringify(students));

        // Aktualisieren Sie die Tabelle, um die Änderungen anzuzeigen
        renderStudentsTable();
    }
}



function renderStudentsTable() {

    console.log(students);

    // delete all rows that contain students
    $("table tr:gt(0)").remove();

    // render/create rows for all students
    for (let i = 0; i < students.length; i++) {
        
        $("tbody").append("<tr></tr>");
        let row = ("tr:last");
        $(row).append("<td>" + students[i].prename + "</td>");
        $(row).append("<td>" + students[i].lastname + "</td>");
        $(row).append("<td>" + students[i].id + "</td>");
        $(row).append("<th><button class='delete-btn'>Delete</button> <button class='edit-btn'>Edit</button></th>");

        $(row).find(".delete-btn").on("click", function() {
            deleteStudent(students[i].id);
        });

        $(row).find(".edit-btn").on("click", function() {
            editStudent(students[i]);
        });

    }
}

class Student {
    
    constructor(prename, lastname, id){
        this.prename = prename;
        this.lastname = lastname;
        this.id = id;
    }

}