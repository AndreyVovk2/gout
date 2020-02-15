const api = 'https://goout.qbitcom.tk/api/';
//CTRL+ALT+L   НЕ НАЖИМАТЬ!!!!!!!!
export const COMMON_URL = {
  auth: {
    send: api + 'code/send',
    verify: api + 'code/verify'
  },
  fcm: {
    subscribe: api + 'subscribe'
  },
  region: {
    all: api + 'region'
  },
  registration: {
    register: api + 'register'
  },
  users: {
    me: api + 'user/me',
    id: api + 'user/',
    index: api + 'profile/update',
    friends: api + 'facebook/friends',
    all: api + 'user/all'
  },
  business: {
    create: api + 'business/create',
    my: api + 'business/my',
    all: api + 'business-category',
    update: api + 'business/update',
  },
  subBusiness: {
    all: api + 'sub-business-category'
  },
  ages: {
    all: api + 'age'
  },
  lines: {
    all: api + 'line',
    create: api + 'line',
    update: api + 'line/',
  },
  staticText: {
    about: api + 'static/about',
    terms: api + 'static/terms',
  },
  post: {
    all: api + 'user/posts',
    details: api + 'post/',
    create: api + 'post',
    update: api + 'post/',
    my: api + 'post/all',
    gallery: api + 'gallery/store',
    filter: api + 'post/filter',
    postImage: api + 'gallery/store'
  },
  menu: {
    all: api + 'menu-category/get',
    create: api + 'menu-category/create',
  },
  dish: {
    all: api + 'dish/get',
    create: api + 'dish/create'
  },
  favorites: {
    add: api + 'user/favorites',
    all: api + 'user/favorites'
  },
  gallery: {

  }

};
