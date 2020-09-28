import {Component} from '../core/component'
import {CreateComponent} from './create.component'
import {PostsComponent} from './posts.component'
import {FavoriteComponent} from './favorite.component'

export class NavigationComponent extends Component {
  constructor(id) {
    super(id)
  }

  init() {
    this.initTabs()
    this.setTab('create')
    this.$el.addEventListener('click', tabClickHandler.bind(this))
  }

  initTabs() {
    this.tabs = new Map ([
      ['create', new CreateComponent('create')],
      ['posts', new PostsComponent('posts')],
      ['favorite', new FavoriteComponent('favorite')],
    ])
  }

  setTab(tabName) {
    this.hideTabs()
    this.activateTab(tabName)
  }

  hideTabs() {
    Array.from(this.$el.querySelectorAll('.tab')).forEach(tab => {
      tab.classList.remove('active')
    })

    this.tabs.forEach((tab, key) => {
      tab.hide()
    })
  }

  activateTab(tabName) {
    Array.from(this.$el.querySelectorAll('.tab')).forEach(tab => {
      tab.classList.remove('active')
      if (tab.dataset.name === tabName){
        tab.classList.add('active')
      }
    })

    this.tabs.get(tabName).show()
  }
}

function tabClickHandler(event) {
  event.preventDefault()
  if (event.target.classList.contains('tab')) {
    this.setTab(event.target.dataset.name)
  }
}

