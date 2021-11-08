import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
           customProperties: true
           },
        light: true,
        dark:false,
        themes: {
          light: {
            primary: '#0095c8',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#F44336',
            oscuro:'#fff'
          },
         
        },

      },
});
