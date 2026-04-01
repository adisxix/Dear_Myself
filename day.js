const reflectionInput = document.getElementById('reflectionInput');
const nextButton = document.getElementById('nextBtn');
const wordCountText = document.getElementById('wordCount');

const MAX_WORDS = 500;

function getWords(text) {
	const trimmed = text.trim();
	if (!trimmed) {
		return [];
	}
	return trimmed.split(/\s+/);
}

function updateUI() {
	if (!reflectionInput || !nextButton || !wordCountText) {
		return;
	}

	const words = getWords(reflectionInput.value);
	const hasAnyText = reflectionInput.value.trim().length > 0;

	wordCountText.textContent = `${words.length} / ${MAX_WORDS} words`;
	nextButton.disabled = !hasAnyText;
}

if (reflectionInput) {
	reflectionInput.addEventListener('input', () => {
		const words = getWords(reflectionInput.value);

		if (words.length > MAX_WORDS) {
			reflectionInput.value = words.slice(0, MAX_WORDS).join(' ');
		}

		updateUI();
	});
}

if (nextButton) {
	nextButton.addEventListener('click', () => {
		if (!nextButton.disabled) {
			localStorage.setItem('dearmyself_dayReflection', reflectionInput ? reflectionInput.value.trim() : '');
			window.location.href = 'energy.html';
		}
	});
}

updateUI();
