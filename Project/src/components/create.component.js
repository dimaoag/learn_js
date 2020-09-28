import {Component} from '../core/component'
import {Form} from '../core/form'


export class CreateComponent extends Component {
  constructor(id) {
    super(id)

    this.form = new Form(this.$el, {
      title: [
        {required: 'Поле обязательное к заполнению'},
        {min5: 'Минимальное количество символов: 5'},
      ],
      text: [
        {required: 'Поле обязательное к заполнению'},
      ],
      type: [
        {required: 'Поле обязательное к заполнению'},
      ]
    })
  }

  init() {
    this.$el.addEventListener('submit', submitHandler.bind(this))
  }
}


function submitHandler(event) {
  event.preventDefault()
  const form = this.form

  if (form.isValid()) {
    form.clear()
    form.getData()

  }
}
