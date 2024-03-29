/** Projectsjs file decided to be created instead of only having one scriptjs
 * file to enhance simplicity in understanding the different functionalities
 * in the projects webpage.
 * This is due to the large number of functionalities not required from the 
 * scriptjs file to be implemented in the projects webpage.
 */

/** Cube rotation in switching projects functionality */
const switchProjInputBtns = document.querySelectorAll(
	".switch-proj-option--btn"
);

// Cube that houses all the different projects in each of the faces.
const otherProjCube = document.querySelector(".other-projects-cube");

switchProjInputBtns.forEach((switchProjBtn) => {
	switchProjBtn.addEventListener("click", (e) => {

		// Default class name for each project btn is option-proj-[proj number]
		// We want to extract the proj number
		let projBtnName = e.target.getAttribute("name").split("-");

		// Last element of the array ["option", "proj", "[proj-number]"]
        // e.g. "four"
		projBtnName = projBtnName[projBtnName.length - 1];

        // Rotate cube to specified project.
		switchProjTo(otherProjCube, projBtnName);

        // Reset all btns styling and set current button to "active"
        resetBtnsStyle(switchProjInputBtns);
        changeToActiveBtn(e.target);
	});
});

// Initialise first project button to be active.
changeToActiveBtn(switchProjInputBtns[0]);

/**
 * Switches the cube's front to the specified project. The transition styling
 * will make the rotation effect.
 * @param {Element} cube cube element container that is doing the rotations.
 * @param {String} proj Project number that forces the cube to display
 */
function switchProjTo(cube, proj) {
    // Cube should default have two classes. One is other-projects-cube and the
	// other depends on which projects needs to be displayed. If there are no
	// two classes, don't remove the last class
	if (cube.classList.length > 1) {
		cube.classList.remove(getLastClass(cube));
	}
    
	// e.g. If the second project is to be displayed in
	// front of the cube, the class "display-proj-two" will be added to the cube.
	cube.classList.add(`display-project-${proj}`);
}

/**
 * Helper fnc that returns a string of the last class of a specified element.
 * @param {Element} element A DOM element
 * @returns {String}    Last class of a string
 */
function getLastClass(element) {
	let lastClass = element.classList[element.classList.length - 1];
	return lastClass;
}

/**
 * Applies a specified styling to a button by adding an additional class.
 * @param {Element} button Specified button to apply specified styling
 */
function changeToActiveBtn(button) {

    // Add class for active style.
	button.classList.add("active-other-projects--btn");
}

/**
 * Reset button styling by removing the specified style.
 * @param {Array} buttons Specified buttons to apply specified styling.
 */
function resetBtnsStyle(buttons) {
	buttons.forEach((button) =>
		button.classList.remove("active-other-projects--btn")
	);
}
