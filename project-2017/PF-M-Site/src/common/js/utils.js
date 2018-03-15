export const myDOM = {
    hasClass (el, className) {
        let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
        return reg.test(el.className)
    },
    addClass (el, className) {
        if (this.hasClass(el, className)) {
            return
        }
        let newClass = el.className.split(' ')
        newClass.push(className)
        el.className = newClass.join(' ')
    },
    getQueryStr (name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
        let hash = window.location.hash.split('?')[1]
        let r = hash && hash.match(reg)
        if (r != null) return unescape(r[2])
        return null
    }
}
