/* */ 
import domUtils from "DEGJS/domUtils";

let overlay = function() {

	let bodyEl = document.body,
		containerEl,
		backdropEl,
		closeButtonEl,
		contentEl,
		elsCreated = false,
		mainBackdropClass = 'js-overlay-backdrop',
		mainCloseButtonClass = 'js-overlay-close-button',
		settings,
		defaults = {
			openClass: 'overlay-is-open',
			stickyClass: 'overlay-is-sticky',
			containerClass: 'overlay',
			backdropClasses: ['overlay__backdrop'],
			closeButtonClasses: ['overlay__close-button','close-button', 'icon-close'],
			contentClass: 'overlay__content',
			hasCloseButton: true,
			closeButtonText: 'Close',
			isSticky: false
		};

	function open(optionalContent = null, params = {}) {
		settings = Object.assign({}, defaults, params);

		createElements();
		if (optionalContent !== null) {
			setContent(optionalContent);
		}
		bodyEl.classList.add(settings.openClass);
		if (settings.isSticky) {
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

	function createElements() {
		if (!elsCreated) {
			containerEl = document.createElement('div');
			domUtils.addCssClasses(containerEl, settings.containerClass);

			backdropEl = document.createElement('div');
			domUtils.addCssClasses(backdropEl, settings.backdropClasses);
			backdropEl.classList.add(mainBackdropClass);
			containerEl.appendChild(backdropEl);

			if(settings.hasCloseButton) {
				closeButtonEl = document.createElement('button');
				closeButtonEl.textContent = settings.closeButtonText;
				domUtils.addCssClasses(closeButtonEl, settings.closeButtonClasses);
				closeButtonEl.classList.add(mainCloseButtonClass);
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
		containerEl.addEventListener('click', function(e) {
			let clickedEl = e.target,
				isBackDrop = clickedEl.closest('.' + mainBackdropClass) !== null,
				isCloseButton = clickedEl.closest('.' + mainCloseButtonClass) !== null ;

			if ((isCloseButton) || ((isSticky() === false) && (isBackDrop))) {
				close();
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