const ROLES = {
  USER: 1,
  READER: 2,
  ADMIN: 3,
}
const helpers = {
  connected: true,
  allowedRoutersAccess(routerName, role = 0) {
    const routersAccess = {
      'card-deck-list': ROLES.USER,
      'deck-list': ROLES.USER,
      'users': ROLES.ADMIN,
      'card-deck-form': ROLES.READER,
      'deck-form': ROLES.READER,
    };

    if (routersAccess[routerName] && routersAccess[routerName] > role) return true;
    return false;
  },
  routerActived (name) {
    const routersIndex = {
      'card-deck-list': '1-1',
      'deck-list': '1-2',
      'users': '2-1',
      'card-deck-form': '3-1',
      'deck-form': '3-2',
    }

    return routersIndex[name] || '1-1';
  }
}

export default (context, inject) => {
  inject('helpers', helpers)
}
