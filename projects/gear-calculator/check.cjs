const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(__dirname + '/Gear_Calculator.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const context = { module: { exports: {} } };
vm.runInNewContext(script, context);
const calculate = context.module.exports.calculateTrain;
const cases = [
  [[20,40], ['mesh'], 1,100, 2,2,50,-1],
  [[40,20], ['mesh'], 1,100, .5,.5,200,-1],
  [[20,80,40], ['mesh','mesh'], 1,100, 2,2,50,1],
  [[12,36,10,40], ['mesh','shaft','mesh'], 1,120, 12,12,10,1],
  [[40,20], ['chain'], 1,100, .5,.5,200,1],
  [Array(9).fill(20), Array(8).fill('mesh'), 1,100, 1,1,100,1],
  [[20,40], ['mesh'], 0,0, 2,0,0,-1],
  [[2.5,7.5], ['mesh'], 2,90, 3,6,30,-1],
  [[20,40], ['shaft'], 2,90, 1,2,90,1],
  [[20,40,10], ['chain','mesh'], 2,90, .5,1,180,-1],
  [[20,40], ['mesh'], 0,100, 2,0,50,-1],
  [[20,40], ['mesh'], 1,0, 2,2,0,-1],
  [[20,40,80], ['shaft','shaft'], 3,120, 1,3,120,1]
];
for (const [sizes,links,t,r,ratio,torque,speed,direction] of cases) {
  const out = calculate(sizes,links,t,r).at(-1);
  for (const [key,expected] of Object.entries({ratio,torque,speed,direction})) assert.equal(out[key],expected);
}
// Reject invalid programmatic calls as well as invalid form input.
const invalid = [
  [null, ['mesh'], 1, 100],
  [[20], [], 1, 100],
  [Array(10).fill(20), Array(9).fill('mesh'), 1, 100],
  [[0, 40], ['mesh'], 1, 100],
  [[-20, 40], ['mesh'], 1, 100],
  [[NaN, 40], ['mesh'], 1, 100],
  [[Infinity, 40], ['mesh'], 1, 100],
  [[20, 40], [], 1, 100],
  [[20, 40], ['unknown'], 1, 100],
  [[20, 40], Array(1), 1, 100],
  [[20, , 40], ['shaft', 'shaft'], 1, 100],
  [[20, 40], ['mesh'], -1, 100],
  [[20, 40], ['mesh'], 1, -100],
  [[20, 40], ['mesh'], '1', 100],
  [[20, 40], ['mesh'], 1, Infinity],
  [[1e-200, 1e200], ['mesh'], 1, 100],
  [[1e200, 1e-100], ['mesh'], 1e-100, 1e-100]
];
for (const args of invalid) assert.throws(() => calculate(...args), { name: 'RangeError' });

// Fixed-seed comparisons: independent log-ratio reference plus ideal-power
// conservation and direction parity at every stage of each generated train.
let seed = 3665;
const random = n => {
  seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
  return Math.floor(seed / 0x100000000 * n);
};
const close = (actual, expected) => assert.ok(
  Math.abs(actual - expected) <= 1e-10 * Math.max(1, Math.abs(expected)),
  `${actual} differs from ${expected}`
);
const generatedCount = 2000;
for (let test = 0; test < generatedCount; test++) {
  const count = 2 + test % 8;
  const sizes = Array.from({ length: count }, () => 1 + random(200));
  const links = Array.from({ length: count - 1 }, () => ['mesh', 'shaft', 'chain'][random(3)]);
  const inputTorque = (1 + random(100)) / 10;
  const inputSpeed = 1 + random(1000);
  const sizesBefore = [...sizes], linksBefore = [...links];
  const stages = calculate(sizes, links, inputTorque, inputSpeed);
  assert.equal(stages.length, count);
  let logRatio = 0, meshCount = 0;
  stages.forEach((stage, i) => {
    if (i > 0) {
      if (links[i - 1] !== 'shaft') logRatio += Math.log(sizes[i]) - Math.log(sizes[i - 1]);
      if (links[i - 1] === 'mesh') meshCount++;
    }
    const ratio = Math.exp(logRatio);
    close(stage.ratio, ratio);
    close(stage.torque, inputTorque * ratio);
    close(stage.speed, inputSpeed / ratio);
    close(stage.torque * stage.speed, inputTorque * inputSpeed);
    assert.equal(stage.direction, meshCount % 2 ? -1 : 1);
  });
  assert.deepEqual(sizes, sizesBefore);
  assert.deepEqual(links, linksBefore);
}
console.log(`${cases.length} known-output cases, ${invalid.length} invalid-input cases, and ${generatedCount} generated trains passed.`);
