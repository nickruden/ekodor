document.addEventListener("DOMContentLoaded", () => {
  let mainSwiper;
  let thumbsSwiper;

  const switchButtons = document.querySelectorAll(
    ".product-gallery__switch-btn"
  );
  const gallery = document.querySelector(".product-gallery");

  function initSwipers(type) {
    const mainSlides = gallery.querySelectorAll(
      ".product-gallery__main-slider .swiper-slide, .product-gallery__main-slider [data-type]"
    );
    const thumbSlides = gallery.querySelectorAll(
      ".product-gallery__thumb-slider .swiper-slide, .product-gallery__thumb-slider [data-type]"
    );

    // Удаляем Swiper, если уже создан
    if (mainSwiper) mainSwiper.destroy(true, true);
    if (thumbsSwiper) thumbsSwiper.destroy(true, true);

    // Переключаем классы swiper-slide
    mainSlides.forEach((slide) => {
      if (slide.dataset.type === type) {
        slide.classList.add("swiper-slide");
        slide.style.display = "block";
      } else {
        slide.classList.remove("swiper-slide");
        slide.style.display = "none";
      }
    });

    thumbSlides.forEach((slide) => {
      if (slide.dataset.type === type) {
        slide.classList.add("swiper-slide");
        slide.style.display = "block";
      } else {
        slide.classList.remove("swiper-slide");
        slide.style.display = "none";
      }
    });

    // Переинициализация Swiper'ов
    thumbsSwiper = new Swiper(".product-gallery__thumb-slider .swiper", {
      slidesPerView: 5,
      spaceBetween: 7,
      watchSlidesProgress: true,
      allowTouchMove: true,
    });

    mainSwiper = new Swiper(".product-gallery__main-slider .swiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      autoHeight: true,
      allowTouchMove: true,
      navigation: {
        nextEl: ".product-gallery__main-slider .swiper-btn-next",
        prevEl: ".product-gallery__main-slider .swiper-btn-prev",
      },
      pagination: {
        el: ".product-gallery__main-slider .swiper-pagination",
        clickable: true,
      },
      thumbs: { swiper: thumbsSwiper },
    });
  }

  // Смена типа (фото / видео)
  switchButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const type = btn.dataset.activeType;
      initSwipers(type);
    });
  });

  // Инициализация при загрузке
  initSwipers("image");

  Fancybox.bind(".product-gallery [data-fancybox]", {
    Carousel: {
      Thumbs: {
        type: "classic",
        autoStart: true,
      },
      Toolbar: {
        display: {
          left: ["counter"],
          middle: [],
          right: ["close"],
        },
      },
    },
  });
});
