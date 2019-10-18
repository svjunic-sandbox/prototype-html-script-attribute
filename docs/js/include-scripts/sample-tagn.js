function bt_eval(l, n) {
  try {
    return window.eval.apply(window, [l]);
  } catch (u) {
    n && n(u);
  }
}
let bt_parameter = (function() {
  let l;
  return function(n, u) {
    let C = u || document;
    'undefined' === typeof l && (l = new BrightTag.HTTP.URL(C.location.href));
    return l.param(n);
  };
})();
function bt_meta(l, n) {
  for (
    var u,
      C = (n || document).getElementsByTagName('meta'),
      H = 0,
      J = C.length;
    H < J;
    H++
  )
    if (((u = C[H]), u.getAttribute('name') === l))
      return u.getAttribute('content');
  return '';
}
function bt_cookie(l, n) {
  return new BrightTag.HTTP.Cookie(n || document).get(l) || '';
}
function bt_data(l, n) {
  let u = BrightTag.V2_RESPONSE
    ? BrightTag.configuredSites()[0]
    : BrightTag.instance;
  return u ? u.data(l, n) : '';
}
window.bt_data_escaped = bt_data;
function bt_log(l) {
  window.console && console.log && console.log('Signal: ' + l);
}
let bt_handle_exception = bt_log;
window.BrightTag = (function(l) {
  function n(a, d) {
    return Object.prototype.toString.call(a) === '[object ' + d + ']';
  }
  function u(a) {
    return a.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
  function C(a) {
    return '\n//at-sourceURL=/BrightTag/' + a.replace(/\s+/g, '_') + '.js';
  }
  function H(a, d) {
    for (let c = 0, b = this.length; c < b; c++) a.call(d, this[c], c, this);
  }
  function J(a, d, c) {
    for (let b in a) a.hasOwnProperty(b) && d.call(c, b, a[b], a);
  }
  function r(a, d, c) {
    a && (O(a) ? P.call(a, d, c) : p.isObject(a) && J(a, d, c));
  }
  function s(a, d) {
    J(d, function(d, b) {
      a[d] = b;
    });
    return a;
  }
  function O(a) {
    return p.isArray(a) || (!p.isString(a) && a.length);
  }
  function pa(a) {
    return Boolean(a);
  }
  function qa(a, d) {
    let c = Array.isArray(this) ? this.slice() : Array.from(this),
      b = [];
    P.call(c, function(c, e) {
      a.call(d, c, e, this) && b.push(c);
    });
    return b;
  }
  function U(a, d, c) {
    if (a) return ra.call(O(a) ? a : [a], d || pa, c);
  }
  function sa(a, d) {
    let c = Array.isArray(this) ? this.slice() : Array.from(this),
      b = Array(c.length);
    P.call(c, function(c, e) {
      b[e] = a.call(d, c, e, this);
    });
    return b;
  }
  function A(a, d) {
    let c,
      b,
      g = p.isArray(a) ? a : [a];
    c = 0;
    for (b = g.length; c < b; c++) if (g[c] === d) return !0;
    return !1;
  }
  function V(a) {
    return !p.isString(a)
      ? a
      : a
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/&/g, '%26')
        .replace(/'/g, '%27')
        .replace(/;/g, '%3B')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E');
  }
  function W(a) {
    for (var d = 5381, c = 0, b = a.length; c < b; )
      d = (d << 5) + d + a.charCodeAt(c++);
    return d.toString(36);
  }
  function Q(a) {
    if (
      's.yjtag.jp' === a &&
      'false' !== l.HTTP.Cookie(document).get('testyjproxy')
    )
      return 'yjtag.yahoo.co.jp';
  }
  function X(a) {
    function d() {}
    function c(a) {
      let b = Array.prototype.slice.call(arguments, 1);
      x.each(r, function(h) {
        let c = [t].concat(b);
        (h[a] || d).apply(null, c);
      });
    }
    function b() {
      D = !0;
      R = y.length;
      c('engine:off');
    }
    function g() {
      D && c('engine:on');
      D = !1;
      Y = 0;
      (y[R++] || b)();
    }
    function e(a, b) {
      return {
        type: a,
        exception: b
      };
    }
    function f() {
      c('block:finish');
      g();
    }
    function k(b, h) {
      let c = a.createElement(b.tagName),
        m = x.extend(x.extend({}, b.defaults), h || {});
      x.each(b.supported, function(a) {
        p.isString(a) && null != m[a]
          ? (c[a] = m[a])
          : p.isObject(a) && null != m[a.option] && a.setter(c, m[a.option]);
      });
      return c;
    }
    function m(b, h) {
      let m = k(s.iframe, h);
      m.onerror = function() {
        c('block:error', e('iframe', 'Problem loading ' + b));
      };
      c('block:start', b);
      m.src = b.toString();
      a.body.appendChild(m);
      f();
    }
    function h(a, b) {
      let m = k(s.image, b);
      m.onerror = function() {
        c('block:error', e('image', 'Problem loading ' + a));
      };
      c('block:start', a);
      m.src = a.toString();
      f();
    }
    function v(b, m, h) {
      let d = !1,
        v = k(s.script, h);
      v.onerror = function() {
        c('block:error', e('script', 'Problem loading ' + b));
        d || f();
      };
      v.onload = v.onreadystatechange = function() {
        let a;
        if (!(a = d)) {
          a: {
            switch (v.readyState) {
              case void 0:
              case 'loaded':
              case 'complete':
                a = !0;
                break a;
            }
            a = !1;
          }
          a = !a;
        }
        a || ((d = !0), f());
      };
      c('block:start', b);
      b && (v.src = b.toString());
      m && (v.text = m);
      m = a.getElementsByTagName('script')[0];
      m.parentNode.insertBefore(v, m);
    }
    function q(a) {
      let b = Array.prototype.slice.call(arguments, 1);
      return function() {
        a.apply(null, b);
      };
    }
    function K(b) {
      return function() {
        try {
          if ((c('block:start', b), p.isString(b))) {
            let m = x
              .trim(b)
              .replace(/^\x3c!--/, '')
              .replace(/--\x3e$/, '');
            a.defaultView
              ? a.defaultView.eval.call(window, m)
              : a.parentWindow
                ? a.parentWindow.execScript(m)
                : c(
                  'block:error',
                  e('wait', 'Could not evaluate wait block [' + m + ']')
                );
          } else b();
        } catch (h) {
          c('block:error', e('wait', h));
        } finally {
          f();
        }
      };
    }
    function w(a) {
      y.push(a);
      D && g();
      return t;
    }
    function l(a) {
      y.splice(R + Y++, 0, a);
      return t;
    }
    var t = this,
      r = [],
      B = {},
      D = !1,
      y = [],
      R = 0,
      Y = 0,
      s = {
        iframe: {
          tagName: 'iframe',
          defaults: {
            frameborder: '0',
            height: '1px',
            scrolling: 'no',
            width: '1px'
          },
          supported: [
            {
              option: 'display',
              setter: function(a, b) {
                a.style.display = b;
              }
            },
            'frameborder',
            'id',
            'height',
            'scrolling',
            'width'
          ]
        },
        image: {
          tagName: 'img',
          defaults: {},
          supported: [
            {
              option: 'display',
              setter: function(a, b) {
                a.style.display = b;
              }
            },
            'id',
            {
              option: 'height',
              setter: function(a, b) {
                a.setAttribute('height', b);
              }
            },
            {
              option: 'width',
              setter: function(a, b) {
                a.setAttribute('width', b);
              }
            }
          ]
        },
        script: {
          tagName: 'script',
          defaults: {
            type: 'text/javascript'
          },
          supported: ['async', 'id', 'type', 'charset']
        }
      };
    t.run = function() {
      c('engine:on');
      g();
    };
    t.options = function(a) {
      x.extend(B, a);
      return t;
    };
    t.option = function(a) {
      return B[a];
    };
    t.iframe = function(a, b) {
      return w(q(m, a, b));
    };
    t.image = function(a, b) {
      return w(q(h, a, b));
    };
    t.script = function(a, b, m) {
      return w(q(v, a, b, m));
    };
    t.wait = function(a) {
      return w(K(a));
    };
    t.preemptCss = function(a, b) {
      return l(q(v, a, b));
    };
    t.preemptIframe = function(a, b) {
      return l(q(v, a, b));
    };
    t.preemptImage = function(a, b) {
      return l(q(v, a, b));
    };
    t.preemptScript = function(a, b, m) {
      return l(q(v, a, b, m));
    };
    t.preemptWait = function(a) {
      return l(K(a));
    };
    t.listen = function(a) {
      r.push(a);
      (a['engine:listen'] || d).apply(null, [t]);
      return t;
    };
  }
  function Z(a) {
    function d(a) {
      e.push(a);
      k && !m && b();
    }
    function c(a) {
      a.run();
    }
    function b() {
      let a = e[f];
      a && (f++, a.listen(h).run());
    }
    var g,
      e = [],
      f = 0,
      k = !1,
      m = !1,
      h = {
        'engine:on': function() {
          m = !0;
        },
        'engine:off': function() {
          m = !1;
          b();
        }
      };
    g = d;
    this.alwaysQueue = function() {
      g = d;
    };
    this.neverQueue = function() {
      g = c;
    };
    this.push = function(a) {
      g(a);
      return a;
    };
    this.run = function() {
      k = !0;
      b();
    };
    this.applyListener = function(a) {
      let b, m;
      b = f;
      for (m = e.length; b < m; b++) e[b].listen(a);
    };
    this.toString = function() {
      return 'Group[name=' + a + '; working=' + m + '; running=' + k + ']';
    };
  }
  function $(a, d) {
    return {
      'engine:listen': function(c) {
        c.listen(new ta(a, d));
      }
    };
  }
  function aa(a) {
    function d(a) {
      return g[a] || (g[a] = new Z(a));
    }
    function c(a) {
      return b.addToGroup(a, b.newEngine());
    }
    var b = this,
      g = {
        undefined: new Z(void 0)
      },
      e = [];
    g.undefined.neverQueue();
    b.addGlobalListener = function(a) {
      e.push(a);
      r(g, function(b, m) {
        m.applyListener(a);
      });
    };
    b.addToGroup = function(a, b) {
      r(e, function(a) {
        b.listen(a);
      });
      return d(a).push(b);
    };
    b.newEngine = function() {
      return new X(a);
    };
    b.group = function(a) {
      return c(a);
    };
    b.listen = function() {
      return c().listen.apply(null, arguments);
    };
    b.iframe = function() {
      return c().iframe.apply(null, arguments);
    };
    b.image = function() {
      return c().image.apply(null, arguments);
    };
    b.script = function() {
      return c().script.apply(null, arguments);
    };
    b.wait = function() {
      return c().wait.apply(null, arguments);
    };
    b.run = function(a) {
      d(a).run();
    };
    b.alwaysQueue = function(a) {
      d(a).alwaysQueue();
    };
    b.neverQueue = function(a) {
      d(a).neverQueue();
    };
    b.setOptions = function() {
      return c();
    };
  }
  function S(a) {
    function d(a) {
      let b,
        c = a.split(k),
        d;
      g = {};
      a = 0;
      for (b = c.length; a < b; a++)
        (d = f.exec(c[a])) && (g[d[1]] = unescape(d[2]));
    }
    function c(b, c, k) {
      if (b) {
        k = k || {};
        b = [b + '=' + V(c || '')];
        if ((c = k.expires) || 0 === c)
          p.isNumber(c) && (c = new Date(c).toGMTString()),
          b.push('expires=' + c);
        (c = k.path) && b.push('path=' + c);
        (c = k.domain) && b.push('domain=' + c);
        !0 === k.secure && b.push('Secure');
        !0 === k.httponly && b.push('HttpOnly');
        k = b.join(';');
        if (k.length < e) a.cookie = k;
        else
          throw {
            name: 'CookieTooLongError',
            message: 'Cookie reached 4096 byte limit'
          };
        d(a.cookie);
      }
    }
    function b(a, b) {
      c(
        a,
        '',
        s(b || {}, {
          expires: 1
        })
      );
    }
    var g = {},
      e = 4096,
      f = /([^=]+)=?(.*)/,
      k = /; ?/;
    d(a.cookie || '');
    return {
      get: function(a) {
        return g[a];
      },
      set: c,
      remove: b,
      findEach: function(a, b) {
        for (let c in g) g.hasOwnProperty(c) && c.match(a) && b(c, g[c]);
      },
      clear: function(a) {
        let c = s({}, g),
          d;
        for (d in c) b(d, a);
      }
    };
  }
  function ba(a) {
    a = S(a);
    let d = a.set,
      c = a.remove;
    a.set = function(a, c, e) {
      e = s(e || {}, {
        path: '/'
      });
      0 === e.expires && (e.expires = Number(new Date('1/1/2038')));
      d(a, c, e);
    };
    a.remove = function(a, d) {
      c(
        a,
        s(d || {}, {
          path: '/'
        })
      );
    };
    a.purge = function() {};
    return a;
  }
  function ca(a, d) {
    function c(a) {
      a = a.expires;
      return 0 !== a && a <= Number(new Date());
    }
    function b(b, c) {
      a.setItem(b, c);
    }
    function g(a, b, k) {
      b = {
        value: b,
        expires: k
      };
      c(b) || d.setItem(a, JSON.stringify(b));
    }
    function e(a) {
      a = d.getItem(a);
      try {
        return a ? JSON.parse(a) : void 0;
      } catch (b) {}
    }
    function f(a) {
      a = e(a);
      let b;
      return a &&
        (a.hasOwnProperty('value') && a.hasOwnProperty('expires')) &&
        !c(a)
        ? ((b = a.value), delete a.value, [b, a])
        : [];
    }
    function k(a, b, c, d) {
      for (var k, e = 0, f = a.length; e < f; e++)
        (k = a.key(e)), !c[k] && (c[k] = k.match(b)) && d(k);
    }
    return {
      set: function(a, c, d) {
        a &&
          null != c &&
          ((d = d || {}), (null != d.expires ? g : b)(a, c, d.expires));
      },
      get: function(b) {
        return a.getItem(b) || f(b)[0];
      },
      findEach: function(b, c) {
        let e = {};
        k(a, b, e, function(b) {
          let d = a.getItem(b);
          null != d && c(b, d);
        });
        k(d, b, e, function(a) {
          var b = f(a),
            d = b[0],
            b = b[1];
          null != d && c(a, d, b);
        });
      },
      remove: function(b) {
        a.removeItem(b);
        d.removeItem(b);
      },
      purge: function() {
        for (var a, b, k = d.length; k--; )
          (a = d.key(k)),
          (b = e(a)) &&
              (b.hasOwnProperty('value') && b.hasOwnProperty('expires')) &&
              c(b) &&
              d.removeItem(a);
      }
    };
  }
  function L(a, d) {
    let c = {};
    c.set = a.set;
    c.findEach = function(b, c) {
      let e = {};
      a.findEach(b, function(a, b, d) {
        e[a] = !0;
        c(a, b, d);
      });
      d.findEach(b, function(b, d, m) {
        e[b] || (a.set(b, d, m), c(b, d, m));
      });
    };
    c.get = function(b) {
      let c = a.get(b);
      void 0 === c && ((c = d.get(b)), void 0 !== c && a.set(b, c));
      return c;
    };
    c.remove = function(b) {
      a.remove(b);
      d.remove(b);
    };
    c.purge = function() {
      a.purge();
      d.purge();
    };
    return c;
  }
  function M(a) {
    function d(a) {
      let b = {};
      if (!p.isString(a)) return a;
      r(a.split('&'), function(a) {
        if ('' !== a) {
          let c = a.split('=');
          a = decodeURIComponent(c[0]);
          c = c[1] && decodeURIComponent(c[1].replace(/\+/g, ' '));
          (null == b[a] ? (b[a] = []) : b[a]).push(c);
        }
      });
      return b;
    }
    function c(a, b) {
      let c = [];
      r(a, function(a) {
        if (p.isObject(a)) return !1;
        a = null == a || '' === a ? b : a;
        (p.isString(a) || p.isNumber(a) || p.isBoolean(a)) && c.push(a);
      });
      return c;
    }
    function b(a) {
      return !p.isArray(a) ? [a] : a;
    }
    function g(a, b) {
      let c = encodeURIComponent(a),
        d = encodeURIComponent(b);
      return c + '=' + d;
    }
    let e = this,
      f = {};
    s(f, d(a));
    e.param = function(a) {
      a = f[a] || [''];
      return 1 < a.length ? a : a[0];
    };
    e.params = function() {
      return f;
    };
    e.appendParam = function(a, d) {
      if (a) {
        let e = c(b(d));
        0 < e.length && (f[a] = (null == f[a] ? (f[a] = []) : f[a]).concat(e));
      }
      return this;
    };
    e.replaceParam = function(a, d) {
      if (a) {
        let e = c(b(d));
        0 < e.length && (f[a] = (f[a] = []).concat(e));
      }
      return this;
    };
    e.appendParams = function(a) {
      r(a, e.appendParam);
      return this;
    };
    e.alwaysAppendParam = function(a, d) {
      if (a) {
        let e = c(b(d), '');
        0 < e.length && (f[a] = (null == f[a] ? (f[a] = []) : f[a]).concat(e));
      }
      return this;
    };
    e.alwaysReplaceParam = function(a, d) {
      if (a) {
        let e = c(b(d), '');
        0 < e.length && (f[a] = (f[a] = []).concat(e));
      }
      return this;
    };
    e.alwaysAppendParams = function(a) {
      r(a, e.alwaysAppendParam);
      return this;
    };
    e.appendPartialQueryString = function(a) {
      a && e.alwaysAppendParams(d(a));
      return this;
    };
    e.deleteParam = function(a) {
      delete f[a];
    };
    e.toString = function() {
      let a = [];
      r(f, function(b, c) {
        r(c, function(c) {
          a.push(g(b, c));
        });
      });
      return a.join('&');
    };
  }
  function E(a) {
    function d() {
      let a = l.toString();
      return f + k + (0 < a.length ? '?' + a : '');
    }
    let c = {},
      b,
      g,
      e,
      f,
      k,
      m,
      h,
      v,
      q,
      l,
      w = a.match(ua);
    a = w[1] || '';
    g = w[2] || '';
    e = (w[3] || '').substring(1);
    b = g + (e ? ':' + e : '');
    f = a + (b ? '//' + b : '');
    k = w[4] || '';
    m = ((h = k.match(/^(.+?)?\/([^\/]+)?$/)) && h[1]) || '';
    h = (h && h[2]) || '';
    v = (w[5] || '').substring(1);
    q = (w[6] || '').substring(1);
    l = new M(v);
    s(c, l);
    s(c, {
      origin: f,
      scheme: a,
      host: b,
      hostname: g,
      port: e,
      path: k,
      pathname: m,
      scriptname: h,
      queryString: l.toString,
      fragment: function() {
        return q;
      },
      tooLong: function() {
        return 2082 < d().length;
      },
      asString: d
    });
    c.toString = d;
    return c;
  }
  function da(a, d, c) {
    function b() {
      let b = c.createEvent('Event');
      b.initEvent(d, !0, !1);
      try {
        b.currentTarget = b.target = a;
      } catch (e) {
        bt_log('warning: can not set target for [' + d + '] event: ' + e);
      }
      return b;
    }
    function g() {
      let a = c.createEventObject('Event');
      a.type = d;
      a.cancelable = !0;
      a.bubbleable = !1;
      return a;
    }
    function e(c) {
      setTimeout(function() {
        try {
          (c.handleEvent || c).call(a, f ? b() : g());
        } catch (e) {
          bt_log('error: overriding [' + d + '] event: ' + e);
        }
      }, 0);
    }
    var f = Boolean(a.addEventListener),
      k = f ? 'addEventListener' : 'attachEvent',
      m = a[k];
    a[k] = function(b, c, k) {
      if (c && ('function' == typeof c || 'function' == typeof c.handleEvent))
        if (b == d || b == 'on' + d) e(c);
        else
          try {
            f ? m.call(a, b, c, k) : m(b, c);
          } catch (g) {
            bt_log('error: proxying [' + b + '] event: ' + g);
          }
    };
  }
  function ea(a, d, c) {
    function b(a) {
      a.hasOwnProperty('enabled') && (v = a.enabled);
      a.hasOwnProperty('timestamp') && ((l = a.timestamp), (v = !0));
      a.hasOwnProperty('site') && (m = a.site);
      a.hasOwnProperty('referrer') && (h = a.referrer);
    }
    function g(c) {
      c && b(c);
      q = [];
      a.remove(d);
    }
    function e() {
      try {
        return JSON.stringify({
          site: m,
          referrer: h,
          errors: q
        });
      } catch (a) {
        bt_log('problem serializing errors: ' + a.message);
      }
      return null;
    }
    function f(a) {
      let b = p.isObject(a) ? s({}, a) : {};
      b.type = b.type || 'unknown';
      b.message = b.message || a.toString();
      b.timestamp = l;
      return b;
    }
    function k() {
      g();
      q.push(
        f({
          type: 'runtime',
          message: 'Too many errors'
        })
      );
      a.set(d, e());
    }
    if (!a) throw Error('ErrorManager requires a store');
    var m,
      h,
      v = !0,
      q = [],
      l = Number(new Date());
    c && b(c);
    return {
      configure: b,
      reset: g,
      hasErrors: function() {
        return 0 < q.length;
      },
      tooManyErrors: k,
      processStoredErrors: function() {
        let b = a.get(d);
        if (b)
          try {
            let c = JSON.parse(b) || {};
            m = c.site;
            h = c.referrer;
            p.isArray(c.errors) && (q = q.concat(c.errors));
          } catch (e) {
            bt_log('problem reading stored errors: ' + e.message);
          }
      },
      push: function(b) {
        bt_log('error: ' + JSON.stringify(b));
        if (v && b && !(-1 > b.tagId || -1 > b.pageId))
          try {
            q.push(f(b)), a.set(d, e());
          } catch (c) {
            if ('CookieTooLongError' != c.name) throw c;
            k();
          }
      },
      toJSON: e,
      toArray: function() {
        return q;
      }
    };
  }
  function fa(a, d) {
    return new (function(a, b) {
      function d(a) {
        h.wait(a);
      }
      function e(a) {
        function b() {
          m = l.jQuery;
          d(a);
        }
        k = 'var $ = BrightTag.$; ';
        l.jQuery
          ? b()
          : h
            .script(l.instance.baseUri() + 'BrightTag.jquery-1.5.1.js')
            .wait(b);
      }
      var f = {},
        k = '',
        m,
        h = l.Blab.group(b);
      f.getJQuery = function() {
        return m;
      };
      f.ensureJQuery = function(k) {
        f.ensureJQuery = d;
        m = a.jQuery;
        (m ? d : e)(k);
        l.Blab.run(b);
      };
      f.functionWithAccess = function(a, b) {
        return new Function(a, k + b);
      };
      return f;
    })(a, d);
  }
  function ga(a) {
    function d(a, c) {
      c &&
        c.findEach(a, function(a, c) {
          b.appendParam(a, c);
        });
    }
    function c(a, b) {
      return function(c) {
        bt_log('invalid ' + a + ' expression: ' + b + ', exception = ' + c);
      };
    }
    var b = this,
      g = a.window,
      e = a.parentReferrer,
      f = a.referrer,
      k = E(
        0 === a.host.length
          ? ''
          : (/^[a-z0-9+.-]+:\/\/.+/.test(a.host) ? '' : '//') + a.host + '/tag'
      ),
      m = a.store ? a.store.get('X-BT-InspectSession') : null;
    s(b, k);
    b.toString = k.toString;
    b.appendParams({
      site: a.site,
      referrer: f,
      docReferrer: a.docReferrer,
      mode: a.mode,
      H: W(f || a.document.location.href)
    });
    m && b.appendParam('inspect-session', m);
    f !== e && b.appendParam('parentReferrer', e);
    d(/^btps\..+/, new S(a.document));
    d(/^btpdb\..+/, a.store);
    b.appendData = function(a) {
      var c = bt_data(a),
        c = p.isArray(c) || p.isObject(c) ? g.JSON.stringify(c) : c;
      return b.alwaysReplaceParam('_cb_' + ('bt_data(\'' + a + '\')'), c);
    };
    b.appendJs = function(a) {
      let d = c('client binding expression', a);
      return b.alwaysReplaceParam('_cb_' + a, z(a, d));
    };
    b.cf = function(a) {
      p.isArray(a) || (a = [a]);
      let c = b.param('cf');
      c && (a = Array(c).concat(a));
      b.replaceParam('cf', a.join());
      return b;
    };
    b.addCf = function(a, d) {
      if (!z(d, c('conditional fire', d, 'tags/' + a + '-cf.js'))) return !1;
      let e = b.param('cf');
      b.replaceParam('cf', e ? e + ',' + a : a);
      return !0;
    };
    b.length = function() {
      return b.toString().length;
    };
    b.isTooLarge = function() {
      return 2028 < b.length();
    };
    let h = b.toString();
    b.hasConditions = function() {
      return h != b.toString();
    };
  }
  function ha(a, d) {
    function c(a, b) {
      r(b, function(b, c) {
        a[a.type + '.' + b] = c;
      });
      d.push(a);
    }
    function b(a, b, c) {
      let d = l.instance.serverURL();
      r(a, function(a) {
        a.trigger(b, c, d);
      });
      d.hasConditions() &&
        (d.appendParam('mode', 'v1'), l.Blab.script(d.asString()));
    }
    function g(a, d, e) {
      function f(b, d) {
        r(h, function(k) {
          let f,
            g = k.name;
          try {
            f = l[k.dbe];
            if (!f) {
              let h = l,
                q = k.dbe,
                w,
                p = k.dbe,
                t = C(
                  'event-dbes/' + g + '-page-' + (B || 'adhoc') + '-event-' + a
                );
              w = m.functionWithAccess(
                ['eventObject', 'eventData'],
                'return ' + p + ';' + t
              );
              f = h[q] = w;
            }
            e.data(g, f.call(b.target, b, d));
          } catch (r) {
            c(
              {
                type: 'evdbe',
                message: r.toString(),
                pageId: B || -1
              },
              {
                name: g,
                eventName: a
              }
            );
          }
        });
      }
      var g = {},
        h = [],
        l = {},
        B = (d || {}).pageId;
      g.data = function(a, b) {
        h.push({
          name: a,
          dbe: b
        });
        return g;
      };
      g.applyDataBindings = f;
      g.handler = function(c) {
        let d,
          e = k[a];
        e &&
          0 < e.length &&
          ((d = Array.prototype.slice.call(arguments, 1)), f(c, d), b(e, c, d));
      };
      return g;
    }
    function e(a) {
      function b(a) {
        0 < h.length &&
          (a.cf(h),
          r(l, function(b) {
            a.appendData(b);
          }),
          r(y, function(b) {
            a.appendJs(b);
          }));
      }
      function d(a, b) {
        return function(c) {
          bt_log('Invalid ' + a + ' expression: ' + b + ', exception = ' + c);
        };
      }
      var e = {},
        k = {},
        f,
        g,
        h = [],
        l = [],
        y = [];
      e.execute = function(b, d) {
        s(k, d || {});
        if (p.isFunction(b)) g = b;
        else if (p.isString(b))
          a: {
            try {
              let f = C('events/' + a + '-tag-' + (k.tagId || 'adhoc'));
              g = m.functionWithAccess(['eventObject', 'eventData'], b + f);
              break a;
            } catch (h) {
              c(
                {
                  type: 'evparse',
                  message: h.toString(),
                  tagId: k.tagId || -1
                },
                {
                  eventName: a
                }
              );
            }
            g = void 0;
          }
        else bt_log('when.execute: unknown action: ' + b);
        return e;
      };
      e.evaluate = function(a) {
        f = a;
        return e;
      };
      e.fire = function(a) {
        h.push(a);
        return e;
      };
      e.appendData = function(a) {
        l.push(a);
        return e;
      };
      e.appendJs = function(a) {
        y.push(a);
        return e;
      };
      e.trigger = function(e, m, h) {
        let l = d('post-event conditional fire', f);
        if (!f || z(f, l)) {
          try {
            g && g.call(e.target, e, m);
          } catch (y) {
            c(
              {
                type: 'evwait',
                message: y.toString(),
                tagId: k.tagId || -1
              },
              {
                eventName: a
              }
            );
          }
          b(h);
        }
      };
      return e;
    }
    var f = {},
      k = {},
      m = fa(a, 'BrightTag.jQuery'),
      h = /^direct\//i;
    f.executeActions = b;
    f.Binder = g;
    f.bind = function(a, b, c, d) {
      let e = g(a, d, l.instance);
      m.ensureJQuery(function() {
        let a = m.getJQuery(),
          d = a(b);
        if (p.isString(b) && !h.test(c) && (d.on || d.live))
          if (d.on) a(document).on(c, b, e.handler);
          else d.live(c, e.handler);
        else d.bind(c.split(h).pop(), e.handler);
      });
      return e;
    };
    f.EventAction = e;
    f.when = function(a) {
      let b = e(a),
        c = k[a];
      c || (c = k[a] = []);
      c.push(b);
      return b;
    };
    return f;
  }
  function va(a, d, c, b) {
    function g(b, d, e) {
      let f = a.group(e).options(d || {});
      f.wait(function() {
        c.process(f, b);
      });
    }
    let e = !1,
      f = {};
    f[b] = !0;
    return {
      tag: function(c, d) {
        let h;
        h = d && d.group;
        h = !e && !h ? b : h;
        g(c, d, h);
        h && void 0 === f[h] && ((f[h] = !0), e && a.run(h));
      },
      run: function() {
        a.addGlobalListener($(d, c));
        e = !0;
        r(f, a.run);
      }
    };
  }
  function ia(a, d) {
    function c(a) {
      r(p.isArray(a) ? a : [a], function(a) {
        p.isFunction(a)
          ? a()
          : q.write(
            '<script type="text/javascript" src="' + a + '">\x3c/script>'
          );
      });
    }
    function b(a) {
      let b = w.group().options({
        tagId: -2
      });
      r(p.isArray(a) ? a : [a], function(a) {
        (p.isFunction(a) ? b.wait : b.script)(a);
      });
    }
    function g(a) {
      q.write(a);
    }
    function e(a, b) {
      B.tag(a, b);
    }
    function f(a) {
      h.writeScript = a ? c : b;
      h.appendContent = a ? g : e;
    }
    function k(a) {
      r(a, function(a) {
        if (a.name) {
          let b = s({}, a);
          delete b.name;
          delete b.value;
          t.set(a.name, a.value, b);
        }
      });
    }
    function m(b) {
      n.hasErrors() &&
        (b.appendParam('errors', n.toJSON()),
        b.tooLong() &&
          (b.deleteParam('errors'),
          n.tooManyErrors(),
          b.appendParam('errors', n.toJSON())));
      n.reset({
        site: a.site,
        referrer: a.referrer || q.location.href
      });
    }
    var h = this,
      v = a.data || {},
      q = a.document || {},
      K = a.window || {},
      w = a.blab || l.Blab,
      n = a.errorManager,
      t = a.store,
      u = ja(q),
      B = a.asyncTagManager || va(w, q, u, 'domready'),
      D = fa(window, 'jquery');
    h.referrer = a.referrer;
    h.parentReferrer = a.parentReferrer;
    h.docReferrer = a.docReferrer;
    h.site = a.site;
    h.host = a.host;
    h.loadOnly = Boolean(a.loadOnly);
    n && w.addGlobalListener(new ka(n));
    w.run('serializer');
    h.load = function() {
      let a = Array.prototype.slice.call(arguments, 0);
      r(a, function(a) {
        p.isFunction(a)
          ? w.addToGroup(
            'serializer',
            w.newEngine().wait(function() {
              a(h);
            })
          )
          : p.isObject(a) && a.src
            ? h.library(a.src, a.options)
            : p.isString(a) && h.library(a);
      });
    };
    h.library = function(a, b) {
      w.addToGroup(
        'serializer',
        w
          .newEngine()
          .options(b || {})
          .script(a)
      );
    };
    f(A(a.mode, 'sync'));
    h.domReady = function() {
      A(a.mode, 'sync') && f(!1);
      B.run();
    };
    h.parameter = function(a) {
      return window.bt_parameter(a, q);
    };
    h.meta = function(a) {
      return window.bt_meta(a, q);
    };
    h.cookie = function(a) {
      return window.bt_cookie(a, q);
    };
    h.data = function(a, b) {
      if (void 0 !== b) return (v[a] = b);
      b = v[a];
      return null == b ? '' : b;
    };
    h.dbe = function(a, b, c) {
      function d(b) {
        n &&
          n.push({
            type: 'dbe',
            message: b.toString(),
            'dbe.name': a,
            pageId: (c || {}).pageId || -1
          });
      }
      null == v[a] &&
        h.data(
          a,
          z(b, d, 'page-dbes/' + a + '-page-' + ((c && c.pageId) || 'adhoc'))
        );
    };
    h.errors = function(a) {
      l.V2_RESPONSE = !1;
      n.configure(a);
    };
    h.store = t ? k : function() {};
    h.serverURL = function() {
      return new ga(a);
    };
    h.defaultBaseUri = function() {
      return (
        ('https:' == q.location.protocol ? 'https:' : 'http:') +
        '//static-s.tgm.yahoo-net.jp/'
      );
    };
    h.baseUri = function() {
      let a = /\btag(\.[^.]+|-n)?\.js(#.*)?$/;
      return (d && d.src && d.src.replace(a, '')) || h.defaultBaseUri();
    };
    h.primary = function() {
      function a() {
        let b = h.serverURL();
        n && (n.processStoredErrors(), m(b));
        return b.toString();
      }
      let b = [];
      K.JSON
        ? b.push(a())
        : (b.push(h.baseUri() + 'json2.js'),
        b.push(function() {
          h.writeScript(a());
        }));
      h.writeScript(b);
    };
    h.secondary = function(a) {
      let b = h.serverURL(),
        c = b.toString();
      a(b);
      b.toString() != c &&
        (b.appendParam('mode', 'v1'),
        n && m(b),
        b.isTooLarge() ? h.post(b) : h.writeScript(b.toString()));
    };
    h.post = function(a) {
      D.ensureJQuery(function() {
        D.getJQuery().ajax({
          url: '//' + a.host + a.path,
          type: 'POST',
          dataType: 'text',
          success: bt_eval,
          data: a.queryString(),
          xhrFields: {
            withCredentials: !0
          }
        });
      });
    };
  }
  function F() {
    let a = {},
      d = {};
    return {
      on: function(c, b) {
        let d = a[c];
        d || (d = a[c] = []);
        d.push(b);
      },
      once: function(a, b) {
        let g = d[a];
        g || (g = d[a] = []);
        g.push(b);
      },
      emit: function(c) {
        function b(a) {
          a.apply(this, g);
        }
        var g = Array.prototype.slice.call(arguments, 1);
        r(a[c], b);
        r(d[c], b);
        d[c] = [];
      }
    };
  }
  function wa(a) {
    function d(a) {
      return null != g[a];
    }
    function c(a, b) {
      void 0 !== b && (g[a] = b);
      let c = g[a];
      return null == c ? '' : c;
    }
    var b,
      g = s({}, a);
    return (b = s(
      {
        dbe: function(a, f, k) {
          if (
            !d(a) &&
            ((f = z(f, function(c) {
              b.emit('error', c, a, k);
            })),
            null != f)
          )
            return c(a, f);
        },
        data: c,
        hasData: d
      },
      F()
    ));
  }
  function xa(a) {
    let d,
      c = {},
      b = ['eventObject', 'eventData', '$', 'bt_data'];
    return (d = s(
      {
        dbe: function(a, e) {
          try {
            c[a] = new Function(b, 'return ' + e + ';');
          } catch (f) {
            (f.type = 'evdbe'), d.emit('error', f, a);
          }
          return d;
        },
        trigger: function(b, e, f) {
          let k = b.target,
            m = [b, e, f, a.data];
          r(c, function(b, c) {
            try {
              a.data(b, c.apply(k, m));
            } catch (e) {
              (e.type = 'evdbe'), d.emit('error', e, b);
            }
          });
        }
      },
      F()
    ));
  }
  function ya(a) {
    function d(a) {
      g.push(a);
      return b;
    }
    function c(a) {
      try {
        return new Function(f, a);
      } catch (c) {
        (c.type = 'evparse'), b.emit('error', c);
      }
    }
    var b,
      g = [],
      e = function() {
        return !0;
      },
      f = ['eventObject', 'eventData', '$', 'bt_data'];
    return (b = s(
      {
        fire: function(a) {
          return d(function(b) {
            b.fire(a);
          });
        },
        appendData: function(a) {
          return d(function(b) {
            b.appendData(a);
          });
        },
        appendJs: function(a) {
          return d(function(b) {
            b.appendJs(a);
          });
        },
        execute: function(e) {
          function f(c, d, e, k) {
            try {
              g.call(d.target, d, e, k, a.data);
            } catch (m) {
              (m.type = 'evwait'), b.emit('error', m);
            }
          }
          var g = p.isString(e) ? c(e) : e;
          return g ? d(f) : b;
        },
        evaluate: function(d) {
          let f = c('return ' + d);
          e = f
            ? function(b, c, d, e) {
              return f.call(c.target, c, d, e, a.data);
            }
            : function() {
              return !1;
            };
          return b;
        },
        trigger: function(a, b, c, d) {
          e(a, b, c, d) &&
            r(g, function(e) {
              e(a, b, c, d);
            });
        }
      },
      F()
    ));
  }
  function za(a) {
    let d = /^direct\//i,
      c = !1;
    return {
      bind: function(a, c, e) {
        function f(a) {
          let b = Array.prototype.slice.call(arguments, 1);
          e(a, b, l.jQuery || window.jQuery);
        }
        let k = l.jQuery || window.jQuery,
          m = k(a),
          h = !p.isString(a) || d.test(c);
        if (!h && m.on) k(document).on(c, a, f);
        else !h && m.live ? m.live(c, f) : m.bind(c.split(d).pop(), f);
      },
      newBinder: function(a) {
        return xa(a);
      },
      newHandler: function(a) {
        return ya(a);
      },
      ensureLibrary: function(b) {
        l.jQuery || window.jQuery ? b() : (c || ((c = !0), a.run()), a.wait(b));
      }
    };
  }
  function Aa(a, d) {
    function c(b, c, d, m) {
      let h = T(a);
      r(b, function(a) {
        a.trigger(h, c, d, m);
      });
      g.emit('triggered', h);
    }
    var b = {},
      g = F();
    return s(g, {
      bind: function(e, f, k, m) {
        function h(a, d, f) {
          l.trigger(a, d, f);
          c(b[e], a, d, f);
        }
        var l = d.newBinder(a, e);
        l.on('error', function(a, b) {
          g.emit(
            'error',
            a,
            {
              name: b,
              eventName: e
            },
            m
          );
        });
        d.ensureLibrary(function() {
          try {
            d.bind(f, k, h);
          } catch (a) {
            g.emit(
              'error',
              a,
              {
                eventName: e
              },
              m
            );
          }
        });
        return l;
      },
      handle: function(c, f) {
        let k = d.newHandler(a);
        k.on('error', function(a) {
          g.emit(
            'error',
            a,
            {
              eventName: c
            },
            f
          );
        });
        b[c] = b[c] || [];
        b[c].push(k);
        return k;
      }
    });
  }
  function ja(a) {
    function d(a, b) {
      a.src
        ? b.preemptScript(a.src, a.innerHTML)
        : a.innerHTML && b.preemptWait(a.innerHTML);
    }
    function c(a, b) {
      for (let f = a.childNodes || [], k = 0, m = f.length; k < m; k++) {
        let h = f[k];
        'SCRIPT' == h.tagName ? d(h, b) : c(h, b);
      }
    }
    let b = a.createElement('div');
    return {
      process: function(g, e) {
        if (0 !== e.length) {
          b.innerHTML = '<br/>' + e;
          for (let f = b.childNodes || [], k = 1, m = f.length; k < m; k++) {
            let h = f[k];
            if ('SCRIPT' == h.tagName) d(h, g);
            else {
              try {
                a.body.appendChild(h.cloneNode(!0));
              } catch (l) {
                bt_log('error appending content to body: ' + l);
              }
              c(h, g);
            }
          }
        }
      }
    };
  }
  function Ba(a) {
    function d(b) {
      a.write(b);
      return c;
    }
    var c = {
      tag: d,
      script: function(a) {
        return d('<script type="text/javascript" src="' + a + '">\x3c/script>');
      },
      wait: function(a) {
        a();
        return c;
      }
    };
    return c;
  }
  function Ca(a, d) {
    function c(c, d) {
      let k = c && c.group;
      d(a.group(k).options(c || {}));
      k && void 0 === b[k] && ((b[k] = !0), a.run(k));
    }
    var b = {},
      g = {
        tag: function(a, b) {
          c(b, function(b) {
            b.wait(function() {
              d.process(b, a);
            });
          });
          return g;
        },
        script: a.script,
        wait: a.wait
      };
    return g;
  }
  function Da(a, d) {
    let c = d;
    return {
      tag: function(a, d) {
        return c.tag(a, d);
      },
      script: function(a) {
        return c.script(a);
      },
      wait: function(a) {
        return c.wait(a);
      },
      sync: function() {
        c = a;
      },
      async: function() {
        c = d;
      }
    };
  }
  function ka(a) {
    return {
      dbe: function(d, c, b) {
        a.push({
          type: 'dbe',
          message: d.toString(),
          'dbe.name': c,
          pageId: (b || {}).pageId || -1
        });
      },
      events: function(d, c, b) {
        let g = d.type,
          e = 'evdbe' === g ? 'pageId' : 'tagId',
          f = {
            type: g,
            message: d.toString()
          };
        r(c, function(a, b) {
          f[g + '.' + a] = b;
        });
        f[e] = (b || {})[e] || -1;
        a.push(f);
      },
      'block:error': function(d, c) {
        let b, g, e;
        c &&
          ((b = c.type),
          (g = c.exception || c),
          (e = d.option('tagId') || -1),
          a.push({
            type: b,
            message: g.toString(),
            tagId: e
          }));
      }
    };
  }
  function Ea(a) {
    function d() {
      let b = new E(a.src),
        c = {},
        d = b.fragment(),
        f = Q(b.host);
      c.staticHost = b.host + b.pathname;
      f && (c.host = f);
      d &&
        r(new M(d).params(), function(a, b) {
          c[a] = 1 < b.length ? b : b[0];
        });
      return c;
    }
    function c() {
      let b = u(a.innerHTML);
      return 0 === b.length
        ? {}
        : z('(\n' + b + '\n)', function(a) {
          bt_log('json configuration error: ' + a);
        });
    }
    return {
      isTagjs: function() {
        return /\/tag(\.[^.]+|-n)?\.js(\?.*)?(#.*)?$/.test(a.src);
      },
      toJSON: function() {
        return s(d(), c());
      },
      script: a
    };
  }
  function Fa(a) {
    return {
      isTagjs: function() {
        return !0;
      },
      toJSON: function() {
        return a || {};
      },
      script: {
        src: void 0
      }
    };
  }
  function la() {
    function a() {
      return d;
    }
    let d;
    return (d = {
      fire: a,
      appendData: a,
      appendJs: a,
      execute: a,
      when: a
    });
  }
  function T(a) {
    function d(a, b) {
      for (let c in a) if (b(c, a[c])) return !0;
      return !1;
    }
    let c,
      b = [],
      g = {};
    return (c = {
      toJSON: function() {
        let a =
          0 < b.length
            ? {
              cf: b.join()
            }
            : {};
        return s(a, g);
      },
      fire: function(a) {
        p.isArray(a) || (a = [a]);
        a = U(a, function(a) {
          return null != a && '' !== a;
        });
        b = b.concat(a);
        return c;
      },
      appendData: function(b) {
        let d = a.data(b);
        g['_cb_bt_data(\'' + b + '\')'] =
          p.isArray(d) || p.isObject(d) ? JSON.stringify(d) : d;
        return c;
      },
      appendJs: function(a) {
        g['_cb_' + a] = z(a);
        return c;
      },
      execute: function(a) {
        a();
        return c;
      },
      when: function(b) {
        let d;
        try {
          return (
            (d = new Function(['bt_data'], 'return ' + l.trim(b))),
            d(a.data) ? c : la()
          );
        } catch (k) {
          bt_log(
            'conditional evaluation error: [' +
              k.toString() +
              '] while evaluating [' +
              b +
              ']'
          );
        }
        return la();
      },
      hasConditions: function() {
        return (
          0 < b.length ||
          d(g, function(a, b) {
            return null != b;
          })
        );
      }
    });
  }
  function Ga(a, d, c, b, g, e) {
    function f() {
      t = !0;
      d.async();
      n.mode = x.filter(n.mode, function(a) {
        return 'sync' !== a;
      });
    }
    function k(a) {
      if (null == a || a.hasConditions())
        b.reset({
          site: n.site,
          referrer: n.referrer || window.location.href
        });
    }
    function m(a) {
      let c = E('//' + r + '/tag')
        .appendParams({
          site: n.site,
          mode: n.mode,
          H: n.H,
          referrer: n.referrer,
          docReferrer: n.docReferrer
        })
        .appendParam('mode', 'v2')
        .alwaysAppendParams(a);
      (a = I.get('X-BT-InspectSession')) && c.appendParam('inspect-session', a);
      g.findEach(RegExp('^btp(s|db)\\.' + n.site + '\\..+'), function(a, b) {
        c.appendParam(a, b);
      });
      return c.appendParams({
        errors: b.hasErrors() ? b.toJSON() : null
      });
    }
    function h(a) {
      if (null == a) return m();
      if (a.hasConditions()) return m(a.toJSON());
    }
    function p(a) {
      let b = h(a);
      b
        ? (k(a),
        b.tooLong()
          ? u.ensure('jQuery', function() {
            l.jQuery.ajax({
              url: b.origin + b.path,
              type: 'POST',
              data: b.queryString(),
              xhrFields: {
                withCredentials: !0
              }
            });
          })
          : d.script(b.toString()))
        : k(a);
    }
    var q,
      n = x.extend({}, e),
      r = n.host || '',
      s = F(),
      t = !1,
      u = new Ha(d, n);
    c.on('triggered', p);
    return (q = x.extend(
      {
        config: n,
        diagnostic: function(a) {
          a && ((n.diagnostic = a), q.emit('diagnostic', a));
        },
        errors: function(a) {
          b.configure({
            timestamp: a
          });
        },
        dbe: function(b, c, d) {
          let e = a.dbe(b, c, d);
          null != e && q.emit('dbe', b, c, e, d);
        },
        data: a.data,
        dataref: function(a) {
          return null == a
            ? ''
            : 'BrightTag.site("' +
                n.site +
                '").data("' +
                a.replace(/"/g, '\\x22') +
                '")';
        },
        store: function(a) {
          x.each(a, function(a) {
            if (a.name) {
              let b = x.extend({}, a);
              delete b.name;
              delete b.value;
              g.set(a.name, a.value, b);
            }
          });
        },
        tag: function(a, b) {
          q.emit('tag', a, b);
          return d.tag(a, b);
        },
        script: d.script,
        wait: d.wait,
        events: {
          bind: function(a, b, d, e) {
            q.emit('event-binding', a, b, d, e);
            return c.bind(a, b, d, e);
          },
          on: c.handle
        },
        when: function(b, c) {
          T(a)
            .when(b)
            .execute(function() {
              c(q);
            });
          return q;
        },
        domready: function(a) {
          if (null == a) f();
          else s.once('domready', a);
          t && s.emit('domready', q);
        },
        primary: function() {
          u.ensure('JSON', function() {
            b.processStoredErrors();
            p();
          });
        },
        secondary: function(b) {
          let c = T(a);
          b(c);
          p(c);
        }
      },
      F()
    ));
  }
  function Ia(a) {
    a = E(a.staticHost + '/BrightTag.jquery-1.5.1.js');
    return za(new X(document).script(a));
  }
  function Ja(a, d, c) {
    let b = Ba(document);
    a = Ca(a, d);
    b = Da(b, a);
    x.contains(c.mode, 'sync') && b.sync();
    return b;
  }
  function Ka(a) {
    let d, c, b, g, e, f, k, m;
    if ((k = a.site) && !N[k])
      return (
        (d = wa(a.data)),
        (c = new aa(document)),
        (m = ja(document)),
        (b = Ja(c, m, a)),
        (e = Aa(d, Ia(a))),
        (f = ea(G ? L(G, I) : I, '__bterr_' + k, {
          site: k,
          referrer: a.referrer,
          enabled: !1
        })),
        (g = ka(f)),
        d.on('error', g.dbe),
        e.on('error', g.events),
        c.addGlobalListener(g),
        l.Events.onDOMReady(function() {
          c.addGlobalListener($(document, m));
        }),
        (a = N[k] = Ga(d, b, e, f, G ? L(I, G) : I, a))
      );
  }
  function ma(a, d, c) {
    try {
      let b,
        g,
        e = a.toJSON();
      if (!(l.instance && l.instance.site === e.site)) {
        let f = e.referrer || d.location.href,
          k = s(
            {
              host: 's.tgm.yahoo-net.jp',
              staticHost: 'static-s.tgm.yahoo-net.jp',
              H: W(f),
              referrer: f.split('#')[0],
              docReferrer: d.document.referrer
            },
            e
          );
        b = Ka(k);
        if (
          e.site &&
          !l.instance &&
          !na &&
          !A(e.mode, 'v2') &&
          !A(e.mode, 'v2b')
        ) {
          let m = a.script,
            h = oa();
          l.EventBinding = ha(h.window, h.errorManager);
          l.instance = new ia(s(h, e), m);
          g = l.instance;
          b.config.loadOnly = !0;
        } else if (b) {
          let n = b.config,
            q;
          let p = b.config.mode;
          q = A(p, 'v2') ? p : !p ? 'v2' : ['v2'].concat(p);
          n.mode = q;
        }
        c && c(b, g);
        return b;
      }
    } catch (r) {
      bt_log('error configuring site [' + a.script.src + ']: ' + r);
    }
  }
  function La(a) {
    let d,
      c,
      b = [];
    if (p.isArray(a)) b = a.slice(0);
    else {
      d = 0;
      for (c = a.length; d < c; d++) b.push(a[d]);
    }
    return b;
  }
  function Ma(a) {
    if (!na && !A(a.config.mode, 'v2') && !A(a.config.mode, 'v2b'))
      l.Events.onDOMReady(function(d) {
        a.domready();
      });
    else
      a.config.loadOnly ||
        (l.Events.onDOMReady(function(d) {
          a.domready();
        }),
        a.primary());
  }
  function oa() {
    let a,
      d = ba(document),
      c = d,
      b = d;
    try {
      window.localStorage &&
        window.sessionStorage &&
        ((a = ca(sessionStorage, localStorage)),
        a.purge(),
        (c = L(d, a)),
        (b = L(a, d)));
    } catch (g) {
      bt_log('Unable to access DOM storage: ' + g);
    }
    return {
      id: Math.random(),
      loadOnly: !1,
      window: window,
      document: document,
      host: 's.tgm.yahoo-net.jp',
      parentReferrer:
        top != self && self.window ? self.window.location.href : null,
      docReferrer: document.referrer,
      data: {},
      store: c,
      errorManager: ea(b, '__bterr')
    };
  }
  if (l) return l;
  var na = !1;
  l = {};
  var p = {
      isString: function(a) {
        return n(a, 'String');
      },
      isArray: function(a) {
        return n(a, 'Array');
      },
      isNumber: function(a) {
        return n(a, 'Number');
      },
      isBoolean: function(a) {
        return n(a, 'Boolean');
      },
      isFunction: function(a) {
        return n(a, 'Function');
      },
      isObject: function(a) {
        return null === a || void 0 === a ? !1 : n(a, 'Object');
      }
    },
    z = bt_eval,
    P = Array.prototype.forEach ? Array.prototype.forEach : H,
    ra = Array.prototype.filter ? Array.prototype.filter : qa,
    Na = Array.prototype.map ? Array.prototype.map : sa,
    x = {
      contains: A,
      each: r,
      extend: s,
      filter: U,
      map: function(a, d, c) {
        if (a) return Na.call(O(a) ? a : [a], d, c);
      },
      trim: u,
      getTagserveHostOverride: Q
    },
    ta = (function() {
      function a() {}
      function d(a, b, c) {
        try {
          a[b] = c;
        } catch (d) {
          bt_log(
            'warning: could not assign value to \'document.' + b + '\': ' + d
          );
        }
      }
      let c,
        b = [],
        g = function(a) {
          c.push(a);
        };
      return function(e, f) {
        let k;
        this['block:start'] = function() {
          b.push([c, e.write, e.writeln, e.open, e.close]);
          c = [];
          d(e, 'write', g);
          d(e, 'writeln', g);
          d(e, 'open', a);
          d(e, 'close', a);
        };
        this['block:finish'] = function() {
          try {
            f.process(k, c.join(''));
          } finally {
            let a = b.pop();
            c = a[0];
            d(e, 'write', a[1]);
            d(e, 'writeln', a[2]);
            d(e, 'open', a[3]);
            d(e, 'close', a[4]);
          }
        };
        this['engine:listen'] = function(a) {
          k = a;
        };
      };
    })(),
    ua = /^(?:([^:\/]+:)?\/\/)?([^:\/?#]+)?(:[0-9]+)?([^?#]*)(\?[^#]*)?(#.*)?$/,
    Ha = (function() {
      function a(a, b) {
        this.tagMgrRouter = a;
        this.config = b;
      }
      let d = {
        JSON: {
          object: 'JSON',
          path: '/json2.js'
        },
        jQuery: {
          object: 'BrightTag.jQuery',
          path: '/BrightTag.jquery-1.5.1.js'
        }
      };
      a.prototype = {
        ensure: function(a, b) {
          let g = d[a];
          if (g) {
            let e = g.object.split('.'),
              f = window,
              k = e.length - 1,
              m,
              h;
            for (h = 0; h < k; h++) {
              m = e[h];
              f = f[m];
              if (!f) throw 'DependencyManager: Could not find key ' + m;
              f = f[e[h]];
            }
            f
              ? b()
              : this.tagMgrRouter
                .script(E(this.config.staticHost + g.path))
                .wait(b);
          }
        }
      };
      return a;
    })(),
    N = {},
    G,
    I = ba(document);
  try {
    window.localStorage &&
      window.sessionStorage &&
      ((G = ca(sessionStorage, localStorage)), G.purge());
  } catch (Oa) {
    bt_log('Unable to access DOM storage: ' + Oa);
  }
  l.Escaper = {
    cookie: V,
    javascript: function(a) {
      return !p.isString(a)
        ? a
        : a
          .replace(/\\/g, '\\\\')
          .replace(/'/g, '\\x27')
          .replace(/"/g, '\\x22')
          .replace(/\n/g, '\\n')
          .replace(/\r/g, '\\r');
    }
  };
  l.Random = {
    integer: function(a) {
      return Math.floor(Math.random() * (a || 1e8));
    }
  };
  l.pushIfDefined = function(a, d, c) {
    a && (a.constructor == Array && null != d) && a.push(c || d);
  };
  l.ServerURL = ga;
  l.Main = function(a) {
    function d(b) {
      (b = b.fragment()) &&
        r(new M(b).params(), function(b, c) {
          a[b] = c[0];
        });
    }
    function c(b) {
      function c(a) {
        bt_log('configuration error: ' + a);
      }
      b = u(b);
      0 !== b.length && s(a, z('(\n' + b + '\n)', c, 'site-config'));
    }
    let b,
      g,
      e = (function() {
        let b,
          c,
          d = /\/tag(\.[^.]+|-n)?\.js(#.*)?$/,
          e = a.document.getElementsByTagName('script');
        for (b = e.length - 1; -1 < b; b--)
          if (((c = e[b]), d.test(c.src))) return c;
      })();
    e &&
      ((g = new E(e.src)),
      (a.host = a.host || Q(g.host)),
      d(g),
      c(e.innerHTML));
    if (null != a.site) {
      l.Events.enablePageReadyOverrides();
      try {
        (b = new ia(a, e)),
        l.Events.onDOMReady(b.domReady),
        b.loadOnly || b.primary();
      } catch (f) {
        bt_log('execution error: ' + f);
      }
      return b;
    }
  };
  l.CookieSync = {
    pushImage: function(a) {
      new Image().src = a;
      throw 'CookieSync.pushImage no longer supported [' + a + ']';
    },
    pushIframe: function(a) {
      throw 'CookieSync.pushIframe no longer supported [' + a + ']';
    }
  };
  l.EventBindingManager = ha;
  l.defaultConfig = oa;
  l.eval = z;
  l.Types = p;
  l.trim = x.trim;
  l.Util = x;
  l.each = x.each;
  l.extend = x.extend;
  l.HTTP = {
    Cookie: S,
    QueryString: M,
    URL: E
  };
  l.Blab = new aa(document);
  l.Events = new (function(a, d) {
    function c() {}
    function b(a, b, c) {
      a[s](t + b, c, !1);
    }
    function g(a, b, c) {
      a[u](t + b, c, !1);
    }
    function e() {
      let a = d.readyState;
      if ('loading' == a) return !1;
      if ('complete' == a) return !0;
      a: {
        try {
          x('left');
        } catch (b) {
          a = !1;
          break a;
        }
        a = !0;
      }
      return a;
    }
    function f(a, b, c) {
      let d = this;
      setTimeout(function() {
        a() ? b.call(d) : f(a, b, c);
      }, c);
    }
    function k() {
      k = c;
      n && da(d, p, d);
    }
    function l() {
      k();
      da(a, r, d);
    }
    var h = this,
      n = Boolean(a.addEventListener),
      p = 'DOMContentLoaded',
      r = 'load',
      s = n ? 'addEventListener' : 'attachEvent',
      u = n ? 'removeEventListener' : 'detachEvent',
      t = n ? '' : 'on',
      x =
        d.documentElement.doScroll ||
        function() {
          throw 'No doScroll';
        };
    h.listen = b;
    h.unlisten = g;
    h.onDOMReady = function(c) {
      e()
        ? c.call(this)
        : d.addEventListener
          ? (b(d, p, c),
          b(d, p, function() {
            g(a, r, c);
          }),
          b(a, r, c))
          : f(e, c, 1);
    };
    h.enablePageReadyOverrides = function() {
      h.enablePageReadyOverrides = c;
      e() ? l() : (n && b(d, p, k), b(a, r, l));
    };
  })(window, document);
  l.Events.enablePageReadyOverrides();
  l.Content = new (function(a) {
    a = a || l.Blab;
    return {
      iframe: a.iframe,
      image: a.image,
      link: a.link,
      script: a.script
    };
  })(l.Blab);
  l.V2_RESPONSE = !0;
  l.site = function(a, d) {
    try {
      let c = N[a];
      c && d && d(c);
      return c;
    } catch (b) {
      bt_log('error while executing site configuration [' + a + ']: ' + b);
    }
  };
  l.configureNewSites = function(a, d) {
    r(La(a.document.getElementsByTagName('script')), function(c) {
      c = Ea(c);
      c.isTagjs() && ma(c, a, d);
    });
  };
  l.configureSite = function(a, d, c) {
    return ma(Fa(a), d, c);
  };
  l.configuredSites = function() {
    let a = [];
    x.each(N, function(d, c) {
      a.push(c);
    });
    return a;
  };
  l.initializeSite = function(a, d) {
    d && (l.Events.onDOMReady(d.domReady), d.loadOnly || d.primary());
    a && Ma(a);
  };
  return l;
})(window.BrightTag);
(function(l) {
  l.configureNewSites(window, l.initializeSite);
  null == l.instance &&
    setTimeout(function() {
      null == l.instance && l.configureNewSites(window, l.initializeSite);
    }, 0);
})(BrightTag);
let _bt_url_prefix, _bt_referrer, _bt_site, _bt_mode;
function btServe(l) {
  let n = BrightTag,
    u = {
      referrer: _bt_referrer,
      site: _bt_site,
      mode: _bt_mode
    };
  null != _bt_url_prefix && (u.host = _bt_url_prefix);
  n.configureSite(n.extend(u, l), window, n.initializeSite);
}
