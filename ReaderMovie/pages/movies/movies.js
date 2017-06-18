// movies.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon:{},
    top250:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.gloableData.movieBaseUrl + "/v2/movie/in_theaters" +"?start=0&count=3";// 正在上映
    var comingSoonUrl = app.gloableData.movieBaseUrl + "/v2/movie/coming_soon" + "?start=0&count=3";// 即将上映
    var top250Url = app.gloableData.movieBaseUrl +
      "/v2/movie/top250" + "?start=0&count=3";// Top250

    this.requestMovieListData(inTheatersUrl,"inTheaters");
    this.requestMovieListData(comingSoonUrl,"comingSoon");
    this.requestMovieListData(top250Url,"top250");
  },

  /**
    * 请求豆瓣电影数据
    */
  requestMovieListData: function (url, itemDataKey) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',// 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/xml' //不能为空，不能为 application/json
      },
      success: function (res) {
        console.log(res.data);
        that.intentDoubanData(res.data, itemDataKey);
      },
      fail: function () {
        console.log("request fail")
      }
    })
  },

  intentDoubanData: function (douBanData, itemDataKey){
    // 定义空数组，作为记录处理完数据的容器
    var movies=[];
    // subjects 是豆瓣返回数据的一个数据集节点
    for (var index in douBanData.subjects) {
      var subject = douBanData.subjects[index];
      var title = subject.title;
      if(title.length >= 6){
        title = title.substring(0,6)+"...";
      }
      var temp={
        title:title,
        // subject.rating.acerage 也是数据结构下的
        coverageUrl: subject.images.large,
        moveId: subject.id,
        average: subject.rating.average// 评分
      }
      movies.push(temp);
    }
    // set data 
    // this.setData({
    //   movies:movies
    // })

    // 动态赋值
    var readyData = {};

    //目前一共有三行条目，这种形式只能满足一行条目
    // readyData[itemDataKey] = movies;

    // 这样就可满足要求了
    readyData[itemDataKey] = {
      movies: movies
    };

    this.setData(readyData);

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

  } 
 
})