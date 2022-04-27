import {createStore} from "vuex"

const state = {
    adminAuth: localStorage.getItem('adminAuth') ? localStorage.getItem('adminAuth') : '',
    userAuth:localStorage.getItem('userAuth') ? localStorage.getItem('userAuth') : '',
    userInfo:JSON.parse(localStorage.getItem('userInfos') ? localStorage.getItem('userInfos') : '{}')
    //userInfo:{}

}


const mutations = {
    setAdminAuth(state,authToken){
        state.adminAuth = authToken
        localStorage.setItem('adminAuth', authToken)
    },
    setUserAuth(state,authToken){
        state.userAuth = authToken
        localStorage.setItem("userAuth",authToken)
    },
    setUserInfo(state,userInfo){
        state.userInfo = userInfo
        localStorage.setItem("userInfos",JSON.stringify(userInfo))
    }

}

export default createStore({
    state,
    mutations,

})
