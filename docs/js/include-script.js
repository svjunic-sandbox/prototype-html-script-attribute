(function() {
  /* eslint-disable */
  let includeList = [
    "./js/include-scripts/include-dummy.js?id={{id}}",
    "./js/include-scripts/include-dummy-heavy.js?id={{id}}",
    "./js/include-scripts/include-dummy2.js?id={{id}}&async=async",
    "./js/include-scripts/include-dummy2-heavy.js?id={{id}}&async=async",
    "./js/include-scripts/include-dummy2-heavy.js?id={{id}}&async=async",
    "./js/include-scripts/include-dummy2-heavy.js?id={{id}}",
    "./js/include-scripts/include-dummy2-heavy.js?id={{id}}",
    "./js/include-scripts/include-dummy2-heavy.js?id={{id}}&async=async",
    "./js/include-scripts/include-dummy2-heavy.js?id={{id}}&async=async",
    "./js/include-scripts/include-dummy2-heavy.js?id={{id}}&async=async",
    "./js/include-scripts/include-dummy2.js?id={{id}}&async=async",
    "./js/include-scripts/include-dummy2.js?id={{id}}&async=async",
    "./js/include-scripts/include-dummy2.js?id={{id}}&async=async",
    "./js/include-scripts/include-dummy2.js?id={{id}}",
    "./js/include-scripts/include-dummy2.js?id={{id}}",
    "./js/include-scripts/include-dummy2.js?id={{id}}"
  ];
  /* eslint-enable */

  let num = 0;

  function nextScript() {
    path = includeList[num];

    if (!path) return;

    let tagjs = document.createElement('script');
    let s = document.getElementsByTagName('script')[0];

    if (/async/.test(path)) {
      tagjs.async = true;
    } else {
      tagjs.async = false;
    }

    //tagjs.onload = tagjs.onreadystatechange = function(e) {
    tagjs.onload = function(e) {
      console.log(e);
      num++;
      nextScript();
    };

    tagjs.onerror = function() {
      num++;
      nextScript();
    };

    tagjs.src = path.replace('{{id}}', num);
    s.parentNode.insertBefore(tagjs, s);
  }

  window.addEventListener(
    'load',
    function() {
      nextScript();
    },
    false
  );
})();
