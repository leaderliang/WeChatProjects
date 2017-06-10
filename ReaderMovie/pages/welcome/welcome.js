// page P 是大写首字母
Page({

  onStartTap: function () {
    // :function 可以省略不写
    // wx.navigateTo 这种方式跳转的界面是不销毁当前界面的，还可以返回
    // wx.navigateTo({
    //   url: '../post/post'
    // })

    // wx:redirectTo 这种方式跳转的界面，会销毁当前 welcome 界面
    // wx.redirectTo({
    //   url: '../post/post'
    // })

    wx.redirectTo({
      url: '../post/post',
      success: function () {
        console.log("navigateTo success")
      },
      fail: function () {
        console.log("navigateTo fail")
      },
      complete: function () {
        console.log("navigateTo complete")
      }
    })
  },
  // 类似于 onFinish
  onUnload: function () {
    console.log(" onUnload")
  }, 
  // 类似于 onPause
  onHide: function(){
    console.log(" onHide")
  }



})