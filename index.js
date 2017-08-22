function createEl (tagName, className, container) {
  const el = window.document.createElement(tagName)
  if (className) el.className = className
  if (container) container.appendChild(el)
  return el
}

function Toggle (el, contents) {
  if (!(this instanceof Toggle)) return new Toggle(el, contents)
  this._map = null // mapbox-gl Map
  this._mapContainer = null // HTMLElement
  this._className = 'mapboxgl-ctrl' // string
  this._contents = contents || 'i' // string
  this._container = null // HTMLelement
  this._controlButton = null // HTMLElement
  this.toggle = this.toggle.bind(this)
  this.show = this.show.bind(this)
  this.hide = this.hide.bind(this)
  this.isOpen = this.isOpen.bind(this)
  this._el = (typeof el === 'function') ? el(this.toggle) : el
}

Toggle.prototype.onAdd = function (map) {
  this._map = map
  this._mapContainer = this._map.getContainer()
  this._container = createEl('div', `${this._className} mapboxgl-ctrl-group`)
  const button = this._toggleButton = createEl('button', (`${this._className}-icon ${this._className}-toggle`), this._container)
  button.setAttribute('aria-label', 'Toggle')
  button.innerHTML = this._contents
  button.type = 'button'
  this._toggleButton.addEventListener('click', this.toggle)
  return this._container
}

Toggle.prototype.onRemove = function () {
  DOM.remove(this._container)
  this._map = null
}

Toggle.prototype.toggle = function () {
  if (this.isOpen()) return this.hide()
  else return this.show()
}

Toggle.prototype.hide = function () {
  this._el.style.display = 'none'
}

Toggle.prototype.show = function () {
  this._el.style.display = ''
}

Toggle.prototype.isOpen = function () {
  return !this._el.style.display === 'none'
}

module.exports = Toggle
