export class bgColorService {

  getBgColor(type) {
    switch (type) {
      case "grass":
        return "#dbfba9"
      case "bug":
        return "#d9ea7b"
      case "fire":
        return "#efbf68"
      case "water":
        return "#b3c8da"
      case "ice":
        return "#b3c8da"
      case "psychic":
        return "#fdfd9c"
      case "electric":
        return "#fdfd9c"
      case "poison":
        return "#f1cff1"
      case "ghost":
        return "#f1cff1"
      case "fairy":
        return "pink"
      case "fighting":
        return "#caa37c"
      case "ground":
        return "#caa37c"
      case "dark":
        return "#282828"
      case "rock":
        return "#afafaf"
      case "steel":
        return "#bdbdbd"
      default :
        return "#ffd9b9"
    }
  }
}
