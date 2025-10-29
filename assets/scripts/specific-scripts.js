// == ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА "ЗАВЕРШЁННЫЕ ОТГРУЗКИ" ==
const endShipmentsSwiper = new Swiper(".end-shipments .swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".end-shipments .swiper-nav .swiper-btn-next",
    prevEl: ".end-shipments .swiper-nav .swiper-btn-prev",
  },
  pagination: {
    el: ".end-shipments .swiper-pagination",
  },
  breakpoints: {
    700: {
      spaceBetween: 20,
      slidesPerView: 2,
    },
    992: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    1401: {
      spaceBetween: 40,
      slidesPerView: 3,
    },
  },
});

// == ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА "ОТЗЫВЫ" ==
const reviewsSwiper = new Swiper(".reviews .swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  initialSlide: 1,
  navigation: {
    nextEl: ".reviews .swiper-nav .swiper-btn-next",
    prevEl: ".reviews .swiper-nav .swiper-btn-prev",
  },
  pagination: {
    el: ".reviews .swiper-pagination",
  },
  breakpoints: {
    769: {
      slidesPerView: 2,
    },
    1199: {
      slidesPerView: 3,
    },
  },
});

// == СКРИПТ ГАЛЕРЕИИ В ОТЗЫВАХ ==
document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll(".reviews__slide-galery");

  galleries.forEach((gallery) => {
    const links = gallery.querySelectorAll("a:not(.more)");
    console.log(links);
    const more = gallery.querySelector(".more");

    // если изображений меньше или равно 2 — скрывать ничего не нужно
    if (links.length <= 2) {
      if (more) more.remove();
      return;
    }

    // посчитать, сколько нужно спрятать
    const hiddenCount = links.length - 2;

    // скрыть все после второй
    links.forEach((link, index) => {
      if (index > 1) link.style.display = "none";
    });

    // добавить число в overlay
    if (more) {
      const overlay = more.querySelector(".overlay");
      if (overlay) overlay.textContent = `+${hiddenCount}`;
    }
  });
});

// == ИНИЦИАЛИЗАЦИЯ БЛОКА С ВОПРОСАМИ ==
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".quiz .swiper-slide");
  const quizSwiper = new Swiper(".quiz .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoHeight: true,
    allowTouchMove: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 400,
    pagination: {
      el: ".quiz .swiper-pagination",
      clickable: false,
      renderBullet: function (index, className) {
        return '<span class="' + className + ' bullet-step"></span>';
      },
    },
    navigation: {
      nextEl: ".quiz .swiper-btn-next",
      prevEl: ".quiz .swiper-btn-prev",
    },
    on: {
      init: function () {
        updateFractionPagination(this);
      },
      slideChange: function () {
        updateFractionPagination(this);
        handleFinalStep(this);
      },
    },
  });

  function updateFractionPagination(swiper) {
    const current = swiper.realIndex + 1;
    const total = swiper.slides.length;
    const fractionEl = document.querySelector(
      ".quiz .swiper-number-pagination"
    );
    if (fractionEl) {
      fractionEl.innerHTML = `Вопрос <span>${current}</span> / <span>${total}</span>`;
    }
  }

  // обработка точек пагинации
  let lastIndex = quizSwiper.activeIndex;
  quizSwiper.on("slideChange", function () {
    const bullets = document.querySelectorAll(
      ".swiper-pagination .bullet-step"
    );

    if (this.activeIndex > lastIndex) {
      bullets[this.activeIndex - 1].classList.add("passed");
    } else if (this.activeIndex < lastIndex) {
      bullets[lastIndex].classList.remove("passed");
    }

    lastIndex = this.activeIndex;
  });

  document.querySelector(".swiper-btn-next").addEventListener("click", () => {
    handleFinalStep(quizSwiper);
  });

  // функция для финального шага
  function handleFinalStep(swiper) {
    if (swiper.activeIndex === slides.length - 1) {
      document.querySelector(".quiz__control-btns").style.display = "none";
      document.querySelector(".quiz .swiper-number-pagination").style.display =
        "none";
      document.querySelector(".quiz__title").classList.add("hidden");
      document.querySelector(".quiz__final-title").classList.add("active");
      document.querySelector(".quiz__final-step").classList.add("active");
      swiper.allowTouchMove = false;
    }
  }
});

// == СКРИПТ КАРТЫ НА ГЛАВНОЙ ==
document.addEventListener("DOMContentLoaded", () => {
  // ВОТ ТУТ ВВОДИТЕ СВОИ ДАННЫЕ ЗАВОДОВ
  const factories = [
    {
      name: "Высота 239",
      description:
        "Производит строительное и промышленное оборудование, металлоконструкции и технологии.",
      coords: [55.1599, 61.4026], // Челябинск
      image: "https://ekodor.vercel.app/assets/images/reviews/img-1.jpg",
    },
    {
      name: "Завод Станкомаш",
      description:
        "Крупная электростанция региона, поставляет энергию в промышленные кластеры.",
      coords: [54.0838, 61.5773], // Троицк
      image: "https://ekodor.vercel.app/assets/images/reviews/img-1.jpg",
    },
    {
      name: "Троицкая ГРЭС",
      description:
        "Производство компрессоров, пневмосистем и воздушных установок.",
      coords: [55.184, 61.364], // Челябинск
      image: "https://via.placeholder.com/250x150?text=Компрессорный+завод",
    },
    {
      name: "ЧГРЭС “Фортум”",
      description:
        "Выпускает сталь, сплавы и прокат для машиностроения и строительства.",
      coords: [56.8389, 60.6057], // Екатеринбург
      image: "https://via.placeholder.com/250x150?text=Уральский+меткомбинат",
    },
    {
      name: "Бизнес холл “Бовид”",
      description:
        "Производит химические реагенты, полимеры и лакокрасочную продукцию.",
      coords: [55.7963, 49.1088], // Казань
      image: "https://via.placeholder.com/250x150?text=Казанский+химзавод",
    },
    {
      name: "Челябинский компрессорный завод",
      description:
        "Специализируется на выпуске электродвигателей и автоматических систем управления.",
      coords: [55.0084, 82.9357], // Новосибирск
      image:
        "https://via.placeholder.com/250x150?text=Новосибирский+электромех",
    },
    {
      name: "ТРК “Космос”",
      description:
        "Проектирует и строит морские суда, катера и промышленные баржи.",
      coords: [59.9343, 30.3351], // Санкт-Петербург
      image: "https://via.placeholder.com/250x150?text=СПб+судостроение",
    },
    {
      name: "“Увелка”",
      description:
        "Производит высокоточные приборы и измерительные системы для промышленности.",
      coords: [55.7558, 37.6173], // Москва
      image: "https://via.placeholder.com/250x150?text=Московский+приборзавод",
    },
    {
      name: "ЖК “Башня свободы”",
      description: "Производит сельхозтехнику, запчасти и промышленные станки.",
      coords: [56.2965, 43.9361], // Нижний Новгород
      image: "https://via.placeholder.com/250x150?text=Нижегородский+машзавод",
    },
    {
      name: "Клубный поселок “Твоя привелегия”",
      description:
        "Один из крупнейших производителей топлива и смазочных материалов в регионе.",
      coords: [48.708, 44.5133], // Волгоград
      image: "https://via.placeholder.com/250x150?text=Волгоградский+НПЗ",
    },
    {
      name: "ЖК “Белый Хутор”",
      description:
        "Сборка авиационных узлов и производство комплектующих для гражданской авиации.",
      coords: [53.1959, 50.1007], // Самара
      image: "https://via.placeholder.com/250x150?text=Самарский+авиазавод",
    },
    {
      name: "Хабаровский судоремонтный завод",
      description:
        "Проводит техническое обслуживание и ремонт морских судов и барж.",
      coords: [48.4802, 135.0719], // Хабаровск
      image: "https://via.placeholder.com/250x150?text=Хабаровский+судоремонт",
    },
    {
      name: "Хабаровский судоремонтный завод",
      description:
        "Проводит техническое обслуживание и ремонт морских судов и барж.",
      coords: [48.4802, 135.0719], // Хабаровск
      image: "https://via.placeholder.com/250x150?text=Хабаровский+судоремонт",
    },
  ];

  // Контейнер карты
  const mapContainer = document.querySelector(".our-factories .map-wrap");

  if (!mapContainer) return;

  mapContainer.innerHTML = '<div id="yandex-map"></div>';

  ymaps.ready(() => {
    const map = new ymaps.Map("yandex-map", {
      center: [55.1599, 61.4026],
      zoom: 7,
      controls: ["zoomControl"],
    });

    map.behaviors.enable(["scrollZoom", "drag"]);

    const listContainer = document.querySelector(
      ".our-factories__factory-items"
    );
    const placemarks = [];

    const defaultIcon = {
      iconLayout: "default#image",
      iconImageHref:
        "data:image/svg+xml;utf8,<svg width='32' height='32' xmlns='http://www.w3.org/2000/svg'><circle cx='16' cy='16' r='16' fill='white'/><path d='M15.9997 7.66675C12.3239 7.66675 9.33308 10.6576 9.33308 14.3292C9.30891 19.7001 15.7464 24.1534 15.9997 24.3334C15.9997 24.3334 22.6906 19.7001 22.6664 14.3334C22.6664 10.6576 19.6756 7.66675 15.9997 7.66675ZM15.9997 17.6667C14.1581 17.6667 12.6664 16.1751 12.6664 14.3334C12.6664 12.4917 14.1581 11.0001 15.9997 11.0001C17.8414 11.0001 19.3331 12.4917 19.3331 14.3334C19.3331 16.1751 17.8414 17.6667 15.9997 17.6667Z' fill='%23E74F10'/></svg>",
      iconImageSize: [32, 32],
      iconImageOffset: [-16, -32],
    };

    const activeIcon = {
      iconLayout: "default#image",
      iconImageHref:
        "data:image/svg+xml;utf8,<svg width='32' height='32' xmlns='http://www.w3.org/2000/svg'><circle cx='16' cy='16' r='16' fill='%23E74F10'/><path d='M15.9997 7.66675C12.3239 7.66675 9.33308 10.6576 9.33308 14.3292C9.30891 19.7001 15.7464 24.1534 15.9997 24.3334C15.9997 24.3334 22.6906 19.7001 22.6664 14.3334C22.6664 10.6576 19.6756 7.66675 15.9997 7.66675ZM15.9997 17.6667C14.1581 17.6667 12.6664 16.1751 12.6664 14.3334C12.6664 12.4917 14.1581 11.0001 15.9997 11.0001C17.8414 11.0001 19.3331 12.4917 19.3331 14.3334C19.3331 16.1751 17.8414 17.6667 15.9997 17.6667Z' fill='white'/></svg>",
      iconImageSize: [32, 32],
      iconImageOffset: [-16, -32],
    };

    factories.forEach((factory) => {
      const item = document.createElement("div");
      item.className = "our-factories__factory";
      item.textContent = factory.name;
      listContainer.appendChild(item);

      const placemark = new ymaps.Placemark(
        factory.coords,
        {
          balloonContent: `
            <div class="factory-balloon" style="max-width:250px">
              <img src="${factory.image}" alt="${factory.name}" class="factory-balloon__img" style="width:100%;border-radius:6px;">
              <div class="factory-balloon__info" style="padding-top:8px;">
                <div class="factory-balloon__title" style="font-weight:600;margin-bottom:4px;">${factory.name}</div>
                <div class="factory-balloon__desc" style="font-size:14px;line-height:1.4;">${factory.description}</div>
              </div>
            </div>
          `,
        },
        {
          ...defaultIcon,
          balloonShadow: false,
          hideIconOnBalloonOpen: false,
          balloonCloseButton: true,
          balloonAutoPan: true,
          balloonOffset: [40, -30],
        }
      );

      placemark.events.add("balloonopen", () => {
        map.panTo(factory.coords, {
          delay: 0,
          flying: true,
        });
      });

      map.geoObjects.add(placemark);
      placemarks.push({ item, placemark });

      item.addEventListener("click", () => {
        placemarks.forEach(({ item, placemark }) => {
          item.classList.remove("active");
          placemark.options.set(defaultIcon);
        });

        item.classList.add("active");
        placemark.options.set(activeIcon);

        const coords = factory.coords.slice(); // копируем координаты
        if (window.innerWidth > 1560) {
          coords[1] -= 0.03; // сдвигаем по долготе влево
        }

        map.setCenter(coords, 7, { duration: 300 });
        placemark.balloon.open();
      });

      placemark.events.add("click", () => {
        placemarks.forEach(({ item, placemark }) => {
          item.classList.remove("active");
          placemark.options.set(defaultIcon);
        });
        item.classList.add("active");
        placemark.options.set(activeIcon);
      });

      const regionInput = document.querySelector('input[name="mapArea"]');
      console.log(regionInput);

      // Список регионов и их координаты
      const regions = {
        moscow: [55.7558, 37.6173],
        spb: [59.9343, 30.3351],
        rostovnadony: [56.8389, 60.6057],
        samara: [53.1959, 50.1007],
      };

      regionInput.addEventListener("change", () => {
        const val = regionInput.value.trim().toLowerCase();
        console.log(regionInput);

        if (regions[val]) {
          const coords = regions[val];
          map.setCenter(coords, 8, { duration: 300 });

          // Находим все заводы в выбранном регионе
          const found = factories.filter((f) => {
            const [lat, lon] = f.coords;
            return (
              Math.abs(lat - coords[0]) < 1 && Math.abs(lon - coords[1]) < 1
            );
          });

          // Если нашли заводы — открываем первый
          if (found.length > 0) {
            const f = found[0];
            const match = placemarks.find(
              (p) =>
                p.placemark.geometry.getCoordinates().toString() ===
                f.coords.toString()
            );
            if (match) {
              match.placemark.balloon.open();
              placemarks.forEach(({ item, placemark }) => {
                item.classList.remove("active");
                placemark.options.set(defaultIcon);
              });
              match.item.classList.add("active");
              match.placemark.options.set(activeIcon);
            }
          }
        }
      });
    });
  });
});
