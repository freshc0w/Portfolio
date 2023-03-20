/* 
Navbar functionality that diseappears when scroll down. 
*/
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
/* Nav bar hide functionality end*/


/*
Skills carousel animation and toggle
*/

let currentTransform = 0;
let setContainersAddedCounter = 0; // Keeps track of how many containers added to carousel.
let nextCounter = 0; // Keeps track of the number of "next" event.

let skills = {};
skills['react'] = { name: 'react', path: 'img source' }
skills['react1'] = { name: 'react1', path: 'img source' }
skills['react2'] = { name: 'react2', path: 'img source' }
skills['react3'] = { name: 'react3', path: 'img source' }
skills['react4'] = { name: 'react4', path: 'img source' }
skills['react5'] = { name: 'react5', path: 'img source' }
skills['react6'] = { name: 'react6', path: 'img source' }
skills['react7'] = { name: 'react7', path: 'img source' }
skills['react8'] = { name: 'react8', path: 'img source' }
skills['react9'] = { name: 'react9', path: 'img source' }
skills['react10'] = { name: 'react10', path: 'img source' }

const skillsTrain = document.querySelector('.skills-train');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
insertContainersAfter();

slideNext = () => {
    // Move carousel by a container's width.
    currentTransform -= 115; 
    skillsTrain.style.transform = `translateX(${currentTransform}px)`;

    if(!(nextCounter % (Object.keys(skills).length) / 1.5)) {
        insertContainersAfter();
        setContainersAddedCounter++;
    }

    nextCounter++;
    
    // Prevent adding too many items to the web page.
    if(setContainersAddedCounter >= 5) {
        
        // Clear all items in carousel.
        while(skillsTrain.firstChild) {
            skillsTrain.removeChild(skillsTrain.lastChild);
        }

        nextCounter = 0;
        setContainersAddedCounter = 0;
        currentTransform = 0; // Initialise skill train back to default pos.
        insertContainersAfter();
    }
}

nextBtn.addEventListener("click", slideNext);

// Add autoplay for carousel;
// setInterval(slideNext, 2000); 

slidePrev = () => {
    currentTransform += 115;
    // If at the start of carousel, prevent sliding.
    if(currentTransform >= 0) currentTransform = 0; 
    skillsTrain.style.transform = `translateX(${currentTransform}px)`;
}

prevBtn.addEventListener("click", slidePrev);

function makeSkillContainer(text1, text2) {
    const container = document.createElement('div');
    const skillIcon = document.createElement('div');
    const skillName = document.createElement('div');

    container.classList.add('tool-container');
    skillIcon.classList.add('skill-icon');
    skillName.classList.add('skill-name');

    skillIcon.textContent = text1;
    skillName.textContent = text2;

    container.appendChild(skillIcon);
    container.appendChild(skillName);
    return container;
}

function insertContainersAfter() {
    for(let skill in skills) {
        skillsTrain.appendChild(makeSkillContainer(skills[skill].path, skills[skill].name));
    }
}   






// function initialisePage() {
    
// }
