import './index.scss'

(function () {
	function registerEvents() {
		$('.tab li').each(function(i) { // tab 切换
			$(this).on('click', function () {
		        $('.panel').children('ul').eq(i).show().siblings('ul').hide()
		        $(this).addClass('active').siblings('li').removeClass('active')
		    })
		})
	}

	function queryRankList() {
		var search = '?openid=oCP8GxIodIIgeUmAopluv89_H6Gw&eventkey=60037&uid=2019&atype=master'
		var params = search.split('&'),
			openid = params[0].split('=')[1],
			eventkey = params[1].split('=')[1],
			uid = params[2].split('=')[1],
			atype = (params[3] && params[3].split('=')[1]);

		$.get('http://wx.xiaoliebian.com/admin/count_user', {
			openid: openid,
			eventkey: eventkey
		}, function(res) {
			if (res.code == 200) {
              initRankList(res);
            }
		})
	}

	function initRankList(res) {
		console.log(res)
		$('.avatar').attr('src', res.headimgurl); // 头像
		$('#num').text(res.num); // 人气
	    $('#diff_num').text(res.need_num);
	    $('#rank').text(res.user_cur_paiming);

	    var friends_html = ''
	    for (var i in res.hotuser) {
	    	friends_html += `
	    		<li>
					<span class="id">${res.hotuser[i].paiming}</span>
					<img src="${res.hotuser[i].headimgurl}">
					<span class="name">${res.hotuser[i].nickname}</span>
					<span>已有${res.hotuser[i].size}人气</span>
				</li>
	    	`
	    }
	    $('.panel-popular').empty().append(friends_html);
	    // $('.panel-popular').empty().append(friends_html);
	}

	queryRankList() // 请求排行列表
	registerEvents()  // 注册事件
})()