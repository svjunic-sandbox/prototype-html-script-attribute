try {
  (function() {
    let domready = (function(a) {
      function m(a) {
        l = 1;
        while ((a = b.shift())) a();
      }
      let b = [],
        c,
        d = !1,
        e = document,
        f = e.documentElement,
        g = f.doScroll,
        h = 'DOMContentLoaded',
        i = 'addEventListener',
        j = 'onreadystatechange',
        k = 'readyState',
        l = /^loade|c/.test(e[k]);
      return (
        e[i] &&
          e[i](
            h,
            (c = function() {
              e.removeEventListener(h, c, d), m();
            }),
            d
          ),
        g &&
          e.attachEvent(
            j,
            (c = function() {
              /^c/.test(e[k]) && (e.detachEvent(j, c), m());
            })
          ),
        (a = g
          ? function(c) {
            self != top
              ? l
                ? c()
                : b.push(c)
              : (function() {
                try {
                  f.doScroll('left');
                } catch (b) {
                  return setTimeout(function() {
                    a(c);
                  }, 50);
                }
                c();
              })();
          }
          : function(a) {
            l ? a() : b.push(a);
          })
      );
    })();
    domready(function() {
      let body = document.getElementsByTagName('body')[0];
      let ifr = document.createElement('iframe');
      ifr.setAttribute(
        'src',
        'https://sin.creativecdn.com/tags?type=iframe&id=pr_RqgHucvrq5nn086WalA3_home'
      );
      ifr.setAttribute('width', '1');
      ifr.setAttribute('height', '1');
      ifr.setAttribute('scrolling', 'no');
      ifr.setAttribute('frameBorder', '0');
      ifr.setAttribute('style', 'display:none');
      body.appendChild(ifr);
    });
  })();
} catch (e) {}
