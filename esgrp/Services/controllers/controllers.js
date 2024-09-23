// Controllers

chms.controller('generalCTRL', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    // Animate input custom placeholders
    $('input').on('focus', function (e) {
        const corresContainer = $(e.target).parent();
        if (corresContainer.hasClass('input_placeholder-wrapper')) {
            corresContainer.addClass('hasValue');
        }
    });
    $scope.checkInputValue = function ($event) {
        const inputHolder = $event.target.parentNode;
        if ($event.target.value == undefined || $event.target.value == '') {
            inputHolder.classList.remove('hasValue');
        } else {
            inputHolder.classList.add('hasValue');
        }
    }

    // Generate class name
    $scope.ctgListing = [
        {
            name: "Kwinjira",
            catgClassName: "Kwinjira",
            about: "Indirimbo ziririmbwa mu <u>gutangira Igitambo cya Misa</u>, Umutambagiro n'ibindi bikorwa bya Riturujiya bikorwa Misa itangiye.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Tubabarire",
            catgClassName: "Tubabarire",
            about: "Indirimbo ziririmbwa mu gice cyo <u>gusaba Imana imbabazi </u> z'ibicumuro twakoze kungirango duture Igitambo cy'Ukaristiya dufite umutima usukuye.<br> <span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Imana nisingizwe mu Ijuru",
            catgClassName: "Imana_nisingizwe_mu_Ijuru",
            about: "Indirimbo ziririmbwa mu gice cyo <u>gusingiza Imana</u>, nyuma yo gusaba Imbabazi z'ibicumuro byacu. In the <mark>Liturgy of the Word</mark>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Isomo rya mbere",
            catgClassName: "Isomo_rya_mbere",
            about: "Indirimbo ziririmbwa <u>mbere y'isomo rimanziriza Ivanjiri</u>, igihe hatateguwe Zaburi cyangwa hakurikijwe uko Riturujiya yapanzwe.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Alleluya",
            catgClassName: "Alleluya",
            about: "Indirimbo ziririmbwa <u>mbere y'Ivanjiri</u> <i>(Nyuma y'isomo rimanziriza Ivanjiri)</i>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Indangakwemera",
            catgClassName: "Indangakwemera",
            about: "Indirimbo ziririmbwa mu gice cyo <u>kwamamaza ukwemera kwacu</u><i>(Abakristu)</i>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Amasakaramentu",
            catgClassName: "Amasakaramentu",
            about: "Indirimbo ziririmbwa <u>mu gihe cy'Amasakaramentu</u>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Amasengesho rusange",
            catgClassName: "Amasengesho_rusange",
            about: "Indirimbo ziririmbwa <u>mu gice cy'Isengesho rusange (igisabisho)</u>, mu Gitambo cya Misa.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Gutura",
            catgClassName: "Gutura",
            about: "Indirimbo ziririmbwa mu gice cyo <u>gutura amaturo n'imitima yacu</u> ku Mana.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Nyirubutagatifu",
            catgClassName: "Nyirubutagatifu",
            about: "Indirimbo ziririmbwa mu gice cyo <u>gusingiza Imana Ubutatu Butagatifu</u>. In the <mark>Liturgy of Eucharist</mark>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Ntama w'Imana",
            catgClassName: "Ntama_wImana",
            about: "Indirimbo ziririmbwa mu gihe cyo <u>kwitegura guhabwa Yezu mu Ukaristiya</u>, <i>(Agneau de Dieu)</i>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Guhazwa",
            catgClassName: "Guhazwa",
            about: "Indirimbo ziririmbwa mu gihe cyo <u>guhabwa Yezu mu Ukaristiya</u>, <i>(Communion)</i>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Gushimira",
            catgClassName: "Gushimira",
            about: "Indirimbo ziririmbwa mu gice cyo <u>gushimira Imana</u>, <i>(Action de grace)</i>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Gutaha",
            catgClassName: "Gutaha",
            about: "Indirimbo ziririmbwa <u>Misa Ihumuje</u>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Bikiramariya",
            catgClassName: "Bikiramariya",
            about: "<u>Indirimbo za Bikiramariya</u> ziririmbwa Misa ihumuje, n'ahandi hose igihe cyose.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Ugushyingirwa",
            catgClassName: "Ugushyingirwa",
            about: "Indirimbo ziririmbwa <u>mu Misa y'abageni</u>, <i>(Wedding Mass/Messe de Mariage)</i>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Noheli",
            catgClassName: "Noheli",
            about: "Indirimbo ziririmbwa <u>mu gihe cya Noheli</u>, <i>(Christmas Song/Chants de Noel)</i>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Igisibo",
            catgClassName: "Igisibo",
            about: "Indirimbo ziririmbwa <u>mu gihe cy'Igisibo</u>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Pasika",
            catgClassName: "Pasika",
            about: "Indirimbo ziririmbwa <u>mu gihe cya Pasika</u>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Asensiyo",
            catgClassName: "Asensiyo",
            about: "Indirimbo ziririmbwa <u>twizihiza gusubira mu Ijuru kwa Nyagasani Yezu</u>, <i>(Ascension)</i>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Abatagatifu",
            catgClassName: "Abatagatifu",
            about: "Indirimbo ziririmbwa <u>twizihiza Abatagatifu</u>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Roho Mutagatifu",
            catgClassName: "Roho_Mutagatifu",
            about: "Indirimbo za Roho Mutagatifu.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "Ibitaramo",
            catgClassName: "Ibitaramo",
            about: "Indirimbo zaririmbwa <u>mu gihe cy'ibitaramo</u>, <i>(Concert songs)</i>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
        {
            name: "More songs",
            catgClassName: "More_songs",
            about: "Indirimbo yaririmbwa mu bihe bitandukanye bya Misa, Ibitaramo ndetse n'ahandi <i>(bitewe n'uko Uwayihimbye/Composer abyifuza)</i>.<br><span><span class=\"display-5 CATG_s_num\"></span> songs</span>"
        },
    ];
    // Adding number of songs count to the ctgListing
    $scope.songsDetailsArray = songsArray;
    // Process the song details array
    $scope.songsDetailsArray.forEach(element => {
        const categoryName = element.catgName;
        const corresSongsNum = element.songs.length;
        $scope.ctgListing.forEach(obj => {
            if (obj.catgClassName === categoryName) {
                obj.numSongs = corresSongsNum;
                obj.numSongsRepresentation = corresSongsNum > 99 ? '99+' : corresSongsNum;
            }
        });
    });

    $scope.allChmSongsNum = $scope.songsDetailsArray.reduce((sum, el) => {
        return sum + el.songs.length;
    }, 0);

    // Toggling websetting
    $scope.isWebSettingsVisible = false;
    $scope.toggleWebSettings = function () {
        if (!$scope.isWebSettingsVisible) {
            $scope.isWebSettingsVisible = true;
            window.history.pushState({ id: 1 }, null, null);
        } else {
            scroll_left($('.webSetPG'));
            webSettings.addClass('slideOutR');
            $timeout(function () {
                webSettings.removeClass('set slideOutR');
                $scope.isWebSettingsVisible = false;
                go_back();
            }, 400);
        }
    };

    $(window).on('popstate', function () {
        webSettings.is(':visible') && $scope.toggleWebSettings();
    });

    // Form submissions



    // Uploading a song
    // Initialize categories and form data
    $scope.availableCategories = [
        "Kwinjira", "Tubabarire", "Imana nisingizwe mu Ijuru", "Isomo rya mbere", "Alleluya", "Indangakwemera", "Amasakaramentu",
        "Amasengesho rusange", "Gutura", "Nyirubutagatifu", "Ntama w'Imana", "Guhazwa", "Gushimira",
        "Gutaha", "Bikiramariya", "Ugushyingirwa", "Noheli", "Igisibo", "Pasika", "Asensiyo", "Abatagatifu", "Roho Mutagatifu", "Ibitaramo", "Others"
    ];

    $scope.formData = {
        Ownership_Choice: 'no' // Default value
    };

    // Get song category classes
    $scope.getSongCategoryClasses = function () {
        return $scope.formData.Song_Category === 'Others' ? { 'text-muted': true, 'small': true } : {};
    };

    // Upload song PDF file
    $scope.uploadSongPdfFile = function ($event) {
        $event.preventDefault();

        if ($scope.song_upload_form.$valid && $scope.formData.Song_File) {
            let formData = new FormData();
            formData.append('Uploader_Email', $scope.formData.Uploader_Email);
            formData.append('Uploader_Name', $scope.formData.Uploader_Name);
            formData.append('song_file', $scope.formData.Song_File);
            formData.append('Song_Category', $scope.formData.Song_Category);
            formData.append('Other_Song_Category', $scope.formData.Other_Song_Category);
            formData.append('Ownership_Choice', $scope.formData.Ownership_Choice);
            formData.append('Triggered_Time', new Date().toDateString());

            addLoader();
            $http.post('song_upload.php', formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (response) {
                removeLoader();
                if (response.data && response.data.success) {
                    show_custom_alert(response.data.message, 'success');
                    playNotifSuccessSound();
                    document.forms.namedItem("song_upload_form").reset();
                    $('#UploadS').trigger('click');
                } else {
                    show_custom_alert(response.data.message || 'An unexpected error occurred. Please try again.', 'warning');
                    playNotifErrorSound();
                }
            }, function (error) {
                console.error(error);
                removeLoader();
                show_custom_alert('An error occurred while uploading the file.', 'warning');
                playNotifErrorSound();
            });
        } else {
            show_custom_alert('Please fill out the form correctly.', 'warning');
        }
    };

    // Night light filter
    $scope.nightLightOn = false;
    $scope.filterLevelMax = 0.4;
    // $scope.nightLightFilterBG = 'rgba(232, 135, 10,' + $scope.filterLevel + ')';
    $scope.nightLightFilterBG = 'rgba(230, 60, 0,' + $scope.filterLevel + ')';

    $scope.blueFilterInfo = localStorage.getItem('blueFilterInfo');
    if (!$scope.blueFilterInfo) {
        const blueFilterInfo = { blueFilterIsOn: false, blueFilterDragLevel: 0.12 };
        $scope.nightLightOn = blueFilterInfo.blueFilterIsOn;
        $scope.filterLevel = blueFilterInfo.blueFilterDragLevel;
        localStorage.setItem('blueFilterInfo', JSON.stringify(blueFilterInfo));
    } else {
        $timeout(() => {
            const retrievedData = JSON.parse($scope.blueFilterInfo)
            $scope.nightLightOn = retrievedData.blueFilterIsOn;
            $scope.filterLevel = parseFloat(retrievedData.blueFilterDragLevel);
        });
    }

    $scope.togggleNightLight = function () {
        $scope.nightLightOn = !$scope.nightLightOn;
    };

    $scope.filterLevelPercentage = Math.round($scope.filterLevel * (100 / $scope.filterLevelMax));

    // Watch for changes in nightLightOn and update local storage accordingly
    $scope.$watch('nightLightOn', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            const blueFilterInfo = { blueFilterIsOn: newVal, blueFilterDragLevel: $scope.filterLevel };
            localStorage.setItem('blueFilterInfo', JSON.stringify(blueFilterInfo));
        }
    });

    // Watch for changes in filterLevel and update backgroundColor accordingly
    $scope.$watch('filterLevel', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.nightLightFilterBG = 'rgba(230, 60, 0,' + newVal + ')';
            const blueFilterInfo = { blueFilterIsOn: $scope.nightLightOn, blueFilterDragLevel: newVal };
            localStorage.setItem('blueFilterInfo', JSON.stringify(blueFilterInfo));
            $scope.filterLevelPercentage = Math.round(newVal * (100 / $scope.filterLevelMax));
        }
    });
}]);

// Directives

chms.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
