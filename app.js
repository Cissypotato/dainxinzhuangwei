//app.js
App({
    onLaunch: function() {

    },
    globalData: {
        userInfo: null,
        url: 'https://volunteer.guaishe.com'
    },
    alert(k) {//错误警告
        wx.showToast({
            title: k,
            icon: 'none',
            duration: 2000,
        })
    },
})