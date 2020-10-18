import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

// 实例化
const ajax = axios.create({
  baseURL: 'http://www.xiongmaoyouxuan.com/api'
})

let toast = null

// 请求拦截
ajax.interceptors.request.use(config => {
  /**
   * 异步请求数据，显示提示框
   */
  toast = Toast.loading({
    message: '加载中...',
    forbidClick: true
  })
  return config
})

// 响应拦截
ajax.interceptors.response.use(resData => {
  toast.clear() // 返回响应数据，关闭提示框

  if (resData.status === 200) {
    if (resData.data.code === 200) {
      return resData.data.data
    }
  }
  return Promise.reject(new Error('请求服务器资源失败'))
})

// 获取轮播图图像资源
export const getBanner = () => {
  return ajax.get('/tab/1?start=0')
}

// 获取分类
export const getCategories = () => {
  return ajax.get('/tabs?sa=')
}

// 获取二级分类
export const getSubcategories = pid => {
  return ajax.get(`/tab/${pid}?start=0`)
}

// 获取商品列表数据
export const getList = (url, page) => {
  let realUrl = '' // 真实访问的接口地址
  const id = url.slice(url.lastIndexOf('=') + 1) // 分类id
  const start = (page - 1) * 20 // 查询当页数据的起始索引

  if (url.startsWith('youxuan://column')) {
    realUrl = '/column'
  } else {
    realUrl = '/category'
  }
  realUrl = `${realUrl}/${id}/items?start=${start}`

  return ajax.get(realUrl).then(data => {
    return data.list || data.items.list
  })
}

// 商品详情
export const getDetail = id => {
  return ajax.get(`/detail?id=${id}`)
}

export const getYiguo = () => {
  return axios.post('https://b2capigateway.yiguo.com/api/commodityapi/Commodity/GetAllCategory', {
    Head: {
      Token: '',
      LoginToken: '',
      CityId: '312d0556-0671-4f2e-8bac-7b8873b5a03a',
      CityCode: '1',
      DistrictId: '825dbb3c-015a-4a19-a7be-a6bfe4aa0fe0',
      DeviceId: '3731692a14bc29719db26d299044df64',
      MobileOS: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36'
    },
    Body: ''
  }, {
    headers: {
      appName: '3000025'
    }
  })
}

export const getMaoyan = () => {
  return axios.get('/maoyan/ajax/comingList?ci=59&token=&limit=10&optimus_uuid=626CC460A94E11EABAA4A7C027BD69FADC5B49B5B48E45F2B97BE27A3D12777B&optimus_risk_level=71&optimus_code=10')
}

// ........

// 等价于
// const getBanner = () => {}
// export { getBanner }
