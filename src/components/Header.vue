<template>
  <section :class="'hero is-small is-bold '+$globals.class_hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <img src="../assets/Twitter_bird_icon.png" width="100px" alt="Twitter Logo">
        <h1 class="title">{{title}}</h1>
        <h2 class="subtitle">{{message}}</h2>
      </div>
    </div>
    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container has-text-centered">
          <ul class="is-responsive">
            <li class="is-active">
              <div class="control has-icons-left">
                <div class="select is-small is-rounded">
                  <select v-model="$globals.order">
                    <option v-for="order of orders">{{order}}</option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i class="fas fa-sort-alpha-up"></i>
                </span>
              </div>
            </li>
            <li>
              <div class="control has-icons-left">
                <div class="select is-small is-rounded">
                  <select v-model="$globals.time_range">
                    <option v-for="time_range of time_ranges">{{time_range}}</option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i class="fas fa-clock"></i>
                </span>
              </div>
            </li>
            <li>
              <div class="control has-icons-left">
                <div class="select is-small is-rounded">
                  <select v-model="$globals.tweet_number">
                    <option v-for="tweet_number of tweet_numbers">{{tweet_number}}</option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i class="fas fa-file"></i>
                </span>
              </div>
            </li>
            <li>
              <div class="control has-icons-left">
                <div class="select is-small is-rounded">
                  <select v-model="$globals.pallete">
                    <option v-for="pallete of palletes">{{pallete}}</option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i class="fas fa-palette"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
  // Import the globalState variable
  import { globalState } from "../main.js";

  export default {
    name: "Header",
    data() {
      return {
        message:
          "Last 30 tweets from @MakeSchool, @newsycombinator and @ycombinator",
        title: "Twitter API",
        palletes: ["Primary", "Info", "Light", "Dark", "Warning", "Danger"],
        time_ranges: [
          "All Time",
          "Last Day",
          "Last Week",
          "Last Month",
          "Last Year"
        ],
        orders: [
          "A - B - C",
          "A - C - B",
          "B - A - C",
          "B - C - A",
          "C - A - B",
          "C - B - A"
        ],
        tweet_numbers: ["90", "80", "60", "40", "20", "5"]
      };
    },
    // Load variables values from the localStorage
    mounted() {
      if (localStorage.pallete) {
        globalState.pallete = localStorage.pallete;
      }
      if (localStorage.time_range) {
        globalState.time_range = localStorage.time_range;
      }
      if (localStorage.order) {
        globalState.order = localStorage.order;
      }
      if (localStorage.tweet_number) {
        globalState.tweet_number = localStorage.tweet_number;
      }
    }
  };
</script>

