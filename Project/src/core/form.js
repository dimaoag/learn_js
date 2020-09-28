import {Validators} from './validators'

export class Form {
  constructor(form, controls) {
    this.form = form
    this.controls = controls
    this.error = null
  }

  getData() {
    const data = {}

    Object.keys(this.controls).forEach(control => {
      data[control] = this.form[control].value
    })

    return data
  }

  isValid() {
    this.clearErrors()
    let isValid = true

    Object.keys(this.controls).forEach(control => {
      this.controls[control].forEach(rule => {
        if (! Validators[rule](this.form[control].value)) {
          isValid = false
          setError(this.form[control])
        }
      })
    })

    return isValid
  }

  clearErrors() {
    Object.keys(this.controls).forEach(control => {
      this.removeError(this.form[control])
    })
  }

  removeError(field){
    if (field.classList.contains('invalid')) {
      field.classList.remove('invalid')
    }

    Array.from(field.parentNode.getElementsByClassName('validation-error')).forEach(elem => elem.remove())
  }
}

function setError(field){
  field.classList.add('invalid')
  const error = '<p class="validation-error"> Input correctly data! </p>'
  field.insertAdjacentHTML('afterend', error)
}
