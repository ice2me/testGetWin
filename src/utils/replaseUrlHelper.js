export const replaceUrlHandler = (url) => url?.replace(/ /ig, '/').split('/').slice(-3).join('/')