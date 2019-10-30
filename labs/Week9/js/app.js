var app = new Vue({
    el: "#app",
    mounted: function() {
        axios.get('data/tvshows.json')
        .then( (response) => {
            this.tvshows = response.data.tvshows;
        })
    },
    data: {
        tvshows: [ ]
    },
    methods: {

    }
})