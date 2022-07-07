const DataFetch = {
  domaine: "http://localhost:8080",

  get: async function (path = null, callback = null) {
    try {
      if (path !== null && callback !== null) {
        await fetch(this.domaine + path)
          .then((response) => response.json())
          .then((fetched) => {
            if (callback !== null) {
              callback(fetched.data);
            }
          });
      } else {
        throw new Error("Invalid parameter pass to the method");
      }
    } catch (e) {
      throw new Error(e);
    }
  },



  post: async function (path = null, callback = null, payload = {}) {
    //let you enjoy to dev this one 
  }

},

export default DataFetch;
