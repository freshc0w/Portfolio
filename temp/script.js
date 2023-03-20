
// Make container would probably take in the img src and text
function makeContainer(text1, text2) {
    const wrapper = document.createElement('div');
    const skillImg = document.createElement('div');
    const skillName = document.createElement('div');

    wrapper.classList.add('wrapper');
    skillImg.classList.add('skill-img');
    skillName.classList.add('skill-name');
    wrapper.appendChild(skillImg);
    wrapper.appendChild(skillName);

    skillImg.textContent = text1;
    skillName.textContent = text2;

    return wrapper;
}

let currentTransform = -60; // Current transformed position for carousel.
let containerSetAddCount = 0; // Don't add more than 4 container sets.
let arr = [];
let tempArr = [];
let nextCounter = 0;
let prevCounter = 0;

// for(let i = 1; i <= 10; i++) {
//     arr.push(makeContainer(i));
//     tempArr.push(makeContainer(i));
// }

const skills = {};
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

const skillsWrapper = document.querySelector('.skills-wrapper');

function insertContainersAfter() {
    for(let skill in skills) {
        skillsWrapper.appendChild(makeContainer(skills[skill].path, skills[skill].name));
    }
}

function insertContainersBefore() {
    for(let skill in skills) {
        skillsWrapper.insertBefore(makeContainer(skills[skill].path, skills[skill].name), skillsWrapper.firstChild);
    }
}

// Initialise 2 complete containers of skills.
insertContainersAfter();

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

function slideNext() {
    currentTransform -= 110;
    skillsWrapper.style = `transform: translateX(${currentTransform}px);`
    // Add more "skill" elements into carousel if next has been activated considerable number of times.
    if(!(nextCounter % (Object.keys(skills).length) / 2)) {
        insertContainersAfter();
        containerSetAddCount++;
    } 
    nextCounter++;
    if(containerSetAddCount >= 5) {
        while(skillsWrapper.firstChild) {
            skillsWrapper.removeChild(skillsWrapper.lastChild);
        }
        containerSetAddCount = 0;
        currentTransform = -60;
        insertContainersAfter();
    }
}

function slidePrev() {
    // if(currentTransform >= 0) {
    //     currentTransform = 0;
    // } else {
    //     currentTransform += 110;
    // }
    currentTransform += 110;
    if(currentTransform >= 0) currentTransform = 0; 
    skillsWrapper.style = `transform: translateX(${currentTransform}px);`
}

// Add event listeners
nextBtn.addEventListener("click", slideNext);
prevBtn.addEventListener("click", slidePrev);

// Add auto play for carousel.
// setInterval(slideNext, 2000);