import { minLength } from 'vuelidate/lib/validators'

const hasLowerCase = value => /[a-z]/.test(value)
const hasUpperCase = value => /[A-Z]/.test(value)
const hasDigit = value => /[0-9]/.test(value)
const hasSpecialCharacter = value => /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(value)

export default value => {
  const isValid =
    minLength(8)(value) &&
    (hasLowerCase(value) || hasUpperCase(value)) &&
    hasDigit(value) &&
    hasSpecialCharacter(value)
  return isValid
}

// these are used to run the tests
// 'description': { password, isvalid }
export const passwords = {
  'too short': {
    password: '5oR!',
    isValid: false
  },
  'missing lower case': {
    password: 'M1551NG_LOWER_CASE',
    isValid: true
  },
  'missing upper case': {
    password: 'm!ssing_upp3r_case',
    isValid: true
  },
  'missing letter': {
    password: '^^1$$1^& [3]]3&',
    isValid: false
  },
  'missing digit': {
    password: 'Miss!ng-D!g!t',
    isValid: false
  },
  'missing special character': {
    password: 'M1551ngSpecialCaracter',
    isValid: false
  },
  correct: {
    password: 'Corr3ct!',
    isValid: true
  }
}
