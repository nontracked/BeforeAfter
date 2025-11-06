const getTemplate = (state) => {
  return `
        <div class="slider__before">
           <div class="slider__resize"></div>
        </div>
        <div class="slider__after"></div>
  `
}

class Slider {
  constructor(selector, state) {
    this.$slider = document.getElementById(selector)
    this.state = state
    this.#render(this.state)
  }

  #render(state) {
    this.$slider.innerHTML = getTemplate(state)
  }
}

