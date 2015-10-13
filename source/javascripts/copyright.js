'use strict';

(function(document) {
  var container = document.getElementById('copyright-year');
  if (!container) { return; }

  var year = Number(container.innerHTML);
  if (!year || isNaN(year) || year < 2015) {
    year = 2015;
    container.innerHTML = "2015";
  }

  var date = new Date();
  var currentYear = Number(date.getUTCFullYear());
  if (year == currentYear) { return; }

  var newInnerHTML = year + " - " + currentYear;
  container.innerHTML = newInnerHTML;
})(document);
