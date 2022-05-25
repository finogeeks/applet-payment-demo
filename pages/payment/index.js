// pages/payment/index.js
const app = getApp()
Page({
  data: {
    visible: false,
    text: '',
    current: '',
    btnText: '',
    phone: ''
  },
  onLoad() {
    const time = new Date()
    this.setData({
      current: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
    })
    wx.getUserProfile({
      success: ({ userInfo = {}}) => {
        this.setData({
          phone: userInfo.userId || userInfo.phone || '13861639538'
        })
      }
    })
  },
  close() {
    if (this.data.text.startsWith('支付成功')) {
      wx.setClipboardData({
        data: 'https://pan.baidu.com/s/1peko6NfAKERFf2vKOR_w-A 提取码: 2njv'
      }) 
      wx.navigateBack()
    }
    this.setData({
      visible: false,
      text: '',
      btnText: '',
    })
  },
  payment() {
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    wx.requestPayment({
      timeStamp: 'test',
      nonceStr: 'test',
      package: 'test',
      signType: 'test',
      paySign: 'test',
      success: (res) => {
        console.log('payment success', res)
        wx.hideLoading()
        app.isPaymentSuccess = true
        wx.navigateBack()
      },
      fail: (res) => {
        console.log('payment fail', res)
        this.setData({
          visible: true,
          btnText: '',
          text: '支付失败！请您重新操作。'
        })
        wx.hideLoading()
      }
    })
  }
})
