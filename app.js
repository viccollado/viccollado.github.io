const mobileMenuButton = document.getElementById("mobile-menu");
const navbarMenu = document.getElementById("navbar-menu");

if (mobileMenuButton && navbarMenu) {
	mobileMenuButton.addEventListener("click", () => {
		const isOpen = navbarMenu.classList.toggle("is-open");
		mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
	});
}

const modalTriggers = document.querySelectorAll("[data-modal-target]");
const modalCloseButtons = document.querySelectorAll("[data-close-modal]");

const closeModal = (modal) => {
	modal.classList.remove("is-open");
	modal.setAttribute("aria-hidden", "true");
};

const openModal = (modal) => {
	modal.classList.add("is-open");
	modal.setAttribute("aria-hidden", "false");
};

if (modalTriggers.length > 0) {
	modalTriggers.forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const targetId = trigger.getAttribute("data-modal-target");
			const modal = targetId ? document.getElementById(targetId) : null;
			if (modal) {
				openModal(modal);
			}
		});
	});

	modalCloseButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const modal = button.closest(".modal");
			if (modal) {
				closeModal(modal);
			}
		});
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			document.querySelectorAll(".modal.is-open").forEach((modal) => closeModal(modal));
		}
	});
}

