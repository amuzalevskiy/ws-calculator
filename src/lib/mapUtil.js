export function getHexagonColor(sector) {
  let hexColor = '#ffffff'
  switch(sector.type) {
    case 'our-gates':
    case 'their-gates':
      hexColor = '#ffeeee'
      break;
    
    case 'L1':
      hexColor = '#f8fff8'
      break;

    case 'L5':
      hexColor = '#eeffee'
      break;

    case 'L10':
      hexColor = '#d0ffd0'
      break;
    default:
  }

  if (sector.hydro === 3000) {
    hexColor = '#eeeeff'
  }
  return hexColor
}