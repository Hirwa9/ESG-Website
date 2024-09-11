<!DOCTYPE html>
<?php
// Include database connection
include '../../connect.php';
// Allow only admins
include '../../session_check.php';
if (!isset($_SESSION['user_role'])) {
    header("Location: ../../login_page.php"); // Redirect to the login page
    exit();
} else if ($_SESSION['user_role'] !== 'admin') {
    header("Location: ../../index.html"); // Redirect to the original page
    exit();
}
// php functions
include '../../php_scripts.php';

// // Statistics

// // Query to fetch existing admin users
$admins = "SELECT * FROM admin_users";
$adminResult = mysqli_query($conn, $admins);
$totalAdminUsers = 0; // Counter
$adminUsersData = []; // Array for admin users
$activeAdminID; // Current admin ID
$activeAdminAccessLevel = 1; // Current admin ID

// Check for returned rows
if (mysqli_num_rows($adminResult) > 0) {
    // Count and store admins data
    while ($row = mysqli_fetch_assoc($adminResult)) {
        $totalAdminUsers++;
        $adminUsersData[] = $row;
        if ($row['id'] == $_SESSION['user_id']) {
            $activeAdminID = $row['id'];
            $activeAdminTitle = $row['title'];
            $activeAdminFirstName = $row['first_name'];
            $activeAdminLastName = $row['last_name'];
            $activeAdminImage = $row['image_url'];
            $activeAdminEmail = $row['email'];
            $activeAdminPhoneNumber = $row['phone_number'];
            $activeAdminAccessLevel = $row['access_level'];
        }
    }
}

// Query to fetch existing members
$allMembers = "SELECT * FROM esg_members ORDER BY lastName";
$membersResult = mysqli_query($conn, $allMembers);
$totalMembers = 0; // Counter
$membersData = []; // Array for members
// Check for returned rows
if (mysqli_num_rows($membersResult) > 0) {
    // Count members
    while ($row = mysqli_fetch_assoc($membersResult)) {
        $membersData[] = $row;
    }
    $totalMembers = count($membersData); // Counter
}

// // Query to fetch existing subscribers
// $subsc = "SELECT * FROM subscribers";
// $subscResult = mysqli_query($conn, $subsc);
// $totalSubscribers = 0; // Counter
// $subscribersData = []; // Array for subscribers
// // Check for returned rows
// if (mysqli_num_rows($subscResult) > 0) {
//     // Count and store subscribers data
//     while ($row = mysqli_fetch_assoc($subscResult)) {
//         $totalSubscribers++;
//         $subscribersData[] = $row;
//     }
// }

// Close the connection
mysqli_close($conn);
// Convert PHP array to JSON
$adminUsersJson = json_encode($adminUsersData);
// $membersJson = json_encode($membersData);
// $subscribersJson = json_encode($subscribersData);
?>

<!-- Retrieved data JS storage -->
<script>
    // Admin user data
    const adminUsersData = <?php echo $adminUsersJson; ?>;
</script>


<html lang="en" data-ng-app="dashboard" data-ng-controller="dashboardCTLR">
<head>
    <title>ESG Dashboard</title>

    <link rel="icon" type="image/x-icon" href="../../Pics/EasternSingersLogo.png">

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Hirwa Willy">
    <meta name="keywords" content="HTML, CSS">

    <!-- BS, FA & jQ -->

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-sanitize.js"></script>
    <script src="dashboardModule.js?v=1.1105"></script>
    <script src="controllers/dashboardControllers.js?v=1.1154"></script>

    <!-- Customs -->
	<link rel="icon" type="image/x-icon" href="../../Pics/ESG_favicon1.ico">
	<link rel="stylesheet" type="text/css" href="../../styles/dashboard.css?v=1.1205">

    <!-- offline -->

    <!-- <link rel="stylesheet" href="bootstrap5/css/bootstrap.min.css">
    <link rel="stylesheet" href="fontawesome6-2-0/css/all.css">
    <script src="bootstrap5/js/bootstrap.min.js"></script> -->
    <!-- <script src="bootstrap5/js/bootstrap.bundle.min.js"></script>
    <script src="bootstrap5/js/bootstrap.bundle.min.js.map"></script> -->
    <!-- <script src="jq/jquery-3.7.1.js"></script> -->
     
    <!-- fonts -->
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <style>
    body * {
        font-family: "Raleway", sans-serif;
        font-optical-sizing: auto;
    }
    </style>
     
</head>
<body class="p-0 bg-appColor no-dark-theme">
    <div class="d-flex">
        <!-- Sidebar -->
        <nav id="dashboardSidebar" class="col-md-3 col-xl-2 sidebar">
            <div class="position-sticky">
                <div class="bg-white2 p-3 mx-2 mb-2 rad-10 shadow-sm">
                    <!-- Active admin profile -->
                    <?php
                    echo '<img src="' . $activeAdminImage . '" class="card-img-top w-3rem ratio-1-1 object-fit-cover rounded-circle mb-2" alt="Staff member">';
                    echo '<div class="card-body">';
                    echo '<p class="card-text small">' . $activeAdminFirstName . ' ' . $activeAdminLastName . '</p>';
                    echo '</div>';
                    ?>
                </div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="#" data-content="dashboard">
                            <i class="fas fa-tachometer-alt"></i>
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-content="activities">
                            <i class="fas fa-hourglass-half"></i>
                            Activities
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-content="users">
                            <i class="fas fa-users"></i>
                            Users
                        </a>
                    </li>
                    <li class="nav-item position-relative">
                        <a class="nav-link" href="#" data-content="todos">
                            <i class="fas fa-list-check"></i>
                            ToDos
                        </a>
                        <span data-ng-if="totalSongsTodos > 0" class="position-absolute r-middle-m me-3 bg-black3 text-light grid-center ratio-1-1 rounded-circle" style="width: 1.1rem; font-size: .65rem;">{{ totalSongsTodos }}</span>
                    </li>
                    <li class="dropdown-divider"></li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-content="profile">
                            <i class="fas fa-user"></i>
                            Profile
                        </a>
                    </li>
                    <li class="nav-item border-bottom border-white3">
                        <a class="nav-link" href="#" data-content="settings">
                            <i class="fas fa-cog"></i>
                            Settings
                        </a>
                    </li>
                    <li class="dropdown-divider"></li>
                    <li class="nav-item">
                        <a class="nav-link no-activeness" data-dialog-toggle=".admin-logout-dialog" href="#">
                            <i class="fas fa-sign-out"></i>
                            Log out
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    
        <!-- Main Content -->
        <main class="flex-grow-1 container-fluid bg-light my-md-3 me-md-3" id="mainContent">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 py-2 border-bottom">
                <img src="../../Pics/ESG_favicon1.png" alt="Logo" class="logo me-3 ms-sm-3">
                <ul class="nav ms-auto me-sm-3 d-flex align-items-center">
                    <li class="nav-item small">
                        <a href="#" class="text-decoration text-muted small"><button class="fa fa-laptop d-none d-lg-block me-3 border-0" id="fullscreen-toggler" title="Fullscreen"></button></a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="text-decoration-none text-muted small active-data">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="btn fa fa-bars d-md-none ms-3" data-totoggle="#dashboardSidebar"></a>
                    </li>
                </ul>
            </div>
            <div id="main-content" class="content">
                <!-- Dashboard content -->
                <div class="pb-5 collapse show dynamic-data-section" id="dashboardSpace">
                    <section>
                        <?php
                        // $currentHour = date("H");
                        // $currentHour = (int)$currentHour;
                        // switch ($currentHour) {
                        //     case ($currentHour >= 5 && $currentHour < 12):
                        //         $greetings = "Good morning";
                        //         break;
                        //     case ($currentHour >= 12 && $currentHour < 15):
                        //         $greetings = "Good afternoon";
                        //         break;
                        //     case ($currentHour >= 15 && $currentHour <= 23):
                        //         $greetings = "Good evening";
                        //         break;
                        //     default:
                        //         $greetings = "Hello";
                        //         break;
                        // }
                        ?>
                        <h2 class="fs-3 my-3 px-3"><span>Hello <?php echo "$activeAdminFirstName" ?>,</span><br><small class="text-muted">Welcome back !</small></h2>
                        <div class="d-lg-flex rounded" style="background-color: var(--appColor2); animation: flyInBottom .5s 1;">
                            <div class="p-4 small col-xl-8">
                                <p class="mb-3 text-justify">
                                    Here on the Admin Portal, you can manage and oversee various aspects of the platform efficiently. ___ Your profile allows you to do the following:
                                </p>
                                <ul class="mb-0 ps-3 list-style-circle">
                                    <li class="py-1"><b class="me-1">Manage Users:</b> View and control user accounts.</li>
                                    <li class="py-1"><b class="me-1">Update Content:</b> Edit and organize the music database.</li>
                                    <li class="py-1"><b class="me-1">Monitor Activity:</b> Keep track of site activities and user interactions.</li>
                                    <li class="py-1"><b class="me-1">Settings:</b> Customize and configure system settings.</li>
                                </ul>
                            </div>
                            <img src="../../Pics/EasternSingersLogo.png" alt="" class="w-10rem mx-auto mb-5 mb-md-3 p-3 pt-md-2 rad-15 d-none d-xl-block object-fit-contain" style="animation: slideInLeft .5s 1;">
                        </div>
                    </section>
                    
                    <section class="my-5 px-0 container statistics-wrapper">
                        <h3 class="fs-3 mb-5 text-center small-title">Short statistics</h3>
                        <div class="mb-3 d-flex flex-wrap">
                            <div class="col-6 col-lg-4 col-xl-3 mb-3 mx-0 px-2">
                                <div class="d-grid justify-content-center mx-0 p-3 rad-10 border shadow">
                                    <span class="fs-6 mb-xl-4">Compositions</span>
                                    <span class="display-5 mx-auto text-myBlue ptr">{{ totalCompositions }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-4 col-xl-3 mb-3 mx-0 px-2">
                                <div class="d-grid justify-content-center mx-0 p-3 rad-10 border shadow">
                                    <span class="fs-6 mb-xl-4">Projects</span>
                                    <span class="display-5 mx-auto text-myBlue ptr"><?php echo 0?></span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-4 col-xl-3 mb-3 mx-0 px-2">
                                <div class="d-grid justify-content-center mx-0 p-3 rad-10 border shadow">
                                    <span class="fs-6 mb-xl-4">Announcements</span>
                                    <span class="display-5 mx-auto text-myBlue ptr"><?php echo 0?></span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-4 col-xl-3 mb-3 mx-0 px-2">
                                <div class="d-grid justify-content-center mx-0 p-3 rad-10 border shadow">
                                    <span class="fs-6 mb-xl-4">Events</span>
                                    <span class="display-5 mx-auto text-myBlue ptr">{{ totalEvents }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-4 col-xl-3 mb-3 mx-0 px-2">
                                <div class="d-grid justify-content-center mx-0 p-3 rad-10 border shadow">
                                    <span class="fs-6 mb-xl-4">Users</span>
                                    <span class="display-5 mx-auto text-myBlue ptr">{{ totalMembers }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-4 col-xl-3 mb-3 mx-0 px-2">
                                <div class="d-grid justify-content-center mx-0 p-3 rad-10 border shadow">
                                    <span class="fs-6 mb-xl-4">Subscribers</span>
                                    <span class="display-5 mx-auto text-myBlue ptr"><?php echo 0?></span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                
                <!-- Activities content -->
                <div class="pb-5 collapse dynamic-data-section" id="activitiesSpace">
                    <nav class="mb-4">
                        <div class="nav nav-tabs justify-content-center border-0" id="nav-tab" role="tablist">
                            <button class="nav-link clickDown mx-1 active" id="nav-compositions-tab" data-bs-toggle="tab" data-bs-target="#nav-compositions" type="button" role="tab" aria-controls="nav-compositions" aria-selected="true">Compositions <span class="badge bg-light text-myBlue rounded-pill border border-myBlue ms-2">{{ totalCompositions }}</span></button>
                            <button class="nav-link clickDown mx-1" id="nav-events-tab" data-bs-toggle="tab" data-bs-target="#nav-events" type="button" role="tab" aria-controls="nav-events" aria-selected="false">Events <span class="badge bg-light text-myBlue rounded-pill border border-myBlue ms-2">{{ totalEvents }}</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <!-- Compositions -->
                        <div class="tab-pane fade show active" id="nav-compositions" role="tabpanel" aria-labelledby="nav-compositions-tab">
                            <div class="d-lg-flex justify-content-around mx-auto mb-4 py-lg-5 px-lg-4 px-xl-5 alert" style="background-color: var(--appColor2);">
                                <h5 class="col-lg-3 mb-3 mb-lg-0 fs-2"><span class="fa fa-church me-2"></span> Songs</h5>
                                <p class="mb-lg-0 text-justify small">
                                    All published compositions by the group, including original works, reharmonizations, and covers. Each composition is accompanied by detailed information such as the date of creation, musical and media characteristics, and a message that reflects the spirit and purpose of the piece.<br><br>
                                    <span class="fs-5">Manage compositions below</span>
                                </p>
                            </div>
                            <!--  -->
                            <div class="position-relative col-8 col-sm-6 col-xl-3 ms-auto my-3 p-1 rad-10 border-2 border-black4 search-box">
                                <input type="text" placeholder="🔍Search composition ..." class="borderless small search-box__input" id="esgMemberFilter" data-ng-model="compositionsFilter">
                                <button class="r-middle bg-black3 border border-2 search-box__clearer" data-ng-show="compositionsFilter !== '' && compositionsFilter !== undefined" data-ng-click="compositionsFilter = ''">&times;</button>
                            </div>
                            <div class="d-lg-flex flex-wrap col-xl-12 container">
                                <div class="col-lg-6 col-xl-4 p-lg-3" data-ng-repeat="x in retrievedListOfCompositions | filter : compositionsFilter">
                                    <div class="mb-2">
                                        <h6 class="d-flex mb-0 flex-space-between text-dark composition-title">
                                            <span class="notranslate">{{ x.compositionName }}</span>
                                            <div class="rad-3 my-item-header__icons">
                                                <button class="bg-black4 rounded-circle fa fa-info" data-ng-click="view_selected_composition_info($event)" title="Info"></button>
                                            </div>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Compositions details displayer -->
                            <div class="position-fixed music-element-info" data-ng-show="musicElementInfoVisible">
                                <div class="inx-10 py-3 px-sm-2 music-element">
                                    <h4 class="mb-3 px-3 d-flex flex-space-between composition-title">
                                        <span class="fs-3 notranslate">{{activeCompositionsData.compositionName}}</span>
                                        <div class="rad-3 my-item-header__icons">
                                            <button class="fa fa-ellipsis-v" data-menu-toggle=".composition-cont-menu"></button>
                                            <button class="fa fa-close" data-ng-click="musicElementInfoVisible = false"></button>
                                        </div>
                                    </h4>
                                    <div class="mx-3 composition-details collapse show">
                                        <h6>Composed on:</h6>
                                        <div class="d-flex mb-3 fw-bold composition-date">
                                            <span class="col-2 composed-day">{{activeCompositionsData.formattedDate[1].replace(',', '')}}</span>
                                            <span class="col-4 composed-month">{{activeCompositionsData.formattedDate[0]}}</span>
                                            <span class="col-3 composed-year">{{activeCompositionsData.formattedDate[2]}}</span>
                                        </div>
                                        <h6 class="p-2 clickDown ptr bg-black4 toggle-next">Song about</h6>
                                        <div class="p-2 small collapse show notranslate composition-about">
                                            <div class="composition-about-composer">
                                                <span class="mb-2 fw-bold">Composer:</span>
                                                <p data-ng-bind-html="activeCompositionsData.compositionAbout.composer"></p>
                                            </div>
                                            <div class="composition-about-text">
                                                <span class="mb-2 fw-bold">About:</span>
                                                <p data-ng-bind-html="activeCompositionsData.compositionAbout.aboutText"></p>
                                            </div>
                                        </div>
                                        <h6 class="p-2 clickDown ptr bg-black4 toggle-next">File details</h6>
                                        <div class="mb-3 small collapse composition-file">
                                            <ul class="mb-0 px-2 px-sm-3">
                                                <li class="text-truncate py-1"><b>Key:</b> <span class="composition-key" data-ng-bind-html="activeCompositionsData.compositionFileDetails.compositionKey"></span></li>
                                                <li class="text-truncate py-1"><b>Tempo:</b> <span class="composition-tempo" data-ng-bind-html="activeCompositionsData.compositionFileDetails.compositionTempo"></span></li>
                                                <li class="text-truncate py-1"><b>File link:</b> <span class="composition-file-link" data-ng-bind-html="activeCompositionsData.compositionFileDetails.fileLink"></span></li>
                                                <li class="text-truncate py-1"><b>File size:</b> <span class="composition-file-size" data-ng-bind-html="activeCompositionsData.compositionFileDetails.fileSize"></span></li>
                                            </ul>
                                        </div>
                                        <h6 class="p-2 clickDown ptr bg-black4 toggle-next">Audio file</h6>
                                        <div class="mb-3 p-1 px-sm-3 text-truncate small collapse composition-audio">{{activeCompositionsData.compositionAudioLink}}</div>
                                        <h6 class="p-2 clickDown ptr bg-black4 toggle-next">Video details</h6>
                                        <div class="mb-3 small collapse composition-video">
                                            <ul class="mb-0 px-2 px-sm-3">
                                                <li class="text-truncate py-1"><b>Name:</b> <span class="video-name">{{activeCompositionsData.compositionVideoDetails.videoName}}</span></li>
                                                <li class="text-truncate py-1"><b>Link:</b> <span class="video-link">{{activeCompositionsData.compositionVideoDetails.videoLink}}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <button class="btn btn-sm btn-secondary mx-auto mt-3 rad-10 clickDown deselect-composition" style="font-size: 70%;">Deselect</button>    
                                </div>
                            </div>

                            <!-- New compositions adder -->
                            <div class="new-compositions">
                                <button class="btn bg-black4 d-block mx-auto my-5" data-bs-toggle="collapse" data-bs-target=".add-new-compositions">
                                    <span class="fa fa-plus me-2"></span> New composition
                                </button>
                                <div class="collapse add-new-compositions">
                                    <article class="px-md-3 px-lg-4 mb-4 mb-lg-5">
                                        <h5 class="mb-3 small-title">Add a new composition</h5>
                                        <p class="text-justify small">
                                            To add a new composition, enter the composition's name, composer, and the date it was composed or harmonized. <b>Provide a shared file link</b>, specify key details like the song's key, tempo, and the shared file size, and optionally, upload an audio file. If the song has a video, include the video link, date, and a brief description. Ensure the song is not already listed before submitting.
                                        </p>
                                    </article>
                                    <div class="d-xl-flex mx-md-3 mx-lg-5">
                                        <form action="add_composition.php" method="post" enctype="multipart/form-data" class="col-md-10 col-xl-6 mx-auto mx-xl-0 p-2 d-block" id="newcompositionUploader">
                                            <div class="my-3" id="uploader">
                                                <div class="mb-3">
                                                    <label for="sName" class="form-label fw-bold">Song name</label>
                                                    <input type="text" name="song_name" required class="form-control border-2 h-3rem" style="border-color: var(--myBlue2);" id="sName" placeholder="Eg: Nyirubutagatifu">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="sComposer" class="form-label fw-bold">Song composer</label>
                                                    <input type="text" name="song_composer" required class="form-control border-2 h-3rem" style="border-color: var(--myBlue2);" id="sComposer" placeholder="Eg: Ange Withney Chloe Imanirafasha _Arr_ Erasme">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="compositionDate" class="form-label fw-bold">Date composed/trans/harm</label>
                                                    <input type="text" name="composition_date" class="form-control" id="compositionDate" placeholder="Eg: 2024-02-24">
                                                    <div id="compositionDateHelp" class="form-text">Use only <b>YYYY-MM-DD</b> format.</div>
                                                </div>
                                                <div class="form-label text-center mb-3 fst-italic small">Composition's file details</div>
                                                <div class="mb-3">
                                                    <label for="sFileLink" class="form-label fw-bold">File link</label>
                                                    <input type="text" name="song_file_link" required class="form-control" id="sFileLink" placeholder="Enter shared file's link">
                                                </div>
                                                <div class="mb-3">
                                                    <div class="d-flex justify-content-between">
                                                        <div style="width: 33%">
                                                            <label for="compositionKey" class="form-label fw-bold">Key</label>
                                                            <input type="text" name="composition_key" required class="form-control" id="compositionKey" placeholder="Eg: Sol">
                                                        </div>
                                                        <div style="width: 33%">
                                                            <label for="compositionTempo" class="form-label fw-bold">Tempo</label>
                                                            <input type="text" name="composition_tempo" class="form-control" id="compositionTempo" placeholder="Eg: 50 BMP, Moderato">
                                                        </div>
                                                        <div style="width: 33%">
                                                            <label for="compositionFileSize" class="form-label fw-bold">File size</label>
                                                            <input type="text" name="composition_file_size" class="form-control" id="compositionFileSize" placeholder="Eg: 40 KB">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-label text-center mb-3 fst-italic small">Composition's media details</div>
                                                <div class="mb-3">
                                                    <label for="songAudio" class="form-label fw-bold">Audio file (optional)</label>
                                                    <input type="file" name="song_audio" class="form-control h-auto" id="songAudio" accept="audio/mp3, audio/wav, audio/ogg">
                                                    <div id="audioHelp" class="form-text">Only MP3, WAV, or OGG files. <u>Max 10MB in size</u></div>
                                                </div>
                                                <div class="form-label fw-bold mb-3">Video details (optional)</div>
                                                <div class="mb-3">
                                                    <label for="videoName" class="form-label fw-bold">Video name</label>
                                                    <input type="text" name="song_video_name" class="form-control" id="videoName" placeholder="Enter song's video name">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="videoLink" class="form-label fw-bold">Video link</label>
                                                    <input type="text" name="song_video_link" class="form-control" id="videoLink" placeholder="Enter song's video link">
                                                </div>
                                                <div class="mb-3">
                                                    <label for="videoDate" class="form-label fw-bold">Video date</label>
                                                    <input type="text" name="video_date" class="form-control" id="videoDate" placeholder="Eg: 2024-02-24">
                                                    <div id="videoDateHelp" class="form-text">Use only <b>YYYY-MM-DD</b> format.</div>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="videoSongAbout" class="form-label fw-bold">Video song about</label>
                                                    <textarea maxlength="250" name="song_about" id="videoSongAbout" cols="30" rows="3" class="p-3 w-100" placeholder="Enter a short message about the song"></textarea>
                                                </div>
                                                <div class="p-4 small" style="background-color: rgba(255, 193, 7, .4)">
                                                    <h6 class="text-decoration-underline">Reminder</h6>
                                                    <p>
                                                        Take a moment to confirm the <b>song's name</b> spelling before you proceed. It's important that it aligns correctly with the title of your composition.
                                                    </p>
                                                    <div class="d-flex gap-2 align-items-center">
                                                        <label for="confirmCheck" class="form-label fw-bold m-0">I have checked</label>
                                                        <input data-ng-model="finishSubmission" type="checkbox" name="confirm_check" required class="ms-3" id="confirmCheck" style="width: 1rem; height: 1rem;">
                                                    </div>
                                                </div>
                                                <div class="my-5 d-flex justify-content-between">
                                                    <button type="reset" class="btn btn-outline-secondary col-4 clickDown" data-bs-toggle="collapse" data-bs-target=".add-new-compositions" onclick="$('#directFilePreview iframe').attr('src', '')" aria-expanded="true"><span class="fa fa-close me-2"></span> Discard</button>
                                                    <button data-ng-disabled="!finishSubmission" type="submit" class="btn btn-lg btn-success col-7 clickDown" id="newSongUploadBTN"><span class="fa fa-cloud-upload me-2"></span> Add song</button>
                                                </div>
                                            </div>
                                        </form>
                                        <div class="d-xl-flex flex-column col-xl-6 p-sm-4" id="directFilePreview">
                                            <div class="alert alert-info small">If your file link is valid, a preview will appear below.</div>
                                            <div class="flex-grow-1 d-grid border border-2 border-black4" style="background: url('../../Pics/file_preview.jpg') center top no-repeat; min-height: 80vh;">
                                                <iframe src="" frameborder="0" class="dim-100"></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Compositions options -->
                            <div class="rad-7 my-cont-menu composition-cont-menu">
                                <ul class="small">
                                    <li class="rad-100vw m-2 bg-white3 composition-data-editor" data-totoggle=".song-editor"><span class="fa fa-pen w-25px"></span>Edit</li>
                                    <li class="border-0 composition-file-previewer" data-ng-click="preview_selected_composition()"><span class="fa fa-eye w-25px"></span> Preview</li>
                                    <li class="border-0 composition-flink-copier" data-ng-click="copy_selected_composition_file_link()"><span class="fa fa-link w-25px"></span> Copy file link</li>
                                    <li class="border-0 composition-vlink-copier" data-ng-click="copy_selected_composition_video_link()"><span class="fa fa-film w-25px"></span> Copy video link</li>
                                    <li class="border-0 rad-100vw text-danger composition-removal" data-dialog-toggle=".composition-removal-dialog" data-ng-click="remove_selected_composition()"><span class="fa fa-trash-alt w-25px"></span> Remove</li>
                                </ul>
                            </div>
                        </div>
                        <!-- Events -->
                        <div class="tab-pane fade show" id="nav-events" role="tabpanel" aria-labelledby="nav-events-tab">
                            <div class="d-lg-flex justify-content-around mx-auto mb-4 py-lg-5 px-lg-4 px-xl-5 alert" style="background-color: var(--appColor2);">
                                <h5 class="col-lg-3 mb-3 mb-lg-0 fs-2"><span class="fa fa-calendar-alt me-2"></span> Events</h5>
                                <p class="mb-lg-0 text-justify small">
                                    Events help group members and families stay updated about ongoing activities. They are useful for commemorating memorable occasions and fostering community engagement. By keeping everyone informed, events ensure that no one misses out on important gatherings and celebrations. <br><br>
                                    <span class="fs-5">Manage events below</span>
                                </p>
                            </div>
                            <!--  -->
                            <div class="d-lg-flex flex-wrap justify-content-center flex-row-reverse">
                                <div class="col-lg-10 col-xl-5 p-2">
                                    <h4 class="mb-3">Recent events</h4>
                                    <!-- <p class="small">
                                        Bellow are some recent events:
                                    </p> -->
                                    <div class="position-relative col-8 col-sm-6 ms-auto my-3 p-1 rad-10 border-2 border-black4 search-box">
                                        <input type="text" placeholder="🔍Search event ..." class="borderless small search-box__input" id="esgMemberFilter" data-ng-model="eventsFilter">
                                        <button class="r-middle bg-black3 border border-2 search-box__clearer" data-ng-show="eventsFilter !== '' && eventsFilter !== undefined" data-ng-click="eventsFilter = ''">&times;</button>
                                    </div>                                    
                                    <div class="row">
                                        <div data-ng-repeat="x in retrievedListOfEvents | filter : eventsFilter" class="position-relative col-6 col-sm-4 col-xl-6 mb-3 eventElement" data-ng-click="select_event($event)" data-id="{{ x.id }}">
                                            <div class="border rounded">
                                                <div class="position-relative ratio-16-9">
                                                    <img data-ng-src="{{ x.mainImage }}" alt="" class="dim-100 object-fit-cover rounded">
                                                    <button class="position-absolute t-0 r-0 mt-1 me-1 bg-black3 text-light border-white3 rounded-circle btn fa fa-ellipsis-v" data-menu-toggle=".event-cont-menu"></button>
                                                </div>
                                                <div class="px-2 small">
                                                    <div class="mb-0 text-end text-muted fw-bold" style="font-size: .8rem; line-height: 2em;">{{ x.eventType | capitalize }}</div>
                                                    <div style="line-height: 1.25;">
                                                        <p class="mb-2 p-1 text-end text-myBlue bg-black4 small" style="line-height: 1;">{{ x.eventLocation }} - {{ x.eventDate }}</p>
                                                        <p class="overflow-hidden text-clamp text-clamp-3">
                                                        {{ x.eventAbout }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <span data-ng-if="x.visible == false" class="position-absolute fa fa-eye-slash bg-light text-black2 border p-1 rounded" title="Event is hidden" style="bottom: 0; left: 50%; translate: -50% 50%;"></span>
                                        </div>
                                        <!-- Event options -->
                                        <div class="rad-7 my-cont-menu event-cont-menu">
                                            <ul class="small">
                                                <li class="border-0 event-data-editor" data-totoggle="" data-ng-click="eventEditorVisible = true"><span class="fa fa-pen w-25px"></span> Edit event</li>
                                                <li class="border-0 event-file-previewer">
                                                    <span data-ng-click="toggle_selected_event()">
                                                        <span data-ng-show="selectedEventData.visible == true"><span class="fa fa-eye-slash w-25px"></span> Hide event</span>
                                                        <span data-ng-show="selectedEventData.visible == false"><span class="fa fa-eye w-25px"></span> Show event</span>
                                                    </span>
                                                </li>
                                                <li class="border-0 text-danger event-removal" data-ng-click="remove_selected_event()"><span class="fa fa-trash-alt w-25px"></span> Remove event</li>
                                            </ul>
                                        </div>
                                        <!-- Event editor -->
                                        <div class="fix-holder fix-holder-appColor2_cons overf-y-a blur-bg-2px" data-ng-class="{'d-block': eventEditorVisible}">
                                            <div class="col-11 col-sm-8 col-md-6 col-xl-4 m-auto mt-2 mt-md-5 p-3 bg-white rad-10" style="animation: flyInTop .3s 1;">
                                                <button data-ng-click="eventEditorVisible = false" type="reset" class="fa fa-close btn btn-outline-secondary d-block mb-3 ms-auto"></button>
                                                <div class="h6 small text-center text-black2"><b>{{ selectedEventData.eventType | capitalize }}</b> event from <b>{{ selectedEventData.eventDate }}</b></div>
                                                <hr>
                                                <div class="d-sm-flex mb-3">
                                                    <div class="position-relative col-sm-6 ratio-16-9 rad-10 overflow-hidden">
                                                        <img data-ng-src="{{ selectedEventData.eventPics[0] }}" alt="Event image" class="border border-2 border-light dim-100 object-fit-cover">
                                                        <span class="btn bg-light rounded-circle ratio-1-1 p-1 position-absolute tr-0 mt-1 me-1" style="font-size: smaller;">🎉</span>
                                                    </div>
                                                    <div class="position-relative col-sm-6 ratio-16-9 rad-10 overflow-hidden">
                                                        <img data-ng-src="{{ selectedEventData.eventPics[1] }}" alt="Event image" class="border border-2 border-light dim-100 object-fit-cover">
                                                        <span class="btn bg-light rounded-circle ratio-1-1 p-1 position-absolute tr-0 mt-1 me-1" style="font-size: smaller;">🎉</span>
                                                    </div>
                                                </div>
                                                <form name="editEventDetails" action="" method="POST" enctype="multipart/form-data" data-ng-submit="edit_event($event)" id="eventEditor">
                                                    <div class="mb-3 d-none">
                                                        <label for="toMail" class="form-label fw-bold">Email</label>
                                                        <input type="number" class="form-control h-3rem" id="eventID" name="edited_event_id" placeholder="Event id" data-ng-value="selectedEventData.id" required>
                                                        <div class="invalid-feedback">Please enter a valid id number.</div>
                                                    </div>
                                                    <div class="mb-3 d-none">
                                                        <label for="toMail" class="form-label fw-bold">Email</label>
                                                        <input type="email" class="form-control h-3rem" id="toMail" name="email" autocomplete="email" placeholder="Email" value="<?php echo $activeAdminEmail ?>" required>
                                                        <div class="invalid-feedback">Please enter a valid email address.</div>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="editEventType" class="form-label fw-bold">Event type</label>
                                                        <select class="form-select" id="editEventType" name="edited_event_type" data-ng-value="selectedEventData.eventTypeOriginal" required>
                                                            <option value="" disabled selected>Not selected</option>
                                                            <option value="rehearsal">Rehearsal</option>
                                                            <option value="holyMass">Holy Mass</option>
                                                            <option value="concert">Concert</option>
                                                            <option value="recordingSession">Recording Session</option>
                                                            <option value="videoProduction">Video Production</option>
                                                            <option value="wedding">Wedding</option>
                                                            <option value="communityOutreach">Community Outreach</option>
                                                            <option value="musicWorkshop">Music Workshop</option>
                                                            <option value="retreat">Retreat</option>
                                                            <option value="visit">Visit</option>
                                                            <option value="travel">Travel</option>
                                                            <option value="tvShow">TV Show</option>
                                                            <option value="fundraiser">Fundraiser</option>
                                                            <option value="choirCompetition">Choir Competition</option>
                                                            <option value="anniversaryCelebration">Anniversary Celebration</option>
                                                            <option value="musicFestival">Music Festival</option>
                                                            <option value="charityEvent">Charity Event</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="editEventDate" class="form-label fw-bold">Event date</label>
                                                        <input type="text" name="edited_event_date" class="form-control" id="editEventDate" placeholder="Eg: 2024-02-24" data-ng-value="selectedEventData.eventDate" required>
                                                        <div id="editEventDateHelp" class="form-text">Use only <b>YYYY-MM-DD</b> format.</div>
                                                        <div class="invalid-feedback">Please choose a valid date.</div>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="editEventLocation" class="form-label fw-bold">Location</label>
                                                        <input type="text" class="form-control" id="editEventLocation" name="edited_event_location" placeholder="Enter event location" data-ng-value="selectedEventData.eventLocation" required>
                                                        <div class="invalid-feedback">Please enter event location.</div>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="editEventBody" class="form-label fw-bold">Event about</label>
                                                        <textarea maxlength="350" name="edited_event_body" id="editEventBody" cols="30" rows="5" class="p-3 w-100 small" placeholder="Enter event details">{{ selectedEventData.eventAbout }}</textarea>
                                                        <div class="invalid-feedback">Please enter message.</div>
                                                    </div>
                                                    <div class="mb-3">
                                                        <div class="form-label fw-bold">Event images</div>
                                                        <div class="d-flex justify-content-around">
                                                            <div class="col-6 overflow-hidden px-1">
                                                                <label for="editEventImage1" class="formform-label text-muted small">Image 1</label>
                                                                <input type="file" data-ng-model="fileModel" class="form-control imageLinkedInput" id="editEventImage1" name="edited_event_image1" accept="image/*" required>
                                                                <img src="{{ selectedEventData.eventPics[0] }}" class="my-2 ratio-16-9 object-fit-cover border-0 rounded inputLinkedImage">
                                                            </div>
                                                            <div class="col-6 overflow-hidden px-1">
                                                                <label for="editEventImage2" class="formform-label text-muted small">Image 2</label>
                                                                <input type="file" data-ng-model="fileModel" class="form-control imageLinkedInput" id="editEventImage2" name="edited_event_image2" accept="image/*" required>
                                                                <img src="{{ selectedEventData.eventPics[1] }}" class="my-2 ratio-16-9 object-fit-cover border-0 rounded inputLinkedImage">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mt-5 d-flex justify-content-between">
                                                        <button data-ng-click="eventEditorVisible = false" type="reset" class="col-4 btn btn-outline-secondary border-0 clickDown">Discard</button>
                                                        <button type="submit" class="col-7 btn btn-outline-primary clickDown">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-10 col-xl-7 p-2">
                                    <button class="btn bg-black4 mx-auto mb-3 clickDown" data-bs-toggle="collapse" data-bs-target="#newEventPoster"><span class="fa fa-plus me-2 small"></span> Add event record</button>
                                    <form name="new_event_poster" method="post" enctype="multipart/form-data" class="collapse show" id="newEventPoster">
                                        <div class="mb-3 d-none">
                                            <label for="toMail" class="form-label fw-bold">Email</label>
                                            <input type="email" class="form-control h-3rem" id="toMail" name="email" autocomplete="email" placeholder="Email" value="<?php echo $activeAdminEmail ?>" required>
                                            <div class="invalid-feedback">Please enter a valid email address.</div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="newEventType" class="form-label fw-bold">Event type</label>
                                            <select class="form-select" id="newEventType" name="new_event_type" required>
                                                <option value="" disabled selected>Not selected</option>
                                                <option value="rehearsal">Rehearsal</option>
                                                <option value="holyMass">Holy Mass</option>
                                                <option value="concert">Concert</option>
                                                <option value="recordingSession">Recording Session</option>
                                                <option value="videoProduction">Video Production</option>
                                                <option value="wedding">Wedding</option>
                                                <option value="communityOutreach">Community Outreach</option>
                                                <option value="musicWorkshop">Music Workshop</option>
                                                <option value="retreat">Retreat</option>
                                                <option value="visit">Visit</option>
                                                <option value="travel">Travel</option>
                                                <option value="tvShow">TV Show</option>
                                                <option value="fundraiser">Fundraiser</option>
                                                <option value="choirCompetition">Choir Competition</option>
                                                <option value="anniversaryCelebration">Anniversary Celebration</option>
                                                <option value="musicFestival">Music Festival</option>
                                                <option value="charityEvent">Charity Event</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="eventYear" class="form-label fw-bold">Event date</label>
                                            <div class="d-sm-flex flex-wrap justify-content-between">
                                                <div class="col-sm-5 form-group mx-3">
                                                    <label for="eventYear" class="small fst-italic">Select year</label>
                                                    <select id="eventYear" name="new_event_year" class="form-control" required>
                                                        <!-- Options for years -->
                                                        <option value="" disabled selected>Year</option>
                                                        <?php
                                                        $currentYear = date("Y");
                                                        for ($year = $currentYear; $year >= 2017; $year--) {
                                                            echo "<option value='$year'>$year</option>";
                                                        }
                                                        ?>
                                                    </select>
                                                    <div class="invalid-feedback">Please select a year.</div>
                                                </div>
                                                <div class="col-sm-5 form-group mx-3">
                                                    <label for="eventMonth" class="small fst-italic">Select month</label>
                                                    <select id="eventMonth" name="new_event_month" class="form-control" required>
                                                        <!-- Options for months -->
                                                        <option value="" selected disabled>Month</option>
                                                        <?php
                                                        for ($month = 1; $month <= 12; $month++) {
                                                            $monthName = date("M", mktime(0, 0, 0, $month, 1));
                                                            echo "<option value='$month'>$monthName</option>";
                                                        }
                                                        ?>
                                                    </select>
                                                    <div class="invalid-feedback">Please select a month.</div>
                                                </div>
                                                <div class="col-sm-5 form-group mx-3">
                                                    <label for="eventDay" class="small fst-italic">Select day</label>
                                                    <select id="eventDay" name="new_event_day" class="form-control" required>
                                                        <!-- Options for days -->
                                                        <option value="" selected disabled>Day</option>
                                                        <?php
                                                        for ($day = 1; $day <= 31; $day++) {
                                                            $formattedDay = sprintf("%02d", $day); // Format with leading zeros
                                                            echo "<option value='$day'>$formattedDay</option>";
                                                        }
                                                        ?>
                                                    </select>
                                                    <div class="invalid-feedback">Please select a day.</div>
                                                </div>
                                            </div>
                                            <div class="invalid-feedback">Please choose a valid date.</div>
                                        </div>
                                        <div class="mb-3 col-12">
                                            <label for="eventLocation" class="form-label fw-bold">Location</label>
                                            <input type="text" class="form-control" id="eventLocation" name="new_event_location" placeholder="Enter event location" required>
                                            <div class="invalid-feedback">Please enter event location.</div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="none" class="form-label fw-bold">Notify to</label>
                                            <div class="px-3 small">
                                                <div class="form-check d-flex align-items-center gap-2">
                                                    <input type="radio" class="form-check-input w-1_5rem h-1_5rem" name="notify_event_to" id="allMembers" value="all">
                                                    <label for="allMembers" class="form-check-label">All <span class="fa fa-info btn btn-sm ms-3 bg-black4 text-muted small" title="Even subscribers will know"></span></label>
                                                </div>
                                                <div class="form-check d-flex align-items-center gap-2">
                                                    <input type="radio" class="form-check-input w-1_5rem h-1_5rem" name="notify_event_to" id="esgMembers" value="esg">
                                                    <label for="esgMembers" class="form-check-label">Members only</label>
                                                </div>
                                                <div class="form-check d-flex align-items-center gap-2">
                                                    <input type="radio" class="form-check-input w-1_5rem h-1_5rem" name="notify_event_to" id="none" value="none" checked>
                                                    <label for="none" class="form-check-label">No one (Just post)</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="eventBody" class="form-label fw-bold">Event about</label>
                                            <textarea maxlength="350" name="new_event_body" id="eventBody" cols="30" rows="5" class="p-3 w-100" placeholder="Enter event details"></textarea>
                                            <div class="invalid-feedback">Please enter message.</div>
                                        </div>
                                        <div class="mb-3">
                                            <div class="form-label fw-bold">Event images</div>
                                            <div class="d-sm-flex justify-content-between gap-2">
                                                <div class="col-sm-5 overflow-hidden">
                                                    <label for="eventImage1" class="formform-label text-muted small">Image 1</label>
                                                    <input type="file" data-ng-model="eventImage1" ng-blur="imageChanged()" class="form-control imageLinkedInput" id="eventImage1" name="new_event_image1" accept="image/*" required>
                                                    <img data-ng-show="eventImage1Valid" src="" class="my-2 ratio-16-9 object-fit-cover border-0 rounded inputLinkedImage">
                                                </div>
                                                <div class="col-sm-5 overflow-hidden">
                                                    <label for="eventImage2" class="formform-label text-muted small">Image 2</label>
                                                    <input type="file" data-ng-model="eventImage2" ng-blur="imageChanged()" class="form-control imageLinkedInput" id="eventImage2" name="new_event_image2" accept="image/*" required>
                                                    <img data-ng-show="eventImage2Valid" src="" class="my-2 ratio-16-9 object-fit-cover border-0 rounded inputLinkedImage">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-5 d-flex justify-content-between">
                                            <button type="reset" class="col-4 btn btn-outline-secondary border-0 clickDown" data-bs-toggle="collapse" data-bs-target="#newEventPoster">Discard</button>
                                            <button type="submit" class="col-7 btn btn-outline-primary clickDown">Post event</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Users content -->
                <div class="pb-5 collapse dynamic-data-section" id="usersSpace">
                    <nav class="mb-4">
                        <div class="nav nav-tabs justify-content-center border-0" id="nav-tab" role="tablist">
                            <button class="nav-link clickDown mx-1 active" id="nav-members-tab" data-bs-toggle="tab" data-bs-target="#nav-members" type="button"
                                role="tab" aria-controls="nav-members" aria-selected="false">All <span class="badge bg-light text-myBlue rounded-pill border border-myBlue ms-2">{{ totalMembers }}</span></button>
                            <button class="nav-link clickDown mx-1" id="nav-staff-tab" data-bs-toggle="tab" data-bs-target="#nav-staff" type="button"
                                role="tab" aria-controls="nav-staff" aria-selected="true">Staff <span class="badge bg-light text-myBlue rounded-pill border border-myBlue ms-2">{{ totalAdminMembers }}</span></button>
                            <button class="nav-link clickDown mx-1" id="nav-subscribers-tab" data-bs-toggle="tab" data-bs-target="#nav-subscribers" type="button"
                                role="tab" aria-controls="nav-subscribers" aria-selected="false">Subscribers <span class="badge bg-light text-myBlue rounded-pill border border-myBlue ms-2">{{ totalSubscribers }}</span></button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <!-- Members -->
                        <div class="tab-pane fade show active" id="nav-members" role="tabpanel" aria-labelledby="nav-members-tab">
                            <div class="d-lg-flex justify-content-around mx-auto mb-4 py-lg-5 px-lg-4 px-xl-5 alert" style="background-color: var(--appColor2);">
                                <h5 class="col-lg-3 mb-3 mb-lg-0 fs-2"><span class="fa fa-users me-2"></span> Members</h5>
                                <p class="mb-lg-0 text-justify small">
                                    A group member is a person who is a singer in the group. Group members can also include individuals who provide various forms of support, such as financial assistance or other beneficial activities that help the group.<br><br>
                                    <span class="fs-5">Manage members below</span>
                                </p>
                            </div>
                            <!--  -->
                            <div class="d-lg-flex mt-3">
                                <div class="col-lg-4 d-flex justify-content-center">
                                    <div class="h-fit mb-md-4 border-0 shadow-sm my-item item-appColor person-info-card" data-ng-class="{'working' : personElementInfoVisible}">
                                        <div class="my-item-header d-lg-none" data-ng-show="personElementInfoVisible">
                                            <h5 class="my-item-header__title"><span class="fa fa-info-circle mr-3"></span> Person info</h5>
                                            <div class="rad-3 my-item-header__icons">
                                                <button class="fa fa-ellipsis" data-menu-toggle=".member-cont-menu"></button>
                                                <button class="fa fa-close hide-par-fix item-closer" data-ng-click="personElementInfoVisible = false;"></button>
                                            </div>
                                        </div>
                                        <div class="p-0 my-item-body" data-ng-style="{'box-shadow' : !personElementInfoVisible ? 'none' : ''}" data-ng-class="{'bg-mainColor' : personElementInfoVisible}">
                                            <img data-ng-src="{{ selectedMemberData.imageURL }}" class="card-img-top ratio-1-1 object-fit-cover" alt="ESG member" data-ng-class="{'p-md-3 rad-20' : !personElementInfoVisible}" style="object-position: center 20%">
                                            <div class="p-3 mt-2">
                                                <h5 class="mb-0 card-title">{{ selectedMemberData.fullName }}</h5>
                                                <p class="card-text small">
                                                    A member/participant of ESG.
                                                </p>
                                                <div data-ng-show="selectedMemberData.status !== undefined" class="small">
                                                    <h6>Status</h6>
                                                    <ul class="list-unstyled border-start border-2 border-black3 ps-2">
                                                        <li>Voice section: {{ selectedMemberData.status.voice | capitalize }}</li>
                                                        <li>Active: <span data-ng-show="selectedMemberData.status.active">Yes</span> <span data-ng-show="!selectedMemberData.status.active">No</span></li>
                                                    </ul>
                                                    <h6>Contact</h6>
                                                    <ul class="list-unstyled ps-2 small">
                                                        <li>Phone: {{ selectedMemberData.phone_number }}</li>
                                                        <li>Email: {{ selectedMemberData.email }}</li>
                                                    </ul>
                                                    <h6>Choirs</h6>
                                                    <ul class="list-unstyled ps-2 small">
                                                        <li data-ng-repeat="chr in selectedMemberData.otherChoirsDetails">♦️ {{ chr.choirName }}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 px-sm-2 mt-3">
                                    <div class="d-md-flex gap-2 align-items-center mb-3">
                                        <h6 class="d-flex align-items-baseline text-myBlue">
                                            <span class="fs-2 me-2">{{ totalMembers }}</span> members
                                        </h6>
                                        <!-- position-relative col-8 col-sm-6 col-xl-3 ms-auto my-3 p-1 rad-10 border-2 border-black4 search-box -->
                                        <div class="position-relative col-8 col-sm-6 ms-auto my-3 p-1 rad-10 border-2 border-black4 search-box">
                                            <input type="text" placeholder="🔍Find a member ..." class="borderless small search-box__input" id="esgMemberFilter" data-ng-model="membersFilter">
                                            <button class="r-middle bg-black3 border border-2 search-box__clearer" data-ng-show="membersFilter !== '' && membersFilter !== undefined" data-ng-click="membersFilter = ''">&times;</button>
                                        </div>
                                    </div>
                                    <table class="table w-100" style="overflow: hidden;">
                                        <thead>
                                            <tr>
                                                <!-- <th scope="col">N°</th> -->
                                                <th scope="col">Member</th>
                                                <th scope="col">More</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="ptr memberElement" data-ng-repeat="x in retrievedListOfMembers | filter : membersFilter" data-ng-click="select_member($event)" data-id="{{ x.id }}">
                                                <!-- <td>{{ $index + 1 }}</td> -->
                                                <td class="d-flex align-items-center">
                                                    <img src="{{ x.imageURL }}" alt="member image" class="w-2rem ratio-1-1 object-fit-cover me-2 rounded-circle"> 
                                                    {{ x.fullName}} 
                                                    <span ng-if="!x.status.active" class="badge bg-black4 text-black2 ms-auto">Inactive</span>
                                                </td>
                                                <td><button class="btn fa fa-ellipsis" data-menu-toggle=".member-cont-menu"></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- Members options -->
                                    <div class="rad-7 my-cont-menu member-cont-menu">
                                        <ul class="small">
                                            <li class="rad-100vw m-2 bg-white3 member-data-editor" data-totoggle=".song-editor"><span class="fa fa-user-edit w-25px"></span> Edit</li>
                                            <li class="d-lg-none border-0 member-section-changer" data-ng-click="personElementInfoVisible = true"><span class="fa fa-info-circle w-25px"></span> Info</li>
                                            <li class="border-0 member-section-changer" data-ng-click="voiceSectionChangerVisible = true"><span class="fa fa-users-cog w-25px"></span> Change section</li>
                                            <li class="border-0 member-activeness-toggler">
                                                <span data-ng-show="!selectedMemberData.status.active" data-ng-click="reactivate_member()"><span class="fa fa-user-check w-25px"></span> Activate</span>
                                                <span data-ng-show="selectedMemberData.status.active" data-ng-click="deactivate_member()"><span class="fa fa-user-times w-25px"></span> Deactivate</span>
                                            </li>
                                            <li class="border-0 rad-100vw text-danger member-removal" data-ng-click="remove_member()"><span class="fa fa-user-minus w-25px"></span> Remove</li>
                                        </ul>
                                    </div>
                                    <!-- Member section changer -->
                                    <div class="fix-holder fix-holder-appColor2_cons blur-bg-2px" data-ng-class="{'d-block': voiceSectionChangerVisible}">
                                        <div class="col-11 col-sm-8 col-md-6 col-xl-4 m-auto mt-2 mt-md-5 p-3 bg-white rad-10" style="animation: flyInTop .3s 1;">
                                            <div class="h6 small text-center text-black2">{{ selectedMemberData.lastName }} {{ selectedMemberData.firstName }} / <b>{{ selectedMemberData.status.voice | capitalize }}</b></div>
                                            <hr>
                                            <form name="memberNewVoiceSection" action="" method="POST" enctype="multipart/form-data" data-ng-submit="change_member_voice_section($event)">
                                                <div class="mb-3">
                                                    <label for="newVoiceSection" class="form-label fw-bold">New voice section</label>
                                                    <select class="form-select" id="newVoiceSection" name="new_voice_section" data-ng-model="memberModifiedData.voice_section" required>
                                                        <option value="" disabled selected>Not selected</option>
                                                        <option data-ng-if="'soprano' !== selectedMemberData.status.voice" value="soprano">Soprano</option>
                                                        <option data-ng-if="'alto' !== selectedMemberData.status.voice" value="alto">Alto</option>
                                                        <option data-ng-if="'tenor' !== selectedMemberData.status.voice" value="tenor">Tenor</option>
                                                        <option data-ng-if="'bass' !== selectedMemberData.status.voice" value="bass">Bass</option>
                                                    </select>
                                                    <div class="invalid-feedback" ng-show="!memberModifiedData.voice_section">Please select a voice section.</div>
                                                </div>
                                                <div class="mt-5 d-flex justify-content-between">
                                                    <button data-ng-click="voiceSectionChangerVisible = false" type="reset" class="col-4 btn btn-outline-secondary border-0 clickDown">Discard</button>
                                                    <button data-ng-disabled="!memberModifiedData.voice_section" type="submit" class="col-7 btn btn-outline-primary clickDown">Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Adding staff member -->
                            <?php if ($activeAdminAccessLevel == 3 || $activeAdminTitle === 'President'): ?>
                                <button class="btn bg-black4 d-block mx-auto my-4" data-bs-toggle="collapse" data-bs-target=".add-new-group-member"><span class="fa fa-plus me-2"></span> New group member</button>
                                <div class="my-5 collapse add-new-group-member">
                                    <article class="px-md-3 px-lg-4 mb-4 mb-lg-5">
                                        <h5 class="mb-3"><span class="fa fa-user-friends me-2"></span> Add a group member</h5>
                                        <p class="text-justify small">
                                            A group member is a person who is a singer in the group. Group members can also include individuals who provide various forms of support, such as financial assistance or other beneficial activities that help the group.
                                        </p>
                                        <!-- <hr class="mb-5"> -->
                                    </article>
                                    <form name="newMemberForm" data-ng-submit="submit_new_member_form()" enctype="multipart/form-data" class="d-flex flex-wrap gap-2 justify-content-around col-lg-10 col-xl-8 py-3 p-md-4 container needs-validation" novalidate>
                                        <div class="mb-3 col-12 col-sm-11 col-md-5">
                                            <label for="first_name" class="form-label fw-bold">First name</label>
                                            <input type="text" class="form-control" id="first_name" name="first_name" autocomplete="first_name" data-ng-model="newMemberFormData.first_name" placeholder="Eg: Ndayizeye" required>
                                            <div class="invalid-feedback">Please enter first name.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-sm-11 col-md-5">
                                            <label for="last_name" class="form-label fw-bold">Last name</label>
                                            <input type="text" class="form-control" id="last_name" data-ng-model="newMemberFormData.last_name" name="last_name" placeholder="Eg: Aline" required>
                                            <div class="invalid-feedback">Please enter last name.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-sm-11 col-md-5">
                                            <label for="member_gender" class="form-label fw-bold">Gender</label>
                                            <select class="form-select" id="member_gender" name="member_gender" data-ng-model="newMemberFormData.gender" required>
                                                <option value="" disabled>Not selected</option>
                                                <option value="female">Female</option>
                                                <option value="male">Male</option>
                                            </select>
                                            <div class="invalid-feedback">Please select gender.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-sm-11 col-md-5">
                                            <label for="email" class="form-label fw-bold">Email</label>
                                            <input type="email" class="form-control" id="email" data-ng-model="newMemberFormData.email" name="email" autocomplete="email" placeholder="Email" required>
                                            <div class="invalid-feedback">Please enter a valid email address.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-sm-11 col-md-5">
                                            <label for="phone_number" class="form-label fw-bold">Phone Number</label>
                                            <input type="number" class="form-control" id="phone_number" data-ng-model="newMemberFormData.phone_number" name="phone_number" placeholder="Phone Number">
                                            <div class="invalid-feedback">Please enter phone number.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-sm-11 col-md-5">
                                            <label for="newMemberImage" class="form-label fw-bold">Image</label>
                                            <input type="file" class="form-control" id="newMemberImage" name="image" accept="image/*" data-ng-model="newMemberFormData.image">
                                            <div class="invalid-feedback">Please upload an image.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-sm-11">
                                            <label for="voice_section" class="form-label fw-bold">Voice section</label>
                                            <select class="form-select" id="voice_section" name="voice_section" data-ng-model="newMemberFormData.voice_section" required>
                                                <option value="" disabled>Not selected</option>
                                                <option value="soprano">Soprano</option>
                                                <option value="alto">Alto</option>
                                                <option value="tenor">Tenor</option>
                                                <option value="bass">Bass</option>
                                            </select>
                                            <div class="invalid-feedback">Please select a voice section.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-sm-11">
                                            <label for="other_choir_name" class="form-label fw-bold">Other choirs</label>
                                            <div class="form-text mb-2">
                                                Other different choirs in which the member exists
                                            </div>
                                            <ul class="list-style-square text-muted">
                                                <li data-ng-repeat="x in newMemberOtherChoirs" class="small">
                                                    <b>{{ x.choirName }}</b> based at <b>{{ x.choirLocation }}</b> <span class="btn btn-sm fa fa-close ms-2 text-danger border border-danger" data-ng-click="remove_new_member_other_choir($index)"></span>
                                                </li>
                                            </ul>
                                            <div class="choirsList">
                                                <div class="choir-element">
                                                    <input type="text" class="form-control mb-2" id="other_choir_name" name="other_choir_name" placeholder="Choir's name" data-ng-model="otherChoirName">
                                                    <input type="text" class="form-control mb-2" id="other_choir_location" name="other_choir_location" placeholder="Choir's location" data-ng-model="otherChoirLocation">
                                                </div>
                                            </div>
                                            <span class="btn btn-secondary" id="add-choir-element" data-ng-click="add_new_member_other_choir()">Add choir</span>
                                            <div class="invalid-feedback">Please add at least 1 choir.</div>
                                        </div>
                                        <button type="submit" class="btn btn-primary mt-5">Add member <span class="fas fa-plus ms-2"></span></button>
                                    </form>
                                </div>
                            <?php endif; ?>
                        </div>
                        
                        <!-- Staff -->
                        <div class="tab-pane fade show" id="nav-staff" role="tabpanel" aria-labelledby="nav-staff-tab">
                            <div class="d-lg-flex justify-content-around mx-auto mb-4 py-lg-5 px-lg-4 px-xl-5 alert" style="background-color: var(--appColor2);">
                                <h5 class="col-lg-3 mb-3 mb-lg-0 fs-2"><span class="fa fa-user-tie me-2"></span> Staff</h5>
                                <p class="mb-lg-0 text-justify small">
                                    A committee dedicated to guiding and coordinating the group to ensure optimal operation and growth. The committee comprises a president, a vice president, an accountant, a social affairs officer, a secretary, council members, and two individuals focused on fostering solo vocal improvement among group members.<br><br>
                                    <span class="fs-5">Manage staff members below</span>
                                </p>
                            </div>
                            <div class="d-lg-flex mt-3">
                                <div class="col-lg-4 d-flex justify-content-center">
                                    <div class="border-0 shadow-sm card" style="max-width: 15rem;" id="staffMemberCard">
                                        <img data-ng-if="selectedAdminData.imageURL === undefinded" src="../../Pics/person_holder_image.png" class="card-img-top p-3 rounded staff-member-image" alt="Staff member">
                                        <img data-ng-show="selectedAdminData.imageURL !== undefinded" data-ng-src="{{ selectedAdminData.imageURL }}" class="card-img-top ratio-1-1 object-fit-cover" alt="ESG member" data-ng-class="{'p-md-3 rad-20' : !personElementInfoVisible}" style="object-position: center 20%">
                                        <div class="card-body">
                                            <h5 class="mb-0 card-title">{{ selectedAdminData.fullName }}</h5>
                                            <p class="card-text small">
                                                An admin/staff member of ESG.
                                            </p>
                                            <ul data-ng-show="selectedAdminData.imageURL !== undefinded" class="list-unstyled small">
                                                <li class="mb-2">
                                                    <b>Title:</b> <span>{{ selectedAdminData.title }}</span>
                                                </li>
                                                <li class="mb-2">
                                                    <b>Email:</b> <span>{{ selectedAdminData.email }}</span>
                                                </li>
                                                <li class="mb-2">
                                                    <b>Phone:</b> <span>{{ selectedAdminData.phone_number }}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 px-sm-2 mt-3">
                                    <h6 class="d-flex align-items-baseline text-myBlue">
                                        Staff members</span>
                                    </h6>
                                    <table class="table admins-list">
                                        <thead>
                                            <tr>
                                                <!-- <th scope="col">N°</th> -->
                                                <th scope="col">Name</th>
                                                <th scope="col">Title</th>
                                            </tr>
                                        </thead>
                                        <tbody class="active-options">
                                            <tr class="ptr adminElement" data-ng-repeat="x in adminMembers" data-ng-click="select_admin($event)" data-id="{{ x.id }}">
                                                <!-- <td>{{ $index + 1 }}</td> -->
                                                <td class="full-name">{{ x.fullName }}</td>
                                                <td class="title">{{ x.title }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <!-- Adding staff member -->
                            <?php if ($activeAdminAccessLevel == 3): ?>
                                <button class="btn bg-black4 d-block mx-auto my-4" data-bs-toggle="collapse" data-bs-target=".add-new-staff-member"><span class="fa fa-plus me-2"></span> New staff member</button>
                                <div class="my-5 collapse add-new-staff-member">
                                    <article class="px-md-3 px-lg-4 mb-4 mb-lg-5">
                                        <h5 class="mb-3"><span class="fa fa-user-tie me-2"></span> Add a staff member</h5>
                                        <!-- <hr class="mb-5"> -->
                                    </article>
                                    <form name="addAdminUserForm" action="add_admin_user.php" method="post" enctype="multipart/form-data" class="d-flex flex-wrap gap-2 justify-content-around col-lg-10 col-xl-8 py-3 p-md-4 container needs-validation" novalidate>
                                        <!-- <div class="mb-3 col-12">
                                            <label for="title" class="form-label fw-bold">Title</label>
                                            <input type="text" class="form-control h-3rem" id="title" name="title" placeholder="Eg: Accountant" required>
                                            <div class="invalid-feedback">Please enter <b>Staff Title</b>.</div>
                                        </div> -->
                                        <div class="mb-3 col-12 col-md-5">
                                            <label for="first_name" class="form-label fw-bold">First name</label>
                                            <input type="text" class="form-control h-3rem" id="first_name" name="first_name" autocomplete="first_name" placeholder="Eg: Ndayizeye" required>
                                            <div class="invalid-feedback">Please enter first name.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-md-5">
                                            <label for="last_name" class="form-label fw-bold">Last name</label>
                                            <input type="text" class="form-control h-3rem" id="last_name" name="last_name" placeholder="Eg: Aline" required>
                                            <div class="invalid-feedback">Please enter last name.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-md-5">
                                            <label for="image" class="form-label fw-bold">Image</label>
                                            <input type="file" class="form-control" id="image" name="image" accept="image/*" required>
                                            <div class="invalid-feedback">Please upload an image.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-md-5">
                                            <label for="email" class="form-label fw-bold">Email</label>
                                            <input type="email" class="form-control h-3rem" id="email" name="email" autocomplete="email" placeholder="Email" required>
                                            <div class="invalid-feedback">Please enter a valid email address.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-md-5">
                                            <label for="phone_number" class="form-label fw-bold">Phone Number</label>
                                            <input type="number" class="form-control h-3rem" id="phone_number" name="phone_number" placeholder="Phone Number" required>
                                            <div class="invalid-feedback">Please enter phone number.</div>
                                        </div>
                                        <div class="mb-3 col-12 col-md-5">
                                            <label for="access_level" class="form-label fw-bold">Access Level</label>
                                            <select class="form-select" id="access_level" name="access_level" required>
                                                <option value="1">Level 1 (Limited Access)</option>
                                                <option value="2">Level 2 (Moderate Access)</option>
                                                <option value="3">Level 3 (Full Access)</option>
                                            </select>
                                            <div class="invalid-feedback">Please select an access level.</div>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Add Admin <span class="fas fa-check-circle ms-2"></span> </button>
                                    </form>
                                </div>
                            <?php endif; ?>
                        </div>
                        
                        <!-- Subscribers -->
                        <div class="tab-pane fade" id="nav-subscribers" role="tabpanel" aria-labelledby="nav-subscribers-tab">
                            <div class="d-lg-flex justify-content-around mx-auto mb-4 py-lg-5 px-lg-4 px-xl-5 alert" style="background-color: var(--appColor2);">
                                <h5 class="col-lg-3 mb-3 mb-lg-0 fs-2"><span class="fa fa-bell me-2"></span> Subs</h5>
                                <p class="mb-lg-0 text-justify small">
                                    A subscriber is an individual who has signed up to receive various updates from the platform. These subscriptions can be tailored to different group activities, such as events, announcements, or new content releases. Subscribers have the flexibility to customize or remove their subscriptions at any time, ensuring they only receive the updates most relevant to their interests<br><br>
                                    <span class="fs-5">Manage subscribers below</span>
                                </p>
                            </div>
                            <!--  -->
                            <div class="d-lg-flex mt-3">
                                <div class="col-lg-4 d-flex justify-content-center">
                                    <div class="border-0 shadow-sm card" style="max-width: 15rem;">
                                        <img src="../../Pics/person_holder_image.png" class="card-img-top p-3" alt="ESG subscriber">
                                        <div class="card-body">
                                            <h5 class="card-title">Subscriber</h5>
                                            <p class="card-text small">
                                                A subscriber who will receive updates about various ESG events.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 px-sm-2 mt-3">
                                    <h6 class="text-myBlue mb-3 d-flex align-items-center">
                                        <!-- ESG subscriber <span class="badge bg-light text-myBlue rounded-pill border border-myBlue ms-2"><?php echo $totalSubscribers?></span> -->
                                    </h6>
                                    <ol class="my-list subscribers-list">
                                        <?php
                                        // include '../../connect.php';
                                        // // Query to fetch existing subscribers
                                        // $subsc = "SELECT * FROM subscribers";
                                        // $subscResult = mysqli_query($conn, $subsc);
                                        // // Check for returned rows
                                        // if (mysqli_num_rows($subscResult) > 0) {
                                        //     // Show a list of subscribers
                                        //     while ($row = mysqli_fetch_assoc($subscResult)) {
                                        //         echo '<li class="border-0">' . $row['subscEmail'] . '</li>';
                                        //     }
                                        // }
                                        // // Close the connection
                                        // mysqli_close($conn);
                                        ?>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Todos content -->
                <div class="pb-5 collapse dynamic-data-section" id="todosSpace">
                    <h4 class="fs-6 text-myBlue my-4">Upload these songs</h4>
                    <!-- No records -->
                    <div data-ng-if="noRecordsOfSongsToUpload" data-ng-class="{'show': noRecordsOfSongsToUpload, 'd-grid': noRecordsOfSongsToUpload}" class="px-3 text-muted collapse">
                        No records to show yet
                    </div>

                    <!-- Error fetching -->
                    <div data-ng-if="fetchSongsToUploadError" data-ng-class="{'show': fetchSongsToUploadError}" class="mb-4 text-center text-danger collapse">
                        Something went wrong, please <a href="#" data-ng-click="showSongsToUpload()">try again</a>
                    </div>
                    
                    <table data-ng-if="!fetchSongsToUploadError && !noRecordsOfSongsToUpload" class="table upload-todos-list">
                        <thead>
                            <tr>
                                <th scope="col" class="border text-nowrap">N°</th>
                                <th scope="col" class="border text-nowrap">Song name</th>
                                <th scope="col" class="border text-nowrap">Song category</th>
                                <th scope="col" class="border text-nowrap">Other category</th>
                                <th scope="col" class="border text-nowrap" title="Uploader's name">Name</th>
                                <th scope="col" class="border text-nowrap" title="Uploader's email">Email</th>
                                <th scope="col" class="border text-nowrap">Song owner</th>
                                <?php 
                                if (strpos($activeAdminFirstName, 'Hirwa') !== false && $activeAdminTitle == 'IT') {
                                    echo '<th scope="col" class="border text-nowrap text-center">Complete</th>';
                                }
                                ?>
                            </tr>
                        </thead>
                        <tbody>
                            <tr data-ng-repeat="x in retrievedSongsToUpload">
                                <td>{{ x.id }}</td>
                                <td style="font-size: 75%; align-content: center;">{{ x.songName }}</td>
                                <td>{{ x.songCategory }}</td>
                                <td>{{x .otherSongCategory }}</td>
                                <td class="small align-content-center">{{ x.uploaderName }}</td>
                                <td class="small align-content-center">{{ x.uploaderEmail }}</td>
                                <td class="small align-content-center">{{ x.ownershipChoice }}</td>
                                <?php 
                                if (strpos($activeAdminFirstName, 'Hirwa') !== false && $activeAdminTitle == 'IT') {
                                    echo 
                                    '<td class="text-center">
                                        <button class="btn btn-sm btn-outline-success fas fa-check mark-task-complete" data-id="{{x.id}}" data-name="{{ x.songName }}" data-bs-toggle="tooltip" title="Mark complete"></button>
                                    </td>';
                                }
                                ?>
                            </tr>
                        </tbody>
                    </table>
                    <hr class="my-4 opacity-0">

                    <h4 class="fs-6 text-myBlue my-4">Organize these files</h4>
                    <!-- No records -->
                    <div data-ng-if="noRecordsOfSongsToOrganize" data-ng-class="{'show': noRecordsOfSongsToOrganize, 'd-grid': noRecordsOfSongsToOrganize}" class="px-3 text-muted collapse">
                        No records to show yet
                    </div>

                    <!-- Error fetching -->
                    <div data-ng-if="fetchSongsToOrganizeError" data-ng-class="{'show': fetchSongsToOrganizeError}" class="mb-4 text-center text-danger fst-italic collapse">
                        Something went wrong, please <a href="#" data-ng-click="showSongsToOrganize()">try again</a>
                    </div>
                    
                    <!-- Found records -->
                    <table data-ng-if="!fetchSongsToOrganizeError && !noRecordsOfSongsToOrganize" class="table organize-todos-list">
                        <thead>
                            <tr>
                                <th scope="col" class="border">N°</th>
                                <th scope="col" class="border">File name</th>
                                <th scope="col" class="border">From</th>
                                <th scope="col" class="border text-center bg-black4">To</th>
                                <?php 
                                if (strpos($activeAdminFirstName, 'Hirwa') !== false && $activeAdminTitle == 'IT') {
                                    echo '<th scope="col" class="border text-center">Complete</th>';
                                }
                                ?>
                            </tr>
                            </thead>
                            <tbody>
                                <tr data-ng-repeat="x in retrievedSongsToOrganize track by x.id">
                                    <td>{{ x.id }}</td>
                                    <td style="font-size: 75%; align-content: center;">{{ x.songName }}</td>
                                    <td class="small align-content-center">{{ x.fromCategory }}</td>
                                    <td>
                                        <ul class="list-flexible gap-1 m-0 p-0">
                                            <li class="px-2 py-1 small" data-ng-repeat="category in x.toCategory track by $index">{{ category }}</li>
                                        </ul>
                                    </td>
                                    <?php 
                                    if (strpos($activeAdminFirstName, 'Hirwa') !== false && $activeAdminTitle == 'IT') {
                                        echo '<td class="text-center">
                                        <button class="btn btn-sm btn-outline-success fas fa-check mark-task-complete" data-id="{{ x.id }}" data-name="{{ x.songName }}" data-bs-toggle="tooltip" title="Mark complete"></button>
                                        </td>';
                                        }
                                    ?>
                                </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Profile content -->
                <div class="pb-5 collapse dynamic-data-section" id="profileSpace">
                    <div class="d-lg-flex flex-wrap admin-profile-information">
                        <div class="col-lg-6 mb-5 p-sm-3 d-flex justify-content-start profile-image">
                            <img src="<?php echo $activeAdminImage?>" alt="Profile photo" class="w-12rem h-fit img-thumbnail border-0" style="background-image: linear-gradient(transparent, var(--myBlue2)); animation: zoomInBack 2s 1">
                            <div class="px-2 py-3 ms-sm-4 ms-lg-0 ms-xl-4">
                                <h4 class="text-myBlue mb-2">Profile photo</h4>
                                <div class="d-flex flex-column gap-1 my-2">
                                    <button class="btn btn-sm px-3 w-fit d-flex align-items-center justify-content-between rounded-pill bg-black4">
                                        Remove <span class="fa fa-trash-alt ms-2" aria-hidden="true"></span>
                                    </button>
                                    <button class="btn btn-sm px-3 w-fit d-flex align-items-center justify-content-between rounded-pill bg-black4">
                                        Upload <span class="fa fa-image ms-2" aria-hidden="true"></span>
                                    </button>
                                </div>
                                <p class="small p-2 fst-italic text-muted">
                                    An image that appears on your file.
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-5 p-sm-3 d-md-flex justify-content-start personal-info">
                            <span class="fa fa-info flex-center display-1 bg-black-linear-gradient-sm text-black-50 rounded"></span>
                            <div class="px-2 py-3 ms-sm-4 ms-lg-0 ms-xl-4">
                                <h4 class="text-myBlue mb-2">Contact info</h4>
                                <ul class="list-unstyled small">
                                    <li class=""><b>First name</b>: <span><?php echo $activeAdminFirstName?></span></li>
                                    <li class=""><b>Last name</b>: <span><?php echo $activeAdminLastName?></span></li>
                                    <li class=""><b>Email</b>: <span><?php echo $activeAdminEmail?></span></li>
                                    <li class=""><b>Phone</b>: <span><?php echo $activeAdminPhoneNumber?></span></li>
                                </ul>
                                <div>
                                    <button class="btn btn-sm px-3 rounded-pill bg-black4">Change info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style>
                        @media screen and (min-width: 768px) {
                            #profileSpace .personal-info > span {
                                width: 12rem;
                            }
                        }
                    </style>
                </div>

                <!-- Settings content -->
                <div class="pb-5 collapse dynamic-data-section" id="settingsSpace">
                    <h4 class="fs-6">ESG settings</h4>
                </div>
            </div>
        </main>

        <!-- Fixed elements -->
        <div class="my-dialog self-close admin-logout-dialog">
            <div class="col-11 col-sm-8 col-md-6 col-lg-4 bg-bodi my-dialog-content">
                <h5><span class="fa fa-sign-out-alt"></span> Logging out</h5>
                <p class="p-3 text-center small">
                    Do you want to log out?
                </p>
                <div class="my-dialog-buttons">
                    <button class="btn btn-light clickDown show-touch my-dialog-closer">
                        No, stay <span class="touch-anim d-md-none"></span>
                    </button>
                    <button class="btn btn-outline-dark position-relative d-flex gap-3 justify-content-center clickDown show-touch">
                        <a href="../../logout.php?redirect=../../index" class="text-decoration-none flex-center position-absolute inset-0">
                        Log out</a> <span class="touch-anim d-md-none"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col">
                    <img src="../../Pics/EasternSingersLogo.png" alt="Logo" class="logo">
                    <span class="organization-name">Your Organization</span>
                </div>
            </div>
        </div>
    </footer> -->
    <style>
        .subscribers-list li::marker {
            color: var(--primary-color);
        }
        @media screen and (min-width: 768px) {
            .subscribers-list {
                columns: 2;
            }
        }
    </style>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="../../MyScripts.js?v=1.1145"></script>
    <script src="../../scripts/dashboard.js?v=1.1151"></script>
    <script>
        // Disabling form submissions with invalid fields
        (function () {
            'use strict'
            // Fetch forms to apply custom Bootstrap validation
            var forms = document.querySelectorAll('.needs-validation')
            // Prevent submission
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                    form.addEventListener('submit', function (event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                        }
                        form.classList.add('was-validated')
                    }, false)
                })
        })();
    </script>
</body>
</html>
