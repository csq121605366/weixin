import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';



export default () => {
    return new Vuex.Store({
        state: {

        },
        getters,
        actions,
        mutations
    })
}