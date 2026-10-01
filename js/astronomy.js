/* Low precision geocentric Sun and Greenwich mean sidereal time.
 * NOAA/Meeus solar equations; UTC is used as an approximation to UT1.
 * ECI axes: X = equinox, Z = north pole. Intended for education, not navigation.
 */
(function (global) {
  'use strict';
  const rad = Math.PI / 180;
  const wrap = x => ((x % 360) + 360) % 360;
  function at(ms) {
    const jd = ms / 86400000 + 2440587.5;
    const T = (jd - 2451545) / 36525;
    const L = wrap(280.46646 + T * (36000.76983 + 0.0003032 * T));
    const M = wrap(357.52911 + T * (35999.05029 - 0.0001537 * T)) * rad;
    const C = (1.914602 - T * (0.004817 + 0.000014 * T)) * Math.sin(M)
      + (0.019993 - 0.000101 * T) * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M);
    const omega = (125.04 - 1934.136 * T) * rad;
    const longitude = (L + C - 0.00569 - 0.00478 * Math.sin(omega)) * rad;
    const epsilon = (23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60
      + 0.00256 * Math.cos(omega)) * rad;
    const direction = [Math.cos(longitude), Math.cos(epsilon) * Math.sin(longitude), Math.sin(epsilon) * Math.sin(longitude)];
    const gmst = wrap(280.46061837 + 360.98564736629 * (jd - 2451545)
      + 0.000387933 * T * T - T * T * T / 38710000) * rad;
    return {direction, gmst, declination: Math.asin(direction[2]) / rad};
  }
  // Published US Naval Observatory event times, UTC, rounded to a minute.
  const seasons = [
    {name: 'March equinox', utc: '2026-03-20T14:46:00Z'},
    {name: 'June solstice', utc: '2026-06-21T08:24:00Z'},
    {name: 'September equinox', utc: '2026-09-23T00:05:00Z'},
    {name: 'December solstice', utc: '2026-12-21T20:50:00Z'},
  ];
  global.Astronomy = {at, seasons, start: Date.parse('2026-03-21T00:00:00Z')};
})(window);
