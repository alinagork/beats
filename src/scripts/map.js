let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.751047, 37.599679],
    zoom: 14,
    controls: []
  });

  const coords = [
    [55.759797, 37.580333],
    [55.754981, 37.624434],
    [55.749981, 37.604605],
    [55.743530, 37.581991]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "./icons/marker.png",
    iconImageSize: [58, 73],
    iconImageOffset: [-35, -52]
  })

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  })
  
    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);