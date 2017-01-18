var axios = require('axios');

const DISCOGS_URL= 'https://api.discogs.com/users/blacklight/collection/folders/0/releases?shelf=';

module.exports = {
  getPage: function (shelfNumber){

    return axios.get(DISCOGS_URL+shelfNumber+"&per_shelf=350").then(function (res){
      var res = res;
      var shelfArray = [];

      var releases = res.data.releases;

      for (var i = 0; i < releases.length; i++) {
        var titleString = releases[i].basic_information.title

        var formatsObjects = releases[i].basic_information.formats;
        var formatsArray = []
        for (var m = 0; m < formatsObjects.length; m++) {
          formatsArray.push(formatsObjects[m].name);
        }
        var formatsString = formatsArray.join(', ');

        var artistsObjects = releases[i].basic_information.artists;
        var artistsArray = [];

        for (var x = 0; x < artistsObjects.length; x++) {
          artistsArray.push(artistsObjects[x].name);
        }
        var artistsString = artistsArray.join(', ');

        var labelsObjects = releases[i].basic_information.labels;
        var labelsArray = []
        for (var p = 0; p < labelsObjects.length; p++) {
          labelsArray.push(labelsObjects[p].name);
        }
        var labelsString = labelsArray.join(', ')

        var yearString = releases[i].basic_information.year;

        var instanceID = releases[i].instance_id;

        shelfArray.push({instanceID: instanceID, title: titleString, formats: formatsString, artists: artistsString, labels: labelsString, year: yearString})

      }
      if (res.data.cod && res.data.message){
        throw new Error(res.data.message);
      } else {
        return {
          shelf: {
            editable: false,
            number: shelfNumber,
            name: 'Shelf ' + shelfNumber,
            records: shelfArray
          }
        }
      }
    }, function (res) {
      if (res.data === undefined) {
        throw new Error("Page Not Found")
      } else {
        throw new Error(res.data.message);
      }
    });
  }
};
