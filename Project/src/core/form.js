import {Validators} from './validators'

export class Form {
  constructor(formElement, controls) {
    this.formElement = formElement
    this.controls = controls
  }

  getData() {
    const data = {}

    Object.keys(this.controls).forEach(control => {
      data[control] = this.formElement[control].value
    })

    return data
  }

  isValid() {
    let isValid = true
    Object.keys(this.controls).forEach(control => {
      this.controls[control].forEach(rule => {
        isValid = Validators[rule](this.formElement[control].value) && isValid
      })
    })
    return isValid
  }





}
