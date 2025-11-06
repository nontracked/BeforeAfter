import './styles.scss'

const getTemplate = (state) => {
  return `
        <div class="slider__before" style="width: ${state.width}px; background-image: url(${state.before})">
           <div class="slider__resize"></div>
        </div>
        <div class="slider__after" style="background-image: url(${state.after})"></div>
  `
}

class Slider {
  constructor(selector, state) {
    this.slider = document.getElementById(selector)
    this.state = {
      ...state,
      width: state.width || 1024
    }
    this.render(this.state)
    this.bindEvents()
  }

  selector = {
    resize: '[data-js-resize]'
  }

  render(state) {
    this.slider.innerHTML = getTemplate(state)
  }

  update(props) {
    this.state = {
      ...this.state,
      ...props
    }
    this.render(this.state)
  }

  bindEvents() {
    this.mouseDownHandler = this.mouseDownHandler.bind(this)
    this.mouseUpHandler = this.mouseUpHandler.bind(this)
    this.moveHandler = this.moveHandler.bind(this)
    this.slider.addEventListener("mousedown", this.mouseDownHandler)
    this.slider.addEventListener("mouseup", this.mouseUpHandler)
  }

  mouseDownHandler(event) {
    if (event.target.classList.contains('slider__resize')) {
      this.slider.addEventListener('mousemove', this.moveHandler)
      this.currentClientX = event.clientX
    }
  }

  mouseUpHandler(event) {
    this.slider.removeEventListener('mousemove', this.moveHandler)
  }

  moveHandler(event) {
    let newClientX = this.currentClientX - event.clientX
    this.update({width: this.state.width - newClientX})
    this.currentClientX = event.clientX
  }
}

const slider = new Slider('slider', {
  before: '/src/assets/images/before.jpg',
  after : '/src/assets/images/after.jpg'
})