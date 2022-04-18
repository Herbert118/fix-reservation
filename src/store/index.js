import {createStore} from "vuex"

const state = {
    adminAuth: localStorage.getItem('adminAuth') ? localStorage.getItem('adminAuth') : '',
    userAuth:localStorage.getItem('userAuth') ? localStorage.getItem('userAuth') : '',
    userEmail:localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : ''
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
    setUserEmail(state,email){
        state.email = email
        localStorage.setItem("userEmail",email)
    }

}

export default createStore({
    state,
    mutations,

})
