import { duration } from 'moment'

function UnsupportedDurationUnit(message) {
  this.message = message
}

const frToEnDurationUnit = fr => {
  if (fr.match(/^jours?$/)) {
    return 'day'
  } else if (fr.match(/^semaines?$/)) {
    return 'week'
  } else if (fr.match(/^mois$/)) {
    return 'month'
  } else if (fr.match(/^heures?$/)) {
    return 'hour'
  } else if (fr.match(/^minutes?$/)) {
    return fr
  } else if (fr.match(/^secondes?$/)) {
    return fr
  }
  throw UnsupportedDurationUnit(`Duration unit ${fr} not supported.`)
}

defineParameterType({
  name: 'SessionDurationType',
  regexp: new RegExp(/(\d+) (.+)/),
  transformer: (amount, unit) => {
    return duration(parseInt(amount), frToEnDurationUnit(unit))
  }
})
