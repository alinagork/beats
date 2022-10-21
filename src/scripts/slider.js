const slider = $(".products__list").bxSlider({
  pager: false,
  controls: false
});

$(".products__slide-arrow--left").click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$(".products__slide-arrow--right").click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});