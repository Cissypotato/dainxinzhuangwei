// pages/index/login/login.js
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.login({
            success: (res) => {
                console.log(res.code)
                this.setData({
                    code: res.code
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    bindgetphonenumber(e) {
        console.log(e)
        if (e.detail.errMsg == "getPhoneNumber:ok") {
            wx.request({
                url: 'https://volunteer.guaishe.com/index.php/index/user/create_user1',
                data: {
                    code: this.data.code,
                    iv: e.detail.iv,
                    encryptedData: e.detail.encryptedData,
                },
                success: (res) => {
                    let token=res.data.token
                    wx.request({
                        url: 'https://volunteer.guaishe.com/l/api.php?do=login',
                        data: {
                            phone: res.data.token
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: (res) => {
                            console.log(res)
                            let state = res.data.state
                            if (state == 0) {
                                app.alert(res.txt)
                                wx.navigateBack({
                                    delta: 1,
                                })
                            }else if(state==1){
                                app.alert("登录成功")
                                wx.setStorageSync("token", token)
                                wx.navigateBack({
                                    delta: 1,
                                })
                                
                            }
                        },

                    })
                    // wx.showToast({
                    //     title: '登录成功',
                    //     icon: 'none',
                    //     duration: 1000,
                    // })


                },
                fail: function(res) {
                    wx.showToast({
                        title: '请求失败请稍后再试',
                        icon: 'none',
                        duration: 1000,
                    })
                },
            })
        } else {
            wx.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 1000,
            })
        }
    },
})