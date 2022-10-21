const findBlockbyAlias = alias => {
  return $(".reviews__item").filter((ndex, item) => {
    return $(item).attr("data-linked-with") === alias
  });
}; 

$(".interactive-avatar__link").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockbyAlias(target);
  const currentItem = $this.closest(".interactive-avatar");

  itemToShow.addClass("active").siblings().removeClass("active");
  currentItem.addClass("active").siblings().removeClass("active");
});