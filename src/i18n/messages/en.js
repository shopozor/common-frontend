import types from '../../types'

export default {
  shop: 'The Budzonnery',
  store: 'store',
  management: 'management',
  welcome: 'Welcome',
  dialog: {
    warning: 'Warning !'
  },
  actions: {
    ok: 'Ok',
    cancel: 'Cancel',
    save: 'Save'
  },
  links: {
    [types.links.SIGNUP]: 'Signup',
    [types.links.LOGIN]: 'Login',
    [types.links.LOGOUT]: 'Logout',
    [types.links.PROFILE]: 'Profile',

    [types.links.HOME]: 'Home',
    [types.links.SHOP]: 'Budzonnery',
    [types.links.MAP]: 'Map',
    [types.links.CALENDAR]: 'Calendar',
    [types.links.ORDERS]: 'Orders',
    [types.links.PRODUCTS]: 'Products',
    [types.links.MY_SHOP]: 'My Budzonnery',
    [types.links.MANAGE_SHOPS]: 'Budzonneries Management',
    [types.links.MANAGE_SITE]: 'Website Management'
  },
  categories: {
    [types.categories.DAIRY]: 'dairy products',
    [types.categories.MEAT]: 'meat',
    [types.categories.FRUITS]: 'fruits',
    [types.categories.VEGETABLES]: 'vegetables',
    [types.categories.GROCERY]: 'grocery'
  },
  conservation: {
    [types.conservation.BASEMENT]: 'in the basement',
    [types.conservation.FRIDGE]: 'in the fridge',
    [types.conservation.FREEZER]: 'in the freezer'
  },
  profile: {
    email: 'e-mail',
    password: 'password'
  },
  signup: {
    createAccount: 'Create my account',
    email: {
      label: 'e-mail',
      hint: 'this will be your budzon name',
      error: 'please enter a valid e-mail'
    },
    password: {
      label: 'mot de passe',
      hint: '6 or more characters',
      error: '1 character missing | {count} characters missing'
    },
    confirmPassword: {
      label: 'repeat your password',
      hint: 'to avoid typos',
      error: 'the passwords do not match'
    },
    correctErrors: 'Please correct the errors.'
  },
  login: {
    stayLoggedIn: 'stay logged in',
    connect: 'login',
    forgotPassword: 'I forgot my password',
    invalidCredentials: 'Your e-mail or password is invalid.',
    userIsNotStaff: 'You are not recognized as a producer.'
  },
  layout: {
    notConnected: 'not connected'
  },
  products: {
    edit: 'edit',
    inventory: 'inventory',
    trash: 'trash',
    visible: 'Product at sale',
    hidden: 'Hidden product',
    warningHide: 'You are about to hide a product with {amount} pending orders for a total of {price} francs paid by consumers. You will have to refund your consumers if you do not deliver them.',
    hide: 'Hide',
    letVisible: 'Let visible',
    warningDeleteWithoutOrders: 'You are about to erase a product. Its formats will be lost as well. You will be able to restore it for six months. After that it will be permanently deleted.',
    warningDeleteWithOrders: 'You are about to erase a product. Its formats will be lost as well. You will be able to restore it for six months. After that it will be permanently deleted. WARNING: this product has {amount} pending orders for a total of {price} francs paid by consumers. You will have to refund your consumers if you do not deliver them.',
    throwAway: 'Throw away',
    keep: 'Keep',
    ordersSummary: 'No pending orders | One pending order: {price} francs | {amount} pending orders: {price} francs',
    name: 'Product name',
    description: 'product description',
    categories: 'categories',
    conservationMethod: 'Conservation method',
    conservationTime: 'Conservation duration',
    day: 'day | days'
  }
}
