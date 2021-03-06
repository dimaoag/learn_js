import {Component} from '../core/component'
import {apiService} from '../services/api.service'
import {TransformService} from '../services/transform.service'
import {LoaderComponent} from './loader.component'
const dateFormat = require('dateformat')

export class PostsComponent extends Component {
  constructor(id) {
    super(id)

    this.loader = new LoaderComponent('loader')
  }

  init() {
    this.$el.addEventListener('click', buttonHandler.bind(this))
  }

  async onShow() {
    this.loader.show()
    const posts = TransformService.transformPosts(await apiService.getPosts())
    const html = posts.map(post => renderPost(post))
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
  }

  onHide() {
    this.$el.innerHTML = ''
  }

}

function renderPost(post){
  const tag = post.type === 'news'
    ? `<li class="tag tag-blue tag-rounded">Новость</li>`
    : `<li class="tag tag-rounded">Заметка</li>`

  const button = (JSON.parse(localStorage.getItem('favorites')) || []).filter(item => item.id === post.id).length
    ? `<button class="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}">Удалить с избранных</button>`
    : `<button class="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}">Добавить в избранные</button>`

  return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.text}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${dateFormat(post.date, 'yyyy-mm-dd')}</small>
        ${button}
      </div>
    </div>
  `
}

async function buttonHandler(event){
  const $el = event.target
  const id = $el.dataset.id
  const title = $el.dataset.title

  if (id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const exist = favorites.filter(item => item.id === id)

    if (exist.length){
      // delete post from localStorage
      $el.textContent = 'Добавить в избранные'
      $el.classList.replace('button-danger','button-primary')
      favorites = favorites.filter(item => item.id !== id)
    } else {
      // add post from localStorage
      $el.classList.replace('button-primary', 'button-danger')
      $el.textContent = 'Удалить с избранных'
      favorites.push({id, title})
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

}
