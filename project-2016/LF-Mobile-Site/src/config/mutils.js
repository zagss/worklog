export const showBack = callback => {
//   console.log(11)
  document.getElementById("app").addEventListener('scroll', () => {
    showBackFun()
  })
  const showBackFun = () => {
    if (document.getElementById("app").scrollTop > 500) {
      callback(true)
    } else {
      callback(false)
    }
  }
}
