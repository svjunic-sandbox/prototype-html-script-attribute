(function(){
  var str = '%cinline';
  var color = 'color: blue';

  console.log( str + ' : inline', color );

  window.addEventListener('DOMContentLoaded', function(){
    console.log( str + ' : DOMContentLoaded', color );
  });

  $(function () {
    console.log( str + ' : $.ready', color );
  });
})();
