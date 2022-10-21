const measureWidth = item => {
  let reqItemWidth = 0;

  const screenWidth = $(window).width();
  const container = item.closest(".menu-accordeon");
  const titlesBlocks = container.find(".menu-accordeon__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".menu-accordeon__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 530;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }
};

const closeEveryItemInContainer = container => {
  const items = container.find(".menu-accordeon__item");
  const content = container.find(".menu-accordeon__content")

  items.removeClass("active");
  content.width(0);
}

let open = item => {
  const hiddenContent = item.find(".menu-accordeon__content");
  const requiredWidth = measureWidth(item);
  const textBlock = item.find(".menu-accordeon__container");

  item.addClass("active");
  hiddenContent.width(requiredWidth.container);
  textBlock.width(requiredWidth.textContainer);
};

$(".menu-accordeon__header").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".menu-accordeon__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".menu-accordeon")

  if (itemOpened) {
    closeEveryItemInContainer(container)
  } else {
    closeEveryItemInContainer(container)
    open(item);
  }
});