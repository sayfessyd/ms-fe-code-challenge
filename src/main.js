import Vue from 'vue';
import App from './App.vue';


window.onload = function () {
  new Vue({
    el: '#app',
    render: h => h(App)
  });
}

/*
  We can use Vuex to manage the global state of the application, 
  but since in this case, it's a small web application, we can just simulate that,
  by creating a global variable that is accessible by all the components.
*/
export var globalState = new Vue({
  // Global variables => Layout Settings
  data: {
    pallete: "Light",
    class_hero: "is-light",
    time_range: "All Time",
    filter: "",
    order: "A - B - C",
    tweet_number: "90",
  },
  // Update the localStorage variables
  watch: {
    pallete(newPalette) {
      localStorage.pallete = newPalette;
      globalState.class_hero = "is-" + newPalette.toLowerCase();
    },
    time_range(newTimeRange) {
      localStorage.time_range = newTimeRange;
      if (newTimeRange == "All Time") {
        globalState.filter = false;
      }
      if (newTimeRange == "Last Day") {
        let d = new Date();
        d.setDate(d.getDate() - 1);
        globalState.filter = d;
      }
      if (newTimeRange == "Last Month") {
        let d = new Date();
        d.setDate(d.getDate() - 30);
        globalState.filter = d;
      }
      if (newTimeRange == "Last Year") {
        let d = new Date();
        d.setDate(d.getDate() - 365);
        globalState.filter = d;
      }
      if (newTimeRange == "Last Week") {
        let d = new Date();
        d.setDate(d.getDate() - 7);
        globalState.filter = d;
      }
    },
    order(newOrder) {
      localStorage.order = newOrder;
    },
    tweet_number(newTweetNumber) {
      localStorage.tweet_number = newTweetNumber;
    }
  }
})

// Make it accessible from templates
Vue.prototype.$globals = globalState
