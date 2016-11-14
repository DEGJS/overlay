import domUtils from "DEGJS/domUtils";

let overlay = function() {

	let bodyEl = document.body,
		containerEl,
		backdropEl,
		closeButtonEl,
		contentEl,
		elsCreated = false,
		settings = {
			openClass: 'overlay-is-open',
			stickyClass: 'overlay-is-sticky',
			containerClass: 'overlay',
			backdropClass: 'overlay__backdrop',
			closeButtonClass: ['overlay__close-button','close-button', 'icon-close'],
			contentClass: 'overlay__content',
			closeButtonText: 'Close'
		};

	function open(optionalContent = null, params) {
		createElements(params);
		if (optionalContent !== null) {
			setContent(optionalContent);
		}
		bodyEl.classList.add(settings.openClass);
		if ((params) && (params.isSticky)) {
			bodyEl.classList.add(settings.stickyClass);
		}
	};

	function close() {
		bodyEl.classList.remove(settings.openClass);
	};

	function setContent(content) {
		createElements();
		removeContent();
		if (domUtils.isElement(content)) {
			contentEl.appendChild(content);
		} else if (typeof content === 'string') {
			contentEl.insertAdjacentHTML('beforeend', content);
		}
	};

	function removeContent() {
		contentEl.innerHTML = '';

	};

	function createElements(params) {
		if (!elsCreated) {
			containerEl = document.createElement('div');
			domUtils.addCssClasses(containerEl, settings.containerClass);

			backdropEl = document.createElement('div');
			domUtils.addCssClasses(backdropEl, settings.backdropClass);
			containerEl.appendChild(backdropEl);

			if ((params) && (params.showCloseButton)) {
				closeButtonEl = document.createElement('button');
				closeButtonEl.textContent = settings.closeButtonText;
				domUtils.addCssClasses(closeButtonEl, settings.closeButtonClass);
				containerEl.appendChild(closeButtonEl);
			}

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
				isCloseButton = clickedEl.closest(settings.closeButtonClass[0]),
				isBackDrop = clickedEl.closest(settings.backdropClass, clickedEl);
			if ((isCloseButton !== false) || (isBackDrop !== false)) {
				if ((isBackDrop !== false) && (isSticky() === false)) {
					close();
				}
				if (isCloseButton !== false) {
					close();
				}
			}
		});
		document.addEventListener('keyup', function(e) {
			if ((e.keyCode === 27) && (isSticky() === false)) {
				close();
			}
		});
	};

	function isSticky() {
		return bodyEl.classList.contains(settings.stickyClass);
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