/* Simple methods to return date/time */
export const temporal = (function(){
  const _convertToDate = (_str) => (_str) ? new Date(_str) : new Date()
  /*(_day = _convertToDate(day),cat) =>*/
  const date = (day, cat = '') => {
      const _day = _convertToDate(day)
      return (_day.getFullYear() + cat + (((_day.getMonth() + 1) < 10) ? "0" : "") + (_day.getMonth() + 1) + cat + ((_day.getDate() < 10) ? "0" : "") + _day.getDate()); 
  }
  const time = (day, cat = '') => { 
      const _day = _convertToDate(day)
      return (((_day.getHours() < 10) ? "0" : "") + _day.getHours() + cat + ((_day.getMinutes() < 10) ? "0" : "") + _day.getMinutes() + cat + ((_day.getSeconds() < 10) ? "0" : "") + _day.getSeconds()); }
  return {date,time}
})()
export default temporal