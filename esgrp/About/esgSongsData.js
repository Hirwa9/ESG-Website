// Displaying clicked video with its info

const currentVideoHolder = $('.current-video__video'),
    esgSongAudioElement = $('#pageAudioPlayer'),
    musicPlayerButton = $('.music-controlls__player');

$('.other-videos').on('click', '.other-videos__video', function () {
    let curretLink = $(this).next().find('[youtube]').attr('href'),
        linkID = curretLink.slice(curretLink.lastIndexOf('/') + 1),
        embedLink = 'https://www.youtube.com/embed/' + linkID;
    let sYoutubeName,
        sMyAbout,
        sFileSize,
        sFileKey,
        sFileTempo,
        sFileDate,
        sFileLink;
    // Getting song data
    esgSongsArray.forEach((obj) => {
        if (obj.songId == linkID) {
            sYoutubeName = obj.songName,
                sMyAbout = obj.songAbout,
                sFileSize = obj.songFileSize,
                sFileKey = obj.songFileKey,
                sFileTempo = obj.songFileTempo,
                sFileDate = obj.songFileDate,
                sFileLink = 'https://drive.google.com/uc?export=download&id=' + obj.songFileLink;
        }
    });
    // Getting info DOM holders
    let currentVideoInfo = $('.current-video__info'),
        currentVideoName = currentVideoInfo.find('.videoTitle'),
        currentVideoAbout = currentVideoInfo.find('#songAbout'),
        currentVideoYoutubeLink = currentVideoInfo.find('.videoActions [youtube]'),
        currentVideoFile = $('.videoFile'),
        currentVideoFileSize = currentVideoFile.find('#fileSize'),
        currentVideoFileKey = currentVideoFile.find('#fileKey'),
        currentVideoFileTempo = currentVideoFile.find('#fileTempo'),
        currentVideoFileDate = currentVideoFile.find('#fileDate'),
        currentVideoFileLink = currentVideoFile.find('#fileLink');
    // Display/replace song information
    currentVideoHolder.addClass('video__playing');
    currentVideoHolder.find('iframe').attr('src', (embedLink + '?autoplay=1'));
    currentVideoYoutubeLink.attr('href', curretLink);
    currentVideoName.html(sYoutubeName);
    currentVideoAbout.html(sMyAbout);
    currentVideoFileSize.html('Size: ' + sFileSize);
    currentVideoFileKey.html('Key: ' + sFileKey);
    currentVideoFileTempo.html('Tempo: ' + sFileTempo);
    currentVideoFileDate.html('Date: ' + sFileDate);
    currentVideoFileLink.attr('href', sFileLink);
    $('.current-video__info .videoFile').collapse('hide');
    activate($(this).parent());
    scroll_page_to(currentVideoHolder, 50, 'slow');
    // Stop any audio playing
    stop_audio_song();
});

// Copying current video link

$('*#videoLinkCopy').click(function () {
    var theLink = $(this).next().attr('href');
    navigator.clipboard.writeText(theLink);
});

// Scroll to a song

$('.page-content-search-result_esg-songs').on('click', 'li', function () {
    let str = $(this).text(),
        songName = str.slice(0, str.indexOf('_')).trim(),
        theSong = $('.other-videos').find('h6:icontains(' + songName + ')'),
        theSongArea;
    if (theSong.length > 0) {
        theSongArea = theSong.parents('.other-videos-container');
        let songOffset = theSongArea.position().top;
        $('.other-videos').scrollTop(songOffset - 50);
    } else {
        theSong = $('.esgFiles').find('.esg-song__file > h4:icontains(' + songName + ')');
        theSongArea = theSong.parent();
    }
    scroll_page_to(theSongArea, 100);
    theSongArea.addClass('lighten');
    setTimeout(() => {
        theSongArea.removeClass('lighten');
    }, 3500);
});

// Scroll to song file

$('[data-bs-target=".videoFile"]').click(function () {
    setTimeout(() => {
        $('.current-video').animate({ scrollTop: $(window).height() }, 'slow');
    }, 500);
});

// Toggling current video playing-indicators

// // $(document).ready(function () {
//     currentVideoHolder.find('iframe').on('load', function () {
//         // Access the contentDocument of the iframe
//         var iframeDocument = this.contentDocument || this.contentWindow.document;
//         alert('Iframe loaded!');

//         // Attach a click event listener to the body of the iframe using jQuery
//         $(iframeDocument.body).on('click', function (event) {
//             alert('Click detected inside the iframe!');
//         });
//     });
// // });

// currentVideoHolder.find('iframe').on({
//     load: function () {
//         var iframeDocument = this.contentDocument || this.contentWindow.document;
//         // alert('Iframe loaded');
//         // iframeDocument.body.click(function () {
//         //     currentVideoHolder.toggleClass('floating');
//         // });
//         $(iframeDocument.body).on({
//             click: function () {
//                     alert('Clicked');
//             }
//         });
//         // $(iframeDocument.body).on('click', function(event) {
//         //     currentVideoHolder.toggleClass('video__playing');
//         //     alert('Clicked');
//         //   });
//     }
// });

// Floating a playing video

// let vidPlaying = false;
onscroll = function () {
    let playingVideos = $('.video__playing').length,
        scrolledHeight = scrollY;
    if ((scrolledHeight > (winHei / 2)) && (playingVideos > 0) && ($('.floated-video-minimizer').length < 1)) {
        let vidMinimizer = document.createElement('button');
        vidMinimizer.classList.add('floated-video-minimizer', 'fa', 'fa-close', 'shadow');
        currentVideoHolder.append(vidMinimizer);
        currentVideoHolder.addClass('floating');
    }
    if ((scrolledHeight < (winHei / 2)) && currentVideoHolder.hasClass('floating')) {
        currentVideoHolder.removeClass('floating');
        $('.floated-video-minimizer').remove();
    }
}

// Minimizing floated video

document.addEventListener('click', function (ev) {
    var target = ev.target;
    if (target.classList.contains('floated-video-minimizer')) {
        $('.floated-video-minimizer').remove();
        currentVideoHolder.removeClass('floating video__playing');
        stop_video_song();
    }
});

/**
 * Play or pause current ESG song
 */

function trigger_esg_audio() {
    var audio = esgSongAudioElement[0];
    if (audio.paused) {
        audio.play();
        musicPlayerButton.removeClass('fa-play').addClass('fa-pause');
    } else {
        stop_audio_song();
    }
    stop_video_song();
}

// Play from playlist
$('.esg-songs-list').on('click', '[title="Play"]', function (e) {
    let songName = $(this).parent().prev().text().trim(),
        audioName = songName.slice(0, songName.indexOf('-')).toLocaleLowerCase().trim();
    play_this_song([audioName, songName]);
    activate($(this).parent().parent());
});

// Share ESG song copy

$('.esg-songs-list').on('click', '[title="Share song"]', function () {
    var songLink = $(this).attr('data-link-share'),
        songFull = $(this).parent().prev().text().trim(),
        songParts = songFull.split(' - '),
        songName = songParts[0];
    navigator.clipboard.writeText('Hello friend !!\nEnjoy this wonderful songs of Eastern Singers Group.\n\n' + songName + '\n\n' + songLink).then(() => { });
    navigator.share({
        title: songName,
        text: "Hello friend !!\nEnjoy this wonderful songs of Eastern Singers Group.\n\n",
        url: songLink
    }).then(() => console.log('Successful share')).catch(error => alert('Error sharing:', error));
    // Notify action
    notify_link_copied();
});

// Next and previous ESG song

function play_this_song(desiredSong) {
    esgSongAudioElement.attr('src', 'esgSongsFiles/' + desiredSong[0] + '.mp3');
    $('.current-music-player .music-name').html(desiredSong[1]);
    musicPlayerButton.removeClass('fa-play').addClass('fa-pause');
    esgSongAudioElement[0].play();
    stop_video_song();
}
let esgAudioSongs;
function play_another_song(direction) {
    var currentPlaying = esgSongAudioElement.attr('src'),
        currentPlaying = currentPlaying.replace('.mp3', ''),
        currentPlaying = currentPlaying.replace('esgSongsFiles/', ''),
        anotherSongIndex,
        anotherSongAudioName,
        anotherSongSongName;
    esgAudioSongs.forEach((obj, index) => {
        if (obj.audioName == currentPlaying) {
            if (direction == 'next') {
                anotherSongIndex = (index + 1) % esgAudioSongs.length;
            }
            if (direction == 'previous') {
                anotherSongIndex = ((index - 1) + esgAudioSongs.length) % esgAudioSongs.length;
            }
        }
        if (!(esgAudioSongs[anotherSongIndex] == undefined)) {
            anotherSongAudioName = esgAudioSongs[anotherSongIndex].audioName,
                anotherSongSongName = esgAudioSongs[anotherSongIndex].songName;
            let toActivate = $('.esg-songs-list__body').find('div:icontains(' + anotherSongAudioName + ')');
            play_this_song([anotherSongAudioName, anotherSongSongName]);
            activate(toActivate.parents('[title]'));
        }
    });
}

// Stop any audio playing
function stop_audio_song() {
    esgSongAudioElement[0].pause();
    musicPlayerButton.removeClass('fa-pause').addClass('fa-play');
}

// Stop any video playing
function stop_video_song() {
    var videoURL = currentVideoHolder.find('iframe').attr('src'),
        videoURL = videoURL.replace('?autoplay=1', '');
    currentVideoHolder.find('iframe').attr('src', videoURL);
}

// Automatic next ESG song play
setInterval(() => {
    esgSongAudioElement.on({
        timeupdate: function () {
            let dis = this,
                elapsedTime = dis.currentTime,
                durationTime = dis.duration;
            if (elapsedTime == durationTime) {
                play_another_song('next');
            }
        }
    });
}, 1000);
