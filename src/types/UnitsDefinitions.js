export const unitsDefinitions = {
  mass: {
    GR: {
      short: 'gr',
      name: 'grammes',
      weight: 1
    },
    DAG: {
      short: '10gr',
      name: 'décagrammes',
      weight: 10,
      onlyPriceReferenceQuantity: true
    },
    HG: {
      short: '100gr',
      name: 'hectogrammes',
      weight: 100,
      onlyPriceReferenceQuantity: true
    },
    KG: {
      short: 'kg',
      name: 'kilogrammes',
      weight: 1000
    }
  },
  volume: {
    ML: {
      short: 'ml',
      name: 'millilitres',
      weight: 1
    },
    CL: {
      short: 'cl',
      name: 'centilitres',
      weight: 10
    },
    DL: {
      short: 'dl',
      name: 'décilitres',
      weight: 100
    },
    L: {
      short: 'lt',
      name: 'litres',
      weight: 1000
    }
  },
  number: {
    PIECE: {
      short: 'piece',
      name: 'pièce',
      weight: 1
    }
  }
}

export const physicalSizesRank = {
  mass: 0,
  volume: 1,
  number: 2
}
