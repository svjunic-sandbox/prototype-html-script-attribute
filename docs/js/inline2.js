(function() {
  var str = '%cinline2';
  var color = 'color: blue';

  console.log(str + ' : inline', color);

  window.addEventListener('DOMContentLoaded', function() {
    console.log(str + ' : DOMContentLoaded', color);
  });

  $(function() {
    console.log(str + ' : $.ready', color);
  });

  $(window).on('complete', function() {
    console.log('%conComplete', color, document.querySelectorAll('p'));
  });
})();
