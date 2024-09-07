$(document).ready(function () {
    // Handle sidebar links click
    $('#dashboardSidebar .nav-link:not(.no-activeness)').click(function (e) {
        e.preventDefault();
        // Active link
        $('#dashboardSidebar .nav-link').removeClass('active');
        $(this).addClass('active');

        // Get the content to display
        const content = $(this).data('content');
        const contentText = content.replace(content[0], content[0].toUpperCase());
        // Load the corresponding content
        const spaceToShow = content + 'Space';
        $('.active-data').html(contentText);
        $('#main-content > *').hide();
        $('#main-content').find($('#' + spaceToShow + '')).show();
        if ($(window).width() <= 768) {
            $('#dashboardSidebar').addClass('slideOutL');
            timeOutDuration = setTimeout(() => {
                $('#dashboardSidebar').hide();
                $('#dashboardSidebar').removeClass('slideOutL');
            }, 450);

        }
    });

    // Display admin details
    // $('.admins-list').on('click', 'tr', function () {
    //     // Get data
    //     const dis = $(this);
    //     let clickedName = dis.find('>td.full-name').text().trim(),
    //         clickedTitle = dis.find('>td.title').text().trim(),
    //         clickedNameDataIndex;
    //     $.each(adminUsersData, function (inx, el) {
    //         const fullName = el.first_name + ' ' + el.last_name;
    //         const title = el.title;
    //         if ((fullName === clickedName) && (title === clickedTitle)) {
    //             clickedNameDataIndex = inx;
    //         }
    //     });
    //     const clickedNameData = adminUsersData[clickedNameDataIndex],
    //         adminDisplayer = $('#staffMemberCard'),
    //         adminFullName = clickedNameData.first_name + ' ' + clickedNameData.last_name,
    //         adminImage = clickedNameData.image_url,
    //         adminTitle = clickedNameData.title,
    //         adminEmail = clickedNameData.email,
    //         adminPhomeNum = clickedNameData.phone_number;
    //     // Display data
    //     adminDisplayer.find('.staff-member-full-name').html(adminFullName);
    //     adminDisplayer.find('.staff-member-image').attr('src', adminImage);
    //     adminDisplayer.find('.staff-member-title').html(adminTitle);
    //     adminDisplayer.find('.staff-member-email').html(adminEmail);
    //     adminDisplayer.find('.staff-member-phone').html(adminPhomeNum);
    // });

    // Complete song organize task

    $('#todosSpace table').on('click', '.mark-task-complete', function () {
        var clickedButton = $(this),
            songId = clickedButton.data('id'),
            songName = clickedButton.data('name'),
            taskType;

        if (clickedButton.closest('table').hasClass('organize-todos-list')) {
            taskType = 'organize';
        } else if (clickedButton.closest('table').hasClass('upload-todos-list')) {
            taskType = 'upload';
        }

        if (taskType && confirm('Are you sure you want to mark this task as complete?')) {
            addLoader();
            $.ajax({
                url: 'complete_song_todo_task.php',
                type: 'POST',
                data: { todoType: taskType, id: songId, songName: songName },
                success: function (response) {
                    var result = JSON.parse(response);
                    removeLoader();
                    if (result.success) {
                        show_toast(result.message);
                        // Remove the corresponding table row
                        setTimeout(() => {
                            clickedButton.closest('tr').remove();
                        }, 1000);
                    } else {
                        show_toast('❌ Error: ' + result.message);
                    }
                },
                error: function (xhr, status, error) {
                    console.error('AJAX Error: ' + error);
                    removeLoader();
                    show_toast('⚠️ An error occurred while processing your request. Try again');
                }
            });
        }
    });
});

// Add an admin user
// $('form[action="add_admin_user.php"]').on('submit', function (e) {
//     e.preventDefault();

//     // Create FormData object
//     const formData = new FormData(this);

//     fetch('add_admin_user.php', {
//         method: 'POST',
//         body: formData
//     })
//         .then(response => response.json())
//         .then(data => {
//             show_toast(5000, data.response);
//             if (data.success) {
//                 setTimeout(() => {
//                     location.reload();
//                 }, 5000); // Reload after 5 seconds
//             }
//         })
//         .catch(error => {
//             console.error('Error adding an admin', error);
//         });
// });

// Preview composition to add

function preview_dynamic_file(previewSpace) {
    let toShow = previewSpace,
        thePreview = toShow.find('iframe'),
        songLinkID = get_gDrive_file_id($('#newcompositionUploader #sFileLink').val()),
        previewLink = 'https://drive.google.com/file/d/' + songLinkID + '/preview';
    if (thePreview.attr('src') != previewLink) {
        thePreview.html('');
        thePreview.attr('src', '');
        thePreview.attr('src', previewLink);
    }
    hidden(toShow) && toShow.show();
}

function isValidGoogleDriveLink(link) {
    const minLength = 50; // minimum link length
    return link.trim().length >= minLength &&
        link.includes("drive.google.com") &&
        link.includes("file/d/") &&
        (link.includes("view") || link.includes("usp=drive_link"));
}

// Preview action
$('#newcompositionUploader #sFileLink').on('paste input', function (e) {
    var inputField = $(this);
    if (visible($('#directFilePreview'))) {
        // setTimeout to update the input field
        setTimeout(() => {
            var inputData = inputField.val();
            if (isValidGoogleDriveLink(inputData)) {
                preview_dynamic_file($('#directFilePreview'));
            } else {
                show_toast('Invalid g-drive shared link');
            }
        }, 100);
    }
});


$(document).ready(function () {
    // Adding a new composition
    $('#newcompositionUploader').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission
        var formData = new FormData(this);
        addLoader();
        $.ajax({
            type: 'POST',
            url: 'add_composition.php',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                removeLoader();
                if (response.success) {
                    show_toast(response.message);
                    // Reset the form or redirect the user
                    $('#newcompositionUploader')[0].reset();
                    window.location.reload();
                } else {
                    show_custom_alert(response.message, 'dark');
                }
            },
            error: function () {
                removeLoader();
                show_custom_alert('❌ An error occurred while submitting the form. Please try again.', 'danger');
            }
        });
    });

    // Admin login
    $('#admin-login-form').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission
        // Serialize form data
        var formData = $(this).serialize();
        addLoader();
        $.ajax({
            type: 'POST',
            url: 'login.php',
            data: formData,
            dataType: 'json',
            success: function (response) {
                removeLoader();
                if (response.success) {
                    window.location.href = 'esgrp/Admin/dashboard.php';
                } else {
                    show_custom_alert(response.message);
                }
            },
            error: function () {
                removeLoader();
                show_custom_alert('❌ Sorry! Something went wrong. Please try again.', 'warning');
            }
        });
    });
});
