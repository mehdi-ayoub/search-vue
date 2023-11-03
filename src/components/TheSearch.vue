<template>
  <div class="col-md-6 box-title">
    <h1 class="search-title"> Advice Search </h1>
    <input
      type="search"
      class="form-control"
      v-model="query"
      @input="handleInput"
      placeholder="Start typing..."
    >

    <ul>
      <li v-for="item in result" :key="item.id">{{ item.advice }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      result: [],
      timeout: null
    };
  },

  methods: {
    handleInput() {

      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        //  search if the query is not empty
        if (this.query.trim()) {
          this.getData();
        } else {
          this.result = [];
        }
      }); // Debounce time
    },

    getData() {
      const queryParam = encodeURIComponent(this.query);

      fetch(`https://api.adviceslip.com/advice/search/${queryParam}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Search Failed.');
          }
        })
        .then(data => {
          if (data.slips && data.slips.length > 0) {
            this.result = data.slips;
          } else {
            this.result = [{ advice: 'No result found - try something like "people - nice - file - email"' }];
          }
        })
        .catch(error => {
          console.error('Error during fetch:', error);
          this.result = [{ advice: 'Try searching for different words (ex: people - nice - file - email)' }];
        });
    }
  }
};
</script>

<style scoped>
.box-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
}

.search-title {
  color: #333;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-bottom: 1rem;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Style for the results list */
ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  width: 100%;
}

li {
  background: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
}

li:hover {
  background-color: #e6f7ff;
}
</style>
