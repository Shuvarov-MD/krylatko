const spinner = document.querySelector('.loader');
let isLoad = false;

function initMap() {
  const myMapTemp = new ymaps.Map('map-yandex', {
    center: [55.16415008, 61.29303178],
    zoom: 16,
    controls: ['zoomControl']
  });

  const myPlacemarkTemp = new ymaps.Placemark([55.16415008, 61.29303178], {
    balloonContent: "Челябинск, ул. Академика Королева, 38",
  }, {
    iconLayout: 'default#imageWithContent',
    iconImageHref: './img/contacts/icon/icon-map-marker.png',
    iconImageSize: [32, 32],
    iconImageOffset: [-16, -32],
  });

  myMapTemp.geoObjects.add(myPlacemarkTemp);
  myMapTemp.behaviors.disable('scrollZoom');

  const layer = myMapTemp.layers.get(0).get(0);

  waitForTilesLoad(layer).then(() => {
    spinner.classList.remove('loader--active');
  });
}

function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise((resolve, reject) => {
    const tc = getTileContainer(layer);
    let readyAll = true;

    tc.tiles.each((tile, number) => {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });

    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", () => {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (const k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
        layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}

function loadScript(url, callback) {
  const script = document.createElement("script");
  script.onload = () => callback();
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

const ymap = () => {
  const contactsMap = document.querySelector('.contacts__map');

  contactsMap.addEventListener('mouseenter', () => {
    if (!isLoad) {
      isLoad = true;
      spinner.classList.add('loader--active');

      loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", () => {
        ymaps.load(initMap);
      });
    }
  });
};

ymap();
