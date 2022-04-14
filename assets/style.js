//scroll progress bar
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {
	myFunction()
};

function myFunction() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	document.getElementById("myBar").style.width = scrolled + "%";
}
//search bar JS code
var search = ["Antarctica", "Biodiversity", "Capitalism", "Contamination", "Deforestation", "Damaged environments", "Environmental Issues", "Electricity", "Fracking", "Geopolitical Issues", "Groundwater Contamination", "Hydro-Electric Power", "International Agreements", "Jungle Destruction", "Killing Animals", "Leaching", "Mining", "Nitrate Extractions", "Overpopulation", "Poverty", "Pollution", "Queenstown", "Recycling", "Solar Power", "Transport", "Ultraviolet Conditions", "Vegetarianism", "Weather Patterns", "Youth Clubs", "Zoology"]
	//auto complete search function
function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if(!val) {
			return false;
		}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for(i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if(arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					/*close the list of autocompleted values,
					(or any other open lists of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if(x) x = x.getElementsByTagName("div");
		if(e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
			increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if(e.keyCode == 38) { //up
			/*If the arrow UP key is pressed,
			decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if(e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if(currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if(x) x[currentFocus].click();
			}
		}
	});

	function addActive(x) {
		/*a function to classify an item as "active":*/
		if(!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if(currentFocus >= x.length) currentFocus = 0;
		if(currentFocus < 0) currentFocus = (x.length - 1);
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}

	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for(var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}

	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for(var i = 0; i < x.length; i++) {
			if(elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function(e) {
		closeAllLists(e.target);
	});
}
//auto complete search variables
autocomplete(document.getElementById("myInput"), search);
//carousel JS code
!(function(d) {
	// Variables to target our base class,  get carousel items, count how many carousel items there are, set the slide to 0 (which is the number that tells us the frame we're on), and set motion to true which disables interactivity.
	var itemClassName = "carousel__photo";
	items = d.getElementsByClassName(itemClassName),
		totalItems = items.length,
		slide = 0,
		moving = true;
	// To initialise the carousel we'll want to update the DOM with our own classes
	function setInitialClasses() {
		// Target the last, initial, and next items and give them the relevant class.
		// This assumes there are three or more items.
		items[totalItems - 1].classList.add("prev");
		items[0].classList.add("active");
		items[1].classList.add("next");
	}
	// Set click events to navigation buttons
	function setEventListeners() {
		var next = d.getElementsByClassName('carousel__button--next')[0],
			prev = d.getElementsByClassName('carousel__button--prev')[0];
		next.addEventListener('click', moveNext);
		prev.addEventListener('click', movePrev);
	}
	// Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
	function disableInteraction() {
		moving = true;
		setTimeout(function() {
			moving = false
		}, 500);
	}
	//carousel controls 
	function moveCarouselTo(slide) {
		// Check if carousel is moving, if not, allow interaction
		if(!moving) {
			// temporarily disable interactivity
			disableInteraction();
			// Preemptively set variables for the current next and previous slide, as well as the potential next or previous slide.
			var newPrevious = slide - 1,
				newNext = slide + 1,
				oldPrevious = slide - 2,
				oldNext = slide + 2;
			// Test if carousel has more than three items
			if((totalItems - 1) > 3) {
				// Checks if the new potential slide is out of bounds and sets slide numbers
				if(newPrevious <= 0) {
					oldPrevious = (totalItems - 1);
				} else if(newNext >= (totalItems - 1)) {
					oldNext = 0;
				}
				// Check if current slide is at the beginning or end and sets slide numbers
				if(slide === 0) {
					newPrevious = (totalItems - 1);
					oldPrevious = (totalItems - 2);
					oldNext = (slide + 1);
				} else if(slide === (totalItems - 1)) {
					newPrevious = (slide - 1);
					newNext = 0;
					oldNext = 1;
				}
				// Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.
				// Based on the current slide, reset to default classes.
				items[oldPrevious].className = itemClassName;
				items[oldNext].className = itemClassName;
				// Add the new classes
				items[newPrevious].className = itemClassName + " prev";
				items[slide].className = itemClassName + " active";
				items[newNext].className = itemClassName + " next";
			}
		}
	}
	// Next navigation handler
	function moveNext() {
		// Check if moving
		if(!moving) {
			// If it's the last slide, reset to 0, else +1
			if(slide === (totalItems - 1)) {
				slide = 0;
			} else {
				slide++;
			}
			// Move carousel to updated slide
			moveCarouselTo(slide);
		}
	}
	// Previous navigation handler
	function movePrev() {
		// Check if moving
		if(!moving) {
			// If it's the first slide, set as the last slide, else -1
			if(slide === 0) {
				slide = (totalItems - 1);
			} else {
				slide--;
			}
			// Move carousel to updated slide
			moveCarouselTo(slide);
		}
	}
	// Initialise carousel
	function initCarousel() {
		setInitialClasses();
		setEventListeners();
		// Set moving to false now that the carousel is ready
		moving = false;
	}
	// make it rain
	initCarousel();
}(document));
//Javascript to expand the more text button for the Blog page
function post1() {
	var dots = document.getElementById("dots");
	var moreText = document.getElementById("more");
	var btnText = document.getElementById("myBtn");
	if(dots.style.display === "none") {
		dots.style.display = "inline";
		btnText.innerHTML = "Read more";
		moreText.style.display = "none";
	} else {
		dots.style.display = "none";
		btnText.innerHTML = "Read less";
		moreText.style.display = "inline";
	}
}
//Javascript to expand the more text button for the Blog page story 2
function post2() {
	var dots = document.getElementById("dot");
	var moreText = document.getElementById("more1");
	var btnText = document.getElementById("myBtn2");
	if(dots.style.display === "none") {
		dots.style.display = "inline";
		btnText.innerHTML = "Read more";
		moreText.style.display = "none";
	} else {
		dots.style.display = "none";
		btnText.innerHTML = "Read less";
		moreText.style.display = "inline";
	}
}
//Javascript for contact form
document.querySelector('#contact-form').addEventListener('submit', (e) => {
	e.preventDefault();
	e.target.elements.name.value = '';
	e.target.elements.email.value = '';
	e.target.elements.message.value = '';
});