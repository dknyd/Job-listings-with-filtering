//Variables
const tags = document.querySelectorAll('.tag');
const items = document.querySelectorAll('.item');
const item1 = document.querySelector('.item1');
const filteredTags = [];
const body = document.querySelector('body');
const bgHeader = document.querySelector('.bgHeader');
let numFilterContainer = 0;
let numMainTagContainer = 0;



//Background Header src change
window.addEventListener('DOMContentLoaded', function() {
	const bgHeader = document.querySelector('.bgHeader');

	function updateBgHeader() {
		const width = window.innerWidth;
		const mobileSrc = 'images/bg-header-mobile.svg';
		const desktopSrc = 'images/bg-header-desktop.svg';

		if (width < 850) {
			bgHeader.src = mobileSrc;
		} else {
			bgHeader.src = desktopSrc;
		}
	}

	// Initial update on page load
	updateBgHeader();

	// Update on window resize
	window.addEventListener('resize', updateBgHeader);
});



// Hide element
function makeHidden(element) {
	element.classList.remove("visible");
	element.classList.add("hidden");
}

// Show element
function makeVisible(element) {
	element.classList.add("visible");
	element.classList.remove("hidden");
}


//Filtering
for (const tag of tags) {
	tag.addEventListener('click', function() {
		filteredTags.push(tag.innerHTML);
		// Creating Filter Field
		if (numFilterContainer === 0) {
			numFilterContainer++;
			const newDiv = document.createElement('div');
			item1.parentNode.insertBefore(newDiv, item1);
			newDiv.classList.add('filterContainer');
			const clearButton = document.createElement('div');
			clearButton.classList.add('clearButton');
			clearButton.innerHTML = 'Clear';
			newDiv.appendChild(clearButton);
			//Clear button functionality
			clearButton.addEventListener('click', function() {
				filteredTags.length = 0;
				makeHidden(newDiv);
				numFilterContainer--;
				for (const item of items) {
					makeVisible(item);
				}
				location.reload();
			})
		}


		//Creating tags
		const filterContainer = document.querySelector('.filterContainer')
		const tagContainer = document.createElement('div');
		tagContainer.classList.add('tagContainer');
		filterContainer.appendChild(tagContainer);
		for (let i = 0; i < filteredTags.length; i++) {
			tagContainer.innerHTML = '';
			tagContainer.innerHTML = filteredTags[i];
			const tagContainerClose = document.createElement('div');
			tagContainerClose.innerHTML = 'X';
			tagContainerClose.classList.add('tagContainerClose');
			tagContainer.appendChild(tagContainerClose);

		}

		//Tag colse "X" button functionality
		const tagContainerCloseAll = document.querySelectorAll('.tagContainerClose');
		for (let j = 0; j < tagContainerCloseAll.length; j++) {
			tagContainerCloseAll[j].addEventListener('click', function() {
				makeHidden(tagContainerCloseAll[j].parentNode);
				for (const item of items) {
					if (!item.textContent.includes(tag.innerHTML)) {
						makeVisible(item)
					}
				}
			})
		}



		// Removing items not containing chosen tag
		for (const item of items) {
			if (!item.textContent.includes(tag.innerHTML)) {
				makeHidden(item)
			}
		}
	})
}



