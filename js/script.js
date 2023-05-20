console.log(Window.url);
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

	// When user scrolls down, prevPosScroll will be < currPosScroll. If this
	// condition is met, hide navbar to the top. Otherwise, make it visible.
	// Opacity is also styled for a smoother disappearance effect.
	[navBar.style.top, navBar.style.opacity] = // ES6 Destructuring assignment
		prevPosScroll < currPosScroll ? ["-90px", "0"] : ["0px", "1"];

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

// Adds each skill in array to the skills map.
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
	 * @returns {void}
	 */
	const addSkillToCollection = (name, desc, path, skillsMap) => {
		try {
			skillsMap[name] = { desc, path };
		} catch (err) {
			// e.g. if path to icon not found
			console.error(`${name} icon not found. Please check name spelling. \n
            Error msg: ${err}.`);
			// error squashed. icon picture name will be displayed in the skill
			// container.
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

// skillsTrain will be continously moving to the right using the translateX
// style. User can also manually move this "train" left and/or right by clicking
// on the btns. The set of skills will also be appended on the train after a set
// amount of "next" activations. This gives a carousel visual effect.
const skillsTrain = document.querySelector(".skills-train");

// Shift left and right btns
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// Initialise skill containers into the train. See fnc further below.
insertContainersAfter();

/**
 * Shifts the targeted element ot the right or left side by a certain amount of
 * pixels.
 * @param {Element} element Referenced DOM element
 * @param {Number} translateDist Integer dictating the translated distance the
 * element would be shifted by.
 * Note: A negative integer shifts the element to the right.
 * Positive to the left side.
 */
function slideHorizontal(element, translateDist) {
	element.style.transform = `translateX(${translateDist}px)`;
}

/**
 * Shifts the carousel to the right by a certain width
 */
slideNext = () => {
	// Move carousel train to the right by a container's width (115px).
	slideHorizontal(skillsTrain, (currTrnsfrmedPos -= 115));

	// Appends more skill containers to the train after a set amount of clicks
	// using modulo operator.
	// e.g. if there are 30 total skills, a new set of skills will be appended
	// after 20 "next" activations. This allows the last 10 to still appear
	// in the train.
	if (!((nextCounter % Object.keys(skills).length) / 1.5)) {
		insertContainersAfter();
		setContainersAddedCounter++;
	}

	nextCounter++;

	// Prevent adding too many items to the web page. If more than 5 entire
	// trains are added, remove all skill containers and reinitialise position.
	if (setContainersAddedCounter >= 5) {
		// Clear all items in skills carousel.
		while (skillsTrain.firstChild) {
			skillsTrain.removeChild(skillsTrain.lastChild);
		}

		// Initialise skill train carousel back to default pos.
		currTrnsfrmedPos = nextCounter = setContainersAddedCounter = 0;

		// Reinitialise all skill containers to fill carousel.
		insertContainersAfter();
	}
};

// Link click event with slideNext function for nextBtn.
nextBtn.addEventListener("click", slideNext);

// Add autoplay for carousel that activates next() every 2 seconds;
// See https://www.w3schools.com/jsref/met_win_setinterval.asp
setInterval(slideNext, 2000);

/**
 * Shifts the carousel to the left by a certain width. If carousel's position
 * is at the start, do nothing.
 */
slidePrev = () => {
	slideHorizontal(
		skillsTrain,
		// If at the start of carousel, prevent sliding to the left.
		(currTrnsfrmedPos += currTrnsfrmedPos < 0 ? 115 : 0)
	);
};

// Link click event with slidePrev fnc for prevBtn.
prevBtn.addEventListener("click", slidePrev);

/**
 * A skill container that contains all the relevant information of the skill.
 * @param {String} iconName Skill / Technology image name
 * @param {String} iconDesc Brief description of the targeted image
 * @param {String} iconPath image src url path link.
 * @param {Number} num Tracker that identifies the skill number.
 * @returns {Element} A container div that houses all relevant information
 * regarding the skill.
 */
function makeSkillContainer(iconName, iconDesc, iconPath, num) {
	const container = document.createElement("div"); // Wrapper div

	const skillIcon = document.createElement("img"); // Skill icon image
	const skillName = document.createElement("h1"); // Skill name
	const skillNum = document.createElement("span"); // Identifier

	// Add all relevant classes for styling
	container.classList.add("tool-container");
	skillIcon.classList.add("skill-icon");
	skillName.classList.add("skill-name");
	skillNum.classList.add("skill-num");

	skillIcon.setAttribute("src", iconPath); // Link src path to retrieve img
	skillIcon.setAttribute("alt", iconDesc); // Image name
	skillName.textContent = iconName;
	skillNum.textContent = num;

	[skillIcon, skillName, skillNum].forEach((property) =>
		container.appendChild(property)
	);
	return container;
}

/**
 * Append all skills to skillsTrain.
 * @param {Number} numTracker Identity number that keeps track of each skill.
 * e.g. first skill is 0, second skill is 1...
 * @returns {void}
 */
function insertContainersAfter(numTracker = 0) {
	for (let skill in skills) {
		skillsTrain.appendChild(
			makeSkillContainer(
				skill,
				skills[skill].desc,
				skills[skill].path,
				numTracker++ // increment identityTracker
			)
		);
	}
}
/* Skills carousel end */

/* Project event listeners*/

// Project containers that houses each indivudal project.
const projects = document.querySelectorAll(".project");

// Modals inside the project containers that houses the project name and logo.
const projectModals = document.querySelectorAll(".project__modal-container");

// Overlay containers contains the relevant information, including a background
// image of the project when the project container is clicked upon.
const projectOverlays = document.querySelectorAll(".project-overlay");

// Blur overlays darkens the project's background-image to make the foreground
// information standout.
const projectBlurOverlays = document.querySelectorAll(".blur-overlay");

// All close buttons inside the overlays that reinitialises the project states.
const projectCloseBtns = document.querySelectorAll(".project__close--btn");

// For each project container, link click event with expand function.
projects.forEach((proj) => {
	proj.addEventListener("click", expands);
});

function expands() {
	// "this" is referring to the project container that is being clicked upon.
	if (!this.classList.contains("project-active")) {
		this.classList.add("project-active");
	}

	// Hides all other projects (that is not active) when animating.
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

// Link click event listeners with close buttons inside the project containers.
projectCloseBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		projects.forEach((proj) => {
			// Remove click event listener for project container so that user
			// cannot expand any other projects.
			proj.removeEventListener("click", expands);

			// Remove active class that makes the overlay expands.
			if (proj.classList.contains("project-active")) {
				proj.classList.remove("project-active");
			}

			// Need to set some sort of delay to when adding click event listeners
			// for each project containers so that the user doesn't accidentally
			// expands new project when double clicking.
			setTimeout(() => {
				proj.addEventListener("click", expands);
			}, 200);
		});

		// Change all project container back to visible.
		projects.forEach((proj) => {
			proj.style.visibility = "visible";
		});

		// Show modal displaying relevant information.
		projectModals.forEach((modal) => {
			modal.style.visibility = "visible";
			modal.style.display = "flex";
		});

		// Blur background-image behind the modal information.
		projectBlurOverlays.forEach((blurOverlay) => {
			blurOverlay.style.backdropFilter = "blur(3.5px)";
		});
	});
});

/* Project event listeners end */

/* Form validation */
const submitFormBtn = document.querySelector(".submit-form-btn");
const contactForm = document.querySelector("form");
const nameInput = document.getElementById("input-name");
const emailInput = document.getElementById("input-email");
const messageInput = document.getElementById("input-message");

// On submission, validate required form inputs.
contactForm.addEventListener("submit", (e) => {
	e.preventDefault();

	if (validateForm(nameInput, emailInput)) {
		// Alert users backend functionality is currently down.
		submitSuccessful();

		// Clear all inputs in form for convenience.
		clearInputs(nameInput, emailInput, messageInput);
	}
});

/**
 * Factory function that validates all inputs checking if any content exists,
 * or email is valid. If any invalid inputs are found, an invalid msg error
 * will be displayed at the bottom of the form with its content dependent
 * on the type of invalid error.
 *
 * Returns true if form is validated. False otherwise.
 * @param  {...any} inputs DOM input elements.
 * @returns {boolean}      Boolean defining the current state of the form.
 */
function validateForm(...inputs) {
	// If a prior invalid input msg already exist, remove it to prevent
	// adding duplicates.
	if (document.querySelector(".invalid-input-errormsg")) {
		document.querySelector(".invalid-input-errormsg").remove();
	}

	// Create invalid error message.
	let invalidInputMsg = document.createElement("p");
	invalidInputMsg.classList.add("invalid-input-errormsg");

	/**
	 * Returns true if content exists in specified input. false otherwise.
	 * @param {Element} input Input that stores user's input value
	 * @returns {Boolean}
	 */
	const validateContent = (input) => {
		return !input.value ? false : true;
	};

	/**
	 * Returns true if all required inputs in arguments has content. false
	 * otherwise.
	 * Fnc also updates the invalidMsg depending on which input does not contain
	 * any value. e.g. if name and email doesn't contain a value, both inputs'
	 * name will be appended to the invalidMsg string.
	 * @param {Array} allInputs Array of input DOM elements
	 * @returns {Boolean}
	 */
	const validateAllContent = (allInputs) => {
		let hasContent = true;
		allInputs.forEach((input) => {
			// If no input found, change hasContent to be false and show error
			// with input outline.
			if (!validateContent(input)) {
				hasContent = false;

				// Add red outline for input type.
				input.classList.add("invalid-input");

				// Remove red outline when user types something in.
				input.addEventListener("keydown", (e) => {
					e.target.classList.remove("invalid-input");
				});

				// Update invalidInputMsg
				const inputLabel = input.previousElementSibling.textContent;

				// Substring required to remove the ":".
				// e.g. "Name:" -> "Name"
				invalidInputMsg.textContent += ` ${inputLabel.substring(
					0,
					inputLabel.length - 1
				)} and`;
			}
		});
		return hasContent;
	};

	/**
	 * Returns true if email input's value matches valid email regex. false
	 * otherwise.
	 * @param {Element} input Email input DOM element
	 * @returns {Boolean}
	 */
	const validateEmail = (input) => {
		// Email regex retrieved from w3resource for email validation
		// url link: https://www.w3resource.com/javascript/form/email-validation.php
		const validMailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return input.value.match(validMailFormat);
	};

	let hasInputs = validateAllContent([...inputs]);
	let validEmail = validateEmail(emailInput);

	// If required input has no content, or an invalid email is entered,
	// add invalid input error msg.
	if (!hasInputs || !validEmail) {
		// Only add "no content" error msg if hasInputs is false.
		// Need .substring to remove the last "and" in the str.
		invalidInputMsg.textContent = !hasInputs
			? `${invalidInputMsg.textContent.substring(
					0,
					invalidInputMsg.textContent.length - 4
			  )} has not been filled out.\n`
			: "\n";

		// Only add "invalid email" error msg if validEmail is false.
		invalidInputMsg.textContent += !validEmail
			? "Please enter a valid email."
			: "";

		contactForm.appendChild(invalidInputMsg);
	}

	// If any of the inputs is invalid, return false. true otherwise.
	return hasInputs && validEmail;
}

/**
 * Alert users that backend info is currently down.
 * @returns {void}
 */
function submitSuccessful() {
	const alertText = document.createElement("p");
	alertText.classList.add("contact__alert-text");

	const userName = document.getElementById("input-name").value;
	alertText.textContent = `I apologise ${userName}. 
    Backend for info collection is not set up yet.
    Try contacting me in of the other links.`;

	// Make sure not to repeatedly add alert message.
	if (!document.contains(document.querySelector(".contact__alert-text"))) {
		contactForm.appendChild(alertText);
	}
}

/**
 * Clear all input values inside fnc's parameters.
 * @param  {...any} inputs input DOM elements
 */
function clearInputs(...inputs) {
	[...inputs].forEach((input) => (input.value = ""));
}

/** Form validation end */

