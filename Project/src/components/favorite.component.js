import {Component} from '../core/component'
import {apiService} from '../services/api.service'
import {LoaderComponent} from './loader.component'

export class FavoriteComponent extends Component {
  constructor(id) {
    super(id)

    this.loader = new LoaderComponent('loader')
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this))
  }

  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const html = renderList(favorites)
    this.$el.insertAdjacentHTML('afterbegin', html)
  }

  onHide() {
    this.$el.innerHTML = ''
  }


}

function renderList(list = []){
  if (list.length){
    return `
      <ul>
        ${list.map(item => `<li><a href="#" class="js-link">${item.title}</a></li>`).join(' ')}
      </ul>
    `
  }

  return`<p class="align-center">Пусто</p>`
}

async function linkClickHandler(event){
  event.preventDefault()

  if (event.target.classList.contains('js-link')){
    const id = event.target.textContent
    this.loader.show()
    const post = await apiService.getPostById(id)
    this.loader.hide()
  }

}
