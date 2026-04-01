function showLoaderAndRedirect() {
	const mainContent = document.getElementById('mainContent');
	const loader = document.getElementById('loader');
	const startBtn = document.getElementById('startBtn');

	startBtn.disabled = true;
	mainContent.style.display = 'none';
	loader.style.display = 'flex';

	setTimeout(function () {
		window.location.href = 'mood.html';
	}, 3000);
}

const startButton = document.getElementById('startBtn');
if (startButton) {
	startButton.addEventListener('click', showLoaderAndRedirect);
}
