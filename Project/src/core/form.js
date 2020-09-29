import {Validators} from './validators'
const dateFormat = require('dateformat')

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
    data['date'] = dateFormat(new Date(), "yyyy-mm-dd' 'HH:MM:ss")

    return data
  }

  clear(){
    Object.keys(this.controls).forEach(control => {
      this.form[control].value = ''
    })
  }

  isValid() {
    this.clearErrors()
    let isValid = true

    Object.keys(this.controls).forEach(control => {
      this.controls[control].forEach((rule) => {
        for (let key in rule) {
          if (! Validators[key](this.form[control].value)) {
            isValid = false
            setError(this.form[control], rule[key])
          }
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

function setError(field, error){
  field.classList.add('invalid')
  const errorElem = `<p class="validation-error"> ${error} </p>`
  field.insertAdjacentHTML('afterend', errorElem)
}
