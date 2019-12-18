// pages/formList/formList.js
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        state:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let phone=wx.getStorageSync("token")
        if(phone){
            wx.request({
                url: 'https://volunteer.guaishe.com/l/api.php?do=get_list',
                data: {
                    phone
                },
                method: "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {

                    // console.log(res)
                    this.setData({
                        list: res.data.db,
                        page: res.data.page,
                        phone
                    })


                },
            })
        }
  
    },
    onShow(){
        console.log(wx.getStorageSync('token'))
        if(wx.getStorageSync('token')){
            this.setData({state:true})
        }
    },
    toDetail(e){
        let id=e.currentTarget.dataset.id
        console.log(id)
        wx.navigateTo({
            url: './detail/detail?id='+id,
        })
    },

    lower: function (e) {//分页下拉刷新
       console.log(1)
        console.log(e)
        let current_page = this.data.page.current_page
        console.log(this.data.page)
        let last_page = this.data.page.last_page
        let id = this.data.id
        if (current_page < last_page) {
            wx.showLoading({
                title: '加载中',
            })
            wx.request({
                url: 'https://volunteer.guaishe.com/l/api.php?do=get_list',
                data:{
                    p: Number(current_page) + 1,
                    phone:this.data.phone
                },
                method:"POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {
                    console.log(res)
                    let data1 = this.data.list
                    let list = data1.concat(res.data.db)
                    this.setData({
                        list,
                        page: res.data.page
                    })
                    wx.nextTick(() => {
                        wx.hideLoading();
                    });
                },
            })
        } else {
            app.alert("没有更多数据了")
        }
    },
    toLogin() {
        wx.navigateTo({
            url: '../index/login/login',
        })
    },
    
})