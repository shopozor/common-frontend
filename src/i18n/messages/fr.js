import types from '../../types'

export default {
  shop: 'La Budzonnerie',
  store: 'magasin',
  management: 'gestion',
  welcome: 'Bienvenue',
  dialog: {
    warning: 'Attention !'
  },
  actions: {
    ok: 'Valider',
    cancel: 'Annuler',
    save: 'Enregistrer',
    close: 'Fermer'
  },
  links: {
    [types.links.SIGNUP]: 'S\'inscrire',
    [types.links.LOGIN]: 'Se connecter',
    [types.links.LOGOUT]: 'Se déconnecter',
    [types.links.PROFILE]: 'Profil',
    [types.links.HOME]: 'Accueil',
    [types.links.SHOP]: 'Budzonnerie',
    [types.links.MAP]: 'Carte',
    [types.links.CALENDAR]: 'Calendrier',
    [types.links.ORDERS]: 'Commandes',
    [types.links.PRODUCTS]: 'Produits',
    [types.links.MY_SHOP]: 'Ma Budzonnerie',
    [types.links.MANAGE_SHOPS]: 'Gestion des Budzonneries',
    [types.links.MANAGE_SITE]: 'Gestion du Site'
  },
  categories: {
    [types.categories.DAIRY]: 'produits laitiers',
    [types.categories.MEAT]: 'viande',
    [types.categories.FRUITS]: 'fruits',
    [types.categories.VEGETABLES]: 'légumes',
    [types.categories.GROCERY]: 'épicerie'
  },
  conservation: {
    [types.conservation.BASEMENT]: 'à la cave',
    [types.conservation.FRIDGE]: 'au frigo',
    [types.conservation.FREEZER]: 'au congélateur'
  },
  formatUI: {
    [types.formatUI.FREE]: 'description libre (texte)',
    [types.formatUI.AUTO_UNIT]: 'taille et unité (300 gr)',
    [types.formatUI.AUTO_PRICE]: 'calcul du prix automatique',
    [types.formatUI.BULK]: 'vente en vrac'
  },
  profile: {
    email: 'e-mail',
    password: 'mot de passe'
  },
  signup: {
    createAccount: 'Créer mon compte',
    email: {
      label: 'e-mail',
      hint: 'ceci sera votre nom de budzon',
      error: 'veuillez entrer un e-mail valide'
    },
    password: {
      label: 'mot de passe',
      hint: '6 caractères ou plus',
      error: 'il manque 1 caractère | il manque {count} caractères'
    },
    confirmPassword: {
      label: 'répétez votre mot de passe',
      hint: 'pour éviter les erreurs de frappe',
      error: 'les deux mots de passe sont différents'
    },
    cookiesPolicy: {
      accept: 'J\'accepte l\'utilisation de cookies.',
      explain: 'Nous utilisons des cookies uniquement pour faciliter votre navigation. Aucun cookie n\'est conservé après votre déconnection.'
    },
    termsOfService: {
      accept: 'J\'accepte les conditions d\'utilisation.',
      explain: 'Les conditions d\'utilisations lient l\'utilisateur et le propriétaire de la plateforme de vente.'
    },
    creatingAccount: 'Veuillez patienter pendant que votre compte utilisateur est créé.',
    emailSent: 'Un email avec un lien d\'activation vous a été transmis. Cliquez sur ce lien pour finaliser la création de votre compte.',
    correctErrors: 'Veuillez corriger les erreurs.'
  },
  login: {
    stayLoggedIn: 'rester connecté',
    connect: 'se connecter',
    forgotPassword: 'J\'ai oublié mon mot de passe',
    invalidCredentials: 'Votre e-mail ou votre mot de passe est invalide.',
    userIsNotStaff: 'Vous n\'êtes pas enregistré comme administrateur.'
  },
  layout: {
    notConnected: 'non connecté'
  },
  products: {
    edit: 'éditer',
    inventory: 'inventaire',
    trash: 'corbeille',
    visible: 'Produit en vente',
    hidden: 'Produit caché',
    warningHide: 'Vous êtes sur le point de cacher un produit avec {amount} commandes en cours pour un total de {price} francs payés par les consommateurs. Vous devrez dédommager vos consommateurs si vous ne les livrez pas.',
    hide: 'Cacher',
    letVisible: 'Laisser visible',
    warningDeleteWithoutOrders: 'Vous êtes sur le point de mettre un produit à la corbeille. Il pourra être restauré pendant six mois. Passé ce délai, il sera définitvement effacé.',
    warningDeleteWithOrders: 'Vous êtes sur le point d\'effacer un produit. Ses formats seront aussi effacés. Il pourra être restauré pendant six mois, mais sera définitivement effacé par la suite. ATTENTION: Ce produit comporte {amount} commandes en cours pour un total de {price} francs payés par les consommateurs. Vous devrez dédommager vos consommateurs si vous ne les livrez pas.',
    throwAway: 'Jeter',
    keep: 'Conserver',
    ordersSummary: 'Aucune commande en cours | Une commande: {price} francs | {amount} commandes: {price} francs',
    name: 'Nom du produit',
    productDescription: 'Description du produit',
    categories: 'Catégories',
    conservationMethod: 'Méthode de conservation',
    conservationTime: 'Durée de conservation',
    day: 'jour | jour | jours',
    formatDescription: 'description',
    size: 'taille',
    unit: 'unité',
    bulk: 'Vente en vrac. Prix au ',
    formatType: 'type de conditionnement',
    consumerPays: 'le consommateur paie',
    iGet: 'je reçois',
    ordered: 'commandé | commandé | commandés',
    available: 'disponible | disponible | disponibles'
  }
}
