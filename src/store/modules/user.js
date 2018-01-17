import { checkLogin, loginOut, login } from '@/api/api'

const user = {
  state: {
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(resData => {
          resolve(resData)
        }).catch(error => {
          reject(error)
        })
     
      })
    },

    // 获取用户信息,判断是否登录
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        checkLogin().then(resData => {
          if(resData.status == 'ok'){
            const data = resData.data;
            // console.log(resData);
            commit('SET_NAME', data.username);
          }
          resolve(resData) 
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginOut().then((resData) => {
          
          commit('SET_NAME', '')
          resolve(resData)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端判断登录状态为error，自己登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_NAME', '');
        resolve()
      })
    }
  }
}

export default user
