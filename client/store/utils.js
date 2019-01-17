export const getClearAverage = weatherArray => {
  let clearArr = []
  weatherArray.forEach(timePeriod => {
    let weatherCode = timePeriod.weather[0].id
    if (weatherCode === '800') {
      clearArr.push(weatherCode)
    }
  })
  return Math.ceil(clearArr.length / weatherArray.length * 100)
}

export const getTempAverage = weatherArray => {
  let totalTemp = 0
  weatherArray.forEach(timePeriod => {
    totalTemp += timePeriod.main.temp
  })

  return Math.ceil(totalTemp / weatherArray.length)
}

export const getSnow = weatherArray => {
  let lightSnowArr = []
  let totalSnowArr = []
  let heavySnowArr = []
  weatherArray.forEach(timePeriod => {
    let weatherCode = timePeriod.weather[0].id

    if (weatherCode >= 600 && weatherCode <= 602) {
      totalSnowArr.push(weatherCode)
    }
    if (weatherCode === 600) {
      lightSnowArr.push(weatherCode)
    } else if (weatherCode === 602) {
      heavySnowArr.push(weatherCode)
    }
  })

  const percentSnowChance = Math.ceil(
    totalSnowArr.length / weatherArray.length * 100
  )
  const percentLightSnow = Math.ceil(
    lightSnowArr.length / totalSnowArr.length * 100
  )
  const perecentHeavySnow = Math.ceil(
    heavySnowArr.length / totalSnowArr.length * 100
  )

  const snowAnalysisObject = {
    snowPercent: percentSnowChance,
    lightSnowPercent: percentLightSnow,
    heavySnowPercent: perecentHeavySnow
  }
  return snowAnalysisObject
}

export const getRain = weatherArray => {
  let lightRainArr = []
  let totalRainArr = []
  let heavyRainArr = []
  weatherArray.forEach(timePeriod => {
    let weatherCode = timePeriod.weather[0].id

    if (weatherCode >= 500 && weatherCode <= 504) {
      totalRainArr.push(weatherCode)
    }

    if (weatherCode === 500) {
      lightRainArr.push(weatherCode)
    } else if (weatherCode >= 502 && weatherCode <= 504)
      heavyRainArr.push(weatherCode)
  })

  const percentRainChance = Math.ceil(
    totalRainArr.length / weatherArray.length * 100
  )
  const percentLightRain = Math.ceil(
    lightRainArr.length / totalRainArr.length * 100
  )
  const percentHeavyRain = Math.ceil(
    heavyRainArr.length / totalRainArr.length * 100
  )

  const rainAnalysisObject = {
    rainPercent: percentRainChance,
    lightRainPercent: percentLightRain,
    heavyRainPercent: percentHeavyRain
  }
  return rainAnalysisObject
}
