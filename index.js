const { log } = console;

const tabContainers = document.querySelectorAll('.tab-container');
tabContainers.forEach(tabContainer => {
	const indicator = document.createElement('div');
	indicator.classList.add('indicator');
	tabContainer.appendChild(indicator);
	function handleUp(e) {
		if (e.target !== this.target) return;
		e.target.classList.forEach(list => {
			if (list !== 'tab-items') return;

			const { x: tabX, y: tabY } = tabContainer.getBoundingClientRect();

			const { x, y, height, width } = e.target.getBoundingClientRect();
			const indicatorX = x - tabX;
			const indicatorY = y - tabY + height;
			indicator.style.setProperty('--x', `${indicatorX}px`);
			indicator.style.setProperty('--y', `${indicatorY}px`);
			indicator.style.setProperty('--width', `${width}px`);
		});
	}
	tabContainer.addEventListener('pointerdown', e => {
		if (e.buttons !== 1) return;
		tabContainer.addEventListener(
			'pointerup',
			handleUp.bind({ target: e.target }),
			{
				once: true,
			}
		);
	});
	tabContainer.addEventListener('keydown', e => {
		log(e.key !== 'Enter' && e.key != ' ');
		if (e.key !== 'Enter' && e.key != ' ') return;
		tabContainer.addEventListener(
			'keyup',
			handleUp.bind({ target: e.target }),
			{
				once: true,
			}
		);
	});
});
