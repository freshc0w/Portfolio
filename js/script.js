/* 
Navbar functionality that diseappears when scroll down. 
*/
let prevPosScroll = window.pageYOffset;
window.onscroll = () => {
	const navBar = document.getElementById("nav-bar");
	let currentPosScroll = window.pageYOffset;
	if (prevPosScroll < currentPosScroll) {
		navBar.style.top = "-90px";
		navBar.style.opacity = "0";
	} else {
		navBar.style.top = "0px";
		navBar.style.opacity = "1";
	}
	prevPosScroll = currentPosScroll;
};
/* Nav bar hide functionality end*/

/*
Skills carousel animation and toggle
*/

let currentTransform = 0;
let setContainersAddedCounter = 0; // Keeps track of how many containers added to carousel.
let nextCounter = 0; // Keeps track of the number of "next" event.

let skills = {};
skills["python"] = {
	desc: "python icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
};
skills["java"] = {
	desc: "java icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
};
skills["C"] = {
	desc: "C icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
};
skills["javascript"] = {
	desc: "javascript icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",
};
skills["html"] = {
	desc: "html icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
};
skills["css"] = {
	desc: "css icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
};

// Temporary (To be learnt)
// skills["react.js"] = {
// 	desc: "react.js icon",
// 	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
// };
// skills["node.js"] = {
// 	desc: "node.js icon",
// 	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
// };

skills["bootstrap"] = {
	desc: "bootstrap icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
};
skills["git"] = {
	desc: "git icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
};
skills["webpack"] = {
	desc: "webpack icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
};
skills["Rstudio"] = {
	desc: "R icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rstudio/rstudio-original.svg",
};
skills["mySQL"] = {
	desc: "SQL icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
};

const skillsTrain = document.querySelector(".skills-train");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
insertContainersAfter();

slideNext = () => {
	// Move carousel by a container's width.
	currentTransform -= 115;
	skillsTrain.style.transform = `translateX(${currentTransform}px)`;

	if (!((nextCounter % Object.keys(skills).length) / 1.5)) {
		insertContainersAfter();
		setContainersAddedCounter++;
	}

	nextCounter++;

	// Prevent adding too many items to the web page.
	if (setContainersAddedCounter >= 5) {
		// Clear all items in carousel.
		while (skillsTrain.firstChild) {
			skillsTrain.removeChild(skillsTrain.lastChild);
		}

		nextCounter = 0;
		setContainersAddedCounter = 0;
		currentTransform = 0; // Initialise skill train back to default pos.
		insertContainersAfter();
	}
};

nextBtn.addEventListener("click", slideNext);

// Add autoplay for carousel;
setInterval(slideNext, 2000);

slidePrev = () => {
	currentTransform += 115;
	// If at the start of carousel, prevent sliding.
	if (currentTransform >= 0) currentTransform = 0;
	skillsTrain.style.transform = `translateX(${currentTransform}px)`;
};

prevBtn.addEventListener("click", slidePrev);

function makeSkillContainer(iconName, iconDesc, iconPath, num) {
	const container = document.createElement("div");
	const skillIcon = document.createElement("img");
	const skillName = document.createElement("h1");
	const skillNum = document.createElement("span");

	container.classList.add("tool-container");
	skillIcon.classList.add("skill-icon");
	skillName.classList.add("skill-name");
	skillNum.classList.add("skill-num");

	skillIcon.src = iconPath;
	skillIcon.alt = iconDesc;
	skillName.textContent = iconName;
	skillNum.textContent = num;

	container.appendChild(skillIcon);
	container.appendChild(skillName);
	container.appendChild(skillNum);
	return container;
}

function insertContainersAfter() {
	let count = 0;
	for (let skill in skills) {
		skillsTrain.appendChild(
			makeSkillContainer(skill, skills[skill].desc, skills[skill].path, count)
		);
		count++;
	}
}

/* Skills carousel end */

/* Project event listeners*/

// function initialisePage() {

// }
