# Mr Kepler's Elements

**[Open the live orbital elements viewer](https://philiphoddinott.github.io/mr-keplers-elements/)**

An interactive 3D guide to the six Keplerian orbital elements, with a shared simulation clock, a rotating Blue Marble Earth, and seasonal sunlight.

## Credit

This is adapted from **[Ki-math's Orbital Elements Viewer](https://github.com/Ki-math/orbital-elements-viewer)** ([original live viewer](https://ki-math.github.io/orbital-elements-viewer/)), copied from commit `280d200f8d18c02b4c07d2a341ad3a1aac931d3b`. Ki-math created the original viewer, orbital mechanics, educational explanations, controls, presets, and Japanese/English interface. Thank you for that work. The upstream repository did not include a license file at the time of copying; this repository does not assign a new license to that work.

The Earth uses the supplied `blueMarble.jpg` (NASA Blue Marble imagery). Its exact source metadata was not provided with the file. Three.js r128 and OrbitControls are bundled under their MIT license, included in `vendor/THREE-LICENSE.txt`.

## Controls

- Press **Play / Pause** to advance or stop time. The initial epoch is **21 March 2026, 00:00:00 UTC**.
- Choose **×0.1, ×1, ×10, ×100, ×1000, 1 day/s, or 10 days/s**. The original **1 orbit / 8 s** option adjusts speed to the current orbital period. Satellite motion, Earth spin, and Sun position share this speed.
- Set a UTC date/time or select any of the four **2026 equinoxes and solstices** to jump there. Jumping pauses playback and propagates the current orbit to the selected time. Reset returns the clock to the initial epoch.
- Drag to rotate the camera; scroll to zoom. Use orbit and camera presets or edit all six elements. The interface is in English, and the original J2 precession controls remain available.
- The **yellow arrow points from Earth toward the Sun**. Sunlight comes from that same direction, producing the day/night boundary. Earth spins eastward once per sidereal day (about **23 h 56 m 4 s**) with Greenwich aligned using mean sidereal time.

## Astronomy and assumptions

The solar direction follows low precision geocentric solar equations from [NOAA's Meeus-based solar calculation method](https://gml.noaa.gov/grad/solcalc/calcdetails.html), including approximately 23.44 degrees of obliquity. In the Earth-centered equatorial frame the north pole stays upright, while the Sun's declination changes through the seasons. Greenwich mean sidereal time sets Earth texture orientation. UTC approximates UT1; nutation, precession of the orbit frame, polar motion, eclipses and atmospheric scattering are omitted. This is an educational visualization, not a navigation ephemeris.

The seasonal panel uses [US Naval Observatory event times](https://aa.usno.navy.mil/data/Earth_Seasons), rounded to the nearest minute:

| Event | UTC |
| --- | --- |
| March equinox | 20 March 2026, 14:46 |
| June solstice | 21 June 2026, 08:24 |
| September equinox | 23 September 2026, 00:05 |
| December solstice | 21 December 2026, 20:50 |

March 21 is the requested simulation start; the actual 2026 March equinox is March 20. Seasons are opposite in the southern hemisphere. The panel stays a reference for 2026 even when the clock advances to another year.

Orbits use the two-body model with μ = 398600.4418 km³/s² and Earth radius 6378.137 km. Optional J2 uses orbit-averaged secular changes of Ω and ω. Presets are illustrative, not live tracking data. At very high speeds the satellite remains propagated but its motion can visually alias between rendered frames.

## Run and deploy

This is a static site with no build step. Run `node server.cjs`, then open `http://127.0.0.1:8765`. All JavaScript and the Earth texture are served locally; optional Google Fonts require internet access.

Run `node tests/physics.cjs` to check Kepler propagation, Earth rotation and seasonal solar geometry.

Pushing to `main` runs `.github/workflows/pages.yml` and publishes the static files to GitHub Pages. The repository's Pages source must be **GitHub Actions**.
