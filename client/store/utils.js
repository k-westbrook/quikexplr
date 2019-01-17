const likelihoodPrecipObj = {
  least: 'Least Likely',
  likely: 'Likely',
  very: 'Very Likely',
  most: 'Most Likely '
}

export const getClearAverage = weatherArray => {
  let clearArr = []
  weatherArray.forEach(timePeriod => {
    let weatherCode = timePeriod.weather[0].id

    if (weatherCode === 800) {
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
  const percentHeavySnow = Math.ceil(
    heavySnowArr.length / totalSnowArr.length * 100
  )

  let snowStrChance = ''

  if (percentSnowChance >= 0 && percentSnowChance <= 20) {
    snowStrChance = likelihoodPrecipObj.least
  } else if (percentSnowChance > 20 && percentSnowChance <= 60) {
    snowStrChance = likelihoodPrecipObj.likely
  } else if (percentSnowChance > 60 && percentSnowChance <= 80) {
    snowStrChance = likelihoodPrecipObj.very
  } else {
    snowStrChance = likelihoodPrecipObj.most
  }

  let warning = false
  let pleasantWinter = false
  if (percentHeavySnow > 20) {
    warning = true
  }
  if (percentLightSnow > 50 && !warning) {
    pleasantWinter = true
  }

  const snowAnalysisObject = {
    snowPercent: percentSnowChance,
    lightSnowPercent: percentLightSnow,
    heavySnowPercent: percentHeavySnow,
    snowStrChance,
    extremeWeatherWarn: warning,
    pleasantWinter
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

  let rainStrChance = ''

  if (percentRainChance >= 0 && percentRainChance <= 20) {
    rainStrChance = likelihoodPrecipObj.least
  } else if (percentRainChance > 20 && percentRainChance <= 60) {
    rainStrChance = likelihoodPrecipObj.likely
  } else if (percentRainChance > 60 && percentRainChance <= 80) {
    rainStrChance = likelihoodPrecipObj.very
  } else {
    rainStrChance = likelihoodPrecipObj.most
  }

  let warning = false
  if (percentHeavyRain > 20) {
    warning = true
  }

  const rainAnalysisObject = {
    rainPercent: percentRainChance,
    lightRainPercent: percentLightRain,
    heavyRainPercent: percentHeavyRain,
    rainStrChance,
    extremeWeatherWarn: warning
  }
  return rainAnalysisObject
}
