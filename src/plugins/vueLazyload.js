import Vue from 'vue'

import VueLazyload from 'vue-lazyload'
import error from '@/assets/images/error.gif'
import loading from '@/assets/images/loading.jpg'
Vue.use(VueLazyload, {
    error: error,
    loading: loading,
})