const DataFetch = {
  domaine: "http://localhost:8080",

  updateState: async function (
    method = "get",
    useEffectSetHookMethod = null,
    path = ""
  ) {
    if (method.toLowerCase() === "get" && useEffectSetHookMethod !== null) {
      await fetch(this.domaine + path)
        .then((response) => response.json())
        .then((fetched) => {
          useEffectSetHookMethod(fetched.data);
        });
    } else {
      throw new Error("Invalid parameter pass to fetchData");
    }
  },
};

export default DataFetch;
