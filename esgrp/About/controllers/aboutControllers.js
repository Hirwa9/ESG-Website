// Controllers

about.controller('aboutCTLR', ['$scope', '$http', '$timeout', '$sce', function ($scope, $http, $timeout, $sce) {
    // $scope.capitalizeFirstLetter = function(x) {
    //     if (x) {
    //         return x.charAt(0).toUpperCase() + x.slice(1);
    //     }
    //     return x;
    // };
    $(function () {

        /**
         * Fetch all compositions
         */

        function getDaySuffix(day) {
            if (![11, 12, 13].includes(day % 100)) {
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                }
            }
            return 'th';
        }

        function formatDate(date) {
            const dateTime = new Date(date);
            const day = dateTime.getDate();
            const daySuffix = getDaySuffix(day);
            const formattedDate = dateTime.toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            return formattedDate.replace(day, `${day}<sup>${daySuffix}</sup>`);
        }

        $http.get('../Admin/fetch_all_compositions.php')
            .then(function (response) {
                $scope.retrievedListOfCompositions = response.data;
                $scope.totalCompositions = $scope.retrievedListOfCompositions.length;
                $scope.retrievedListOfCompositions.forEach(song => {
                    // Parse JSON data
                    song.compositionAbout = JSON.parse(song.compositionAbout);
                    song.compositionFileDetails = JSON.parse(song.compositionFileDetails);
                    song.compositionVideoDetails = JSON.parse(song.compositionVideoDetails);

                    // Format date
                    song.date = new Date(song.compositionDate);
                    let options = { year: 'numeric', month: 'long', day: 'numeric' };
                    song.formattedDate = song.date.toLocaleDateString('en-US', options).split(' ');


                    song.compositionFileLinkId = get_gDrive_file_id(song.compositionFileDetails.fileLink);
                    song.compositionFileDownloadLink = `https://drive.google.com/uc?export=download&id=${song.compositionFileLinkId}`;
                    song.compositionFormattedDate = formatDate(song.compositionDate);

                    // Feed data to show
                    // $scope.activeCompositionsData = {
                    //     ...song,
                    //     compositionAbout: compositionAbout,
                    //     compositionFileDetails: compositionFileDetails,
                    //     compositionVideoDetails: compositionVideoDetails,
                    //     formattedDate: formattedDate
                    // };

                    // // Replace empty fields with default message
                    // replaceEmptyFields($scope.activeCompositionsData, 'No data provided');
                });

                // Video songs
                $scope.videoCompositions = $scope.retrievedListOfCompositions.filter(item => item.compositionVideoDetails !== null);
                $scope.totalVideoCompositions = $scope.videoCompositions.length;
                $scope.videoCompositions = $scope.videoCompositions.sort((a, b) => {
                    // Convert the videoDate strings to Date objects for comparison
                    return new Date(b.compositionVideoDetails.videoDate) - new Date(a.compositionVideoDetails.videoDate);
                });

                // Latest video
                $scope.latestVideo = $scope.videoCompositions[0];
                $scope.latestVideo.isLatest = true;
                $scope.latestCompositionName = $scope.latestVideo.compositionName;

                $scope.latestCompositionDate = $scope.latestVideo.compositionDate;
                $scope.latestCompositionDateFormated = formatDate($scope.latestCompositionDate);
                $scope.latestCompositionVideoDetails = $scope.latestVideo.compositionVideoDetails;
                $scope.latestCompositionAbout = $scope.latestVideo.compositionAbout;
                $scope.latestCompositionAudioLink = $scope.latestVideo.compositionAudioLink;
                $scope.latestCompositionFileDetails = $scope.latestVideo.compositionFileDetails;
                $scope.latestCompositionVideoLink = $scope.latestCompositionVideoDetails.videoLink;

                // Extract the video ID using a regular expression
                let videoIdMatch = $scope.latestCompositionVideoLink.match(/youtu\.be\/([^\?\/]+)/);
                $scope.latestVideoId = videoIdMatch ? videoIdMatch[1] : null;
                let embedLVLink = `https://www.youtube.com/embed/${$scope.latestVideoId}`;
                // Trust the embed link
                $scope.latestCompositionVideoEmbedLink = $sce.trustAsResourceUrl(embedLVLink);
                $scope.latestCompositionFileSize = $scope.latestCompositionFileDetails.fileSize;
                $scope.latestCompositionFileDownloadLink = $scope.latestVideo.compositionFileDownloadLink;
                $scope.latestCompositionKey = $scope.latestCompositionFileDetails.compositionKey;
                $scope.latestCompositionTempo = $scope.latestCompositionFileDetails.compositionTempo;
                $scope.latestCompositionAboutText = $scope.latestCompositionAbout.aboutText;

                // Audio songs
                $scope.audioCompositions = $scope.retrievedListOfCompositions.filter(item => (item.compositionAudioLink !== null && item.compositionAudioLink !== ''));
                $scope.totalaudioCompositions = $scope.audioCompositions.length;
                $scope.audioCompositions = $scope.audioCompositions.sort((a, b) => {
                    // Sort alphabetically
                    return a.compositionName.replace(/^\s+|\s+$/g, '').localeCompare(b.compositionName.replace(/^\s+|\s+$/g, ''));
                });
                // Make an audio playlist
                esgAudioSongs = $scope.audioCompositions.map(item => {
                    return { audioName: item.compositionName.toLowerCase(), songName: item.compositionName + ' - ' + item.compositionAbout.composer };
                });

                // console.log($scope.retrievedListOfCompositions);


            }, function (error) {
                console.error('Error fetching compositions: ', error);
            });



        /**
         * Fetch all events
         */

        $scope.fetchAllEvents = function () {
            $http.get('../Admin/fetch_all_events.php')
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
                        item.eventFormattedDate = formatDate(item.eventDate);

                    });
                    console.log($scope.retrievedListOfEvents);


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
    });

}]);

/**
 * Custom filters
 */

about.filter('capitalize', function () {
    return function (input) {
        if (input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        }
        return input;
    };
});
