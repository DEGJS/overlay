import domUtils from "DEGJS/domUtils";

let overlay = function() {

	let bodyEl = domUtils.elements.body,
		containerEl,
		backdropEl,
		closeButtonEl,
		contentEl,
		elsCreated = false,
		settings = {
			openClass: 'overlay-is-open',
			containerClass: 'overlay',
			backdropClass: 'overlay__backdrop',
			closeButtonClass: ['overlay__close-button','close-button', 'icon-close'],
			contentClass: 'overlay__content',
			closeButtonText: 'Close'
		};

	function open(optionalContent = null) {
		createElements();
		if (optionalContent !== null) {
			setContent(optionalContent);
		}
		bodyEl.classList.add(settings.openClass);
	};

	function close() {
		bodyEl.classList.remove(settings.openClass);
	};

	function setContent(content) {
		createElements();
		removeContent();
		if(domUtils.isElement(content)) {
			contentEl.appendChild(content);
		} else if(typeof content === 'string') {
			contentEl.insertAdjacentHTML('beforeend', content);
		}
	};

	function removeContent() {
		contentEl.innerHTML = '';

	};

	function createElements() {
		if (!elsCreated) {
			containerEl = document.createElement('div');
			domUtils.addCssClasses(containerEl, settings.containerClass);

			backdropEl = document.createElement('div');
			domUtils.addCssClasses(backdropEl, settings.backdropClass);
			containerEl.appendChild(backdropEl);

			closeButtonEl = document.createElement('button');
			closeButtonEl.textContent = settings.closeButtonText;
			domUtils.addCssClasses(closeButtonEl, settings.closeButtonClass);
			containerEl.appendChild(closeButtonEl);

			contentEl = document.createElement('div');
			domUtils.addCssClasses(contentEl, settings.contentClass);
			containerEl.appendChild(contentEl);

			bodyEl.appendChild(containerEl);
			bindEvents();
			elsCreated = true;
		}
	};

	function bindEvents() {
		document.addEventListener('click', function(e) {
			let clickedEl = e.target,
				isCloseButton = domUtils.isDescendentByClass(settings.closeButtonClass[0], clickedEl),
				isBackDrop = domUtils.isDescendentByClass(settings.backdropClass, clickedEl);
			if ((isCloseButton !== false) || (isBackDrop !== false)) {
				close();
			}
		});
		document.addEventListener('keyup', function(e) {
			if (e.keyCode === 27) {
				close();
			}
		});
	};

	return {
		open: open,
		close: close,
		setContent: setContent,
		removeContent: removeContent
	}

};

var instance = overlay();

export default instance;