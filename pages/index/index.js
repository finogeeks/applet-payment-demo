// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    visible: false,
    isCopy: false,
    confirmText: '允许',
    cancelText: '取消',
    text: '小程序申请获取你的账号信息进行登录，是否允许？'
  },

  onShow() {
    if(app.isPaymentSuccess) {
      this.setData({
        visible: true,
        confirmText: '复制',
        cancelText: '',
        isCopy: true,
        text: '支付成功！文档的下载地址为：https://pan.baidu.com/s/1peko6NfAKERFf2vKOR_w-A 提取码: 2njv'
      })
      app.isPaymentSuccess = false
    }
  },

  copy() {
    wx.setClipboardData({
      data: 'https://pan.baidu.com/s/1peko6NfAKERFf2vKOR_w-A 提取码: 2njv'
    })
    this.hideConfirm()
  },

  handleLogin() {
    wx.login({
      success: (res) => {
        console.log('login success', res)
        app.isLogin = true
        this.toPayment()
        this.hideConfirm()
      },
      fail: (res) => {
        console.log('login fail', res)
        wx.showToast({
          title: res.errMsg || '调用失败',
          icon: 'none'
        })
      }
    })
  },
  toPayment() {
    if (!app.isLogin) {
      this.setData({
        visible: true
      })
    } else {
      wx.navigateTo({
        url: '/pages/payment/index',
      })

    }
  },
  hideConfirm() {
    this.setData({
      visible: false,
      isCopy: false,
      confirmText: '允许',
      cancelText: '取消',
      text: '小程序申请获取你的账号信息进行登录，是否允许？'
    })
  }
})
