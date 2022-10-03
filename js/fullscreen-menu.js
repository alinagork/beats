class Modal {
  constructor(selector){
    this.menu = document.querySelector(selector)
  }

  open() {
    this.menu.classList.add('fullscreen-menu--opened')
  }

  close() {
    this.menu.classList.remove('fullscreen-menu--opened')
  }

  setEventListener() {
    document.addEventListener('click', (e) => {
      const targetButtonEvent = e.target.closest('[data-event]');
      if(targetButtonEvent) {
        const event = targetButtonEvent.dataset.event;
        this[event]();
      }
    })
  }
}

const menu = new Modal('#full-menu');
menu.setEventListener()

console.log(menu);