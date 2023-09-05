const preferences = {
    src: "./src/",
    dest: `./build/`,
    dev: true,
    includes: "./includes/",
    emptyDest: true,
    location: new URL("https://rafaelschueng.github.io/"),
    server: {
      port: 5000,
      open: true,
      page404: "./src/static/not_found.html",
    },
    prettyUrls: true,
    watcher: {
      debounce: 1000,
      ignore: [],
    },
  };

export default preferences;