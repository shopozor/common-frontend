import { minLength, maxLength } from 'vuelidate/lib/validators'

export default value => {
  const isValid =
    minLength(8)(value) &&
    maxLength(20)(value)
  return isValid
}
