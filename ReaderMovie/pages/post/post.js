// 接收 post-data 文件里的数据， require 脚本的时候只能写相对路径是
// var postData = require('/data/post-data.js') 
var postData = require('../../data/post-data.js')



Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 小程序总是会读取 data 对象来做数据绑定，这个动作我们称为动作 A
    // 而这个动作 A 的执行，是在 onLoad 事件之后发生的

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
       posts_key:postData.postList
       
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  /**
   * 点击新闻条目
   */
  onPostItemTap: function(event){
    var postId = event.currentTarget.dataset.postitemid;
    console.log("postId=" + postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+ postId,
    })
  },

// currentTarget 和 target 
// target 指的是当前点击的组件
// currentTarget 指的是事件最终捕获的组件
// 在这个函数里，target 指的是 image，而 currentTarget 指的是 swiper
  // SwiperTap
  onSwiperTap:function(event){
    var postId = event.target.dataset.postitemid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
  // SwiperImgTap
  onSwiperImgTap:function(event){
    var postId = event.currentTarget.dataset.postitemid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }
})