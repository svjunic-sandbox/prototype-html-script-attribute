(function() {
  let str = '%cdefer';
  let color = 'color: red';

  if(/inline/.test(location.hash)){
    console.log(str + ' : inline', color);
  }

  window.addEventListener('DOMContentLoaded', function() {
    if (/domcontentloaded/.test(location.hash)) {
      console.log(str + ' : DOMContentLoaded', color);
    }
  });

  $(function() {
    if (/ready/.test(location.hash)) {
      console.log(str + ' : $.ready', color);
    }
  });

  window.addEventListener('load', function() {
    if (/load/.test(location.hash)) {
      console.log(str + ' : load', color);
    }
  });
})();