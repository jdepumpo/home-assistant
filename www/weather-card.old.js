class WeatherCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = '/local/weather-card.css';
      card.appendChild(link);
      this.content = document.createElement('div');
      this.content.className = 'card';
      card.appendChild(this.content);
      this.appendChild(card);
    }
    const getUnit = function (measure) {
      const lengthUnit = hass.config.unit_system.length;
      switch (measure) {
        case 'air_pressure':
          return lengthUnit === 'km' ? 'hPa' : 'inHg';
        case 'length':
          return lengthUnit;
        case 'precipitation':
          return lengthUnit === 'km' ? 'mm' : 'in';
        default:
          return hass.config.unit_system[measure] || '';
      }
    };
    const transformDayNight = {
      "below_horizon": "Stjerneklart",
      "above_horizon": "Solskinn",
    }
    // const belowabovehorizon = {
      // "below_horizon": "Under horisonten",
      // "above_horizon": "Over horisonten",
    // }
    const sunLocation = transformDayNight[hass.states[this.config.entity_sun].state];
    // const sunHorizon = belowabovehorizon[hass.states[this.config.entity_sun].state];
    const weatherIcons = {
      'clear-night': `${sunLocation}`,
      'cloudy': 'cloudy',
      'fog': 'cloudy',
      'hail': 'rainy-7',
      'lightning': 'thunder',
      'lightning-rainy': 'thunder',
      'partlycloudy': `cloudy-${sunLocation}-3`,
      'pouring': 'rainy-6',
      'rainy': 'rainy-5',
      'snowy': 'snowy-6',
      'snowy-rainy': 'rainy-7',
      'sunny': `${sunLocation}`,
      'windy': 'cloudy',
      'windy-variant': `cloudy-${sunLocation}-3`,
      'exceptional': '!!',
    }
	
	const weatherName = {
      'clear-night': `${sunLocation}`,
      'cloudy': 'Skyet',
      'fog': 'Tåke',
      'hail': 'Hagl',
      'lightning': 'Torden',
      'lightning-rainy': 'Regn og torden',
      'partlycloudy': 'Delvis skyet',
      'pouring': 'Pøsregn',
      'rainy': 'Regn',
      'snowy': 'Snø',
      'snowy-rainy': 'Sludd',
      'sunny': `${sunLocation}`,
      'windy': 'Vind',
      'windy-variant': 'Vind',
      'exceptional': '!',
  }
	
    const windDirections = [
      'nord',
      'nordøst',
      'øst',
      'sørøst',
      'sør',
      'sørvest',
      'vest',
      'nordvest',
      'nord'
    ];
    const entity = hass.states[this.config.entity_weather];
    const currentCondition = entity.state;
	// const nowCondIT = weatherName[this.weatherObj.state];
    const forecast = entity.attributes.forecast.slice(0, 4);
	const entity_w = hass.states[this.config.entity_wind];
    const windSpeed = entity_w.state;
	const entity_u = hass.states[this.config.entity_uv];
    const uvLevel = entity_u.state;
	const entity_s = hass.states[this.config.entity_sun_level];
    const sunLevel = entity_s.state;
    // const humidity = entity.attributes.humidity;
    // const pressure = entity.attributes.pressure;
    const temperature = entity.attributes.temperature;
    const windBearing = windDirections[(parseInt((entity.attributes.wind_bearing + 22.5) / 45))];
    this.content.innerHTML = `
      <span class="icon bigger" style="background: none, url(/local/icons/weather_icons/animated/weather.svg) no-repeat; background-size: contain;">${currentCondition}</span>
      <span class="temp">${temperature}</span>
	  <span class="tempc">${getUnit('temperature')}</span>
      <span class="weather">${weatherName[currentCondition]}</span>
        <ul class="variations right">
        </ul>
        <ul class="variations">
          <li><!--span class="ha-icon"><ha-icon icon="mdi:water-percent"></ha-icon></span-->${uvLevel}</li>
          <li><!--span class="ha-icon"><ha-icon icon="mdi:weather-sunset"></ha-icon></span-->${sunLevel}</li>
          <li><!--span class="ha-icon"><ha-icon icon="mdi:weather-windy"></ha-icon></span-->${windSpeed} fra ${windBearing}</li>
        </ul>
      </span>
      <div class="forecast clear">
	    ${forecast.map(daily => `
          <div class="day">
            <span class="dayname">${(new Date(daily.datetime)).toLocaleDateString((navigator.language) ? navigator.language : navigator.userLanguage, {weekday: 'short'}).split(' ')[0]}</span>
            <br>
            <i class="icon" style="background: none, url(/local/icons/weather_icons/animated/weather.svg) no-repeat; background-size: contain;"></i>
            <br>
            <span class="highTemp">${daily.temperature}${getUnit('temperature')}</span>
          </div>`).join('')}
      </div>`;
  }
  setConfig(config) {
    if (!config.entity_weather || !config.entity_sun) {
      throw new Error('Please define entities');
    }
    this.config = config;
  }
  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 3;
  }
}
customElements.define('weather-card', WeatherCard);
