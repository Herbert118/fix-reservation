import {createStore} from "vuex"

const state = {
    adminAuth: localStorage.getItem('adminAuth') ? localStorage.getItem('adminAuth') : '',
    userAuth:localStorage.getItem('userAuth') ? localStorage.getItem('userAuth') : ''
}


const mutations = {
    setAdminAuth(state,authToken){
        state.adminAuth = authToken;
        localStorage.setItem('adminAuth', authToken);
    },
    setUserAuth(state,authToken){
        state.userAuth = authToken;
        localStorage.setItem("userAuth",authToken);
    }

}

export default createStore({
    state,
    mutations,

})
