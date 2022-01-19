const miningSpeed = [
  6.0,
  7.5,
  12.0,
  24.0,
  60.0,
  80.0
]

export function getMiningSpeed(minerLevel) {
  return miningSpeed[minerLevel - 1] * 60/* per hour */ / 600 /* time slowdown */
}

const miningBoost = [
  2.0,
  2.5,
  3.0,
  3.5,
  4.0,
  4.5,
  5.0,
  6.0,
  7.0,
  8.0,
  9.0,
  10.0,
]

export function getMiningBoost(miningBoostLevel) {
  return miningBoost[miningBoostLevel - 1]
}


const remoteMining = [
  0.36,
  0.40,
  0.45,
  0.51,
  0.57,
  0.64,
  0.72,
  0.81,
  0.90,
  1
]

export function getRemoteMining(remoteMiningLevel) {
  return remoteMining[remoteMiningLevel - 1]
}


const miningUnity = [
  0.25,
  0.29,
  0.34,
  0.39,
  0.45,
  0.52,
  0.61,
  0.71,
  0.83,
  1
]

export function getMiningUnity(miningUnityLevel) {
  return miningUnity[miningUnityLevel - 1]
}


const crunchAmount = [
  300,
  350,
  400,
  450,
  500,
  600,
  700,
  800,
  900,
  1000,
  1200,
  1400
]

export function getCrunchAmount(crunchLevel) {
  return crunchAmount[crunchLevel - 1]
}
