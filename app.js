document.documentElement.classList.add('js');

const navToggle = document.querySelector('[data-nav-toggle]');
const navigation = document.querySelector('[data-nav]');

if (navToggle && navigation) {
	navToggle.addEventListener('click', () => {
		const open = navToggle.getAttribute('aria-expanded') !== 'true';
		navToggle.setAttribute('aria-expanded', String(open));
		navigation.classList.toggle('open', open);
	});
	navigation.addEventListener('click', (event) => {
		if (event.target.closest('a')) {
			navToggle.setAttribute('aria-expanded', 'false');
			navigation.classList.remove('open');
		}
	});
}

const demoButtons = document.querySelectorAll('[data-demo-view]');
const documentPreview = document.querySelector('[data-document-preview]');
const demoStatus = document.querySelector('[data-demo-status]');
const demoDetail = document.querySelector('[data-demo-detail]');

function setDocumentView(view) {
	const protectedView = view === 'protected';
	documentPreview?.classList.toggle('protected', protectedView);
	documentPreview?.querySelectorAll('[data-original]').forEach((entity) => {
		entity.textContent = protectedView ? entity.dataset.protected : entity.dataset.original;
	});
	demoButtons.forEach((button) => {
		const active = button.dataset.demoView === view;
		button.classList.toggle('active', active);
		button.setAttribute('aria-pressed', String(active));
	});
	if (demoStatus && demoDetail) {
		demoStatus.textContent = protectedView ? 'Sensitive values replaced' : 'Original values visible';
		demoDetail.textContent = protectedView ? 'Token mapping retained on GroundGear One' : 'Ready to protect on GroundGear One';
	}
}

demoButtons.forEach((button) => button.addEventListener('click', () => setDocumentView(button.dataset.demoView)));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
	reveals.forEach((element) => element.classList.add('visible'));
} else {
	const observer = new IntersectionObserver((entries, revealObserver) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				revealObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	reveals.forEach((element) => observer.observe(element));
}

document.querySelectorAll('[data-year]').forEach((element) => {
	element.textContent = new Date().getFullYear();
});
