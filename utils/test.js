/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
function t() {
  const e = [
    'application/json',
    'useCache',
    '_cryptoKeyPromise',
    'IS_DEV',
    '269faLYPL',
    'Netscape',
    'hasLocalStorage',
    'https://api.',
    'uaOptions',
    '_auth',
    '&x_api_secret=',
    'getKeys',
    'getItem',
    'type',
    'prototype',
    'QuickTime.QuickTime',
    'Invalid token specified',
    '90714fuWnnq',
    'top',
    'header',
    '25f51da093',
    'fillStyle',
    '5440620LILxIm',
    'AgControl.AgControl',
    'height',
    '1478MFFHvr',
    'json',
    'description',
    'setItem',
    'name',
    'platform',
    'suffixes',
    'shift',
    'toUpperCase',
    ' dodoex.io',
    'canvas',
    'importSecretKey',
    'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
    'dodoex.io',
    'ShockwaveFlash.ShockwaveFlash',
    '_key',
    'map',
    'rmocx.RealPlayer G2 Control.1',
    'getIEPluginsString',
    'Skype.Detection',
    'join',
    'hasOwnProperty',
    'raw',
    'POST',
    'hex',
    '8DFpcfd',
    'includes',
    "14px 'Arial'",
    'parse',
    'stringify',
    'each',
    '?useCache=',
    'message',
    'openDatabase',
    'env',
    'call',
    'B74A9E9B94827454A8C5D9C801F5B428',
    'intervalTime',
    'replace',
    'e3f9d86f1c2e834',
    'language',
    'textBaseline',
    'split',
    'font',
    'addBehavior',
    'createElement',
    'keys',
    '18810407LgyluQ',
    '#069',
    'update',
    'toString',
    'ef5bd7f',
    'getPluginsString',
    'userAgent',
    'https://gateway.dodoex.io/auth',
    'width',
    'importKey',
    'now',
    'fillRect',
    'fromCharCode',
    'rgba(102, 204, 0, 0.7)',
    'pageY',
    'push',
    'from',
    '/g:',
    'getTimezoneOffset',
    '6655422eef1bd78401',
    'body',
    '4226523QoEwZR',
    'fillText',
    '32xGnbFH',
    'sessionStorage',
    'decrypt',
    '###',
    'url',
    'charCodeAt',
    '528E207BE0AF28E68ADCB621AC31A83F',
    '/rs:',
    'ActiveXObject',
    'substr',
    'encrypt',
    'undefined',
    'toDataURL',
    'RealPlayer',
    'appName',
    'floor',
    'pageX',
    'rmocx.RealPlayer G2 Control',
    '&x_api_key=',
    '61629SIkLHO',
    'plugins',
    'applyToken',
    'getCanvasFingerprint',
    'hasher',
    'isIE',
    'concat',
    'hasIndexDb',
    '1975257HrjktL',
    'AcroPDF.PDF',
    '#f60',
    'doNotTrack',
    'PDF.PdfCtrl',
    'xApiKey',
    'SWCtl.SWCtl',
    'SHA-256',
    'setHMACKey',
    '65333432323863353363663233616562',
    'hasSessionStorage',
    'forEach',
    'alphabetic',
    'length',
    'abcdef98',
    'getContext',
    'HEX',
    '5jPxYif',
    'M2MzNjFjYmIyMGIyYTk3NDU4YmU0YTE1NGIyZWI1MjY=',
    '+mGQo8habmHxvbpOVaqJXwKf7dLiuh7N',
    'timeout',
    'isCollectUA',
    'apiKey',
    'getRegularPluginsString',
    'Invalid token specified: ',
    'fit',
    'object',
    'isCanvasSupported',
    'addEventListener',
    'WMPlayer.OCX',
    'crypto',
    'mousemove',
    'f1bd784016655422ee',
  ];
  return (t = function () {
    return e;
  })();
}
const e = s;
!(function () {
  const e = s,
    n = t();
  for (;;)
    try {
      if (
        547660 ===
        (-parseInt(e(385)) / 1) * (parseInt(e(251)) / 2) +
          (-parseInt(e(340)) / 3) * (parseInt(e(276)) / 4) +
          (-parseInt(e(365)) / 5) * (-parseInt(e(398)) / 6) +
          -parseInt(e(319)) / 7 +
          (parseInt(e(321)) / 8) * (-parseInt(e(348)) / 9) +
          parseInt(e(403)) / 10 +
          parseInt(e(298)) / 11
      )
        break;
      n.push(n.shift());
    } catch (t) {
      n.push(n.shift());
    }
})();
import n from 'crypto-js/aes';
import r from 'crypto-js/enc-base64';
import o from 'crypto-js/enc-hex';
import i from 'jssha';
function s(e, n) {
  const r = t();
  return (s = function (t, e) {
    return r[(t -= 251)];
  })(e, n);
}
function a(t) {
  const e = s,
    n = new Uint8Array(Math[e(336)](t[e(361)] / 2));
  let r = 0;
  for (let o = 0; o < t[e(361)]; o += 2) {
    const e = t[o],
      i = t[o + 1] || 0;
    (n[r] = parseInt(e + i, 16)), r++;
  }
  return n;
}
const c = {
    t: function (t) {
      const e = s,
        n = [];
      let r = 0;
      for (t = encodeURI(t); r < t[e(361)]; ) {
        const o = t[e(326)](r++);
        37 === o
          ? (n[e(313)](parseInt(t[e(330)](r, 2), 16)), (r += 2))
          : n[e(313)](o);
      }
      return new Uint8Array(n);
    },
    f: function (t) {
      const e = s,
        n = [];
      let r = 0;
      for (; r < t[e(361)]; ) {
        const o = t[r];
        o < 128
          ? (n[e(313)](String.fromCharCode(o)), r++)
          : o > 191 && o < 224
            ? (n[e(313)](String[e(310)](((31 & o) << 6) | (63 & t[r + 1]))),
              (r += 2))
            : (n[e(313)](
                String[e(310)](
                  ((15 & o) << 12) | ((63 & t[r + 1]) << 6) | (63 & t[r + 2]),
                ),
              ),
              (r += 3));
      }
      return n.join('');
    },
  },
  u = e(362) + '76543210';
const l = c.f(new Uint8Array([65, 69, 83, 45, 67, 66, 67]));
class f {
  constructor(t, n = null) {
    const r = e;
    (this[r(266)] = a(t)),
      (this[r(383)] = this.importSecretKey(this._key)),
      (this._v = n
        ? a(n)
        : new Uint8Array([
            88, 135, 113, 117, 148, 128, 140, 231, 95, 128, 118, 234, 55, 192,
            113, 254,
          ]));
  }
  [e(262)](t) {
    const n = e;
    return window[n(378)].subtle[n(307)](n(273), t, l, !0, ['encrypt', n(323)]);
  }
  async [e(331)](t) {
    const n = e,
      r = await this._cryptoKeyPromise,
      o = await window[n(378)].subtle[n(331)]({ iv: this._v, name: l }, r, t);
    return (function (t) {
      const n = e,
        r = [];
      for (let e = 0; e < t[n(361)]; e++) {
        const o = t[e];
        r[n(313)](u[(240 & o) >> 4] + u[15 & o]);
      }
      return r[n(271)]('');
    })(new Uint8Array(o));
  }
}
function p(t) {
  const n = e;
  let r = t[n(289)](/-/g, '+')[n(289)](/_/g, '/');
  switch (r[n(361)] % 4) {
    case 0:
      break;
    case 2:
      r += '==';
      break;
    case 3:
      r += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  try {
    return (function (t) {
      const n = e;
      return decodeURIComponent(
        atob(t)[n(289)](/(.)/g, (t, e) => {
          const r = n;
          let o = e[r(326)](0).toString(16)[r(259)]();
          return o[r(361)] < 2 && (o = '0' + o), '%' + o;
        }),
      );
    })(r);
  } catch (t) {
    return atob(r);
  }
}
class h {
  constructor(t) {
    const n = e,
      r = Array.prototype.forEach,
      o = Array[n(395)].map;
    (this[n(281)] = function (t, e, o) {
      const i = n;
      if (null !== t)
        if (r && t.forEach === r) t[i(359)](e, o);
        else if (t.length === +t[i(361)]) {
          for (let n = 0, r = t.length; n < r; n++)
            try {
              if (o && 0 === Object[i(297)](e[i(286)](o, t[n], n, t))[i(361)])
                return;
            } catch (error) {
              console.log(error, t, n, o, i);
            }
        } else
          for (const n in t)
            if (
              t[i(272)](n) &&
              0 === Object.keys(e[i(286)](o, t[n], n, t))[i(361)]
            )
              return;
    }),
      (this[n(267)] = function (t, e, r) {
        const i = n,
          s = [];
        return null == t
          ? s
          : o && t[i(267)] === o
            ? t[i(267)](e, r)
            : (this[i(281)](
                t,
                (t, n, o) => {
                  s[s[i(361)]] = e.call(r, t, n, o);
                },
                null,
              ),
              s);
      }),
      typeof t === n(374)
        ? ((this[n(344)] = t[n(344)]), (this[n(261)] = t.canvas))
        : 'function' == typeof t && (this.hasher = t);
  }
  [e(392)]() {
    const t = e,
      n = [];
    return (
      n[t(313)](navigator[t(304)]),
      n[t(313)](navigator[t(291)]),
      n[t(313)](screen.colorDepth),
      n[t(313)](this.getScreenResolution()[t(271)]('x')),
      n[t(313)](new Date()[t(316)]()),
      n[t(313)](this[t(358)]()),
      n[t(313)](this[t(387)]()),
      n.push(this[t(347)]()),
      document[t(318)]
        ? n[t(313)](typeof document[t(318)][t(295)])
        : n[t(313)]('undefined'),
      n[t(313)](typeof window[t(284)]),
      n[t(313)](navigator.cpuClass),
      n[t(313)](navigator[t(256)]),
      n[t(313)](navigator[t(351)]),
      n[t(313)](this[t(303)]()),
      this[t(261)] && this[t(375)]() && n[t(313)](this[t(343)]()),
      n
    );
  }
  get() {
    const t = e,
      n = this[t(392)]();
    return this[t(344)]
      ? this[t(344)](n[t(271)](t(324)), 31)
      : (function (t, n) {
          const r = e;
          let o = 0;
          if (0 === t[r(361)]) return o;
          for (let e = 0; e < t[r(361)]; e++)
            (o = n * ((o << 5) - o) + t[r(326)](e)), (o |= 0);
          return o;
        })(n[t(271)](t(324)), 31);
  }
  [e(387)]() {
    try {
      return !!window.localStorage;
    } catch (t) {
      return !0;
    }
  }
  hasSessionStorage() {
    const t = e;
    try {
      return !!window[t(322)];
    } catch (t) {
      return !0;
    }
  }
  [e(347)]() {
    try {
      return !!window.indexedDB;
    } catch (t) {
      return !0;
    }
  }
  [e(375)]() {
    const t = e,
      n = document[t(296)](t(261));
    return !(!n[t(363)] || !n.getContext('2d'));
  }
  [e(345)]() {
    const t = e;
    return (
      'Microsoft Internet Explorer' === navigator[t(335)] ||
      !(navigator[t(335)] !== t(386) || !/Trident/.test(navigator[t(304)]))
    );
  }
  getPluginsString() {
    const t = e;
    return this.isIE() ? this.getIEPluginsString() : this[t(371)]();
  }
  [e(371)]() {
    const t = e;
    return this.map(
      navigator[t(341)],
      (e) => {
        const n = t,
          r = this[n(267)](
            e,
            (t) => {
              const e = n;
              return [t[e(394)], t[e(257)]][e(271)]('~');
            },
            null,
          ).join(',');
        return [e[n(255)], e[n(253)], r][n(271)]('::');
      },
      this,
    )[t(271)](';');
  }
  [e(269)]() {
    const t = e;
    if (window[t(329)]) {
      const e = [
        t(265),
        t(349),
        t(352),
        t(396),
        t(338),
        t(268),
        t(263),
        'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
        t(334),
        t(354),
        t(377),
        t(404),
        t(270),
      ];
      return this[t(267)](
        e,
        (t) => {
          try {
            return new ActiveXObject(t), t;
          } catch (t) {
            return null;
          }
        },
        null,
      )[t(271)](';');
    }
    return '';
  }
  getScreenResolution() {
    const t = e;
    return screen[t(405)] > screen[t(306)]
      ? [screen[t(405)], screen.width]
      : [screen[t(306)], screen[t(405)]];
  }
  getCanvasFingerprint() {
    const t = e,
      n = document[t(296)](t(261)),
      r = n.getContext('2d'),
      o = 'CANVAS_FINGERPRINT';
    return (
      (r[t(292)] = t(399)),
      (r[t(294)] = t(278)),
      (r[t(292)] = t(360)),
      (r[t(402)] = t(350)),
      r[t(309)](125, 1, 62, 20),
      (r[t(402)] = t(299)),
      r[t(320)](o, 2, 15),
      (r[t(402)] = t(311)),
      r[t(320)](o, 4, 17),
      n[t(333)]()
    );
  }
}
function g(t) {
  const i = e;
  let s;
  const a = r.parse(i(366)),
    c = String(
      null !== (s = t[i(368)]) && void 0 !== s
        ? s
        : Math[i(336)](Date[i(308)]() / 1e3),
    ),
    u = o[i(279)](i(357)),
    l = n[i(331)](c, a, { iv: u }).toString();
  return Buffer[i(314)](l, 'base64')[i(301)](i(275));
}
const d = e(317),
  y = e(380),
  m = e(287),
  w = e(327);
function v(t, i) {
  const s = e;
  let a, c, u, l;
  const f = null !== (a = i.domain) && void 0 !== a ? a : s(260),
    p = s(388) + f,
    h = f !== s(264),
    g = r[s(279)](s(367)),
    v = String(Date[s(308)]() + 36e5),
    S = o[s(279)]('8c5fb8ab9e72736dd2143a0e2f908bf6'),
    C = n[s(331)](v, g, { iv: S })[s(301)](),
    I = encodeURIComponent(C),
    b = null !== (c = i[s(370)]) && void 0 !== c ? c : h ? d : y,
    A = null !== (u = i[s(353)]) && void 0 !== u ? u : h ? m : w,
    x = null === (l = i[s(382)]) || void 0 === l || l;
  return (
    p +
    '/frontend-rpc/' +
    t +
    s(282) +
    (x ? 'true' : 'false') +
    s(391) +
    I +
    '&apikey=' +
    b +
    s(339) +
    A
  );
}
function S({
  resize: t = e(373),
  width: n,
  height: r,
  gravity: o = 'no',
  enlarge: s = 0,
  extension: a = 'webp',
  key: c = '',
  salt: u = '',
  url: l,
  proxyUrl: f = 'https://images.dodoex.io',
}) {
  const p = e,
    h = Buffer[p(314)](l)
      [p(301)]('base64')
      [p(289)](/=/g, '')
      [p(289)](/\//g, '_')
      [p(289)](/\+/g, '-'),
    g =
      p(328) +
      t +
      (n ? ':' + n : '') +
      (r ? ':' + r : '') +
      ':' +
      s +
      p(315) +
      o +
      '/' +
      h +
      '.' +
      a,
    d = new i(p(355), 'BYTES');
  d[p(356)](c, p(364)),
    d[p(300)](
      (function (t) {
        const n = e,
          r = t.toString();
        let o = '';
        for (let t = 0; t < r[n(361)]; t += 2)
          o += String[n(310)](parseInt(r[n(330)](t, 2), 16));
        return o;
      })(u),
    ),
    d[p(300)](g);
  return (
    f +
    '/' +
    d.getHMAC('B64')[p(289)](/=/g, '')[p(289)](/\//g, '_')[p(289)](/\+/g, '-') +
    g
  );
}
function C(t) {
  return localStorage[e(393)](t);
}
const I = [];
let b = 0;
typeof document !== e(332) &&
  document[e(318)][e(376)](e(379), (t) => {
    const n = e;
    I[n(361)] > 50 && I[n(258)](),
      0 === b && I[n(313)]({ x: t[n(337)], y: t[n(312)] }),
      b++,
      b > 5 && (b = 0);
  });
const A = 'AUTH_TOKEN';
let x,
  k,
  E,
  P = [];
async function T(t, n, r, o) {
  const i = e;
  (x = t), (k = n), (P = r), (E = o);
  let w, v, S;
  const s = (null == o ? void 0 : o[i(325)]) || i(305),
    a = [
      r,
      Date[i(308)](),
      t,
      n,
      I,
      {
        id:
          !1 === (null == o ? void 0 : o[i(369)])
            ? ''
            : ((w = null == o ? void 0 : o[i(389)]), new h(w).get()),
      },
    ],
    u = i(401),
    l = i(302),
    p = i(290),
    g = new f(u + l + p),
    d = c.t(JSON[i(280)](a)),
    y = await g[i(331)](d),
    m = await (async function (t = '', n = {}) {
      const r = e;
      return (
        await fetch(t, {
          method: r(274),
          body: JSON[r(280)](n),
          headers: new Headers({ 'Content-Type': r(381) }),
        })
      )[r(252)]();
    })(s, { method: i(342), data: y });
  if (m) {
    const r = {};
    for (const e in m) {
      r[e + '|' + t + '|' + n] = m[e];
    }
    (v = A), (S = JSON[i(280)](r)), localStorage[e(254)](v, S);
  }
  O();
}
const j = 6e5;
let D = null;
function O() {
  const t = e;
  D && clearTimeout(D),
    (D = setTimeout(
      async () => {
        await T(x, k, P, E), O();
      },
      (null == E ? void 0 : E[t(288)]) || j,
    ));
}
async function R(t) {
  const n = e;
  await T(x, k, P[n(277)](t) ? P : P[n(346)]([t]), E);
}
async function N(t, n, r, o) {
  const i = e,
    s = t + '|' + n + '|' + r;
  let a = C(A);
  if (a)
    try {
      const t = JSON.parse(a)[s],
        n = (function (t, n = {}) {
          const r = e;
          if ('string' != typeof t) throw new Error(r(397));
          const o = !0 === n[r(400)] ? 0 : 1;
          try {
            return JSON.parse(p(t[r(293)]('.')[o]));
          } catch (t) {
            throw new Error(r(372) + t[r(283)]);
          }
        })(t);
      if (n.exp > Math[i(336)](Date[i(308)]() / 1e3)) return t;
      a = null;
    } catch {
      a = null;
    }
  if (
    (!a && (await T(n, r, P[i(277)](t) ? P : P[i(346)]([t]), o)), (a = C(A)), a)
  ) {
    return JSON[i(279)](a)[s];
  }
}
function _(t, e) {
  (x = t), (k = e);
}
process[e(285)][e(384)] &&
  (window[e(390)] = { init: T, getAppToken: N, accountsChange: _ });
const F = { init: T, addApp: R, getAppToken: N, accountsChange: _ };
export {
  _ as accountsChange,
  R as addApp,
  F as default,
  g as encryptFiatPriceToken,
  S as generateProxyUrl,
  N as getAppToken,
  v as getRpcUrl,
  T as init,
};
