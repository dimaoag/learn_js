export class Validators {

  static required(value = '') {
    return value && value.trim()
  }

  static min5(value = '') {
    return value.trim() && value.length >= 5
  }

}
