const preferences = {
    src: './src/',
    dest: './build/',
    emptyDest: true,
    location: new URL('https://rafaelschueng.github.io/'),
    server: {
      port: 5000,
      page404: './build/static/not_found.html',
    },
  };

export default preferences;