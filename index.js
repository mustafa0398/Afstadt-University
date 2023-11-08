
$(document).ready(() => {
    if(localStorage.getItem('students') != null) {
        var array = JSON.parse(localStorage.getItem('students'));
        $('#studentsCount').text(array.length);
    }
    
})