import { unitsDefinitions } from './UnitsDefinitions'

// export const mass = {
//   GR: 'gr',
//   DAG: '10gr',
//   HG: '100gr',
//   KG: 'kg'
// }

// export const volume = {
//   ML: 'ml',
//   CL: 'cl',
//   DL: 'dl',
//   L: 'lt'
// }

// export const number = {
//   PIECE: 'piece'
// }

export default Object.keys(unitsDefinitions).reduce((physicalSizes, physicalSize) => {
  physicalSizes[physicalSize] = Object.keys(unitsDefinitions[physicalSize]).reduce((units, unit) => {
    units[unit] = unitsDefinitions[physicalSize][unit].short
    return units
  }, {})
  return physicalSizes
}, {})
