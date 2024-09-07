<?php
// Include database connection
include 'connect.php';
include 'session_check.php';
// Redirect logged in sessions
if (isset($_SESSION['user_role']) && $_SESSION['user_role'] == 'admin') {
    header("Location: esgrp/Admin/dashboard.php"); // Redirect to the dashboard
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Login</title>
    <link rel="icon" type="image/x-icon" href="Pics/ESG_favicon1.png">
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Hirwa Willy">
    <meta name="keywords" content="HTML, CSS">
    
    <!-- BS, FA & jQ -->
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-sanitize.js"></script>

    <!-- Customs -->
    <link rel="stylesheet" type="text/css" href="styles/index.css?v=1.1158">
    
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
        body {
            background-image: linear-gradient(to right, var(--myBlue) 50%, var(--black1_cons) 50%);
        }
        body * {
            font-family: "Raleway", sans-serif;
            font-optical-sizing: auto;
        }
        .hidden {
            display: none;
        }
        body > .page-content {
            position: relative;
            /* background-image: linear-gradient(to left, var(--myBlue3) 50%, var(--black1_cons) 50%); */
            height: 100%;
        }
        body > .page-content::before,
        body > .page-content::after {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
        }
        body > .page-content::before {
            background-image: url(Pics/Es24.png);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            filter: blur(2px);
        }
        body > .page-content::after {
            background-image: linear-gradient(to left, var(--myBlue2_cons) 50%, var(--black2_cons) 50%);
        }
        @media screen and (min-width: 576px) {
            body > .page-content {
                outline: 10px solid var(--black3);
                border-radius: 2rem;
            }
        }
        body > .page-content > .side-content > div {
            color: var(--bs-light);
        }
        @media screen and (min-width: 768px) {
            body {
                height: 100vh;
            }
            body > .page-content > .loggin-system {
                height: 100%;
            }
        }
        #admin-login-form, #admin-register-form {
            animation: slideInBottom .4s 1;
        }
        form input:focus {
            border-color: var(--myBlue3) !important;
            box-shadow: 0 0 0 .25rem var(--white3) !important;
        }
    </style>
</head>
<body class="p-2 py-3 p-sm-4 p-lg-5">
    <div class="row justify-content-between col-xl-10 mx-sm-auto p-2 overflow-auto page-content">        
        <div class="col-md-6 col-xl-5 mx-auto p-3 loggin-system overflow-auto Sbar-sm">
            <div class="card border-0 rad-0 bg-transparent text-light">
                <h1 class="text-center fw-bold fs-2 mb-4 small-title item-light">ESG Admin Portal</h1>
                <div class="card-header d-flex align-items-center justify-content-around my-2 mb-3 rad-15">
                    <div class="fs-4" id="form-title">Login</div>
                </div>
                <div class="card-body">
                    <!-- Login form -->
                    <form id="admin-login-form" action="login.php" method="post">
                        <div class="mb-3">
                            <label for="login-email" class="form-label fw-bold">Email</label>
                            <input type="email" class="form-control h-3rem" id="login-email" name="email" placeholder="Enter email" required>
                        </div>
                        <div class="mb-3">
                            <label for="login-password" class="form-label fw-bold">Password</label>
                            <div class="position-relative">
                                <input type="password" class="form-control h-3rem" id="login-password" name="password" placeholder="Enter password" data-ng-model="adminLoginPassword" required>
                                <span class="position-absolute r-middle me-2 fa fa-eye btn text-muted opacity-50 border-0 align-content-center w-2_5rem h-100 p-0 toggle-password" style="font-size: 90%;" data-ng-show="adminLoginPassword !== '' && adminLoginPassword !== undefined "></span>
                            </div>
                        </div>
                        <button type="submit" class="btn bg-myBlue text-light border-0 w-100 h-3rem">
                            Login <span class="fa fa-angle-right ms-2"></span>
                        </button>
                    </form>           

                    <!-- Register form -->
                    <!-- <form id="admin-register-form" class="hidden" action="register.php" method="post">
                        <div class="mb-3">
                            <label for="register-fname" class="form-label fw-bold">First name</label>
                            <input type="text" class="form-control h-3rem" id="register-fname" name="fname" placeholder="Enter first name" required>
                        </div>
                        <div class="mb-3">
                            <label for="register-lname" class="form-label fw-bold">Last name</label>
                            <input type="text" class="form-control h-3rem" id="register-lname" name="lname" placeholder="Enter last name" required>
                        </div>
                        <div class="mb-3">
                            <label for="register-email" class="form-label fw-bold">Email</label>
                            <input type="email" class="form-control h-3rem" id="register-email" name="email" placeholder="Enter email" required>
                        </div>
                        <div class="mb-3">
                            <label for="register-password" class="form-label fw-bold">Password</label>
                            <input type="password" class="form-control h-3rem" id="register-password" name="password" placeholder="Enter password" required>
                        </div>
                        <div class="mb-3">
                            <label for="register-confirm-password" class="form-label fw-bold">Confirm Password</label>
                            <input type="password" class="form-control h-3rem" id="register-confirm-password" name="confirm_password" placeholder="Confirm password" required>
                        </div>
                        <button type="submit" class="btn bg-myBlue text-light border-0 w-100 clickDown">Register <span class="fa fa-user-plus ms-2"></span></button>
                    </form> -->
                </div>
                <!-- <div class="card-footer text-center bg-transparent">
                    <span id="toggle-form">Don't have an account? <a href="#"  class="fw-bold" onclick="toggleForms()">REGISTER</a></span>
                </div> -->
            </div>
        </div>

        <div class="col-md-6 p-3 side-content d-flex flex-column-reverse d-md-block">
            <!-- Navigation bar -->
            <nav class="navbar mb-3 mt-4 mt-md-0 p-0 rad-10 bg-white4" role="navigation" style="background-image: none;">
                <div class="navbar-collapse">
                    <ul class="nav navbar-nav flex-row w-100 gap-3 justify-content-around">
                        <li class="nav-item"><a class="nav-link text-light-cons clickDown" href="index">Home</a></li>
                        <li class="nav-item"><a class="nav-link text-light-cons clickDown" href="esgrp/about">About</a></li>
                        <li class="nav-item"><a class="nav-link text-light-cons clickDown" href="esgrp/About/ESG_Songs">Songs</a></li>
                    </ul>
                </div>
            </nav>
            <div class="px-md-3">
                <img src="Pics/EasternSingersLogo.png" alt="" class="w-10rem mx-auto mb-5 mb-md-3 p-3 pt-md-2 rad-15" style="animation: wobbleBottom 1s 1;">
                <p class="my-3 text-justify">
                    <span class="fw-bold">Sign in</span> to access your admin profile, where you can manage and oversee various aspects of the platform efficiently. Your profile allows you to:
                </p>
                <ul class="d-flex flex-wrap gap-3 list-style-circle small">
                    <li class="ms-3 py-1 py-md-0 text-truncate overflow-visible">Manage Users</li>
                    <li class="ms-3 py-1 py-md-0 text-truncate overflow-visible">Update Content</li>
                    <li class="ms-3 py-1 py-md-0 text-truncate overflow-visible">Monitor Activity</li>
                    <li class="ms-3 py-1 py-md-0 text-truncate overflow-visible">Configure settings</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- reset password -->
    <div class="included-reset-password">
        <div class="modal fade" id="resetPasswordModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content mx-0 w-100 mx-md-auto w-xl-80">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h1 class="m-0 fs-5">Forgot your password ?</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <!-- Modal body -->
                    <div class="justify-content-center my-5 col-lg-10 col-xl-8 container">
                        <p>We will send you a link to reset the password</p>
                        <form method="post" action="send_password_reset.php">
                            <div class="mb-3">
                                <label for="adminEmail" class="form-label fw-bold">Account email</label>
                                <input type="email" name="email" class="form-control" style="border-color: var(--primaryClr); height: 3.5rem;" id="adminEmail" placeholder="Enter your account email" required>
                            </div>
                            <button type="submit" class="btn bg-myBlue text-light d-block col-12 col-md-8 clickDown">Send link</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <script>
        function toggleForms() {
            const loginForm = document.getElementById('admin-login-form');
            const registerForm = document.getElementById('admin-register-form');
            const formTitle = document.getElementById('form-title');
            const toggleText = document.getElementById('toggle-form');
    
            if (loginForm.classList.contains('hidden')) {
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
                registerForm.reset();
                formTitle.textContent = 'Login';
                toggleText.innerHTML = 'Don\'t have an account? <a href="#" class="fw-bold" onclick="toggleForms()">REGISTER</a>';
            } else {
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
                formTitle.textContent = 'Register';
                toggleText.innerHTML = 'Already have an account? <a href="#" class="fw-bold" onclick="toggleForms()">LOGIN</a>';
            }
        }
        
        document.addEventListener('DOMContentLoaded', function () {
            // Reset p-reset form
            $('#resetPasswordModal').on('hidden.bs.modal', function () {
                $('#resetPasswordModal').find('form')[0].reset();
            });
        });
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="MyScripts.js?v=1.1146"></script>
    <script src="scripts/dashboard.js?v=1.1105"></script>
</body>
</html>