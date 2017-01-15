var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=29a7aa8f8eb907a68f812683b58cd962&units=imperial';

const DISCOGS_URL= 'https://api.discogs.com/users/blacklight/collection/folders/0/releases?page=';

// 29a7aa8f8eb907a68f812683b58cd962
// http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=29a7aa8f8eb907a68f812683b58cd962

module.exports = {
  getTemp: function (pageNumber){
    var encodedLocation = encodeURIComponent(location);
    var requestUrl =`${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

    return axios.get(DISCOGS_URL+pageNumber).then(function (res){
      var res = res;
      var shelfArray = [];
      // console.log('RESPONSE: ', res);
      console.log('Releases[0]: ', res.data.releases[0]);
      var releases = res.data.releases;

      for (var i = 0; i < releases.length; i++) {
        console.log('Title: ', releases[i].basic_information.title)
        var titleString = releases[i].basic_information.title

        var formatsObjects = releases[i].basic_information.formats;
        var formatsArray = []
        for (var m = 0; m < formatsObjects.length; m++) {
          formatsArray.push(formatsObjects[m].name);
        }
        var formatsString = formatsArray.join(', ');
        console.log('formatsString: ', formatsString);


        var artistsObjects = releases[i].basic_information.artists;
        var artistsArray = [];

        for (var x = 0; x < artistsObjects.length; x++) {
          artistsArray.push(artistsObjects[x].name);
        }
        var artistsString = artistsArray.join(', ');
        console.log('artistsString: ', artistsString);


        var labelsObjects = releases[i].basic_information.labels;
        var labelsArray = []
        for (var p = 0; p < labelsObjects.length; p++) {
          labelsArray.push(labelsObjects[p].name);
        }
        var labelsString = labelsArray.join(', ')
        console.log('labelsString: ', labelsString);

        var yearString = releases[i].basic_information.year;
        console.log('year: ', yearString);

        // var resource_URL = releases[i].basic_information.resource_url;
        // console.log('resource_url: ', resource_URL);
        // axios.get(resource_URL).then(function (resourceRes){
        //   console.log('Hellooo');
        // });

        // console.log('record: ', [releases[i].basic_information.title, formatsString, artistsString, labelsArray.join(', '), year].join(', '));
        shelfArray.push({title: titleString, formats: formatsString, artists: artistsString, labels: labelsString, year: yearString})

        console.log("");
      }





      if (res.data.cod && res.data.message){
        throw new Error(res.data.message);
      } else {
        return {
          temp: 50,
          name: 'Oz',
          page: {
            name: pageNumber,
            records: shelfArray
          }
        }
      }
    }, function (res) {
      if (res.data === undefined) {
        throw new Error("City not found")
      } else {
        throw new Error(res.data.message);
      }
    });
  }
};
