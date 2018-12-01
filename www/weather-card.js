.clear {
  clear: both;
}
.card {
  margin: auto;
  padding-top: 2em;
  padding-bottom: 0em;
  padding-left: 1em;
  padding-right:1em;
  position: relative;
}
.ha-icon {
  height: 18px;
  margin-right: 5px;
  color: var(--paper-item-icon-color);
}
.temp {
  font-weight: 300;
  font-size: 4em;
  color: var(--primary-text-color);
  position: absolute;
  right: 1em;
}
.tempc {
  font-weight: 300;
  font-size: 1.5em;
  vertical-align: super;
  color: var(--primary-text-color);
  position: absolute;
  right: 1em;
  margin-top: -14px;
  margin-right: 7px;
}
.variations {
  display: inline-block;
  font-weight: 300;
  color: var(--primary-text-color);
  list-style: none;
  margin-left: -2em;
  margin-top: 4.5em;
}
.variations.right {
  position: absolute;
  right: 1em;
  margin-left: 0;
  margin-right: 1em;
}
.unit {
  font-size: .8em;
}
.forecast {
  width: 100%;
  margin: 0 auto;
  height: 9em;
}
.day {
  display: block;
  width: 20%;
  float: left;
  text-align: center;
  color: var(--primary-text-color);
  border-right: .1em solid #d9d9d9;
  line-height: 2;
  box-sizing: border-box;
}
.dayname {
  text-transform: uppercase;
}
.forecast .day:first-child {
  margin-left: 0;
}
.forecast .day:nth-last-child(1) {
  border-right: none;
  margin-right: 0;
}
.highTemp {
  font-weight: bold;
}
.lowTemp {
  color: var(--secondary-text-color);
}
.icon.bigger {
  width: 10em;
  height: 10em;
  margin-top: -4em;
  position: absolute;
  left: 0em;
}
.icon {
  width: 50px;
  height: 50px;
  margin-right: 5px;
  display: inline-block;
  vertical-align: middle;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  text-indent: -9999px;
}
.weather {
  font-weight: 300;
  font-size: 1.5em;
  color: var(--primary-text-color);
  text-align: left;
  position: absolute;
  top: -0.5em;
  left: 6em;
  word-wrap: break-word;
  width: 30%;
}
