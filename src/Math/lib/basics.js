
// SAMPLE
// let sectors = generateNavMesh(_.cloneDeep(context.value.ws.field.sectors))
export function generateNavMesh(sectors) {
  let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  let shifts = [0, 0, 0, 0, 1, 2, 3];
  let numbers = [1, 2, 3, 4, 5, 6, 7];

  function valid([letter, number]) {
    return sectors[letter + number] !== undefined
  }

  function move(letter, number, hor, ver) {
    let nextLetter = letters[letters.indexOf(letter) + hor]
    let nextNumber = numbers[numbers.indexOf(number) + ver] + shifts[letters.indexOf(letter)] - shifts[letters.indexOf(nextLetter)]

    return [nextLetter, nextNumber]
  }

  const directDistance = 433.33
  const directMoves = [
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: -1, y: -1},
    {x: -1, y: 0},
    {x: 1, y: 0},
    {x: 1, y: 1},
  ]
  const longDistance = 750
  const longMoves = [
    {x: -2, y: -1},
    {x: -1, y: -2},
    {x: -1, y: 1},
    {x: 1, y: -1},
    {x: 1, y: 2},
    {x: 2, y: 1},
  ]

  for(let key in sectors) {
    let [letter, number] = key.split('')
    number = parseInt(number)
    let sector = sectors[key]
    sector.mesh = []

    // direct
    for (let i = 0; i < directMoves.length; i++) {
      const moveD = directMoves[i];
      const testCell = move(letter, number, moveD.x, moveD.y)
      if (valid(testCell)) {
        sector.mesh.push({ cell: testCell, distance: directDistance})
      }
    }

    // long
    for (let i = 0; i < longMoves.length; i++) {
      const moveD = longMoves[i];
      const testCell = move(letter, number, moveD.x, moveD.y)
      if (valid(testCell)) {
        sector.mesh.push({ cell: testCell, distance: longDistance})
      }
    }
  }

  return sectors
}
