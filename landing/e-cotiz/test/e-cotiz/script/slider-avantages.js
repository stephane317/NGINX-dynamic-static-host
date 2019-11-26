class Slider {

  /**
  * @param {HTMLElement} element
  * @param {Object} options
  * @param {Object} [options.slidesToScroll=1] nbr elements a faire defiler
  * @param {Object} [options.slidesVisible=1] nbr elements visibles dans un slide
  * @param {boolean} [options.loop=false] doit on boucler en fin de slider
  * @param {boolean} [options.infinite=false]
  * @param {boolean} [options.navigation=true]
  * @param {boolean} [options.pagination=false]
  */
  constructor (element, options = {}) {
    this.element = element
    this.options = Object.assign({}, {
      slidesToScroll : 1,
      slidesVisible : 1,
      loop: false,
      infinite: false,
      navigation: true,
      pagination: false
    }, options)
    if (this.options.loop && this.options.infinite) {
      throw new Error ('Impossible d\'utiliser le loop et le infinite en même temps !')
    }
    let children = [].slice.call(element.children)
    this.isMobile = false
    this.currentItem = 0
    this.moveCallbacks = []
    this.offset = 0

    // Modification du DOM
    this.root = this.createDivWithClass('slider')
    this.container = this.createDivWithClass('slider__container')
    this.root.setAttribute('tabindex', '0')
    this.root.appendChild(this.container)
    this.element.appendChild(this.root)
    this.items = children.map((child) => {
      let item = this.createDivWithClass('slider__item')
      item.appendChild(child)
      return item
    })
    if (this.options.infinite) {
      this.offset = this.options.slidesVisible + this.options.slidesToScroll
      if (this.offset > children.length) {
        console.error("Vous n'avez pas assez d'éléments dans le slider", element);
      }
      this.items = [
        ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)),
        ...this.items,
        ...this.items.slice(0, this.offset).map(item => item.cloneNode(true)),
      ]
      this.gotoItem(this.offset, false)
    }
    this.items.forEach(item => this.container.appendChild(item))
    this.setStyle()
    if (this.options.navigation) {
      this.createNavigation()
    }
    if (this.options.pagination) {
      this.createPagination()
    }



    // Événements
    this.moveCallbacks.forEach(cb => cb(this.currentItem))
    this.onWindowResize ()
    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.root.addEventListener('keyup', e => {
      if (e.key === 'ArrowRight' || e.key === 'Right') {
        this.next()
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        this.prev()
      }
    })
    if (this.options.infinite){
    this.container.addEventListener('transitionend', this.resetInfinite.bind(this))
  }
  }

  /**
  * applique les bonnes dimensions aux elements du slider
  */
  setStyle () {
    let ratio = this.items.length / this.slidesVisible
    this.container.style.width = (ratio * 100) + "%"
    this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
  }

  createNavigation () {
    let nextButton = this.createDivWithClass('slider__next')
    let prevButton = this.createDivWithClass('slider__prev')
    this.root.appendChild(nextButton)
    this.root.appendChild(prevButton)
    nextButton.addEventListener('click', this.next.bind(this))
    prevButton.addEventListener('click', this.prev.bind(this))
    if (this.options.loop === true) {
      return
    }
    this.onMove(index => {
      if (index === 0) {
        prevButton.classList.add('slider__prev--hidden')
      } else {
        prevButton.classList.remove('slider__prev--hidden')
      }
      if (this.items[this.currentItem + this.slidesVisible] === undefined) {
        nextButton.classList.add('slider__next--hidden')
      } else {
        nextButton.classList.remove('slider__next--hidden')
      }
    })
  }

  createPagination () {
    let pagination = this.createDivWithClass('slider__pagination')
    let buttons = []
    this.root.appendChild(pagination)
    for (let i = 0; i < (this.items.length - 2 * this.offset); i = i + this.options.slidesToScroll) {
      let button = this.createDivWithClass('slider__pagination__button')
      button.addEventListener('click', () => this.gotoItem(i + this.offset))
      pagination.appendChild(button)
      buttons.push(button)
    }
    this.onMove(index => {
      let count = this.items.length - 2 * this.offset
      let activeButton = buttons[Math.floor(((index - this.offset) % count) / this.options.slidesToScroll)]
      if (activeButton) {
        buttons.forEach(button => button.classList.remove('slider__pagination__button--active'))
        activeButton.classList.add('slider__pagination__button--active')
      }
    })
  }

  next () {
    this.gotoItem(this.currentItem + this.slidesToScroll)
  }

  prev () {
    this.gotoItem(this.currentItem - this.slidesToScroll)
  }

  /**
  * deplace le carousel vers element ciblé
  * @param {number} index
  * @param {boolean} [animation = true]
  */
  gotoItem (index, animation = true) {
    if (index < 0) {
      if (this.options.loop) {
        index = this.items.length - this.slidesVisible
      } else {
        return
      }
    } else if (index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)) {
      if (this.options.loop) {
        index = 0
      } else {
        return
      }
    }
    let translateX = index * -100 / this.items.length
    if (animation === false) {
      this.container.style.transition = 'none'
    }
    this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
    this.container.offsetHeight //force le repaint
    if (animation === false) {
      this.container.style.transition = ''
    }
    this.currentItem = index
    this.moveCallbacks.forEach(cb => cb(index))
  }

  /**
   * Déplace le container pour donner impression de slide infini
   */
  resetInfinite () {
    if (this.currentItem <= this.options.slidesToScroll) {
      this.gotoItem(this.currentItem + (this.items.length - 2 * this.offset), false)
    } else if (this.currentItem >= this.items.length - this.offset) {
      this.gotoItem(this.currentItem - (this.items.length - 2 * this.offset), false)
    }
  }

  onMove (cb) {
    this.moveCallbacks.push(cb)
  }

  onWindowResize () {
    let mobile = window.innerWidth < 576
    if (mobile !== this.isMobile) {
      this.isMobile = mobile
      this.setStyle()
      this.moveCallbacks.forEach(cb => cb (this.currentItem))
    }
  }

  /**
  * @param {string} className
  * @returns {HTMLElement}
  */
  createDivWithClass (className) {
    let div = document.createElement('div')
    div.setAttribute('class', className)
    return div
  }

  /**
   *@returns {number}
   */
  get slidesToScroll () {
    return this.isMobile ? 1 : this.options.slidesToScroll
  }

  /**
   *@returns {number}
   */
  get slidesVisible () {
    return this.isMobile ? 1 : this.options.slidesVisible
  }

}


new Slider(document.querySelector('#slider3'), {
  slidesToScroll: 1,
  slidesVisible: 7,
  infinite: true
})
