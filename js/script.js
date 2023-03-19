// Navbar functionality that diseappears when scroll down.
let prevPosScroll = window.pageYOffset;
window.onscroll = () => {
    const navBar = document.getElementById('nav-bar');
    let currentPosScroll = window.pageYOffset;
    if(prevPosScroll < currentPosScroll) {
        navBar.style.top = "-90px";
        navBar.style.opacity = "0";
    } else {
        navBar.style.top = "0px";
        navBar.style.opacity = "1";
    }
    prevPosScroll = currentPosScroll;
}



// function initialisePage() {
    
// }
