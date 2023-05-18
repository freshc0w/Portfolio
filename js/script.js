/* 
Navbar functionality that diseappears when scroll down.
Concept inspired by w3schools "hide navbar on scroll" - 
url: "https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp"
*/
const navBar = document.getElementById("nav-bar");

// Track the number of pixels the website is currently scrolled down by.
let prevPosScroll = window.pageYOffset;
window.onscroll = () => {
	// When user scrolls, track current pageYOffset value.
	let currPosScroll = window.pageYOffset;

	// When user scrollls down, the curr scrolled position will be greater than
	// the prev scrolled position. If this happens, hide navbar to the top.
	// Otherwise, make it visible.
	navBar.style.top = prevPosScroll < currPosScroll ? "-90px" : "0px";

	// Style opacity of nav bar for a smoother disappearance effect.
	navBar.style.opacity = prevPosScroll < currPosScroll ? "0" : "1";

	// Make sure to update previous scrolled position.
	prevPosScroll = currPosScroll;
};

/* Nav bar hide functionality end */

/*
Skills carousel animation and toggle
*/

// Initialise a skills map that maps the programming language's name to it's
// description and url path link.
let skills = {};

// Array filled with skills & languages I'm familiar with.
const allSkills = [
	"python",
	"java",
	"c",
	"javascript",
	"html5",
	"css3",
    "figma",
	"react",
	"nodejs",
	"bootstrap",
	"git",
	"webpack",
	"rstudio",
	"mysql",
    "mongodb",
    "angularjs",
];

updateSkills(allSkills, skills);

/**
 * Takes in an array consisting of all the different skills / programming
 * languages and map it to an object with its icon description and url path link
 * from https://devicon.dev/ .
 * e.g. if programming lang name is "python":
 * skills["python"] = {
	desc: "python icon",
	path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
};
 * @param {Array} skillsCollection Collection of familiar skills and technologies.
 * @param {Object} skillsMap A map object detailing it's description and url
 * retrieval path link.
 * @returns {void}
 */
function updateSkills(skillsCollection, skillsMap) {
    /**
     * Helper fnc that maps an invididual skill to its relevant info.
     * @param {String} name Skill's name
     * @param {String} desc Skill's icon description
     * @param {String} path Skill's url path to fetch image from devicon.dev 
     * @param {Object} skillsMap Object that maps the skill's name to its
     * relevant info
     */
	const addSkillToCollection = (name, desc, path, skillsMap) => {
		try {
			skillsMap[name] = { desc, path };
		} catch (err) { // e.g. if path to icon not found
			console.error(`${name} icon not found. Please check name spelling. \n
            Error msg: ${err}.`);
            // error squashed. iconDesc will be displayed in the skill container.
		}
	};

    // Map each relevant skill with its info in the skills map Object using the
    // helper fnc.
	skillsCollection.forEach((skill) =>
		addSkillToCollection(
			skill,
			`${skill} icon`,
			`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill}/${skill}-original.svg`,
			skillsMap
		)
	);
}

// Track the total translated position of the carousel at a current state.
// This helps "move" the carousel along based on the previous tracked position.
let currTrnsfrmedPos = 0;

// Tracks the amount of containers that holds all the relevant skill containers
// that is added to the carousel.
let setContainersAddedCounter = 0;
let nextCounter = 0; // Keeps track of the number of "next" event.
const skillsTrain = document.querySelector(".skills-train");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
insertContainersAfter();

slideNext = () => {
	// Move carousel by a container's width.
	currTrnsfrmedPos -= 115;
	skillsTrain.style.transform = `translateX(${currTrnsfrmedPos}px)`;

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
		currTrnsfrmedPos = 0; // Initialise skill train back to default pos.
		insertContainersAfter();
	}
};

nextBtn.addEventListener("click", slideNext);

// Add autoplay for carousel;
setInterval(slideNext, 2000);

slidePrev = () => {
	currTrnsfrmedPos += 115;
	// If at the start of carousel, prevent sliding.
	if (currTrnsfrmedPos >= 0) currTrnsfrmedPos = 0;
	skillsTrain.style.transform = `translateX(${currTrnsfrmedPos}px)`;
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

    skillIcon.setAttribute("src", iconPath);
    skillIcon.setAttribute("alt", iconDesc);
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
			makeSkillContainer(
				skill,
				skills[skill].desc,
				skills[skill].path,
				count
			)
		);
		count++;
	}
}

/* Skills carousel end */

/* Project event listeners*/
const projects = document.querySelectorAll(".project");
const projectModals = document.querySelectorAll(".project__modal-container");
const projectOverlays = document.querySelectorAll(".project-overlay");
const projectBlurOverlays = document.querySelectorAll(".blur-overlay");
const projectCloseBtns = document.querySelectorAll(".project__close--btn");

projects.forEach((proj) => {
	proj.addEventListener("click", expands);
});

function expands() {
	if (!this.classList.contains("project-active")) {
		this.classList.add("project-active");
	}

	// Hides all other projects when animating.
	projects.forEach((proj) => {
		if (!proj.classList.contains("project-active")) {
			proj.style.visibility = "hidden";
		}
	});

	// Hide title and logo when project is expanded.
	projectModals.forEach((modal) => {
		modal.style.visibility = "hidden";
		modal.style.display = "none";
	});

	// Dampen blur overlay for clarity of image.
	projectBlurOverlays.forEach((blurOverlay) => {
		blurOverlay.style.backdropFilter = "blur(0px)";
	});
}

projectCloseBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		projects.forEach((proj) => {
			proj.removeEventListener("click", expands);
			if (proj.classList.contains("project-active")) {
				proj.classList.remove("project-active");
			}
			setTimeout(() => {
				proj.addEventListener("click", expands);
			}, 200);
		});
		projects.forEach((proj) => {
			proj.style.visibility = "visible";
		});
		projectModals.forEach((modal) => {
			modal.style.visibility = "visible";
			modal.style.display = "flex";
		});
		projectBlurOverlays.forEach((blurOverlay) => {
			blurOverlay.style.backdropFilter = "blur(3.5px)";
		});
	});
});

/* Form */
const submitFormBtn = document.querySelector(".submit-form-btn");
const contactForm = document.querySelector("form");
submitFormBtn.addEventListener("click", (e) => {
	e.preventDefault();

	// Alerts users/employers that backend collecting info fnc is currently
	// down.
	const alertText = document.createElement("p");
	alertText.classList.add("contact__alert-text");

	const userName = document.getElementById("input-name")
		? document.getElementById("input-name")
		: "";
	userName.value.style = "color: blue;";
	alertText.textContent =
		"I apologise " +
		userName.value +
		". Backend for info collection is" +
		" not set up yet. Try contacting me in one of the other links.";

	if (!document.contains(document.querySelector(".contact__alert-text"))) {
		contactForm.appendChild(alertText);
	}
});

/* Project event listeners end */

// function initialisePage() {

// }
