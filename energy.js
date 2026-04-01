const energyButtons = document.querySelectorAll('#energyGroup .energy-btn');
const careButtons = document.querySelectorAll('#careGroup .energy-btn');
const nextButton = document.getElementById('nextBtn');
const mainContent = document.getElementById('mainContent');
const loader = document.getElementById('loader');

const SELECTED_CLASS = 'is-selected';

function setButtonState(button, isSelected) {
	const label = button.querySelector('.energy-label');

	if (isSelected) {
		button.classList.add(SELECTED_CLASS);
		button.style.backgroundColor = '#B8B8FF';
		if (label) {
			label.style.color = '#F8F7FF';
		}
		return;
	}

	button.classList.remove(SELECTED_CLASS);
	button.style.backgroundColor = '#FFEEDD';
	if (label) {
		label.style.color = '#9381FF';
	}
}

function selectOneInGroup(groupButtons, clickedButton) {
	groupButtons.forEach((button) => {
		setButtonState(button, button === clickedButton);
	});
}

function isGroupSelected(groupButtons) {
	return Array.from(groupButtons).some((button) => button.classList.contains(SELECTED_CLASS));
}

function getSelectedValue(groupButtons) {
	const selectedButton = Array.from(groupButtons).find((button) => button.classList.contains(SELECTED_CLASS));
	if (!selectedButton) {
		return '';
	}
	return selectedButton.getAttribute('aria-label') || '';
}

function updateNextButtonState() {
	if (!nextButton) {
		return;
	}
	const validSelection = isGroupSelected(energyButtons) && isGroupSelected(careButtons);
	nextButton.disabled = !validSelection;
}

energyButtons.forEach((button) => {
	button.addEventListener('click', () => {
		selectOneInGroup(energyButtons, button);
		updateNextButtonState();
	});
});

careButtons.forEach((button) => {
	button.addEventListener('click', () => {
		selectOneInGroup(careButtons, button);
		updateNextButtonState();
	});
});

if (nextButton) {
	nextButton.addEventListener('click', () => {
		if (nextButton.disabled) {
			return;
		}

			localStorage.setItem('dearmyself_energy', getSelectedValue(energyButtons));
			localStorage.setItem('dearmyself_selfCare', getSelectedValue(careButtons));

		if (mainContent) {
			mainContent.style.display = 'none';
		}
		if (loader) {
			loader.style.display = 'flex';
		}

		setTimeout(() => {
			window.location.href = 'reflections.html';
		}, 3000);
	});
}

updateNextButtonState();
