"use strict";

(function () {
  window.onload = () => {
    async function getData() {
      const res = await fetch(
      "https://services1.arcgis.com/0IrmI40n5ZYxTUrV/arcgis/rest/services/CountyUAs_cases_table/FeatureServer/0/query?f=json&where=1=1&outSr=4326&outFields=FID, GSS_CD, GSS_NM, TotalCases, ObjectId",
      {
        method: "POST" });



      await res.json().then(
      data => {
        appendData(data);
      },
      error => {
        document.querySelector(".container").innerText = error;
      });

    }

    function appendData(data) {
      function createContainerEle(county, totalCases) {
        let containerEle = document.createElement("div");
        let hEle = document.createElement("h2");
        let pEle = document.createElement("p");

        containerEle.classList.add("card");
        containerEle.appendChild(hEle).innerText = county;
        containerEle.appendChild(pEle).innerText = totalCases;

        return containerEle;
      }

      const countyArraySorted = data.features.
      map(val => {
        let county = val.attributes.GSS_NM;
        let totalCases = val.attributes.TotalCases;

        return [county, totalCases];
      }).
      sort(function sortByCounty(a, b) {
        if (a[0] > b[0]) return 1;else
        if (a[0] < b[0]) return -1;else
        return 0;
      });

      countyArraySorted.map(val => {
        let containerEle = createContainerEle(val[0], val[1]);

        document.querySelector(".container").appendChild(containerEle);
      });
    }

    getData();
  };
})();