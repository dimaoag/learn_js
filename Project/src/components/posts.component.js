import {Component} from '../core/component'
import {apiService} from '../services/api.service'
import {TransformService} from '../services/transform.service'

export class PostsComponent extends Component {
  constructor(id) {
    super(id)
  }

  init() {}

  async onShow() {
    const posts = TransformService.transformPosts(await apiService.getPosts())
    console.log(posts)
  }
}
