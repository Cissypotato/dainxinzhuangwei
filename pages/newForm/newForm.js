// pages/newForm/newForm.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        img_path:[],
        img_url:[],
        now_up:0,
        state:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(wx.getStorageSync('token')){
            wx.request({
                url: 'https://volunteer.guaishe.com/l/api.php',
                data:{
                    phone: wx.getStorageSync('token')
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {
                    console.log(res)
                    this.setData({
                        list: res.data
                    })
                },
            })

        }
       
    },
    onShow() {
        if (wx.getStorageSync('token')) {
            this.setData({ 
                state: true,
                phone: wx.getStorageSync('token')
             })
            wx.request({
                url: 'https://volunteer.guaishe.com/l/api.php',
                data: {
                    phone: wx.getStorageSync('token')
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {
                    console.log(res)
                    this.setData({
                        list: res.data
                    })
                },
            })
        }
    },
    // getInputValue(e){
    //     console.log(e)
    //     let name =e.currentTarget.dataset.name
    //     let inputData={}
    //     in
    // },
    // handleImagePreview(e) { //图片浏览
    // // console.log(1)
    //     let id = e.currentTarget.dataset.id
    //     wx.previewImage({
    //         current: this.data.img_path_id[e.target.dataset.idx],
    //         urls: this.data.img_path_id
    //     });
    // },
  
    chooseImage_1(e) { //图片选择
        console.log(e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id
        wx.chooseImage({
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            count: 1,
            success: res => {
                console.log(res)
                let img_path=this.data.img_path

                img_path[id] = res.tempFilePaths[0]
                // let t = JSON.parse(JSON.stringify(this.data.img_path));
              wx.uploadFile({
                  url: "https://volunteer.guaishe.com/l/wx_upload.php?do=pic&name=db_2",
                  filePath: res.tempFilePaths[0],
                  name: 'pic',
                  formData: {
                      phone: this.data.phone
                  },
                  success: (res) =>{
                    console.log(id)
                    console.log(res)
                      let info = JSON.parse(res.data);
                      let img_url = this.data.img_url
                    //   let image_url = this.data.image_url
                      img_url[id]=info.file
                      console.log(img_url)
                      this.setData({
                          img_url
                      })
                      
                  },
              })
                console.log(img_path)
                this.setData({
                    img_path,
                });

            }
        })
    },
    // img_up() { //图片上传
    //     let list = this.data.list
    //     let img_path = this.data.img_path
    //     console.log(img_path)
    //     let img = []
    //     for (let i = 0; i < lis.length; i++) {
    //         if (list[i].type == 3) {
    //             img.push(list[i])
    //         }
    //     }
    //     if (img_path.length < img.length) {
    //         app.alert('请上传图片')
    //     }else {
    //         wx.uploadFile({
    //             url: "https://volunteer.guaishe.com/l/wx_upload.php?do=pic&name=db_2",
    //             filePath: this.data.img_path[this.data.now_up],
    //             name: "db_" + img[this.data.now_up].id,
    //             success: (res) => {
    //                 let info = JSON.parse(res.data);
    //                 let image_url = this.data.image_url
    //                 console.log(info)
    //                 if (info.state) {
    //                     image_url.push(info.img);
    //                     console.log()
    //                     this.setData({
    //                         image_url
    //                     });
    //                 }
    //             },
    //             complete: (res) => {
    //                 let t = Number(this.data.now_up) + 1;
    //                 if (t === this.data.img_path.length) {
    //                     this.upWorkData()
    //                 } else {
    //                     this.setData({
    //                         now_up: t
    //                     });
    //                     this.img_up();
    //                 };
    //             }
    //         });
    //     }
    // },
    certifySubmit(e){
        console.log(e)
        let list=this.data.list
        let allValue=e.detail.value
        let keys = Object.keys(allValue)
        let value=[]
        console.log(keys)
        console.log(allValue)
        for( let i=0;i<keys.length;i++){
            if (!allValue[keys[i]]){
                app.alert("信息填写不完整")
            }else{
                value.push(allValue[keys[i]])
            }
        }
        // console.log(value)
        allValue["phone"]=this.data.phone
        console.log(allValue)
        if(value.length==list.length){
            // console.log(allValue["db_1"])
            // wx.showLoading({
            //     title: '',
            //     mask: true
            // })
            app.alert("提交成功")
            wx.request({
                url: 'https://volunteer.guaishe.com/l/api.php?do=db',            
                data: allValue,
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: (res)=> {
                    console.log(res)
                    
                },
                complete: function(res) {
                    setTimeout(()=>{
                        
                        wx.hideLoading()
                        wx.navigateBack({
                            delta: 1,
                        })
                    },2000)
                  
                },
            })
        }
    },
    
    toLogin(){
        wx.navigateTo({
            url: '../index/login/login',
        })
    }
    
    
    
    
})

