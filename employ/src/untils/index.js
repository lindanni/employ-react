export function getRedirectTo(type, header) {
    let  path
    if(type === 'dashen') {
        path = '/dashen'
    } else if (type === 'laoban') {
        path = '/laoban'
    }
    if (!header) {
        path += 'info'
    }
    return path
}