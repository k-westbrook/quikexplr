export const getCity = attractionsArr => {
  const city = {
    latitude: attractionsArr.position[0],
    longitude: attractionsArr.position[1]
  }

  return city
}
