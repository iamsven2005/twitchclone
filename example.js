const axios = require('axios');
const fs = require('fs');
const vercelToken = 'WupcyD738V8utStzAh27ZvCh'; //Replace with your token
const apiEndPt = 'https://api.vercel.com/v9/projects';
 
let config = {
  method: 'get',
  url: apiEndPt,
  headers: {
    Authorization: 'Bearer ' + vercelToken,
  },
};
let results = [];
 
(function loop() {
  axios(config)
    .then(function (response) {
      results.push(...response.data.projects);
      if (response.data.pagination.next !== null) {
        config.url = `${apiEndPt}?until=${response.data.pagination.next}`;
        loop();
      } else {
        //you can use the final results object and for example save it to a json file
        fs.writeFileSync('projects.json', JSON.stringify(results));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
})();