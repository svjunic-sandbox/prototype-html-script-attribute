(function(){
  var str = '%cdefer';
  var color = 'color: red';

  console.log( str + ' : inline', color );

  $(window).trigger('complete');

  window.addEventListener('DOMContentLoaded', function(){
    console.log( str + ' : DOMContentLoaded', color );
  });

  $(function () {
    console.log( str + ' : $.ready', color );
  });
})();
