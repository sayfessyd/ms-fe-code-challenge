<template>
  <table
    class="table is-striped is-narrow is-hoverable is-responsive is-fullwidth"
    v-if="tweets && tweets.length">
    <thead>
      <tr>
        <!-- first place A, B, C -->
        <th v-show="$globals.order=='A - B - C' || $globals.order=='A - C - B'">
          A | Content
          <a @click="changeOrder(1,2)">
            <i class="fas fa-arrow-right"></i>
          </a>
        </th>
        <th v-show="$globals.order=='B - A - C' || $globals.order=='B - C - A'">
          B | Date
          <a @click="changeOrder(1,2)">
            <i class="fas fa-arrow-right"></i>
          </a>
        </th>
        <th v-show="$globals.order=='C - A - B' || $globals.order=='C - B - A'">
          C | Link
          <a @click="changeOrder(1,2)">
            <i class="fas fa-arrow-right"></i>
          </a>
        </th>
        <!-- second place A, B, C -->
        <th v-show="$globals.order=='B - A - C' || $globals.order=='C - A - B'">
          <a @click="changeOrder(1,2)">
            <i class="fas fa-arrow-left"></i>
          </a>
          A | Content
          <a @click="changeOrder(2,3)">
            <i class="fas fa-arrow-right"></i>
          </a>
        </th>
        <th v-show="$globals.order=='A - B - C' || $globals.order=='C - B - A'">
          <a @click="changeOrder(1,2)">
            <i class="fas fa-arrow-left"></i>
          </a>
          B | Date
          <a @click="changeOrder(2,3)">
            <i class="fas fa-arrow-right"></i>
          </a>
        </th>
        <th v-show="$globals.order=='A - C - B' || $globals.order=='B - C - A'">
          <a @click="changeOrder(1,2)">
            <i class="fas fa-arrow-left"></i>
          </a>
          C | Link
          <a @click="changeOrder(2,3)">
            <i class="fas fa-arrow-right"></i>
          </a>
        </th>
        <!-- third place A, B, C -->
        <th v-show="$globals.order=='C - B - A' || $globals.order=='B - C - A'">
          <a @click="changeOrder(3,2)">
            <i class="fas fa-arrow-left"></i>
          </a>
          A | Content
        </th>
        <th v-show="$globals.order=='A - C - B' || $globals.order=='C - A - B'">
          <a @click="changeOrder(3,2)">
            <i class="fas fa-arrow-left"></i>
          </a>
          B | Date
        </th>
        <th v-show="$globals.order=='B - A - C' || $globals.order=='A - B - C'">
          <a @click="changeOrder(3,2)">
            <i class="fas fa-arrow-left"></i>
          </a>
          C | Link
        </th>
        <th>Retweet</th>
        <th>Mentions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tweet of tweetsFilter">
        <!-- first place A, B, C -->
        <td v-if="$globals.order=='A - B - C' || $globals.order=='A - C - B'">{{tweet.text}}</td>
        <td v-if="$globals.order=='B - A - C' || $globals.order=='B - C - A'">{{formatDate(tweet.created_at)}}</td>
        <td v-if="$globals.order=='C - A - B' || $globals.order=='C - B - A'">
          <a :href="'https://twitter.com/statuses/'+tweet.id_str">View this tweet</a>
        </td>
        <!-- second place A, B, C-->
        <td v-if="$globals.order=='B - A - C' || $globals.order=='C - A - B'">{{tweet.text}}</td>
        <td v-if="$globals.order=='A - B - C' || $globals.order=='C - B - A'">{{formatDate(tweet.created_at)}}</td>
        <td v-if="$globals.order=='A - C - B' || $globals.order=='B - C - A'">
          <a :href="'https://twitter.com/statuses/'+tweet.id_str">View this tweet</a>
        </td>
        <!-- third place A, B, C-->
        <td v-if="$globals.order=='B - C - A' || $globals.order=='C - B - A'">{{tweet.text}}</td>
        <td v-if="$globals.order=='A - C - B' || $globals.order=='C - A - B'">{{formatDate(tweet.created_at)}}</td>
        <td v-if="$globals.order=='A - B - C' || $globals.order=='B - A - C'">
          <a :href="'https://twitter.com/statuses/'+tweet.id_str">View this tweet</a>
        </td>
        <td>
          <a
            v-if="tweet.retweeted_status"
            :href="'https://twitter.com/'+tweet.retweeted_status.user.screen_name"
          >@{{tweet.retweeted_status.user.screen_name}}</a>
        </td>
        <td>
          <a
            v-for="mention of tweet.entities.user_mentions"
            :href="'https://twitter.com/'+mention.screen_name"
          > @{{mention.screen_name}}</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import axios from "../../HTTP.js";
  import moment from "moment";
  var _ = require("lodash");
  // Import the globalState variable
  import { globalState } from "../main.js";

  export default {
    name: "Table",
    data() {
      return {
        tweets: [],
        errors: []
      };
    },
    computed: {
      // Apply latout settings (filters) on the list
      tweetsFilter: function() {
        var n;
        if (Number.isInteger(Number(globalState.tweet_number))) {
          n = Number(globalState.tweet_number);
        }
        return _(this.tweets)
          .filter(function(tweet) {
            let date = tweet.created_at.split(" ");
            let time = date[3].split(":");
            let month = moment()
              .month(date[1])
              .format("M");
            let created_at = new Date(
              date[5],
              month - 1,
              date[2],
              time[0],
              time[1],
              time[2]
            );
            return created_at > globalState.filter;
          })
          .take(n)
          .value();
      }
    },
    methods: {
      // Make a well-formatted created_at date
      formatDate(created_at) {
        let date = created_at.split(" ");
        let time = date[3].split(":");
        let month = moment()
          .month(date[1])
          .format("M");
        return moment([
          date[5],
          month - 1,
          date[2],
          time[0],
          time[1],
          time[2]
        ]).format("dddd, MMMM Do YYYY, h:mm:ss a");
      },
      changeOrder(index1,index2) {
        let array = globalState.order.split(" - ");
        let temp = array[index2-1];
        array[index2-1] = array[index1-1];
        array[index1-1] = temp;
        globalState.order = array.join(" - ");
      }
    },
    // Fetch all the tweets
    created() {
      axios
        .get(
          `http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=makeschool`
        )
        .then(response => {
          this.tweets = this.tweets.concat(response.data);
        })
        .catch(e => {
          this.errors.push(e);
        });
      axios
        .get(
          `http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=newsycombinator`
        )
        .then(response => {
          this.tweets = this.tweets.concat(response.data);
        })
        .catch(e => {
          this.errors.push(e);
        });
      axios
        .get(
          `http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=ycombinator`
        )
        .then(response => {
          this.tweets = this.tweets.concat(response.data);
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  };
</script>
