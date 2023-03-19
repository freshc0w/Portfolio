function makeContainer(text) {
    const wrapper = document.createElement('div');
    const skillImg = document.createElement('div');
    const skillName = document.createElement('div');

    wrapper.classList.add('wrapper');
    skillImg.classList.add('skill-img');
    skillName.classList.add('skill-name');
    wrapper.appendChild(skillImg);
    wrapper.appendChild(skillName);

    wrapper.textContent = text;

    return wrapper;
}

let arr = [];
let tempArr = [];
for(let i = 1; i <= 10; i++) {
    arr.push(makeContainer(i));
    tempArr.push(makeContainer(i));
}

arr.forEach(wrapper => document.querySelector('.skills-wrapper').appendChild(wrapper));

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentTransform = -60; // Current transformed position for carousel.

function slideNext() {
    currentTransform -= 110;
    document.querySelector('.skills-wrapper').style = `transform: translateX(${currentTransform}px);`
}

function slidePrev() {
    currentTransform += 110;
    document.querySelector('.skills-wrapper').style = `transform: translateX(${currentTransform}px);`
}

// Add event listeners
nextBtn.addEventListener("click", slideNext);
prevBtn.addEventListener("click", slidePrev);

// Add auto play for carousel.
// setInterval(slideNext, 1000);