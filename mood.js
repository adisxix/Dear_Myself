const moodButtons = document.querySelectorAll('.mood-btn');
const MAX_SELECTED = 3;
const MIN_SELECTED = 1;
const SELECTED_CLASS = 'is-selected';
const nextButton = document.getElementById('nextBtn');

function getSelectedCount() {
	return document.querySelectorAll('.mood-btn.is-selected').length;
}

function getSelectedMoods() {
	return Array.from(document.querySelectorAll('.mood-btn.is-selected')).map((button) => button.getAttribute('aria-label'));
}

function updateNextButtonState() {
	if (!nextButton) {
		return;
	}

	const selectedCount = getSelectedCount();
	nextButton.disabled = selectedCount < MIN_SELECTED;
}

function setSelectedState(button, isSelected) {
	const label = button.querySelector('.mood-label');

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

moodButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const isAlreadySelected = button.classList.contains(SELECTED_CLASS);

		if (isAlreadySelected) {
			setSelectedState(button, false);
			updateNextButtonState();
			return;
		}

		const selectedCount = getSelectedCount();
		if (selectedCount >= MAX_SELECTED) {
			return;
		}

		setSelectedState(button, true);
		updateNextButtonState();
	});
});

if (nextButton) {
	nextButton.addEventListener('click', () => {
		if (getSelectedCount() >= MIN_SELECTED) {
			localStorage.setItem('dearmyself_moods', JSON.stringify(getSelectedMoods()));
			window.location.href = 'day.html';
		}
	});
}

updateNextButtonState();
