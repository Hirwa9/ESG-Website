

// Popover
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')),
    popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
// Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')),
    tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

$(function () {
    // Toggling fullscreen
    $('#fullscreen-toggler').click(function () {
        if (document.fullscreenEnabled) { // Check if fullscreen is supported
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        } else {
            show_custom_alert('⚠️ Fullscreen mode is not supported by your browser.');
            playNotifErrorSound();
        }
    });

    // Toogle password visibility
    $('.toggle-password').click(function () {
        const passwordField = $(this).prev('input');
        const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);
        // Toggle the eye / eye-slash icon
        $(this).toggleClass('fa-eye fa-eye-slash');
    });


    $('#esg_carl').carousel({
        interval: 10000,
        pause: 'none'
    });

    /**
     * slide up Carousell
     */

    const slideupCarousel = $('.slideup-carousel');
    $.each(slideupCarousel, function () {
        const container = $(this),
            children = container.find('.su-carousel-item'),
            totalChildren = children.length;
        let currentIndex = totalChildren - 1;

        setInterval(() => {
            const nextIndex = (currentIndex + 1) % totalChildren;
            children.eq(currentIndex).prependTo(container);
            currentIndex = nextIndex;
        }, 5000);
    });

    /**
     * slide up Carousell
     */

    $('.show-touch, .show-touch-sm').click(function touch_anim(e, a) {
        var clicked = $(this),
            click_shower = clicked.find('.touch-anim'),
            shower_top = e.clientY - (clicked.offset().top - scrollY),
            shower_left = e.clientX - (clicked.offset().left);
        clicked.addClass('clicked');
        click_shower.css({ left: shower_left, top: shower_top });
        setTimeout(() => {
            clicked.removeClass('clicked');
        }, 300);
    });
});

// Prevent empty links to scroll to top
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href="#"]');
    if (link === null) {
        return;
    }
    e.preventDefault();
});

// Toggling sidenav
$('#menuToggler, .my-navigator').click(function () {
    var MT = $(this),
        SNavi = $('#mySidenav'),
        SNaviPar = SNavi.parent(),
        SNaviMore = SNavi.find('.MRNV');
    SNavi.show();
    SNaviPar.show();
    MT.addClass('SNexpanded change');
    SNaviPar.on({
        click: function (e) {
            if ($(this).is(e.target) && !$(this).has(e.target).length) {
                MT.removeClass("change");
                SNaviMore.collapse("hide");
            }
        }
    });
});

// Hiding person info-card
$(document).click(function (e) {
    var person_shower = $('.allPersons, .MembersT, .PerProfileHolder, .perShower');
    if (not_targeted(e, person_shower)) {
        close_singer();
        $('.perShower').remove();
    }
});

/**
 * Custom functions
 */

// Global variables
var winWid = $(window).width(),
    winHei = $(window).height(),
    winInnerWid = $(window).innerWidth(),
    winInnerHei = $(window).innerHeight(),
    winOuterWid = $(window).outerWidth(),
    winOuterHei = $(window).outerHeight();
const bodi = $('body'),
    dateStr = new Date(),

    webNotifications = $('.notifications-holder'),
    pageSearchInput = $('.page-searcher .search-box__input'),
    sCatSearcher = $('#manualSearch'),
    songSearchTool = $('.sSearchTool'),
    sCatWrapper = $('.sCategories'),
    otherResults = $('.otherResults'),
    searchBoxClearer = $('.page-searcher .search-box__clearer'),
    floatingAudio = $('.floating-audio');

const notifSuccessSound = $('#notifSuccessSound'),
    notifErrorSound = $('#notifErrorSound'),
    playNotifSuccessSound = function () {
        if (notifSuccessSound.length > 0) {
            notifSuccessSound[0].play();
        }
    },
    playNotifErrorSound = function () {
        if (notifErrorSound.length > 0) {
            notifErrorSound[0].play();
        }
    };

visible = function (x) {
    if (x.is(':visible')) {
        return true;
    }
}

hidden = function (x) {
    if (x.is(':hidden')) {
        return true;
    }
}

not_targeted = function (e, elem) {
    if (!elem.is(e.target) && !elem.has(e.target).length) {
        return true;
    }
    return false;
}

get_last_class = function (elem) {
    var classes = elem.attr('class').split(' '),
        classNums = classes.length,
        lastClass = classes[classNums - 1];
    return lastClass;
}
get_icon_name = function (icon) {
    let toCheck = icon;
    (!toCheck.hasClass('fa')) && (toCheck = icon.find('.fa:first-child'));
    let iconClasses = toCheck.attr('class').split(' ').filter(el => {
        return (el.slice(0, 3) == 'fa-');
    });
    return iconClasses;
}

const capitalise_first_letter = function (x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
};


activate = function (x) {
    x.addClass('active').siblings().removeClass('active');
}
activate_any = function (x) {
    x.toggleClass('active');
}
select = function (x) {
    x.addClass('selected').siblings().removeClass('selected');
}
select_any = function (x) {
    x.toggleClass('selected');
}
disactivateSiblings = function (x) {
    x.siblings().removeClass('active');
}

$('.active-options > *').click(function () {
    activate($(this));
});

$('.select-options > *').click(function () {
    select($(this));
});

$('.active-options-any > *').click(function () {
    activate_any($(this));
});

$('.select-options-any > *').click(function () {
    select_any($(this));
});


remove_d_none = function (x) {
    x.removeClass('d-none');
}

add_d_none = function (x) {
    x.addClass('d-none');
}

scroll_page_to = function (elem, off, dur) {
    off = off || 50;
    dur = dur || 'fast';
    $('html, body').animate({ scrollTop: elem.offset().top - off }, dur);
}

jump_page_to = function (elem, off) {
    off = off || 50;
    const targetPosition = elem.offset().top - off;
    // Disable smooth scroll
    $('html, body').addClass('scroll-auto');
    // Set the scroll position
    $('html').scrollTop(targetPosition);
    $('body').scrollTop(targetPosition);
    // Re-enable smooth scroll
    setTimeout(() => {
        $('html, body').removeClass('scroll-auto');
    }, 0);
}

scroll_left = function (elem) {
    elem.scrollLeft(0);
}

hide_custom_fixed = function () {
    $('.my-cont-menu, .my-popup').removeClass('working');
}

getRandomColor = function () {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
}

// Switch buttons
$('.switch').click(function () {
    $(this).toggleClass('OFF');
});

// Page scroll indicator
$('.ToTop').click(function () {
    $('html,body').scrollTop(0);
});
$('.ToTop').contextmenu(function (e) {
    e.preventDefault();
    $('html,body').scrollTop($(document).height());;
});
document.addEventListener('scroll', function () {
    var docHeight = $(document).height(),
        scrollTopNow = $(document).scrollTop() + $(window).height(),
        currentScroll = ((scrollTopNow * 100) / docHeight) + 0.5;
    $('.ToTop').css({ backgroundImage: 'conic-gradient(var(--myBlue_cons), var(--myBlue2_cons), var(--myBlue_cons) ' + currentScroll + '%, transparent ' + currentScroll + '%,  transparent 100%)' });
});

// Search boxes
$('.search-box > span, .search-box-right-icon > button').click(function () {
    $(this).siblings('input').focus();
});
searchBoxClearer.click(function () {
    $(this).parent('.search-box').find('input').val('').focus();
});

/**
 * Inform if the page is ready
 */

function check_page_loaded() {
    const currentPage = location.pathname.toLocaleLowerCase(),
        pagesToNotify = ['chm_songs', 'esg_gallery', 'calendar', 'examples'];
    if (pagesToNotify.some(page => currentPage.includes(page))) {
        $('.web-ready-informer').remove();
        var webReadyInformer = '<div class="informer web-ready-informer">Ready</div>';
        bodi.prepend(webReadyInformer);
        $('.web-ready-informer').addClass('view');
        clearTimeout(timeOutDuration);
        timeOutDuration = setTimeout(() => {
            $('.web-ready-informer').removeClass('view').remove();
        }, 2000);
    }
    // Or (but slow)
    // var fullyLoaded = setInterval(() => {
    // if (document.readyState === 'complete') {
    // clearInterval(fullyLoaded);
    // code...
    // }
    // }, 100);
}
check_page_loaded();

// Close a fixed element by clicking out of its child nodes
$('.self-close').click(function (e) {
    if (!$(this).has(e.target).length) {
        $(this).fadeOut();
    }
});

/**
 * Hide elements by out click
 */

let winHideCollapse = $('.win-hide.collapse, [data-tocollapse]'),
    winHideCollapseToggler = $('[data-tocollapse]');
function collapse_collapsible() {
    winHideCollapse.collapse('hide');
}
$(document).click(function (e) {
    (visible(winHideCollapse) && (not_targeted(e, winHideCollapse) && not_targeted(e, winHideCollapseToggler))) && collapse_collapsible();
});

// Hide fixed element by outclick
function close_fixHolder(to_Hide) {
    var classes = to_Hide.attr('class').split(' '),
        cls_num = classes.length,
        directionStr = 'fade-to-',
        directioned = false;
    for (let i = 0; i < cls_num; i++) {
        if (classes[i].indexOf(directionStr) > - 1) {
            directioned = true;
            var direction = classes[i].slice(8);
            to_Hide.addClass('fix-hide-' + direction);
            setTimeout(function () {
                to_Hide.removeClass('fix-hide-' + direction);
            }, 400);
        }
    }
    if (to_Hide.find('> #mySidenav').length > 0) {
        to_Hide.addClass('fix-hide-left');
        setTimeout(function () {
            to_Hide.removeClass('fix-hide-left');
        }, 400);
    }
    else if (!directioned) {
        to_Hide.addClass('fix-hide-top');
        setTimeout(function () {
            to_Hide.removeClass('fix-hide-top');
        }, 400);
    }
    setTimeout(function () {
        to_Hide.css({ display: 'none' });
    }, 400);
}

$('.fix-holder').click(function (e) {
    let toCheck = $(this);
    if (toCheck.is(e.target) && !toCheck.has(e.target).length) {
        close_fixHolder(toCheck);
    }
});

/**
 * Show/Hide loading motions
 */

// Dynamically add the loader to the page
function addLoader() {
    // ****** Bars loader
    // var loaderContainer = $('<div class="flex-center visible-y Loading_fix appended"></div>');
    // var loadingMotionWave = $('<div class="loading-motion-wave"></div>');
    // // Add bars to loadingMotionWave
    // for (var i = 0; i < 5; i++) {
    //     loadingMotionWave.append('<div class="bar"></div>');
    // }
    // loaderContainer.append(loadingMotionWave);
    // $('body').append(loaderContainer);

    // ****** Ripple loader
    // var loaderContainer = $('<div class="flex-center visible-y Loading_fix appended"></div>');
    // var loadingMotionRipple = $('<div class="lds-ripple"></div>');
    // // Add ripple divs
    // for (var i = 0; i < 2; i++) {
    //     loadingMotionRipple.append('<div></div>');
    // }
    // loaderContainer.append(loadingMotionRipple);
    // $('body').append(loaderContainer);

    // ****** Folding cude loader
    var loaderContainer = $('<div class="flex-center visible-y Loading_fix appended"></div>');
    var loadingMotionRipple = $('<div class="sk-folding-cube"></div>');
    // Add cube divs
    loadingMotionRipple.append('<div class="sk-cube1 sk-cube"></div>');
    loadingMotionRipple.append('<div class="sk-cube2 sk-cube"></div>');
    loadingMotionRipple.append('<div class="sk-cube4 sk-cube"></div>');
    loadingMotionRipple.append('<div class="sk-cube3 sk-cube"></div>');
    loaderContainer.append(loadingMotionRipple);
    $('body').append(loaderContainer);
}

// Remove the loader from the page
function removeLoader() {
    $('.Loading_fix.appended').remove();
}

function loading() {
    addLoader();
    setTimeout(function () {
        removeLoader();
    }, 3000);
}

function close_loading() {
    $('.Loading_fix').css({ visibility: 'hidden' });
}


// Prevent reloading when same page link in clicked
$('.Here').click(function () {
    $('body').append('<div class="pageHere">You are here</div>');
    setTimeout(function () {
        $('.pageHere').remove();
    }, 2000);
    $('.pageHere').click(function () {
        $(this).fadeOut(function () {
            $(this).remove();
        });
    });
});

/**
 * Collapsing related elements
 */

$(function () {
    toggle_next = function () {
        var toggler_Elem = $(this),
            toggling_Elem = toggler_Elem.next();
        toggling_Elem.collapse('toggle');
    }
    $('.toggle-next').click(toggle_next);

    toggle_child = function () {
        var toggler_Elem = $(this),
            toggling_Elem = toggler_Elem.find('> .collapse:first-child');
        toggling_Elem.collapse('toggle');
    }
    $('.toggle-child').click(toggle_child);

    toggle_direct = function () {
        var toggler_Elem = $(this),
            toggling_Elem = toggler_Elem.find('> .collapse');
        toggling_Elem.collapse('toggle');
    }
    $('.toggle-direct').click(toggle_direct);

    toggle_parent = function () {
        var toggler_Elem = $(this),
            toggling_Elem = toggler_Elem.parent('.collapse');
        toggling_Elem.collapse('toggle');
    };

    $('.toggle-par').click(toggle_parent);

    hide_parent_fix = function () {
        $(this).parents('.fix-holder').trigger('click');
    }
    $('.hide-par-fix').click(hide_parent_fix);
});


// Current playing audio actions
function float_playing_audio() {
    floatingAudio.show();
}
function hide_floated_audio() {
    floatingAudio.fadeOut('fast');
}
function max_floating_audio() {
    floatingAudio.find('.floating-item_icon-tools').toggleClass('working');
    floatingAudio.find('.floating-item_details').collapse('toggle');
}
function min_floating_audio() {
    floatingAudio.find('.floating-item_icon-tools').removeClass('working');
    floatingAudio.find('.floating-item_details').collapse('hide');
}
function toggle_floated_audio_play_state() {
    let audios = document.querySelectorAll('audio');
    Array.from(audios).forEach(aud => {
        if (!aud.paused) {
            aud.pause();
            $('.floating-audio .floating-item_icon-tools .media-play-pause-icon, .music-controlls__player').removeClass('fa-pause').addClass('fa-play');
        } else {
            $('#pageAudioPlayer')[0].play();
            $('.floating-audio .floating-item_icon-tools .media-play-pause-icon, .music-controlls__player').removeClass('fa-play').addClass('fa-pause');
        }
    });
}
function stop_hide_floated_audio() {
    let audios = document.querySelectorAll('audio');
    Array.from(audios).forEach(aud => {
        aud.pause();
    });
    $('.floating-audio .floating-item_icon-tools .media-play-pause-icon, .music-controlls__player').removeClass('fa-pause').addClass('fa-play');
    min_floating_audio();
    hide_floated_audio();
}

// $(document).on({
//     contextmenu: function (e) {
//         e.preventDefault();
//         if (hidden(floatingAudio)) {
//             float_playing_audio();
//         } else {
//             hide_floated_audio();
//         }
//     }
// });

// function slide_up_par(x) {
//     var toSlideUp = x;
//     toSlideUp.slideUp();
// }
$('.my-alert-closer').click(function () {
    $(this).parents('.my-alert').slideUp();
});

function go_back() {
    window.history.back();
}
$('.go-back').click(go_back);

/**
 * Toggle specific elements
 */

// Toggling custom elements
$('[data-totoggle]').click(function () {
    var elem_eddress = $(this).attr('data-totoggle'),
        elem = $('' + elem_eddress);
    if (elem.length > 0) {
        if (elem.is(':visible')) {
            elem.hide();
        }
        else {
            elem.show();
        }
    }
});

// Collapsing custom elements
$('[data-tocollapse]').click(function () {
    var elem_eddress = $(this).attr('data-tocollapse'),
        elem = $('' + elem_eddress);
    elem.collapse('show');
});

// Custom popups
$('[data-topopup]').click(function (e) {
    var elem_eddress = $(this).attr('data-topopup'),
        elem = $('' + elem_eddress);
    if (elem.length > 0) {
        show_custom_popup(e, elem);
    }
});

// Custom menu

$(document).on('click', '[data-menu-toggle]', function (e) {
    var elem_eddress = $(this).attr('data-menu-toggle'),
        elem = $('' + elem_eddress);
    if (elem.length > 0) {
        show_custom_menu(e, elem);
    }
});

// Custom dialog
$(document).on('click', '[data-dialog-toggle]', function () {
    var elem_eddress = $(this).attr('data-dialog-toggle'),
        elem = $('' + elem_eddress);
    if (elem.length > 0) {
        elem.show();
    }
});

$('.my-dialog-closer').click(function () {
    $(this).closest('.my-dialog').trigger('click');
});

// Scroll to the corresponding attributed class or id
$('[data-scrollto]').click(function () {
    var elem_eddress = $(this).attr('data-scrollto'),
        available_checker = $('' + elem_eddress).length,
        winHei = $(window).height();
    if (available_checker < 1) {
        show_custom_alert('There\'s no such element in the page');
    }
    else {
        scroll_page_to($('' + elem_eddress), (winHei * (1 / 5)));
    }
});

$('[data-notify]').click(function () {
    var elem_eddress = $(this).attr('data-notify'),
        elem = $('' + elem_eddress);
    clearTimeout(timeOutDuration);
    elem.addClass('view');
    timeOutDuration = setTimeout(() => {
        elem.removeClass('view');
    }, 4000);
});

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Action notifying
 */

function notify(x) {
    x.addClass('view');
    clearTimeout(timeOutDuration);
    timeOutDuration = setTimeout(() => {
        x.removeClass('view');
    }, 4000);
}

// Notify link copied
function notify_link_copied() {
    show_toast('<span class="fa fa-copy me-2"></span> Link copied');
}

/**
 * Working on dark theme
 */

//selector
var darkTheme = 'dark-theme';

//state
const thm = localStorage.getItem('theme'),
    thmUser = localStorage.getItem('userTheme');
themeChecker = setInterval(set_auto_theme, 1);

//on mount
thm && to_dark_theme();
if (thmUser) {
    $('.auto_theme').removeClass('choice');
    $('.themerICN').addClass('choice');
    clearInterval(themeChecker);
}
// thm && $('body').addClass(thm);

//handlers
function change_theme_randomly() {
    clearInterval(themeChecker);
    $('.auto_theme').removeClass('choice');
    $('.themerICN').addClass('choice');
    localStorage.setItem('userTheme', 'yes');
    change_theme();
}
function change_theme() {
    if (!bodi.hasClass(darkTheme)) {
        to_dark_theme();
    } else {
        to_default_theme();
    }
}
function to_dark_theme() {
    bodi.addClass(darkTheme);
    localStorage.setItem('theme', 'dark-theme');
    $('.themerICN > span').removeClass('b-middle').addClass('t-middle');
    $('.theme-name').html('Dark');
}
function to_default_theme() {
    bodi.removeClass(darkTheme);
    localStorage.removeItem('theme');
    $('.themerICN > span').removeClass('t-middle').addClass('b-middle');
    $('.theme-name').html('Light');
}

function auto_theme() {
    $('.themerICN').removeClass('choice');
    $('.auto_theme').addClass('choice');
    localStorage.removeItem('userTheme');
    themeChecker = setInterval(set_auto_theme, 500);
}
function set_auto_theme() {
    const hour = dateStr.getHours();
    // const minute = dateStr.getMinutes();
    // const second = dateStr.getSeconds();

    if ($('.auto_theme').hasClass('choice')) {
        if ((hour >= 0) && (hour < 6) || (hour > 18)) {
            to_dark_theme();
        }
        else {
            to_default_theme();
        }
    }
}

//events
$('.themerICN > span').click(change_theme_randomly);
$('.auto_theme').click(auto_theme);

/**
 * Show & hide web settings
 */

const webSettings = $('.webSettings');

show_web_settings = function () {
    webSettings.addClass('set');
    window.history.pushState({ id: 1 }, null, null);
}

hide_web_settings = function () {
    webSettings.removeClass('set');
    go_back();
}

$('#settings').click(function () {
    scroll_left($('.webSetPG'));
    const element = this;
    // Check whether the element has angular toggleWebSettings() function
    const hasNgClick = element.getAttribute('data-ng-click') && element.getAttribute('data-ng-click').includes('toggleWebSettings()');
    const hasNgClick2 = element.getAttribute('ng-click') && element.getAttribute('ng-click').includes('toggleWebSettings()');
    if (!hasNgClick && !hasNgClick2) {
        show_web_settings();
    }
});

// $('#settings').click(function () {
//     scroll_left($('.webSetPG'));
//     if (!$(this).attr('data-ng-click')?.includes('toggleWebSettings()') && !$(this).attr('ng-click')?.includes('toggleWebSettings()')) {
//         show_web_settings();
//     }
// });

$('.settingsCloser').click(function () {
    go_back();
    scroll_left($('.webSetPG'));
    webSettings.addClass('slideOutR');
    setTimeout(() => {
        webSettings.removeClass('set slideOutR');
    }, 400);
});

/**
 * Get web updates
 */

function getUpdates() {
    const UPDATEhour = dateStr.getHours(),
        UPDATEminute = dateStr.getMinutes(),
        UPDATEsec = dateStr.getSeconds(),
        PageUpdated = localStorage.getItem('updated');
    if ((UPDATEhour == (13 || 20)) && UPDATEminute == 0 && UPDATEsec == 0) {
        localStorage.removeItem('updated');
        window.location.reload();
        localStorage.setItem('updated', 'yes');
    }
    else if (!PageUpdated) {
        window.location.reload();
        localStorage.setItem('updated', 'yes');
    }
}
setInterval(getUpdates, 1000);

/**
 * Turn off/on web animations 
 */

// Selectors
var animControler = $('.animation-control').find('> .switch');

// State
const noAnims = localStorage.getItem('noAnims');

// On mount
noAnims && disable_animations();

// handlers
function disable_animations() {
    $('body').addClass('no-animation');
    animControler.addClass('OFF');
}
function enable_animations() {
    $('body').removeClass('no-animation');
    animControler.removeClass('OFF');
}

// Event
animControler.click(function () {
    if ($(this).hasClass('OFF')) {
        localStorage.setItem('noAnims', 'yes');
        $('body').addClass('no-animation');
    }
    else {
        localStorage.removeItem('noAnims');
        $('body').removeClass('no-animation');
    }
});

/**
 * Turn off/on web tips
 */

// Selectors
var tipsControler = $('.tips-control').find('> .switch');

// State
const showTips = localStorage.getItem('webGuide');

// On mount
showTips && enable_tips();

// handlers
function disable_tips() {
    $('.webGuide-fix').hide();
    tipsControler.addClass('OFF');
}
function enable_tips() {
    $('.webGuide-fix').show();
    tipsControler.removeClass('OFF');
}

// Event
tipsControler.click(function () {
    if (!$(this).hasClass('OFF')) {
        localStorage.setItem('webGuide', 'yes');
        $('.webGuide-fix').show();
    }
    else {
        localStorage.removeItem('webGuide');
        $('.webGuide-fix').hide();
    }
});

setInterval(() => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
        day = dayNames[dateStr.getDay()];
    $('.timeShow > span').html(day);
}, 1000);

/**
 * Reset web settings
 */

function reset_web() {
    disable_tips();
    localStorage.removeItem('webGuide');
    auto_theme();
    enable_animations();
    localStorage.removeItem('noAnims');
    // Notify action
    show_toast('<span class="fa fa-cogs me-2"></span>Web settings reset');
}

/**
 * Show web terms
 */

function show_terms() {
    $('.webTerms').parent().show();
}

// Remove list's options
document.onclick = function (e) {
    hide_custom_fixed();
    listElements = document.querySelectorAll('.my-list > li');
    listElements.forEach(el => {
        var optionsContainer = el.querySelector(':scope > span');
        if (optionsContainer && optionsContainer !== e.target && !optionsContainer.contains(e.target) || (el == e.target && el.classList.contains('active'))) {
            el.classList.remove('active');
        }
    });
}

/**
 * Working on DMs (Custom_chatbot)
 */

const chatbotMessageInput = $('#chatbotMessageInput'),
    chatbotMessageSender = $('#sendMessageBtn'),
    chatbotMessageSpace = $('.chatbot .message-holder'),
    directMessageForm = document.getElementById('directMessageForm');
// Messages storage
let chatbotMessagesStorage = localStorage.getItem('chatbotConversations');

// Chatbot initial hello message
const chatbot_hello = function () {
    const timeNow = new Date(),
        messageTime = (timeNow.getHours() < 10 ? '0' + timeNow.getHours() : timeNow.getHours()) +
            ':' +
            (timeNow.getMinutes() < 10 ? '0' + timeNow.getMinutes() : timeNow.getMinutes()),
        initialisationMessage =
            '<p class="responder">Hello! 😊<br>\
        How can we assist you today?<br><br>\
        If there\'s anything you\'d like to share with us, please feel free to do so.<br><br>\
        You can provide a detailed message so that we can clearly understand \
        the issue or request, enabling us to assist you effectively.\
        <span class="message-time-sent">' + messageTime + '</span></p>';
    chatbotMessageSpace.html('');
    chatbotMessageSpace.append(initialisationMessage);
}

// Scroll bottom messages
const scroll_bottom_chatbot_messages = function () {
    $('.chatbot-body').animate({ scrollTop: $('.message-holder')[0].clientHeight });
}
const jumpto_bottom_chatbot_messages = function () {
    $('.chatbot-body').scrollTop($('.message-holder')[0].clientHeight);
}

// Processing response
function process_message_response(message, messageTime) {
    messageParagraph =
        '<p class="sender">' + message + ' <span class="message-time-sent">' + messageTime + '</span></p>';
    let responseParagraph1 =
        '<p class="responder">\
                🤝 Thank you for reaching out! <b>We\'ll address your message promptly through email.</b>\
                <span class="message-time-sent">' + messageTime + '</span></p>',
        responseParagraph2 =
            '<p class="responder">\
            If you have any further questions or concerns, please don\'t hesitate to let us know.<br>\
            In the meantime, feel free to explore more on our platform.\
            <span class="message-time-sent">' + messageTime + '</span></p>',
        singleResponse = false,
        shortMessage = false;
    // Non-email-triggers
    const thankMessages = [
        "thanks",
        "thank you",
        "merci",
        "asante",
        "urakoze",
        "appreciate",
        "gracias",
        "cheers",
        "much obliged",
        "you're the best",
        "awesome",
        "amazing",
        "gorgeous",
    ];
    const greetingMessages = [
        "hello",
        "hi",
        "hey",
        "morning",
        "good morning",
        "bonjour",
        "afternoon",
        "good afternoon",
        "apres midi",
        "bonne apres midi",
        "evening",
        "good evening",
        "bonsoir",
        "howdy",
        "knock",
        "greetings",
        "mwiriwe",
        "muraho",
        "mwaramutse",
        "bite",
        "salut",
        "salute",
        "salutations",
        "what's up",
        "hi there",
        "hello there",
        "how's it going",
    ];
    const simpleMessages = [
        "ok",
        "yes",
        "alright",
        "wow",
        "sure",
        "cool",
        "fine",
        "great",
        "perfect",
        "waiting",
        "got it",
        "gotcha",
        "i am good",
        "i'm good",
        "am good",
        "understood",
        "vraiment",
        "sure thing",
        "roger that",
        "no problem",
    ];
    // Short message
    if (message.trim().length < 50) { shortMessage = true }
    // Non-email-responses
    if (shortMessage) {
        singleResponse = true;
        const messageLower = message.toLowerCase();
        if (greetingMessages.some(el => messageLower.includes(el)) ||
            thankMessages.some(el => messageLower.includes(el)) ||
            simpleMessages.some(el => messageLower.includes(el))) {
            if (thankMessages.some(el => messageLower.includes(el))) {
                responseParagraph1 =
                    '<p class="responder">You are most welcome 😊\
                        <span class="message-time-sent">' + messageTime + '</span></p>';

            } else if (greetingMessages.some(el => messageLower.includes(el))) {
                const exceptions = ["hello", "knock", "howdy", "how's it going", "bite"];
                responseParagraph1 =
                    '<p class="responder">Hello there! 😊<br>\
                        How can we assist you? <br>\
                        You can provide a detailed message so that we can clearly understand \
                        the issue or request, enabling us to assist you effectively.\
                        <span class="message-time-sent">' + messageTime + '</span></p>';
                if (greetingMessages.some(el => ((messageLower === el) && (!exceptions.some(word => messageLower === word))))) {
                    const exactWord = messageLower.replace(messageLower[0], messageLower[0].toUpperCase());
                    responseParagraph1 =
                        '<p class="responder"> ' + exactWord + ' 👋👋<br>\
                            How can we assist you? <br>\
                            You can provide a detailed message so that we can clearly understand \
                            the issue or request, enabling us to assist you effectively.\
                            <span class="message-time-sent">' + messageTime + '</span></p>';

                }
            } else {
                responseParagraph1 =
                    '<p class="responder">If you have any further questions or concerns, \
                        please don\'t hesitate to let us know.\
                        Best regards!!\
                        <span class="message-time-sent">' + messageTime + '</span></p>';
            }
        } else {
            responseParagraph1 =
                '<p class="responder">Message too short 😐 <br><br> \
                    Consider providing a detailed message so that we can clearly understand \
                    the issue or request, enabling us to assist you effectively.\
                    <span class="message-time-sent">' + messageTime + '</span></p>';
        }
    }
    return { messageParagraph, responseParagraph1, responseParagraph2, singleResponse };
}

// Showing chatbot
const show_chatbot = () => {
    $('.chatbot').closest('.fix-holder').show();
    // Fill in email
    const userEmail = localStorage.getItem('activeUserEmail');
    if (userEmail) {
        $('#directMessageForm').find('input[type="email"]').val(userEmail);
    }
}

// Hiding chatbot
const hide_chatbot = function () {
    const chatbotContainer = $('.chatbot').closest('.fix-holder');
    close_fixHolder(chatbotContainer);
}

// Scrolling chatbot
const chatbotWrapper = $('.chatbot-wrapper');

const scroll_chatbot_to_messages = () => {
    let chatbotEmail = $('#directMessageForm').find('input[type="email"]').val().trim();
    const chatbot = $('.chatbot');
    if (chatbotEmail === '') {
        show_toast("Enter your email to continue");
        return;
    }
    // Go to messages
    if (isValidEmail(chatbotEmail)) {
        // Activate user email
        localStorage.setItem('activeUserEmail', chatbotEmail);

        // Check previous conversation
        chatbotMessageSpace.html('');
        const pastConversation = localStorage.getItem('chatbotConversations');
        if (pastConversation) {
            const pastConv = JSON.parse(pastConversation),
                allUsers = pastConv.map(user => user.userEmail);
            let userHasConversation = false;
            allUsers.includes(chatbotEmail) && (userHasConversation = true);

            // Restore previous conversation
            if (userHasConversation) {
                const timeNow = new Date(),
                    todayDate = month_num_to_nm(timeNow.getMonth() + 1) + ' ' + timeNow.getDate() + ', ' + timeNow.getFullYear(),
                    yesterdayDate = month_num_to_nm(timeNow.getMonth() + 1) + ' ' + (timeNow.getDate() - 1) + ', ' + timeNow.getFullYear();
                let convMesages;
                pastConv.forEach(conv => {
                    if (conv.userEmail === chatbotEmail) {
                        convMesages = conv.userMessages;
                    }
                });
                convMesages.forEach(el => {
                    const theMessage = el.message, theTime = el.msgTime;
                    let theDay = el.msgDay;
                    // Process response
                    setTimeout(() => {
                        const messageResponse = process_message_response(theMessage, theTime);
                        // Adding Date indicator
                        (theDay === todayDate) && (theDay = "Today");
                        (theDay === yesterdayDate) && (theDay = "Yesterday");
                        const conversationDaySeparator = '<p class="conversation-date">' + theDay + '</span></p>',
                            dateIndicators = chatbotMessageSpace.find('.conversation-date'),
                            dateIndicatorExists = dateIndicators.filter(function () {
                                return $(this).text().trim() === theDay;
                            }).length;
                        (dateIndicatorExists < 1) && chatbotMessageSpace.append(conversationDaySeparator);
                        // Adding messages
                        chatbotMessageSpace.append(messageResponse.messageParagraph);
                        if (el.hasOwnProperty('errorType')) {
                            messageResponse.singleResponse = true;
                            const theError = el.errorType,
                                responseNotOk = $('<p class="responder error-message">\
                                <span class="h6 d-block p-2 text-center text-danger" style="border-bottom: 1px solid var(--bs-danger);">Ooh no 😟!!</span>\
                                <span class="small d-block text-center">Something went wrong while sending your message.</span><br>\
                                <button class="btn btn-sm d-block mx-auto bg-mainColor text-headerColor bounceClick resend-chatbot-message">Tap to resend</button>\
                                </p>'),
                                fetchErrorMessage = $('<p class="responder error-message">\
                                <span class="h6 d-block p-2 text-center text-danger" style="border-bottom: 1px solid var(--bs-danger);">Ooh wait 🙁!!</span>\
                                <span class="small d-block text-center">We couldn\'t send your message. Please check the internet and try again.</span><br>\
                                <button class="btn btn-sm d-block mx-auto bg-mainColor text-headerColor bounceClick resend-chatbot-message">Try again</button>\
                                </p>');
                            if (theError === "poorConnection") {
                                messageResponse.responseParagraph1 = fetchErrorMessage;
                            } else if (theError === "badResponse") {
                                messageResponse.responseParagraph1 = responseNotOk;
                            }
                        }
                        chatbotMessageSpace.append(messageResponse.responseParagraph1);
                        if (!messageResponse.singleResponse) {
                            chatbotMessageSpace.append(messageResponse.responseParagraph2);
                        }
                        jumpto_bottom_chatbot_messages();
                    }, 50);
                });
            } else {
                chatbot_hello();
            }
        } else {
            chatbot_hello();
        }
        // Move to chatbot
        setTimeout(() => {
            chatbotWrapper.scrollLeft(chatbotWrapper.width());
        }, 500);
    } else {
        show_toast("Enter a valid email to continue");
    }
}

const scroll_chatbot_home = function () {
    scroll_left(chatbotWrapper);
}

// Send function
function send_chatbot_message() {
    const message = chatbotMessageInput.val().trim();
    chatbotMessageInput.removeClass('floated');
    $('.chatbot').addClass('recently-interacted');
    if (message === '') {
        show_toast('Please enter a message to send');
        return;
    }
    const timeNow = new Date(),
        messageTime = (timeNow.getHours() < 10 ? '0' + timeNow.getHours() : timeNow.getHours()) +
            ':' +
            (timeNow.getMinutes() < 10 ? '0' + timeNow.getMinutes() : timeNow.getMinutes()),
        messageDay = month_num_to_nm(timeNow.getMonth() + 1) + ' ' + timeNow.getDate() + ', ' + timeNow.getFullYear(),
        messageData = { message, msgTime: messageTime, msgDay: messageDay };
    let newConversation = [messageData];
    // Storing the message
    let pastConversation = localStorage.getItem('chatbotConversations');
    const activeUser = localStorage.getItem('activeUserEmail');
    if (pastConversation) {
        let pastConv = JSON.parse(pastConversation),
            userExists = false;
        // Check if user exists
        const allUsers = pastConv.map(user => user.userEmail);
        allUsers.includes(activeUser) && (userExists = true);
        // Adding conversations
        if (!userExists) {
            // Create new user
            const chatbotUser = { userEmail: activeUser, userMessages: newConversation };
            pastConv.push(chatbotUser);
        } else {
            // Update conversation
            pastConv.forEach(conv => {
                if (conv.userEmail === activeUser) {
                    conv.userMessages.push(messageData);
                }
            });
        }
        // Save conversation
        localStorage.setItem('chatbotConversations', JSON.stringify(pastConv));
    } else {
        // Create first user and conversation
        const chatbotUser = { userEmail: activeUser, userMessages: newConversation },
            chatConversations = [];
        chatConversations.push(chatbotUser);
        localStorage.setItem('chatbotConversations', JSON.stringify(chatConversations));
    }
    // Displaying message
    const waiter = $('<div class="message-waiting-indicator">\
            <div style="--child: 3"></div><div style="--child: 2"></div><div style="--child: 1"></div>\
            </div>');
    messageResponse = process_message_response(message, messageTime); // Process response
    const todayConversationDaySeparator = '<p class="conversation-date">Today</span></p>',
        dateIndicators = chatbotMessageSpace.find('.conversation-date'),
        todayDateIndicatorExists = dateIndicators.filter(function () {
            return $(this).text().trim() === "Today";
        }).length;
    (todayDateIndicatorExists < 1) && chatbotMessageSpace.append(todayConversationDaySeparator);
    chatbotMessageSpace.append(messageResponse.messageParagraph);
    chatbotMessageInput.val('');
    scroll_bottom_chatbot_messages();
    // Adding responses / Mailing
    if (!messageResponse.singleResponse) {
        // Fill the form
        const DMform = $('#directMessageForm');
        DMform.find('#message').val(message);
        DMform.find('#pEmail').val(localStorage.getItem('activeUserEmail'));
        // Submit the form
        setTimeout(() => {
            $('#sendCustomDM').trigger('click');
        }, 1000);
    } else {
        // Responce for non-email messages
        chatbotMessageSpace.append(waiter);
        setTimeout(() => {
            waiter.remove();
            chatbotMessageSpace.append(messageResponse.responseParagraph1);
            scroll_bottom_chatbot_messages();
        }, 1000);
    }
}

// Submiting message using Fetch API

async function handle_DM_submit(event) {
    event.preventDefault();
    var eTarget = event.target;
    // Creating waiter and response
    const waiter = $('<div class="message-waiting-indicator">\
            <div style="--child: 3"></div><div style="--child: 2"></div><div style="--child: 1"></div>\
            </div>'),
        responseNotOk = $('<p class="responder error-message">\
        <span class="h6 d-block p-2 text-center text-danger" style="border-bottom: 1px solid var(--bs-danger);">Ooh no 😟!!</span>\
        <span class="small d-block text-center">Something went wrong while sending your message.</span><br>\
        <button class="btn btn-sm d-block mx-auto bg-mainColor text-headerColor bounceClick resend-chatbot-message">Tap to resend</button>\
    </p>'),
        fetchErrorMessage = $('<p class="responder error-message">\
        <span class="h6 d-block p-2 text-center text-danger" style="border-bottom: 1px solid var(--bs-danger);">Ooh wait 🙁!!</span>\
        <span class="small d-block text-center">We couldn\'t send your message. Please check the internet and try again.</span><br>\
        <button class="btn btn-sm d-block mx-auto bg-mainColor text-headerColor bounceClick resend-chatbot-message">Try again</button>\
    </p>');
    // Adding response waiter
    chatbotMessageSpace.append(waiter);
    scroll_bottom_chatbot_messages();
    // Submit/Mail action
    var formData = new FormData(eTarget);
    const activeUser = localStorage.getItem('activeUserEmail'),
        pastConv = JSON.parse(localStorage.getItem('chatbotConversations')),
        userConversation = pastConv.find(conv => conv.userEmail === activeUser);

    try {
        const response = await fetch(eTarget.action, {
            method: eTarget.method,
            body: formData,
        });

        waiter.remove();

        if (!response.ok) {
            chatbotMessageSpace.append(responseNotOk);
            if (userConversation) {
                const len = userConversation.userMessages.length,
                    lastMessageObj = userConversation.userMessages[len - 1];
                lastMessageObj.errorType = "badResponse";
                localStorage.setItem('chatbotConversations', JSON.stringify(pastConv));
            }
            show_custom_alert("Something went wrong while sending your message", 'warning');
            return;
        }

        const responseData = await response.json();

        if (responseData.success) {
            chatbotMessageSpace.append(messageResponse.responseParagraph1);
            scroll_bottom_chatbot_messages();
            setTimeout(() => {
                chatbotMessageSpace.append(messageResponse.responseParagraph2);
                scroll_bottom_chatbot_messages();
            }, 1000);
            show_custom_alert(responseData.message);
        } else {
            chatbotMessageSpace.append(responseNotOk);
            if (userConversation) {
                const len = userConversation.userMessages.length,
                    lastMessageObj = userConversation.userMessages[len - 1];
                lastMessageObj.errorType = "badResponse";
                localStorage.setItem('chatbotConversations', JSON.stringify(pastConv));
            }
            show_custom_alert(response.message, 'warning');
        }
    } catch (error) {
        console.error('Error:', error);
        waiter.remove();
        chatbotMessageSpace.append(fetchErrorMessage);
        if (userConversation) {
            const len = userConversation.userMessages.length,
                lastMessageObj = userConversation.userMessages[len - 1];
            lastMessageObj.errorType = "poorConnection";
            localStorage.setItem('chatbotConversations', JSON.stringify(pastConv));
        }
        show_custom_alert('Error: ' + error.statusText, 'warning');
    } finally {
        directMessageForm.reset();
        scroll_bottom_chatbot_messages();
    }

    // Or use ajax

    // $.ajax({
    //     url: eTarget.action,
    //     type: eTarget.method,
    //     data: formData,
    //     contentType: false,
    //     processData: false,
    //     success: function (response) {
    //         waiter.remove();
    //         if (response.success) {
    //             chatbotMessageSpace.append(messageResponse.responseParagraph1);
    //             scroll_bottom_chatbot_messages();
    //             setTimeout(() => {
    //                 chatbotMessageSpace.append(messageResponse.responseParagraph2);
    //                 scroll_bottom_chatbot_messages();
    //             }, 1000);
    //             show_custom_alert(response.message);
    //         } else {
    //             chatbotMessageSpace.append(responseNotOk);
    //             if (userConversation) {
    //                 const len = userConversation.userMessages.length,
    //                     lastMessageObj = userConversation.userMessages[len - 1];
    //                 lastMessageObj.errorType = "badResponse";
    //                 localStorage.setItem('chatbotConversations', JSON.stringify(pastConv));
    //             }
    //             show_custom_alert(response.message, 'warning');
    //         }
    //     },
    //     error: function (error) {
    //         console.error('Error:', error);
    //         waiter.remove();
    //         chatbotMessageSpace.append(fetchErrorMessage);
    //         if (userConversation) {
    //             const len = userConversation.userMessages.length,
    //                 lastMessageObj = userConversation.userMessages[len - 1];
    //             lastMessageObj.errorType = "poorConnection";
    //             localStorage.setItem('chatbotConversations', JSON.stringify(pastConv));
    //         }
    //         show_custom_alert('Error: ' + error.statusText, 'warning');
    //     }
    // });
}

if (directMessageForm) {
    directMessageForm.addEventListener("submit", handle_DM_submit);
}

// Send action
chatbotMessageSender.on({
    click: function () {
        send_chatbot_message();
    }
});
chatbotMessageInput.on({
    keydown: function (e) {
        if (e.ctrlKey && e.keyCode === 13) {
            send_chatbot_message();
        }
    }
});

// Resend action
$('.chatbot').on('click', '.resend-chatbot-message', function () {
    const activeUser = localStorage.getItem('activeUserEmail'),
        pastConv = JSON.parse(localStorage.getItem('chatbotConversations'));
    let lastMessageObj;
    // Get and remove last message of the active user
    const userConversation = pastConv.find(conv => conv.userEmail === activeUser);
    userConversation && (lastMessageObj = userConversation.userMessages.pop());
    // Update conversation
    localStorage.setItem('chatbotConversations', JSON.stringify(pastConv));
    // Retry sending
    if (lastMessageObj) {
        chatbotMessageInput.val(lastMessageObj.message);
        send_chatbot_message();
    }
});

// clear chat messages/history
const clear_chatbot_message = function () {
    $('.chatbot .message-holder').html('');
    const activeUser = localStorage.getItem('activeUserEmail'),
        pastConv = JSON.parse(localStorage.getItem('chatbotConversations'));
    if (pastConv) {
        const updatedConv = pastConv.filter(conversation => conversation.userEmail !== activeUser);
        if (updatedConv.length < 1) {
            localStorage.removeItem('chatbotConversations');
        } else {
            localStorage.setItem('chatbotConversations', JSON.stringify(updatedConv));
        }
    }
    // Hello message
    chatbot_hello();
}

$('.chatbot-message-clearer').click(clear_chatbot_message);

// Scroll chat to bottom
const chatbotToBottomBtn = $('.chatbot-footer .to-bottom-button');
$('.chatbot-body').scroll(function () {
    const msgScrollTop = $(this)[0].scrollTop,
        disHeight = $(this).height();
    msgHeight = $(this).find('.message-holder').height();

    if ((msgHeight - msgScrollTop) > ((disHeight * 2) + 50)) {
        chatbotToBottomBtn.addClass('floated');
    } else {
        chatbotToBottomBtn.removeClass('floated');
    }
});
chatbotToBottomBtn.click(function () {
    scroll_bottom_chatbot_messages();
});

// Expanding text area
$('.chatbot-footer .textarea-expander').click(function () {
    $(this).closest('.chatbot-footer').find('#chatbotMessageInput').toggleClass('floated');
});

/**
 * Moving/Dragging fixed elements
 */

var fixDragger = $('.fix-dragger');
var canDrag = false;
var toDragOnLeft = false;
var initialToDragTop;
var initialToDragLeft;
var currentToDragTop;
var currentToDragLeft;
var initialMouseTop;
var currentMouseTop;
var initialMouseLeft;
var currentMouseLeft;
var initialTStamp;
var finalTStamp;
var finalMouseLeft;

fixDragger.on({
    mousedown: function (e) {
        var toDrag = $(this).closest('.fix-draggable');
        var currentTopDiff;
        var currentLeftDiff;
        initialToDragTop = toDrag.position().top;
        initialToDragLeft = toDrag.position().left;
        initialMouseTop = e.clientY;
        initialMouseLeft = e.clientX;
        toDrag.addClass('trans-0 dragging');
        canDrag = true;
        initialTStamp = e.timeStamp;

        $(document).on({
            mousemove: function (e) {
                if (canDrag && toDrag.hasClass('dragging')) {
                    currentMouseTop = e.clientY;
                    currentMouseLeft = e.clientX;
                    currentTopDiff = initialMouseTop - currentMouseTop;
                    currentLeftDiff = initialMouseLeft - currentMouseLeft;
                    currentToDragTop = initialToDragTop - currentTopDiff;
                    currentToDragLeft = initialToDragLeft - currentLeftDiff;
                    if (currentToDragTop < 0) {
                        currentToDragTop = 0;
                    }
                    if (currentToDragLeft < 0) {
                        currentToDragLeft = 0;
                    }
                    if (currentToDragLeft + toDrag.outerWidth() > $(window).width()) {
                        currentToDragLeft = $(window).innerWidth() - toDrag.outerWidth();
                    }
                    toDrag.css({ top: currentToDragTop, left: currentToDragLeft });
                }
            },
            mouseup: function (e) {
                if (canDrag && toDrag.hasClass('dragging')) {
                    toDrag.removeClass('trans-0 dragging');
                    var toDragWid = toDrag.outerWidth();
                    var screenWid = $(window).innerWidth();
                    var toDragHei = toDrag.outerHeight();
                    var screenHei = $(window).height();
                    finalMouseLeft = e.clientX;
                    var mouseLeftDiff = finalMouseLeft - initialMouseLeft;
                    finalTStamp = e.timeStamp;
                    var timeStampDiff = finalTStamp - initialTStamp;
                    // Determine element's position
                    if (initialToDragLeft <= 100) {
                        toDragOnLeft = true;
                    }
                    else {
                        toDragOnLeft = false;
                    }
                    // Move element to specified position
                    if (toDrag.hasClass('drag-to-left') || toDrag.hasClass('drag-to-right')) {
                        if (toDrag.hasClass('drag-to-left')) {
                            toDrag.css({ left: 0 });
                        }
                        else if (toDrag.hasClass('drag-to-right')) {
                            toDrag.css({ left: (screenWid - toDragWid) });
                        }
                    }
                    // Move element if pulled quickly
                    else if (timeStampDiff < 300) {
                        if ((mouseLeftDiff < 0) && !toDragOnLeft) {
                            if (mouseLeftDiff < -100) {
                                toDrag.css({ left: 0 });
                                toDragOnLeft = true;
                            }
                            else {
                                toDrag.css({ left: (screenWid - toDragWid) });
                            }
                        }
                        if ((mouseLeftDiff > 0) && toDragOnLeft) {
                            if (mouseLeftDiff > 100) {
                                toDrag.css({ left: (screenWid - toDragWid) });
                                toDragOnLeft = false;
                            }
                            else {
                                toDrag.css({ left: 0 });
                            }
                        }
                    }
                    // Move element if pulled past half of the screen
                    else if (((currentToDragLeft + (toDragWid / 2)) < (screenWid / 2))) {
                        toDrag.css({ left: 0 });
                    }
                    else if (((currentToDragLeft + (toDragWid / 2)) > (screenWid / 2))) {
                        toDrag.css({ left: (screenWid - toDragWid) });
                    }
                    if (toDrag.hasClass('drag-to-bottom')) {
                        var newToDragTop = screenHei - toDragHei;
                        toDrag.css({ top: newToDragTop });
                    }
                    else {
                        toDrag.css({ top: 0 });
                    }
                    canDrag = false;
                }
                initialToDragTop = undefined;
                initialToDragLeft = undefined;
                currentToDragTop = undefined;
                currentToDragLeft = undefined;
                initialMouseTop = undefined;
                currentMouseTop = undefined;
                initialMouseLeft = undefined;
                currentMouseLeft = undefined;
                initialTStamp = undefined;
                finalTStamp = undefined;
                finalMouseLeft = undefined;
            }
        });
    },
});

/**
 * Toggle custom menu
 */

function show_custom_menu(e, theMenu) {
    var theMenuPositX = e.clientX,
        theMenuPositY = e.clientY,
        theMenuWid = theMenu.width(),
        theMenuHei = theMenu.height(),
        winWidth = $(window).width(),
        winHeight = $(window).height();
    if ((theMenuPositX + theMenuWid) > winWidth) {
        theMenuPositX = winWidth - (theMenuWid + 15);
    }
    if ((theMenuPositY + theMenuHei) > winHeight) {
        theMenuPositY = winHeight - (theMenuHei + 30);
    }
    e.preventDefault();
    setTimeout(() => {
        theMenu.addClass('working').css({ top: theMenuPositY, left: theMenuPositX });
    }, 1);
}

/**
 * Toggle custom popup
 */

function show_custom_popup(e, thePopup) {
    var thePopupPositX = e.clientX,
        thePopupPositY = e.clientY,
        thePopupWid = thePopup.width(),
        thePopupHei = thePopup.height(),
        winWidth = $(window).width(),
        winHeight = $(window).height();
    if ((thePopupPositX + thePopupWid) > winWidth) {
        thePopupPositX = winWidth - (thePopupWid + 30);
    }
    if ((thePopupPositY + thePopupHei) > winHeight) {
        thePopupPositY = winHeight - (thePopupHei + 30);
    }
    e.preventDefault();
    setTimeout(() => {
        thePopup.addClass('working').css({ top: thePopupPositY });;
        if (winWidth > 576) {
            thePopup.css({ left: thePopupPositX });
        }
    }, 1);
}

/**
 * Count down function
 */

var countSpeed = 10;
var countInterval;

function count_down(minm, output) {
    var maxm = minm + 100;
    function the_count() {
        maxm--;
        if (maxm <= (minm + 20)) {
            countSpeed += 7;
        }
        output.html(maxm);
        clearInterval(countInterval);
        countInterval = setInterval(() => {
            the_count();
        }, countSpeed);
        if (maxm == minm) {
            clearInterval(countInterval);
        }
    }
    the_count();
}

/**
 * Count up function
 */

function count_up(maxm, output) {
    var minm = maxm - 100;
    function the_count() {
        minm++;
        if (minm >= (maxm - 20)) {
            countSpeed += 7;
        }
        output.html(minm);
        clearInterval(countInterval);
        countInterval = setInterval(() => {
            the_count();
        }, countSpeed);
        if (maxm == minm) {
            clearInterval(countInterval);
        }
    }
    the_count();
}

/**
 * Show data statistics on circular chart
 */

function stats_chart_count(chart, value) {
    var diskMax = 100, // Max number for a full ring
        nthDisk1 = diskMax / 8,
        nthDisk3 = nthDisk1 * 3,
        nthDisk5 = nthDisk1 * 5,
        nthDisk7 = nthDisk1 * 7;
    // Counting the number of full circles and deduce them to one
    for (let n = 0; n < 10000; n++) {
        if (value >= (diskMax * n) && value < (diskMax * (n + 1))) {
            value = value - (diskMax * n);
        }
    }
    // adjusting disk occupation
    if (value <= nthDisk1) {
        var level1 = 50 + (value * 4);
        chart.css({ clipPath: 'polygon(50% 50%, 50% 0, ' + level1 + '% 0, 50% 50%, 50% 50%, 50% 50%, 50% 50%)' });
    }
    if (value > nthDisk1 && value <= nthDisk3) {
        var level2 = (value - nthDisk1) * 4;
        chart.css({ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% ' + level2 + '%, 50% 50%, 50% 50%, 50% 50%)' });
    }
    if (value > nthDisk3 && value <= nthDisk5) {
        var level3 = 100 - ((value - nthDisk3) * 4);
        chart.css({ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, ' + level3 + '% 100%, 50% 50%, 50% 50%)' });
    }
    if (value > nthDisk5 && value <= nthDisk7) {
        var level4 = 100 - ((value - nthDisk5) * 4);
        chart.css({ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0% 100%, 0% ' + level4 + '%, 50% 50%)' });
    }
    if (value > nthDisk7 && value <= 1000) {
        var level5 = (value - nthDisk7) * 4;
        chart.css({ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0% 100%, 0% 0%, ' + level5 + '% 0)' });
    }
}

/**
 * Page content searcher
 */

const pageContentList = $('.page-content-search-result');
$('.page-search-box > .search-box__input').on({
    keyup: function () {
        let str = $(this).val().toLowerCase();
        pageContentList.find('li').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(str) > - 1);
        });
        let foundResults = pageContentList.find('li:visible').length;
        if (foundResults < 1) {
            pageContentList.find('.not-found').remove();
            // Create a not-found text
            let notFoundNotice = document.createElement('div');
            notFoundNotice.textContent = 'Not found';
            notFoundNotice.classList.add('grid-center', 'not-found');
            pageContentList.find('ul').append(notFoundNotice);
        } else {
            pageContentList.find('.not-found').remove();
        }
    }
});

pageContentList.find('li').click(() => pageContentList.collapse('hide'));

/**
 * Copy a list
 */

// function copy_list(aList, listTitle) {
//     listTitle ? listTitle = listTitle + '\n------------------\n\n' : listTitle = 'My list\n------------------\n\n';
//     var listSongs = aList.querySelectorAll('li');
//     var listContainer = document.createElement('ul');
//     listContainer.innerHTML = listTitle;
//     listSongs.forEach((el, inx) => {
//         var listName = el.textContent;
//         listName = listName.replace(/^\s+|\s+$/g, '');
//         var songListElement = (inx + 1) +'. '+listName +'\n';
//         var songListElementHolder = document.createElement('li');
//         songListElementHolder.innerHTML = songListElement;
//         listContainer.appendChild(songListElementHolder);
//     });
//     var theList = listContainer.innerText;
//     navigator.clipboard.writeText(theList);
//     setTimeout(() => {
//         show_custom_alert('List copied successively.');
//     }, 1);
// }

// In jQuery

function copy_list(aList, listTitle) {
    listTitle ? listTitle = listTitle + '\n------------------\n\n' : listTitle = 'My list\n------------------\n\n';
    if (aList.length < 1) {
        show_custom_alert('<img src="../../Pics/not_found.svg" class="w-2rem ratio-1-1"> Sorry! The list you are refering to is not found.', 'warning');
        return;
    }
    var $listSongs = $(aList).find('li'),
        $listContainer = $('<ul></ul>').html(listTitle);

    $listSongs.each(function (inx, el) {
        var listText = $(el).text().trim(),
            listContent = (inx + 1) + '. ' + listText + '\n',
            $listElementHolder = $('<li></li>').html(listContent);
        $listContainer.append($listElementHolder);
    });

    var theList = $listContainer.text();
    navigator.clipboard.writeText(theList).then(() => {
        show_toast('<span class="fa fa-copy text-warning"></span> List copied successfully');
    }).catch(error => {
        show_custom_alert('❌ Sorry! Something went wrong, please try again', 'warning');
        console.error('Error copying the list: ', error);
    });
}

/**
 * Sort a list
 */

// Ascending
function sort_list(aList) {
    const listItems = Array.from(aList.getElementsByTagName('li'));
    // Sort the list items alphabetically (after trimming);
    const sortedItems = listItems.sort((a, b) => {
        return a.textContent.replace(/^\s+|\s+$/g, '').localeCompare(b.textContent.replace(/^\s+|\s+$/g, ''));
    });
    // Remove existing list items
    while (aList.firstChild) {
        aList.removeChild(aList.firstChild);
    }
    // Append the sorted list items back
    sortedItems.forEach(item => {
        aList.appendChild(item);
    });
}
// Descending
function sort_list_descending(aList) {
    const listItems = Array.from(aList.getElementsByTagName('li'));
    const sortedItems = listItems.sort((a, b) => {
        return b.textContent.replace(/^\s+|\s+$/g, '').localeCompare(a.textContent.replace(/^\s+|\s+$/g, ''));
    });
    while (aList.firstChild) {
        aList.removeChild(aList.firstChild);
    }
    sortedItems.forEach(item => {
        aList.appendChild(item);
    });
}

/**
 * Show toast (alert)
 */

const show_toast = (message) => {
    const toast = document.createElement('div');
    toast.classList.add('myToast');
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
};

/**
 * Show toast (alert)
 */

const show_custom_alert = (message, type) => {
    type = type || 'light';
    const customAlertTypeClass = 'item-' + type;
    const customAlert = document.createElement('div'),
        customAlertBody = document.createElement('div'),
        customAlertMessageHolder = document.createElement('p'),
        customAlertCloser = document.createElement('button');
    // Set classes
    customAlert.classList.add('custom-alert');
    customAlertBody.classList.add('col-11', 'col-sm-8', 'col-md-6', 'col-lg-4', 'my-item', customAlertTypeClass, 'custom-alert-content');
    customAlertMessageHolder.classList.add('p-3', 'small');
    customAlertCloser.classList.add('btn');
    customAlertCloser.setAttribute('onclick', 'remove_custom_alert()');
    // Add content
    customAlertMessageHolder.innerHTML = message;
    customAlertCloser.textContent = 'Ok';
    // Add show alert
    customAlertBody.appendChild(customAlertMessageHolder);
    customAlertBody.appendChild(customAlertCloser);
    customAlert.appendChild(customAlertBody);
    document.body.appendChild(customAlert);
};

function remove_custom_alert() {
    $('.custom-alert').remove();
}

/**
 * Save/Print an element
 */

function printElem(dt, w, h) {
    var content = dt.html(),
        toSave = window.open('', '', 'width=' + w + ', height=' + h),
        styles1 = '<link rel="stylesheet" type="text/css" href="all.css">',
        styles2 = '<link rel="stylesheet" type="text/css" href="styles/chms.css">',
        bootstrap = '<link rel="stylesheet" href="bootstrap/bootstrap.min.css">';
    toSave.document.write(styles1);
    toSave.document.write(styles2);
    toSave.document.write(bootstrap);
    toSave.document.write(content);
    toSave.document.close();
    setTimeout(() => {
        toSave.print();
    }, 2000);
}
$('.printThis').click(function () {
    printElem($('.SongsHome'));
});

// prevents the addition of a new history entry when the page loads
function preventHistory() {
    history.replaceState(null, null, document.URL);
}


// Custom functions

/**
 * Toggle IndexNavi when the user scrolls
 */

var prevPosit = scrollY; // Or window.scrollY

window.onscroll = function () { // or "onscroll = function() {"
    let currentPosit = scrollY,
        webNavigators = $("nav.navbar"),
        // var webNavigators = $("#IndexNavi , nav.navbar");
        otsFIXED = $(".navigate, .left-design, .nav-chms, #mySidenav, .randomSCH, .emphasizeCorres, #aniver, #aniv, .galrImg-sideDisplayer, .galleryFilter");
    if ((currentPosit > prevPosit + 30)) {
        webNavigators.addClass('short');
        otsFIXED.addClass('NewTop');
    }
    else if (currentPosit < prevPosit) {
        webNavigators.removeClass('short');
        otsFIXED.removeClass('NewTop');
    }
    prevPosit = currentPosit;
    if (scrollY < ((winHei * 3) + 100)) {
        $('.ToTop').css({ visibility: "hidden" });
    }
    else {
        $('.ToTop').css({ visibility: "visible" });
    }
}

function show_guide() {
    $('.webGuide-fix').show();
}

function show_CHMS_help() {
    $('.informer-lg').parent().show();
}
$('.guideBtn').click(show_CHMS_help);

function hide_CHMS_help() {
    $('.informer-lg').parent().fadeOut('slow');
    $('.informer-lg').addClass('flyOutBB');
    clearTimeout(timeOutDuration);
    timeOutDuration = setTimeout(() => {
        $('.informer-lg').removeClass('flyOutBB');
    }, 500);
}

// Click corresponding link inside

function clickTheLink() {
    $(this).find('a')[0].click();
}

function targetTheLink(e) {
    if ($(this).is(e.target) && !$(this).has(e.target).length) {
        $(this).find('a')[0].click();
    }
}
$('.target-link').click(targetTheLink);

function targetInput(e) {
    if ($(this).is(e.target) && !$(this).has(e.target).length) {
        $(this).find('input')[0].focus();
    }
}
$('.target-input').click(targetInput);

// Activating horizontal grids when scrolled
$('.navigator-tabs > button').click(function () {
    let inx = $(this).index(),
        toScroll = $(this).parent().next(),
        corresSpace = toScroll.find('>:nth-child(' + (inx + 1) + ')');
    toScroll.scrollLeft(corresSpace[0].offsetLeft);
});
$('.navigator-space').on({
    scroll: function () {
        let dis = $(this),
            offLeft = dis.scrollLeft(),
            disWid = dis.width(),
            activeTab = Math.round(offLeft / disWid) + 1;
        toActivate = dis.prev().find('>:nth-child(' + activeTab + ')');
        activate(toActivate);
    }
});

/**
* Scroll tracker
*/

const scrollTrackTitle = $('.scroll-track-titles'),
    scrollTrackContent = $('.scroll-track-content');
if (scrollTrackContent.length > 0) {
    var prevScrollPosition = scrollY;
    $(document).on({
        scroll: function () {
            let trackTitleOffTop = scrollTrackContent[0].getBoundingClientRect().top - $(window).height();
            // Making scroll trackers/titles
            const trackTitles = [];
            scrollTrackTitle.find('[track-scroll]').each(function () {
                trackTitles.push($(this).attr('href'));
            });
            // When contents reaches the view port
            if (trackTitleOffTop < 0) {
                let currentScrollPosition = scrollY,
                    midWinHeight = $(window).height() / 2;
                // Toggling activeness
                trackTitles.forEach((el, inx) => {
                    let posit = $(el)[0].getBoundingClientRect().top - $(window).height(),
                        prevTitle = trackTitles[inx - 1];
                    // Activating in-view
                    if (posit < - (100 + midWinHeight) && posit > - (200 + midWinHeight)) {
                        $('[track-scroll][href="' + el + '"]').addClass('active');
                        trackTitles.forEach(title => {
                            if (title !== el) {
                                $('[track-scroll][href="' + title + '"]').removeClass('active');
                            }
                        });
                    }
                    // Activating previous when current is out of view
                    if (posit > 0 && prevTitle) {
                        const prevBottomPosit = scrollY - $(prevTitle).offset().top + $(window).height() - $(prevTitle).height(),
                            prevTopPosit = $(prevTitle)[0].getBoundingClientRect().top - $(window).height();
                        if (prevTopPosit < 0 && prevBottomPosit < 0 && prevScrollPosition > currentScrollPosition) {
                            $('[track-scroll][href="' + trackTitles[inx] + '"]').removeClass('active');
                            $('[track-scroll][href="' + trackTitles[inx - 1] + '"]').addClass('active');
                        }
                    }
                });
                prevScrollPosition = currentScrollPosition;
            }
        }
    });
}

/**
* Switch between horizontal grids by click
*/

$('.item-swicher.left').click(function () {
    var itemsWrapper = $(this).parents('.g-items'),
        gridInView = itemsWrapper.find('.grid-item.view'),
        currentSwitcher = $(this),
        oppositeSwitcher = currentSwitcher.next();
    if (gridInView.prev().hasClass('grid-item')) {
        gridInView.removeClass('view').prev().addClass('view');
        gridInView = itemsWrapper.find('.grid-item.view');
        var offLeft = gridInView[0].offsetLeft;
        itemsWrapper.scrollLeft(offLeft);
    }
    if (!gridInView.prev().hasClass('grid-item')) {
        currentSwitcher.addClass('visible-n');
    }
    if (oppositeSwitcher.hasClass('visible-n')) {
        oppositeSwitcher.removeClass('visible-n');
    }
});
$('.item-swicher.right').click(function () {
    var itemsWrapper = $(this).parents('.g-items'),
        gridInView = itemsWrapper.find('.grid-item.view'),
        currentSwitcher = $(this),
        oppositeSwitcher = currentSwitcher.prev();
    if (gridInView.next().hasClass('grid-item')) {
        gridInView.removeClass('view').next().addClass('view');
        gridInView = itemsWrapper.find('.grid-item.view');
        var offLeft = gridInView[0].offsetLeft;
        itemsWrapper.scrollLeft(offLeft);
    }
    if (!gridInView.next().hasClass('grid-item')) {
        currentSwitcher.addClass('visible-n');
    }
    if (oppositeSwitcher.hasClass('visible-n')) {
        oppositeSwitcher.removeClass('visible-n');
    }
});

/**
* Switch between horizontal grids by arrows
*/

$(document).on({
    keyup: function (e) {
        var gItemsWrapper = $('.g-items');
        if ((winWid > 576) && gItemsWrapper.is(':visible')) {
            if (e.key == 'ArrowLeft') {
                var gInView = gItemsWrapper.find('.grid-item.view'),
                    leftSwitcher = gItemsWrapper.find('.item-swicher.left'),
                    oppSwitcher = leftSwitcher.next();
                if (gInView.prev().hasClass('grid-item')) {
                    gInView.removeClass('view').prev().addClass('view');
                    gInView = gItemsWrapper.find('.grid-item.view');
                    var offLeft = gInView[0].offsetLeft;
                    gItemsWrapper.scrollLeft(offLeft);
                }
                if (!gInView.prev().hasClass('grid-item')) {
                    leftSwitcher.addClass('visible-n');
                }
                if (oppSwitcher.hasClass('visible-n')) {
                    oppSwitcher.removeClass('visible-n');
                }
            }
            if (e.key == 'ArrowRight') {
                var rightSwitcher = gItemsWrapper.find('.item-swicher.right'),
                    oppSwitcher = rightSwitcher.prev(),
                    gInView = gItemsWrapper.find('.grid-item.view');
                if (gInView.next().hasClass('grid-item')) {
                    gInView.removeClass('view').next().addClass('view');
                    gInView = gItemsWrapper.find('.grid-item.view');
                    var offLeft = gInView[0].offsetLeft;
                    gItemsWrapper.scrollLeft(offLeft);
                }
                if (!gInView.next().hasClass('grid-item')) {
                    rightSwitcher.addClass('visible-n');
                }
                if (oppSwitcher.hasClass('visible-n')) {
                    oppSwitcher.removeClass('visible-n');
                }
            }
        }
    }
});

/**
 * Hide grid switcers
 */

// $.each($('.g-items'), function () {
//     var leftSwitcher = $(this).find('.item-swicher.left');
//     var rightSwitcher = $(this).find('.item-swicher.right');
//     var innerItems = $(this).find('.grid-item').length;
//     var tisWid = $(this).width();

//     $(this).on({
//         mouseover : function () {
//             var scrolled = $(this).scrollLeft();
//             if (scrolled < 3) {
//                 leftSwitcher.fadeOut();
//             }
//             else {
//                 leftSwitcher.fadeIn();
//             }
//             if (scrolled >= ((innerItems - 1) * tisWid) - 10) {
//                 rightSwitcher.fadeOut();
//             }
//             else {
//                 rightSwitcher.fadeIn();
//             }
//         },
//     });
// });
// setInterval(() => {
//     console.log($('.g-items').scrollLeft())
// }, 1000);

/**
 * Switch between horizontal grids by pagers
 */

$('.item-pager > button').click(function () {
    var pageIndocator = $(this),
        pagerNum = pageIndocator.index() + 1,
        pagesHolder = pageIndocator.parents('.g-items'),
        coressPage = pagesHolder.find('.grid-item:nth-child(' + pagerNum + ')');
    coressPage.addClass('view');
    coressPage.siblings().removeClass('view');
    pagesHolder.scrollLeft(coressPage[0].offsetLeft);
});

/**
 * Switch between horizontal grids by swipe
 */

function indicate_viewing_grid() {
    var scrolling = $(this),
        item = scrolling.find('> .grid-item'),
        offLEFT = scrolling.scrollLeft(),
        min_offLEFT = offLEFT - 10,
        max_offLEFT = offLEFT + 10,
        itemIndicators = scrolling.find('.item-pager');
    $.each(item, function () {
        var itemPosition = $(this)[0].offsetLeft;
        if ((itemPosition > min_offLEFT) && (itemPosition < max_offLEFT)) {
            var inViewItemNum = $(this).index() + 1;
            itemIndicators.find('> button:nth-child(' + inViewItemNum + ')').addClass('view').siblings().removeClass('view');
            if (winWid <= 576) {
                $(this).addClass('view').siblings().removeClass('view');
            }
        }
        else if (winWid <= 576) {
            $(this).removeClass('view');
        }
    });
}

$('.g-items').scroll(indicate_viewing_grid);

/**
 * closing grid items
 */

function close_grids() {
    var grids_wrapper = $(this).parents('.g-items'),
        grids_holder = grids_wrapper.parent();
    if (grids_holder.hasClass('fix-holder')) {
        grids_holder.trigger('click');
    }
    else {
        grids_holder.hide();
    }
}
$('.g-itemsCloser').click(close_grids);

function close_grid_items() {
    var visibleGrids = $('.g-items-holder').filter(function () {
        return $(this).is(':visible');
    }).length;
    if (visibleGrids > 0) {
        $('.g-items-holder').trigger('click');
    }
}
// $('.g-items-holder').click(function (e) {
//     if ($(this).is(e.target) && !$(this).has(e.target).length) {
//         var wrapper = $(this).find('> .g-items');
//         scroll_left(wrapper);
//         setTimeout(() => {
//             wrapper.find('.view').removeClass('view');
//             wrapper.find('.grid-item:first-child').addClass('view');
//             wrapper.find('.item-pager > span:first-child').addClass('view');
//             console.log(wrapper.scrollLeft());
//         }, 2000);
//     }
// });


// iOSicon

function enable_ios_assistive_touch() {
    localStorage.setItem('iosAssistiveTouchStatus', 'enabled');
    $('.ios-assistive-touch-toggler').addClass('active');
}

function disable_ios_assistive_touch() {
    localStorage.setItem('iosAssistiveTouchStatus', 'disabled');
    $('.ios-assistive-touch-toggler').removeClass('active');
}

function toggle_ios_assistive_touch() {
    const isIOSATEnabled = localStorage.getItem('iosAssistiveTouchStatus');
    if (isIOSATEnabled === 'enabled') {
        disable_ios_assistive_touch();
    } else {
        enable_ios_assistive_touch();
    }
}

(function start_ios_AT() {
    const isIOSATEnabled = localStorage.getItem('iosAssistiveTouchStatus');
    if (isIOSATEnabled === 'enabled') {
        $('.ios-assistive-touch-toggler').addClass('active');
    }
})();


var iOSicon,
    iOS_x2,
    iOS_y2,
    iOS_size,
    // iOS_canGoTop,
    iOS_smallOffset = 5,
    iOS_bigOffset;

$('.ios-assistive-touch-toggler').on({
    touchstart: function () {
        iOSicon = $(this);
        iOS_size = iOSicon.outerWidth();
        iOS_midSize = iOS_size / 2;
        iOS_bigOffset = ($(window).width() - 5 - iOS_size);
        iOSicon.removeClass('NewTop').addClass('trans-0 touched');
        bodi.addClass('overf-hide');
        // if ($('nav#Main_nav').hasClass('short')) {
        //     iOS_canGoTop = true;
        // }
    },
    touchmove: function (e) {
        iOS_x2 = e.originalEvent.touches[0].clientX;
        iOS_y2 = e.originalEvent.touches[0].clientY;
        // if (!iOS_canGoTop) {
        //     if ((iOS_y2 - iOS_midSize) < 45) {
        //         iOS_y2 = (iOS_midSize + 45);
        //     }
        // }
        // else {
        //     if ((iOS_y2 - iOS_midSize) < 5) {
        //         iOS_y2 = (iOS_midSize + 5);
        //     }
        // }
        if ((iOS_y2 - iOS_midSize) < 45) {
            iOS_y2 = (iOS_midSize + 45);
        }
        var top = iOS_y2 - iOS_midSize,
            left = iOS_x2 - iOS_midSize;
        iOSicon.css({ top: top, left: left });
    },
    touchend: function () {
        iOSicon.removeClass('trans-0');
        bodi.removeClass('overf-hide');
        if (iOS_x2 == undefined) {
            var newLeft = iOS_bigOffset,
                newRight = iOS_smallOffset;
        }
        if (iOS_x2 <= ($(window).width() / 2)) {
            var newLeft = iOS_smallOffset,
                newRight = iOS_bigOffset;
        }
        else {
            var newLeft = iOS_bigOffset,
                newRight = iOS_smallOffset;
        }
        iOSicon.css({ left: newLeft, right: newRight });
    }
});

$('.ios-assistive-touch-toggler, .page-options').click(function (e) {
    var iosMenu = $('.ios-assistive-touch-menu'),
        iosMenuMidSize = iosMenu.outerWidth() / 2,
        top = e.clientY + iosMenuMidSize,
        left = e.clientX + iosMenuMidSize;
    if (!iosMenu.hasClass('working')) {
        iosMenu.addClass('trans-0').css({ top: top, left: left });
        setTimeout(() => {
            iosMenu.removeClass('trans-0').addClass('working').css({ top: '50%', left: '50%' });
        }, 1);
    }
    else {
        hide_iOS_tools();
    }
    $('html, body').click(function (ev) {
        if (!iosMenu.is(ev.target) && !iosMenu.has(ev.target).length) {
            hide_iOS_tools();
        }
    });
    setTimeout(() => {
        scroll_left(iosMenu.find('>.clmn_wrapper'));
    }, 1);
});
function hide_iOS_tools() {
    $('.ios-assistive-touch-menu').removeClass('working');
}
$('.ios-assistive-touch-menu section > div').click(hide_iOS_tools);
$('.item-search').click(function () {
    show_search_tool();
});
// $('.iOS-set').click(show_web_settings);
$('.iOS-church').click(show_repertoire);

/**
 * Web settings
 */

$("#settingsMenu").click(function () {
    $('#BTM-Nav').fadeOut();
    $('#mySidenav').parent()[0].click();
    show_web_settings();
});

$('.web-contactor').click(function () {
    // $('#Contact').show();
    go_back();
    $('.contact-us').collapse('show');

});
$(".contClose").click(function () {
    $('#Contact').hide();
    $('#BTM-Nav').fadeIn();
});

$(".phoneView div:nth-of-type(3) > div:last-of-type > div:last-of-type > a ").click(function () {
    $(this).parents('.phoneView').parent().fadeOut();
});

$('.img-responsive').addClass('img-rounded');

var grad_color = '#0e407c;';
$('#mediaT').on({
    mousemove: function (e) {
        var move = $(this),
            click_shower = move.find('> .touch-anim'),
            shower_top = e.clientY - (move.offset().top - scrollY),
            shower_left = e.clientX - (move.offset().left),
            top_cent = ((shower_top * 100) / move.height());
        if (top_cent > 0 && top_cent <= 25) {
            grad_color = $('#mediaT').find('> div:nth-of-type(1)').css('--MediaColor3');
        }
        if (top_cent >= 26 && top_cent <= 50) {
            grad_color = $('#mediaT').find('> div:nth-of-type(2)').css('--MediaColor3');
        }
        if (top_cent >= 51 && top_cent <= 75) {
            grad_color = $('#mediaT').find('> div:nth-of-type(3)').css('--MediaColor3');
        }
        if (top_cent >= 76 && top_cent <= 100) {
            grad_color = $('#mediaT').find('> div:nth-of-type(4)').css('--MediaColor3');
        }
        click_shower.addClass('move');
        click_shower.css({ left: shower_left, top: shower_top, backgroundColor: grad_color, boxShadow: '0px 0px 50px 5rem ' + grad_color + '' });
    },
    mouseleave: function () {
        var move = $(this),
            click_shower = move.find('> .touch-anim');
        click_shower.removeClass('move').css({ boxShadow: '' });
    }
});

/**
 * Make Holy mass repertoire
 */

function show_repertoire() {
    $('.repertoirePar').show();
    // window.history.pushState({ id: 1 }, null, null);
    window.history.pushState({ showRepertoire: true }, null, null);
}
$('.REPERTOIRE_MAKE').click(show_repertoire);

$('.repertoirePar').click(function (e) {
    if ($(this).is(e.target) && !$(this).has(e.target).length) {
        go_back();
    }
});

// Checking for blank inputs

var emptyInput = false;
function check_empty_input(x) {
    // Checking if the input is only whitespace (by removing all whitespace)
    var value = x.val(),
        valueChar = value.replace(/\s/g, '').length;
    if (valueChar == 0) {
        emptyInput = true;
    }
    else {
        emptyInput = false;
    }
}

// Setting rep choir name

var repChoirName;
function set_choir_name() {
    var dis = $(this);
    check_empty_input(dis);
    if (!emptyInput) {
        repChoirName = dis.val();
        var choirName = '<h3 class="w-fit px-1 mb-0 justify-self-end choirName=">' + repChoirName + '</h3>',
            choirNameEditor = '<span class="fa fa-edit w-fit px-1 justify-self-start text-brown ptr choirNameEditor"></span>',
            choirNamePar = '<div class="d-grid auto-flow-col align-items-center px-1 mb-3 h-50px choirNamePar">' + choirName + choirNameEditor + '</div>';
        dis.before(choirNamePar);
        dis.remove();
        $('.choirNameEditor').click(edit_choir_name);
    }
}

function edit_choir_name() {
    var newName = '<input type="text" name="MassChoir" id="repChoir" \
    placeholder="...choir\'s name" value="'+ repChoirName + '" class="d-block mx-auto mb-3 px-1 h-50px rad-30">';
    $('.choirNamePar').remove();
    $('.repertoire-details').prepend(newName);
    $('#repChoir').focus();
    $('#repChoir').blur(set_choir_name);
}

// $('#repChoir').on({
//     blur: set_choir_name
// });
$('#repChoir').blur(set_choir_name);

// Setting rep Mass place

var repPlaceName;
function set_choir_place() {
    var dis = $(this);
    check_empty_input(dis);
    if (!emptyInput) {
        repPlaceName = dis.val();
        var choirPlace = '<span class="px-1 justify-self-end choirPlace=">' + repPlaceName + '</span>',
            choirPlaceEditor = '<span class="fa fa-edit px-1 justify-self-start text-brown ptr choirPlaceEditor"></span>',
            choirPlacePar = '<span class="px-2 choirPlacePar">' + choirPlace + choirPlaceEditor + '</span>';
        dis.before(choirPlacePar);
        dis.remove();
        $('.choirPlaceEditor').click(edit_choir_place);
    }
}

function edit_choir_place() {
    var newName = '<input type="text" name="MassDate" id="repMassPlace" placeholder="...location" value="' + repPlaceName + '" class="px-2">'
    $('.choirPlacePar').remove();
    $('.repertoire-date > span:last-child').append(newName);
    $('#repMassPlace').focus();
    $('#repMassPlace').blur(set_choir_place);
}

// $('#repMassPlace').on({
//     blur: set_choir_place
// });
$('#repMassPlace').blur(set_choir_place);

var repSongInput = $('.RepSongList > textarea'),
    repSongInputMore = $('.RepSongList.forMore > textarea');

function activate_repCat() {
    $(this).addClass('workingNew').siblings('textarea').removeClass('workingNew');
    $(this).parent().prev().addClass('working').siblings('h5').removeClass('working');
}

function add_new_repSong() {
    var dis = $(this),
        par = dis.parent(),
        inpt = par.find('textarea'),
        mtInputs = 0;
    if (!dis.val()) {
        $.each(inpt, function () {
            var value = $(this).val(),
                valueChar = value.replace(/\s/g, '').length;
            if (valueChar == 0) {
                mtInputs++;
            }
        });
        if (mtInputs == 1) {
            // var newInput = document.createElement('textarea');
            // newInput.setAttribute('placeholder', '+ Add');
            // newInput.classList.add('newRepInput');

            var newInput = '<textarea name="" id="" cols="30" rows="2" placeholder="+ Add" class="newRepInput"></textarea>';
            par.find('textarea:last').after(newInput);
        }
    }
    dis.addClass('workingNew').siblings('textarea').removeClass('workingNew');
    $('.newRepInput').keyup(function (e) {
        if (e.keyCode == 27) {
            $(this).blur().val('');
        }
    });
    $('.newRepInput').on({
        focus: add_new_repSong,
        blur: remove_mtInput,
        keyup: find_repSong, activate_repCat,
        keypress: function (e) {
            if (e.keyCode == 13) {
                $(this).blur();
            }
        },
        contextmenu: function (e) {
            var dis = $(this);
            if (dis.val()) {
                show_custom_menu(e, $('.repertoire-cont-menu'));
                dis.addClass('selected').siblings().removeClass('selected');
            }
        }
    });
}

function remove_mtInput() {
    var dis = $(this);
    if (!dis.val()) {
        var sib = dis.siblings();
        sib.filter(function () {
            return !$(this).val();
        }).remove();
    }
}

function find_repSong() {
    var dis = $(this),
        str = dis.val(),
        repS = $('.CATG_list').find('.SongElement:icontains(' + str + ')'),
        repSnum = repS.length;
    clearSug();
    repertoireSearchBox.val('');
    if (repSnum > 0 && repSnum < 7) {
        $.each(repS, function () {
            var repSname = $(this).text(),
                theName = '<li class="p-1 sgstAVB">' + repSname + '</li>';
            suggestionslist.append(theName);
            if ($(window).width() <= 768) {
                suggestionslist.parent().show();
            }
        });
        $('.sgstAVB').click(function () {
            var songToAdd = $(this).text().trim(),
                songsHolder = $('.repertoire').find('> h5.working').next(),
                activeCat = songsHolder.find('.workingNew').length;
            if (activeCat) {
                songsHolder.find('textarea.workingNew').val(songToAdd);
            }
            else {
                songsHolder.find('textarea:last').val(songToAdd);
            }
            $(this).parent().html('');

            if ($(window).width() <= 768) {
                suggestionslist.parent().hide();
            }

            // $('.listedRepSong').click(function () {
            //     $(this).toggleClass('selected');
            //     setTimeout(() => {
            //         var selectedSNum = $('.repertoire').find('li.selected').length;
            //         if (selectedSNum) {
            //             $('.repertoire-cont-menu').show();
            //         }
            //         else {
            //             $('.repertoire-cont-menu').hide();
            //         }
            //     }, 1);
            // });
        });
    }
}

repSongInput.keyup(function (e) {
    if (e.keyCode == 27) {
        $(this).blur().val('');
    }
});
repSongInput.on({
    focus: activate_repCat,
    keyup: find_repSong,
    keypress: function (e) {
        if (e.keyCode == 13) {
            $(this).blur();
        }
    }
});
repSongInputMore.on({
    focus: add_new_repSong,
    blur: remove_mtInput,
});

const suggestionslist = $('.repSsuggestions .rep-sug-list');

function clearSug() {
    suggestionslist.html('');
}

$('.RepSongList.forMore > textarea').contextmenu(function (e) {
    var dis = $(this);
    if (dis.val()) {
        show_custom_menu(e, $('.repertoire-cont-menu'));
        dis.addClass('selected').siblings().removeClass('selected');
    }
});

// Hidding rep menu

$('.repertoire-wrapper').click(function (e) {
    var toHide = $('.repertoire-menu, .repertoire-menu-icon');
    if (!toHide.is(e.target)) {
        $('.repertoire-menu').fadeOut();
    }
});

// Suggesting rep songs

var repSongToAdd;
const repertoireSearchBox = $('.repertoire-search-box > input');
repertoireSearchBox.on({
    keypress: function () {
        var value = $(this).val(),
            suggestedSong = $('.CATG_list').find('.SongElement:icontains(' + value + ')'),
            suggestedSongNum = suggestedSong.length,
            sugWrapper = $('.repSsuggestions .rep-sug-list'),
            sugRepNum = $('.sugRepNum');
        sugRepNum.html(suggestedSongNum);
        if (suggestedSongNum > 0) {
            sugRepNum.removeClass('visible-n').addClass('visible-y');
        }
        if (suggestedSongNum < 1) {
            clearSug();
            sugRepNum.removeClass('visible-y').addClass('visible-n');
        }
        if (suggestedSongNum > 0 && suggestedSongNum < 16) {
            clearSug();
            $.each(suggestedSong, function () {
                var sugName = $(this).text();
                var sugElem = '<li class="resFound">' + sugName + '</li>';
                sugWrapper.append(sugElem);
            });
        }
        $('.resFound').click(function () {
            repSongToAdd = $(this).text().trim();
            var songsHolder = $('.repertoire').find('> h5.working').next(),
                songsinCat = songsHolder.find('.workingNew').length;
            if (songsinCat) {
                songsHolder.find('textarea.workingNew').val(repSongToAdd);
            }
            else {
                songsHolder.find('textarea:last').val(repSongToAdd);
            }
            clearSug();
            if ($(window).width() <= 768) {
                sugWrapper.parent().hide();
            }
        });
    }
});

// Setting repertoire time

setInterval(() => {
    var year = dateStr.getFullYear(),
        month = dateStr.getMonth() + 1,
        today = dateStr.getDate(),
        c_hr = dateStr.getHours(),
        c_min = dateStr.getMinutes();
    const dateElems = [month, today, c_hr, c_min]
    // dateElems.forEach(el => {
    //     if (el < 10) {
    //         el = '0' + el;
    //     }
    // });
    if (month < 10) {
        month = '0' + month;
    }
    if (today < 10) {
        today = '0' + today;
    }
    if (c_hr < 10) {
        c_hr = '0' + c_hr;
    }
    if (c_min < 10) {
        c_min = '0' + c_min;
    }
    var currentDate = (year + '-' + month + '-' + today + 'T' + c_hr + ':' + c_min),
        // currentDate = (year + '-' + dateElems[0] + '-' + dateElems[1] + 'T' + dateElems[2] + ':' + dateElems[3]),
        maxDate = ((year + 1) + '-12-31T00:00');
    $('#repDateTime').attr('min', currentDate);
    $('#repDateTime').attr('value', currentDate);
    $('#repDateTime').attr('max', maxDate);
}, 1000);

// Setting rep Mass time

var repChoirTime;
function set_choir_time() {
    var dis = $(this);
    check_empty_input(dis);
    if (!emptyInput) {
        repChoirTime = dis.val();
        repChoirTime = repChoirTime.replace('T', ' ');
        var choirTime = '<span clas="px-1" id="repDateTime">' + repChoirTime + '</span>',
            choirTimeEditor = '<span class="fa fa-edit w-fit px-1 justify-self-start text-brown ptr choirTimeEditor"></span>',
            choirTimePar = '<span class="px-1 choirTimePar">' + choirTime + choirTimeEditor + '</span>';
        dis.before(choirTimePar);
        dis.remove();
        $('.choirTimeEditor').click(edit_choir_time);
    }
}

function edit_choir_time() {
    var newTime = '<input type="datetime-local" name="MassDate" id="repDateTime" value="' + repChoirTime + '" min="2020-01-01" max="2020-01-01">';
    $('.choirTimePar').remove();
    $('.repertoire-date > span:first-child').append(newTime);
    $('#repDateTime').focus();
    $('#repDateTime').blur(set_choir_time);
}

$('#repDateTime').blur(set_choir_time);

// Toggling and saving rep

$('.repertoire-menu-icon').click(function () {
    var toShow = $('.repertoire-menu');
    if (toShow.is(':hidden')) {
        toShow.fadeIn();
    }
    else {
        toShow.hide();
    }
});
$('.repertoire-menu > button').click(function () {
    $(this).parent().fadeOut();
    clearSug();
});
$('.repertoire-song-removal-btn').click(function () {
    $('.RepSongList').find('textarea.selected').remove();
    $('.repertoire-cont-menu').removeClass('working');
});
$('.repertoire-details, .repertoire-planner').click(function () {
    $('.repertoire-guide').slideUp();
});
$('.repertoire-guider').click(function () {
    $('.repertoire-guide').slideDown();
    $('.repertoire-wrapper').animate({ scrollTop: 0 });

});
$('.repertoire-closer').click(function () {
    var listedSongs = 0;
    $.each($('.RepSongList textarea'), function () {
        var value = $(this).val(),
            valueChar = value.replace(/\s/g, '').length;
        if (!valueChar == 0) {
            listedSongs++;
        }
    });
    if (listedSongs > 0) {
        $('.rep-unsaved-dialog').show();
    }
    else {
        go_back();
    }
});
$('.rep-unsaved-dialog button').click(function () {
    $('.rep-unsaved-dialog').hide();
});
$('.my-dialog-buttons > button').click(function () {
    $(this).closest('.my-dialog').fadeOut();
});

$('.repertoire-clear').click(clear_repertoire);

function clear_repertoire() {
    var x = $('.repertoire ul.RepSongList');
    x.find('textarea').val('');
    $.each(x, function () {
        if ($(this).find('textarea').length > 1) {
            $(this).find('textarea:not(:first-child)').remove();
        }
    });
    $('.repertoire').find('.repertoireSongTool').remove();
}
function rm_repertoire_tools() {
    $('.repertoire').find('.repertoireSongTool').remove();
}
function save_repertoire() {
    var listedSongs = 0;
    $.each($('.RepSongList textarea'), function () {
        var value = $(this).val(),
            valueChar = value.replace(/\s/g, '').length;
        if (!valueChar == 0) {
            listedSongs++;
        }
    });
    if (listedSongs > 0) {
        // $('.repertoire-wrapper').addClass('final');
        var finalRep = $('.repertoire-wrapper').clone();
        // finalRep.css({backgroundImage: 'linear-gradient(var(--white1_cons), var(--white1_cons)), url(../Pics/Music_sheet4.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'});
        finalRep.addClass('final');
        finalRep.find('.repertoire-guide, .repertoire-menu, .repertoire-song-removal, .rep-unsaved-dialog').remove();
        var sElem = finalRep.find('.RepSongList textarea');
        $.each(sElem, function () {
            var newSElem = '<li>' + $(this).val() + '</li>';
            $(this).before(newSElem);
            $(this).remove();
        });
        printElem(finalRep, 360, 740);
        setTimeout(() => {
            finalRep.remove();
        }, 3000);
    }
    else {
        show_custom_alert('Empty list of songs.\nPlease list some songs before continuing.');
    }
}

$('.repertoire-saver').click(save_repertoire);
$(document).on({
    keydown: function (e) {
        // ctrl + s to save
        if ($('.repertoire').is(':visible') && (e.ctrlKey && e.keyCode == '83')) {
            e.preventDefault();
            save_repertoire();
        }
    },
});

/**
 * ESG gallery
 */

// document.onwheel = function (e) {
//     const scrollSpeed = 2;
//     document.scrollTop += e.deltaY * scrollSpeed;
//     console.log(e.deltaY + " pixels");
// }
// Filtering images

const esgGalrFilterBTN = $('.esgGalrFilter'),
    galleryFilter = $('.galleryFilter'),
    galrFilterClasses = $('.galr-filter-classes'),
    imgFilterCatg = galrFilterClasses.find('button'),
    imgRecentCatg = $('.recentPics'),
    imgFilterMerger = $('.galrFilterMerge'),
    imgFilterAllMatch = $('.galrFilterMatch'),
    galrFilterCls = $('.galrFilterCls');

function filter_defaults() {
    var activeLen = galrFilterClasses.find('> div > button.active').length;
    if (activeLen < 1) {
        imgRecentCatg.addClass('active');
    }
    galrFilterConf.addClass('ready');
}
function filter_reset() {
    imgFilterCatg.removeClass('active');
    imgRecentCatg.addClass('active');
    galrFilterConf.removeClass('ready');
}

imgFilterMerger.click(function () {
    $(this).toggleClass('active');
});
imgFilterAllMatch.click(function () {
    $(this).toggleClass('active');
});
imgFilterCatg.on({
    click: function () {
        $(this).toggleClass('active');
        disactivateSiblings($(this));
        if (!imgFilterMerger.hasClass('active')) {
            $(this).parent().siblings().find('> button').removeClass('active');
        }
        filter_defaults();
    },
    contextmenu: function (e) {
        e.preventDefault();
        imgFilterMerger.toggleClass('active');
        activate($(this));
        filter_defaults();
    },
    dblclick: function () {
        imgFilterCatg.removeClass('active');
        $(this).addClass('active');
        esgGrlFilterFromTool = true;
        filter_gallery();
        galleryFilter.hasClass('sticking') && toggle_galrFilter();
    }
});
galrFilterCls.click(function () {
    filter_reset();
    unfilter_gallery();
    refreshImgMvnt();
});
function refreshImgMvnt() {
    esgGalrImg.addClass('refreshing');
    setTimeout(() => {
        esgGalrImg.removeClass('refreshing');
    }, 2000);
}
$('.fltr-Close').click(function () {
    unfilter_gallery();
    scroll_page_to(galleryFilter);
});
$('.fltr-Again').click(function () {
    filter_reset();
    unfilter_gallery();
    scroll_page_to(galleryFilter);
});
function show_sticking_filter() {
    $('.galr-filter-classes-wrapper').collapse('show');
    esgGalrFilterBG.show();
}
function hide_sticking_filter() {
    $('.galr-filter-classes-wrapper').collapse('hide');
    esgGalrFilterBG.fadeOut();
}
function toggle_galrFilter() {
    visible(imageDisplayer) && close_full_img_displayer();
    if (esgGalrFilterBTN.hasClass('sticking')) {
        if (galleryFilter.hasClass('sticking')) {
            esgGalrFilterBTN.addClass('clicked');
        }
        galleryFilter.addClass('sticking');
        if (!$('.galr-filter-classes-wrapper').is(':visible')) {
            show_sticking_filter();
        }
        else {
            esgGalrFilterBG.show();
            if (esgGalrFilterBTN.hasClass('clicked')) {
                hide_sticking_filter();
                galleryFilter.removeClass('sticking');
            }
        }
    }
    else {
        galleryFilter.removeClass('sticking');
        if (!$('.galr-filter-classes-wrapper').is(':visible')) {
            $('.galr-filter-classes-wrapper').collapse('show');
        }
        else {
            $('.galr-filter-classes-wrapper').collapse('hide');
        }
    }
}

$(document).on({
    keydown: function (e) {
        if ((e.altKey && e.keyCode == '70') && $(window).width() < 992) {
            e.preventDefault();
            toggle_galrFilter();
        }
    },
});

var esgGalleryImage = $('.galr > div'),
    esgGalleryImage_img = esgGalleryImage.find('> img,> video');

// Gallery image filter action

const esgGallery = $('.esgGallery');
var esgGalleryCatg = $('.galr'),
    galrFilterConf = $('.galrFilter'),
    notFoundGalr = $('.notFound-galr');

function mark_gallery(x) {
    x.addClass('filtered');
}
function unmark_gallery() {
    esgGalleryCatg.removeClass('filtered');
}
function month_num_to_nm(xnum) {
    (xnum < 10) && (xnum = '0' + xnum);
    xnum = String(xnum);
    xnum = xnum.replace('01', 'January');
    xnum = xnum.replace('02', 'February');
    xnum = xnum.replace('03', 'March');
    xnum = xnum.replace('04', 'April');
    xnum = xnum.replace('05', 'May');
    xnum = xnum.replace('06', 'June');
    xnum = xnum.replace('07', 'July');
    xnum = xnum.replace('08', 'August');
    xnum = xnum.replace('09', 'September');
    xnum = xnum.replace('10', 'October');
    xnum = xnum.replace('11', 'November');
    xnum = xnum.replace('12', 'December');
    return xnum;
}
function month_shortNm_to_longNm(xnum) {
    xnum = xnum.replace('Jan', 'January');
    xnum = xnum.replace('Feb', 'February');
    xnum = xnum.replace('Mar', 'March');
    xnum = xnum.replace('Apr', 'April');
    xnum = xnum.replace('May', 'May');
    xnum = xnum.replace('Jun', 'June');
    xnum = xnum.replace('Jul', 'July');
    xnum = xnum.replace('Aug', 'August');
    xnum = xnum.replace('Sep', 'September');
    xnum = xnum.replace('Oct', 'October');
    xnum = xnum.replace('Nov', 'November');
    xnum = xnum.replace('Dec', 'December');
    return xnum;
}
function month_longNm_to_shortNm(xnum) {
    xnum = xnum.replace('January', 'Jan');
    xnum = xnum.replace('February', 'Feb');
    xnum = xnum.replace('March', 'Mar');
    xnum = xnum.replace('April', 'Apr');
    xnum = xnum.replace('May', 'May');
    xnum = xnum.replace('June', 'Jun');
    xnum = xnum.replace('July', 'Jul');
    xnum = xnum.replace('August', 'Aug');
    xnum = xnum.replace('September', 'Sep');
    xnum = xnum.replace('October', 'Oct');
    xnum = xnum.replace('November', 'Nov');
    xnum = xnum.replace('December', 'Dec');
    return xnum;
}

esgGalrFilterBTN.click(toggle_galrFilter);

function unfilter_gallery() {
    notFoundGalr.hide();
    unmark_gallery();
    esgGalleryImage.show();
    esgGalleryImage.parent().show();
    esgGalleryImage.parent().prev().show();
    esgGalleryImage.parents('.esgGallery-year').show();
    esgGalleryImage.parents('.esgGallery-year').prev().show();
    $('.image-searched').removeClass('show').find('.image-searched-string').html(esgGrlToFilter);
}

var esgGrlToFilter,
    esgGrlFilterFromTool = false;

const esgGallerySearchBar = $('#esgGallerySearchBar');
esgGallerySearchBar.on({
    keypress: function (e) {
        if ((e.keyCode == 13) && esgGallery.length) {
            e.preventDefault();
            esgGrlFilterFromTool = false;
            if (galleryFilter.hasClass('sticking')) {
                galleryFilter.removeClass('sticking');
                esgGalrFilterBG.fadeOut();
            }
        }
    }
});

function filter_gallery(esgGrlToFilter) {
    var possibleFilters = galrFilterClasses.find('> div'),
        possibleFiltersNum = possibleFilters.length + 1,
        activeFilters = possibleFilters.find('button.active'),
        activeFiltersNum = activeFilters.length;
    closeImage();
    unfilter_gallery();
    loading();
    scroll_page_to($('.galleryImageSpace'), 100, 'slow');
    function hide_mt_catg() {
        if (!$(this).find('>:visible').length) {
            $(this).hide();
            $(this).prev().hide();
        }
    }
    if (esgGrlFilterFromTool) {
        if (galleryFilter.hasClass('sticking')) {
            hide_sticking_filter();
        }
        if ($('.galr-year').find('> button.active').length) {
            var galleryYearFilter = $('.galr-year').find('> button.active').text().trim();
        }
        if ($('.galr-month').find('> button.active').length) {
            var galleryMonthFilter = $('.galr-month').find('> button.active').text().trim().toLowerCase();
        }
        if ($('.galr-event').find('> button.active').length) {
            var galleryEventFilter = $('.galr-event').find('> button.active').text().trim();
            galleryEventFilter = galleryEventFilter.replace(/Holy Mass/i, 'Mass');
            galleryEventFilter = galleryEventFilter.replace(/Home visits/i, 'Visits');
            galleryEventFilter = galleryEventFilter.replace(/Studio recording/i, 'Studio');
            galleryEventFilter = galleryEventFilter.replace(/Video shooting/i, 'Video');
            galleryEventFilter = galleryEventFilter.toLowerCase();
        }
        if ($('.galr-dayTime').find('> button.active').length) {
            var galleryDaytFilter = $('.galr-dayTime').find('> button.active').text().trim().toLowerCase();
        }
        esgGrlToFilter = (galleryYearFilter + ' ' + galleryMonthFilter + ' ' + galleryEventFilter + ' ' + galleryDaytFilter).trim().toLowerCase();
        for (let a = 0; a < possibleFiltersNum; a++) {
            esgGrlToFilter = esgGrlToFilter.replace(/undefined/i, '');
        }
    }
    else {
        esgGrlToFilter = esgGallerySearchBar.val().trim().toLowerCase();
    }
    esgGrlToFilter = esgGrlToFilter.replace('recent', (dateStr.getFullYear()));
    $('.image-searched').addClass('show').find('.image-searched-string').html(esgGrlToFilter);
    esgGrlToFilter = esgGrlToFilter.split(' ');
    $.each(esgGalleryImage_img, function () {
        var dis = $(this),
            holder = dis.parent(),
            month = dis.parent().parent(),
            matchNum = 0,
            galrImgName = dis.attr('src');
        galrImgName = galrImgName.replace('../../Pics/events/', '');

        // Getting image's timestamp and event

        var galrImgYear = galrImgName.slice(4, 8),
            galrImgMonth = galrImgName.slice(8, 10),
            galrImgDate = galrImgName.slice(10, 12),
            galrImgHour,
            galrImgDayT,
            galrImgMinute,
            galrImgEvent = dis.next('[evnt]').text().toLowerCase();
        galrImgMonth = galrImgMonth.replace('01', 'January');
        galrImgMonth = galrImgMonth.replace('02', 'February');
        galrImgMonth = galrImgMonth.replace('03', 'March');
        galrImgMonth = galrImgMonth.replace('04', 'April');
        galrImgMonth = galrImgMonth.replace('05', 'May');
        galrImgMonth = galrImgMonth.replace('06', 'June');
        galrImgMonth = galrImgMonth.replace('07', 'July');
        galrImgMonth = galrImgMonth.replace('08', 'August');
        galrImgMonth = galrImgMonth.replace('09', 'September');
        galrImgMonth = galrImgMonth.replace('10', 'October');
        galrImgMonth = galrImgMonth.replace('11', 'November');
        galrImgMonth = galrImgMonth.replace('12', 'December');

        if ((galrImgName.lastIndexOf('.') - galrImgName.lastIndexOf('_')) == 7) {
            galrImgHour = galrImgName.slice(13, 15);
            galrImgMinute = galrImgName.slice(15, 17);
        }
        else if ((galrImgName.lastIndexOf('.') - galrImgName.lastIndexOf('_')) == 6) {
            galrImgHour = galrImgName.slice(13, 14);
            galrImgMinute = galrImgName.slice(14, 16);
        }
        if (galrImgHour > 4 && galrImgHour < 19) {
            galrImgDayT = 'day';
        }
        else {
            galrImgDayT = 'night';
        }
        var disTEXT = ('' + galrImgDate + ' ' + galrImgMonth + ' ' + galrImgYear + ' ' + galrImgDayT + ' ' + galrImgEvent + ' ').toLowerCase();
        function showExactMatches(avb) {
            for (let i = 0; i < avb; i++) {
                if (!(esgGrlToFilter[i] == '') && (disTEXT.indexOf(esgGrlToFilter[i]) > -1)) {
                    matchNum++;
                }
            }
            if (matchNum == activeFiltersNum) {
                mark_gallery(month);
            }
            if (matchNum < activeFiltersNum) {
                holder.hide();
            }
        }
        function showAnyMatch(avb) {
            for (let i = 0; i < avb; i++) {
                if (!(esgGrlToFilter[i] == '') && disTEXT.indexOf(esgGrlToFilter[i]) > -1) {
                    mark_gallery(month);
                    matchNum++;
                }
            }
            if (matchNum == 0) {
                holder.hide();
            }
        }
        if (esgGrlFilterFromTool) {
            if (imgFilterAllMatch.hasClass('active')) {
                showAnyMatch(possibleFiltersNum);
            }
            else {
                showExactMatches(possibleFiltersNum);
            }
        }
        else {
            activeFiltersNum = esgGrlToFilter.length;
            if (imgFilterAllMatch.hasClass('active')) {
                showAnyMatch(activeFiltersNum);
            }
            else {
                showExactMatches(activeFiltersNum);
            }
        }
    });

    // Hidding empty months and years

    $.each($('.galr'), function () {
        if (!$(this).hasClass('filtered')) {
            $(this).hide();
            $(this).prev().hide();
        }
    });
    $.each($('.esgGallery-year'), hide_mt_catg);

    // Suggested actions if no images matches are found

    var visibleImages = $('.esgGallery-year').filter(function () {
        return $(this).is(':visible');
    }).length;
    if (visibleImages < 1) {
        setTimeout(() => {
            notFoundGalr.show();
        }, 3000);
    }
}

// Gallery image descriptions

const weddingsDesc = {
    erasme: 'Some events that took place during the wedding of ESG president "H. Erasme" and his wife "M. Lydie"',
    oreste: 'Some events that took place during the wedding of ESG maestro "N. Oreste" and his wife "U. Pauline"',
    augustin: 'Some events that took place during the wedding of "Augustin" and his wife "S. Sandrine"',
}
const vidsDesc = {
    general: 'Some events that took place while recording our new song',
    yezuNdamira: 'Some events that took place while recording our song: "Yezu Ndamira".',
    mubyeyiMwiza: 'Some events that took place while recording our song: "Mubyeyi Mwiza".',
    nzashimiraUmwungeri: 'Some events that took place while recording our song: "Nzashimira Umwungeri".',
    ishimweNiIryawe: 'Some events that took place while recording our song: "Ishimwe ni iryawe".',
    tunakushukuru: 'Some events that took place while recording our song: "Tunakushukuru".',
    noheliNziza: 'Some events that took place while recording our song: "Noheli Nziza".',
}

// Gallery image descriptions

galrFilterConf.click(function () {
    esgGrlFilterFromTool = true;
    filter_gallery();
    if (galleryFilter.hasClass('sticking')) {
        galleryFilter.removeClass('sticking');
        esgGalrFilterBG.fadeOut();
    }
});

$('.all-galr-matches').click(function () {
    imgFilterAllMatch.addClass('active');
    filter_gallery();
});


// Viewing gallery image full size

const galrImgSideDisplayer = $('.galrImg-sideDisplayer');
function viewImage(im) {
    var dispSpace = galrImgSideDisplayer.find('.galr-img-view_space');
    // ImgDurControler = $('.galrImgName'),
    // currentImgDurCheckerWidth,
    // ImgDurRemains,
    // maxImgDur = 5;

    galrImgSideDisplayer.addClass('working');
    esgGallery.addClass('working');
    dispSpace.find('> img, > video').remove();
    var catgMediaSrc = im.attr('src');
    if (catgMediaSrc.indexOf('?random') > -1) {
        im.clone().attr('src', catgMediaSrc.slice(0, catgMediaSrc.lastIndexOf('?random'))).attr('draggable', 'false').appendTo(dispSpace);
    }
    else {
        im.clone().attr('draggable', 'false').appendTo(dispSpace);
    }
    show_image_info(im);
    $('.galr-img-view_content').scrollTop(0);
    dispSpace.find('> img, > video').dblclick(function (e) {
        e.preventDefault();
        $(this).addClass('clickedDown');
        setTimeout(() => {
            $(this).removeClass('clickedDown');
        }, 250);
        view_full_img_displayer($(this));
    });

    // Pausing image duration loader 

    // dispSpace.find('> img').on({
    //     touchstart: function () {
    //         var maxImgDurWid = $('.galr-img-view_header')[0].clientWidth;
    //         currentImgDurCheckerWidth = ImgDurControler[0].clientWidth;
    //         ImgDurRemains = maxImgDur - ((currentImgDurCheckerWidth / maxImgDurWid) * maxImgDur);
    //         ImgDurControler.css({animation: 'none', width: currentImgDurCheckerWidth});
    //         console.log(maxImgDur - ((currentImgDurCheckerWidth / maxImgDurWid) * maxImgDur));
    //     },
    //     touchend: function () {
    //         ImgDurControler.css({animation: 'width100 '+ImgDurRemains+'s 1 linear'});
    //     },
    //     mousedown: function () {
    //         var maxImgDurWid = $('.galr-img-view_header')[0].clientWidth;
    //         currentImgDurCheckerWidth = ImgDurControler[0].clientWidth;
    //         ImgDurRemains = maxImgDur - ((currentImgDurCheckerWidth / maxImgDurWid) * maxImgDur);
    //         ImgDurControler.css({animation: 'none', width: currentImgDurCheckerWidth});
    //         console.log(maxImgDur - ((currentImgDurCheckerWidth / maxImgDurWid) * maxImgDur));
    //     },
    //     mouseup: function () {
    //         ImgDurControler.css({animation: 'width100 '+ImgDurRemains+'s 1 linear'});
    //     },
    // });
}


$('.galr-img-tools').find('> [title="Expand"]').click(function () {
    view_full_img_displayer($('.galr-img-view_space').find('>img, >video'));
});
$('.galr-img-tools').find('> [title="Info"]').click(function () {
    var toScroll = $('.galr-img-view_content'),
        toScrollTarg = $('.galr-img-info');
    toScroll.scrollTop(winHei * 2);
    toScrollTarg.addClass('bg-myBlue-cons text-appColor-cons scaleDown');
    setTimeout(() => {
        toScrollTarg.removeClass('bg-myBlue-cons text-appColor-cons scaleDown');
    }, 2000);

    // if (toScroll.scrollTop() > (winHei / 3) || (toScroll.height() < ($('.galr-img-view').height()))) {
    //     toScrollTarg.addClass('clickedDown');
    //     setTimeout(() => {
    //         toScrollTarg.removeClass('clickedDown');
    //     }, 250);
    // }
});

function closeImage() {
    galrImgSideDisplayer.removeClass('working');
    esgGallery.removeClass('working');
    $('.galr-img-view_space').find('>video').each(function () {
        this.pause();
    });
}

$('.closeGalrImg').click(function () {
    closeImage();
});

const imageDisplayer = $('.image-displayer'),
    imageController = imageDisplayer.find('.image-img'),
    fullImgSpace = imageController.find('.images-list'),
    galrImgOverview = $('.galrImgOverview'),
    galrImgOverviewSpace = galrImgOverview.find('>.image-pics-grids');

var esgGalrImg = $('.galrImgContent .galr > div');

esgGalrImg.on({
    click: function (e) {
        var theIMG = $(this).find('> img, > video');
        e.preventDefault();
        view_full_img_displayer(theIMG);
        show_image_info(theIMG);
    },
    contextmenu: function (e) {
        var dis = $(this);
        show_custom_menu(e, $('.galr-cont-menu'));
        dis.addClass('selected').siblings().removeClass('selected');
        dis.parents(esgGalleryCatg).siblings().find('> div').removeClass('selected');
    }
});

// Showing image actions
$(document).on({
    click: function (e) {
        var cornerTipTools = $('.corner-tips, .corner-tips-toggler'),
            selImgLen = $('.galr > div.selected').length;
        if (selImgLen > 0) {
            esgGalrImg.removeClass('selected');
        }
        not_targeted(e, cornerTipTools) && $('.corner-tips').removeClass('visible');
    },
    // keydown: function (e) {
    // Ctrl a to select all gallery images
    // if ((e.ctrlKey && e.keyCode == 65) && esgGallery.length && !esgGallerySearchBar.is(':focus')) {
    // e.preventDefault();
    // esgGalrImg.addClass('selected');
    // closeImage();
    // }
    // },
    keypress: function (e) {
        if ((e.keyCode == 13) && esgGallery.length && hidden(imageDisplayer)) {
            filter_gallery();
        }
        // if ((e.keyCode == 73) && visible(imageDisplayer)) {
        if (((e.key == 'i') || (e.key == 'I')) && visible(imageDisplayer)) {
            var nthposit = Math.floor(fullImgSpace.scrollLeft() / $(window).width()) + 1,
                nthImage = fullImgSpace.find('>:nth-child(' + nthposit + ')');
            show_image_info(nthImage);
            imageController.toggleClass('info');
            imageDisplayer.removeClass('withTools');
            (visible(galrImgOverview) && imageController.hasClass('info')) && hide_image_overview();
        }
        // if ((e.keyCode == 80) && visible(imageDisplayer)) {
        if (((e.key == 'p') || (e.key == 'P')) && visible(imageDisplayer)) {
            if (visible(galrImgOverview)) {
                hide_image_overview();
            }
            else {
                show_image_overview();
            }
        }
        if (((e.key == 'h') || (e.key == 'H')) && visible(imageDisplayer)) {
            $('#hintsPopover').popover('toggle');
        }
    },
});

// Not working

// var currentGalrIMG = function () {
//     var nthposit = Math.floor(fullImgSpace.scrollLeft() / $(window).width()) + 2,
//         nthImage = fullImgSpace.find('>:nth-child(' + nthposit + ')');
//     return nthImage;
// }();

/**
 * Displaying images
 */

$('.viewGalrImg').click(function () {
    view_full_img_displayer($('.esgGallery .galr > div.selected > img, .esgGallery .galr > div.selected > video'));
});

$('.viewGalrImgInfo').click(function () {
    viewImage($('.esgGallery .galr > div.selected > img, .esgGallery .galr > div.selected > video'));
});

$('.reloadThisImg').click(function () {
    reload_this_media($('.esgGallery .galr > div.selected > img, .esgGallery .galr > div.selected > video'));
});


function clear_image_displayer_space() {
    fullImgSpace.html('');
}
function clear_image_overview_space() {
    galrImgOverviewSpace.html('');
}

function get_pic_name(x) {
    var charLen = x.length,
        extPosit = x.lastIndexOf('.'),
        extRMLen = (charLen - extPosit) * -1;
    x = x.slice(0, extRMLen);
    x = x.replace('../../Pics/events/', '');
}

// const galleryImages = []

function show_image_info(x) {
    var galrElement = $('.galr > div > img, .galr > div > video'),
        galrImgName = x.attr('src'),
        // get_pic_name
        charLen = galrImgName.length,
        extPosit = galrImgName.lastIndexOf('.'),
        extRMLen = (charLen - extPosit) * -1;
    galrImgName = galrImgName.slice(0, extRMLen);
    galrImgName = galrImgName.replace('../../Pics/events/', '');
    // get pic's date and time
    var galrImgYear = galrImgName.slice(4, 8),
        galrImgMonth = galrImgName.slice(8, 10),
        galrImgDate = galrImgName.slice(10, 12),
        galrImgHour = galrImgName.slice(13, 15),
        galrImgDayT,
        galrImgMinute = galrImgName.slice(15, 17),
        galrImgEvent,
        galrImgEventContent;
    if (x.attr('src').indexOf('?random') > -1) {
        x.attr('src', x.attr('src').slice(0, x.attr('src').lastIndexOf('?random')));
    }
    var galrImgWidth = x[0].naturalWidth,
        galrImgHeight = x[0].naturalHeight,
        // get pic's info holders
        galrImgNameSPC = $('.galr-img-name'),
        galrImgYearSPC = $('.galr-img-yr'),
        galrImgMonthSPC = $('.galr-img-mn'),
        galrImgDateSPC = $('.galr-img-dt'),
        galrImgHourSPC = $('.galr-img-hr'),
        galrImgDayTSPC = $('.galr-img-dyt'),
        galrImgMinuteSPC = $('.galr-img-min'),
        // galrImgEventSPC = $('.galr-img-evnt, .galr-img-dsc'),
        galrImgEventSPC = $('.galr-img-dsc'),
        galrImgWidthSPC = $('.galr-img-wid'),
        galrImgHeightSPC = $('.galr-img-hei');
    // display pic's info
    galrImgMonth = galrImgMonth.replace('01', 'January');
    galrImgMonth = galrImgMonth.replace('02', 'February');
    galrImgMonth = galrImgMonth.replace('03', 'March');
    galrImgMonth = galrImgMonth.replace('04', 'April');
    galrImgMonth = galrImgMonth.replace('05', 'May');
    galrImgMonth = galrImgMonth.replace('06', 'June');
    galrImgMonth = galrImgMonth.replace('07', 'July');
    galrImgMonth = galrImgMonth.replace('08', 'August');
    galrImgMonth = galrImgMonth.replace('09', 'September');
    galrImgMonth = galrImgMonth.replace('10', 'October');
    galrImgMonth = galrImgMonth.replace('11', 'November');
    galrImgMonth = galrImgMonth.replace('12', 'December');
    if (galrImgHour > 12) {
        galrImgHour = galrImgHour - 12;
        galrImgDayT = 'PM';
    }
    else {
        galrImgDayT = 'AM';
    }
    galrImgNameSPC.html(galrImgName);
    galrImgYearSPC.html(galrImgYear);
    galrImgMonthSPC.html(galrImgMonth);
    galrImgDateSPC.html(galrImgDate);
    galrImgHourSPC.html(galrImgHour);
    galrImgDayTSPC.html(galrImgDayT);
    galrImgMinuteSPC.html(galrImgMinute);
    $.each(galrElement, function () {
        var imgIn = $(this),
            imgInSrc = imgIn.attr('src');
        get_pic_name(imgInSrc);
        if (imgInSrc.match(galrImgName)) {
            galrImgEvent = $(this).next('[evnt]').text().toLowerCase();
            var searchSTR = {
                weddingElems: ['wedding', 'gift', 'dress', 'ring'],
                musicElems: ['music', 'video', 'studio'],
                musicMonths: ['September', 'April', 'October', 'November', 'December'],
            }
            if (searchSTR.weddingElems.some(word => galrImgEvent.includes(word)) && galrImgMonth == 'June' && galrImgYear == '2023') {
                galrImgEventContent = weddingsDesc.erasme;
            }
            if (searchSTR.weddingElems.some(word => galrImgEvent.includes(word)) && galrImgMonth == 'July' && galrImgYear == '2022') {
                galrImgEventContent = weddingsDesc.oreste;
            }
            if (searchSTR.weddingElems.some(word => galrImgEvent.includes(word)) && galrImgMonth == 'February' && galrImgYear == '2022') {
                galrImgEventContent = weddingsDesc.augustin;
            }
            if (searchSTR.musicElems.some(word => galrImgEvent.includes(word)) && (searchSTR.musicMonths.indexOf(galrImgMonth) > -1)) {
                galrImgEventContent = vidsDesc.general;
            }
        }
    });
    galrImgEventSPC.html(galrImgEventContent);
    galrImgWidthSPC.html(galrImgWidth);
    galrImgHeightSPC.html(galrImgHeight);
}

function view_full_img_displayer(x) {
    window.history.pushState({ id: 1 }, null, null);
    var activeImage = x.attr('src'),
        allMedia = $('.galr > div:visible > img, .galr > div:visible > video');
    activeImage = activeImage.slice(0, activeImage.lastIndexOf('?random'));
    show_image_displayer();
    $.each(allMedia, function () {
        var imgIn = $(this),
            imgInSrc = imgIn.attr('src');
        if (imgInSrc.match(activeImage)) {
            var currentMedia = $(this),
                catgMedia = currentMedia.parents('.galr').find('> div:visible > img, > div:visible > video'),
                currentMediaNm = currentMedia.attr('src').replace('../../Pics/events/', '');
            currentMediaNm = currentMediaNm.replace('.jpg', '');
            currentMediaNm = currentMediaNm.replace('.png', '');
            currentMediaNm = currentMediaNm.replace('.jpeg', '');
            clear_image_displayer_space();
            $('.galr-img-name').html(currentMediaNm);
            $.each(catgMedia, function () {
                var catgMediaSrc = $(this).attr('src');
                if (catgMediaSrc.indexOf('?random') > -1) {
                    $(this).clone().attr('src', catgMediaSrc.slice(0, catgMediaSrc.lastIndexOf('?random'))).attr('draggable', 'false').appendTo(fullImgSpace);
                    $(this).clone().attr('src', catgMediaSrc.slice(0, catgMediaSrc.lastIndexOf('?random'))).attr('draggable', 'false').appendTo(galrImgOverviewSpace);
                }
                else {
                    $(this).clone().attr('draggable', 'false').appendTo(fullImgSpace);
                    $(this).clone().attr('draggable', 'false').appendTo(galrImgOverviewSpace);
                }
                var viewSequence = fullImgSpace.find('>img,>video');
                $.each(viewSequence, function () {
                    var nm = $(this).attr('src');
                    if (nm.match(activeImage)) {
                        $(this).addClass('inView');
                    }
                });
            });

            // Scrool to the corresponding image

            galrImgOverviewSpace.find('>img,>video').click(function () {
                var imageName = $(this).attr('src'),
                    allMedia = fullImgSpace.find('>img,>video');
                activate($(this));
                $.each(allMedia, function () {
                    if ($(this).attr('src').match(imageName)) {
                        fullImgSpace.removeClass('scroll-smooth');
                        fullImgSpace.animate({ scrollLeft: $(this)[0].offsetLeft }, 1);
                    }
                });
            });
        }
    });
    var offLEFT = fullImgSpace.find('.inView')[0].offsetLeft;
    fullImgSpace.scrollLeft(offLEFT);
}

fullImgSpace.click(function () {
    if (imageController.hasClass('info')) {
        imageController.removeClass('info');
    }
    imageDisplayer.toggleClass('withTools');
});

// Image displayer actions

galrImgOverview.find('[slider]').on('click mouseenter', function (e) {
    var wid = galrImgOverviewSpace.width(),
        offLEFT = galrImgOverviewSpace.scrollLeft(),
        rightScrll = offLEFT + (wid / 2),
        leftScrll = offLEFT - (wid / 2);
    galrImgOverviewSpace.addClass('scroll-smooth');
    if ($('.right-slider').is(e.target)) {
        galrImgOverviewSpace.scrollLeft((rightScrll));
    }
    if ($('.left-slider').is(e.target)) {
        galrImgOverviewSpace.scrollLeft((leftScrll));
    }
});


// galrImgOverview.find('[slider]').on({
//     click: function (e) {
//         var wid = galrImgOverviewSpace.width(),
//             offLEFT = galrImgOverviewSpace.scrollLeft(),
//             rightScrll = offLEFT + (wid / 2),
//             leftScrll = offLEFT - (wid / 2);
//         galrImgOverviewSpace.addClass('scroll-smooth');
//         if ($('.right-slider').is(e.target)) {
//             galrImgOverviewSpace.scrollLeft((rightScrll));
//         }
//         if ($('.left-slider').is(e.target)) {
//             galrImgOverviewSpace.scrollLeft((leftScrll));
//         }
//     },
//     mousemove: function () {
//         if ($('.right-slider').is(e.target)) {
//             galrImgOverviewSpace.scrollLeft((rightScrll));
//         }
//         if ($('.left-slider').is(e.target)) {
//             galrImgOverviewSpace.scrollLeft((leftScrll));
//         }
//         scrolling = true;
//         scrollContent(galrImgOverviewSpace);
//     }, function() {
//         scrolling = false;
//     }
// });

// let scrolling = false;

// galrImgOverview.find('[slider].right-slider').hover(function () {
//     scrolling = true;
//     scrollContent();
// }, function () {
//     scrolling = false;
// });

// function scrollContent() {
//     if (scrolling) {
//         $('.image-pics-grids').animate({scrollLeft: $('.image-pics-grids').scrollLeft() + 3}, 10, scrollContent);
//     }
// }


var galrNthImage = 0,
    imgInfoY1,
    imgInfoY2,
    newOffLeft;

fullImgSpace.on({
    scroll: function () {
        var dis = $(this);
        if (dis.find('>img,>video').length > 0) {
            galrNthImage = Math.floor((fullImgSpace.scrollLeft() / fullImgSpace.width()) + 0.5);
            var TheImage = dis.find('>:nth(' + galrNthImage + ')'),
                imageName = TheImage.attr('src'),
                // to remove file extension
                charLen = imageName.length,
                extPosit = imageName.lastIndexOf('.'),
                extRMLen = (charLen - extPosit) * -1;
            imageName = imageName.slice(0, extRMLen);
            imageName = imageName.replace('../../Pics/events/', '');
            // update_pic_info;
            show_image_info(TheImage);
            dis.find('>video').each(function () {
                this.pause();
            });
        }
    },
    mousemove: function (e) {
        var y1 = e.clientY,
            y2 = $(window).height() - e.clientY;
        if (y1 < 20) {
            imageDisplayer.addClass('withOpts');
        }
        else if ((y2 < 20)) {
            imageDisplayer.addClass('withBottomTools');
        }
        else {
            imageDisplayer.removeClass('withOpts withBottomTools');
        }
    },

    // Show image info

    touchstart: function (e) {
        bodi.addClass('overf-hide');
        imgInfoY1 = e.originalEvent.touches[0].clientY;
    },
    touchmove: function (e) {
        imgInfoY2 = e.originalEvent.touches[0].clientY;
        var diffY = imgInfoY2 - imgInfoY1;
        if (diffY < -90) {
            var nthposit = Math.floor(fullImgSpace.scrollLeft() / $(window).width()) + 1,
                nthImage = fullImgSpace.find('>:nth-child(' + nthposit + ')');
            show_image_info(nthImage);
            imageController.addClass('info');
            imageDisplayer.removeClass('withTools');
            visible(galrImgOverview) && hide_image_overview();
        }
        if (diffY > 90) {
            imageController.removeClass('info');
        }
    },
    touchend: function () {
        bodi.removeClass('overf-hide');
    },

    // Controll arrow keys slide

    // keydown: function (e) {
    //     if ((e.key == 'ArrowLeft') || (e.key == 'ArrowLeft')) {
    //         fullImgSpace.removeClass('scroll-smooth');
    //     }
    // }
});

imageDisplayer.find('[slider]').click(function (e) {
    var wid = fullImgSpace.width(),
        offLEFT = fullImgSpace.scrollLeft(),
        rightScrll = offLEFT + wid,
        leftScrll = offLEFT - wid;
    imageDisplayer.removeClass('withTools');
    if ($('.right-slider').is(e.target)) {
        fullImgSpace.scrollLeft((rightScrll));
    }
    if ($('.left-slider').is(e.target)) {
        fullImgSpace.scrollLeft((leftScrll));
    }
});

imageDisplayer.find('.image-tools button').click(function () {
    imageDisplayer.removeClass('withTools');
});

// function swipeup(e) {

// }

imageDisplayer.find('.image-tools .galrImgInfo').click(function () {
    imageController.toggleClass('info');
    var nthposit = Math.floor(fullImgSpace.scrollLeft() / $(window).width()) + 1,
        nthImage = fullImgSpace.find('>:nth-child(' + nthposit + ')');
    show_image_info(nthImage);
    (visible(galrImgOverview) && imageController.hasClass('info')) && hide_image_overview();
});


// Slide show images

var imgSlideShow;
const galrSlidesShower = $('.galrSlidesShower');

function stop_gallery_img_slide_show() {
    clearInterval(imgSlideShow);
    galrSlidesShower.removeClass('bg-primary text-light rad-5 my-1');
};

function gallery_img_slide_show() {
    var imgLen = fullImgSpace.find('>img,>video').length;
    fullImgSpace.addClass('scroll-smooth');
    imgSlideShow = setInterval(() => {
        var offLEFT = fullImgSpace.scrollLeft(),
            wid = fullImgSpace.width(),
            leftScrll = offLEFT + wid;
        if (galrNthImage < imgLen) {
            fullImgSpace.animate({ scrollLeft: leftScrll });
        }
    }, 5000);
    galrSlidesShower.addClass('bg-primary text-light rad-5 my-1');
    galrSlidesShower.one('click', stop_img_slide_show);
}

function stop_img_slide_show() {
    stop_gallery_img_slide_show();
    galrSlidesShower.one('click', gallery_img_slide_show);
};

galrSlidesShower.one('click', gallery_img_slide_show);

const esgGalrFilterBG = $('.esgGalrFilterBG');
esgGalrFilterBG.click(toggle_galrFilter);

/**
 * Rotating images
 */

$('.galrImgRotater').click(function (e) {
    var nthposit = Math.floor(fullImgSpace.scrollLeft() / $(window).width()) + 1,
        imgToRotate = fullImgSpace.find('>:nth-child(' + nthposit + ')'),
        crntDeg = imgToRotate.css('rotate');
    if (crntDeg == 'none') {
        crntDeg = '0deg'
    }
    var degNumber = Number(crntDeg.slice(0, -3));
    degNumber = Math.round(degNumber / 90) * 90;
    if ($('.rotateImgL').is(e.target)) {
        degNumber -= 90;
    }
    else if ($('.rotateImgR').is(e.target)) {
        degNumber += 90;
    }
    imgToRotate.css({ rotate: degNumber + 'deg' });
    if (!((degNumber / 90) % 2) == 0) {
        imgToRotate.addClass('sided');
    }
    else {
        imgToRotate.removeClass('sided');
    }
});

/**
 * Displaying images function
 */

function show_image_displayer() {
    imageDisplayer.closest('.fix-holder').show();
}

function show_image_overview() {
    galrImgOverview.addClass('view');
    var nthposit = Math.floor(fullImgSpace.scrollLeft() / $(window).width()) + 1,
        nthImage = fullImgSpace.find('>:nth-child(' + nthposit + ')'),
        imageName = nthImage.attr('src').slice(0, nthImage.attr('src').lastIndexOf('?random')),
        centeringDistance = galrImgOverviewSpace.width() / 2,
        allMedia = galrImgOverviewSpace.find('>img,>video');
    $.each(allMedia, function () {
        if ($(this).attr('src').slice(0, $(this).attr('src').lastIndexOf('?random')).match(imageName)) {
            activate($(this));
            galrImgOverviewSpace.removeClass('scroll-smooth');
            galrImgOverviewSpace.animate({ scrollLeft: $(this)[0].offsetLeft - centeringDistance }, 1);
        }
    });

    // let scrolling = false;

    // galrImgOverview.find('[slider].right-slider').hover(function () {
    //     scrolling = true;
    //     scrollContent();
    // }, function () {
    //     scrolling = false;
    // });

    // function scrollContent() {
    //     if (scrolling) {
    //         $('.image-pics-grids').animate({scrollLeft: $('.image-pics-grids').scrollLeft() + 3}, 10, scrollContent);
    //         console.log($('.image-pics-grids').scrollLeft() + 3);
    //     }
    // }
}

function hide_image_displayer() {
    stop_gallery_img_slide_show();
    imageDisplayer.closest('.fix-holder').fadeOut('fast');
    fullImgSpace.removeClass('scroll-smooth');
    imageController.removeClass('info');
}

function hide_image_overview() {
    galrImgOverview.addClass('flyOutB');
    setTimeout(() => {
        galrImgOverview.removeClass('flyOutB');
        galrImgOverview.removeClass('view');
    }, 400);
}

function close_full_img_displayer() {
    hide_image_displayer();
    clear_image_displayer_space();
    hide_image_overview();
    clear_image_overview_space();
    imageDisplayer.removeClass('withTools withOpts withBottomTools');
    if ($(window).width() < 768) {
        closeImage();
    }
    bodi.removeClass('overf-hide');
}

function reload_all_media() {
    $.each(esgGalleryImage_img, function () {
        var dis = $(this),
            theSource = dis.attr('src');
        if (theSource.indexOf('?random') > -1) {
            theSource = theSource.slice(0, (theSource.lastIndexOf('?random')));
        }
        var newSource = theSource + '?random=' + new Date().getTime();
        dis.attr('src', newSource);
    });
    refreshImgMvnt();
}

function reload_this_media(im) {
    var theSource = im.attr('src');
    if (theSource.indexOf('?random') > -1) {
        theSource = theSource.slice(0, (theSource.lastIndexOf('?random')));
    }
    var newSource = theSource + '?random=' + new Date().getTime();
    im.attr('src', newSource);
    im.parent().addClass('refreshing');
    setTimeout(() => {
        im.parent().removeClass('refreshing');
    }, 2000);
}

/**
 * Animating mouse gradient over websettings
 */

webSettings.on({
    mousemove: function (e) {
        var move = $(this),
            click_shower = move.find('> .touch-anim'),
            shower_top = e.clientY - (move.offset().top - scrollY),
            shower_left = e.clientX - (move.offset().left);
        // var top_cent = ((shower_top * 100) / move.height());
        click_shower.addClass('move');
        click_shower.css({ left: shower_left, top: shower_top, boxShadow: '0px 0px 50px 5rem var(--white3_cons' });
    },
    mouseleave: function () {
        var move = $(this),
            click_shower = move.find('> .touch-anim');
        click_shower.removeClass('move').css({ boxShadow: '' });
    }
});

/**
 * Focus on web grid items by keyboard
 */

$('[tabindex="0"]').on({
    keyup: function (e) {
        if (e.which == 13) {
            $(this).click();
        }
    }
});

/**
 * Showing web guide parts
 */

var appendedGuide;
$('.webSetPG').on({
    scroll: function () {
        var offLEFT = $(this).scrollLeft(),
            tisWid = $(this).width(),
            appendOpacity = offLEFT / tisWid;
        $('.webSetPG2').css({ opacity: appendOpacity });
        if (offLEFT == 0) {
            $(this).addClass('overf-x-hide');
            $('.appendedGuide').remove();
        }
        else {
            $(this).removeClass('overf-x-hide');
        }
    },
    touchstart: function () {
        var offLEFT = $(this).scrollLeft();
        if (offLEFT == 0) {
            $(this).addClass('overf-x-hide');
            $('.appendedGuide').remove();
        }
        else {
            $(this).removeClass('overf-x-hide');
        }
    },
    mousescroll: function () {
        var offLEFT = $(this).scrollLeft();
        if (offLEFT == 0) {
            $(this).addClass('overf-x-hide');
            $('.appendedGuide').remove();
        }
        else {
            $(this).removeClass('overf-x-hide');
        }
    }
});

$('.webSetGrid .guider > span:not(:last-child)').click(function (e) {
    var webSetPG = $('.webSetPG'),
        webSetPG2 = $('.webSetPG2'),
        nthGuide;
    webSetPG.removeClass('overf-x-hide');
    $('.appendedGuide').remove();
    if ($('[title="Theme"]').is(e.target)) {
        nthGuide = 2;
    }
    if ($('[title="Animations"]').is(e.target)) {
        nthGuide = 3;
    }
    if ($('[title="Tips"]').is(e.target)) {
        nthGuide = 4;
    }
    appendedGuide = $('.webGuide > div:nth-of-type(' + nthGuide + ')').clone();
    appendedGuide.addClass('appendedGuide').appendTo(webSetPG2);
    webSetPG.scrollLeft($(webSetPG2)[0].offsetLeft);
});

$('.partGuideCloser').click(function () {
    scroll_left($('.webSetPG'));
});

/**
 * Sharing the current page
 */

$('.sharePage-button').click(function (e) {
    e.preventDefault();
    navigator.clipboard.writeText('Hello friend !!\nYou can visit ESG website too. I found this interesting !!\n\n' + window.location.href).then(() => { });
    navigator.share({
        title: document.title,
        text: 'You can visit ESG website too. I found this interesting !!\n',
        url: window.location.href
    }).then(() => console.log('Successful share')).catch(error => alert('Error sharing:', error));
});

/**
 * Show person from person profile pics and adjust the view
 */

function adjustPProfile(x) {
    var winWidth = $(window).width(),
        docToTop = $(document).scrollTop(),
        profileOffset = x.offset().top,
        distance = profileOffset - docToTop,
        mindistance = $(window).height() * 0.2;
    if (winWidth < 576 && distance > mindistance) {
        scroll_page_to(x);
    }
}
function show_persons_all() {
    $('.allPersons').show();
}
function hide_persons_info() {
    $('.allP').hide();
}
function hide_persons_all() {
    $('.allPersons').hide();
}
function close_singer() {
    hide_persons_all();
    hide_persons_info();
    $('.allP').css({ transform: 'translateX(0)' });
}

/**
 * ALL members about
 */

// $('.PerProfile').click(hide_persons_info);
// $('.PerProfile').click(function () {
//     var to_animate = $('#TenBass');
//     var heightNow = to_animate.outerHeight();
//     const realHeight = to_animate.outerHeight();
//     to_animate.addClass('overf-hide');

//     if (to_animate.height() == 0) {
//         to_animate.css({height: realHeight});
//     }
//     else {
//         to_animate.css({height: '0'});
//         to_animate.addClass('h-0');
//     }
//     console.log('Height: ' + to_animate.height() + '\n\nReal height: ' + realHeight);
//     to_animate.toggleClass('h-0 overf-hide');
// });

$('*.MembersT > tbody > tr > td[id]').dblclick(function () {
    hide_persons_info();
    show_persons_all();
    var person_name = $(this).attr('id').slice(0, -1),
        nameAbout = '' + person_name + 'About';
    $('.' + nameAbout).fadeIn(300);
});
$('.PerProfile').click(function () {
    hide_persons_info();
    show_persons_all();
    adjustPProfile($(this).parent());
    var person_name = $(this).attr('id'),
        nameAbout = '' + person_name + 'About';
    $('.' + nameAbout).fadeIn(300);
});

/**
 * Show more about a person
 */

// function ZoomMorePRSNpic(e) {
//     var ClickedX = e.offsetX,
//         ClickedY = e.offsetY;
//     $(this).css({transform : "scale(1.6)" , transformOrigin: " "+ClickedX+"px "+ ClickedY+"px"});
//     $(this).one("dblclick", ShrinkMorePRSNpic);
// }

// function ShrinkMorePRSNpic() {
//     $(this).css({transform : "scale(1)"});
//     $(this).one("dblclick", ZoomMorePRSNpic);
// }

// $('.MorePersonPic img').one("dblclick", ZoomMorePRSNpic);

$('*#PersonClose').click(function () {
    $(this).parent().parent().slideUp();
    hide_persons_all();
});

/**
 * Show a person peek on touch
 */

var personFloat,
    personToShow = $('*.MembersT > tbody > tr td:not(:empty)'),
    timeOutDuration;
personToShow.on({
    touchstart: function (e) {
        $('.perShower').remove();
        var person = e.target;
        person = $(this);
        var Id = person.attr('id'),
            realId = Id.slice(0, -1),
            corresPeronHolder = $('.PerProfileHolder'),
            corresPeron = corresPeronHolder.find('.PerProfile#' + realId),
            peek = corresPeron.clone();
        clearTimeout(timeOutDuration);
        timeOutDuration = setTimeout(() => {
            peek.insertBefore('#Members > p:nth-child(1)').addClass('emphasizeCorres perShower');
        }, 3000);
    },
    touchend: function () {
        clearTimeout(timeOutDuration);
        $('.perShower').remove();
    }
});

/**
 * Toggle between committee members
 */

$('#ComMSelector > div').click(function () {
    var comHolderTop = $('#ComHolder').offset().top,
        winScrl = $(document).scrollTop(),
        dis = $(this),
        inx = get_last_class(dis).slice(-1);
    if (inx < 7) {
        $('.CM' + inx).fadeIn();
        $('.CM' + inx).siblings().hide();
    }
    if (inx == 7) {
        $('.CM7').fadeIn();
        for (let i = 0; i < 6; i++) {
            $('.CM' + (i + 1)).hide();
        }
    }
    dis.addClass("view");
    dis.siblings().removeClass("view");
    if ((winScrl > comHolderTop) || (comHolderTop > (winScrl + ($(window).height() * 0.6)))) {
        scroll_page_to($('#ComHolder'));
    }
});

$('*#ComM img').on({
    mouseenter: function () {
        $(this).parents('#ComM').addClass('view');
    },
    mouseleave: function () {
        $(this).parents('#ComM').removeClass('view');
    }
});

//  **index**
//  **Songs**

$('#sharePage.ESG_def').find('button').click(function (e) {
    e.preventDefault();
    navigator.clipboard.writeText('Hello friend !!\nEnjoy with me the wonderful songs of Eastern Singers Group.\n\n' + window.location.href).then(() => { });
    navigator.share({
        title: document.title,
        text: "Hello friend !!\nEnjoy with me the wonderful songs of Eastern Singers Group.\n\n",
        url: window.location.href
    }).then(() => console.log('Successful share')).catch(error => alert('Error sharing:', error));
    // Notify action
    notify_link_copied();
});

$('#sharePage.Song_def').find('button').click(function (e) {
    e.preventDefault();
    navigator.clipboard.writeText('Hello friend !!\nNow we can find solfeggio songs for Catholic Church and more related documents from this website:\n\n' + window.location.href + '\n\nSing and praise the Lord our God.').then(() => { });
    navigator.share({
        title: document.title,
        text: "Hello friend !!\nNow we can find solfeggio songs for Catholic Church and more related documents from this website:",
        url: window.location.href
    }).then(() => console.log('Successful share')).catch(error => alert('Error sharing:', error));
    // Notify action
    notify_link_copied();
});

// Another example

// $('iframe').load(function(){
//     $(this).contents().find("body").on('click', function(event) { alert('test'); });
// });

/**
* Positioning a playing video on top or bottom
*/

$('.PositADJ').click(function () {
    var to_move = $(this).parent();
    if (!to_move.hasClass('bottom')) {
        to_move.addClass('bottom');
        $('.uTubeCloser').addClass('top');
    }
    else {
        to_move.removeClass('bottom');
        $('.uTubeCloser').removeClass('top');
    }
});

/**
 * Reposition an element by touchmove vertically
 */

var y_cord,
    y_cord_then,
    y_move_diff,
    reached_POSIT,
    moving_object,
    obj_Height,
    obj_MidHeight;
inCenter = winHei / 2;
var touch_time1,
    touch_time2,
    top_POSITIONED = false,
    bottom_POSITIONED = false;

$('.scrollTest').on({
    touchstart: function (e) {
        moving_object = $(this);
        obj_Height = moving_object.outerHeight();
        obj_MidHeight = obj_Height / 2;
        y_cord = e.originalEvent.touches[0].clientY;

        touch_time1 = new Date().getTime();

        $('body').addClass('overf-hide');
        moving_object.addClass('trans-0');
        if (moving_object.position().top <= 25) {
            top_POSITIONED = true;
            bottom_POSITIONED = false;
        }
        else if (moving_object.position().top - (winHei - obj_Height) < 25) {
            top_POSITIONED = false;
            bottom_POSITIONED = true;
        }
    },
    touchmove: function (e) {
        y_cord_then = e.originalEvent.touches[0].clientY;
        y_move_diff = Math.abs(y_cord_then - y_cord);
        reached_POSIT = ((moving_object.offset().top - scrollY) + obj_MidHeight) > inCenter;

        if ((y_cord_then > y_cord) && (y_move_diff > 5) && top_POSITIONED) {
            moving_object.css({ top: y_move_diff });
        }
        if ((y_cord_then < y_cord) && (y_move_diff > 5) && bottom_POSITIONED) {
            var opp_side_move = winHei - y_move_diff - obj_Height;
            moving_object.css({ top: opp_side_move });
        }
        // if ((y_cord_then > y_cord) && (y_move_diff > 5) && top_POSITIONED) {
        //     var opp_side_move = winHei - ((moving_object.offset().top - scrollY) + obj_Height);
        //     moving_object.css({top: y_move_diff, bottom: opp_side_move});
        // }
        // if ((y_cord_then < y_cord) && (y_move_diff > 5) && bottom_POSITIONED) {
        //     var opp_side_move = winHei - y_move_diff - obj_Height;
        //     moving_object.css({bottom: y_move_diff, top: opp_side_move});
        // }
    },
    touchend: function () {
        touch_time2 = new Date().getTime();
        var touch_time_diff = touch_time2 - touch_time1;
        $('body').removeClass('overf-hide');
        moving_object.removeClass('trans-0');
        if ((y_move_diff > 100)) {
            if ((y_cord_then > y_cord) && ((touch_time_diff < 300) || reached_POSIT)) {
                moving_object.css({ top: (winHei - obj_Height) });
            }
            else {
                moving_object.css({ top: '0' });
            }
            if ((y_cord_then < y_cord) && ((touch_time_diff < 300) || !reached_POSIT)) {
                moving_object.css({ top: '0' });
            }
            else {
                moving_object.css({ top: (winHei - obj_Height) });
            }
        }
        else {
            if (top_POSITIONED) {
                moving_object.css({ top: '0', bottom: 'auto' });
            }
            if (bottom_POSITIONED) {
                moving_object.css({ top: (winHei - obj_Height), bottom: '0' });
            }
        }
        touch_time1 = undefined;
        touch_time2 = undefined;
        touch_time_diff = undefined;
        y_cord = undefined;
        y_cord_then = undefined;
        y_move_diff = undefined;
    }
});

/**
 * Change drop menu indicator
 */

function drop_angle(x) {
    if (x.hasClass('fa-angle-down')) {
        x.removeClass('fa-angle-down').addClass('fa-angle-up');
    } else if (x.hasClass('fa-angle-up')) {
        x.removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    if (x.hasClass('fa-angle-left')) {
        x.removeClass('fa-angle-left').addClass('fa-angle-right');
    } else if (x.hasClass('fa-angle-right')) {
        x.removeClass('fa-angle-right').addClass('fa-angle-left');
    }
}

$('.dropAngle').click(function () {
    drop_angle($(this).find('.drop-indicator'));
});

// webNotifications.on('shown.bs.collapse', function () {
//     $('.Updates_all').slideDown('slow','swing', function () {
//         $('.Updates_Elem > div').css({animation: 'emphDIV 1s 1'});
//     });
//     $('.Notif_separator').show();   
// });

$('.Notif_Elem > button.Notif_XPND').click(function () {
    let dis = $(this);
    dis.toggleClass('UPP');
    dis.parent().toggleClass('Xpanded');
    drop_angle(dis);
});

$('.Notif_Elem > p:first-of-type').click(function () {
    $(this).parents('.Notif_Elem').find('button.Notif_XPND')[0].click();
});
$('.Notif_Elem > p:last-child > a').click(function () {
    hide_Notif();
});

var notif_Touched,
    notif_Y1,
    notif_Y_diff,
    notif_Can_Expand = false,
    notif_Can_Collapse = false,
    notif_Contet;

$('.Notif_Elem-uploads, .Notif_Elem-tips').on({
    touchstart: function (e) {
        notif_Touched = $(this);
        notif_Contet = notif_Touched.find('ul, > p:last-of-type');
        if (!notif_Touched.hasClass('Xpanded')) {
            notif_Can_Expand = true;
            notif_Y1 = e.originalEvent.touches[0].clientY;
        }
        else {
            notif_Can_Expand = false;
        }
    },
    touchmove: function (e) {
        if (notif_Can_Expand) {
            var notif_Y2 = e.originalEvent.touches[0].clientY;
            notif_Y_diff = notif_Y2 - notif_Y1;
            notif_Touched.addClass('trans-0');
            if (notif_Y2 > notif_Y1 && (notif_Y_diff >= 5)) {
                var new_Hei = collapsed_Hei + notif_Y_diff;
                notif_Touched.height(new_Hei);
                notif_Contet.addClass('d-block');
                notif_Contet.css({ opacity: (notif_Y_diff / 80) });
                if (notif_Y_diff >= 80) {
                    notif_Can_Collapse = true;
                }
                else {
                    notif_Can_Collapse = false;
                }
                // if (notif_Y_diff >= 100) {
                //     notif_Touched.height(collapsed_Hei + 100);
                // }
            }
        }
    },
    touchend: function () {
        notif_Touched.removeClass('trans-0');
        notif_Contet.removeClass('d-block').css({ opacity: '1' });
        if (notif_Can_Collapse) {
            notif_Touched.css({ height: '' });
            notif_Touched.find('> .Notif_XPND').click();
        }
        // else {
        //     notif_Touched.css({ height: '20%' });
        // }
        notif_Touched = undefined;
        notif_Y1 = undefined;
        notif_Y_diff = undefined;
        collapsed_Hei = undefined;
        notif_Can_Expand = undefined;
        notif_Can_Collapse = undefined;
        notif_Contet = undefined;
    }
});

function notif_left() {
    scroll_left($('.Notifs_wrapper'));
};
function notif_right() {
    $('.Notifs_wrapper').scrollLeft($('.Notifs_wrapper').find('.Notifs_2')[0].offsetLeft);
};
function notif_home() {
    $('.Notifs_wrapper').animate({ scrollLeft: 0 }, 1000);
};

$('.Notifs_sider > div:first-of-type span').click(notif_left);
$('.Notifs_sider > div:last-of-type span').click(notif_right);

function show_notifications() {
    webNotifications.collapse('show');
}
function hide_Notif() {
    webNotifications.collapse('hide');
    $('.Notif_Elem > span.fa-angle-up').trigger('click');
    // $('.Updates_all').slideUp();
    notif_left();
}

$('.Notif_Closer').click(hide_Notif);

/**
 * Close notifications by swipe up
 */

var y_cord,
    notifs = webNotifications,
    can_close;

$('#Notifications').on({
    click: function (e) {
        if ($(this).is(e.target) && !$(this).has(e.target).length) {
            hide_Notif();
        }
    },
    touchstart: function (e) {
        if ($(this).is(e.target) && !$(this).has(e.target).length) {
            can_close = true;
            $('body').addClass('overf-hide');
            y_cord = e.originalEvent.touches[0].clientY;
        }
        else {
            can_close = false;
        }
    },
    touchmove: function (e) {
        if (can_close) {
            var y_cord_then = e.touches[0].clientY,
                y_move_diff = Math.abs(y_cord_then - y_cord);
            if ((y_cord_then < y_cord) && ((y_cord_then + 10) < y_cord)) {
                notifs.css({ bottom: y_move_diff });
            }
        }
    },
    touchend: function () {
        $('body').removeClass('overf-hide');
        var min_obj_Hei = winHei * (8.5 / 10);

        if (notifs.height() < min_obj_Hei) {
            hide_Notif();
            setTimeout(() => {
                notifs.css({ bottom: '0' });
            }, 700);
        }
        else {
            notifs.css({ bottom: '0' });
        }
    }
});


/**
 * Show or hide songs to top by scroll
*/

// Song category searcher tools
sCATposit1 = sCatWrapper.scrollTop();
sCatWrapper.on({
    scroll: function () {
        let maxScroll = $(window).height() * 1.5,
            scrolledHei = $(this).scrollTop(),
            inCATsongs = $('.inCAT div.SongElement').length,
            toTop = $('.SongsToTop'),
            sCATtools = $('.ScatTools');
        if (scrolledHei > maxScroll) {
            if (($(window).width() < 768) && (inCATsongs > 60)) {
                remove_d_none(toTop);
            }
            else if (inCATsongs > 70) {
                remove_d_none(toTop);
            }
        }
        else {
            add_d_none(toTop);
        }
        if (scrolledHei > (sCATposit1 + 30)) {
            sCATtools.addClass('away');
        }
        else if (scrolledHei < sCATposit1) {
            sCATtools.removeClass('away');
        }
        sCATposit1 = scrolledHei;
    },
    mousemove: function (e) {
        let = mouseYPoisition = e.clientY;
        if (mouseYPoisition <= 40) {
            var tool = $('.ScatTools');
            if (tool.hasClass('away')) {
                tool.removeClass('away');
            }
        }
    },
});

/**
 * Append classeur
 */

function append_not_found_svg(ELEM) {
    $('.not-found-svg-container').remove();
    ELEM.append('<div class="position-absolute inset-0 w-10rem mx-auto not-found-svg-container">\
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"\
        width="1920.000000pt" height="1920.000000pt" viewBox="0 0 1920.000000 1920.000000"\
        preserveAspectRatio="xMidYMid meet" class="w-100 h-auto">\
       <metadata>\
           Created by potrace 1.16, written by Peter Selinger 2001-2019\
       </metadata>\
       <g transform="translate(0.000000,1920.000000) scale(0.100000,-0.100000)"\
          fill="var(--black2)" stroke="none">\
          <path d="M10368 15810 c-110 -56 -202 -108 -208 -119 -8 -16 9 -57 95 -230 95\
          -191 107 -211 130 -211 33 0 424 196 432 217 6 16 -178 401 -205 429 -7 8 -21\
          14 -30 13 -9 0 -106 -45 -214 -99z m272 -150 c38 -77 70 -146 70 -153 0 -7\
          -46 -35 -102 -62 -57 -26 -124 -59 -150 -72 l-48 -23 -75 150 c-41 82 -75 152\
          -75 155 0 8 281 144 297 145 7 0 44 -63 83 -140z"/>\
          <path d="M8235 14064 c-377 -32 -721 -107 -1051 -230 -746 -278 -1351 -748\
          -1814 -1409 -331 -472 -561 -1074 -635 -1656 -19 -151 -20 -155 -40 -139 -8 7\
          -26 10 -40 6 -37 -9 -33 -48 11 -100 l36 -43 3 -244 c3 -258 14 -398 46 -594\
          112 -674 401 -1302 840 -1830 103 -124 311 -333 444 -446 557 -474 1221 -772\
          1950 -873 679 -95 1407 4 2025 276 182 80 370 179 517 272 68 43 127 75 132\
          72 8 -5 361 -422 430 -509 l25 -30 -30 -24 c-70 -58 -122 -114 -138 -147 -49\
          -104 -36 -211 39 -308 24 -31 127 -155 227 -275 101 -120 267 -317 368 -438\
          198 -236 498 -594 1019 -1214 676 -805 647 -774 768 -835 149 -74 343 -73 497\
          3 51 25 389 294 467 370 73 74 122 161 150 268 23 91 24 163 4 258 -20 95 -62\
          174 -146 275 -92 110 -492 588 -833 994 -305 363 -469 558 -807 961 -622 742\
          -579 695 -665 721 -101 30 -178 10 -283 -76 -41 -33 -75 -60 -76 -60 -2 0 -43\
          48 -92 108 -49 59 -151 180 -226 269 -75 90 -137 167 -137 171 0 4 16 24 36\
          43 44 41 223 251 285 334 25 33 78 108 117 167 244 364 416 751 527 1183 22\
          88 42 145 53 153 137 102 173 147 140 180 -19 19 -37 14 -80 -19 -21 -17 -41\
          -29 -44 -26 -3 3 1 50 10 104 29 187 39 370 33 643 -4 150 -13 313 -21 375\
          -101 722 -369 1351 -810 1905 -127 159 -425 457 -582 582 -279 223 -561 393\
          -864 523 -499 213 -922 302 -1465 309 -148 2 -292 2 -320 0z m686 -124 c769\
          -101 1395 -372 1964 -849 122 -103 363 -345 458 -461 454 -556 733 -1197 823\
          -1890 22 -167 30 -621 15 -788 -109 -1182 -743 -2207 -1750 -2830 -136 -84\
          -424 -227 -571 -285 -298 -116 -630 -199 -955 -237 -49 -6 -187 -14 -306 -17\
          -1206 -33 -2349 524 -3064 1492 -655 887 -878 2002 -615 3080 144 593 451\
          1168 856 1605 28 30 64 69 80 87 102 111 323 300 504 430 570 411 1260 649\
          1966 681 169 8 470 -1 595 -18z m2305 -6519 c293 -348 354 -423 353 -434 0 -7\
          -86 -83 -190 -169 l-189 -158 -33 38 c-18 20 -55 64 -82 96 -28 33 -114 136\
          -192 230 -79 94 -143 173 -143 176 1 3 51 44 113 92 62 48 146 119 187 157 41\
          39 80 69 86 68 6 -1 46 -44 90 -96z m816 -353 c15 -10 62 -60 105 -111 109\
          -129 615 -731 879 -1047 586 -699 745 -888 997 -1188 298 -352 339 -414 357\
          -534 19 -124 -21 -262 -103 -360 -45 -53 -382 -333 -443 -368 -146 -85 -334\
          -76 -481 23 -30 20 -111 107 -211 227 -90 107 -228 272 -306 365 -79 94 -232\
          276 -340 405 -109 129 -288 343 -399 475 -111 132 -239 285 -286 340 -84 100\
          -282 336 -594 709 -93 111 -173 211 -178 224 -15 37 -10 105 9 139 17 31 69\
          77 537 467 138 115 258 216 267 224 50 42 137 47 190 10z"/>\
          <path d="M8190 13324 c-327 -33 -601 -105 -904 -235 -355 -152 -659 -359 -945\
          -642 -468 -464 -766 -1041 -870 -1687 -36 -226 -47 -603 -22 -820 56 -500 226\
          -965 504 -1380 195 -292 489 -593 778 -798 311 -220 662 -379 1043 -473 426\
          -104 881 -116 1311 -33 153 30 398 100 528 150 230 90 504 241 704 390 719\
          532 1152 1299 1244 2199 15 149 6 549 -15 690 -100 658 -369 1220 -812 1692\
          -423 452 -989 770 -1594 896 -302 63 -645 82 -950 51z m555 -104 c555 -51\
          1044 -231 1486 -547 439 -313 804 -773 1002 -1263 173 -428 237 -775 224\
          -1230 -13 -441 -109 -830 -302 -1223 -50 -102 -59 -113 -95 -129 -31 -13 -40\
          -22 -40 -40 0 -13 5 -29 10 -34 14 -14 -97 -182 -227 -344 -465 -577 -1131\
          -959 -1866 -1071 -171 -26 -504 -36 -687 -20 -596 53 -1135 270 -1617 653 -96\
          76 -337 316 -419 418 -187 230 -337 481 -444 740 -86 209 -182 540 -179 612 1\
          13 3 16 5 8 4 -13 223 -162 258 -176 7 -3 23 4 36 14 19 16 22 24 15 40 -14\
          30 -284 205 -306 199 -22 -6 -25 2 -38 118 -57 509 23 1035 229 1511 200 461\
          525 874 925 1173 208 156 361 246 593 351 277 124 650 219 962 243 103 8 373\
          6 475 -3z"/>\
          <path d="M8610 11911 c-76 -7 -90 -14 -90 -45 0 -13 6 -28 13 -33 15 -11 347\
          -11 365 0 18 12 15 55 -5 66 -24 12 -203 20 -283 12z"/>\
          <path d="M8171 11805 c-93 -38 -202 -97 -220 -119 -19 -23 -10 -60 17 -64 12\
          -2 74 22 140 53 64 31 133 64 152 73 28 14 35 23 35 46 0 47 -30 49 -124 11z"/>\
          <path d="M9137 11823 c-4 -3 -7 -19 -7 -34 0 -25 9 -32 93 -72 51 -24 119 -60\
          150 -80 62 -40 76 -44 95 -25 41 41 -5 85 -171 169 -91 45 -144 59 -160 42z"/>\
          <path d="M7653 11453 c-54 -55 -173 -199 -173 -209 0 -19 24 -44 43 -44 28 0\
          34 5 81 64 22 26 70 81 108 122 37 41 68 76 68 80 0 3 -5 14 -10 25 -20 36\
          -57 23 -117 -38z"/>\
          <path d="M9636 11458 c-18 -25 -15 -32 53 -122 27 -36 66 -95 86 -131 32 -57\
          40 -65 66 -65 18 0 32 7 38 19 13 24 -25 99 -108 215 -77 109 -106 126 -135\
          84z"/>\
          <path d="M7336 11013 c-12 -12 -72 -145 -107 -237 -36 -95 -34 -118 13 -124\
          30 -4 39 7 63 73 10 28 38 95 62 149 37 83 43 104 34 123 -10 22 -49 32 -65\
          16z"/>\
          <path d="M9921 10912 c-7 -13 -6 -35 4 -71 7 -29 19 -94 25 -144 6 -51 14\
          -103 18 -116 10 -33 37 -49 60 -35 14 10 17 25 15 90 -2 84 -35 257 -54 280\
          -16 20 -57 17 -68 -4z"/>\
          <path d="M7131 10417 c-6 -7 -21 -89 -33 -181 -22 -165 -22 -168 -3 -182 46\
          -34 70 -7 79 88 3 40 14 115 22 166 13 73 13 96 4 107 -15 19 -54 19 -69 2z"/>\
          <path d="M9972 10311 c-8 -4 -22 -50 -32 -102 -10 -52 -28 -123 -39 -159 -27\
          -84 -26 -98 4 -112 41 -18 60 11 94 142 39 151 47 206 31 225 -14 17 -38 19\
          -58 6z"/>\
          <path d="M7085 9806 c-18 -13 -18 -20 -7 -162 7 -82 15 -162 19 -177 7 -36 36\
          -52 64 -36 20 10 21 17 15 73 -4 33 -9 108 -12 166 -8 136 -29 173 -79 136z"/>\
          <path d="M9759 9723 c-8 -10 -27 -37 -42 -60 -15 -23 -56 -79 -92 -123 -37\
          -45 -65 -89 -63 -97 2 -9 13 -22 26 -31 22 -14 25 -13 75 39 65 67 167 217\
          167 245 0 42 -45 59 -71 27z"/>\
          <path d="M6102 9488 c-21 -21 -13 -48 21 -69 61 -38 269 -139 286 -139 24 0\
          41 20 41 47 0 19 -22 34 -150 98 -153 76 -177 84 -198 63z"/>\
          <path d="M9290 9240 c-30 -21 -92 -58 -137 -81 -46 -24 -83 -46 -83 -50 0 -4\
          -3 -14 -6 -22 -3 -10 4 -22 19 -32 24 -15 28 -15 107 25 110 55 218 128 226\
          152 8 26 -13 48 -45 47 -14 -1 -51 -18 -81 -39z"/>\
          <path d="M6668 9229 c-10 -5 -18 -18 -18 -28 0 -28 28 -46 135 -85 55 -21 117\
          -44 138 -52 65 -24 107 -14 107 27 0 27 -20 37 -181 95 -169 60 -157 57 -181\
          43z"/>\
          <path d="M7186 9195 c-9 -9 -16 -19 -16 -22 0 -13 75 -190 90 -213 9 -14 29\
          -44 44 -67 19 -32 33 -43 51 -43 32 0 50 32 34 61 -11 21 -10 22 27 15 164\
          -28 183 -29 198 -16 19 15 21 44 4 58 -7 5 -71 22 -143 37 -71 14 -137 30\
          -146 35 -9 5 -26 33 -38 62 -35 86 -46 103 -68 106 -11 2 -28 -4 -37 -13z"/>\
          <path d="M8736 9005 c-27 -8 -92 -21 -145 -31 -53 -9 -102 -22 -110 -29 -18\
          -17 -7 -62 17 -69 20 -7 242 34 307 56 46 16 65 40 49 66 -14 22 -56 24 -118\
          7z"/>\
          <path d="M7861 8926 c-7 -8 -11 -23 -9 -33 7 -35 46 -43 215 -43 152 0 163 1\
          173 20 8 14 8 26 0 40 -6 11 -12 20 -13 21 -1 0 -81 3 -178 6 -149 4 -177 2\
          -188 -11z"/>\
          <path d="M7517 8683 c-4 -3 -7 -19 -7 -33 0 -31 49 -77 184 -174 79 -57 114\
          -68 136 -41 21 25 6 49 -62 96 -37 25 -97 71 -133 102 -61 52 -100 69 -118 50z"/>\
          <path d="M10615 8625 c-164 -70 -186 -89 -147 -127 l21 -21 153 62 c167 68\
          198 90 175 125 -8 12 -23 22 -33 23 -11 1 -86 -27 -169 -62z"/>\
          <path d="M10105 8440 c-49 -16 -122 -38 -162 -50 -49 -14 -74 -26 -78 -39 -8\
          -25 3 -49 26 -56 16 -5 245 55 320 83 35 14 43 48 18 73 -23 23 -13 24 -124\
          -11z"/>\
          <path d="M8040 8355 c-7 -8 -10 -25 -6 -39 5 -21 20 -30 99 -54 50 -17 127\
          -38 169 -48 75 -17 78 -17 98 1 42 38 15 60 -115 94 -60 16 -130 37 -154 45\
          -54 20 -75 20 -91 1z"/>\
          <path d="M9460 8287 c-210 -33 -229 -42 -195 -93 18 -27 6 -28 225 8 150 24\
          188 49 144 92 -18 19 -15 19 -174 -7z"/>\
          <path d="M8640 8220 c-18 -33 3 -56 56 -64 26 -3 106 -6 178 -6 139 0 156 5\
          156 45 0 42 -15 45 -202 45 -167 0 -178 -1 -188 -20z"/>\
          <path d="M3707 12846 c-17 -18 -32 -234 -21 -314 7 -58 30 -80 62 -63 17 9 20\
          29 25 188 3 117 2 182 -5 190 -14 17 -43 16 -61 -1z"/>\
          <path d="M3748 12239 c-10 -5 -18 -21 -18 -34 0 -51 70 -306 91 -331 16 -19\
          43 -17 63 5 16 17 15 23 -8 97 -14 43 -34 117 -46 164 -12 47 -28 91 -37 98\
          -20 14 -23 14 -45 1z"/>\
          <path d="M3942 11648 c-7 -7 -12 -23 -12 -37 0 -25 119 -261 148 -293 22 -26\
          61 -23 71 5 7 17 -7 52 -67 167 -87 169 -107 191 -140 158z"/>\
          <path d="M4247 11114 c-4 -4 -7 -19 -7 -34 0 -36 187 -284 219 -288 26 -4 51\
          14 51 37 0 9 -46 77 -102 151 -80 106 -107 136 -127 138 -15 2 -30 0 -34 -4z"/>\
          <path d="M13475 10913 c-54 -75 -100 -144 -102 -153 -7 -25 33 -55 57 -44 24\
          11 197 248 206 282 8 28 -11 52 -41 52 -17 0 -44 -31 -120 -137z"/>\
          <path d="M13177 10523 c-157 -174 -198 -226 -195 -252 2 -21 9 -27 34 -29 29\
          -3 40 7 143 125 61 70 111 136 111 145 0 20 -26 48 -45 48 -8 0 -29 -17 -48\
          -37z"/>\
          <path d="M12664 9978 c-68 -67 -124 -129 -124 -138 0 -9 9 -25 20 -35 19 -17\
          21 -17 47 1 16 9 76 65 136 122 106 105 123 132 95 160 -26 26 -53 8 -174\
          -110z"/>\
          <path d="M14518 7599 c-48 -14 -123 -80 -150 -132 -42 -84 -22 -205 45 -275\
          54 -56 102 -77 182 -76 84 0 136 24 187 84 41 47 58 97 58 169 0 126 -99 229\
          -229 237 -31 2 -73 -2 -93 -7z m149 -96 c80 -38 112 -149 64 -226 -24 -39 -90\
          -77 -134 -77 -70 0 -139 53 -157 119 -36 133 101 244 227 184z"/>\
          <path d="M5232 5737 c-18 -21 196 -551 224 -555 15 -2 60 49 198 223 104 133\
          176 233 174 243 -3 16 -67 27 -544 97 -29 4 -44 2 -52 -8z m303 -83 c110 -15\
          203 -30 207 -33 6 -5 -217 -300 -261 -344 -17 -18 -21 -11 -99 187 -45 113\
          -82 211 -82 217 0 6 8 8 18 5 9 -2 107 -17 217 -32z"/>\
       </g>\
       </svg>\
       <div class="text-center fst-italic small text-black2">Not found</div>\
       </div>');
}
function remove_not_found_svg() {
    $('.not-found-svg-container').fadeOut(500, function () {
        $('.not-found-svg-container').remove();
    });
    $('.songTools').removeClass('inx-high');
}

/**
 * Case insensitive match function
 */

// jQuery.expr[':'].icontains = function (a, i, m) {
//     return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
// }
// With accent insensitive
jQuery.expr[':'].icontains = function (a, i, m) {
    return jQuery(a).text().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(m[3].toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) >= 0;
}

/**
 * Song search funtions
 */

function show_search_tool() {
    var toShow = songSearchTool;
    if (toShow.is(':hidden')) {
        window.history.pushState({ id: 1 }, null, null);
        toShow.fadeIn();
        pageSearchInput.focus();
    }
}
function close_search_tool() {
    // visible($('.Loading_fix')) && close_loading()
    removeLoader();
    songSearchTool.fadeOut();
    unselect_SResults();
}

function reset_songSearchRes_num() {
    $('.schResults-navigator .AVB-Num').html(0);
}

pageSearchInput.on({
    keyup: function () {
        this.value = this.value.replace('/', '');
        if (!($(this).val())) {
            searchBoxClearer.removeClass('d-inline').addClass('d-none');
        }
        else {
            searchBoxClearer.removeClass('d-none').addClass('d-inline');
        }
    },
});
$('.sSearchTool .search-box__clearer').click(function () {
    $('.schResults > div').html('');
    reset_songSearchRes_num();
});

/**
 * Playing music styles
 */

$('.style_CAT .fa-play').click(function () {
    var player_ICN = $(this),
        aud_sty = player_ICN.next().find('.THIS_AUD')[0],
        play_times = 1,
        style_stopper = $('#styleStopper');
    // Stop any playing style from the same category
    player_ICN.parents('li').siblings().removeClass('corresMediaPlaying');
    player_ICN.parents('li').siblings().find('.THIS_AUD').each(function () {
        this.pause();
        this.currentTime = 0;
    });
    // Stop any playing style from other categories
    player_ICN.parents('ul').siblings('ul').find('li').removeClass('corresMediaPlaying');
    player_ICN.parents('ul').siblings('ul').find('.THIS_AUD').each(function () {
        this.pause();
        this.currentTime = 0;
    });
    $('.THIS_AUD').parent().prev().removeClass('fa-pause').addClass('fa-play');
    // Play clicked style continuously 4 times then stop, or pause on second click
    if (aud_sty.paused == true) {
        aud_sty.play();
        player_ICN.removeClass('fa-play').addClass('fa-pause');
        player_ICN.parents('li').addClass('corresMediaPlaying');
        aud_sty.addEventListener('ended', function () {
            play_times++;
            if (play_times > 0) {
                aud_sty.play();
                aud_sty.currentTime = 0;
            }
            if (play_times == 5) {
                aud_sty.pause();
                aud_sty.currentTime = 0;
                player_ICN.removeClass('fa-pause').addClass('fa-play');
                player_ICN.parents('li').removeClass('corresMediaPlaying');
                style_stopper.fadeOut();
            }
        }, false);
    }
    else {
        aud_sty.pause();
        player_ICN.removeClass('fa-pause').addClass('fa-play');
        player_ICN.parents('li').removeClass('corresMediaPlaying');
        play_times = 0;
    }
});

//Stop playing all styles 

function pause_all_styles() {
    var style_stopper = $('#styleStopper');
    $('.style_CAT').find('.THIS_AUD').each(function () {
        this.pause();
        this.currentTime = 0;
    });
    $('.style_CAT').find('li').removeClass('corresMediaPlaying');
    $('.style_CAT').find('.fa-pause').removeClass('.fa-pause').addClass('fa-play');
    style_stopper.fadeOut();
}
$('.style_CAT > li > a').click(pause_all_styles);
$('.sty_stop_icn').click(pause_all_styles);

/**
 * Conditional document events
 */

var searchResultsNum = 0,
    results_checker;

function unselect_SResults() {
    $('.schResults > div:first-child').find('li span').removeClass('bg-myBlue text-light selected');
}

$(document).on({
    keydown: function (e) {

        if (e.ctrlKey && (e.keyCode == 191)) {
            /*  Crtl / to find something */
            visible(sCatSearcher) && hidden(songSearchTool) && sCatSearcher.focus();
            hidden(sCatSearcher) && show_search_tool();
            visible(songSearchTool) && pageSearchInput.focus();
            visible($('.page-search-box')) && ($('.page-search-box').find('.search-box__input').focus() && pageContentList.collapse('show'));
            visible(esgGallerySearchBar) && esgGallerySearchBar.focus();
        }
        if (e.altKey && (e.keyCode == 191)) {
            if (winWid > 992) {
                $('#allSongsList.Comp_Def').collapse('show');
                $('#FINDcomposer_LG').focus();
            }
            else {
                show_SORTER();
                $('#FINDcomposer_SM').focus();
            }
        }

        /*  Alt h for help */
        if (e.altKey && (e.keyCode == 72)) {
            if (!$('.informer-lg').is(':visible')) {
                show_CHMS_help();
            }
            else if ($('.informer-lg').is(':visible')) {
                hide_CHMS_help();
            }
        }

        /*  Alt N for Notification */
        if (e.altKey && (e.keyCode == 78)) {
            if (!webNotifications.is(':visible')) {
                show_notifications();
            }
            else if (webNotifications.is(':visible')) {
                hide_Notif();
            }
        }

        /*  Alt R for Song Refresh */
        if (e.altKey && (e.keyCode == 82)) {
            refresh_songs();
        }

        /*  Alt R for Image Refresh */
        if (e.altKey && (e.keyCode == 82) && esgGallery.length) {
            unfilter_gallery();
            imgFilterAllMatch.removeClass('active');
            refreshImgMvnt();
        }

        if (e.keyCode == 13 && !pageSearchInput.is(':focus') && ($('.schResults > div:first-child').find('.selected').length < 1)) {
            var chosenSong = $('.schResults > div:first-child').find('li:visible:first');
            chosenSong.find('span:first-of-type').addClass('bg-myBlue text-light selected');
        }

        // Select song result by keys
        if ((e.code == 'Numpad2' || e.code == 'Numpad8') && songSearchTool.is(':visible') && !pageSearchInput.is(':focus')) {
            if (e.code == 'Numpad2') {
                searchResultsNum++;
                if (searchResultsNum > results_checker) {
                    searchResultsNum = results_checker;
                }
            }
            if (e.code == 'Numpad8') {
                searchResultsNum--;
                if (searchResultsNum < 1) {
                    searchResultsNum = 1;
                }
            }
            var songNum = searchResultsNum - 1,
                resultsPar = $('.schResults > div:first-child'),
                resultsParHei = resultsPar.height(),
                chosenSong = resultsPar.find('> div:visible:nth(' + songNum + ')');
            results_checker = resultsPar.find('.SongElement').filter(function () {
                return $(this).is(':visible');
            }).length;
            var songPosit = chosenSong[0].offsetTop,
                min_songPosit = resultsPar.scrollTop(),
                max_songPosit = min_songPosit + resultsParHei - 50;
            chosenSong.siblings().find('span.selected').removeClass('bg-myBlue text-light selected');
            chosenSong.find('span:nth-child(2)').addClass('bg-myBlue text-light selected');
            if (songPosit < min_songPosit) {
                resultsPar.scrollTop(songPosit - (resultsParHei / 2));
            }
            if (songPosit > max_songPosit) {
                resultsPar.scrollTop(songPosit - 10);
            }
        }
    },

    keyup: function (e) {
        e.key == 'Escape' && close_grid_items();
        e.key == 'Escape' && hide_custom_fixed();
        e.key == 'Escape' && collapse_collapsible();
        e.key == 'Escape' && hide_web_tips();
        if (e.key == 'Escape' && songSearchTool.is(':visible') && !pageSearchInput.is(':focus')) {
            go_back();
        }
        if ((e.key == 'Escape' && $('input').is(':focus')) || (e.keyCode == 13 && $('input').is(':focus'))) {
            $('input').blur();
        }
        if (e.key == 'Escape' && webNotifications.is(':visible')) {
            hide_Notif();
        }
        (e.key == 'Escape' && hidden(imageDisplayer)) && closeImage();
        if (e.key == 'Escape' && visible(imageDisplayer)) {
            close_full_img_displayer();
            go_back();
        }
        if (e.key == 'ArrowLeft' && webNotifications.is(':visible')) {
            // e.preventDefault();
            notif_left();
        }
        if (e.key == 'ArrowRight' && webNotifications.is(':visible')) {
            // e.preventDefault();
            notif_right();
        }

        /*  Alt t for theme */
        if (e.altKey && e.key == 't' || e.altKey && (e.key == 'T')) {
            change_theme_randomly();
        }

        /*  Alt s for settings */
        if (e.altKey && e.key == 's' || e.altKey && (e.key == 'S')) {
            e.preventDefault();
            visible(webNotifications) && hide_Notif();
            if (webSettings.is(':hidden')) {
                show_web_settings();
            }
            else if (webSettings.is(':visible')) {
                hide_web_settings();
            }
        }
        /*  Alt g for settings */
        if (e.altKey && e.key == 'g' || e.altKey && (e.key == 'G')) {
            show_guide();
        }

        if (e.key == 'ArrowDown' && webNotifications.is(':visible') && ($('.Notifs_wrapper').scrollLeft() < 10)) {
            var to_scroll = $('.Notifs_1'),
                to_scroll_offsetTop = Math.abs($('.Notifs_1 > div:nth-child(2)').offset().top - scrollY),
                new_scroll = to_scroll_offsetTop + ($(window).height() * 0.3);
            to_scroll.scrollTop(new_scroll);
        }
        if (e.key == 'ArrowUp' && webNotifications.is(':visible') && ($('.Notifs_wrapper').scrollLeft() < 10)) {
            var to_scroll = $('.Notifs_1'),
                to_scroll_offsetTop = Math.abs($('.Notifs_1 > div:nth-child(2)').offset().top - scrollY),
                new_scroll = to_scroll_offsetTop - ($(window).height() * 0.3);
            to_scroll.scrollTop(new_scroll);
        }
        if (e.key == 'Backspace' && (pageSearchInput.is(':visible') && sCatWrapper.is(':hidden')) && $('.repertoirePar').is(':hidden')) {
            pageSearchInput.focus();
            $(window).scrollTop(0);
        }
        if (e.key == 'Backspace' && $('.esgSearch > input').is(':visible')) {
            $('.esgSearch > input').focus();
        }
    },
    keypress: function (e) {
        if (e.keyCode == 13 && songSearchTool.is(':visible') && !pageSearchInput.is(':focus') && ($('.schResults > div:first-child').find('.selected').length > 0)) {
            $('.schResults > div:first-child').find('.selected')[0].click();
        }
    }
});

/**
 * Controll/Alt + keys combinations
*/

// Automatic theme
let keysCombination = [];
$(document).on({
    keydown: function (e) {
        keysCombination.push(e.key);
        // Check if "Alt" Key was pressed first
        if (keysCombination[0] == 'Alt') {
            keysCombination.concat(keysCombination);
        }
    },
    keyup: function (e) {
        // Check for the combination (Alt + t and Alt + A)
        var keysAbrev = keysCombination[0] + keysCombination[1] + keysCombination[2]
        if (keysAbrev == 'Altta' || keysAbrev == 'AltTA') {
            e.preventDefault();
            auto_theme();
            // Notify action
            show_toast('<span class="fa fa-moon me-2"></span> Auto theme');
        }
        // Remove pressed keys values
        if (e.key == "Alt" || e.key == "Control" || e.key == "Shift") {
            keysCombination = [];
        }
    }
});

/**
 * Working on web tips
 */

const webTip = $('.web-tip');
let webTipsList = [
    { tipElement: $(".ToTop"), tipTitle: "Jumper", tipMessage: "Use the \"To top\" tool to quickly jump to the beginning of the page. Also right-click for the opposite" },
    { tipElement: $(".navbar-end #settings > span"), tipTitle: "Web settings", tipMessage: "Easily customize web controls such as the theme, animations, guide, and more. Additionally, you'll find a few key pieces of important information about ESG here" },
];
let allTipsNum = webTipsList.length,
    tipIndex = 0;
// Hide tip
function hide_web_tips() {
    webTip.fadeOut('fast');
}
// Show tip
function show_web_tips(tipsList, tipIndex) {
    if ($(window).width() > 576) {
        var tipToShow = tipsList[tipIndex].tipElement;
        var currentTipIcon = webTip.find('.tip-icon > .fa'),
            currentTipIconName = get_icon_name(currentTipIcon),
            tipToShowIconName = get_icon_name(tipToShow),

            tipToShowPositX = tipToShow[0].getBoundingClientRect().left,
            tipToShowPositY = tipToShow[0].getBoundingClientRect().top,

            webTipWid = webTip.width(),
            webTipHei = webTip.height();
        // Show tip
        hidden(webTip) && webTip.show();
        // Set icon, name and message
        currentTipIcon.removeClass(currentTipIconName).addClass(tipToShowIconName);
        $('.tip-name').html(tipsList[tipIndex].tipTitle);
        $('.tip-message').html(tipsList[tipIndex].tipMessage);
        // Positioning the tip
        if (tipToShowPositX < ($(window).width() / 2) && tipToShowPositY < ($(window).height() / 2)) {
            webTip.removeClass('tip-top-right tip-bottom-left tip-bottom-right').addClass('tip-top-left');
            webTip.css({ left: (tipToShowPositX), top: (tipToShowPositY) });
        }
        if (tipToShowPositX > ($(window).width() / 2) && tipToShowPositY < ($(window).height() / 2)) {
            webTip.removeClass('tip-top-left tip-bottom-left tip-bottom-right').addClass('tip-top-right');
            webTip.css({ left: (tipToShowPositX - webTipWid + 16), top: (tipToShowPositY - 16) });
        }
        if (tipToShowPositX < ($(window).width() / 2) && tipToShowPositY > ($(window).height() / 2)) {
            webTip.removeClass('tip-top-left tip-top-right tip-bottom-right').addClass('tip-bottom-left');
            webTip.css({ left: (tipToShowPositX), top: (tipToShowPositY - webTipHei + 16) });
        }
        if (tipToShowPositX > ($(window).width() / 2) && tipToShowPositY > ($(window).height() / 2)) {
            webTip.removeClass('tip-top-left tip-top-right tip-bottom-left').addClass('tip-bottom-right');
            webTip.css({ left: (tipToShowPositX - webTipWid + 16), top: (tipToShowPositY - webTipHei + 16) });
        }
    } else { hide_web_tips() }
}

// Share ESG songs Download link
$('.SeeMore').prev().click(function () {
    $('html,body').animate({ scrollTop: $(this).offset().top - 50 }, 'slow');
});

/**
 * Scroll songs wrapper between top and selected song
*/

function incat_to_top() {
    sCatWrapper.scrollTop(0);
    $('.SongsToTop').one('click', incat_to_selected);
}
function incat_to_selected() {
    var selectedSong = $('.inCAT').find('.Sselected'),
        selectedSongLen = selectedSong.length,
        selectedSongCont = selectedSong.parent();
    if (selectedSongLen < 1) {
        incat_to_top();
    }
    else {
        sCatWrapper.animate({ scrollTop: selectedSongCont.position().top }, 400);
    }
    $('.SongsToTop').one('click', incat_to_top);
}
$('.SongsToTop').one('click', incat_to_selected);

/**
 * Preview a file
*/

const get_gDrive_file_id = (link) => {
    return link.slice((link.lastIndexOf('/d/') + 3), link.lastIndexOf('/'));
}

function preview_file(previewSpace) {
    let toShow = previewSpace,
        thePreview = toShow.find('iframe');
    thePreview.html('');
    thePreview.attr('src', '');
    let selectedSong = $('.inCAT').find('.Sselected'),
        songLink = selectedSong.find('a').attr('href'),
        songLinkID = songLink.slice((songLink.indexOf('&id=') + 4)),
        previewLink = 'https://drive.google.com/file/d/' + songLinkID + '/preview';
    toShow.show();
    thePreview.attr('src', previewLink);
}

//check song owner
const checkSongStatus = () => {
    if ($('#SongMine').is(":checked")) {
        $('#OWNER').slideDown();
        $('#SongOwner').attr("required", true);
        $('#SongOwnerEmail').attr("required", true);
    }
    else {
        $('#OWNER').slideUp();
        $('#SongOwner').removeAttr("required");
        $('#SongOwnerEmail').removeAttr("required");
    }
}

$(function () {
    $(document).on("click", "html", checkSongStatus);
});

//check category selected upload
const checkSCategoryReq = (e) => {
    if ($('#SongCategoryReq option:selected').val() == "Others") {
        $('#OtherCatReq').slideDown();
        $('#SCTreq').attr("required", true);
    }
    else {
        $('#OtherCatReq').slideUp();
        $('#SCTreq').removeAttr("required");
    }
}

$(function () {
    $(document).on("click", "html", checkSCategoryReq);
});

//check category selected upload
const checkSCategoryUpload = () => {
    if ($('#SongCategoryUp option:selected').val() == "Others") {
        $('#OtherCat').slideDown().css("height", "auto");
        $('#SCT').attr("required", true);
    }
    else {
        $('#OtherCat').slideUp();
        $('#SCT').removeAttr("required");
    }
}

$(function () {
    $(document).on("click", "html", checkSCategoryUpload);
});


/**
 * Show liturgy book options 
 */

$('.BookElement').click(function () {
    var the_book = $(this),
        other_book = the_book.parent().siblings().find('.BookElement.getBook');
    other_book.removeClass('getBook');
    setTimeout(() => {
        the_book.addClass('getBook');
    }, 1);
});

$(document).on({
    click: function (e) {
        var abook = $('.BookElement');
        if (not_targeted(e, abook)) {
            abook.removeClass('getBook');
        }
    }
});

/**
 * Detect back press on website
 * window.onpopstate = function () {}
 * or,
 */

$(window).on('popstate', function () {
    if ($('.ESG_About').hasClass('PersonMaxm'))
        close_singer();
    $('.ESG_About').removeClass('PersonMaxm');
    if (songSearchTool.is(':visible'))
        close_search_tool();
    if (webSettings.is(':visible')) {
        scroll_left($('.webSetPG'));
        webSettings.addClass('slideOutR');
        setTimeout(() => {
            webSettings.removeClass('set slideOutR');
        }, 200);
        if ($('.webGuide').is(':visible')) {
            $('.webGuide').parent().trigger('click');
        }
    }
    visible($('.repertoire')) && close_fixHolder($('.repertoirePar'));
    visible(imageDisplayer) && close_full_img_displayer();
});

/**
 * Show event details
 */

$('.eventDet-imgs > img:nth-child(2)').click(function () {
    $(this).parent().removeClass('sub3').addClass('sub2');
});
$('.eventDet-imgs > img:nth-child(3)').click(function () {
    $(this).parent().addClass('sub3');
});
$('.eventDet-imgs > img:first-child').click(function () {
    $(this).parent().removeClass('sub2 sub3');
});
$('.eventDet-footer').click(function () {
    $(this).parents('.fix-holder').click();
});

/**
 * Date dependent functions
 */
function formatDate(date) {
    // Works for dates with 'YYYY-MM-DD' fromat
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const daySuffix = getDaySuffix(day);
    return `${day}<sup>${daySuffix}</sup> ${month}, ${year}`;
}

function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th'; // special case for 11th-13th
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

let current_year = dateStr.getFullYear(),
    month_str = dateStr.getMonth(),
    current_month = dateStr.getMonth(),
    current_date = dateStr.getDate(),
    current_day = dateStr.getDay(),
    current_hour = dateStr.getHours(),
    current_minute = dateStr.getMinutes(),
    current_sec = dateStr.getSeconds();

/**
 * Creating current month dynamic calendar
 */

function create_current_month() {
    var currentMonthFirstDate = new Date(current_year, month_str, 1),
        currentMonthLastDate = new Date(current_year, month_str + 1, 0),
        prevMonthLastDate = new Date(current_year, month_str, 0),
        nextMonthFirstDate = new Date(current_year, month_str + 1, 1);
    currentMonthFirstDate = currentMonthFirstDate.toString();
    currentMonthLastDate = currentMonthLastDate.toString();
    currentMonthFirstDate = currentMonthFirstDate.slice(0, (currentMonthFirstDate.indexOf(':') - 3));
    currentMonthLastDate = currentMonthLastDate.slice(0, (currentMonthLastDate.indexOf(':') - 3));
    let currentMonthFirstDay = currentMonthFirstDate.slice(-7, -5),
        currentMonthLastDay = currentMonthLastDate.slice(-7, -5),
        currentMonthName = currentMonthFirstDate.slice(-11, -8),
        // currentMonthFirstDayName = currentMonthFirstDate.slice(0, currentMonthFirstDate.indexOf(' ')),
        // currentMonthLastDayName = currentMonthLastDate.slice(0, currentMonthLastDate.indexOf(' ')),
        monthTotalDays = Number(currentMonthLastDay) - Number(currentMonthFirstDay);

    prevMonthLastDate = prevMonthLastDate.toString();
    nextMonthFirstDate = nextMonthFirstDate.toString();
    prevMonthLastDate = prevMonthLastDate.slice(0, (prevMonthLastDate.indexOf(':') - 3));
    nextMonthFirstDate = nextMonthFirstDate.slice(0, (nextMonthFirstDate.indexOf(':') - 3));
    let prevMonthLastDay = prevMonthLastDate.slice(-7, -5),
        nextMonthFirstDay = nextMonthFirstDate.slice(-7, -5),
        prevMonthLastDayName = prevMonthLastDate.slice(0, prevMonthLastDate.indexOf(' ')),
        nextMonthFirstDayName = nextMonthFirstDate.slice(0, nextMonthFirstDate.indexOf(' '));
    const monthDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let prevMonthLastDayInx = monthDayNames.indexOf(prevMonthLastDayName),
        nextMonthFirstDayInx = monthDayNames.indexOf(nextMonthFirstDayName),
        currentMonthFirstRowDays = 6 - prevMonthLastDayInx,
        nextMonthFirstRowDays = 6 - nextMonthFirstDayInx,
        calendarFirstRowNumber = prevMonthLastDay - prevMonthLastDayInx;
    let currentMonthNthDay,
        nextMonthNthDay;
    // Display month and year values
    document.querySelectorAll('.currentMonthDynamic__name').forEach(el => {
        el.innerHTML = month_shortNm_to_longNm(currentMonthName);
    });
    document.querySelectorAll('.currentYearDynamic__name').forEach(el => {
        el.innerHTML = current_year;
    });
    // Creating days
    document.querySelectorAll('.monthElem_data').forEach(monthHolder => {
        let currentMonthNthDayHolder = document.createElement('div'),
            nextMonthNthDayHolder = document.createElement('div');
        currentMonthNthDayHolder.classList.add('row', 'monthDates', 'd-flex', 'justify-content-between');
        nextMonthNthDayHolder.classList.add('row', 'monthDates', 'd-flex', 'justify-content-between');
        monthHolder.appendChild(currentMonthNthDayHolder);
        currentMonthNthDay = 0,
            nextMonthNthDay = 0;
        // Creating previous and current month days that exists in the same week
        // Previous month last week days
        if (prevMonthLastDayInx < 6) {
            for (let n = 0; n <= prevMonthLastDayInx; n++) {
                calendarFirstRowNumber += 1;
                let dateElement = document.createElement('span');
                dateElement.classList.add('col-1', 'text-muted');
                dateElement.innerHTML = calendarFirstRowNumber - 1;
                currentMonthNthDayHolder.appendChild(dateElement);
            }
        }
        // Current month first week days
        for (let n = 0; n < currentMonthFirstRowDays; n++) {
            currentMonthNthDay += 1;
            let dateElement = document.createElement('span');
            dateElement.classList.add('col-1');
            dateElement.innerHTML = (currentMonthNthDay);
            currentMonthNthDayHolder.appendChild(dateElement);
        }
        // Creating current month full weeks' days
        for (let i = 0; i < 5; i++) {
            if ((currentMonthNthDay < currentMonthLastDay) && (currentMonthLastDay - currentMonthNthDay >= 7)) {
                let fullWeekDaysHolder = document.createElement('div');
                fullWeekDaysHolder.classList.add('row', 'monthDates', 'd-flex', 'justify-content-between');
                for (let n = 0; n < 7; n++) {
                    currentMonthNthDay += 1;
                    let dateElement = document.createElement('span');
                    dateElement.classList.add('col-1');
                    dateElement.innerHTML = (currentMonthNthDay);
                    fullWeekDaysHolder.appendChild(dateElement);
                }
                monthHolder.appendChild(fullWeekDaysHolder);
            }
        }
        // Creating current month last week days, if it contains next month days
        if (nextMonthFirstDayInx > 0) {
            if (!(currentMonthNthDay > currentMonthLastDay)) {
                let remainingMonthDays = currentMonthLastDay - currentMonthNthDay;
                for (let n = 0; n < (remainingMonthDays); n++) {
                    currentMonthNthDay += 1;
                    let dateElement = document.createElement('span');
                    dateElement.classList.add('col-1');
                    dateElement.innerHTML = (currentMonthNthDay);
                    nextMonthNthDayHolder.appendChild(dateElement);
                }
            }
            for (let n = 0; n <= nextMonthFirstRowDays; n++) {
                nextMonthNthDay += 1;
                let dateElement = document.createElement('span');
                dateElement.classList.add('col-1', 'text-muted');
                dateElement.innerHTML = (nextMonthNthDay);
                nextMonthNthDayHolder.appendChild(dateElement);
            }
            monthHolder.appendChild(nextMonthNthDayHolder);
        }
    });
    // Mark todays's date
    if (month_str == dateStr.getMonth()) {
        $('.monthElem_data span:not(.text-muted)').filter(function () {
            return $(this).text() == current_date;
        }).addClass('today selected');
    }
}

// Delete month dates for new month
function delete_month_dates() {
    document.querySelectorAll('.monthElem_data').forEach(el => {
        el.querySelectorAll('.monthDates').forEach(row => {
            row.parentNode.removeChild(row);
        });
    });
}

// Create next month
function create_next_month() {
    delete_month_dates();
    // Add new month
    month_str += 1;
    (month_str > 11) && (month_str = 0, current_year += 1);
    create_current_month();
}

// Create previous month
function create_previous_month() {
    delete_month_dates();
    // Add new month
    month_str -= 1;
    (month_str < 0) && (month_str = 11, current_year -= 1);
    create_current_month();
}

// Create next month same year
function create_next_month_same_year() {
    delete_month_dates();
    month_str += 1;
    (month_str > 11) && (month_str = 0);
    create_current_month();
}

// Create previous month same year
function create_previous_month_same_year() {
    delete_month_dates();
    month_str -= 1;
    (month_str < 0) && (month_str = 11);
    create_current_month();
}

// Create custom month
function create_custom_month(monthNumber) {
    delete_month_dates();
    month_str = monthNumber;
    create_current_month();
}

/**
 * Mark current season and periods
 */

// Constants for months
const MONTHS = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    MAY: 5,
    DECEMBER: 12
};

// Constants for seasons
const SEASONS = {
    LENT: 'Igisibo',
    EASTERTIDE: 'Pasika',
    ORDINARY_TIME: 'Igihe gisanzwe',
    ADVENT: 'Adiventi',
    CHRISTMAS: 'Noheli'
};

// Determining the current liturgy season
function mark_season() {
    let the_season, the_season_en, the_season_def, sub_season;
    // Check the season based on the date
    if (
        ((current_month >= MONTHS.FEBRUARY && current_date >= 22) && current_month < MONTHS.APRIL) ||
        (current_month == MONTHS.MARCH) ||
        (current_month == MONTHS.APRIL && current_date <= 6)
    ) {
        the_season = SEASONS.LENT;
        the_season_en = 'Lent';
        the_season_def =
            'A period of days during which the Christians remember the events leading up to and including the death of Jesus Christ, whose life and teachings are the foundation of Christianity.';
    }
    if (
        ((current_month >= MONTHS.APRIL && current_date >= 9) && current_month < MONTHS.MAY) ||
        (current_month == MONTHS.MAY && current_date <= 28)
    ) {
        the_season = SEASONS.EASTERTIDE;
        the_season_en = 'Eastertide';
        the_season_def =
            'We rejoice and celebrate again for Jesus Christ has risen from the dead bringing us forgiveness so that we can reunite with God.';
        if (current_month == MONTHS.MAY && current_date == 18) {
            sub_season = 'Asensiyo';
        }
        if (current_month == MONTHS.MAY && current_date == 28) {
            sub_season = 'Pentecost';
        }
    }
    if (
        (current_month == MONTHS.MAY && current_date > 28) ||
        (current_month > MONTHS.MAY && (current_month < MONTHS.DECEMBER || (current_month == MONTHS.DECEMBER && current_date < 3)))
    ) {
        the_season = SEASONS.ORDINARY_TIME;
        the_season_en =
            'Ordinary time';
        the_season_def =
            'A period of intentional conversion. A time to reflect on Jesus\' life and ministry, to gauge how we ourselves are measuring up to the standard of Christian living that Christ Himself has set for us, and to come closer day-by-day to living Jesus\' mission in our own daily lives';
    }
    if ((current_month == MONTHS.DECEMBER && (current_date >= 3 && current_date < 25))) {
        the_season = SEASONS.ADVENT;
        the_season_en = 'Advent';
        the_season_def =
            'A beginning of the liturgical year and a period of preparation and anticipation for the celebration of Jesus Christ\'s birth at Christmas. Advent is a time of both reflection on the significance of Christ\'s first coming and anticipation of His promised return.';
    }
    if ((current_month == MONTHS.DECEMBER && current_date >= 25) || (current_month == MONTHS.JANUARY && current_date < 6)) {
        the_season = SEASONS.CHRISTMAS;
        the_season_en = 'Christmas';
        the_season_def =
            'A liturgical period that celebrates the birth of Jesus Christ, the Incarnation of God. It is a joyful and festive season that emphasizes the central Christian belief that God became incarnate in the person of Jesus Christ. This period also reflects the mystery of the Nativity, gratitude for God\'s love and mercy, and the sharing of that love with others through acts of kindness and charity.';
    }

    // Default case for the entire year
    if (!the_season) {
        the_season = SEASONS.ORDINARY_TIME;
        the_season_en =
            'Ordinary time';
        the_season_def =
            'A period of intentional conversion. A time to reflect on Jesus\' life and ministry, to gauge how we ourselves are measuring up to the standard of Christian living that Christ Himself has set for us, and to come closer day-by-day to living Jesus\' mission in our own daily lives';
    }

    const season_songs_toggler = $('.SongsHome.Song_def').find('div > h4:icontains(' + the_season + ')'),
        subSeason_songs_toggler = $('.SongsHome.Song_def').find('div > h4:icontains(' + sub_season + ')');
    season_songs_toggler.parent().addClass('crntSeason');
    subSeason_songs_toggler.parent().addClass('crntSubSeason');

    //  Displaying season information
    $('#Notifications .Catholic_Season > span').html(the_season);
    $('.Seasoner > h3.Season-en').html('It is ' + the_season_en);
    $('.Seasoner > blockquote').html(the_season_def);
}

setInterval(() => {
    mark_season();
}, 1000);

/**
 * Animating left design
 */

// var new_posX_design,
//     new_posY_design,
//     to_move;

// $('.left-design').on({
//     mousemove: function (e) {
//         $(this).addClass('move');
//         to_move = $(this).find('> div > div');
//         new_posX_design = e.clientX - ($(this).offset().left);
//         new_posY_design = e.clientY - ($(this).offset().top - scrollY);
//         to_move.css({ top: new_posY_design, left: new_posX_design });
//         setTimeout(() => {
//             to_move.addClass('trans-0');
//         }, 300);
//     },
//     mouseleave: function (e) {
//         $(this).removeClass('move');
//         new_posX_design = e.clientX - ($(this).offset().left);
//         new_posY_design = e.clientY - ($(this).offset().top - scrollY);
//         to_move.removeClass('trans-0');
//         setTimeout(() => {
//             to_move.removeClass('trans-0');
//         }, 300);
//         // to_move.css({top: new_posY_design, left: '54%'});
//         to_move.css({ top: '30%', left: '54%' });
//     }
// });

// Custom left design shadows

$('.left-design > div > div').on({
    click: function () {
        var randomColor = getRandomColor();
        // Invert the color
        // var hexColor = randomColor.replace("#", "");
        // const decimalColor = parseInt(hexColor, 16);
        // const invertedColor = 255 - decimalColor;
        // const invertedHexColor = (invertedColor.toString(16) + '000000').slice(2, 8);
        // var randomColorInverted = "#" + invertedHexColor;
        $(this).css({ '--_shadowColor': randomColor });
    },
});

/**
 * Create pionts circle
 */

function drawSpongedCircle(ELEM) {
    let ground = ELEM, D = ground.width(), r = D / 2,
        dotsNum = 40, // Number of dots to create
        unitAngle = 360 / dotsNum,
        currentAngle;

    for (let point = 1; point <= dotsNum; point++) {
        let x, y, offsetLeft, offsetTop, left, top;

        currentAngle = unitAngle * point;
        x = r * Math.cos(currentAngle * Math.PI / 180);
        y = r * Math.sin(currentAngle * Math.PI / 180);
        offsetLeft = r + x;
        offsetTop = r - y;
        // Set css top and left
        left = (offsetLeft * 100) / D;
        top = (offsetTop * 100) / D;
        // Create a dot element to add
        let myDot = document.createElement('div');
        myDot.classList.add('a-sponge');
        myDot.style.left = left + '%';
        myDot.style.top = top + '%';
        // Add dot
        ground.append(myDot);
    }
}
drawSpongedCircle($('.sponged-circ'));

// Sponged sides
// function drawSpongedSides(ELEM) {
//     let ground = ELEM, D = ground.width(), r = D / 2,
//         dotsNum = 40, // Number of dots to create
//         unitAngle = 360 / dotsNum,
//         currentAngle;

//     for (let point = 1; point <= dotsNum; point++) {
//         let x, y, offsetLeft, offsetTop, left, top;

//         currentAngle = unitAngle * point;
//         x = r * Math.cos(currentAngle * Math.PI / 180);
//         y = r * Math.sin(currentAngle * Math.PI / 180);
//         // offsetLeft = r + x;
//         // offsetTop = r - y;
//         // Set css top and left
//         // left = (offsetLeft * 100) / D;
//         // top = (offsetTop * 100) / D;
//         // x > 0 ? left = 100 : left = 0;
//         // y > 0 ? top = 0 : top = 1000;

//         // if (y > 0) {
//         //     top = (offsetTop * 100) / D;
//         // }
//         // Create a dot element to add
//         let myDot = document.createElement('div');
//         myDot.classList.add('a-sponge');
//         myDot.style.left = left + '%';
//         myDot.style.top = top + '%';
//         // Add dot
//         ground.append(myDot);
//     }
// }
// drawSpongedSides($('.sponged-rect'));

/**
 * Go to current season all songs
 */

// $('.recommended_S > li:last-child').click(function () {
//     $('.crntSeason > div:last-of-type > button').click();
// });

/**
 * Show notification by swiping on navbar
 */

var y_cord,
    moving_object = webNotifications,
    can_expand,
    can_expand_conf;

$('.Holy_Mass_Songs nav').on({
    touchstart: function (e) {
        if ($(this).is(e.target) || $(this).has(e.target.length)) {
            can_expand = true;
            $('body').addClass('overf-hide');
            y_cord = e.originalEvent.touches[0].clientY;
        }
    }
});
$('.Holy_Mass_Songs nav').on({
    touchmove: function (e) {
        if (can_expand) {
            var y_cord_then = e.touches[0].clientY;
            var y_move_diff = Math.abs(y_cord_then - y_cord);
            var movingBottom = winHei - y_move_diff - 15;
            moving_object.css({ bottom: movingBottom });
            if ((y_cord_then > y_cord) && ((y_cord_then - 30) > y_cord)) {
                moving_object.collapse('show');
                can_expand_conf = false;
            }
            if ((y_cord_then > y_cord) && ((y_cord_then - 150) > y_cord)) {
                can_expand_conf = true;
            }
        }
    },
    touchend: function (e) {
        $('body').removeClass('overf-hide');
        if (can_expand_conf) {
            moving_object.css({ bottom: '0' }).addClass('trans-p3s');
            setTimeout(() => {
                moving_object.removeClass('trans-p3s');
            }, 500);
        }
        else {
            hide_Notif();
            setTimeout(() => {
                moving_object.css({ bottom: '0' });
            }, 500);
        }
    }
});

let galleryFilter_avb = false,
    S_JUMPER_avb = false,
    audioSection_avb = false;
document.onscroll = function () {
    var S_JUMPER = $('#Section_Jumper');
    (S_JUMPER.length > 0) && (S_JUMPER_avb = true)
    if (S_JUMPER_avb) {
        if (S_JUMPER.parent().offset().top < (scrollY + 60)) {
            S_JUMPER.addClass('JumpTo bg-myBlue1 text-light');
            if ($(window).width() < 576) {
                S_JUMPER.removeClass('bg-myBlue1 text-light').addClass('floated');
                S_JUMPER.html('<span class="fa fa-indent"></span>');
            }
        }
        else if (S_JUMPER.parent().offset().top > (scrollY + 60)) {
            S_JUMPER.removeClass('JumpTo bg-myBlue1 text-light');
            if ($(window).width() < 576) {
                S_JUMPER.removeClass('floated');
                S_JUMPER.html('Jump to');
            }
        }
    }
    // Float playing audio
    var audioSection = $('.our-songs__media-player');
    let audios = document.querySelectorAll('audio'), allPaused = false;
    (audioSection.length > 0) && (audioSection_avb = true)
    if (audioSection_avb) {
        var audioSection_posit_Bottom = audioSection.offset().top - (scrollY + winHei),
            style_playing_NM = $('.current-music-player .music-name').text();
        Array.from(audios).every(el => {
            if (el.paused) {
                allPaused = true;
            }
        });
        if (audioSection_posit_Bottom > 1 && !allPaused) {
            float_playing_audio();
            $('.floating-audio .floating-item_icon-tools .media-play-pause-icon').removeClass('fa-play').addClass('fa-pause');
            $('.floating-audio .floating-item_details-name').html(style_playing_NM);
        }
        else {
            hide_floated_audio();
        }
    }
    // var styleSection = $('#styleSection');
    // (styleSection.length > 0) && (styleSection_avb = true)
    // if (styleSection_avb) {
    //     var styleSection_posit_Bottom = styleSection.offset().top - (scrollY + winHei),
    //         style_stopper = $('#styleStopper'),
    //         style_playing_NM = $('.corresMediaPlaying > div > span:first-child').text(),
    //         styles_playing = $('.style_CAT').find('.corresMediaPlaying').length;
    //     if (styleSection_posit_Bottom > 1 && styles_playing > 0) {
    //         style_stopper.fadeIn();
    //         $('.sty_playing_name').html(style_playing_NM);
    //     }
    //     else {
    //         style_stopper.fadeOut();
    //     }
    // }
    var emptyLink = sCatWrapper.find('[href=""]');
    // var emptyLinks_Num = sCatWrapper.find('[href=""]').length;
    emptyLink.parents('.SongElement').addClass('bg-dark').css({ pointerEvents: 'none' });
    // Floating galrFilter
    (esgGalrFilterBTN.length > 0) && (galleryFilter_avb = true)
    if (galleryFilter_avb) {
        var filterPosit = $('.esgGallery-categories')[0].offsetTop - scrollY;
        if (filterPosit < 0) {
            esgGalrFilterBTN.addClass('sticking');
            if ($(window).width() < 576) {
                esgGalrFilterBTN.html('<span class="fa fa-search"></span>');
                esgGalrFilterBTN.addClass('ios-assistive-touch-toggler');

                // Repositioning esgGalrFilterBTN
                esgGalrFilterBTN.on({
                    touchstart: function () {
                        iOSicon = $(this);
                        iOS_size = iOSicon.outerWidth();
                        iOS_midSize = iOS_size / 2;
                        iOS_bigOffset = (winWid - 5 - iOS_size);
                        iOSicon.removeClass('NewTop').addClass('trans-0 touched');
                        bodi.addClass('overf-hide');
                    },
                    touchmove: function (e) {
                        iOS_x2 = e.originalEvent.touches[0].clientX;
                        iOS_y2 = e.originalEvent.touches[0].clientY;
                        if ((iOS_y2 - iOS_midSize) < 45) {
                            iOS_y2 = (iOS_midSize + 45);
                        }
                        var top = iOS_y2 - iOS_midSize,
                            left = iOS_x2 - iOS_midSize;
                        iOSicon.css({ top: top, left: left });
                    },
                    touchend: function () {
                        iOSicon.removeClass('trans-0');
                        bodi.removeClass('overf-hide');
                        if (iOS_x2 == undefined) {
                            var newLeft = iOS_bigOffset,
                                newRight = iOS_smallOffset;
                        }
                        if (iOS_x2 <= (winWid / 2)) {
                            var newLeft = iOS_smallOffset,
                                newRight = iOS_bigOffset;
                        }
                        else {
                            var newLeft = iOS_bigOffset,
                                newRight = iOS_smallOffset;
                        }
                        iOSicon.css({ left: newLeft, right: newRight });
                    }
                });
            }
        }
        else {
            esgGalrFilterBTN.removeClass('ios-assistive-touch-toggler sticking clicked');
            esgGalrFilterBTN.html('Find');
            if (galleryFilter.hasClass('sticking')) {
                galleryFilter.removeClass('sticking');
                esgGalrFilterBG.fadeOut();
            }
        }
    }
}

/**
 * Share a book
 */

$('.shareBook').click(function (e) {
    var the_link = $(this).next().attr('href'),
        the_name = $(this).parents('.book-tools').prev().text().trim(),
        getMore = 'You can get more documents like this from ESG website throught the link below',
        getMoreLink = document.location.href;
    e.preventDefault();
    navigator.clipboard.writeText('Catholic Litury document\n\n' + the_name + '\n' + the_link + '\n\n' + getMore + '\n\n' + getMoreLink).then(() => { });
    navigator.share({
        title: the_name,
        text: 'Catholic Litury document\n\n' + the_name + '\n\n',
        url: the_link
    }).then(() => console.log('Successful share')).catch(error => alert('Error sharing:', error));
});

/**
 * Select a recommended song
 */

$(document).click(function (e) {
    var recommended = $('.recommended_S'),
        theSong = $('.recommended_S > li:not(:last-child, :nth-last-child(2))'),
        get_recommended = $('.recommended_S > button');
    $.each(theSong, function () {
        if ($(this).is(e.target)) {
            $(this).addClass('getThis').siblings().removeClass('getThis');
            get_recommended.addClass('ready');
        }
        else if (not_targeted(e, recommended)) {
            theSong.removeClass('getThis');
            get_recommended.removeClass('ready');
        }
    });
});

/**
 * Download a recommended song
 */

// $('.recommended_S > button').on({
//     click: function () {
//         var theSong_OK = $('.getThis').text().toLowerCase(),
//             theSong_container = $('#SongsList li').find('div:icontains(' + theSong_OK + ')'),
//             Checker = $('*.SongElement');
//         theSong_container.find('a')[0].click();
//         Checker.removeClass('Sselected');
//         $('#SDownloader').css({ visibility: 'hidden' });
//         setTimeout(() => {
//             theSong.removeClass('getThis');
//             get_recommended.removeClass('ready');
//         }, 500);
//     }
// });

/**
 * Show song clarification notification
 */

$('.S_clarify').click(function () {
    show_notifications();
    $('.Notif_Elem-clarify').addClass('lighten');
    setTimeout(() => {
        $('.Notif_Elem-clarify').removeClass('lighten');
    }, 3500);
    $('.Notif_Elem-clarify').find('.Notif_XPND')[0].click();
    $('.Notifs_1').scrollTop($('.Notif_Elem-clarify').position().top - 50);
    // $('.Notifs_1').animate({scrollTop: $('.Notif_Elem-clarify').position().top - 50});
});

/**
 * Login and signup
 */

$('#Signer').click(SignUP);
$('#LOGGER , #CancelSIGNbtn').click(LogIN);
$('#SignUpClose').click(CancelLogin);
function LogIN() {
    $('#SignUp').animate({ left: "100%", opacity: "0" }, 300).css("display", "none");
    $('#LogIn').animate({ left: "0%", opacity: "1" }, 300).css("display", "block");
}

function SignUP() {
    $('#LogIn').animate({ left: "-100%", opacity: "0" }, 300).css("display", "none");
    $('#SignUp').animate({ left: "0%", opacity: "1" }, 300).css("display", "block");
}

function CancelLogin() {
    $('#Users').collapse('hide');
    setTimeout(function () {
        $('#SignUp').css({ left: "100%", opacity: "0", "display": "none" });
        $('#LogIn').css({ left: "0%", opacity: "1", "display": "block" });
    }, 1000);
}

$('#AcceptTrms').click(function () {
    if (this.checked) {
        $('.termsANDc').css("display", "block");
        $('#ConfirmSIGNbtn').removeClass("disabled").css("pointerEvents", "all");
    }
    else {
        $('.termsANDc').css("display", "none");
        $('#ConfirmSIGNbtn').addClass("disabled").css("pointerEvents", "none");
    }
});

$('#UserPW , #UserPW1').on({
    blur: function () {
        var PW1 = $('#UserPW').val();
        var PW2 = $('#UserPW1').val();
        if (PW1 !== "" && PW2 !== "" && PW2 === PW1) {
            $('#UserPW , #UserPW1').css({ backgroundColor: "white", color: "black" });
        }
        else if (PW1 !== "" && PW2 !== "" && PW2 !== PW1) {
            $(this).css({ backgroundColor: "#ffcc6e", color: "black" });
            $('.PassVerifier').fadeIn();
            $('.PassVerifier >p').html("The password do not match.");
        }
    }
});

$('#UserPW').on({
    keyup: function () {
        var PW1 = $('#UserPW').val();
        var PW2 = $('#UserPW1').val();
        if (PW2 !== PW1 && PW2 !== "") {
            $('#UserPW').css({ backgroundColor: "#ffcc6e", color: "white" });
            $('.PassVerifier').fadeIn();
            $('.PassVerifier >p').html("The password do not match.");
        }
        else {
            $('#UserPW , #UserPW').css({ backgroundColor: "white", color: "black" });
            $('.PassVerifier').fadeOut();
        }
    },
    blur: function () {
        var PW1 = $('#UserPW').val();
        var PW2 = $('#UserPW1').val();
        if (PW1 === "" && PW2 !== "") {
            $('#UserPW1').css({ backgroundColor: "#ffcc6e", color: "black" });
            $('.PassVerifier').fadeIn();
            $('.PassVerifier >p').html("Please input the password to confirm.");
        }
        else {
            $('#UserPW , #UserPW').css({ backgroundColor: "white", color: "black" });
            setTimeout(function () {
                $('.PassVerifier').fadeOut();
            }, 2000);
        }
    }
});

$('#UserPW1').on({
    keyup: function () {
        var PW1 = $('#UserPW').val();
        var PW2 = $('#UserPW1').val();
        if (PW2 !== PW1 && PW1 !== "") {
            $('#UserPW1').css({ backgroundColor: "#ffcc6e", color: "white" });
        }
        else {
            $('#UserPW1').css({ backgroundColor: "white", color: "black" });
            $('.PassVerifier').fadeOut();
        }
    },
    blur: function () {
        var PW1 = $('#UserPW').val();
        var PW2 = $('#UserPW1').val();

        if (PW1 !== "" && PW2 === "") {
            $('#UserPW1').css({ backgroundColor: "#ffcc6e", color: "black" });
            $('.PassVerifier').fadeIn();
            $('.PassVerifier >p').html("Please input the password to confirm.");
        }
        else {
            $('#UserPW , #UserPW1').css({ backgroundColor: "white", color: "black" });
            setTimeout(function () {
                $('.PassVerifier').fadeOut();
            }, 2000);
        }
    }
});

/**
 * Manage Push notifications
 */

// $('#allowPushNotif').click(function () {
//     if (!('serviceWorker' in navigator)) {
//         console.log('Push not supported');
//         return;
//     }
//     else {
//         console.log('Push is supported');
//     }
// });
// $('#denyPushNotif').click(function () {
//     if (!('serviceWorker' in window)) {
//         console.log('Push not supported');
//         return;
//     }
//     else {
//         console.log('Push is supported');
//     }
// });

$('#ScrollTP').click(function () {
    $(document).scrollTop(0);
});

// Horizontal grids controller
$('.h-grids-controller > button').click(function () {
    let dis = $(this),
        nth = dis.index() + 1,
        identifyer = dis.parent().attr('id'); // Must be id
    activate(dis);
    $('[data-scrolledby="' + identifyer + '"]').find('> *:nth-child(' + nth + ')').fadeIn().removeClass('w-0').addClass('offset-sm-1 col-sm-10');
    $('[data-scrolledby="' + identifyer + '"]').find('> *:nth-child(' + nth + ')').siblings().removeClass('offset-sm-1 col-sm-10').addClass('w-0');
});

/**
 * Count elapsed time from a specific date in the past
 */

function count_elapsed_time(desiredDate, outPut) {
    let date = new Date(desiredDate),
        dateMon = date.getMonth() + 1,
        days_diff = dateStr.getTime() - date.getTime(),
        miliSEC_Day = 1000 * 3600 * 24,
        miliSEC_Week = (1000 * 3600 * 24) * 7,
        miliSEC_Month = (1000 * 3600 * 24) * 30,
        miliSEC_Year = (1000 * 3600 * 24) * 356,

        yearsEllapsed = days_diff / miliSEC_Year,
        monthsEllapsed = days_diff / miliSEC_Month,
        weeksEllapsed = days_diff / miliSEC_Week,
        daysEllapsed = days_diff / miliSEC_Day,
        timeEllapsed,
        theCount;

    if ((yearsEllapsed) >= 1) {
        timeEllapsed = Math.floor((yearsEllapsed));
        theCount = " • " + timeEllapsed + " year ago";
        if ((yearsEllapsed) >= 2) {
            theCount = " • " + timeEllapsed + " years ago";
        }
    }
    else if ((monthsEllapsed) >= 1) {
        timeEllapsed = Math.floor((monthsEllapsed));
        theCount = " • a month ago";
        if ((monthsEllapsed) >= 2) {
            theCount = " • " + timeEllapsed + " months ago"
        }
    }
    else if ((weeksEllapsed) >= 1) {
        timeEllapsed = Math.floor((weeksEllapsed));
        theCount = " • a week ago"
        if ((weeksEllapsed) >= 2) {
            theCount = " • " + timeEllapsed + " weeks ago"
            if ((weeksEllapsed) > 4 && (weeksEllapsed) < 5) {
                theCount = " • on " + date.getDate() + "/" + dateMon;
            }
        }
    }
    else if ((daysEllapsed) >= 1) {
        timeEllapsed = Math.floor((daysEllapsed));
        if ((daysEllapsed) > 2) {
            theCount = " • " + timeEllapsed + " days ago"
        }
        else if (2 <= daysEllapsed < 3) {
            theCount = "• Yesterday";
        }
    }
    else {
        theCount = "• Today";
    }
    outPut.html(theCount);
}

$('.daySPC').click(function () {
    var DEdayfound = $(this).parents('.month-body').next().find('h6:contains(Special activity)').next();
    DEdayfound.addClass('daySPCfound');
    clearTimeout(timeOutDuration);
    timeOutDuration = setTimeout(() => {
        DEdayfound.removeClass('daySPCfound');
    }, 5000);
});
$('.daySPC').parents('.MonSchedule').prev().append('<div class="monSPCindicator" title="Special month">♫</div>');
$('.daySPC').parents('.MonSchedule').addClass('monthSPC');

/**
 * Dynamic needle watch
 */

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    month = monthNames[month_str],
    dayNames = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    day = dayNames[current_day - 1];
$('.clock .sec_stick').css({ transform: 'rotateZ(' + (current_sec * 6) + 'deg)', transformOrigin: '50% 100%' });
$('.clock .min_stick').css({ transform: 'rotateZ(' + (current_minute * 6) + 'deg)', transformOrigin: '50% 100%' });
$('.clock .hrs_stick').css({ transform: 'rotateZ(' + ((current_hour + current_minute / 60) * 30) + 'deg)', transformOrigin: '50% 100%' });

function animate_needle_watch() {
    // const month = new Date().toLocaleDateString();
    // const month = new Date().toLocaleString();
    // const month = new Date().toLocaleString('default', {month: 'short'});
    const time = new Date(),
        year = new Date().getFullYear(),
        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        month = monthNames[time.getMonth()],
        date = new Date().getDate(),
        dayNames = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
        day = dayNames[time.getDay() - 1],
        hrs = new Date().getHours(),
        mins = new Date().getMinutes(),
        sec = new Date().getSeconds();
    $('.clock .sec_stick').css({ transform: 'rotateZ(' + (sec * 6) + 'deg)', transformOrigin: '50% 100%' });
    $('.clock .min_stick').css({ transform: 'rotateZ(' + (mins * 6) + 'deg)', transformOrigin: '50% 100%' });
    $('.clock .hrs_stick').css({ transform: 'rotateZ(' + ((hrs + mins / 60) * 30) + 'deg)', transformOrigin: '50% 100%' });
}
setInterval(animate_needle_watch, 1000);

/**
 * Liturgical calendar details
 */

const liturgicalCalendar =
{
    January:
        [
            { day: 1, dayInfo: "STE MARIE, MÈRE DE DIEU (Solennité)", dayLectures: "Nb 6, 22-27 ; Ga 4, 4-7 ; Lc 2, 16-21" },
            { day: 2, dayInfo: "St Basile le Grand et St Grégoire de Nazianze évêques et docteurs de l'Église (Mémoire)", dayLectures: "1 Jn 2, 22-28 ; Jn 1, 19-28" },
            { day: 3, dayInfo: "De la férie au temps de Noël ; ou St Nom de Jésus ; ou, en France, Ste Geneviève, vierge", dayLectures: "Dn 7, 15-27 ; Lc 21, 34-36" },
            { day: 4, dayInfo: "De la férie au temps de Noël", dayLectures: "1 Jn 3, 7-10 ; Jn 1, 35-42" },
            { day: 5, dayInfo: "De la férie au temps de Noël", dayLectures: "1 Jn 3, 11-21 ; Jn 1, 43-5" },
            { day: 6, dayInfo: "De la férie au temps de Noël", dayLectures: "1 Jn 5, 5-13 ; Mc 1, 7-11 (ou Lc 3, 23-38)" },
            { day: 7, dayInfo: "ÉPIPHANIE DU SEIGNEUR (Solennité) (Psautier semaine I)", dayLectures: "Is 60, 1-6 ; Ep 3, 2-3a.5-6 ; Mt 2, 1-12" },
            { day: 8, dayInfo: "Baptême du Seigneur (Fête)", dayLectures: "Is 55, 1-11 ; 1 Jn 5, 1-9 ; Mc 1, 7-11" },
            { day: 9, dayInfo: "De la férie", dayLectures: "1 S 1, 9-20 ; Mc 1, 21-28" },
            { day: 10, dayInfo: "De la férie", dayLectures: "1 S 3, 1-10.19-20 ; Mc 1, 29-39" },
            { day: 11, dayInfo: "De la férie", dayLectures: "1 S 4, 1b-11 ; Mc 1, 40-45" },
            { day: 12, dayInfo: "De la férie", dayLectures: "1 S 8, 4-7.10-22a ; Mc 2, 1-12" },
            { day: 13, dayInfo: "De la férie ; ou St Hilaire, évêque et docteur de l'Église ; ou Bse Vierge Marie", dayLectures: "1 S 9, 1-4.10c.17-19; 10, 1 ; Mc 2, 13-17" },
            { day: 14, dayInfo: "2e DIMANCHE DU TEMPS ORDINAIRE (Ps. sem. II)", dayLectures: "1 S 3, 3b-10.19 ; 1 Co 6, 13c-15a.17-20 ; Jn 1, 35-42" },
            { day: 15, dayInfo: "De la férie ; ou, en France, St Remi, évêque", dayLectures: "1 S 15, 16-23 ; Mc 2, 18-22" },
            { day: 16, dayInfo: "De la férie", dayLectures: "1 S 16, 1-13 ; Mc 2, 23-28" },
            { day: 17, dayInfo: "St Antoine, abbé (Mémoire)", dayLectures: "1 S 17, 32-33.37.40-51 ; Mc 3, 1-6" },
            { day: 18, dayInfo: "De la férie", dayLectures: "1 S 18, 6-9 ; 19, 1-7 ; Mc 3, 7-12" },
            { day: 19, dayInfo: "De la férie", dayLectures: "1 S 24, 3-21 ; Mc 3, 13-19" },
            { day: 20, dayInfo: "De la férie ; ou St Fabien, pape et martyr ; ou St Sébastien, martyr ; ou Bse Vierge Marie", dayLectures: "2 S 1, 1-4.11-12.19.23-27 ; Mc 3, 20-21" },
            { day: 21, dayInfo: "3e DIMANCHE DU TEMPS ORDINAIRE (Ps semaine III)", dayLectures: "Jon 3, 1-5.10 ; 1 Co 7, 29-31 ; Mc 1, 14-20" },
            { day: 22, dayInfo: "De la férie ; ou St Vincent, diacre martyr", dayLectures: "2 S 5, 1-7.10 ; Mc 3, 22-30" },
            { day: 23, dayInfo: "De la férie", dayLectures: "2 S 6, 12b-15.17-19 ; Mc 3, 31-35" },
            { day: 24, dayInfo: "St François de Sales, évêque et docteur de l'Église (Mémoire)", dayLectures: "2 S 7, 4-17 ; Mc 4, 1-20" },
            { day: 25, dayInfo: "La conversion de St Paul, apôtre (Fête)", dayLectures: "Ac 22, 3-16 (ou Ac 9, 1-22) ; Mc 16, 15-18" },
            { day: 26, dayInfo: "St Timothée et St Tite, évêques (Mémoire)", dayLectures: "2 Tm 1, 1-8 (ou Tt 1, 1-5) ; Lc 10, 1-9" },
            { day: 27, dayInfo: "De la férie ; ou Ste Angèle Merici, vierge ; ou Bse Vierge Marie", dayLectures: "2 S 12, 1-7a.10-17 ; Mc 4, 35-41" },
            { day: 28, dayInfo: "4e DIMANCHE DU TEMPS ORDINAIRE (Ps semaine IV)", dayLectures: "Dt 18, 15-20 ; 1 Co 7, 32-35 ; Mc 1, 21-28" },
            { day: 29, dayInfo: "De la férie", dayLectures: "2 S 15, 13-14.30; 16, 5-13a ; Mc 5, 1-20" },
            { day: 30, dayInfo: "De la férie", dayLectures: "2 S 18, 9-10.14b.24-25a.30 _ 19,4 ; Mc 5, 21-43" },
            { day: 31, dayInfo: "St Jean Bosco, prêtre (Mémoire)", dayLectures: "2 S 24, 2.9-17 ; Mc 6, 1-6" },
        ],
    February:
        [
            { day: 1, dayInfo: "De la férie", dayLectures: "1 R 2, 1-4.10-12 ; Mc 6, 7-13" },
            { day: 2, dayInfo: "Présentation du Seigneur au Temple (Fête)", dayLectures: "Ml 3, 1-4 (ou He 2, 14-18) ; Lc 2, 22-40" },
            { day: 3, dayInfo: "De la férie ; ou St Blaise, évêque et martyr ; ou St Anschaire, martyr ; ou Bse Vierge Marie", dayLectures: "1 R 3, 4-13 ; Mc 6, 30-34" },
            { day: 4, dayInfo: "5e DIMANCHE DU TEMPS ORDINAIRE (Ps. sem. I)", dayLectures: "Jb 7, 1-4.6-7 ; 1 Co 9, 16-19.22-23 ; Mc 1, 29-39" },
            { day: 5, dayInfo: "Ste Agathe, vierge et martyre (Mémoire)", dayLectures: "1 R 8, 1-7.9-13 ; Mc 6, 53-56" },
            { day: 6, dayInfo: "St Paul Miki et ses compagnons, martyrs (Mémoire)", dayLectures: "1 R 8, 22-23.27-30 ; Mc 7, 1-13" },
            { day: 7, dayInfo: "De la férie", dayLectures: "1 R 10, 1-10 ; Mc 7, 14-23" },
            { day: 8, dayInfo: "De la férie ; ou St Jérôme Émilien ; ou Ste Joséphine Bakhita, vierge", dayLectures: "1 R 11, 4-13 ; Mc 7, 24-30" },
            { day: 9, dayInfo: "De la férie", dayLectures: "1 R 11, 29-32; 12,19 ; Mc 7,31-37" },
            { day: 10, dayInfo: "Ste Scholastique, vierge (Mémoire)", dayLectures: "1 R 12, 26-32; 13, 33-34 ; Mc 8, 1-10" },
            { day: 11, dayInfo: "6e DIMANCHE DU TEMPS ORDINAIRE (Ps. sem. II)", dayLectures: "Lv 13, 1-2.45-46 ; 1 Co 10, 31 _ 11, 1 ; Mc 1, 40-45" },
            { day: 12, dayInfo: "De la férie", dayLectures: "Jc 1, 1-11 ; Mc 8, 11-13" },
            { day: 13, dayInfo: "De la férie", dayLectures: "Jc 1, 12-18 ; Mc 8, 14-21" },
            { day: 14, dayInfo: "MERCREDI DES CENDRES (Psautier semaine IV)", dayLectures: "Jl 2, 12-18 ; 2 Co 5, 20 _ 6, 2 ; Mt 6, 1-6.16-18" },
            { day: 15, dayInfo: "De la férie", dayLectures: "Dt 30, 15-20 ; Lc 9, 22-25" },
            { day: 16, dayInfo: "De la férie", dayLectures: "Is 58, 1-9a ; Mt 9, 14-15" },
            { day: 17, dayInfo: "De la férie (Les sept saints fondateurs de l'Ordre des Servites de Marie)", dayLectures: "Is 58, 9b-14 ; Lc 5, 27-32" },
            { day: 18, dayInfo: "1er DIMANCHE DE CARÊME (Psautier semaine I)", dayLectures: "Gn 9, 8-15 ; 1 P 3, 18-22 ; Mc 1, 12-15" },
            { day: 19, dayInfo: "De la férie", dayLectures: "Lv 19, 1-2.11-18 ; Mt 25, 31-46" },
            { day: 20, dayInfo: "De la férie", dayLectures: "Is 55, 10-11 ; Mt 6, 7-15" },
            { day: 21, dayInfo: "De la férie (St Pierre Damien, évêque et docteur de l'Église)", dayLectures: "Jon 3, 1-10 ; Lc 11, 29-32" },
            { day: 22, dayInfo: "Chaire de St Pierre, Apôtre (Fête)", dayLectures: "1 P 5, 1-4 ; Mt 16, 13-19" },
            { day: 23, dayInfo: "De la férie (St Polycarpe, évêque et martyr)", dayLectures: "Ez 18, 21-28 ; Mt 5, 20-26" },
            { day: 24, dayInfo: "De la férie", dayLectures: "Dt 26, 16-19 ; Mt 5, 43-48" },
            { day: 25, dayInfo: "2e DIMANCHE DE CARÊME (Psautier semaine II)", dayLectures: "Gn 22, 1-2.9-13.15-18 ; Rm 8, 31b-34 ; Mc 9, 2-10" },
            { day: 26, dayInfo: "De la férie", dayLectures: "Dn 9, 4-10 ; Lc 6, 36-38" },
            { day: 27, dayInfo: "De la férie (St Grégoire de Narek, abbé et docteur de l'Église)", dayLectures: "Is 1, 10.16-20 ; Mt 23, 1-12" },
            { day: 28, dayInfo: "De la férie", dayLectures: "Jr 18, 18-20 ; Mt 20, 17-28" },
            { day: 29, dayInfo: "De la férie", dayLectures: "Jr 17, 5-10 ; Lc 16, 19-31" },
        ],
    March:
        [
            { day: 1, dayInfo: "De la férie", dayLectures: "Gn 37, 3-4.12-13a.17b-28 ; Mt 21, 33-43.45-46" },
            { day: 2, dayInfo: "De la férie", dayLectures: "Mi 7, 14-15.18-20 ; Lc 15, 1-3.11-32" },
            { day: 3, dayInfo: "3e DIMANCHE DE CARÊME (Psautier semaine III)", dayLectures: "Ex 20, 1-17 ; 1 Co 1, 22-25 ; Jn 2, 13-25" },
            { day: 4, dayInfo: "4 De la férie (St Casimir)", dayLectures: "2 R 5, 1-15a ; Lc 4, 24-30" },
            { day: 5, dayInfo: "De la férie", dayLectures: "Dn 3, 25.34-43 ; Mt 18, 21-35" },
            { day: 6, dayInfo: "De la férie", dayLectures: "Dt 4, 1.5-9 ; Mt 5, 17-19" },
            { day: 7, dayInfo: "De la férie (Ste Perpétue et Ste Félicité, martyres)", dayLectures: "Jr 7, 23-28 ; Lc 11, 14-23" },
            { day: 8, dayInfo: "De la férie (St Jean de Dieu, religieux)", dayLectures: "Os 14, 2-10 ; Mc 12, 28b-34" },
            { day: 9, dayInfo: "De la férie (Ste Françoise Romaine, religieuse)", dayLectures: "Os 6, 1-6 ; Lc 18, 9-14" },
            { day: 10, dayInfo: "4e DIMANCHE DE CARÊME (Psautier semaine IV)", dayLectures: "2 Ch 36, 14-16.19-23 ; Ep 2, 4-10 ; Jn 3, 14-21" },
            { day: 11, dayInfo: "De la férie", dayLectures: "Is 65, 17-21 ; Jn 4, 43-54" },
            { day: 12, dayInfo: "De la férie", dayLectures: "Ez 47, 1-9.12 ; Jn 5, 1-16" },
            { day: 13, dayInfo: "De la férie", dayLectures: "Is 49, 8-15 ; Jn 5, 17-30" },
            { day: 14, dayInfo: "De la férie", dayLectures: "Ex 32, 7-14 ; Jn 5, 31-47" },
            { day: 15, dayInfo: "De la férie", dayLectures: "Sg 2, 1a.12-22 ; Jn 7, 1-2.10.14.25-30" },
            { day: 16, dayInfo: "De la férie", dayLectures: "Jr 11, 18-20 ; Jn 7, 40-53" },
            { day: 17, dayInfo: "5e DIMANCHE DE CARÊME (Psautier semaine I)", dayLectures: "Jr 31, 31-34 ; He 5, 7-9 ; Jn 12, 20-33" },
            { day: 18, dayInfo: "De la férie (St Cyrille de Jérusalem, évêque et docteur de l'Église)", dayLectures: "Dn 13, 1-9.15-17.19-30.33-62 ; Jn 8, 1-11" },
            { day: 19, dayInfo: "ST JOSEPH (Solennité)", dayLectures: "2 S 7, 4-5a.12-14a.16 ; Rm 4, 13.16-18.22 ; Mt 1, 16.18-21.24a (ou Lc 2, 41-51a)" },
            { day: 20, dayInfo: "De la férie", dayLectures: "Dn 3, 14-20.91-92.95 ; Jn 8, 31-42" },
            { day: 21, dayInfo: "De la férie", dayLectures: "Gn 17, 3-9 ; Jn 8, 51-59" },
            { day: 22, dayInfo: "De la férie", dayLectures: "Jr 20, 10-13 ; Jn 10, 31-42" },
            { day: 23, dayInfo: "De la férie (St Turibio de Mogrovejo, évêque)", dayLectures: "Ez 37, 21-28 ; Jn 11, 45-57" },
            { day: 24, dayInfo: "DIMANCHE DES RAMEAUX ET DE LA PASSION (Ps. sem. II)", dayLectures: "Is 50, 4-7 ; Ph 2, 6-11 ; Mc 14, 1 _ 15, 47" },
            { day: 25, dayInfo: "Lundi de la Semaine sainte", dayLectures: "Is 42, 1-7 ; Jn 12, 1-11" },
            { day: 26, dayInfo: "Mardi de la Semaine sainte", dayLectures: "Is 49, 1-6 ; Jn 13, 21-33.36-38" },
            { day: 27, dayInfo: "Mercredi de la Semaine sainte", dayLectures: "Is 50, 4-9a ; Mt 26, 14-25" },
            { day: 28, dayInfo: "Jeudi saint : LA CÈNE DU SEIGNEUR", dayLectures: "Ex 12, 1-8.11-14 ; 1 Co 11, 23-26 ; Jn 13, 1-15" },
            { day: 29, dayInfo: "Vendredi saint : LA PASSION DU SEIGNEUR", dayLectures: "Is 52, 13 _ 53, 12 ; He 4, 14-16; 5, 7-9 ; Jn 18, 1 _ 19, 42" },
            { day: 30, dayInfo: "Samedi saint", dayLectures: "Veillée pascale : Gn 1, 1 _ 2, 2 ; Rm 6, 3b-11 ; Mc 16, 1-7" },
            { day: 31, dayInfo: "DIMANCHE DE PÂQUES", dayLectures: "Jour : Ac 10, 34a.37-43 ; Col 3, 1-4 (ou 1 Co 5, 6b-8) ; Jn 20, 1-9" },
        ],
    April:
        [
            { day: 1, dayInfo: "Octave de Pâques", dayLectures: "Ac 2, 14.22b-32 ; Mt 28, 8-15" },
            { day: 2, dayInfo: "Octave de Pâques", dayLectures: "Ac 2, 36-41 ; Jn 20, 11-18" },
            { day: 3, dayInfo: "Octave de Pâques", dayLectures: "Ac 3, 1-10 ; Lc 24, 13-35" },
            { day: 4, dayInfo: "Octave de Pâques", dayLectures: "Ac 3, 11-26 ; Lc 24, 35-48" },
            { day: 5, dayInfo: "Octave de Pâques", dayLectures: "Ac 4, 1-12 ; Jn 21, 1-14" },
            { day: 6, dayInfo: "Octave de Pâques", dayLectures: "Ac 4, 13-21 ; Mc 16, 9-15" },
            { day: 7, dayInfo: "DIMANCHE DE LA DIVINE MISÉRICORDE(Psautier sem. II)", dayLectures: "Ac 4, 32-35 ; 1 Jn 5, 1-6 ; Jn 20, 19-31" },
            { day: 8, dayInfo: "ANNONCIATION DU SEIGNEUR (Solennité)", dayLectures: "Is 7, 10-14; 8, 10 ; He 10, 4-10 ; Lc 1, 26-38" },
            { day: 9, dayInfo: "De la férie", dayLectures: "Ac 4, 32-37 ; Jn 3, 7b-15" },
            { day: 10, dayInfo: "De la férie", dayLectures: "Ac 5, 17-26 ; Jn 3, 16-21" },
            { day: 11, dayInfo: "De la férie ; ou St Stanislas, évêque et martyr", dayLectures: "Ac 5, 27-33 ; Jn 3, 31-36" },
            { day: 12, dayInfo: "De la férie", dayLectures: "Ac 5, 34-42 ; Jn 6, 1-15" },
            { day: 13, dayInfo: "De la férie ; ou St Martin Ier, pape et martyr", dayLectures: "Ac 6, 1-7 ; Jn 6, 16-21" },
            { day: 14, dayInfo: "3e DIMANCHE DE PÂQUES (Psautier semaine III)", dayLectures: "Ac 3, 13-15.17-19 ; 1 Jn 2, 1-5a ; Lc 24, 35-48" },
            { day: 15, dayInfo: "De la férie", dayLectures: "Ac 6, 8-15 ; Jn 6, 22-29" },
            { day: 16, dayInfo: "De la férie", dayLectures: "Ac 7, 51 _ 8, 1a ; Jn 6, 30-35" },
            { day: 17, dayInfo: "De la férie", dayLectures: "Ac 8, 1b-8 ; Jn 6, 35-40" },
            { day: 18, dayInfo: "De la férie", dayLectures: "Ac 8, 26-40 ; Jn 6, 44-51" },
            { day: 19, dayInfo: "De la férie", dayLectures: "Ac 9, 1-20 ; Jn 6, 52-59" },
            { day: 20, dayInfo: "De la férie", dayLectures: "Ac 9, 31-42 ; Jn 6, 60-69" },
            { day: 21, dayInfo: "4e DIMANCHE DE PÂQUES (Psautier semaine IV)", dayLectures: "Ac 4, 8-12 ; 1 Jn 3, 1-2 ; Jn 10, 11-18" },
            { day: 22, dayInfo: "De la férie", dayLectures: "Ac 11, 1-18 ; Jn 10, 1-10" },
            { day: 23, dayInfo: "De la férie ; ou St Georges, martyr ; ou St Adalbert de Prague, évêque et martyr", dayLectures: "Ac 11, 19-26 ; Jn 10, 22-30" },
            { day: 24, dayInfo: "De la férie ; ou St Fidèle de Sigmaringen, prêtre et martyr", dayLectures: "Ac 12, 24 _ 13, 5 ; Jn 12, 44-50" },
            { day: 25, dayInfo: "St Marc, évangéliste (Fête)", dayLectures: "1 P 5, 5b-14 ; Mc 16, 15-20" },
            { day: 26, dayInfo: "De la férie", dayLectures: "Ac 13, 26-33 ; Jn 14, 1-6" },
            { day: 27, dayInfo: "De la férie", dayLectures: "Ac 13, 44-52 ; Jn 14, 7-14" },
            { day: 28, dayInfo: "5e DIMANCHE DE PÂQUES (Psautier semaine I)", dayLectures: "Ac 9, 26-31 ; 1 Jn 3, 18-24 ; Jn 15, 1-8" },
            { day: 29, dayInfo: "Ste Catherine de Sienne, vierge et docteur e l'Église, copatronne de l'Europe (Fête)", dayLectures: "1 Jn 1, 5 _ 2, 2 ; Mt 11, 25-30" },
            { day: 30, dayInfo: "De la férie ; ou St Pie V, pape", dayLectures: "Ac 14, 19-28 ; Jn 14, 27-31a" },
        ],
    May:
        [
            { day: 1, dayInfo: "De la férie ; ou St Joseph, travailleur", dayLectures: "Ac 15, 1-6 ; Jn 15, 1-8" },
            { day: 2, dayInfo: "St Athanase, évêque et docteur de l'Église (Mémoire)", dayLectures: "Ac 15, 7-21 ; Jn 15, 9-11" },
            { day: 3, dayInfo: "St Philippe et St Jacques, Apôtres (Fête)", dayLectures: "1 Co 15, 1-8 ; Jn 14, 6-14" },
            { day: 4, dayInfo: "De la férie", dayLectures: "Ac 16, 1-10 ; Jn 15, 18-21" },
            { day: 5, dayInfo: "6e DIMANCHE DE PÂQUES (Psautier semaine II", dayLectures: "Ac 10, 25-26.34-35.44-48 ; 1 Jn 4, 7-10 ; Jn 15, 9-17" },
            { day: 6, dayInfo: "De la férie", dayLectures: "Ac 16, 11-15 ; Jn 15, 26 _ 16, 4a" },
            { day: 7, dayInfo: "De la férie", dayLectures: "Ac 16, 22-34 ; Jn 16, 5-11" },
            { day: 8, dayInfo: "De la férie", dayLectures: "Ac 17, 15.22 _ 18, 1 ; Jn 16, 12-15" },
            { day: 9, dayInfo: "ASCENSION DU SEIGNEUR (Solennité)", dayLectures: "Ac 1, 1-11 ; Ep 4, 1-13 ; Mc 16, 15-20" },
            { day: 10, dayInfo: "De la férie ; ou St Jean d'Avila, prêtre et docteur de l'Église", dayLectures: "Ac 18, 9-18 ; Jn 16, 20-23a" },
            { day: 11, dayInfo: "De la férie", dayLectures: "Ac 18, 23-28 ; Jn 16, 23b-28" },
            { day: 12, dayInfo: "7e DIMANCHE DE PÂQUES (Psautier semaine III)", dayLectures: "Ac 1, 15-17.20a.20c-26 ; 1 Jn 4, 11-16 ; Jn 17, 11b-19" },
            { day: 13, dayInfo: "De la férie ; ou Bse Vierge Marie de Fatima", dayLectures: "Ac 19, 1-8 ; Jn 16, 29-33" },
            { day: 14, dayInfo: "St Matthias, Apôtre (Fête)", dayLectures: "Ac 1, 15-17.20-26 ; Jn 15, 9-17" },
            { day: 15, dayInfo: "De la férie", dayLectures: "Ac 20, 28-38 ; Jn 17, 11b-19" },
            { day: 16, dayInfo: "De la férie", dayLectures: "Ac 22, 30; 23, 6-11 ; Jn 17, 20-26" },
            { day: 17, dayInfo: "De la férie", dayLectures: "Ac 25, 13-21 ; Jn 21, 15-19" },
            { day: 18, dayInfo: "De la férie ; ou St Jean Ier, pape et martyr", dayLectures: "Ac 28, 16-20.30 ; Jn 21, 20-25" },
            { day: 19, dayInfo: "PENTECÔTE (Solennité) (Psautier semaine III)", dayLectures: "Ac 2, 1-11 ; Ga 5, 16-25 ; Jn 15, 26-27; 16, 12-15" },
            { day: 20, dayInfo: "Bse Vierge Marie, Mère de l'Église (Mémoire)", dayLectures: "Gn 3, 9-15.20 (ou Ac 1, 12-14) ; Jn 19, 25-34" },
            { day: 21, dayInfo: "De la férie ; ou St Christophe Magallanès, prêtre, et ses comp. martyrs", dayLectures: "Jc 4, 1-10 ; Mc 9, 30-37" },
            { day: 22, dayInfo: "De la férie ; ou Ste Rita de Cascia, religieuse", dayLectures: "Jc 4, 13-17 ; Mc 9, 38-40" },
            { day: 23, dayInfo: "De la férie", dayLectures: "Jc 5, 1-6 ; Mc 9, 41-50" },
            { day: 24, dayInfo: "De la férie", dayLectures: "Jc 5, 9-12 ; Mc 10, 1-12" },
            { day: 25, dayInfo: "De la férie ; ou St Bède le Vénérable ; ou St Grégoire VII ou Ste Marie-Madeleine de Pazzi ; ou Bse Vierge Marie;", dayLectures: "Jc 5, 13-20 ; Mc 10, 13-16" },
            { day: 26, dayInfo: "SAINTE TRINITÉ (Solennité) (Psautier semaine IV)", dayLectures: "Dt 4, 32-34.39-40 ; Rm 8, 14-17 ; Mt 28, 16-20" },
            { day: 27, dayInfo: "De la férie ; ou St Augustin de Cantorbéry, évêque", dayLectures: "1 P 1, 3-9 ; Mc 10, 17-27" },
            { day: 28, dayInfo: "De la férie", dayLectures: "1 P 1, 10-16 ; Mc 10, 28-31" },
            { day: 29, dayInfo: "De la férie ; ou St Paul VI, pape", dayLectures: "1 P 1, 18-25 ; Mc 10, 32-45" },
            { day: 30, dayInfo: "De la férie ; ou, en France, Ste Jeanne d'Arc, vierge", dayLectures: "1 P 2, 2-5.9-12 ; Mc 10, 46b-52" },
            { day: 31, dayInfo: "Visitation de la bienheureuse Vierge Marie (Fête)", dayLectures: "So 3, 14-18 (ou Rm 12, 9-16b) ; Lc 1, 39-56" },
        ],
    June:
        [
            { day: 1, dayInfo: "St Justin, martyr (Mémoire)", dayLectures: "Jude 17.20b-25 ; Mc 11, 27-33" },
            { day: 2, dayInfo: "SAINT-SACREMENT (Solennité) (Psautier semaine I)", dayLectures: "Ex 24, 3-8 ; He 9, 11-15 ; Mc 14, 12-16.22-26" },
            { day: 3, dayInfo: "St Charles Lwanga et ses compagnons, martyrs (Mémoire)", dayLectures: "2 P 1, 2-7 ; Mc 12, 1-12" },
            { day: 4, dayInfo: "De la férie ; ou, en France, Ste Clotilde", dayLectures: "2 P 3, 12-15a.17-18 ; Mc 12, 13-17" },
            { day: 5, dayInfo: "St Boniface, évêque et martyr (Mémoire)", dayLectures: "2 Tm 1, 1-3.6-12 ; Mc 12, 18-27" },
            { day: 6, dayInfo: "De la férie ; ou St Norbert, évêque", dayLectures: "2 Tm 2, 8-15 ; Mc 12, 28b-34" },
            { day: 7, dayInfo: "LE SACRÉ-CŒUR DE JÉSUS (Solennité)", dayLectures: "Os 11, 1.3-4.8c-9 ; Ep 3, 8-12.14-19 ; Jn 19, 31-37" },
            { day: 8, dayInfo: "Cœur Immaculé de la bienheureuse Vierge Marie (Mémoire)", dayLectures: "Is 61, 9-11 ; Lc 2, 41-51" },
            { day: 9, dayInfo: "10e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. II)", dayLectures: "Gn 3, 9-15 ; 2 Co 4, 13 _ 5, 1 ; Mc 3, 20-35" },
            { day: 10, dayInfo: "De la férie", dayLectures: "1 R 17, 1-6 ; Mt 5, 1-12" },
            { day: 11, dayInfo: "St Barnabé, Apôtre (Mémoire)", dayLectures: "Ac 11, 21b-26; 13, 1-3 ; Mt 10, 7-13" },
            { day: 12, dayInfo: "De la férie", dayLectures: "1 R 18, 20-39 ; Mt 5, 17-19" },
            { day: 13, dayInfo: "St Antoine de Padoue, prêtre et docteur de l'Église (Mémoire)", dayLectures: "1 R 18, 41-46 ; Mt 5, 20-26" },
            { day: 14, dayInfo: "De la férie", dayLectures: "1 R 19, 9a.11-16 ; Mt 5, 27-32" },
            { day: 15, dayInfo: "De la férie ; ou Bse Vierge Marie", dayLectures: "1 R 19, 19-21; Mt 5, 33-37" },
            { day: 16, dayInfo: "11e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. III)", dayLectures: "Ez 17, 22-24 ; 2 Co 5, 6-10 ; Mc 4, 26-34" },
            { day: 17, dayInfo: "De la férie", dayLectures: "1 R 21, 1-16 ; Mt 5, 38-42" },
            { day: 18, dayInfo: "De la férie", dayLectures: "1 R 21, 17-29 ; Mt 5, 43-48" },
            { day: 19, dayInfo: "De la férie ; ou St Romuald, abbé", dayLectures: "2 R 2, 1.6-14 ; Mt 6, 1-6.16-18" },
            { day: 20, dayInfo: "De la férie", dayLectures: "Si 48, 1-14 ; Mt 6, 7-15" },
            { day: 21, dayInfo: "St Louis de Gonzague, religieux (Mémoire)", dayLectures: "2 R 11, 1-4.9-18.20 ; Mt 6, 19-23" },
            { day: 22, dayInfo: "De la férie ; ou St Jean Fisher, évêque, et St Thomas More, martyrs ; ou St Paulin de Nole, évêque ; ou Bse Vierge Marie", dayLectures: "2 Ch 24, 17-25 ; Mt 6, 24-34" },
            { day: 23, dayInfo: "12e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. IV)", dayLectures: "Jb 38, 1.8-11 ; 2 Co 5, 14-17 ; Mc 4, 35-41" },
            { day: 24, dayInfo: "NATIVITÉ DE ST JEAN BAPTISTE (Solennité)", dayLectures: "Is 49, 1-6 ; Ac 13, 22-26 ; Lc 1, 57-66.80" },
            { day: 25, dayInfo: "De la férie", dayLectures: "2 R 19, 9b-11.14-21.31-35a.36 ; Mt 7, 6.12-14" },
            { day: 26, dayInfo: "De la férie", dayLectures: "2 R 22, 8-13; 23, 1-3 ; Mt 7, 15-20" },
            { day: 27, dayInfo: "De la férie ; ou St Cyrille d'Alexandrie, évêque et docteur de l'Église", dayLectures: "2 R 24, 8-17 ; Mt 7, 21-29" },
            { day: 28, dayInfo: "St Irénée, évêque et martyr (Mémoire)", dayLectures: "2 R 25, 1-12 ; Mt 8, 1-4" },
            { day: 29, dayInfo: "ST PIERRE ET ST PAUL, APÔTRES (Solennité)", dayLectures: "Ac 12, 1-11 ; 2 Tm 4, 6-8.17-18 ; Mt 16, 13-19" },
            { day: 30, dayInfo: "13e DIMANCHE DU TEMPS ORDINAIRE (Ps. sem. I)", dayLectures: "Sg 1, 13-15; 2, 23-24 ; 2 Co 8, 7.9.13-15 ; Mc 5, 21-43" },
        ],
    July:
        [
            { day: 1, dayInfo: "De la férie", dayLectures: "Am 2, 6-10.13-16 ; Mt 8, 18-22" },
            { day: 2, dayInfo: "De la férie", dayLectures: "Am 3, 1-8; 4, 11-12 ; Mt 8, 23-27" },
            { day: 3, dayInfo: "St Thomas, Apôtre (Fête)", dayLectures: "Ep 2, 19-22 ; Jn 20, 24-29" },
            { day: 4, dayInfo: "De la férie ; ou Ste Élisabeth de Portugal", dayLectures: "Am 7, 10-17 ; Mt 9, 1-8" },
            { day: 5, dayInfo: "De la férie ; ou St Antoine-Marie Zaccaria, prêtre", dayLectures: "Am 8, 4-6.9-12 ; Mt 9, 9-13" },
            { day: 6, dayInfo: "De la férie ; ou Ste Maria Goretti, vierge et martyre ; ou Bse Vierge Marie", dayLectures: "Am 9, 11-15 ; Mt 9, 14-17" },
            { day: 7, dayInfo: "14e DIMANCHE DU TEMPS ORDINAIRE (Psautier semaine II)", dayLectures: "Ez 2, 2-5 ; 2 Co 12, 7-10 ; Mc 6, 1-6" },
            { day: 8, dayInfo: "De la férie", dayLectures: "Os 2, 16.17b-18.21-22 ; Mt 9, 18-26" },
            { day: 9, dayInfo: "De la férie ; ou St Augustin Zhao Rong, prêtre, et ses compagnons, martyrs", dayLectures: "Os 8, 4-7.11-13 ; Mt 9, 32-38" },
            { day: 10, dayInfo: "De la férie", dayLectures: "Os 10, 1-3.7-8.12 ; Mt 10, 1-7" },
            { day: 11, dayInfo: "St Benoît, abbé, copatron de l'Europe (Fête)", dayLectures: "Pr 2, 1-9 ; Mt 19, 27-29" },
            { day: 12, dayInfo: "De la férie", dayLectures: "Os 14, 2-10 ; Mt 10, 16-23" },
            { day: 13, dayInfo: "De la férie ; ou St Henri ; ou Bse Vierge Marie", dayLectures: "Is 6, 1-8 ; Mt 10, 24-33" },
            { day: 14, dayInfo: "15e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. III)", dayLectures: "Am 7, 12-15 ; Ep 1, 3-14 ; Mc 6, 7-13" },
            { day: 15, dayInfo: "St Bonaventure, évêque et docteur de l'Église (Mémoire)", dayLectures: "Is 1, 10-17 ; Mt 10, 34 _ 11, 1" },
            { day: 16, dayInfo: "De la férie ; ou Bse Vierge Marie du Mont Carmel", dayLectures: "Is 7, 1-9 ; Mt 11, 20-24" },
            { day: 17, dayInfo: "De la férie", dayLectures: "Is 10, 5-7.13-16 ; Mt 11, 25-27" },
            { day: 18, dayInfo: "De la férie", dayLectures: "Is 26, 7-9.12.16-19 ; Mt 11, 28-30" },
            { day: 19, dayInfo: "De la férie", dayLectures: "Is 38, 1-6.21-22.7-8 ; Mt 12, 1-8" },
            { day: 20, dayInfo: "De la férie ; ou St Apollinaire, évêque et docteur de l'Église ; ou Bse Vierge Marie", dayLectures: "Mi 2, 1-5 ; Mt 12, 14-21" },
            { day: 21, dayInfo: "16e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. IV)", dayLectures: "Jr 23, 1-6 ; Ep 2, 13-18 ; Mc 6, 30-34" },
            { day: 22, dayInfo: "Ste Marie Madeleine (Fête)", dayLectures: "Ct 3, 1-4a (ou 2 Co 5, 14-17) ; Jn 20, 1.11-18" },
            { day: 23, dayInfo: "Ste Brigitte de Suède, religieuse, copatronne de l'Europe (Fête)", dayLectures: "Tb 8, 4b-7 (ou Ga 2, 19-20) ; Mc 3, 31-35 (ou Jn 15, 1-8)" },
            { day: 24, dayInfo: "De la férie ; ou St Charbel Makhlouf, prêtre", dayLectures: "Jr 1, 1.4-10 ; Mt 13, 1-9" },
            { day: 25, dayInfo: "St Jacques, Apôtre (Fête)", dayLectures: "2 Co 4, 7-15 ; Mt 20, 20-28" },
            { day: 26, dayInfo: "Ste Anne et St Joachim, parents de la Bse Vierge Marie (Mémoire)", dayLectures: "Jr 3, 14-17 ; Mt 13, 18-23" },
            { day: 27, dayInfo: "De la férie ; ou Bse Vierge Marie", dayLectures: "Jr 7, 1-11 ; Mt 13, 24-30" },
            { day: 28, dayInfo: "17e DIMANCHE DU TEMPS ORDINAIRE (Psautier semaine I)", dayLectures: "2 R 4, 42-44 ; Ep 4, 1-6 ; Jn 6, 1-15" },
            { day: 29, dayInfo: "Ste Marthe, Ste Marie et St Lazare (Mémoire)", dayLectures: "1 Jn 4, 7-16 ; Lc 10, 38-42 (ou Jn 11, 19-27)" },
            { day: 30, dayInfo: "De la férie ; ou St Pierre Chrysologue, évêque et docteur de l'Église", dayLectures: "Jr 14, 17-22 ; Mt 13, 36-43" },
            { day: 31, dayInfo: "St Ignace de Loyola, prêtre (Mémoire)", dayLectures: "Jr 15, 10.16-21 ; Mt 13, 44-46" },
        ],
    August:
        [
            { day: 1, dayInfo: "St Alphonse-Marie de Liguori, évêque et docteur de l'Église (Mémoire)", dayLectures: "Jr 18, 1-6 ; Mt 13, 47-53" },
            { day: 2, dayInfo: "De la férie ; ou St Eusèbe de Verceil, évêque ; ou St Pierre-Julien Eymard, prêtre", dayLectures: "Jr 26, 1-9a ; Mt 13, 54-58" },
            { day: 3, dayInfo: "De la férie ; ou Bse Vierge Marie", dayLectures: "Jr 26, 11-16.24 ; Mt 14, 1-12" },
            { day: 4, dayInfo: "18e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. II)", dayLectures: "Ex 16, 2-4.12-15 ; Ep 4, 17.20-24 ; Jn 6, 24-35" },
            { day: 5, dayInfo: "De la férie ; ou dédicace de la basilique Sainte-Marie Majeure", dayLectures: "Jr 28, 1-17 ; Mt 14, 13-21" },
            { day: 6, dayInfo: "La Transfiguration du Seigneur (Fête)", dayLectures: "Dn 7, 9-10.13-14 (ou 2 P 1, 16-19) ; Mc 9, 2-10" },
            { day: 7, dayInfo: "De la férie ; ou St Sixte II, pape, et ses comp., martyrs ; ou St Gaétan, prêtre", dayLectures: "Jr 31, 1-7 ; Mt 15, 21-28" },
            { day: 8, dayInfo: "St Dominique, prêtre (Mémoire)", dayLectures: "Jr 31, 31-34 ; Mt 16, 13-23" },
            { day: 9, dayInfo: "Ste Thérèse-Bénédicte de la Croix, vierge et martyre, copatronne de l'Europe (Fête)", dayLectures: "Os 2, 16b.17b.21-22 ; Mt 25, 1-13" },
            { day: 10, dayInfo: "St Laurent, diacre et martyr (Fête)", dayLectures: "2 Co 9, 6-10 ; Jn 12, 24-26" },
            { day: 11, dayInfo: "19e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. III)", dayLectures: "1 R 19, 4-8 ; Ep 4, 30 _ 5, 2 ; Jn 6, 41-51" },
            { day: 12, dayInfo: "De la férie ; ou Ste Jeanne-Françoise de Chantal, religieuse", dayLectures: "Ez 1, 2-6.24-28c ; Mt 17, 22-27" },
            { day: 13, dayInfo: "De la férie ; ou St Pontien, pape, et St Hippolyte, prêtre, martyrs", dayLectures: "Ez 2, 8 _ 3, 4 ; Mt 18, 1-5.10.12-14" },
            { day: 14, dayInfo: "St Maximilien-Marie Kolbe, prêtre et martyr (Mémoire)", dayLectures: "Ez 9, 1-7; 10, 18-22 ; Mt 18, 15-20" },
            { day: 15, dayInfo: "ASSOMPTION DE LA BIENHEUREUSE VIERGE MARIE (Solennité)", dayLectures: "Ap 11, 19a; 12, 1-6a.10ab ; 1 Co 15, 20-27a ; Lc 1, 39-56" },
            { day: 16, dayInfo: "De la férie ; ou St Étienne de Hongrie", dayLectures: "Ez 16, 1-15.60.63 ; Mt 19, 3-12" },
            { day: 17, dayInfo: "De la férie ; ou Bse Vierge Marie", dayLectures: "Ez 18, 1-10.13b.30-32 ; Mt 19, 13-15" },
            { day: 18, dayInfo: "20e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. IV)", dayLectures: "Pr 9, 1-6 ; Ep 5, 15-20 ; Jn 6, 51-58" },
            { day: 19, dayInfo: "De la férie ; ou St Jean Eudes, prêtre", dayLectures: "Ez 24, 15-24 ; Mt 19, 16-22" },
            { day: 20, dayInfo: "St Bernard, abbé et docteur de l'Église (Mémoire)", dayLectures: "Ez 28, 1-10 ; Mt 19, 23-30" },
            { day: 21, dayInfo: "St Pie X, pape (Mémoire)", dayLectures: "Ez 34, 1-11 ; Mt 20, 1-16" },
            { day: 22, dayInfo: "Bienheureuse Vierge Marie Reine (Mémoire)", dayLectures: "Is 9, 1-6 ; Lc 1, 26-38" },
            { day: 23, dayInfo: "De la férie ; ou Ste Rose de Lima, vierge", dayLectures: "Ez 37, 1-14 ; Mt 22, 34-40" },
            { day: 24, dayInfo: "St Barthélemy, Apôtre (Fête)", dayLectures: "Ap 21, 9b-14 ; Jn 1, 45-51" },
            { day: 25, dayInfo: "21e DIMANCHE DU TEMPS ORDINAIRE (Ps. sem. I)", dayLectures: "Jos 24, 1-2a.15-17.18b ; Ep 5, 21-32 ; Jn 6, 60-69" },
            { day: 26, dayInfo: "De la férie ; ou, en France, St Césaire d'Arles, évêque ; ou, en France, St Joseph de Calasanz, prêtre", dayLectures: "2 Th 1, 1-5.11b-12 ; Mt 23, 13-22" },
            { day: 27, dayInfo: "Ste Monique, mère de St Augustin (Mémoire)", dayLectures: "2 Th 2, 1-3a.14-17 ; Mt 23, 23-26" },
            { day: 28, dayInfo: "St Augustin d'Hippone, évêque et docteur de l'Église (Mémoire)", dayLectures: "2 Th 3, 6-10.16-18 ; Mt 23, 27-32" },
            { day: 29, dayInfo: "Martyre de St Jean Baptiste (Mémoire)", dayLectures: "Jr 1, 17-19 ; Mc 6,17-29" },
            { day: 30, dayInfo: "De la férie", dayLectures: "1 Co 1, 17-25 ; Mt 25, 1-13" },
            { day: 31, dayInfo: "De la férie ; ou Bse Vierge Marie", dayLectures: "1 Co 1, 26-31 ; Mt 25, 14-30" },
        ],
    September:
        [
            { day: 1, dayInfo: "22e DIMANCHE DU TEMPS ORDINAIRE (Psautier semaine II)", dayLectures: "Dt 4, 1-2.6-8 ; Jc 1, 17-18.21b-22.27 ;" },
            { day: 2, dayInfo: "De la férie", dayLectures: "1 Co 2, 1-5 ; Lc 4, 16-30" },
            { day: 3, dayInfo: "St Grégoire le Grand, pape et docteur de l'Église (Mémoire)", dayLectures: "1 Co 2, 10b-16 ; Lc 4, 31-37" },
            { day: 4, dayInfo: "De la férie", dayLectures: "1 Co 3, 1-9 ; Lc 4, 38-44" },
            { day: 5, dayInfo: "De la férie", dayLectures: "1 Co 3, 18-23 ; Lc 5, 1-11" },
            { day: 6, dayInfo: "De la férie", dayLectures: "1 Co 4, 1-5 ; Lc 5, 33-39" },
            { day: 7, dayInfo: "De la férie ; ou Bse Vierge Marie", dayLectures: "1 Co 4, 6b-15 ; Lc 6, 1-5" },
            { day: 8, dayInfo: "23e DIMANCHE DU TEMPS ORDINAIRE (Psautier semaine III)", dayLectures: "Is 35, 4-7a ; Jc 2, 1-5 ; Mc 7, 31-37" },
            { day: 9, dayInfo: "De la férie ; ou St Pierre Claver, prêtre", dayLectures: "1 Co 5, 1-8 ; Lc 6, 6-11" },
            { day: 10, dayInfo: "De la férie", dayLectures: "1 Co 6, 1-11 ; Lc 6, 12-19" },
            { day: 11, dayInfo: "De la férie", dayLectures: "1 Co 7, 25-31 ; Lc 6, 20-26" },
            { day: 12, dayInfo: "De la férie ; ou Saint Nom de Marie", dayLectures: "1 Co 8, 1b-7.10-13 ; Lc 6, 27-38" },
            { day: 13, dayInfo: "St Jean Chrysostome, évêque et docteur de l'Église (Mémoire)", dayLectures: "1 Co 9, 16-19.22-27 ; Lc 6, 39-42" },
            { day: 14, dayInfo: "La Croix glorieuse (Fête)", dayLectures: "Nb 21, 4b-9 (ou Ph 2, 6-11) ; Jn 3, 13-17" },
            { day: 15, dayInfo: "24e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. IV)", dayLectures: "Is 50, 5-9a ; Jc 2, 14-18 ; Mc 8, 27-35" },
            { day: 16, dayInfo: "St Corneille, pape, et St Cyprien, évêque, martyrs (Mémoire)", dayLectures: "1 Co 11, 17-26.33 ; Lc 7, 1-10" },
            { day: 17, dayInfo: "De la férie ; ou St Robert Bellarmin, évêque et docteur ; ou Ste Hildegarde de Bingen, vierge et docteur de l'Église", dayLectures: "1 Co 12, 12-14.27-31a ; Lc 7, 11-17" },
            { day: 18, dayInfo: "De la férie", dayLectures: "1 Co 12, 31 _ 13, 13 ; Lc 7, 31-35" },
            { day: 19, dayInfo: "De la férie ; ou St Janvier, évêque et martyr ; ou, en France, Bse Vierge Marie de la Salette", dayLectures: "1 Co 15, 1-11 ; Lc 7, 36-50" },
            { day: 20, dayInfo: "St André Kim Tae-gon, prêtre, St Paul Chong Ha-sang et leurs compagnons, martyrs (Mémoire)", dayLectures: "1 Co 15, 12-20 ; Lc 8, 1-3" },
            { day: 21, dayInfo: "St Matthieu, Apôtre et évangéliste (Fête)", dayLectures: "Ep 4, 1-7.11-13 ; Mt 9, 9-13" },
            { day: 22, dayInfo: "25e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. I)", dayLectures: "Sg 2, 12.17-20 ; Jc 3, 16 _ 4, 3 ; Mc 9, 30-37" },
            { day: 23, dayInfo: "St Pio de Pietrelcina, prêtre (Mémoire)", dayLectures: "Pr 3, 27-34 ; Lc 8, 16-18" },
            { day: 24, dayInfo: "De la férie", dayLectures: "Pr 21, 1-6.10-13 ; Lc 8, 19-21" },
            { day: 25, dayInfo: "De la férie", dayLectures: "Pr 30, 5-9 ; Lc 9, 1-6" },
            { day: 26, dayInfo: "De la férie ; ou St Côme et St Damien, martyrs", dayLectures: "Qo 1, 2-11 ; Lc 9, 7-9" },
            { day: 27, dayInfo: "St Vincent de Paul, prêtre (Mémoire)", dayLectures: "Qo 3, 1-11 ; Lc 9, 18-22" },
            { day: 28, dayInfo: "De la férie ; ou St Venceslas, martyr ; ou St Laurent Ruiz et ses compagnons, martyrs ; ou Bse Vierge Marie", dayLectures: "Qo 11, 9 _ 12, 8 ; Lc 9, 43b-45" },
            { day: 29, dayInfo: "26e DIMANCHE DU TEMPS ORDINAIRE (Ps. sem. II)", dayLectures: "Nb 11, 25-29 ; Jc 5, 1-6 ; Mc 9, 38-43.45.47-48" },
            { day: 30, dayInfo: "St Jérôme, prêtre et docteur de l'Église (Mémoire)", dayLectures: "Jb 1, 6-22 ; Lc 9, 46-50" },
        ],
    October:
        [
            { day: 1, dayInfo: "Ste Thérèse de l'Enfant-Jésus, vierge et docteur de l'Église (Mémoire)", dayLectures: "Jb 3, 1-3.11-17.20-23 ; Lc 9, 51-56" },
            { day: 2, dayInfo: "Saints anges gardiens (Mémoire)", dayLectures: "Ex 23, 20-23a ; Mt 18, 1-5.10" },
            { day: 3, dayInfo: "De la férie", dayLectures: "Jb 19, 21-27 ; Lc 10, 1-12" },
            { day: 4, dayInfo: "St François d'Assise, fondateur (Mémoire)", dayLectures: "Jb 38, 1.12-21; 40, 3-5 ; Lc 10, 13-16" },
            { day: 5, dayInfo: "De la férie ; ou Ste Faustine Kowalska, vierge ; ou Bse Vierge Marie", dayLectures: "Jb 42, 1-3.5-6.12-17 ; Lc 10, 17-24" },
            { day: 6, dayInfo: "27e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. III)", dayLectures: "Gn 2, 18-24 ; He 2, 9-11 ; Mc 10, 2-16" },
            { day: 7, dayInfo: "Bienheureuse Vierge Marie du Rosaire (Mémoire)", dayLectures: "Ac 1, 12-14 ; Lc 1, 26-38" },
            { day: 8, dayInfo: "De la férie", dayLectures: "Ga 1, 13-24 ; Lc 10, 38-42" },
            { day: 9, dayInfo: "De la férie ; ou St Denis, évêque et ses comp., martyrs ; ou St Jean Léonardi, prêtre", dayLectures: "Ga 2, 1-2.7-14 ; Lc 11, 1-4" },
            { day: 10, dayInfo: "De la férie", dayLectures: "Ga 3, 1-5 ; Lc 11, 5-13" },
            { day: 11, dayInfo: "De la férie ; ou St Jean XXIII, pape", dayLectures: "Ga 3, 6-14 ; Lc 11, 15-26" },
            { day: 12, dayInfo: "De la férie ; ou Bse Vierge Marie", dayLectures: "Ga 3, 22-29 ; Lc 11, 27-28" },
            { day: 13, dayInfo: "28e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. IV)", dayLectures: "Sg 7, 7-11 ; He 4, 12-13 ; Mc 10, 17-30" },
            { day: 14, dayInfo: "De la férie ; ou St Calliste Ier, pape et martyr", dayLectures: "Ga 4, 22-24.26-27.31 _ 5, 1 ; Lc 11, 29-32" },
            { day: 15, dayInfo: "Ste Thérèse d'Avila, vierge et docteur de l'Église (Mémoire)", dayLectures: "Ga 5, 1-6 ; Lc 11, 37-41" },
            { day: 16, dayInfo: "De la férie ; ou Ste Edwige, religieuse ; ou Ste Marguerite-Marie Alacoque, vierge", dayLectures: "Ga 5, 18-25 ; Lc 11, 42-46" },
            { day: 17, dayInfo: "St Ignace d'Antioche, évêque et martyr (Mémoire)", dayLectures: "Ep 1, 1-10 ; Lc 11, 47-54" },
            { day: 18, dayInfo: "St Luc, évangéliste (Fête)", dayLectures: "2 Tm 4, 10-17b ; Lc 10, 1-9" },
            { day: 19, dayInfo: "De la férie ; ou St Paul de la Croix, prêtre ; ou St Jean de Brébeuf, St Isaac Jogues, prêtres et leurs comp., martyrs ; ou Bse Vierge Marie", dayLectures: "Ep 1, 15-23 ; Lc 12, 8-12" },
            { day: 20, dayInfo: "29e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. I)", dayLectures: "Is 53, 10-11 ; He 4, 14-16 ; Mc 10, 35-45" },
            { day: 21, dayInfo: "De la férie", dayLectures: "Ep 2, 1-10 ; Lc 12, 13-21" },
            { day: 22, dayInfo: "De la férie ; ou St Jean-Paul II, pape", dayLectures: "Ep 2, 12-22 ; Lc 12, 35-38" },
            { day: 23, dayInfo: "De la férie ; ou St Jean de Capistran, prêtre", dayLectures: "Ep 3, 2-12 ; Lc 12, 39-48" },
            { day: 24, dayInfo: "De la férie ; ou St Antoine-Marie Claret, évêque", dayLectures: "Ep 3, 14-21 ; Lc 12, 49-53" },
            { day: 25, dayInfo: "De la férie ; ou dédicace des églises consacrées (Solennité en Fce)", dayLectures: "Ep 4, 1-6 ; Lc 12, 54-59" },
            { day: 26, dayInfo: "De la férie ; ou Bse Vierge Marie", dayLectures: "Ep 4, 7-16 ; Lc 13, 1-9" },
            { day: 27, dayInfo: "30e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. II)", dayLectures: "Jr 31, 7-9 ; He 5, 1-6 ; Mc 10, 46b-52" },
            { day: 28, dayInfo: "St Simon et St Jude, Apôtres (Fête)", dayLectures: "Ep 2, 19-22 ; Lc 6, 12-19" },
            { day: 29, dayInfo: "De la férie", dayLectures: "Ep 5, 21-33 ; Lc 13, 18-21" },
            { day: 30, dayInfo: "De la férie", dayLectures: "Ep 6, 1-9 ; Lc 13, 22-30" },
            { day: 31, dayInfo: "De la férie", dayLectures: "Ep 6, 10-20 ; Lc 13, 31-35" },
        ],
    November:
        [
            { day: 1, dayInfo: "TOUS LES SAINTS (Solennité)", dayLectures: "Ap 7, 2-4.9-14 ; 1 Jn 3, 1-3 ; Mt 5, 1-12a" },
            { day: 2, dayInfo: "COMMÉMORATION DE TOUS LES FIDÈLES DÉFUNTS", dayLectures: "Ap 14, 13 ; Rm 5, 17-21 ; Mt 11, 25-30" },
            { day: 3, dayInfo: "31e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. III)", dayLectures: "Dt 6, 2-6 ; Hb 7, 23-28 ; Mc 12, 28b-34" },
            { day: 4, dayInfo: "St Charles Borromée, évêque (Mémoire)", dayLectures: "Ph 2, 1-4 ; Lc 14, 12-14" },
            { day: 5, dayInfo: "De la férie", dayLectures: "Ph 2, 5-11 ; Lc 14, 15-24" },
            { day: 6, dayInfo: "De la férie", dayLectures: "Ph 2, 12-18 ; Lc 14, 25-33" },
            { day: 7, dayInfo: "De la férie", dayLectures: "Ph 3, 3-8a ; Lc 15, 1-10" },
            { day: 8, dayInfo: "De la férie", dayLectures: "Ph 3, 17 _ 4, 1 ; Lc 16, 1-8" },
            { day: 9, dayInfo: "Dédicace de la basilique du Latran (Fête)", dayLectures: "Ez 47, 1-2.8-9.12 (ou 1 Co 3, 9c-11.16-17) ; Jn 2, 13-22" },
            { day: 10, dayInfo: "32e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. IV)", dayLectures: "1 R 17, 10-16 ; He 9, 24-28 ; Mc 12, 38-44" },
            { day: 11, dayInfo: "St Martin de Tours, évêque (Mémoire)", dayLectures: "Tt 1, 1-9 ; Lc 17, 1-6" },
            { day: 12, dayInfo: "St Josaphat, évêque et martyr (Mémoire)", dayLectures: "Tt 2, 1-8.11-14 ; Lc 17, 7-10" },
            { day: 13, dayInfo: "De la férie", dayLectures: "Tt 3, 1-7 ; Lc 17, 11-19" },
            { day: 14, dayInfo: "De la férie", dayLectures: "Phm 7-20 ; Lc 17, 20-25" },
            { day: 15, dayInfo: "De la férie ; ou St Albert le Grand, évêque et docteur de l'Église", dayLectures: "2 Jn 1a.4-9 ; Lc 17, 26-37" },
            { day: 16, dayInfo: "De la férie ; ou Ste Marguerite d'Écosse ; ou Ste Gertrude, vierge ; ou Bse Vierge Marie", dayLectures: "3 Jn 5-8 ; Lc 18, 1-8" },
            { day: 17, dayInfo: "33e DIMANCHE DU TEMPS ORDINAIRE (Psautier sem. I)", dayLectures: "Dn 12, 1-3 ; He 10, 11-14.18 ; Mc 13, 24-32" },
            { day: 18, dayInfo: "De la férie ; ou dédicace des basiliques de St-Pierre et de St-Paul, apôtres", dayLectures: "Ap 1, 1-4; 2, 1-5a ; Lc 18, 35-43" },
            { day: 19, dayInfo: "De la férie", dayLectures: "Ap 3, 1-6.14-22 ; Lc 19, 1-10" },
            { day: 20, dayInfo: "De la férie", dayLectures: "Ap 4, 1-11 ; Lc 19, 11-28" },
            { day: 21, dayInfo: "Présentation de la bienheureuse Vierge Marie (Mémoire)", dayLectures: "Za 2, 14-17 ; Mt 12, 46-50" },
            { day: 22, dayInfo: "Ste Cécile, vierge et martyre (Mémoire)", dayLectures: "Ap 10, 8-11 ; Lc 19, 45-48" },
            { day: 23, dayInfo: "De la férie ; ou St Clément Ier, pape et martyr ; ou St Colomban, abbé ; ou Bse Vierge Marie", dayLectures: "Ap 11, 4-12 ; Lc 20, 27-40" },
            { day: 24, dayInfo: "CHRIST ROI DE L'UNIVERS (Solennité) (Psautier semaine II)", dayLectures: "Dn 7, 13-14 ; Ap 1, 5-8 ; Jn 18, 33b-37" },
            { day: 25, dayInfo: "De la férie ; ou Ste Catherine d'Alexandrie, vierge et martyre", dayLectures: "Ap 14, 1-3.4b-5 ; Lc 21, 1-4" },
            { day: 26, dayInfo: "De la férie", dayLectures: "Ap 14, 14-19 ; Lc 21, 5-11" },
            { day: 27, dayInfo: "De la férie", dayLectures: "Ap 15, 1-4 ; Lc 21, 12-19" },
            { day: 28, dayInfo: "De la férie", dayLectures: "Ap 18, 1-2.21-23; 19,1-3.9a ; Lc 21, 20-28" },
            { day: 29, dayInfo: "De la férie", dayLectures: "Ap 20, 1-4.11 _ 21, 2 ; Lc 21, 29-33" },
            { day: 30, dayInfo: "St André, Apôtre (Fête)", dayLectures: "Rm 10, 9-18 ; Mt 4, 18-22" },
        ],
    December:
        [
            { day: 1, dayInfo: "1er DIMANCHE DE L'AVENT (Psautier semaine I)", dayLectures: "Jr 33, 14-16 ; 1 Th 3, 12 _ 4, 2 ; Lc 21, 25-28.34-36" },
            { day: 2, dayInfo: "De la férie", dayLectures: "Is 2, 1-5 ; Mt 8, 5-11" },
            { day: 3, dayInfo: "St François Xavier, prêtre (Mémoire)", dayLectures: "Is 11, 1-10 ; Lc 10, 21-24" },
            { day: 4, dayInfo: "De la férie ; ou St Jean de Damas, prêtre et docteur de l'Église", dayLectures: "Is 25, 6-10a ; Mt 15, 29-37" },
            { day: 5, dayInfo: "De la férie", dayLectures: "Is 26, 1-6 ; Mt 7, 21.24-27" },
            { day: 6, dayInfo: "De la férie ; ou St Nicolas, évêque", dayLectures: "Is 29, 17-24 ; Mt 9, 27-31" },
            { day: 7, dayInfo: "St Ambroise, évêque et docteur de l'Église (Mémoire)", dayLectures: "Is 30, 19-21.23-26 ; Mt 9, 35 _ 10, 1.5a.6-8" },
            { day: 8, dayInfo: "2e DIMANCHE DE L'AVENT (Psautier semaine II)", dayLectures: "Ba 5, 1-9 ; Ph 1, 4-6.8-11 ; Lc 3, 1-6" },
            { day: 9, dayInfo: "IMMACULÉE CONCEPTION DE LA BIENHEUREUSE VIERGE MARIE (Solennité)", dayLectures: "Gn 3, 9-15.20 ; Ep 1, 3-6.11-12 ; Lc 1, 26-38" },
            { day: 10, dayInfo: "De la férie ; ou Bse Vierge Marie de Lorette", dayLectures: "Is 40, 1-11 ; Mt 18, 12-14" },
            { day: 11, dayInfo: "De la férie ; ou St Damase Ier, pape", dayLectures: "Is 40, 25-31 ; Mt 11, 28-30" },
            { day: 12, dayInfo: "De la férie ; ou Bse Vierge Marie de Guadaloupé", dayLectures: "Is 41, 13-20 ; Mt 11, 11-15" },
            { day: 13, dayInfo: "Ste Lucie, vierge et martyre (Mémoire)", dayLectures: "Is 48, 17-19 ; Mt 11, 16-19" },
            { day: 14, dayInfo: "St Jean de la Croix, prêtre et docteur de l'Église (Mémoire)", dayLectures: "Si 48, 1-4.9-11 ; Mt 17, 10-13" },
            { day: 15, dayInfo: "3e DIMANCHE DE L'AVENT (Psautier semaine III)", dayLectures: "So 3, 14-18a ; Ph 4, 4-7 ; Lc 3, 10-18" },
            { day: 16, dayInfo: "De la férie", dayLectures: "Nb 24, 2-7.15-17a ; Mt 21, 23-27" },
            { day: 17, dayInfo: "De la férie", dayLectures: "Gn 49, 1-2.8-10 ; Mt 1, 1-17" },
            { day: 18, dayInfo: "De la férie", dayLectures: "Jr 23, 5-8 ; Mt 1, 18-24" },
            { day: 19, dayInfo: "De la férie", dayLectures: "Jg 13, 2-7.24-25a ; Lc 1, 5-25" },
            { day: 20, dayInfo: "De la férie", dayLectures: "Is 7, 10-14 ; Lc 1, 26-38" },
            { day: 21, dayInfo: "De la férie (St Pierre Canisius, prêtre et docteur de l'Église)", dayLectures: "Ct 2, 8-14 (ou So 3, 14-18a) ; Lc 1, 39-45" },
            { day: 22, dayInfo: "4e DIMANCHE DE L'AVENT (Psautier semaine IV)", dayLectures: "Mi 5, 1-4a ; He 10, 5-10 ; Lc 1, 39-45" },
            { day: 23, dayInfo: "De la férie (St Jean de Kenty, prêtre)", dayLectures: "Ml 3, 1-4.23-24 ; Lc 1, 57-66" },
            { day: 24, dayInfo: "De la férie", dayLectures: "2 S 7, 1-5.8b-12.14a.16 ; Lc 1, 67-77" },
            { day: 25, dayInfo: "NATIVITÉ DU SEIGNEUR (Solennité)", dayLectures: "nuit : Is 9, 1-6 ; Tt 2, 11-14 ; Lc 2, 1-14 ; jour : Is 52, 7-10 ; Hb 1, 1-6 ; Jn 1, 1-18" },
            { day: 26, dayInfo: "St Étienne, premier martyr (Fête)", dayLectures: "Ac 6, 8-10; 7, 54-60 ; Mt 10, 17-22" },
            { day: 27, dayInfo: "St Jean, Apôtre et évangéliste (Fête)", dayLectures: "1 Jn 1, 1-4 ; Jn 20, 2-8" },
            { day: 28, dayInfo: "Les Saints Innocents, martyrs (Fête)", dayLectures: "1 Jn 1, 5 _ 2, 2 ; Mt 2, 13-18" },
            { day: 29, dayInfo: "La Sainte Famille de Jésus, Marie et Joseph (Fête)", dayLectures: "1 S 1, 20-22.24-28 ; 1 Jn 3, 1-2.21-24 ; Lc 2, 41-52" },
            { day: 30, dayInfo: "Octave de Noël", dayLectures: "1 Jn 2, 12-17 ; Lc 2, 36-40" },
            { day: 31, dayInfo: "Octave de Noël (St Sylvestre Ier, pape)", dayLectures: "1 Jn 2, 18-21 ; Jn 1,1-18" },
        ],
};

/**
 * Creating custom liturgy month
 */

let liturgyMonth = document.querySelectorAll('[aria-labelledby="liturgyMonthsList"]'),
    dayInfoHolder = document.querySelectorAll('.liturgy-day-specs'),
    dayLecturesHolder = document.querySelectorAll('.liturgy-day-specs');

// Displaying clicked date liturgical information
function display_liturgical_info(monDate) {
    liturgicalCalendar[monDate[0]].forEach((info) => {
        if (info.day === monDate[1]) {
            dayInfoHolder.forEach(el => {
                el.querySelector('.day-info').innerHTML = info.dayInfo;
            });
            dayLecturesHolder.forEach(el => {
                el.querySelector('.day-lectures').innerHTML = info.dayLectures;
            });
        }
    });
}
const currentMonthContainer = document.querySelectorAll('.monthElem_data'),
    dynamicMonth = document.querySelector('.currentMonthDynamic');

currentMonthContainer.forEach(el => {
    el.addEventListener('click', function (e) {
        let clicked = e.target;
        if ((clicked.tagName === 'SPAN') && !clicked.classList.contains('text-muted') && clicked.parentNode.classList.contains('monthDates')) {
            let desiredMonthName = dynamicMonth.querySelector('.currentMonthDynamic__name').textContent,
                desiredDate = Number(clicked.textContent);
            // Display day info
            display_liturgical_info([desiredMonthName, desiredDate]);
            select_month_date(desiredDate);
        }
    });
});

/**
 * Month navigations and date selections
 */

// Jump to random month
liturgyMonth.forEach(el => {
    let monthName = el.querySelectorAll('.dropdown-item');
    monthName.forEach((month, inx) => {
        month.addEventListener('click', function () {
            create_custom_month(inx);
            select_month_date(1);
            display_liturgical_info([month_num_to_nm((month_str + 1)), 1]);
        });
    });
});

// Select certain date
function select_month_date(date) {
    $('.monthDates span:not(.text-muted)').removeClass('selected');
    $('.monthDates span:not(.text-muted)').filter(function () {
        return $(this).text() == date;
    }).addClass('selected');
}

// Previous month
$('.month-previous').click(function () {
    create_previous_month_same_year();
    select_month_date(1);
    display_liturgical_info([month_num_to_nm((month_str + 1)), 1]);
});

// Next month
$('.month-next').click(function () {
    create_next_month_same_year();
    select_month_date(1);
    display_liturgical_info([month_num_to_nm((month_str + 1)), 1]);
});

// Select today by default
display_liturgical_info([month_num_to_nm((month_str + 1)), current_date]);

// Update the copyright year
$('.copyright-year').html(dateStr.getFullYear());
// export * from "./MyScripts.js";