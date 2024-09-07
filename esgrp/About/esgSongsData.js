

// ESG songs playing

// An array containing ESG songs

var esgSongsArray = [
    {
        songId: '6xnzzSRdBrI', songName: 'Ndaje Dawe unyakire - Eastern singers group_ESG',
        songAbout: 'A song of repentance and renewal, echoing the soul\'s journey back to the Lord, where forgiveness flows freely and healing begins anew.', songFileSize: '92 KB', songFileKey: 'Re', songFileTempo: '&#119135; = 50', songFileDate: '24<sup>th</sup> December 2023', songFileLink: '1Bssdyc_bHZ6wXiel43cbOV2Gq84n1FAJ'
    },
    {
        songId: '9n8bp3o8LzA', songName: 'Jye nsanze umwami ijabiro - Eastern singers - [cover]',
        songAbout: 'A song to rejoice, redeem, and proclaim the goodness of returning to praise God, for He is untainted and unblemished by any form of evil.', songFileSize: '46 KB', songFileKey: 'Sol', songFileTempo: 'Moderato', songFileDate: '', songFileLink: '1ePaz01ItTxUPmRHRHgxwZsH52VuOVHM0'
    },
    {
        songId: 'WfI5t5jZqzw', songName: 'URUKUNDO RWA YEZU ANGE WITHNEY ( Official audio )',
        songAbout: 'A song to remind us how the love of Jesus is the foundation of our wellbeing, that nothing should ever depart us from Him.', songFileSize: '76 KB', songFileKey: 'Fa &#9837;', songFileTempo: '&#119135; = 80', songFileDate: '2021', songFileLink: '1KQ77Nm3jz6pc5WHH7YwkiLSfHCydyVm3'
    },
    {
        songId: 'NMVct_UUXcE', songName: 'NOHELI NZIZA-Eastern Singers(Official Video lyrics)',
        songAbout: 'A Christmass Song. One that helps us to prepare our hearts for the One and Only Savior of the World, Jesus Christ Our Lord.', songFileSize: '80 KB', songFileKey: 'Do', songFileTempo: '&#119135; = 95', songFileDate: '23<sup>rd</sup> December 2017', songFileLink: '1MEYwic2-9mu57eB4d-ZFL6tngmmsvCQJ'
    },
    {
        songId: '2NzKeDXLXw8', songName: 'TUNAKUSHUKURU MAMA MARIYA - Eastern Singers (Official music video)',
        songAbout: 'A song dedicated to the Holy and Virgin Mary. It tells how She cares and advices to her dependants. Lets do the same and depend on her to pray for us.', songFileSize: '25 KB', songFileKey: 'Do', songFileTempo: 'Moderato', songFileDate: '', songFileLink: '1gLMq1RO7bHfjJNoGNZVtUA_h8IJa7-uT'
    },
    {
        songId: 'XIZxHXij2eQ', songName: 'NZASHIMIRA UMWUNGERI - Eastern Singers (Official Music Video)',
        songAbout: 'This is a <strong>thanks giving</strong> song to the Lord. Every day, The Lord our God do a lot for us that we could not handle by ourselves, which is worth thanks giving.', songFileSize: '78 KB', songFileKey: 'Do', songFileTempo: '&#119135; = 90', songFileDate: '21<sup>st</sup> January 2022', songFileLink: '11xZXRetvj7jeLIEw4SEKtc68TgPRRV2c'
    },
    {
        songId: 'H3G2-15Z4E0', songName: 'ISHIMWE NI IRYAWE - Eastern Singers (Official Music Video)',
        songAbout: 'A <b>thanks giving</b> song to the Lord! With a weakened soul, it brings hope by manifesting all the miracles that Jesus do for everyone regardless of our sins.', songFileSize: '106 KB', songFileKey: 'Fa &#9837;', songFileTempo: '&#119135; = 90', songFileDate: '1<sup>st</sup> April 2019', songFileLink: '1reqfUKrauv-yz9cWr9se_0ctO1N20I-c'
    },
    {
        songId: 'PWXcsblZhIA', songName: 'MUBYEYI MWIZA - Eastern Singers (Official Music Video)',
        songAbout: 'A song dedicated to the Holy and Virgin Mary. It tells how She cares and advices to her dependants. Let\'s do the same and depend on her to pray for us.', songFileSize: '81.1 KB', songFileKey: 'La', songFileTempo: '&#119135; = 95', songFileDate: '4<sup>th</sup> August 2021', songFileLink: '1uo1CeKJKg5NTittQoDlB9GkrktJDBleN'
    },
    {
        songId: 'fa-OE9dCQ80', songName: 'YEZU NDAMIRA - Eastern Singers(Official Music Video)',
        songAbout: 'A song that tells goodness of Jesus to every one. It reminds us how he heal and help whoever runs to him seeking for help, guide and cure.', songFileSize: '77.5 KB', songFileKey: 'Re', songFileTempo: '&#119135; = 80', songFileDate: '21<sup>st</sup> March 2020', songFileLink: '1GPxNJ1MEw-YRDpkUDR-tgswBVfqtt9Zn'
    },
];

const videoDetails = {
    videoName: "Jye nsanze umwami ijabiro - Eastern singers - [cover]",
    videoLink: "https://youtu.be/9n8bp3o8LzA",
    videoDate: "2023-12-18",
}
const compositionAbout = {
    composer: "Cyprien Rugamba _Harm_ Robert Bellarmin Ruzigamanzi",
    aboutText: "A song to rejoice, redeem, and proclaim the goodness of returning to praise God, for He is untainted and unblemished by any form of evil."
}
const compositionFileDetails = {
    fileSize: "46 KB",
    compositionKey: "Sol",
    compositionTempo: "Moderato"
}

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
