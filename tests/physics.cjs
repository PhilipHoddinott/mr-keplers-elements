const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = {window:{}};
vm.createContext(context);
for (const file of ['js/orbitMechanics.js','js/astronomy.js']) vm.runInContext(fs.readFileSync(file,'utf8'),context);
const {Astronomy:A,OrbitMechanics:O} = context.window;
const rad=Math.PI/180;
assert.equal(new Date(A.start).toISOString(),'2026-03-21T00:00:00.000Z');
for (const [idx,declination] of [[0,0],[1,23.44],[2,0],[3,-23.44]]) {
  const sky=A.at(Date.parse(A.seasons[idx].utc));
  assert.ok(Math.abs(sky.declination-declination)<0.03, A.seasons[idx].name);
  assert.ok(Math.abs(Math.hypot(...sky.direction)-1)<1e-12);
}
const theta = A.at(A.start).gmst;
const after = A.at(A.start+86164.0905*1000).gmst;
assert.ok(Math.abs(Math.atan2(Math.sin(after-theta),Math.cos(after-theta)))<1e-6,'one sidereal rotation');
const e=.72, a=26600, nu=30*rad;
const M=O.trueToMeanAnomaly(nu,e);
assert.ok(Math.abs(O.meanToTrueAnomaly(M,e)-nu)<1e-10);
const period=2*Math.PI*Math.sqrt(a**3/O.MU);
const advance=dt=>O.meanToTrueAnomaly(((M+Math.sqrt(O.MU/a**3)*dt)%(2*Math.PI)+2*Math.PI)%(2*Math.PI),e);
assert.ok(Math.abs(advance(period)-nu)<1e-10,'one orbital period');
assert.ok(Math.abs(advance(10*86400)-nu)>.01,'satellite moves at day-scale speeds');
for (const eccentricity of [0,.1,.72,.95]) for (let m=0;m<6.28;m+=.13) {
  const n=O.meanToTrueAnomaly(m,eccentricity);
  const back=O.trueToMeanAnomaly(n,eccentricity);
  assert.ok(Math.abs(Math.atan2(Math.sin(back-m),Math.cos(back-m)))<1e-9,'Kepler residual');
}
console.log('Passed: epoch, four seasonal Sun directions, sidereal rotation, Kepler residuals, orbital period and day-scale propagation.');
