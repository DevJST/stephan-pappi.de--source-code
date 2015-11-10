$(document).ready(function () {

    $(function () {
        $('.toggle-nav').click(function () {

            toggleNav();
        });
    });

    function toggleNav() {

        $('#site-wrapper').toggleClass('show-nav');
        $('.toggle-nav-menu').toggleClass('opened-nav-menu-bar');
    }
});