import city from './cities.json'

function transform(obj){
    var arr = [];
    for(var item in obj){
        if (obj[item].children instanceof Object) {
            var child =  transform(obj[item].children);
            var ary = {
                value: item,
                label: obj[item].name,
                children: child
            }
        } else {
            var ary = {
                value: item,
                label: obj[item].name,
                children: null
            }
        }
        arr.push(ary);
    }
    return arr;
}

export const newArray = transform(city)


export const newCityArray = function getNewArray(cityId) {
    var Gid = (cityId + '').slice(0,2) + '0000' // 获取祖父辈
    var Fid = (cityId + '').slice(0,4) + '00' // 父亲辈
    var Zid = cityId + ''
    var arr = [Gid, Fid, Zid].sort((a, b) => a - b)
    var newArray = Array.from(new Set(arr)) // 数组去重
    return newArray
}

export const saveSession = function () {
    if (!sessionStorage.length) {
		// Ask other tabs for session storage
		localStorage.setItem('getSessionStorage', Date.now())
	}
    window.addEventListener('storage', function(event) {
		console.log('storage event', event);
		if (event.key == 'getSessionStorage') {
			// Some tab asked for the sessionStorage -> send it
			localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
			localStorage.removeItem('sessionStorage')
		} else if (event.key == 'sessionStorage' && !sessionStorage.length) {
			// sessionStorage is empty -> fill it
			var data = JSON.parse(event.newValue),
						value
            if (data) {
                for (let key in data) {
				    sessionStorage.setItem(key, data[key])
			    }
            }		
		}
	})
}

