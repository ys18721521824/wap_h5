
var www = 'https://utm.shiseido.com.cn'

//loading
var time1 = 0;
var setI = setInterval(function () {
 
  time1 += Math.round(Math.random() * 10);
  if (time1 >= 100) {
    clearInterval(setI)
    $(".loading p").html("100%");
    $('.loading').fadeOut();
  } else {
    $(".loading p").html(Math.floor(time1) + "%");
  }
}, 100);
//城市列表
var cityList = {};
$.get(www + "/getCounterList", function (res) {
  console.log(res)
  if (res.errorCode == 0) {
    $('#city').html('<option value="">请选择城市</option>')
    for (var i = 0; i < res.data.length; i++) {
      $('#city').append('<option value="' + res.data[i].city + '">' + res.data[i].city + '</option>')
      cityList[res.data[i].city] = res.data[i].counter_name
    }
    $('#bar').html('<option value="">请选择专柜</option>')
  }
});
$('#city').on('change', function () {
  $('#bar').html('<option value="">请选择店铺</option>')
  for (var i = 0; i < cityList[$('#city').val()].length; i++) {
    $('#bar').append('<option value="' + cityList[$('#city').val()][i] + '">' + cityList[$('#city').val()][i] + '</option>')
  }
})

$('.pull').click(function () {
  _smq.push(['custom', 'UTM Family', 'P2', '下滑P3']);
  swiper.slideNext();
})
/*活动规则*/
$('.rule').click(function () {
  _smq.push(['custom', 'UTM Family', 'P4', '活动规则']);
  $(".bad").show();
})
/*返回键*/
$('.add').click(function () {
  _smq.push(['custom', 'UTM Family', 'P5', '返回']);
  $(".bad").hide();
})


//勾选协议
var x1 = false;
$('.xieyi1').click(function () {
  $(this).toggleClass('bg');
  x1 ? x1 = false : x1 = true
  console.log(x1)
})


//点击获取验证码
var cid = '';
var codeSwitch = false;
$('.codeBtn').on('click', function () {
  if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test($('.mobile').val())) {
    alert('请正确填写手机号')
    return false
  }
  if (codeSwitch) {
    return false
  } codeSwitch = true
  var That = this
  var codeI = 60
  var codeMax = 1
  var codeSetI = setInterval(function () {
    $(That).html(codeI)
    codeI--
    if (codeMax > codeI) {
      $(That).html('重新获取')
      codeSwitch = false
      clearInterval(codeSetI)
    }
  }, 1000)
  $.ajax({
    url: www + '/sendModelCode',
    type: 'post',
    data: { mobile: $('.mobile').val() },
    success: function (result) {
      console.log(result)
      if (result.errorCode !== 0) {
        alert(result.errorMsg)
        $(That).html('重新获取')
        codeSwitch = false
        clearInterval(codeSetI)
        return false
      } else {
        cid = result.cid
      }
    },
    error: function () {
      alert('网络异常,请从新提交或刷新再试')
    }
  })
})

var fromGo = false;
//表单提交
$('.submit').on('click', function () {
  if (cid == '') {
    alert('请发送验证码')
    return false
  }
  if ($('.name').val() == '') {
    alert('请输入姓名')
    return false
  }
  if (
    !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
      $('.mobile').val()
    )
  ) {
    alert('请正确填写手机号')
    return false
  }
  if ($('codeBtn').val() == '') {
    alert('请输入验证码')
    return false
  }
  if ($('.city').val() == '') {
    alert('请选择城市')
    return false
  }

  if (!x1) {
    alert('请认真阅读隐私政策与用户协议');
    return false;
  }

  if (fromGo) {
    return false
  }
  fromGo = true
  $.ajax({
    url: www + '/submitFormData',
    data: {
      mobile: $('.mobile').val(),
      name: $('.name').val(),
      code: $('.pasword').val(),
      city: $('#city').val(),
      counter_name: $('#bar').val(),
      cid: cid
    },
    type: 'post',
    success: function (result) {
      _smq.push(['custom', 'UTM Family', 'P4', '一键申领']);
      console.log(result)
      if (result.errorCode === 0) {
        $(".success").show();
        fromGo2 = false
      } else {
        alert(result.errorMsg)
        fromGo2 = false
        return false
      }
    },
    error: function () {
      fromGo2 = false
      alert('网络异常,请从新提交或刷新再试')
    }
  })
})

/*用户协议*/
$('.link1').click(function () {
  $(".picter").show();
});
$('.close1').click(function () {
  $(".picter").hide();
});
/*申领成功*/

$('.close').click(function () {
  _smq.push(['custom', 'UTM Family', 'P6', '关闭']);
  $(".success").hide();
});
/*返回首页*/
$('.back').click(function () {
  _smq.push(['custom', 'UTM Family', 'P6', '返回首页']);
  location.reload()
  // return false;
 
});
var is_noUp = true;
$('input,select').on("blur", function (e) {
  var t, l;
  if (document.documentElement && document.documentElement.scrollTop) {
    t = document.documentElement.scrollTop;
    l = document.documentElement.scrollLeft;
  } else if (document.body) {
    t = document.body.scrollTop;
    l = document.body.scrollLeft;
  }
  is_noUp = true;
  setTimeout(function () {
    if (is_noUp) {
      window.scrollTo(t, l);
    }
  }, 200)
});


$('input,select').focus(function () {
  var t, l;
  if (document.documentElement && document.documentElement.scrollTop) {
    t = document.documentElement.scrollTop;
    l = document.documentElement.scrollLeft;
  } else if (document.body) {
    t = document.body.scrollTop;
    l = document.body.scrollLeft;
  }
  if (t != 0) {
    //alert(t); 
  }
  is_noUp = false;
})

// var music = document.getElementById('music');

// document.addEventListener("WeixinJSBridgeReady", function () {
//   music.play();
//   music.pause();
// })

