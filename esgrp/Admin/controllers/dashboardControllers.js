// Controllers

dashbrd.controller('dashboardCTLR', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    // $scope.capitalizeFirstLetter = function(x) {
    //     if (x) {
    //         return x.charAt(0).toUpperCase() + x.slice(1);
    //     }
    //     return x;
    // };
    $(function () {
        replaceEmptyFields = function (obj, defaultMessage) {
            for (let key in obj) {
                if (obj[key] === null || obj[key] === "") {
                    obj[key] = defaultMessage;
                } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    replaceEmptyFields(obj[key], defaultMessage);
                }
            }
        }

        /**
         * Fetch all compositions
         */

        $scope.musicElementInfoVisible = false;
        $scope.activeCompositionsData = null;
        $http.get('fetch_all_compositions.php')
            .then(function (response) {
                $scope.retrievedListOfCompositions = response.data;
                $scope.totalCompositions = $scope.retrievedListOfCompositions.length;

                // View all detrails
                $scope.view_selected_composition_info = function ($event) {
                    const sName = $event.target.parentNode.previousElementSibling.textContent;
                    $scope.retrievedListOfCompositions.forEach(song => {
                        if (song.compositionName === sName) {
                            $scope.musicElementInfoVisible = true; // Show details displayer
                            // Parse JSON data
                            let compositionAbout = JSON.parse(song.compositionAbout);
                            let compositionFileDetails = JSON.parse(song.compositionFileDetails);
                            let compositionVideoDetails = JSON.parse(song.compositionVideoDetails);

                            // Format date
                            let date = new Date(song.compositionDate);
                            let options = { year: 'numeric', month: 'long', day: 'numeric' };
                            let formattedDate = date.toLocaleDateString('en-US', options).split(' ');

                            // Feed data to show
                            $scope.activeCompositionsData = {
                                ...song,
                                compositionAbout: compositionAbout,
                                compositionFileDetails: compositionFileDetails,
                                compositionVideoDetails: compositionVideoDetails,
                                formattedDate: formattedDate
                            };

                            // Replace empty fields with default message
                            replaceEmptyFields($scope.activeCompositionsData, 'No data provided');
                        }
                    });
                };
            }, function (error) {
                console.error('Error fetching compositions: ', error);
            });

        // Preview composition
        $scope.preview_selected_composition = function () {
            const fileID = get_gDrive_file_id($scope.activeCompositionsData.compositionFileDetails.fileLink);
            window.open('https://drive.google.com/file/d/' + fileID + '/view', '_blank');
        };

        // Copy composition file link
        $scope.copy_selected_composition_file_link = function () {
            const filelink = $scope.activeCompositionsData.compositionFileDetails.fileLink;
            if (filelink === undefined || filelink === '') {
                show_custom_alert('No file link provided for this composition');
                return;
            }
            navigator.clipboard.writeText(filelink).then(() => {
                notify_link_copied();
            }).catch(error => {
                show_custom_alert('❌ Sorry! Something went wrong, please try again', 'warning');
                console.error('Error copying the link: ', error);
            });
        };

        // Copy composition video link
        $scope.copy_selected_composition_video_link = function () {
            const videoLink = $scope.activeCompositionsData.compositionVideoDetails.videoLink;
            if (videoLink === undefined || videoLink === '') {
                show_custom_alert('No video provided for this composition');
                return;
            }
            navigator.clipboard.writeText(videoLink).then(() => {
                notify_link_copied();
            }).catch(error => {
                show_custom_alert('❌ Sorry! Something went wrong, please try again', 'warning');
                console.error('Error copying the link: ', error);
            });
        };

        // Remove composition
        $scope.remove_selected_composition = function () {
            if (confirm('Warning !\n____________\nThis composition will be removed and unlisted completely.\nDo you wish to proceed?')) {
                addLoader();
                const compName = $scope.activeCompositionsData.compositionName;
                $.ajax({
                    url: 'remove_composition.php',
                    type: 'post',
                    data: { name: compName },
                    success: function (response) {
                        removeLoader();
                        data = JSON.parse(response);
                        if (data.success) {
                            show_custom_alert(data.message);
                            $scope.retrievedListOfCompositions.forEach((song, inx) => {
                                if (song.compositionName === compName) {
                                    $scope.retrievedListOfCompositions.splice(inx, 1);
                                    setTimeout(() => {
                                        $scope.musicElementInfoVisible = false; // Hide details displayer
                                    });
                                }
                            });
                        } else {
                            show_custom_alert(data.message, 'warning');
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('AJAX Error: ' + error);
                        removeLoader();
                        show_toast('⚠️ An error occurred while processing your request. Try again');
                    }
                });
            }
        };


        /**
         * Fetch all events
         */

        $scope.fetchAllEvents = function () {
            $http.get('fetch_all_events.php')
                .then(function (response) {
                    $scope.retrievedListOfEvents = response.data;
                    $scope.totalEvents = $scope.retrievedListOfEvents.length;
                    $scope.retrievedListOfEvents.forEach(item => {
                        // item.fullName = item.lastName + ' ' + item.firstName;
                        item.eventPics = JSON.parse(item.eventPics);
                        item.eventTypeOriginal = item.eventType;
                        var eventTypeStrArr = item.eventType.split('');
                        eventTypeStrArr.forEach((char, inx) => {
                            if (char === char.toUpperCase()) {
                                eventTypeStrArr[inx] = ' ' + eventTypeStrArr[inx].toLowerCase();
                            }
                        });
                        item.eventType = eventTypeStrArr.join('');
                        item.mainImage = item.eventPics[0];
                    });


                    // Create data to show
                    $scope.selectedEventData = {};

                    // Feed data of a certain event
                    $scope.select_event = function ($event) {
                        const clicked = $event.target,
                            targeted = $(clicked).closest('.eventElement'),
                            eventID = targeted.attr('data-id');
                        $scope.retrievedListOfEvents.forEach((event, inx) => {
                            if (event.id === eventID) {
                                $scope.selectedEventData = {
                                    ...$scope.retrievedListOfEvents[inx]
                                };
                            }
                        });
                    };
                }, function (error) {
                    console.error('Error fetching events: ', error);
                });
        }

        $scope.fetchAllEvents();

        // Add event
        $scope.eventImage1Valid = false;
        $scope.eventImage2Valid = false;
        $scope.imageChanged = function () {
            eventImage1.files[0] !== undefined ?
                $scope.eventImage1Valid = true
                : $scope.eventImage1Valid = false;
            eventImage2.files[0] !== undefined ?
                $scope.eventImage2Valid = true
                : $scope.eventImage2Valid = false;
        }

        $('#newEventPoster').on('submit', function ($event) {
            $event.preventDefault();
            var formData = new FormData(this);
            addLoader();
            $.ajax({
                // url: 'https://esgrprwanda.rf.gd/backend/endpoints/esg/newEvent.php',
                url: 'add_event.php',
                type: 'POST',
                data: formData,
                contentType: false, // Important: Do not set any content type header
                processData: false, // Important: Prevent jQuery from processing the data
                success: function (response) {
                    removeLoader();
                    data = JSON.parse(response);
                    if (data.success) {
                        $('#newEventPoster').trigger("reset");
                        show_custom_alert(data.message);
                        $scope.fetchAllEvents();
                    } else {
                        show_custom_alert(data.message, 'warning');
                    }
                },
                error: function (error) {
                    removeLoader();
                    show_custom_alert('An error occurred while sending the form. You can try again.', 'warning');
                    console.error('Error adding ESG event: ', error);
                }
            });
        });

        // Remove event
        $scope.remove_selected_event = function () {
            const eventId = $scope.selectedEventData.id;
            if (confirm('Warning !\n____________\nThis event which took place on ' + $scope.selectedEventData.eventDate + ' will be removed and unlisted completely.\nDo you wish to proceed?')) {
                addLoader();
                $.ajax({
                    url: 'remove_event.php',
                    type: 'post',
                    data: { id: eventId },
                    success: function (response) {
                        removeLoader();
                        data = JSON.parse(response);
                        if (data.success) {
                            show_custom_alert(data.message);
                            $scope.fetchAllEvents();
                        } else {
                            show_custom_alert(data.message, 'warning');
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('AJAX Error: ' + error);
                        removeLoader();
                        show_toast('⚠️ An error occurred while processing your request. Try again');
                    }
                });
            }
        };

        // Edit event
        $scope.eventEditorVisible = false;

        $('.imageLinkedInput').change(function (event) {
            var corresImage = $(this).next('.inputLinkedImage'); // Find the corresponding image element
            var file = event.target.files[0]; // Get the selected file
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    corresImage.attr('src', e.target.result); // Update image source
                }
                reader.readAsDataURL(file); // Read file as data URL
            }
        });

        // $scope.fileSrc = '';
        // $scope.fileChanged = function (event) {
        //     var file = event.target.files[0]; // Get the selected file
        //     if (file) {
        //         var reader = new FileReader();
        //         reader.onload = function (e) {
        //             $scope.$apply(function () {
        //                 $scope.fileSrc = e.target.result; // Update image source
        //             });
        //         }
        //         reader.readAsDataURL(file); // Read file as data URL
        //     }
        // };

        $scope.edit_event = function ($event) {
            $event.preventDefault();
            var formData = new FormData(document.getElementById('eventEditor'));
            addLoader();
            $.ajax({
                url: 'edit_event.php',
                type: 'POST',
                data: formData,
                contentType: false, // Important: Do not set any content type header
                processData: false, // Important: Prevent jQuery from processing the data
                success: function (response) {
                    removeLoader();
                    response = JSON.parse(response);
                    if (response.success) {
                        $('#eventEditor').trigger("reset");
                        show_custom_alert(response.message);
                        $scope.fetchAllEvents();
                        $scope.eventEditorVisible = false;
                    } else {
                        show_custom_alert(response.message, 'warning');
                    }
                },
                error: function (error) {
                    removeLoader();
                    show_custom_alert('An error occurred while sending the form. You can try again.', 'warning');
                    console.error('Error editing the current event: ', error);
                }
            });
        }

        // Toggle event's visibility
        $scope.toggle_selected_event = function () {
            const eventId = $scope.selectedEventData.id;
            if (confirm('Warning !\n____________\nVisibility status of the event on ' + $scope.selectedEventData.eventDate + ' will be changed.\nDo you wish to proceed?')) {
                addLoader();
                $.ajax({
                    url: 'toggle_selected_event.php',
                    type: 'post',
                    data: { id: eventId },
                    success: function (response) {
                        removeLoader();
                        data = JSON.parse(response);
                        if (data.success) {
                            show_custom_alert(data.message);
                            $scope.fetchAllEvents();
                        } else {
                            show_custom_alert(data.message, 'warning');
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('AJAX Error: ' + error);
                        removeLoader();
                        show_toast('⚠️ An error occurred while processing your request. Try again');
                    }
                });
            }
        };

        /**
         * Fetch all members
         */
        $scope.personElementInfoVisible = false;
        $scope.adminMembers = [];
        $scope.fetchAllMembers = function () {
            $http.get('fetch_all_members.php')
                .then(function (response) {
                    $scope.retrievedListOfMembers = response.data;
                    $scope.totalMembers = $scope.retrievedListOfMembers.length;
                    $scope.retrievedListOfMembers.forEach(el => {
                        el.fullName = el.lastName + ' ' + el.firstName;
                        el.status = JSON.parse(el.status);
                        el.otherChoirsDetails = JSON.parse(el.otherChoirsDetails);

                        // Admins
                        const roles = el.status.roles.map(el => el.toLowerCase()),
                            adminIdentifiers = ['president', 'vice president', 'acountant', 'secretary', 'advisor', 'social', 'it'];
                        if (adminIdentifiers.some(item => roles.includes(item))) {
                            el.isAdmin = true;
                            let titleLower = roles.find(x => adminIdentifiers.includes(x)),
                                foundTitle = el.status.roles.find(x => x.toLowerCase() == titleLower);
                            el.title = foundTitle.replace(foundTitle[0], foundTitle[0].toUpperCase());
                            $scope.adminMembers.push(el);
                        }
                    });
                    $scope.totalAdminMembers = $scope.adminMembers.length;

                    // Create data to show
                    $scope.selectedMemberData = {};
                    $scope.selectedAdminData = {};
                    $scope.selectedMemberData.imageURL = '../../Pics/person_holder_image.png';

                    // Feed data of a certain member
                    $scope.select_member = function ($event) {
                        const clicked = $event.target,
                            targeted = $(clicked).closest('.memberElement'),
                            memberID = targeted.attr('data-id');
                        $scope.retrievedListOfMembers.forEach((member, inx) => {
                            if (member.id === memberID) {
                                $scope.selectedMemberData = {
                                    ...$scope.retrievedListOfMembers[inx]
                                };
                            }
                        })
                    };
                    $scope.select_admin = function ($event) {
                        const clicked = $event.target,
                            targeted = $(clicked).closest('.adminElement'),
                            memberID = targeted.attr('data-id');
                        $scope.retrievedListOfMembers.forEach((member, inx) => {
                            if (member.id === memberID) {
                                $scope.selectedAdminData = {
                                    ...$scope.retrievedListOfMembers[inx]
                                };
                            }
                        })
                    };
                }, function (error) {
                    console.error('Error fetching members: ', error);
                });
        }

        $scope.fetchAllMembers();

        // Remove a member
        $scope.remove_member = function () {
            setTimeout(() => {
                const memberfName = $scope.selectedMemberData.firstName,
                    memberlName = $scope.selectedMemberData.lastName,
                    memberEmail = $scope.selectedMemberData.email;
                if (confirm("Warning !\n____________\nThis member '" + memberlName + " " + memberfName + "', will be considered inactive and removed from ESG completely.\n\nDo you wish to proceed?")) {
                    addLoader();
                    $.ajax({
                        url: 'remove_member.php',
                        type: 'post',
                        data: { firstName: memberfName, lastName: memberlName, email: memberEmail },
                        success: function (response) {
                            removeLoader();
                            data = JSON.parse(response);
                            if (data.success) {
                                show_custom_alert(data.message);
                                $scope.fetchAllMembers();
                            } else {
                                show_custom_alert(data.message, 'warning');
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
        }

        // Deactivate a member
        $scope.deactivate_member = function () {
            setTimeout(() => {
                const memberfName = $scope.selectedMemberData.firstName;
                const memberlName = $scope.selectedMemberData.lastName;
                if (confirm("Warning !\n____________\nUnless reactivated, this member will be considered inactive and unlisted from group members.\nDo you wish to proceed?")) {
                    addLoader();
                    $.ajax({
                        url: 'deactivate_member.php',
                        type: 'post',
                        data: { firstName: memberfName, lastName: memberlName },
                        success: function (response) {
                            removeLoader();
                            data = JSON.parse(response);
                            if (data.success) {
                                show_custom_alert(data.message);
                                $scope.fetchAllMembers();
                            } else {
                                show_custom_alert(data.message, 'warning');
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
        }

        // Reactivate a member
        $scope.reactivate_member = function () {
            setTimeout(() => {
                const memberfName = $scope.selectedMemberData.firstName;
                const memberlName = $scope.selectedMemberData.lastName;
                if (confirm("This member will be reactivated again in the group.\nDo you wish to proceed?")) {
                    addLoader();
                    $.ajax({
                        url: 'reactivate_member.php',
                        type: 'post',
                        data: { firstName: memberfName, lastName: memberlName },
                        success: function (response) {
                            removeLoader();
                            data = JSON.parse(response);
                            if (data.success) {
                                show_custom_alert(data.message, 'success');
                                $scope.fetchAllMembers();
                            } else {
                                show_custom_alert(data.message, 'warning');
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
        }

        // Change member's voice section
        $scope.voiceSectionChangerVisible = false;

        $scope.change_member_voice_section = function ($event) {
            $event.preventDefault();

            const formData = new FormData();
            formData.append('firstName', $scope.selectedMemberData.firstName);
            formData.append('lastName', $scope.selectedMemberData.lastName);
            formData.append('newVoiceSection', $scope.memberModifiedData.voice_section);

            // Post/send data
            addLoader();
            $http.post('change_member_voice_section.php', formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .then(response => {
                    const data = response.data;
                    removeLoader();
                    if (data.success) {
                        show_custom_alert(data.message);
                        // Reset form
                        $scope.memberModifiedData.voice_section = '';
                        document.forms.namedItem('memberNewVoiceSection').reset();
                        $scope.voiceSectionChangerVisible = false; // Hide voice changer
                        $scope.fetchAllMembers(); // Refresh visible data
                    } else {
                        show_custom_alert(data.message, 'warning');
                    }
                })
                .catch(error => {
                    removeLoader();
                    console.error('Error changing voice section:', error);
                });
        }
    });

    /**
     * Show songs to upload
     */

    $scope.fetchSongsToUploadError = false;
    $scope.noRecordsOfSongsToUpload = false;
    $scope.totalSongsToUpload = 0;
    $http.get('fetch_songs_to_upload.php').then(function (response) {
        $scope.retrievedSongsToUpload = response.data.map(function (song) {
            return song;
        });
        console.log($scope.retrievedSongsToUpload);
        $scope.totalSongsToUpload = $scope.retrievedSongsToUpload.length;
        ($scope.totalSongsToUpload < 1) && ($scope.noRecordsOfSongsToUpload = true);
    }, function (error) {
        $scope.fetchSongsToUploadError = true;
        console.error(error);
    });

    /**
     * Show songs to organize
     */

    $scope.fetchSongsToOrganizeError = false;
    $scope.noRecordsOfSongsToOrganize = false;
    $scope.totalSongsToOrganize = 0;
    $http.get('fetch_songs_to_organize.php').then(function (response) {
        $scope.retrievedSongsToOrganize = response.data.map(function (song) {
            song.toCategory = JSON.parse(song.toCategory);
            // In case of more json fields
            // song.anotherJsonField = JSON.parse(song.anotherJsonField); // Parse another JSON field
            return song;
        });
        $scope.totalSongsToOrganize = $scope.retrievedSongsToOrganize.length;
        ($scope.totalSongsToOrganize < 1) && ($scope.noRecordsOfSongsToOrganize = true);

    }, function (error) {
        $scope.fetchSongsToOrganizeError = true;
        console.error(error);
    });

    // Total ToDos
    $timeout(function () {
        $scope.totalSongsTodos = $scope.totalSongsToUpload + $scope.totalSongsToOrganize;
    }, 400);


    /**
     * Add a member user
     */

    $scope.newMemberFormData = {
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        phone_number: '',
        voice_section: '',
        roles: ['singer'],
        image: null
    };

    $scope.newMemberOtherChoirs = [];
    $scope.otherChoirName = '';
    $scope.otherChoirLocation = '';

    $scope.add_new_member_other_choir = function () {
        $scope.otherChoirName = $scope.otherChoirName.trim();
        $scope.otherChoirLocation = $scope.otherChoirLocation.trim();
        if (
            $scope.otherChoirName !== undefined && $scope.otherChoirLocation !== undefined &&
            $scope.otherChoirName !== null && $scope.otherChoirLocation !== null &&
            $scope.otherChoirName !== '' && $scope.otherChoirLocation !== ''
        ) {
            const choirDetails = {
                choirName: $scope.otherChoirName,
                choirLocation: $scope.otherChoirLocation
            };
            if ($scope.newMemberOtherChoirs.some(choir => choir.choirName.toLowerCase() === choirDetails.choirName.toLowerCase() &&
                choir.choirLocation.toLowerCase() === choirDetails.choirLocation.toLowerCase())) {
                show_toast('<span class="fa fa-warning me-2"></span> This choir is already enlisted', 'warning');
                return;
            }
            $scope.newMemberOtherChoirs.push(choirDetails);
            $scope.otherChoirName = '';
            $scope.otherChoirLocation = '';
        }
    };

    $scope.remove_new_member_other_choir = function (index) {
        $scope.newMemberOtherChoirs.splice(index, 1);
    };

    $scope.submit_new_member_form = function () {
        // Check if the array of choirs is empty
        if ($scope.newMemberOtherChoirs.length === 0) {
            show_toast('<span class="fa fa-warning me-2"></span> Please input at least one choir', 'warning');
            return; // Stop the function execution if no choirs are added
        }

        const formData = new FormData();

        $scope.newMemberFormData.first_name = $scope.newMemberFormData.first_name.trim();
        $scope.newMemberFormData.last_name = $scope.newMemberFormData.last_name.trim();
        $scope.newMemberFormData.email = $scope.newMemberFormData.email.trim();

        formData.append('first_name', $scope.newMemberFormData.first_name || 'No data provided');
        formData.append('last_name', $scope.newMemberFormData.last_name || 'No data provided');
        formData.append('email', $scope.newMemberFormData.email || 'No data provided');
        formData.append('phone_number', $scope.newMemberFormData.phone_number || 'No data provided');

        // Create status JSON
        const status = {
            gender: $scope.newMemberFormData.gender || 'No data provided',
            roles: $scope.newMemberFormData.roles,
            voice: $scope.newMemberFormData.voice_section || 'No data provided',
            active: true
        };
        formData.append('status', JSON.stringify(status));

        // Create otherChoirsDetails JSON
        const otherChoirsDetails = $scope.newMemberOtherChoirs.length > 0 ? $scope.newMemberOtherChoirs : [{ choirName: 'No data provided', choirLocation: 'No data provided' }];
        formData.append('otherChoirsDetails', JSON.stringify(otherChoirsDetails));

        // File input
        const fileInput = document.querySelector('#newMemberImage');
        if (fileInput.files.length > 0) {
            formData.append('image', fileInput.files[0]);
        } else {
            formData.append('image', 'No image provided');
        }

        // Post/send data
        addLoader();
        $http.post('add_member_user.php', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .then(response => {
                const data = response.data;
                removeLoader();
                if (data.success) {
                    show_custom_alert(data.response);
                    // Reset form
                    $scope.newMemberFormData = {
                        first_name: '',
                        last_name: '',
                        gender: '',
                        email: '',
                        phone_number: '',
                        voice_section: '',
                        roles: ['singer'],
                        image: null
                    };
                    document.forms.namedItem('newMemberForm').reset();
                    $scope.newMemberOtherChoirs = [];
                } else {
                    show_custom_alert(data.response, 'warning');
                }
            })
            .catch(error => {
                removeLoader();
                console.error('Error adding member:', error);
            });
    };
}]);

/**
 * Custom filters
 */

dashbrd.filter('capitalize', function () {
    return function (input) {
        if (input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        }
        return input;
    };
});
