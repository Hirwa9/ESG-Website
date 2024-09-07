const notifySUploadForm = document.getElementById('notifySUploadForm');

// Notifying upload using Fetch API
async function notify_song_upload(event) {
    event.preventDefault();
    const eTarget = event.target;
    // Notify upload
    addLoader();
    document.getElementById('notifyUploadBTN').classList.add("processing");
    try {
        const response = await fetch(eTarget.action, {
            method: eTarget.method,
            body: new FormData(eTarget),
        });
        // Showing response error message
        if (!response.ok) {
            alert("⚠️ Something went wrong. Please try again");
            return;
        }
        // Showing success message
        document.getElementById('notifySUploadForm').classList.add("d-none"); // Hide Form
        document.querySelector('.upload-status-content').classList.remove("d-none"); // Show success
        notifySUploadForm.reset(); // Reset the form
    } catch (error) {
        console.error('Error:', error.message);
        show_toast("⚠️ Something went wrong. Please try again");
    } finally {
        document.getElementById('notifyUploadBTN').classList.remove("processing");
        removeLoader();
    }
}

if (notifySUploadForm) {
    notifySUploadForm.addEventListener("submit", notify_song_upload);
}
