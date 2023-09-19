import { reactive } from 'vue'
import { Add } from './models/Add.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {import('./models/Post.js').Post[]}*/
  posts: [],

  /**@type {Profile} */
  profile: null,

  /**@type {Add} */
  adds: [],

  newerUrl: null,
  olderUrl: null
})
