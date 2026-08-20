const photoPage = document.querySelector(".photography-page");

if (photoPage) {
	const photoCollections = {
		"01": [
			{ filename: "F1020001.webp", caption: "Caption to be added." },
			{ filename: "F1020003.webp", caption: "Caption to be added." },
			{ filename: "F1020004.webp", caption: "Caption to be added." },
			{ filename: "F1020005.webp", caption: "Caption to be added." },
			{ filename: "F1020008.webp", caption: "Caption to be added." },
			{ filename: "F1020009.webp", caption: "Caption to be added." },
			{ filename: "F1020010.webp", caption: "Caption to be added." },
			{ filename: "F1020017.webp", caption: "Caption to be added." },
			{ filename: "F1020018.webp", caption: "Caption to be added." }
		],
		"02": [
			{ filename: "_11_0101.webp", caption: "Caption to be added." },
			{ filename: "_15_0097.webp", caption: "Caption to be added." },
			{ filename: "_16_0096.webp", caption: "Caption to be added." },
			{ filename: "_18_0094.webp", caption: "Caption to be added." },
			{ filename: "__7_0105.webp", caption: "Caption to be added." },
			{ filename: "__8_0104.webp", caption: "Caption to be added." },
			{ filename: "__9_0103.webp", caption: "Caption to be added." }
		],
		"03": [
			{ filename: "05.webp", caption: "Caption to be added." },
			{ filename: "06.webp", caption: "Caption to be added." },
			{ filename: "07.webp", caption: "Caption to be added." },
			{ filename: "09.webp", caption: "Caption to be added." },
			{ filename: "11.webp", caption: "Caption to be added." },
			{ filename: "13.webp", caption: "Caption to be added." },
			{ filename: "14.webp", caption: "Caption to be added." },
			{ filename: "15.webp", caption: "Caption to be added." },
			{ filename: "18.webp", caption: "Caption to be added." },
			{ filename: "19.webp", caption: "Caption to be added." },
			{ filename: "22.webp", caption: "Caption to be added." },
			{ filename: "23.webp", caption: "Caption to be added." },
			{ filename: "29.webp", caption: "Caption to be added." }
		],
		"04": [
			{ filename: "11.webp", caption: "Caption to be added." },
			{ filename: "22.webp", caption: "Caption to be added." },
			{ filename: "29.webp", caption: "Caption to be added." }
		],
		"05": [
			{ filename: "01.webp", caption: "Caption to be added." },
			{ filename: "02.webp", caption: "Caption to be added." },
			{ filename: "05.webp", caption: "Caption to be added." },
			{ filename: "06.webp", caption: "Caption to be added." },
			{ filename: "07.webp", caption: "Caption to be added." },
			{ filename: "08.webp", caption: "Caption to be added." },
			{ filename: "09.webp", caption: "Caption to be added." },
			{ filename: "11.webp", caption: "Caption to be added." },
			{ filename: "14.webp", caption: "Caption to be added." },
			{ filename: "18.webp", caption: "Caption to be added." },
			{ filename: "19.webp", caption: "Caption to be added." },
			{ filename: "20.webp", caption: "Caption to be added." },
			{ filename: "21.webp", caption: "Caption to be added." },
			{ filename: "22.webp", caption: "Caption to be added." },
			{ filename: "23.webp", caption: "Caption to be added." },
			{ filename: "25.webp", caption: "Caption to be added." },
			{ filename: "27.webp", caption: "Caption to be added." },
			{ filename: "28.webp", caption: "Caption to be added." },
			{ filename: "29.webp", caption: "Caption to be added." },
			{ filename: "30.webp", caption: "Caption to be added." },
			{ filename: "31.webp", caption: "Caption to be added." },
			{ filename: "32.webp", caption: "Caption to be added." },
			{ filename: "35.webp", caption: "Caption to be added." }
		]
	};

	const photos = Object.entries(photoCollections).flatMap(([roll, items]) => items.map(({ filename, caption }, index) => ({
		src: `resources/photos/${roll}/${filename}`,
		roll,
		number: index + 1,
		caption,
		alt: caption
	})));
	const featuredPhotos = [photos[0], photos[9], photos[16], photos[29], photos[32]];
	const featureSlides = document.getElementById("photo-feature-slides");
	const gallery = document.getElementById("photo-gallery");
	const modal = document.getElementById("photo-modal");
	const modalImage = document.getElementById("photo-modal-image");
	const modalTitle = document.getElementById("photo-modal-title");
	const photoStatus = document.getElementById("photo-status");
	let activeSlide = 0;
	let slideTimer;

	const photoButton = (photo, className) => {
		const button = document.createElement("button");
		button.className = className;
		button.type = "button";
		button.dataset.photoSrc = photo.src;
		button.dataset.photoAlt = photo.alt;
		button.dataset.photoCaption = photo.caption;
		button.setAttribute("aria-label", `Open photograph: ${photo.caption}`);
		button.innerHTML = `<img src="${photo.src}" alt="${photo.alt}" loading="lazy">`;
		return button;
	};

	const showPhoto = (photo) => {
		modalImage.src = photo.src;
		modalImage.alt = photo.alt;
		modalTitle.textContent = photo.caption || "Caption to be added.";
		modal.classList.add("is-open");
		modal.setAttribute("aria-hidden", "false");
	};

	const renderFeatured = () => {
		featureSlides.innerHTML = featuredPhotos.map((photo, index) => `
			<div class="photo-feature__slide${index === 0 ? " is-active" : ""}" data-slide-index="${index}">
				${photoButton(photo, "photo-feature__image").outerHTML}
				<div class="photo-feature__label">Roll ${photo.roll} / ${String(photo.number).padStart(2, "0")}</div>
			</div>
		`).join("");
		photoStatus.textContent = `01 / ${String(featuredPhotos.length).padStart(2, "0")}`;
	};

	const renderGallery = () => {
		gallery.innerHTML = photos.map((photo) => `
			<figure class="photo-card">
				${photoButton(photo, "photo-card__button").outerHTML}
				<figcaption>Roll ${photo.roll} / ${String(photo.number).padStart(2, "0")}</figcaption>
			</figure>
		`).join("");
	};

	const updateSlide = (nextIndex) => {
		activeSlide = (nextIndex + featuredPhotos.length) % featuredPhotos.length;
		document.querySelectorAll(".photo-feature__slide").forEach((slide, index) => {
			slide.classList.toggle("is-active", index === activeSlide);
		});
		photoStatus.textContent = `${String(activeSlide + 1).padStart(2, "0")} / ${String(featuredPhotos.length).padStart(2, "0")}`;
	};

	const startSlideshow = () => {
		clearInterval(slideTimer);
		slideTimer = setInterval(() => updateSlide(activeSlide + 1), 5000);
	};

	const closePhoto = () => {
		modal.classList.remove("is-open");
		modal.setAttribute("aria-hidden", "true");
		modalImage.src = "";
	};

	renderFeatured();
	renderGallery();
	startSlideshow();

	document.addEventListener("click", (event) => {
		const button = event.target.closest("[data-photo-src]");
		if (button) {
			showPhoto({
				src: button.dataset.photoSrc,
				alt: button.dataset.photoAlt,
				caption: button.dataset.photoCaption || "Caption to be added."
			});
		}
		if (event.target.closest("[data-photo-close]")) closePhoto();
	});
	document.getElementById("photo-previous").addEventListener("click", () => { updateSlide(activeSlide - 1); startSlideshow(); });
	document.getElementById("photo-next").addEventListener("click", () => { updateSlide(activeSlide + 1); startSlideshow(); });
	document.addEventListener("keydown", (event) => { if (event.key === "Escape") closePhoto(); });
}
