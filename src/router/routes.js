// import Home from '@/views/Home'
// import Category from '@/views/Category'
// import Cart from '@/views/Cart'
// import Mine from '@/views/Mine'
// import Tabbar from '@/components/Tabbar'
// import Login from '@/views/Login'
// import PandaHeader from '@/components/PandaHeader'
// import SubCategories from '@/components/SubCategories'
// import List from '@/views/List'
// import Detail from '@/views/Detail'
// import OrderConfirmation from '@/views/OrderConfirmation'

const Home = () => import('@/views/Home')
const Category = () => import('@/views/Category')
const Cart = () => import('@/views/Cart')
const Mine = () => import('@/views/Mine')
const Login = () => import('@/views/Login')
const List = () => import('@/views/List')
const Detail = () => import('@/views/Detail')
const OrderConfirmation = () => import('@/views/OrderConfirmation')
const Tabbar = () => import('@/components/Tabbar')
const PandaHeader = () => import('@/components/PandaHeader')
const SubCategories = () => import('@/components/SubCategories')

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: {}
  },
  {
    path: '/home',
    // component: Home
    components: {
      default: Home, // default 为未命名的 <router-view />
      appHeader: PandaHeader,
      appFooter: Tabbar // appFooter 为命名的 <router-view name="appFooter" />
    },
    meta: { // 携带的额外数据
      isNav: true, // 是否为 tabbar 的导航
      title: '首页', // 标题
      icon: '&#xe613;' // 图标
    }
  },
  {
    path: '/category',
    // component: Category
    components: {
      default: Category,
      appHeader: PandaHeader,
      appFooter: Tabbar
    },
    meta: { // 携带的额外数据
      isNav: true, // 是否为 tabbar 的导航
      title: '分类', // 标题
      icon: '&#xe618;' // 图标
    },
    children: [ // 嵌套路由，子路由
      {
        path: 'subcategory/:suibianqu',
        name: 'subcategory',
        component: SubCategories,
        meta: {
          title: '子分类'
        }
      }
    ]
  },
  {
    path: '/list/:url',
    name: 'list',
    components: {
      default: List,
      appHeader: PandaHeader
    },
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    components: {
      default: Detail,
      appHeader: PandaHeader
    },
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    components: {
      appHeader: PandaHeader,
      default: Cart
    },
    meta: { // 携带的额外数据
      isNav: true, // 是否为 tabbar 的导航
      title: '购物车', // 标题
      icon: '&#xe63d;' // 图标
    }
  },
  {
    path: '/mine',
    name: 'mine',
    // component: Mine
    components: {
      default: Mine,
      appFooter: Tabbar
    },
    meta: { // 携带的额外数据
      isNav: true, // 是否为 tabbar 的导航
      title: '我的', // 标题
      icon: '&#xe61c;' // 图标
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: Login,
      appHeader: PandaHeader
    },
    meta: {
      title: '登录'
    }
  },
  {
    path: '/order-confirm',
    name: 'orderconfirm',
    components: {
      default: OrderConfirmation,
      appHeader: PandaHeader
    },
    meta: {
      title: '确认订单'
    }
  }
]

export default routes
