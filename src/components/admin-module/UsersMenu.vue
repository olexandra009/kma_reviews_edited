<template>
  <b-container>
    <filter-form />
    <review-items />
    <b-card v-for="user in users" class="mt-1">
      <b-row>
        <b-col class="col-10">{{ user.email }}</b-col>
        <b-col class="col-2">
          <b-button @click="blockUser(user.id)" variant="outline-info">
            Block</b-button
          >
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import Vuex from "vuex";

import FilterForm from "../main-module/FilterForm.vue";
import ReviewItems from "../main-module/ReviewItems.vue";
export default {
  computed: Vuex.mapState({
    token: (state) => {
      return state.auth.token;
    },
    users: (state) => {
      return state.users.students;
    },
  }),
  methods: {
    async blockUser(id) {
      this.$store.dispatch("users/blockUser", {
        student_id: id,
        token: this.token,
      });
    },
  },
  created() {
    this.$store.dispatch("users/getAllStudents", { token: this.token });
  },
  name: "UsersMenu",
  components: { ReviewItems, FilterForm },
};
</script>