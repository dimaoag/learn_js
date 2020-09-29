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

  init() {}

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

  const button = `<button class="button-round button-small button-primary">Сохранить</button>`

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
