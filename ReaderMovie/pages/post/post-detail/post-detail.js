var postsData = require("../../../data/post-data.js");
// 获取小程序实例
var app = getApp();
Page({

  data: {
    isPlayingMusic: false
  },

  onLoad: function (option) {    
    // 从上个界面跳转的时候传递的 id
    var postId = option.id;
    this.data.currentPostId = postId;
    var postItemData = postsData.postList[postId];
    // 如果在 onload 方法中，不是异步的去执行一个数据绑定，则
    // 不需要 使用 this.setData 方法，只需要对 this.setData 赋值即可实现数据绑定
    // this.data.postData 中的 postData 相当于 在 data 中创建了个变量

    // 以下这两种方式,第一种方式已失效
    // this.data.postData = postItemData;
    this.setData({
      postData: postItemData
    })

    var postsCollected = wx.getStorageSync("posts_collected")

    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected)
    }

    // 判断正在播放 和 判断音乐是否是当前列表的音乐
    // 三个等号是必须类型一致。两个等号 会强制转换类型
    // "==" 只要求值相等; "===" 要求值和类型都相等
    if (app.gloableData.g_isPlayingMusic && 
      app.gloableData.g_currentMusicPostId === postId){
        // this.data.isPlayingMusic = true; // 失效了
        this.setData({
          isPlayingMusic : true
        })
    }
    this.setMusicMonitor();

  },

  /**监听事件**/
  setMusicMonitor:function(){
    var that = this;
    // 监听音乐播放
    wx.onBackgroundAudioPlay(function () {
      console.log("音乐开始播放了");
      that.setData({
        isPlayingMusic: true
      })
      // 监听到变化，就相应的去改变系统 app 中存储的状态
      app.gloableData.g_isPlayingMusic = true;
      // 音乐播放，设置存储对应播放的 postId
      app.gloableData.g_currentMusicPostId = that.data.currentPostId;
      
    })

    // 监听音乐暂停
    wx.onBackgroundAudioPause(function () {
      console.log("音乐暂停了");
      that.setData({
        isPlayingMusic: false
      })
      // 监听到变化，就相应的去改变系统 app 中存储的状态
      app.gloableData.g_isPlayingMusic = false;

      app.gloableData.g_currentMusicPostId = null;
    })

    // 监听音乐停止
    wx.onBackgroundAudioStop(function () {
      console.log("音乐停止了");
    })
  },

  onColletionTap: function () {
    // 同步
    // this.getPostsCollectedSyc();
    // 异步
    this.getPostsCollectedAsy();

  },

  getPostsCollectedSyc: function () {
  },

  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
        console.log(res, that.data.currentPostId);
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId]
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postCollected, postsCollected);

      },
    })
  },

  showToast: function (postCollected, postsCollected) {
    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      // title: '收藏',
      icon: 'success',
      duration: 1000,
      // 是否显示透明蒙层，防止触摸穿透，默认：false
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // share 按钮事件
  onShareTap: function () {
    wx.showActionSheet({
      itemList: [
        "虽然小程序还不支持分享",
        "我就试试样式",
        "分享给微信好友",
        "分享到朋友圈"
      ],
    })
  },

  /**
   * 音乐的启动和暂停
   */
  onAudioTap: function () {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      // this.data.isPlayingMusic = false;
      // 用这种 setData 来通知 UI 层进行更新
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        // dataUrl、coverImgUrl 都必须使用网络地址，不能加载本地文件
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
      // this.data.isPlayingMusic = true;
    }
  }




})