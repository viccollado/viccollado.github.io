const photoPage = document.querySelector(".photography-page");

if (photoPage) {
	const photoCollections = [
		// Roll 1
		{ filename: "01_01.webp", caption: "Benidorm." },
		{ filename: "01_02.webp", caption: "Cerro del Tío Pío, Madrid." },
		{ filename: "01_03.webp", caption: "Iglesia, Madrid." },
		{ filename: "01_04.webp", caption: "Mallorca, Spain." },
		{ filename: "01_05.webp", caption: "Mallorca, Spain." },
		{ filename: "01_06.webp", caption: "Mallorca, Spain." },
		{ filename: "01_07.webp", caption: "Mallorca, Spain." },
		{ filename: "01_08.webp", caption: "Road at night, Spain." },
		{ filename: "01_09.webp", caption: "Gas station, Spain." },
		// Roll 2
		{ filename: "02_01.webp", caption: "Parking, Milan, Italy." },
		{ filename: "02_02.webp", caption: "Flower shop, Milan, Italy." },
		{ filename: "02_03.webp", caption: "Tram, Milan, Italy" },
		{ filename: "02_04.webp", caption: "Train Station, Villasanta, Italy." },
		{ filename: "02_05.webp", caption: "Gas station, Spain." },
		{ filename: "02_06.webp", caption: "Milan, Italy." },
		{ filename: "02_07.webp", caption: "Gran Vía, Madrid, Spain." },
		// Roll 3
		{ filename: "03_01.webp", caption: "Suomenlinna, Helsinki, Finland." },
		{ filename: "03_02.webp", caption: "Suomenlinna, Helsinki, Finland." },
		{ filename: "03_03.webp", caption: "Suomenlinna, Helsinki, Finland." },
		{ filename: "03_04.webp", caption: "Helsinki, Finland." },
		{ filename: "03_05.webp", caption: "Helsinki, Finland." },
		{ filename: "03_06.webp", caption: "Sanssouci, Berlin, Germany." },
		{ filename: "03_07.webp", caption: "Berlin, Germany." },
		{ filename: "03_08.webp", caption: "Berlin, Germany." },
		{ filename: "03_09.webp", caption: "Alhambra, Granada, Spain." },
		{ filename: "03_10.webp", caption: "Alhambra, Granada, Spain." },
		{ filename: "03_11.webp", caption: "Segovia, Spain." },
		{ filename: "03_12.webp", caption: "Getafe, Spain." },
		// Roll 4
		{ filename: "04_01.webp", caption: "Spain." },
		{ filename: "04_02.webp", caption: "Diego900 concert, Spain." },
		{ filename: "04_03.webp", caption: "Cangas de Onis, Asturias, Spain" },
		// Roll 5
		{ filename: "05_01.webp", caption: "Paris, France" },
		{ filename: "05_02.webp", caption: "Paris, France" },
		{ filename: "05_03.webp", caption: "Paris, France" },
		{ filename: "05_04.webp", caption: "Paris, France" },
		{ filename: "05_05.webp", caption: "Paris, France" },
		{ filename: "05_06.webp", caption: "Paris, France" },
		{ filename: "05_07.webp", caption: "Paris, France" },
		{ filename: "05_08.webp", caption: "Paris, France" },
		{ filename: "05_09.webp", caption: "Paris, France" },
		{ filename: "05_10.webp", caption: "Paris, France" },
		{ filename: "05_11.webp", caption: "Paris, France" },
		{ filename: "05_12.webp", caption: "Paris, France" },
		{ filename: "05_13.webp", caption: "Paris, France" },
		{ filename: "05_14.webp", caption: "Paris, France" },
		{ filename: "05_15.webp", caption: "Paris, France" },
		{ filename: "05_16.webp", caption: "Paris, France" },
		{ filename: "05_17.webp", caption: "Paris, France" },
		{ filename: "05_18.webp", caption: "Paris, France" },
		{ filename: "05_19.webp", caption: "Paris, France" },
		{ filename: "05_20.webp", caption: "Paris, France" },
		{ filename: "05_21.webp", caption: "Paris, France" },
		{ filename: "05_22.webp", caption: "Alhambra, Granada, Spain." },
		{ filename: "05_23.webp", caption: "Jaen, Spain." },
	];

	const photos = photoCollections.map(({ filename, caption }, index) => ({
		src: `resources/photos/${filename}`,
		number: index + 1,
		caption,
		alt: caption
	}));
	const featuredPhotos = [photos[5], photos[7], photos[8], photos[29], photos[34]].filter(Boolean);
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
				<div class="photo-feature__label">${photo.caption}</div>
			</div>
		`).join("");
		photoStatus.textContent = `01 / ${String(featuredPhotos.length).padStart(2, "0")}`;
	};

	const renderGallery = () => {
		gallery.innerHTML = photos.map((photo) => `
			<figure class="photo-card">
				${photoButton(photo, "photo-card__button").outerHTML}
				<figcaption>${photo.caption}</figcaption>
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
