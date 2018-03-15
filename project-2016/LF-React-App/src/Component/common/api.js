export function reachBottom(){
  let h = Math.max(document.documentElement.clientHeight,window.innerHeight || 0);
  // let s = document.body.scrollTop;
  let s = document.getElementsByClassName('scl-list')[0].scrollTop;
  // let total = document.body.scrollHeight;//
  let total = document.getElementsByClassName('scl-list')[0].scrollHeight;//
  return total === h + s || total === h + s + 1
}


export function url(){
  return ''
}
export function url2(){
  return 'http://t.la-feng.com:8102/upload_path/'
}
