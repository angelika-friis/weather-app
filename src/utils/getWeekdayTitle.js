export const getWeekdayTitle = (date, index) => {
    const weekdays = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    
    if (index === 0) return "Idag";
    if (index === 1) return "Imorgon";
    return weekdays[new Date(date + 'T00:00:00').getDay()];
  };