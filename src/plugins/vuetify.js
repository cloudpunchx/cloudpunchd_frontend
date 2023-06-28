import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                // background is dark blue
                background: "#001219", 
                // primary is red
                primary: '#DD1C1A',
                // secondary is yellow
                secondary: '#ffd60a',
                accent: '#FFFBFE',
                error: '#b71c1c',
                yellow: '#ffd819',
            },
        },
    },
});

export default vuetify;
