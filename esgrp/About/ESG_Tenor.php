<!DOCTYPE html>
<?php
include '../../connect.php'; // Connect
// php functions
include '../../php_scripts.php';

// Query all songs from the db
$voiceType = 'tenor';
$allMembers = "SELECT * FROM esg_members ORDER BY lastName";
$allMembersResults = mysqli_query($conn, $allMembers);
$voiceMembers = [];
if (mysqli_num_rows($allMembersResults) > 0) {
    while ($row = mysqli_fetch_assoc($allMembersResults)) {
        if (json_decode($row['status'])->voice == $voiceType && json_decode($row['status'])->active === true) {
            $voiceMembers[] = $row;
        }
    }
    $totalVoiceMembers = count($voiceMembers); // Counter
}
?>

<html lang="en">
<head>
	<title>ESG Tenor</title>
    
	<link rel="icon" type="image/x-icon" href="../../Pics/ESG_favicon1.ico">
	<link rel="stylesheet" type="text/css" href="../../styles/about.css?v=1.1206">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="author" content="Hirwa Willy">
	<meta name="keywords" content="HTML, CSS">
    
    <!-- online -->
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    
    <!-- offline -->

    <!-- <link rel="stylesheet" href="../../bootstrap5/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../fontawesome6-2-0/css/all.css">
    <script src="../../bootstrap5/js/bootstrap.min.js"></script> -->
    <!-- <script src="../../bootstrap5/js/bootstrap.bundle.min.js"></script>
    <script src="../../bootstrap5/js/bootstrap.bundle.min.js.map"></script> -->
    <!-- <script src="../../jq/jquery-3.7.1.js"></script> -->
     
    <!-- fonts -->
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body class="bg-bodi" data-spy="scroll" data-bs-target=".navbar" data-offset="20">
    <!-- sm navbar -->
	<div class="d-sm-none fix-holder inx-25 p-2">
		<div class="nav container-xs Sbar-none bordered-end-end" id="mySidenav">
			<div class="position-absolute inx--1"></div>
			<div>
				<li class="nav-item"><a href="../../index" class="nav-link"><span class="fa fa-home text-white" style="font-size: 45px"></span></a></li>
				<li class="nav-item"><a href="../about" class="nav-link">About</a></li>
				<li class="nav-item"><a href="../About/ESG_Songs" class="nav-link">Songs</a></li>
				<li class="nav-item"><a href="../services" class="nav-link">Services</a></li>
				<li class="nav-item"><a href="../About/ESG_FAQs" class="nav-link">FAQs</a></li>
				<li class="nav-item" data-bs-toggle="collapse"	data-bs-target=".MRNV"><a href="#" class="nav-link MoreMenu">More</a></li>
			</div>
			<div class="ps-3 mt-3 collapse MRNV">
				<li class="nav-item"><a href="../About/ESG_Calendar" class="nav-link"> Calendar</a></li>
				<li class="nav-item"><a href="../events" class="nav-link">ESG events</a></li>
				<li class="nav-item"><a href="../Events/ESG_Gallery" class="nav-link">ESG gallery</a></li>
				<li class="nav-item"><a href="../Services/CHM_Songs" class="nav-link">Holy Mass Songs</a></li>
				<li class="nav-item"><a href="../solfeggio" class="nav-link">Learn Solfeggio</a></li>
				<hr>
				<li class="nav-item" id="settingsMenu"><a href="#" class="nav-link">Settings <span class="fa fa-gear"></span></a></li>
			</div>
            <div class="position-absolute r-middle-m theme-changer">
                <div class="position-absolute t-middle p-1 auto_theme choice">Auto</div>
                <div class="position-absolute b-middle-m rad-30 themerICN">
                    <span class="fa fa-moon position-absolute b-middle w-100 ratio-1-1 flex-center rad-50"></span>
                </div>
            </div>
		</div>
	</div>
    <!-- lg navbar -->
    <nav class="navbar navbar-expand-sm fixed-top" id="Main_nav" role="navigation">
        <a href="../../index" class="navbar-brand me-auto ms-0">
            <img id="brandImage" src="../../Pics/ESG_favicon1.png">
        </a>
		<div class="navbar-header navbar-toggle d-flex d-sm-none justify-content-between me-0">
			<div class="navIcon border-0" id="menuToggler">
				<div class="menu-bar"></div>
				<div class="menu-bar"></div>
				<div class="menu-bar"></div>
			</div>
		</div>
        <div class="collapse navbar-collapse" id="menu">
            <ul class="nav navbar-nav">
                <li class="nav-item"><a class="nav-link" href="../about">About</a></li>
                <li class="nav-item"><a class="nav-link" href="../About/ESG_Songs">Songs</a></li>
                <li class="nav-item"><a class="nav-link" href="../services">Services</a></li>
                <li class="nav-item"><a class="nav-link" href="../About/ESG_Calendar">Calendar</a></li>
                <li class="nav-item dropdown"><a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">More</a>
                    <div class="dropdown-menu">
                        <a href="../events" class="dropdown-item">ESG events</a>
                        <a href="../Events/ESG_Gallery" class="dropdown-item">ESG gallery</a>
                        <a href="../solfeggio" class="dropdown-item">Learn Solfeggio</a>
                    </div>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-end ms-auto">
                <li class="nav-item">
                    <a class="nav-link" id="settings"><span class="fa fa-gear"></span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../About/ESG_FAQs">FAQs</a>
                </li>
            </ul>
        </div>
    </nav>
    
	<!-- Contact us-->
	<div class="position-fixed inx-15 collapse win-hide col-sm-7 col-md-6 col-lg-4 blur-bg-5px shadow item-myBlue contact-us">
		<button class="fa fa-close contact-us_closer" data-bs-toggle="collapse" data-bs-target=".contact-us"></button>
		<div class="d-flex w-100 mb-2 navigator-tabs">
			<button class="fa fa-phone flex-center w-50 active clickDown"></button>
			<button class="fa fa-envelope flex-center w-50 clickDown"></button>
		</div>
		<div class="clmn_wrapper navigator-space">
			<div class="p-3">
				<p class="fw-bold">
					Questions? Need assistance? Just want to chat? Reach us easily via phone. Choose from our dedicated lines.
				</p>
				<div class="mb-2 contact-item">
					<div class="w-50 h4 m-0 ps-2 contact-item_owner">President</div>
					<div class="w-50 contact-item_tools">
						<span class="small flex-center">(+250) 783967092</span>
						<a class="flex-center bounceClick" href="tel:+250783967092">Call</a>
					</div>
				</div>
				<div class="mb-2 contact-item">
					<div class="w-50 h4 m-0 ps-2 contact-item_owner">VC President</div>
					<div class="w-50 contact-item_tools">
						<span class="small flex-center">(+250) 780789222</span>
						<a class="flex-center bounceClick" href="tel:+250780789222">Call</a>
					</div>
				</div>
				<div class="mb-2 contact-item">
					<div class="w-50 h4 m-0 ps-2 contact-item_owner">Web issues</div>
					<div class="w-50 contact-item_tools">
						<span class="small flex-center">(+250) 785459848</span>
						<a class="flex-center bounceClick" href="tel:+250785459848">Call</a>
					</div>
				</div>
			</div>
			<div class="p-3">
				<p class="fw-bold">
					Got questions? Require assistance? Or simply want to connect? Drop us an email.
				</p>
				<div class="mb-2 contact-item">
					<div class="w-50 h4 m-0 ps-2 contact-item_owner">ESG</div>
					<div class="w-50 contact-item_tools">
						<span class="small flex-center" style="font-size: 65%;">easternsingersg@gmail.com</span>
						<a class="flex-center bounceClick" href="mailto:easternsingersg@gmail.com">Mail</a>
					</div>
				</div>
			</div>
		</div>
	</div>
    
	<!-- Web settings -->
    <div class="bg-myBlue show-touch-sm isolate-y px-1 fix-draggable webSettings">
		<div class="d-flex align-items-center mb-3 px-2">
            <span class="fa fa-cogs me-3 fs-4 text-appColor-cons"></span>
            <h5 class="h4 text-center fix-dragger">Web settings</h5>
            <button class="fa fa-close d-block w-2_5rem ratio-1-1 flex-center rounded-pill bg-transparent text-appColor-cons ms-auto" onclick="hide_web_settings()"></button>
        </div>
		<div class="clmn_wrapper dim-100 webSetPG">
			<div class="webSetPG1">
				<div class="w-100 h-50 d-grid webSetGrid">
					<div class="d-flex flex-column">
						<div class="p-1 text-center fs-5">Contact us</div>
						<div class="position-relative flex-grow-1 mb-1 overflow-visible web-contactor contactor">
							<span class="fa fa-phone rad-50 w-40 ratio-1-1 flex-center top-left"></span>
							<span class="fa fa-envelope rad-50 w-20 ratio-1-1 flex-center b-middle-m"></span>
							<span class="fab fa-whatsapp rad-50 w-50 ratio-1-1 display-4 flex-center bottom-right"></span>
						</div>
					</div>
					<div class="d-flex flex-column">
						<div class="p-1 text-center theme-name">Light</div>
						<div class="position-relative mb-1 ms-auto me-auto h-80 theme-changer LG-Def">
							<div class="position-absolute t-middle p-1 h-20 w-100 flex-center auto_theme LG-Def choice" tabindex="0">Auto</div>
							<div class="position-absolute b-middle-m rad-30 h-75 w-100 themerICN LG-Def">
								<span class="fa fa-moon position-absolute b-middle w-100 ratio-1-1 flex-center rad-50" tabindex="0"></span>
							</div>
						</div>
					</div>
					<div class="d-flex flex-column">
						<div class="p-1 text-center">Guide</div>
						<div class="position-relative flex-grow-1 d-grid guider">
							<span class="fa fa-moon w-100 grid-center ptr" title="Theme"></span>
							<span class="fa fa-mobile w-100 grid-center ptr" title="Animations"></span>
							<span class="fa fa-lightbulb w-100 grid-center ptr" title="Tips"></span>
							<span class="w-100 grid-center ptr" tabindex="0" onclick="show_guide()">All</span>
						</div>
					</div>
					<div class="d-flex flex-column">
						<div class="p-1 text-center fs-6">Terms and privacy</div>
						<div class="position-relative my-auto pb-2">
							<span class="fa fa-shield-alt w-100 h-100 grid-center display-5 ptr" onclick="show_terms()"></span>
						</div>
					</div>
					<div class="d-flex flex-column">
						<div class="p-1 text-center">Update</div>
						<div class="position-relative my-auto pb-2" tabindex="0" onclick="window.location.reload()">
							<span class="fa fa-flag w-100 h-100 grid-center small ptr"></span>
						</div>
					</div>
					<div class="d-flex flex-column">
						<div class="p-1 text-center">Reset</div>
						<div class="position-relative my-auto pb-2" tabindex="0" onclick="reset_web()">
							<span class="fa fa-refresh w-100 h-100 grid-center small ptr"></span>
						</div>
					</div>
					<div>
						<div class="dim-100 position-relative d-grid timeShow">
							<span class="dim-100 h-100 grid-center ptr"></span>
						</div>
					</div>
					<div>
						<div class="h-100 position-relative sharePage">
							<button class="btn dim-100 sharePage-button" title="Share this page">
								Share <span class="fa fa-share ms-2"></span>
							</button>
						</div>
					</div>
				</div>
				<div class="w-100 h-50 mySbar-sm pt-3 webSwitches">
					<ul class="list-style-circle">
						<li>
							<div class="d-flex align-items-center justify-content-between pe-4 animation-control">
								<span>Animations</span>
								<div class="switch switch-x">
									<div></div>
								</div>
							</div>
							<small class="my-2">
								If turned off, all animations and transitions are disabled for most items.
							</small>
						</li>
						<li>
							<div class="d-flex align-items-center justify-content-between pe-4 tips-control">
								<span>Guide always</span>
								<div class="switch switch-x OFF">
									<div></div>
								</div>
							</div>
							<small class="my-2">
								If turned on, website guide and tips will pop-up every time the page loads.
							</small>
						</li>
					</ul>
				</div>
			</div>
			<div class="rad-5 webSetPG2">
				<button class="fa fa-arrow-left l-middle-m ratio-1-1 bordered text-white-var rad-50 grid-center inx-high partGuideCloser"></button>
			</div>
		</div>
    </div>
    
    <div class="fix-holder fix-holder-blue fade-to-back blur-bg-5px">
        <div class="col-sm-8 col-md-6 col-lg-5 col-xl-4 mx-auto h-100 my-item item-warning mySbar-sm webTerms">
            <div class="my-item-header">
                <h4 class="my-item-header__title">Terms and privacy</h4>
                <div class="rad-3 my-item-header__icons">
                    <button class="fa fa-close hide-par-fix item-closer"></button>
                </div>
            </div>
            <div class="my-item-body">
                <p class="my-3">
                    This is <b>Eastern Singers Group website</b>, dedicated to help users in different ways of praying, with music being the priority. You can <a href="../about" class="text-goldR">learn more</a> about ESG.
                </p>
                <p class="p-1">
                    Our platform has its foundation on the following terms:
                    <ul class="list-style-square">
                        <li>This is a non-profit religious platform <i>(website).</i></li>
                        <li>No personal data are collected alongway using this website, unless they are asked for.</li>
                        <li>
                            We provide services which do not in anyway violate personal privacy or security of individuals/users.
                        </li>
                        <li>All rights are reserved.</li>
                    </ul>
                </p>
                <p class="p-1">
                    This platform provides downloadable documents that are related to music and prayers, and also has a space for users to upload their documents or share out those available on the website.<br>
                    However, activities that are against the purpose of use for those actions are prohibited;
                    <ul class="list-style-square">
                        <li>Do not share our documents or someone's document(s) for business purpose unless permitted.</li>
                        <li>It is prohibited to upload or share out a copy of someone's document calling it yours.</li>
                        <li>
                            It is prohibited to upload violence documents where possible on this platform, inluding contents about sexual matter, racial abuse, hatred content or any other type of violence.
                        </li>
                    </ul>
                </p>
            </div>
        </div>
    </div>

    <div class="fix-holder fade-to-scaleY g-items-holder webGuide-fix">
        <div class="webGuide g-items Sbar-none">
            <div class="p-3 text-light grid-item mySbar-sm home view">
                <h6 class="display-4">Guide</h6>
                <p class="p-2">
                    <span class="display-7 text-goldR">
                        This guide is provided to help users enjoy smooth browsing experience on this platform
                    </span><br><br>
                    <b>Check about:</b>
                    <ul class="mt-5">
                        <li>Theme</li>
                        <li>Animations</li>
                        <li>Keybord shortcuts <kbd>alt</kbd> <kbd>s</kbd>.</li>
                    </ul>
                </p>
            </div>
            <div class="p-3 text-light grid-item mySbar-sm">
                <h6 class="display-5">Theme</h6>
                <p class="p-2">
                    <span class="display-7 text-goldR">
                        You can easily change how the website looks by switching to dark or light theme
                    </span>
                    <ul class="mt-5">
                        <li>Go through web settings <span class="fa fa-gear"></span> and switch the themes, or</li>
                        <li>Presh keybord shortcut <kbd>alt</kbd> <kbd>t</kbd>.</li>
                    </ul>
                </p>
                <p class="p-2 mt-5">
                    When <b><u>auto</u></b> setting is chosen, the default website schedule will be activated. i.e Dark theme will activate from 19:00 until morning 06:00.<br>
                    However, any theme can be prefered by manual switch as mentioned above.
                </p>
            </div>
            <div class="p-3 text-light grid-item mySbar-sm">
                <h6 class="display-5" style="animation: slideInRight 7s infinite">Animations</h6>
                <p class="p-2">
                    <span class="display-7 text-goldR">
                        If you dont feel confortable with web animations, you can switch them off
                    </span>
                    <ul class="mt-5">
                        <li>
                            Go through web settings <span class="fa fa-gear"></span> and switch off the animation enabler.
                        </li>
                    </ul>
                </p>
                <p class="p-2 mt-5">
                    The default website behavior is set to animating. Turning off animations will reduce both item animations and transitions.<br>
                    📌 <span style="color: cyan;">Some items may suddlenly appear or others may transition really fast.</span>
                </p>
            </div>
            <div class="p-3 text-light grid-item mySbar-sm">
                <h6 class="display-5">Tips</h6>
                <p class="p-2 display-7 text-goldR">
                        Navigate quickly through the pages and web items
                </p>
                <section class="p-2">
                    <table class="w-100 px-3 mb-3">
                        <caption class="display-7">Keyboard shortcuts</caption>
                        <tr>
                            <th>Keys</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td><kbd>alt</kbd> <kbd>s</kbd></td>
                            <td>Show web settings</td>
                        </tr>
                        <tr>
                            <td><kbd>alt</kbd> <kbd>t</kbd></td>
                            <td>Change theme</td>
                        </tr>
                        <tr>
                            <td><kbd>alt</kbd> <kbd>t</kbd> <kbd>a</kbd></td>
                            <td>Set auto-theme</td>
                        </tr>
                        <tr>
                            <td><kbd>alt</kbd> <kbd>g</kbd></td>
                            <td>Show this guide</td>
                        </tr>
                    </table>
                    <p class="p-2">
                        All shortcuts provided above works everywhere across this website and <mark>different pages may also have additional shortcuts</mark>.
                        Check it where necessary to add more speed and experience.<br>
                        📌 <span style="color: cyan;">If any of the shortcuts fail, check your keyboard setting.</span>
                    </p>
                    <span class="p-2">More Tips</span>
                    <ul>
                        <li>
                            <u>Refresh pages for updates</u>. There's always new things to ease browsing.
                        </li>
                        <li>
                            Visit different pages and find out what can be more interesting.
                        </li>
                        <li>
                            Avoid forcing processes, by allowing them to finish smoothly. <i>(Especially when finding documents to download)</i>.
                        </li>
                    </ul>   
                </section>
            </div>
            <div class="item-swichers">
                <button class="fa fa-close top-right w-3rem ratio-1-1 g-itemsCloser"></button>
                <button class="fa fa-arrow-left item-swicher left"></button>
                <button class="fa fa-arrow-right item-swicher right"></button>
                <div class="b-middle-m w-25 h-30px d-flex align-items-center justify-content-around item-pager">
                    <button class="rad-50 view"></button>
                    <button class="rad-50"></button>
                    <button class="rad-50"></button>
                    <button class="rad-50"></button>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="position-fixed bottom-right-m h-50px w-50px inx-100 bg-navi1 rad-7 flex-center ToTop Comp_Def">
        <span class="fa fa-angle-double-up text-white"></span>
    </div> -->
    
    <!-- ************************** End of navigations ************************** -->
    <!-- Loaders -->
    
    <!-- Bars loader -->

    <div class="flex-center Loading_fix">
        <div class="loading-motion-wave">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
    </div>

    <!-- Disk loader -->

    <!-- <div class="flex-center Loading_fix">
        <div class="position-absolute rad-50 inx-inherit anim-imp loading-motion-disk">
            <div class="position-absolute w-50 h-auto">
                <div class="position-absolute r-middle rad-50">
                    <div class="center dim-30 rad-50 bg-brown1"></div>
                </div>
            </div>
            <div class="position-absolute w-50 h-auto">
                <div class="position-absolute r-middle rad-50">
                    <div class="center dim-50 rad-50 bg-brown1"></div>
                </div>
            </div>
            <div class="position-absolute w-50 h-auto">
                <div class="position-absolute r-middle rad-50">
                    <div class="center dim-60 rad-50 bg-brown1"></div>
                </div>
            </div>
            <div class="position-absolute w-50 h-auto">
                <div class="position-absolute r-middle rad-50">
                    <div class="center dim-75 rad-50 bg-brown1"></div>
                </div>
            </div>
            <div class="position-absolute w-50 h-auto">
                <div class="position-absolute r-middle rad-50">
                    <div class="center dim-100 rad-50 bg-brown1"></div>
                </div>
            </div>
        </div>
    </div> -->

    <!-- Boxes loader -->

    <!-- <div class="grid-center Loading_fix">
        <div class="loading-motion-boxes">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
        </div>
    </div> -->

    <!-- Loaders -->
    <!-- Notices -->
    
    

    <div class="mb-4 group-voice">
        <h1 class="p-3 pl-4 mb-4 text w-fit">Group Voices</h1>
        <div class="d-md-flex">
            <div class="p-2 p-sm-5 col-md-8 d-grid">
                <div class="grid-center">
                    <div class="mb-5 mb-md-0 display-3 fw-bold text-primary">Tenor</div>
                </div>
                <ul class="list-group list-group-horizontal" style="align-self: last baseline;">
                    <li class="list-group-item bg-none borderless"><a href="ESG_Soprano.php">Soprano</a></li>
                    <li class="list-group-item bg-none borderless"><a href="ESG_Alto.php">Alto</a></li>
                    <li class="list-group-item borderless active" aria-current="true">Tenor</li>
                    <li class="list-group-item bg-none borderless"><a href="ESG_Bass.php">Bass</a></li>
                  </ul>
            </div>
            <div class="p-5 col-md-4">
                A tenor voice is a high male vocal range in music. It is one of the main voice types for male singers, and tenors typically sing in the higher-pitched male vocal range. The tenor range typically spans from approximately C3 (the C below middle C) to C5 (the C above middle C), but it can vary depending on the individual singer's vocal range and abilities.
            </div>
        </div>
    </div>
    <div class="voice-members">
        <div class="d-sm-flex col-sm-10 offset-sm-1 mb-4">
            <img src="../../Pics/LennyM_1.png" alt="Section leader" style="width: clamp(15rem, 150vw, 30%); background-image: linear-gradient();" class="ms-auto me-5 img-thumbnail rounded-circle bg-black2">
            <div class="p-3">
                <h2>Section leader</h2>
                <p>
                    <?php
                    foreach ($voiceMembers as $member) {
                        $personProps = json_encode($member);
                        $status = json_decode(json_decode($personProps)->status);
                        if (in_array("section leader", $status->roles)) {
                            $leaderName = json_decode($personProps)->lastName . ' ' . json_decode($personProps)->firstName;
                        }
                    }
                    ?>
                    <mark class="fw-bold"><?php echo $leaderName ?></mark> is the section leader of Tenor in our group.<br><br>
                    Our Tenor section is made of <?php echo $totalVoiceMembers?> active singers.
                </p>
            </div>
        </div>
        <hr>
        <div class="row m-0 mb-4 p-md-5">
            <!-- Display all members of the current voice -->
            <?php
            foreach ($voiceMembers as $member) {
                $personProps = json_encode($member);
                $fullName = json_decode($personProps)->lastName . ' ' . json_decode($personProps)->firstName;
                $image = json_decode($personProps)->imageURL;
                $choirs = json_decode($personProps)->otherChoirsDetails;
                $status = json_decode($personProps)->status;
                if (json_decode($status)->gender == "male") {
                    $pronoun = "he";
                } else {
                    $pronoun = "she";
                }
                $choirsArray = json_decode($choirs);
                $choirsDisplayString = "";
                if (count($choirsArray) <= 1) {
                    $choirsDisplayString .= '<b>' . $choirsArray[0]->choirName . '</b> based at ' . $choirsArray[0]->choirLocation;
                } else {
                    $arrayLen = count($choirsArray);
                    $index = 0;
                    foreach ($choirsArray as $choir) {
                        $index += 1;
                        if ($index < $arrayLen) {
                            $choirsDisplayString .= '<b>' . $choir->choirName . '</b> based at ' . $choir->choirLocation;
                        }
                        if (($index + 1) < $arrayLen) {
                            $choirsDisplayString .= ', ';
                        }
                        if ($index == $arrayLen) {
                            $choirsDisplayString .= ' and <b>' . $choir->choirName . '</b> based at ' . $choir->choirLocation . '.';
                        }
                    }
                }
                echo <<<HTML
                <div class="col-md-6 col-xl-4 mb-2">
                    <div class="d-flex">
                        <img src="{$image}" alt="Soprano Singer">
                        <div class="h5 p-3">{$fullName}</div>
                    </div>
                    <p class="small p-3">
                        Besides ESG, {$pronoun} is also a singer in  {$choirsDisplayString}
                    </p>
                </div>
                HTML;
            }
            ?>
        </div>
    </div>

	<!-- ************************** Page Ending ************************** -->
	
	<footer class="py-3 Info">
		<li class="small">
			Check out <u><a href="ESG_Songs">ESG Songs</a></u>
		</li><br>
		<div class="row m-0">
			<div class="col-6 col-md-3">
				<h4>Quick links</h4>
				<ul class="list-unstyled p-2">
					<li class="p-2">
						<span class="fa fa-place-of-worship grid-center me-3"></span><a href=" ../Services/CHM_Songs">Mass songs</a>
					</li>
					<li class="p-2">
						<span class="fa fa-handshake grid-center me-3"></span><a href="../services">Services</a>
					</li>
					<li class="p-2">
						<span class="grid-center me-3">&#119071;</span><a href="../solfeggio">Solfeggio docs</a>
					</li>
				</ul>
			</div>
			<div class="col-6 col-md-3">
				<h4>Follow us</h4>
				<ul class="list-unstyled p-2">
					<li class="p-2">
						<span class="fab fa-instagram grid-center me-3"></span><a href="https://www.instagram.com/easternsingers/" target="_blank">Instagram</a>
					</li>
					<li class="p-2">
						<span class="fab fa-facebook-f grid-center me-3"></span><a href="https://web.facebook.com/groups/221686289873729/" target="_blank">Facebook</a>
					</li>
					<li class="p-2">
						<span class="fab fa-youtube grid-center me-3"></span><a href="https://www.youtube.com/channel/UC88VxWbKsZMbEjaL0kzLZIQ/" target="_blank">YouTube</a>
					</li>
				</ul>
			</div>
			<div class="col-6 col-md-3">
				<h4>Contact</h4>
				<ul class="list-unstyled p-2">
					<li class="p-2">
						<span class="fa fa-phone grid-center me-3"></span><a class="small" href="tel:+250783967092">(+250) 783967092</a>
					</li>
					<li class="p-2">
						<span class="fa fa-phone grid-center me-3"></span><a class="small" href="tel:+250785459848">(+250) 785459848</a>
					</li>
					<li class="p-2">
						<span class="fa fa-envelope grid-center me-3"></span><a href="../contact">E-mail</a>
					</li>
				</ul>
			</div>
		</div>
		<hr>
		<div class="text-center text-bold">
			<small>
				<small>
					<strong>Copyright <span class="fa fa-copyright"></span> <span class="copyright-year">2022</span> Eastern Singers Group. All Rights Reserved.</strong><br>
					<span class="fa fa-code me-1"></span> Powered by <a href="https://hirwa9.github.io" target="_blank" class=" text-muted"><strong>Hirwa</strong></a>
				</small>
			</small>
			<div class="position-fixed fixed-bottom inx-high offset-sm-2 col-sm-8 offset-md-3 col-md-6 p-2 blur-bg-5px collapse win-hide designer">
				<div class="ps-3 d-flex align-items-center justify-content-between">
					<span>Developer <span class="fa fa-paint-brush ms-2"></span></span>
					<button class="w-2rem bounceClick closerX" data-bs-toggle="collapse" data-bs-target=".designer"></button>
				</div>
				<hr>
				<ul class="list-style-square small">
					<li class="text-start">
						E-mail: <a href="mailto:hirwawilly9@gmail.com">hirwawilly9@gmail.com <span class="fa fa-envelope ms-2"></span></a>
					</li>
					<li class="text-start">
						Phone: <a href="tel:+250785459848" class="me-2">+250 785 459 848 <span class="fa fa-phone ms-2"></span></a>
					</li>
					<li class="text-start">
						<a href="https://www.linkedin.com/in/hirwa-cyuzuzo-willy-94159427b" class="w-30px ratio-1-1 rad-50 grid-center border bounceClick" target="_blank">
							<span class="fab fa-linkedin"></span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</footer>
	
	<script src="../../MyScripts.js?v=1.1105"></script>
</body>
</html>