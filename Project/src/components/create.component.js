import {Component} from '../core/component'
import {Form} from '../core/form'


export class CreateComponent extends Component {
  constructor(id) {
    super(id)

    this.form = new Form(this.$el, {
      title: ['required'],
      text: ['required'],
      type: ['required']
    })
  }

  init() {
    this.$el.addEventListener('submit', submitHandler.bind(this))
  }
}


function submitHandler(event) {
  event.preventDefault()

  if (this.form.isValid()) {
    console.log('ok')
  }
}
