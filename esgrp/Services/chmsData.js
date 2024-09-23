// import songsArray from "./chmSongsArray.js";

$(document).ready(function () {
    // ************************** An array containing all songs **************************
    // Function to fetch the JSON data
    function fetchSongsArray() {
        return fetch('chmsData.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Sorry! We could not connect you. Please reload the page ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                return data.songsArray;
            })
            .catch(error => {
                show_custom_alert("Sorry! Something went wrong. <b>Please reload the page</b>", 'warning');
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // Set fetched data to songsArray
    // fetchSongsArray().then(fetchedSongsArray => {
    //     if (fetchedSongsArray) {
    //         window.songsArray = fetchedSongsArray;
    //         // const normalArray = JSON.parse(fetchedSongsArray);
    //         // console.log(normalArray);
    //         // console.log(fetchedSongsArray);
    //     }
    // });
    // songsArray = [];

    // ************************** An array containing all songs **************************

    /**
     * Swipe right on a song to download it
     */

    var swipeInitial_X,
        swipeInitial_Y;

    $('.sCategories').on('touchstart', '.SongElement', function (e) {
        swipeInitial_X = e.originalEvent.touches[0].clientX;
        swipeInitial_Y = e.originalEvent.touches[0].clientY;
    });
    $('.sCategories').on('touchend', '.SongElement', function (e) {
        var file_to_Download = $(this),
            tis_Height = file_to_Download.height(),
            tis_Width = file_to_Download.width(),
            swipeFinal_X = e.originalEvent.changedTouches[0].clientX,
            swipeFinal_Y = e.originalEvent.changedTouches[0].clientY,

            swipe_Diff = Math.abs(swipeFinal_Y - swipeInitial_Y);
        if (($(window).width() < 576 && (swipeFinal_X > (swipeInitial_X + (tis_Width * (1 / 3)))) && (swipe_Diff < (tis_Height / 2)))) {
            file_to_Download.addClass('swipedRight');
            let theLink = file_to_Download.find('.DNLDConf').attr('href');
            alert_song_download();
            setTimeout(() => {
                file_to_Download.removeClass('swipedRight');
                !file_to_Download.hasClass('Sselected') && file_to_Download.click();
            }, 500);
            setTimeout(() => {
                window.open(theLink, '_blank'); // Download the song
            }, 1000);
            // window.open(theLink, '_blank'); // Download the song
        }
    });

    // Refreshing songs
    refresh_songs = function () {
        $('.CATG_list > li').show();
        sCatSearcher.val('');
        remove_not_found_svg();
        deselect_song();
        $('.SongElement').addClass('refreshing');
        setTimeout(function () {
            $('.SongElement').removeClass('refreshing');
        }, 1000);
        hide_other_schResults();
        show_toast('Songs refreshed');
    }

    refreshS_noMove = function () {
        sCatSearcher.val('');
        remove_not_found_svg();
        deselect_song();
        hide_other_schResults();
    }

    hide_other_schResults = function () {
        if (otherResults.is(':visible')) {
            otherResults.addClass('flyOutBB');
            setTimeout(() => {
                otherResults.removeClass('flyOutBB').hide();
            }, 400);
            setTimeout(() => {
                $('.foundElse').remove();
            }, 500);
        }
    }

    /**
     * Enter/Exit category songs
     */

    hide_CATG_containers = function () {
        $('.CATG_list').removeClass('inCAT').empty();
        $('.ScatSongs').removeClass('view');
    }

    enter_songs = function () {
        window.history.pushState({ id: 1 }, null, null);
        sCatWrapper.show();
    }

    out_of_songs = function () {
        deselect_song();
        hide_CATG_containers();
        remove_not_found_svg();
        activeSHome();
        $('.ScatTools').removeClass('away');
        sCatWrapper.addClass('fadeOutB');
        setTimeout(() => {
            sCatWrapper.removeClass('fadeOutB');
            sCatWrapper.scrollTop(0);
        }, 600);
        hide_other_schResults();
        $('.SongsToTop').addClass('d-none');
        sCatSearcher.val('');
        $('html, body').addClass('scroll-auto');
        setTimeout(() => {
            $('html, body').removeClass('scroll-auto');
        }, 500);
    }

    $(window).on('popstate', function () {
        visible(sCatWrapper) && out_of_songs();
    });

    /**
     * Songs statistics
    */

    // Summing all CHM songs
    var allSongsNumArray = [];
    songsArray.forEach((obj) => {
        allSongsNumArray.push(obj.songs.length);
    });
    sum_CHM_songs = function () {
        return allSongsNumArray.reduce((sum, el) => sum + el, 0);
    }
    // $('.available_songs').html(sum_CHM_songs());
    // count_up(sum_CHM_songs(), $('.available_songs'));

    // Adjusting available songs chart statistics
    stats_chart_count($('.song-stats-ring'), sum_CHM_songs());

    /*
    * Show songs by categories
    */


    // Displaying the number of category songs on togglers and descriptions
    const SongToggler = $('.sControlCATG:not(.sControlCATG-all)');
    let visibleCatName;

    songsArray.forEach((categoryBlock) => {
        let categoryName = categoryBlock.catgName,
            catgegorySongs = categoryBlock.songs.length;
        $('.' + categoryName + 'D').find('.CATG_s_num').html(catgegorySongs);
        catgegorySongs = (catgegorySongs > 99) ? '99+' : catgegorySongs;
        // $('.' + catgTogglingButton).next().html(catgegorySongs);
    });

    visible_category_name = function (nm) {
        visibleCatName = nm;
        $('.ScatName').html(visibleCatName);
    }

    // Go to category songs
    $('.categoryTogglers').on('click', '.sControlCATG:not(.sControlCATG-all)', function () {
        let category = $(this).find('> .nameOfCategory'),
            categoryName = get_last_class(category).slice(0, -3);
        activeSMusic();
        reset_catg_filter();
        create_single_CATG_songs(categoryName);
    });

    $('.All_SongsCAT').parent().click(function () {
        loading();
        setTimeout(() => {
            create_all_CATG_songs();
        }, 3000);
    });


    // Marking active tab by click

    let navMarkerOffLeft;
    const navigationBar = $('.songsControl-nav');

    $('.songsControl-nav > button:not(.no-activeness)').click(function () {
        if (window.innerWidth >= 576) {
            activate($(this));
        }
    });

    // in JS

    // document.querySelector('.songsControl-nav').querySelectorAll(':not(.no-activeness)').forEach((btn) => {
    //     btn.addEventListener('click', function () {
    //         if (window.innerWidth >= 576) {
    //             let next,
    //                 previous;
    //             btn.classList.add('active');

    //             if (btn.previousElementSibling) {
    //                 previous = btn.previousElementSibling;
    //                 previous.classList.remove('active');
    //                 while (previous.previousElementSibling) {
    //                     previous = previous.previousElementSibling;
    //                     previous.classList.remove('active');
    //                 }
    //             }
    //             if (btn.nextElementSibling) {
    //                 next = btn.nextElementSibling;
    //                 next.classList.remove('active');
    //                 while (next.nextElementSibling) {
    //                     next = next.nextElementSibling;
    //                     next.classList.remove('active');
    //                 }
    //             }
    //         }
    //     });
    // });

    // Marking active tab by scroll
    const homeSpace = $('.songsControl-CATS_home'),
        categoriesSpace = $('.songsControl-CATS_categories'),
        toolsSpace = $('.songsControl-CATS_tools'),
        songsControlCATS = $('.songsControl-CATS');
    songsControlCATS.on({
        scroll: function () {
            let dis = $(this),
                fullWidth = dis.width(),
                halfWidth = fullWidth / 2,
                scrollLeft = dis.scrollLeft();

            let homePositionLeft = homeSpace.position().left,
                categoriesPositionLeft = categoriesSpace.position().left,
                toolsPositionLeft = toolsSpace.position().left;
            navMarkerOffLeft = scrollLeft / 4;
            navigationBar.css({ '--_offset': navMarkerOffLeft + 'px' });

            if (visible(homeSpace)) {
                if (homePositionLeft < halfWidth) {
                    activate(goToHomeBTN);
                }
            }
            if (visible(categoriesSpace)) {
                if (categoriesPositionLeft < halfWidth) {
                    activate(goToSongsBTN);
                }
            }
            if (visible(toolsSpace)) {
                if (toolsPositionLeft < halfWidth) {
                    activate(goToToolsBTN);
                }
            }
        }
    });

    var sControl = $('.songsControl'),
        sCatgHolder = $('.sCatgHolder'),
        sCatgHolderHome = $('.sCatgHolder-home'),
        sCatgHolderRoom = $('.sCatgHolder-room');

    // Smooth scroll to hide quick tools on home page
    const hide_home_quick_tools = function () {
        homeSpace.addClass('scroll-smooth');
        homeSpace.animate({ scrollTop: 48 }, 1000);
        setTimeout(() => {
            homeSpace.removeClass('scroll-smooth');
        }, 3000);
    }

    // Show homepage quick tools
    hide_home_quick_tools();
    homeSpace.on({
        touchstart: function () {
            const quickToolsPosition = $('.quick-tools').position().top;
            quickToolsPosition >= 12 && sCatgHolderHome.removeClass('overf-y-a');
        },
        touchend: function () {
            sCatgHolderHome.addClass('overf-y-a');
        },
    });

    // sCatgHolderHome.sc

    // Site navigation by clicks

    // $('.categoryFilter').on({
    //     keyup: function () {
    //         var str = $(this).val().toLowerCase();
    //         SongToggler.filter(function () {
    //             $(this).toggle($(this).find('> .nameOfCategory').text().toLowerCase().indexOf(str) > - 1);
    //         })
    //     }
    // });

    reset_catg_filter = function () {
        SongToggler.show();
    }

    const goToHomeBTN = $('.songsControl-nav_to-home'),
        goToSongsBTN = $('.songsControl-nav_to-songs'),
        goToToolsBTN = $('.songsControl-nav_to-Tools');

    // Going to home
    activeSHome = function () {
        if (sCatWrapper.hasClass('fromSTool')) {
            sCatWrapper.removeClass('fromSTool');
            go_back();
        }
        if ($(window).width() > 576) {
            hide_other_schResults();
            activate(goToHomeBTN);
            sControl.removeClass('working');
            scroll_left(songsControlCATS);
        } else {
            if (goToSongsBTN.is(':hidden')) {
                sControl.addClass('working');
            }
            else {
                sControl.removeClass('working');
            }
        }
    }
    goToHomeBTN.click(function () {
        scroll_left(songsControlCATS);
        activeSHome();
    });

    // Going back to songs
    activeSMusic = function () {
        let categoriesPositionLeft = categoriesSpace.position().left;
        if ($(window).width() > 576) {
            songsControlCATS.animate({ scrollLeft: categoriesPositionLeft });
        } else {
            songsControlCATS.animate({ scrollLeft: songsControlCATS.width() });
        }
        hide_other_schResults();
        activate(goToSongsBTN);
    }

    goToSongsBTN.click(function () {
        activeSMusic();
        if ($(window).width() > 576) {
            if (!songsControlCATS.find('.sControlCATG.active').length) {
                create_single_CATG_songs('Kwinjira');
            } else {
                let activeCategory = songsControlCATS.find('.sControlCATG.active').find('> .nameOfCategory'),
                    categoryName = get_last_class(activeCategory).slice(0, -3);
                create_single_CATG_songs(categoryName);
                sControl.addClass('working');
            }
        }
    });
    // Going to tools
    goToToolsBTN.click(function () {
        songsControlCATS.animate({ scrollLeft: songsControlCATS.width() * 2 });
    });

    // Smooth scroll from home to music
    scroll_smooth_to_music = function () {
        var width = songsControlCATS.width();
        songsControlCATS.addClass('scroll-smooth');
        // songsControlCATS.scrollLeft(width);
        songsControlCATS.animate({ scrollLeft: width });
        setTimeout(() => {
            songsControlCATS.removeClass('scroll-smooth');
        }, 1500);
    }


    /**
     * Swipe up to close song category
     * if visible songs are less than 8
    */

    // sCatWrapper.on('touchstart', function (e) {
    //     swipeInitial_X = e.originalEvent.touches[0].clientX;
    //     swipeInitial_Y = e.originalEvent.touches[0].clientY;
    // });
    // sCatWrapper.on('touchend', function (e) {
    //     var cat_to_Hide = $(this);
    //     var tis_Height = cat_to_Hide.height();
    //     // var tis_Width = cat_to_Hide.width();
    //     var swipeFinal_X = e.originalEvent.changedTouches[0].clientX;
    //     var swipeFinal_Y = e.originalEvent.changedTouches[0].clientY;

    //     var swipe_Diff_X = Math.abs(swipeFinal_X - swipeInitial_X);
    //     var swipe_Diff_Y = swipeFinal_Y - swipeInitial_Y;

    //     var inCAT_visible_Songs = $('.inCAT').find('div.SongElement').filter(function () {
    //         return $(this).is(':visible');
    //     }).length;

    //     if ((winWid < 576 && (swipe_Diff_X > 1) && (swipe_Diff_Y < - (tis_Height / 6)) && (inCAT_visible_Songs < 8) && (!otherResults.is(':visible')))) {
    //         activeSHome();
    //     }
    // });

    let touchInitial_X, touchInitial_Y, canScale = false, scaleRate;

    sCatWrapper.on('touchstart', function (e) {
        if (winWid < 576) {
            touchInitial_X = e.originalEvent.touches[0].clientX;
            touchInitial_Y = e.originalEvent.touches[0].clientY;
            var inCAT_visible_Songs = $('.inCAT').find('div.SongElement').filter(function () {
                return $(this).is(':visible');
            }).length;
            (inCAT_visible_Songs < 8
                && !otherResults.is(':visible')
                && !$('#oragnizeSong').is(':visible'))
                && (canScale = true)
        }
    });
    sCatWrapper.on('touchmove', function (e) {
        if (canScale) {
            let touchOnMove_Y = e.originalEvent.touches[0].clientY;
            touch_Diff_Y = touchOnMove_Y - touchInitial_Y;
            if (touch_Diff_Y <= -20) {
                scaleRate = 1 + (touch_Diff_Y / 1000);
                sCatWrapper.addClass('trans-0');
                sCatWrapper.css({ scale: '' + scaleRate + '' });
            }
        }
    });
    sCatWrapper.on('touchend', function (e) {
        if (canScale) {
            if (scaleRate < 0.85) {
                activeSHome();
            }
            sCatWrapper.removeClass('trans-0');
            sCatWrapper.css({ scale: '1' });
            sCatWrapper.css({ scale: '' });
            touchInitial_X = undefined;
            touchInitial_Y = undefined;
            scaleRate = undefined;
            canScale = false;
        }
    });

    /**
     * Displaying category songs
    */

    create_CATG_songs = function (desiredCatg) {
        var songCategory_container,
            songCategoryList;

        sControl.addClass('working');
        deselect_song();
        songsArray.forEach((obj) => {
            // Finding the right caregory
            if (obj.catgName == desiredCatg) {
                songCategory_container = $('.' + desiredCatg + 'D'),
                    songCategoryList = songCategory_container.find('.CATG_list');
                // Retrieve songs list
                let songsToShow = obj.songs;
                // Sort the list, except "More songs" catgegory
                if (desiredCatg !== 'More_songs') {
                    songsToShow.sort((a, b) => a.sname.localeCompare(b.sname));
                }
                // Creating song element substituents
                songsToShow.forEach((song) => {
                    var songName = song.sname.trim(),
                        songlink = 'https://drive.google.com/uc?export=download&id=' + song.slink.trim();
                    const songElementHolder = document.createElement('li'),
                        songElement = document.createElement('div');
                    songElement.classList.add('SongElement');

                    const songElementPdfIcon = document.createElement('span');
                    songElementPdfIcon.classList.add('fa', 'fa-file-pdf', 'col-1', 'me-1');
                    // const songElementPdfIcon = document.createElement('img');
                    // songElementPdfIcon.setAttribute('src', '../../Pics/svg-pdf-file.svg');
                    // songElementPdfIcon.setAttribute('style', 'max-width: 2.2rem;');
                    // songElementPdfIcon.classList.add('col-1', 'mx-2');

                    const songNameBlock = document.createElement('div');
                    songNameBlock.classList.add('songNameBlock', 'notranslate');

                    const songElementDownloader = document.createElement('a');
                    songElementDownloader.setAttribute('href', songlink);
                    songElementDownloader.setAttribute('download', '');
                    songElementDownloader.setAttribute('target', '_blank');
                    songElementDownloader.classList.add('DNLDConf');

                    const songElementDownloadIcon = document.createElement('span');
                    songElementDownloadIcon.classList.add('fa', 'fa-download', 'clickDown');
                    songElementDownloadIcon.setAttribute('id', 'downloadOk');
                    songElementDownloadIcon.setAttribute('title', 'Download');
                    songElementDownloadIcon.setAttribute('data-bs-toggle', 'tooltip');
                    // Combining all substituents
                    songNameBlock.innerHTML = songName;
                    songNameBlock.appendChild(songElementDownloader);
                    songElement.appendChild(songElementPdfIcon);
                    songElement.appendChild(songNameBlock);
                    songElement.appendChild(songElementDownloadIcon);
                    songElementHolder.appendChild(songElement);
                    // Adding songs to their containers
                    songCategoryList.append(songElementHolder);
                });
            }
        });
        songCategory_container.addClass('view');
        songCategoryList.addClass('inCAT');
        activate($('.' + desiredCatg + 'CAT').parent());
        visible_category_name(songCategory_container.find('.CATG_description > .CATG_name').text());
    }

    create_single_CATG_songs = function (desiredCatg) {
        hide_CATG_containers();
        create_CATG_songs(desiredCatg);
    }

    create_all_CATG_songs = function () {
        songsArray.forEach((categoryBlock) => {
            let categoryName = categoryBlock.catgName;
            create_CATG_songs(categoryName);
        });
    }



    const songOptions = $('.ScatSearch .options');

    // handlers

    // Select songs to download
    // function select_song(e) {
    //     var toSelect = this;
    //     var toSelectParent = toSelect.parentNode;

    //     var toSelectParentSiblings = Array.from(toSelectParent.parentNode.children);
    //     toSelectParentSiblings.forEach(function (el) {
    //         var songElement = el.querySelector('.SongElement');
    //         if (songElement !== toSelect) {
    //             songElement.classList.remove('Sselected');
    //         }
    //     });

    //     toSelect.classList.toggle('Sselected');

    //     toggle_options();

    //     if ((toSelect === e.target || toSelect.contains(e.target)) && e.altKey) {
    //         toSelect.querySelector('.DNLDConf').click();
    //         deselect_song();
    //         alert_song_download();
    //     }
    // }

    // In jQ

    select_song = function (e) {
        var toSelect = $(this);
        toSelect.parent().siblings().find('.SongElement.Sselected').removeClass('Sselected');
        toSelect.toggleClass('Sselected');
        toggle_options();
        // Instantly download the song
        if ((toSelect.is(e.target) || toSelect.has(e.target).length) && e.altKey) {
            let theLink = e.target.querySelector('.DNLDConf').getAttribute('href');
            deselect_song();
            alert_song_download();
            window.open(theLink, '_blank');
        }
    }
    $('.CATG_list').on('click', '.SongElement', select_song);

    // Deselect song
    deselect_song = function () {
        $('.SongElement.Sselected').removeClass('Sselected');
        $('.SongsToTop').removeClass('hasSelection').addClass('noSelection');
        toggle_options();
    }

    // Show options by r-clicking a selected song
    $('.CATG_list').on('contextmenu', '.SongElement, .SongElement *', function (e) {
        if ($(e.target).hasClass('Sselected') || $(e.target).closest('.SongElement').hasClass('Sselected')) {
            e.preventDefault();
            const chmsMenu = $('.chms-cont-menu');
            chmsMenu.removeClass('secondary-menu');
            show_custom_menu(e, chmsMenu);
        }
    });

    // Download selected song
    download_selected_song = function () {
        var selectedSong = $('.inCAT').find('.Sselected'),
            songLink = selectedSong.find('a').attr('href');
        // Notify action
        alert_song_download();
        window.open(songLink, '_blank');
    }
    $('.CATG_list').on('click', '#downloadOk', download_selected_song);
    $('.chmsPreviewFileDownload').on('click', download_selected_song);

    /**
     * Checking missing elements from the list
     */

    // function checkForMissing(listName) {
    //     const listItems = listName.find('li');
    //     const tocheck = songsArray;
    //     var categoryName = String(get_last_class(listName).slice(0, -1));
    //     var myNewArray;
    //     tocheck.forEach((el) => {
    //         if (el.catgName == categoryName) {
    //             myNewArray = (el.songs).map(dis => dis.sname);
    //         }
    //     });
    //     // Check for missing
    //     for (const i of listItems) {
    //         const text = $(i).text().trim();
    //         if (myNewArray.indexOf(text) < 0) {
    //             console.log('This is not found \n\n' + text);
    //         }
    //     }
    // }

    /**
     * Checking for list duplicates
     */

    // function checkForDuplicates(myList) {
    //     const listItems = myList.find('li');
    //     const uniqueItems = [];
    //     const duplicateItems = [];
    //     for (const listItem of listItems) {
    //         const text = $(listItem).text().trim();
    //         const currentIndex = Array.from(listItems).indexOf(listItem);
    //         // Check for duplicates
    //         if (uniqueItems.includes(text)) {
    //             if (!duplicateItems.includes(text)) {
    //                 duplicateItems.push(text);
    //             }
    //         } else {
    //             uniqueItems.push(text);
    //         }
    //         // Output results at the end
    //         if ((currentIndex + 1) === listItems.length) {
    //             console.log(listItems.length + ' items\n\n');
    //             if (duplicateItems.length > 0) {
    //                 console.log(duplicateItems.length + ' case(s) of duplicates found');
    //                 console.log(duplicateItems);
    //             } else {
    //                 console.log('No duplicates found');
    //             }
    //         }
    //     }
    // }

    /**
     * Working on favorite songs
    */

    // Update number
    let myFavs = localStorage.getItem('favSongs');
    myFavs && $('.favorite-songs-num').html(JSON.parse(myFavs).length)


    //state
    var favSongsList;
    const favSongsContainer = document.getElementsByClassName('favorite-songs-list')[0];

    //on call
    $('.chms-favorites').click(function () {
        const favSongs = localStorage.getItem('favSongs');
        if (favSongs) {
            favSongsList = JSON.parse(favSongs);
            show_favorite_songs();
        } else {
            show_custom_alert("We couldn't find your list of favorite songs. Begin by marking some songs as favorites to make the list.");
        }
    });

    //handlers
    update_favorite_songs = function (theList) {
        favSongsContainer.innerHTML = '';
        theList.forEach(function (el) {
            const favSongHolder = document.createElement('li'),
                // Create options
                myOption = document.createElement('span'),
                arrowUp = document.createElement('button'),
                arrowDown = document.createElement('button'),
                removal = document.createElement('button');
            arrowUp.classList.add('fa', 'fa-arrow-up', 'moveUp');
            arrowDown.classList.add('fa', 'fa-arrow-down', 'moveDown');
            removal.classList.add('fa', 'fa-trash', 'removeThis');
            removal.setAttribute('removal', '');
            myOption.appendChild(arrowUp);
            myOption.appendChild(arrowDown);
            myOption.appendChild(removal);
            // Write song and add options
            favSongHolder.innerHTML = el;
            favSongHolder.appendChild(myOption);
            favSongsContainer.appendChild(favSongHolder);
            // Detect action
            favSongHolder.addEventListener('click', function (e) {
                var optionsContainer = this.querySelector(':scope > span');
                if (optionsContainer !== e.target && !optionsContainer.contains(e.target) && !this.classList.contains('active')) {
                    go_to_song(this.innerText);
                    if ($(window).width() >= 576) {
                        close_fixHolder($(this).closest('.fix-holder'));
                    }
                }
            });
            favSongHolder.addEventListener('contextmenu', function (e) {
                e.preventDefault()
                activate($(this));
            });
            removal.addEventListener('click', remove_favorite_song);
            arrowDown.addEventListener('click', rearrange_favorite_song);
            arrowUp.addEventListener('click', rearrange_favorite_song);
        });
        // Song move action
        function rearrange_favorite_song(e) {
            var mover = this;
            var currentElement = this;
            while (currentElement.tagName !== 'LI') {
                currentElement = currentElement.parentNode;
            }
            if (currentElement.tagName === 'LI') {
                var thisSongName = currentElement.textContent;
                var favoriteSongsList = localStorage.getItem('favSongs');
                favoriteSongsList = JSON.parse(favoriteSongsList);
                var toDisplaceInx = favoriteSongsList.indexOf(thisSongName);
                // Chech for sibling
                var nextSongs = currentElement.nextSibling;
                var prevSongs = currentElement.previousSibling;
                if (nextSongs && mover.classList.contains('fa-arrow-down')) {
                    var newName = nextSongs.textContent;
                    nextSongs.parentNode.insertBefore(nextSongs, currentElement);
                    favoriteSongsList[toDisplaceInx] = newName;
                    favoriteSongsList[(toDisplaceInx + 1)] = thisSongName;
                }
                if (prevSongs && mover.classList.contains('fa-arrow-up')) {
                    var newName = prevSongs.textContent;
                    prevSongs.parentNode.insertBefore(currentElement, prevSongs);
                    favoriteSongsList[toDisplaceInx] = newName;
                    favoriteSongsList[(toDisplaceInx - 1)] = thisSongName;
                }
                localStorage.setItem('favSongs', JSON.stringify(favoriteSongsList));
            }
        }
        // Song remove action
        function remove_favorite_song() {
            var currentElement = this;
            while (currentElement.tagName !== 'LI') {
                currentElement = currentElement.parentNode;
            }
            if (currentElement.tagName === 'LI') {
                var toRemove = currentElement.textContent;
            }
            // Get current list from the storage
            var favoriteSongsList = localStorage.getItem('favSongs');
            favoriteSongsList = JSON.parse(favoriteSongsList);
            var toRemoveInx = favoriteSongsList.indexOf(toRemove);
            // Remove the item from the storage
            if (favoriteSongsList.length > toRemoveInx) {
                if (favoriteSongsList.length == 1) {
                    clear_favorite_songs();
                } else {
                    favoriteSongsList.splice(toRemoveInx, 1);
                    $('.favorite-songs-num').html(favoriteSongsList.length);
                    localStorage.setItem('favSongs', JSON.stringify(favoriteSongsList));
                    currentElement.classList.add('shrinkY');
                    setTimeout(() => {
                        currentElement.parentNode.removeChild(currentElement);
                    }, 300);
                }
            }
        }
    }

    sort_favorite_songs = function () {
        sort_list(favSongsContainer);
        localStorage.removeItem('favSongs');
        const favoriteSongsList = []
        var newList = favSongsContainer.querySelectorAll('li');
        newList.forEach((el) => {
            favoriteSongsList.push(el.textContent);
        });
        localStorage.setItem('favSongs', JSON.stringify(favoriteSongsList));
    }

    clear_favorite_songs = function () {
        favSongsContainer.innerHTML = '';
        localStorage.removeItem('favSongs');
        $('.favorite-songs-num').html('0');
        $('.favorite-songs').parent().trigger('click');
        show_toast('<span class="fa fa-trash-alt me-2" style="animation: wobbleBottom 1s 1;"></span> Deleted list of favorites');
    }

    show_favorite_songs = function () {
        $('.favorite-songs').parent().show();
        update_favorite_songs(favSongsList);
    }

    $('.favorite-cont-icon').click(function (e) {
        show_custom_menu(e, $('.favorite-cont-menu'));
    });



    /**
     * CHM song search from page searcher
     */

    let songsStringArray = [],
        songsFoundBySearch = [];

    // Pre-extract all available songs
    pre_extract_all_avl_songs = function (currentStr) {
        songsFoundBySearch = [];
        songsStringArray.forEach((song) => {
            let songName = song.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            if (songName.includes(currentStr) && !songsFoundBySearch.includes(song)) {
                let matchRegex = new RegExp(currentStr, 'ig');
                song = song.replace(matchRegex, '<span class="matched-str">' + song.match(matchRegex) + '</span>');
                songsFoundBySearch.push(song);
            }
        });
        $('.SONG-AVB .AVB-Num').html(songsFoundBySearch.length);
        songsFoundBySearch.length > 0 ?
            $('.SONG-AVB').addClass('active')
            : $('.SONG-AVB').removeClass('active');
    }
    // Extract all available songs
    extract_all_avl_songs = function () {
        songsStringArray = [];
        songsArray.forEach((obj) => {
            obj.songs.forEach((el) => {
                songsStringArray.push(el.sname);
            });
        });
        if (pageSearchInput.val()) {
            let str = pageSearchInput.val().toLowerCase();
            pre_extract_all_avl_songs(str);
        }
    }

    // Filter from available songs
    filter_documents = function () {
        let schSONG = pageSearchInput.val().toLowerCase();
        songsFoundBySearch = [];
        pre_extract_all_avl_songs(schSONG);
    }

    // Display found songs
    const songSearchOutput = $('.schResults > div:first-child');
    display_found_songs = function () {
        if (songsFoundBySearch.length > 0) {
            loading();
            songSearchOutput.empty();
            songsFoundBySearch.forEach((result) => {
                const found_Song =
                    '<div class="SongElement">\
                    <div class="w-80">' + result + '</div><span class="w-20 grid-center ptr go-to-found">Go to</span>\
                    </div>';
                songSearchOutput.append(found_Song);
            });
        } else {
            songSearchOutput.empty();
            show_custom_alert
                ('<img src="../../Pics/not_found.svg" class="w-2rem ratio-1-1 rad-50 bg-light mb-2"> \
                No results found. Check for typos or try again using different keywords', 'dark');
            playNotifErrorSound();
        }
    }

    // Combined song search handlers
    pageSearchInput.on({
        focus: function () {
            extract_all_avl_songs();
        },
        keyup: function () {
            filter_documents();
        },
        keypress: function (e) {
            if (e.keyCode == 13) {
                if (songsFoundBySearch.length > 0) {
                    sessionStorage.setItem('searchedFor', pageSearchInput.val());
                }
                if (!$('.page-searcher').hasClass('working')) {
                    if (songsFoundBySearch.length < 1) {
                        show_custom_alert
                            ('<img src="../../Pics/not_found.svg" class="w-2rem ratio-1-1 rad-50 bg-light mb-2"> \
                            No results found. Check for typos or try again using different keywords', 'dark');
                        playNotifErrorSound();
                    } else {
                        show_search_tool();
                        display_found_songs();
                    }
                } else {
                    display_found_songs();
                }
            }
        },
    });

    // Auto fill searched song on load
    const searchedSTR = sessionStorage.getItem('searchedFor');
    searchedSTR && pageSearchInput.val(searchedSTR);

    // Go to the found song
    songSearchOutput.on('click', '.go-to-found', function () {
        var str = pageSearchInput.val().toLowerCase(),
            clickedSongName = $(this).prev().text();
        clickedSongNameNoAccents = clickedSongName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        go_to_song(clickedSongName);
        // Show result info
        let exactSong = $('.inCAT').find('li div.SongElement').filter(function () {
            return $(this).text() == clickedSongName;
        }),
            allFoundSongs = $('.inCAT').find('li div.SongElement:icontains(' + str + ')');
        sCatWrapper.addClass('fromSTool');
        sCatSearcher.val(str);
        unselect_SResults();
        searchResultsNum = 0;
        // Filter songs
        $('.inCAT li').filter(function () {
            $(this).toggle($(this).text().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().indexOf(str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) > - 1);
        });
        if (allFoundSongs.length > 1) {
            exactSong.addClass('Sselected');
            exactSong.parent().siblings().find('.SongElement.Sselected').removeClass('Sselected');
            sCatWrapper.animate({ scrollTop: exactSong.parents('li')[0].offsetTop - 50 });
        }
        toggle_options();
        songSearchTool.fadeOut();
    });

    /**
     * CHM song search from category searcher
     */

    let foundElseList = [];
    var indirimboAll = 0;

    sCatSearcher.on({
        keyup: function () {
            var indirimbo = $(this).val().trim().toLowerCase();
            var indirimbo_inCAT = $('.inCAT li').find('div:icontains(' + indirimbo + ')').length;
            $('.inCAT li').filter(function () {
                $(this).toggle($(this).text().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().indexOf(indirimbo) > - 1);
            });

            // Find possible results from other categories
            if (indirimbo_inCAT < 1) {
                indirimboAll = 0;
                songsArray.forEach((obj) => {
                    obj.songs.forEach((el) => {
                        let disNameLower = el.sname.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                        if (disNameLower.includes(indirimbo)) {
                            indirimboAll += 1;
                        }
                    });
                });
                if (indirimboAll > 0) {
                    let results_space = $('.otherResults > hr:last-of-type');
                    remove_not_found_svg();
                    $('.foundElse').remove();
                    foundElseList = [];
                    songsArray.forEach((obj) => {
                        obj.songs.forEach((el) => {
                            let disName = el.sname.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
                                categoryName = obj.catgName;
                            categoryName = categoryName.replace(/[_]/g, ' ');
                            if (disName.includes(indirimbo) && !foundElseList.includes(categoryName)) {
                                foundElseList.push(categoryName);
                            }
                        });
                    });
                    // Show possible results
                    otherResults.show();
                    foundElseList.forEach((categoryTitle) => {
                        let foundElse = `<div class="px-4 foundElse">${categoryTitle}</div>`;
                        results_space.before(foundElse);
                    });
                } else if (indirimboAll < 1) {
                    otherResults.removeClass('flyOutBB').hide();
                    otherResults.css({ animation: 'flyInBottomSM 1s 1' });
                    $('.foundElse').remove();
                    append_not_found_svg($('.inCAT'));
                    $('.emptyBox').css({ width: '80%' });
                    $('.songTools').addClass('inx-high');
                }
            } else {
                otherResults.hide();
                remove_not_found_svg();
            }
        }
    });

    // Go to else found suggestions from wrong query

    otherResults.on('click', '.foundElse', function () {
        let toGoTo = $(this).text();
        toGoTo = toGoTo.replace(/[ ]/g, '_');
        remove_not_found_svg();
        $('.CATG_list').removeClass('inCAT').empty();
        hide_other_schResults();

        // $('*.ScatSongs').removeClass('inCAT view');
        $('.ScatSongs').removeClass('view');
        let categoryName;
        songsArray.forEach((obj) => {
            if (obj.catgName == toGoTo) {
                categoryName = obj.catgName;
            }
        });
        create_single_CATG_songs(categoryName);

        // Filter songs
        $('.inCAT li').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(sCatSearcher.val().trim().toLowerCase()) > - 1);
        });
    });

    /**
     * Go to song
     */

    go_to_song = function (desiredSong) {
        var categoryName,
            isSongFound = false,
            desiredSongNoAccents = desiredSong.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        songsArray.forEach((obj) => {
            obj.songs.forEach((el) => {
                if (el.sname.normalize('NFD').replace(/[\u0300-\u036f]/g, '') == desiredSongNoAccents) {
                    categoryName = obj.catgName;
                    isSongFound = true;
                }
            });
        });
        // Show corresponging category songs
        if (isSongFound) {
            create_single_CATG_songs(categoryName);
            // enter_songs();
            activeSMusic();
            sCatSearcher.val(desiredSong);
            // Filter songs
            $('.inCAT li').filter(function () {
                $(this).toggle($(this).text().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(desiredSongNoAccents) > - 1);
            });
        }
    }


    // Sort category songs

    sort_all_songs = function () {
        var songListContainers = document.querySelectorAll('.ScatSongs:not(.More_songsD)');
        songListContainers.forEach((containers) => {
            var list = containers.querySelector('.CATG_list');
            sort_list(list);
        });
    }

    /**
     * CHM_song document actions
    */

    toggle_options = function () {
        var selLen = $('.Sselected').length;
        selLen > 0 ?
            songOptions.removeClass('disabled')
            : songOptions.addClass('disabled');
        selLen > 0 ?
            $('.category-song-tools .grid-options').addClass('active')
            : $('.category-song-tools .grid-options').removeClass('active');
    }

    songOptions.click(() => {
        $('.chms-cont-menu').removeClass('secondary-menu');
    });

    $('.chms-iframe-viewer .preview-cont-menu').click(() => {
        $('.chms-cont-menu').addClass('secondary-menu');
    });

    // Copy link
    copy_link_selected_song = function () {
        var selectedSong = $('.inCAT').find('.Sselected'),
            songLink = selectedSong.find('a').attr('href');
        navigator.clipboard.writeText(songLink).then(() => {
            // Notify action
            notify_link_copied();
        });
    }
    $('.copyLinkChmSong, .chmsPreviewFileLink').click(copy_link_selected_song);

    // Share
    share_selected_song = function () {
        var selectedSong = $('.inCAT').find('.Sselected'),
            songLink = selectedSong.find('a').attr('href'),
            songName = selectedSong.find('> div').text().trim(),
            message = 'Hello friend !!\nYou can read and download this song: " *' + songName +
                '* " with the link below.\n\n';
        navigator.clipboard.writeText(message).then(() => { });
        navigator.share({
            title: songName,
            text: message,
            url: songLink
        }).then(() => console.log('Successful share')).catch(error => show_custom_alert('Error sharing:', error));
    }
    $('.shareChmSong, .chmsPreviewFileShare').click(share_selected_song);

    // organize
    organize_selected_song = function () {
        var selectedSong = $('.inCAT').find('.Sselected'),
            songName = selectedSong.find('> div').text().trim(),
            songFromCategory = $('.ScatTools .ScatName').text().trim();
        $('#oragnizeSong').show();
        $('.song-name-to-organize').html(songName);
        $('.song-category-to-organize').html(songFromCategory);
    }
    $('.organizeChmSong, .chmsPreviewFileShare').click(organize_selected_song);

    // Sending organize request
    $('#requestToOrganizeSong').on('click', function () {
        const oragnizeSong = $('#oragnizeSong');
        let selectedOptions = oragnizeSong.find('.select-options-any li.selected');
        if (selectedOptions.length === 0) {
            show_toast('⚠️ No category selected');
        } else {
            let selectedValues = [];
            selectedOptions.each(function () {
                selectedValues.push($(this).text().trim());
            });

            let songName = oragnizeSong.find('.song-name-to-organize').text().trim();
            let fromCategory = oragnizeSong.find('.song-category-to-organize').text().trim();

            // AJAX call to send the request
            addLoader();
            $.ajax({
                url: 'request_song_organisation.php',
                type: 'POST',
                data: {
                    selectedValues: JSON.stringify(selectedValues),
                    songName: songName,
                    fromCategory: fromCategory
                },
                success: function (response) {
                    result = JSON.parse(response);
                    removeLoader();
                    show_toast(result.message); // Show the response in a toast
                    if (result.success) {
                        oragnizeSong.find('.select-options-any li').removeClass('selected');
                        oragnizeSong.trigger('click');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error: ' + error);
                    removeLoader();
                    show_toast('❌ Sorry! Something went wrong, please try again.');
                }
            });
        }
    });

    // Search video
    video_selected_song = function () {
        var selectedSong = $('.inCAT').find('.Sselected'),
            songName = selectedSong.find('> div').text().trim();
        songName = songName.replaceAll(' ', '+'),
            songName = songName.replace('-', 'by'),
            songName = songName.replace('_Harm_', 'harmonized by'),
            songName = songName.replace('_Arr_', 'arranged by'),
            youTubeSearchLink = 'https://www.youtube.com/results?search_query=' + songName;
        window.open(youTubeSearchLink, '_blank');
    }
    $('.videoQueryChmSong').click(video_selected_song);

    // Favorite
    favorite_selected_song = function () {
        var songName = $('.inCAT .Sselected').find('> div').text().trim();
        // Update / set current list from / into the storage
        if (songName === '' || songName === undefined) {
            show_toast('No file selected');
            return;
        }
        var favoriteSongsList = localStorage.getItem('favSongs');
        if (favoriteSongsList) {
            favoriteSongsList = JSON.parse(favoriteSongsList);
        } else {
            favoriteSongsList = [];
        }
        // Avoiding duplicates
        if (!favoriteSongsList.includes(songName)) {
            favoriteSongsList.push(songName);
            $('.favorite-songs-num').html(favoriteSongsList.length);
            localStorage.setItem('favSongs', JSON.stringify(favoriteSongsList));
            update_favorite_songs(favoriteSongsList);
            // Notify action
            playNotifSuccessSound();
            show_toast('<span class="fa fa-star me-2"></span> Added to favorites');
        } else {
            show_custom_alert('This song is already enlisted in your favorites');
        }
    }
    $('.starChmSong').click(favorite_selected_song);

    // Preview

    preview_selected_chm_song = function () {
        preview_file($('.chms-iframe-viewer'));
    }
    $('.previewChmSong').click(preview_selected_chm_song);

    hide_preview = function () {
        let toHide = $('.iframe-viewer').parent(),
            thePreview = toHide.find('iframe');
        thePreview.html('');
        thePreview.attr('src', '');
        // toHide.hide();
    }
    close_preview = function () {
        let toHide = $('.iframe-viewer').parent(),
            thePreview = toHide.find('iframe');
        thePreview.html('');
        thePreview.attr('src', '');
        toHide.hide();
    }

    // Song actions keyboard shortcuts

    isSongSelected = function () {
        if ($('.Sselected').length > 0) {
            return true;
        }
    }

    function confirm_favorite_selected_song() {
        if (confirm('Favorite selected song?')) {
            favorite_selected_song();
        }
    }
    function confirm_file_preview() {
        if (confirm('Preview selected song?')) {
            preview_selected_chm_song();
        }
    }
    function confirm_copy_link_selected_song() {
        if (confirm('Get a link for selected song?')) {
            copy_link_selected_song();
        }
    }
    function confirm_share_selected_song() {
        if (confirm('Share selected song?')) {
            share_selected_song();
        }
    }
    function confirm_organize_selected_song() {
        if (confirm('Organise selected song?')) {
            organize_selected_song();
        }
    }
    function confirm_video_selected_song() {
        if (confirm('Search video for selected song?')) {
            video_selected_song();
        }
    }

    document.onkeyup = function (e) {
        // Song options
        if (visible(sCatWrapper)) {
            let pressedKey = e.key;
            const chmSongActionKeys = { preview: ['p', 'P'], favorite: ['f', 'F'], link: ['l', 'L'], share: ['s', 'S'], organize: ['o', 'O'], video: ['v', 'V'], }
            for (const doer in chmSongActionKeys) {
                if (chmSongActionKeys[doer].includes(pressedKey)) {
                    hide_custom_fixed();
                }
            }
            // P key for preview
            if (isSongSelected() && !$('input').is(':focus') && chmSongActionKeys.preview.includes(pressedKey)) {
                confirm_file_preview();
            }
            // F key for favorite
            if (isSongSelected() && !$('input').is(':focus') && chmSongActionKeys.favorite.includes(pressedKey)) {
                confirm_favorite_selected_song();
            }
            // L key for link
            if (isSongSelected() && !$('input').is(':focus') && chmSongActionKeys.link.includes(pressedKey)) {
                confirm_copy_link_selected_song();
            }
            // S key for share
            if (isSongSelected() && !$('input').is(':focus') && chmSongActionKeys.share.includes(pressedKey)) {
                confirm_share_selected_song();
            }
            // O key for organizing
            if (isSongSelected() && !$('input').is(':focus') && chmSongActionKeys.organize.includes(pressedKey)) {
                confirm_organize_selected_song();
            }
            // // V key for video
            // if (isSongSelected() && !$('input').is(':focus') && chmSongActionKeys.video.includes(pressedKey)) {
            //     confirm_video_selected_song();
            // }
        }
        // Previews
        if (e.key == "Enter") {
            if ($('.Sselected').length > 0 && visible(sCatWrapper) && hidden(songSearchTool)) {
                preview_selected_chm_song();
            }
        }
    }

    alert_song_download = function () {
        show_toast('<span class="fa fa-download me-2"></span> Downloading your file ...');
    }

    // New songs upload
    $('.new-added-songs').html(sum_CHM_songs() - 2271);
    // Date update for new songs upload
    count_elapsed_time('09/23/2024', $('.Notif_Elem-uploads').find('.upToToday'));
    // Date update for ESG new video songs
    count_elapsed_time('08/16/2024', $('.Notif_Elem-stream').find('.upToToday'));

    /**
     * Conditional document events
     */

    const currentMonthData = $('.monthElem_data-lg');
    $(document).on({
        keydown: function (e) {
            if ((e.key == 'q' || e.key == 'Q') && visible($('.chms-iframe-viewer'))) {
                e.preventDefault();
                close_preview();
            }
            // Navigate the current calendar days by keyboard
            if ((e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'ArrowUp' || e.key == 'ArrowDown') && currentMonthData.hasClass('selected')) {
                let activateDay = parseInt(currentMonthData.find('span.selected').text(), 10),
                    prevDay = activateDay - 1,
                    nextDay = activateDay + 1,
                    currentCalendarDays = currentMonthData.find('.monthDates > span:not(.text-muted)').map(function () {
                        return $(this).text();
                    }).get();
                if (e.key == 'ArrowLeft' && (activateDay > currentCalendarDays[0])) {
                    currentMonthData.find('.monthDates > span:not(.text-muted)').filter(function () {
                        return $(this).text() == prevDay;
                    }).trigger('click');
                }
                if (e.key == 'ArrowRight' && (activateDay < currentCalendarDays[(currentCalendarDays.length) - 1])) {
                    currentMonthData.find('.monthDates > span:not(.text-muted)').filter(function () {
                        return $(this).text() == nextDay;
                    }).trigger('click');
                }
                if (e.key == 'ArrowUp' && ((activateDay - 7) >= currentCalendarDays[0])) {
                    e.preventDefault();
                    currentMonthData.find('.monthDates > span:not(.text-muted)').filter(function () {
                        return $(this).text() == (activateDay - 7);
                    }).trigger('click');
                }
                if (e.key == 'ArrowDown' && ((activateDay + 7) <= currentCalendarDays[(currentCalendarDays.length) - 1])) {
                    e.preventDefault();
                    currentMonthData.find('.monthDates > span:not(.text-muted)').filter(function () {
                        return $(this).text() == (activateDay + 7);
                    }).trigger('click');
                }
            }
        },
        keyup: function (e) {
            if (e.ctrlKey && e.key == 'ArrowLeft' && sCatWrapper.is(':visible') && !sCatSearcher.is(':focus')) {
                e.preventDefault();
                activeSHome();
            }
            if (e.key == 'Escape' && visible($('.chms-iframe-viewer'))) {
                close_preview();
            }
        },
        click: function (e) {
            currentMonthData.has(e.target).length ? $(e.target.closest('.monthElem_data-lg')).addClass('selected') : currentMonthData.removeClass('selected')
        }
    });

    // Page tips
    let pageTips = [
        { tipElement: $(".songsControl-nav .fa-bars"), tipTitle: "Menu", tipMessage: "Use this menu to navigate through different pages of our platform. You can find out more interesting content about ESG" },
        { tipElement: $(".songsControl-nav .fa-home"), tipTitle: "Home", tipMessage: "The home space for this page, where you will discover various activities that you can engage in" },
        { tipElement: $(".songsControl-nav .fa-music"), tipTitle: "Song categories", tipMessage: "This is the chamber of our songs library. All the songs you look for are stored here" },
        { tipElement: $(".songsControl-nav .fa-tools"), tipTitle: "Tools", tipMessage: "Explore various tools available for managing and interacting with our collection of compositions" },
        { tipElement: $(".songsControl-nav .fa-search"), tipTitle: "Search tool", tipMessage: "Use the search tool to search for songs from all available categories" },
        { tipElement: $(".songsControl-nav .fa-star"), tipTitle: "Favorites", tipMessage: "Easily access your favorite songs from this section" },
        { tipElement: $(".songsControl-nav .fa-shield-alt"), tipTitle: "Guide", tipMessage: "Review the guidelines and best practices for accessing and using the compositions on our platform" },
        // { tipElement: $(".songsControl-nav .fa-cloud-upload-alt"), tipTitle: "Upload a song", tipMessage: "Found a missing copy, or want to upload your own? Use this tool to upload additional compositions into the collection" },
        { tipElement: $(".songsControl-nav .fa-laptop"), tipTitle: "Fullscreen mode", tipMessage: "You can toggle fullscreen mode to change your focus on this tab" },
        { tipElement: $(".songsControl-nav .fa-gear"), tipTitle: "Web settings", tipMessage: "Easily customize web controls such as the theme, animations, guide, and more. Additionally, you'll find a few key pieces of important information about ESG here" },
        { tipElement: $("#refreshIcon"), tipTitle: "Refresh songs", tipMessage: "Click on the refresh icon to renew the list and keep discovering fresh compositions." },
    ];
    chmsTipsList = pageTips.concat([...webTipsList]);
    allTipsNum = chmsTipsList.length;

    $('.web-tips-toggler').click(function () {
        show_web_tips(chmsTipsList, 0);
    });
    next_web_tips = function () {
        tipIndex = (tipIndex + 1) % allTipsNum;
        while (!visible(chmsTipsList[tipIndex].tipElement)) {
            tipIndex = (tipIndex + 1) % allTipsNum;
        }
        show_web_tips(chmsTipsList, tipIndex);
    }
    prev_web_tips = function () {
        tipIndex = (tipIndex - 1) % allTipsNum;
        tipIndex < 0 && (tipIndex = allTipsNum - 1);
        while (!visible(chmsTipsList[tipIndex].tipElement)) {
            tipIndex = (tipIndex - 1) % allTipsNum;
            tipIndex < 0 && (tipIndex = allTipsNum - 1);
        }
        show_web_tips(chmsTipsList, tipIndex);
    }


    $(document).on({
        keyup: function (e) {
            if (visible(webTip)) {
                if (e.key == 'ArrowLeft') {
                    prev_web_tips();
                }
                if (e.key == 'ArrowRight') {
                    next_web_tips();
                }
            }
        },
    });

    // navigator.geolocation.getCurrentPosition(function (position) {
    //     console.log("Latitude: " + position.coords.latitude);
    //     console.log("Longitude: " + position.coords.longitude);
    //     console.log("Altitude: " + position.coords.altitude);
    //     console.log("TimeStamp: " + position.timestamp);
    // }, function (error) {
    //     show_custom_alert("Error displaying coordinates" + error.message);
    // });

    // console.log(navigator.geolocation);
});