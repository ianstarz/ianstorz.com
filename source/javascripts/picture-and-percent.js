//= require ./velocity
//= require ./raphael
//= require ./raf
//= require ./ael

'use strict';

(function(window, document, undefined) {

var article = document.getElementById('article');
if (!article) { return; }

var canvas = document.getElementById('picture-and-percent');
if (!canvas) { throw new Error('Missing DOM for picture-and-percent.js'); }

var picture = document.getElementById('my-pic-img');
if (!picture) { throw new Error('Missing DOM for picture-and-percent.js'); }

var radius = 70;
var startAngle = -45;
var radialDirection = -1; // -1 cw, 1 ccw
var introHeight = 130;
var attrs = { fill: '#e5e9e6', stroke: 'none' };
var pictureFadeSpeed = 200;

var sector;
picture.style.opacity = 0;
drawEverything();

window.addEventListener('scroll', function() {
  redrawEverything();
}, true);

window.addEventListener('resize', function() {
  redrawEverything();
}, true);

function drawEverything() {
  var percentage, newStartAngle;

  requestAnimationFrame(function() {
    togglePicture(picture, introHeight, pictureFadeSpeed);
    percentage = computePercentComplete(article, introHeight);
    newStartAngle = computeNewStartAngle(startAngle, percentage, radialDirection);
    sector = drawSector(canvas, radius, newStartAngle, radialDirection, percentage, attrs);
  });
}

function redrawEverything() {
  var percentage, newStartAngle;

  requestAnimationFrame(function() {
    togglePicture(picture, introHeight, pictureFadeSpeed);
    percentage = computePercentComplete(article, introHeight);
    newStartAngle = computeNewStartAngle(startAngle, percentage, radialDirection);
    redrawSector(sector, radius, newStartAngle, radialDirection, percentage);
  });
}

function togglePicture(image, introHeight, speed) {
  var scrollTop = window.scrollY || document.body.scrollTop;

  if (scrollTop < introHeight && image.style.opacity === "0") {
    Velocity(image, { opacity: 1 }, speed);
  } 

  if (scrollTop > introHeight && image.style.opacity === "1") {
    Velocity(image, { opacity: 0 }, speed);
  }
}

function drawSector(c, r, startAngle, direction, percent, attrs) {
  var paper = Raphael(c, 2*r, 2*r);
  var relativeAngle = direction * computeRelativeAngle(percent);
  var path = computePath(r, r, r, startAngle, relativeAngle);
  var sector = paper.path(path);
  
  sector.attr(attrs);
  return sector;
}

function redrawSector(sector, r, startAngle, direction, percent) {
  var relativeAngle = direction * computeRelativeAngle(percent);
  var path = computePath(r, r, r, startAngle, relativeAngle);
  
  sector.attr({path: path});
  return sector;
}

function computePercentComplete(element, startOffset) {
  var scrollTop = window.scrollY || document.body.scrollTop;
  var windowHeight = document.body.clientHeight;
  var elementHeight = element.scrollHeight;
  var scrollTopStart = startOffset;
  var scrollTopEnd = startOffset + elementHeight - windowHeight - 35;
  var totalDistance = scrollTopEnd - scrollTopStart;
  var distanceTraversed = scrollTop - startOffset;
  return (distanceTraversed / totalDistance) * 100
}

function computeNewStartAngle(startAngle, percent, direction) {
  var totalTravel = 45;
  var endAngle = startAngle + (direction * totalTravel);
  var delta = Math.abs(endAngle - startAngle) * (percent / 100);
  return startAngle + (direction * delta);
}

function computeRelativeAngle(percent) {
  var angle = (percent / 100) * 360;
  angle = angle < 0 ? 0 : angle;
  angle = angle >= 360 ? 359.99 : angle;
  return angle;
}

function computePath(cx, cy, r, startAngle, relativeAngle) {
  var rad, endAngle, x1, y1, x2, y2, largeSweepFlag, sweepDirection;

  rad = Math.PI / 180;

  if (relativeAngle > 360 || relativeAngle < -360) {
    endAngle = startAngle + (relativeAngle % 360);
  } else {
    endAngle = startAngle + relativeAngle;
  }

  x1 = cx + r * Math.cos(-startAngle * rad);
  y1 = cy + r * Math.sin(-startAngle * rad);
  x2 = cx + r * Math.cos(-endAngle * rad);
  y2 = cy + r * Math.sin(-endAngle * rad);

  largeSweepFlag = +(Math.abs(endAngle - startAngle) > 180);
  sweepDirection = +(relativeAngle < 0);

  return 'M'+cx+' '+cy+' '+
         'L'+x1+' '+y1+' '+
         'A'+r +' '+r +' '+'0'+' '+largeSweepFlag+' '+sweepDirection+' '+x2+' '+y2+' '+
         'Z';
}

})(window, window.document);
