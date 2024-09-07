const myDriveEmail = "hirwawilly9@gmail.com";
var uploaderName;
var uploaderEmail;
var fileUploadFailed = false;
const fileUploadedForm = $('#fileUploadedForm');

// Function to handle file upload
function UploadFile() {
    var formData = new FormData(document.forms.namedItem("song_upload_form")); // Get form data

    // Extract form data
    var uploaderEmail = formData.get("Uploader_Email");
    var uploaderName = formData.get("Uploader_Name");
    var file = formData.get("fileUploaded");

    var xhr = new XMLHttpRequest();
    xhr.open(
        "POST",
        "https://script.google.com/macros/s/AKfycbxhL-VULH4HmCI6S-m6ROOxQD3olCJuzTiF3djkBf8i2tI0Iq8JTFl4IyIp2ofR9fu0/exec",
        true); // Replace with your script URL
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            alert("File uploaded successfully!");
            $('#notifyUpload').trigger('click');
        } else {
            fileUploadFailed = true;
            alert("An error occurred while uploading the file. Please try again.");
        }
    };

    var data = {
        "data": file,
        "file": "NewFile",
        "name": uploaderName,
        "email": uploaderEmail
    };

    xhr.send(JSON.stringify(data));
    return false; // Prevent the form from submitting normally
}


// Notify a successful upload

async function notify_upload_status(event) {
    event.preventDefault();
    // Submit/Mail action

    if (fileUploadFailed) {
        alert('We could not notify. The upload failed. Please try again.');
        return;
    }
    // Fill the notifier
    const notifier = $('#fileUploadedForm');
    notifier.find('#uploaderEmail').val(uploaderEmail);
    notifier.find('#uploaderName').val(uploaderName);

    try {
        const response = await fetch(event.target.action, {
            method: event.target.method,
            body: new FormData(event.target),
        });
        // Showing response error message
        if (!response.ok) {
            alert('File uploaded but we could not notify ESG. However, rest assured, they will know.');
            return;
        }
        // Showing success message
        alert('File uploaded and successfully notified to ESG.');
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while notifying ESG. Please try again.');
    } finally {
        fileUploadedForm.addClass('d-none'); // Hide the notifier form
        document.forms.namedItem("song_upload_form").reset(); // Reset the uploader form
    }
}

if (fileUploadedForm.length > 0) {
    fileUploadedForm.on("submit", notify_upload_status);
}
