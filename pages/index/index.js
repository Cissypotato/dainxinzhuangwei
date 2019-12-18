const app = getApp()
Page({
    data: {
       state:false



    },
    onLoad: function () {
        
        //是否授权
        
        // wx.getSetting({
        //     success(res) {
        //         if (res.authSetting['scope.userInfo']) {
        //             console.log('用户已经授权');
        //         }else{
        //             console.log('没有用户授权');
        //         };
        //     }
        // })
        
        
        // wx.showLoading({
        //     title: '加载中',
        //     mask: true
        // });
        // wx.request({
        //     url: "",
        //     success: (res) => {
        //         console.log(res.data);
        //         this.setData({
        //             init_data: res.data,
        //             type: res.data.activity_cate,
        //             t1: 0,
        //             area: res.data.area,
        //             t2: 0,
        //             list: res.data.activity,
        //             tips: '',
        //         });
        //          wx.hideLoading();
        //     },
        // });  
        
    },
    onShow(){
        if(wx.getStorageSync('token')){
            this.setData({
                state:true,
                tel: wx.getStorageSync('token')
            })
        }else{
            this.setData({
                state: false
            })
        }
    },    
   toLogin(){
       wx.navigateTo({
           url: "./login/login",
       })
   },
    logout(){
        wx.clearStorageSync('token')
        this.onShow()
        wx.navigateTo({
            url: "./login/login"
        })
    },


    toform1(e){
        let id=e.currentTarget.dataset.id
        console.log(e)
        if(id==2){
            console.log(id)
            wx.navigateTo({
                url: "../newForm/newForm",
            })
        }else{
            console.log(id)
            wx.navigateTo({
                url: '../formList/formList',
            })
        }
    }
})