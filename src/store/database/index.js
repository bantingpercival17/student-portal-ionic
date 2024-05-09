import {
  INITIALIZE_DATABASE,
  CREATE_TABLE,
  SET_DATABASE
} from '@/store/storeDatabaseConstants.js'
import {
  alertController
} from '@ionic/vue';
export default {
  name: 'database',
  namespaced: true,
  state: {
    database: null
  },
  mutations: {
    [SET_DATABASE](state, database) {

    }
  },
  actions: {
    async [INITIALLIZE_DATABASE]({commit}) {
      try {
        const database = await sqlite.createConnection("bma_reviewer", false, "no-encryption");
        await database.open();
        commit('setDatabase', database);
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    }
  }
}