class WeatherCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
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
      "below_horizon": "night",
      "above_horizon": "day",
    }
    const transformSkyName = {
      "below_horizon": "Stjerneklart",
      "above_horizon": "Solskinn",
    }
    // const belowabovehorizon = {
      // "below_horizon": "Under horisonten",
      // "above_horizon": "Over horisonten",
    // }
    const sunLocation = transformDayNight[hass.states[this.config.entity_sun].state];
    const skyLocation = transformSkyName[hass.states[this.config.entity_sun].state];
    // const sunHorizon = belowabovehorizon[hass.states[this.config.entity_sun].state];
    const weatherIcons = {
      'clear-night': `${sunLocation}`,
      'cloudy': 'cloudy',
      'fog': 'cloudy',
      'hail': 'hail',
      'lightning': 'thunder',
      'lightning-rainy': 'thunder',
      'partlycloudy': `cloudy-${sunLocation}-2`,
      'pouring': `rainy-${sunLocation}-3`,
      'rainy': `rainy-${sunLocation}-2`,
      'snowy': `snowy-${sunLocation}-3`,
      'snowy-rainy': 'hail',
      'sunny': `${sunLocation}`,
      'windy': 'cloudy',
      'windy-variant': `cloudy-${sunLocation}-3`,
      'exceptional': 'weather',
    }
	
	const weatherName = {
      'clear-night': `${skyLocation}`,
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
      'sunny': `${skyLocation}`,
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
	const provider = entity.attributes.friendly_name;
    const forecast = entity.attributes.forecast.slice(0, 5);
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
      <style>
	    :host {
          cursor: pointer;
        }
        .content {
          padding: 0 20px 20px;
        }
        .header {
          font-family: var(--paper-font-headline_-_font-family);
          -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
          font-size: var(--paper-font-headline_-_font-size);
          font-weight: var(--paper-font-headline_-_font-weight);
          letter-spacing: var(--paper-font-headline_-_letter-spacing);
          line-height: var(--paper-font-headline_-_line-height);
          text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
          opacity: var(--dark-primary-opacity);
          padding: 24px 16px 16px;
          display: flex;
          align-items: baseline;
        }
        .name {
          margin-left: 16px;
          font-size: 16px;
          color: var(--secondary-text-color);
        }
        .now {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .main {
          display: flex;
		  flex: 1 1 auto;
          align-items: center;
          margin-right: 32px;
        }
        .main .icon {
          margin: -16px -8px -16px -16px;
		  width: 112px;
        }
        .main .temp {
          font-size: 52px;
          line-height: 1em;
          position: relative;
        }
        .main .temp span {
          font-size: 24px;
          line-height: 1em;
          position: absolute;
          top: 4px;
        }
        .forecast {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
        }
        .forecast div {
          text-align: center;
        }
        .forecast .icon {
          margin-top: -8px;
          margin-bottom: -12px;
          width: 56px;
        }
        .weekday {
          font-weight: bold;
        }
        .attributes, .templow, .precipitation {
          color: var(--secondary-text-color);
        }
        img {
        width: 100%;
        }
	  </style>
      <div class="header">
		${weatherName[currentCondition]}
        <div class="name">
		  ${provider}
        </div>
      </div>
      <div class="content">
        <div class="now">
          <div class="main">
            <div class="icon">
              <img class src="/local/icons/weather_icons/animated/${weatherIcons[currentCondition]}.svg"></img>
            </div>
            <div class="temp">
              ${temperature}<span>${getUnit('temperature')}</span>
            </div>
          </div>
          <div class="attributes">
            <div>${uvLevel}</div>
            <div>${sunLevel}</div>
            <div>${windSpeed} fra ${windBearing}</div>
          </div>
        </div>
        <div class="forecast">
          ${forecast.map(daily => `
            <div class="day">
              <div class="weekday">${(new Date(daily.datetime)).toLocaleDateString((navigator.language) ? navigator.language : navigator.userLanguage, {weekday: 'short'}).split(' ')[0]}</div>
              <div class="icon">
                <img src="/local/icons/weather_icons/animated/${weatherIcons[daily.condition]}.svg"></img>
              </div>
              <div class="temp">${daily.temperature}${getUnit('temperature')}</div>
              <template is="dom-if" if="[[_showValue(item.precipitation)]]">
                <div class="precipitation">[[item.precipitation]] [[getUnit('precipitation')]]</div>
              </template>
            </div>
            `).join('')}			
        </div>
      </div>
    `;
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
