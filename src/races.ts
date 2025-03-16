type Race = {
  name: string;
  date: string;
};

export const races = new Map<string, Race>();

export const initializeRaces = () => {
  const raceData = [
    {
      dateRange: '14-16Mar',
      country: 'Australia',
      name: 'FORMULA 1 LOUIS VUITTON AUSTRALIAN GRAND PRIX 2025',
      circuit: 'Melbourne circuit',
    },
    { dateRange: '21-23Mar', country: 'China', name: 'FORMULA 1 HEINEKEN CHINESE GRAND PRIX 2025', circuit: 'Shanghai circuit' },
    { dateRange: '04-06Apr', country: 'Japan', name: 'FORMULA 1 LENOVO JAPANESE GRAND PRIX 2025', circuit: 'Suzuka circuit' },
    { dateRange: '11-13Apr', country: 'Bahrain', name: 'FORMULA 1 GULF AIR BAHRAIN GRAND PRIX 2025', circuit: 'Sakhir circuit' },
    { dateRange: '18-20Apr', country: 'Saudi Arabia', name: 'FORMULA 1 STC SAUDI ARABIAN GRAND PRIX 2025', circuit: 'Jeddah circuit' },
    { dateRange: '02-04May', country: 'Miami', name: 'FORMULA 1 CRYPTO.COM MIAMI GRAND PRIX 2025', circuit: 'Miami circuit' },
    {
      dateRange: '16-18May',
      country: 'Emilia-Romagna',
      name: "FORMULA 1 AWS GRAN PREMIO DEL MADE IN ITALY E DELL'EMILIA-ROMAGNA 2025",
      circuit: 'Imola circuit',
    },
    { dateRange: '23-25May', country: 'Monaco', name: 'FORMULA 1 TAG HEUER GRAND PRIX DE MONACO 2025', circuit: 'Monaco circuit' },
    { dateRange: '30-01May-Jun', country: 'Spain', name: 'FORMULA 1 ARAMCO GRAN PREMIO DE ESPAÑA 2025', circuit: 'Barcelona circuit' },
    { dateRange: '13-15Jun', country: 'Canada', name: 'FORMULA 1 PIRELLI GRAND PRIX DU CANADA 2025', circuit: 'Montréal circuit' },
    { dateRange: '27-29Jun', country: 'Austria', name: 'FORMULA 1 MSC CRUISES AUSTRIAN GRAND PRIX 2025', circuit: 'Spielberg circuit' },
    {
      dateRange: '04-06Jul',
      country: 'Great Britain',
      name: 'FORMULA 1 QATAR AIRWAYS BRITISH GRAND PRIX 2025',
      circuit: 'Silverstone circuit',
    },
    {
      dateRange: '25-27Jul',
      country: 'Belgium',
      name: 'FORMULA 1 MOËT & CHANDON BELGIAN GRAND PRIX 2025',
      circuit: 'Spa-Francorchamps circuit',
    },
    { dateRange: '01-03Aug', country: 'Hungary', name: 'FORMULA 1 LENOVO HUNGARIAN GRAND PRIX 2025', circuit: 'Budapest circuit' },
    { dateRange: '29-31Aug', country: 'Netherlands', name: 'FORMULA 1 HEINEKEN DUTCH GRAND PRIX 2025', circuit: 'Zandvoort circuit' },
    { dateRange: '05-07Sep', country: 'Italy', name: "FORMULA 1 PIRELLI GRAN PREMIO D'ITALIA 2025", circuit: 'Monza circuit' },
    { dateRange: '19-21Sep', country: 'Azerbaijan', name: 'FORMULA 1 QATAR AIRWAYS AZERBAIJAN GRAND PRIX 2025', circuit: 'Baku circuit' },
    {
      dateRange: '03-05Oct',
      country: 'Singapore',
      name: 'FORMULA 1 SINGAPORE AIRLINES SINGAPORE GRAND PRIX 2025',
      circuit: 'Marina Bay circuit',
    },
    {
      dateRange: '17-19Oct',
      country: 'United States',
      name: 'FORMULA 1 MSC CRUISES UNITED STATES GRAND PRIX 2025',
      circuit: 'Austin circuit',
    },
    { dateRange: '24-26Oct', country: 'Mexico', name: 'FORMULA 1 GRAN PREMIO DE LA CIUDAD DE MÉXICO 2025', circuit: 'Mexico City circuit' },
    {
      dateRange: '07-09Nov',
      country: 'Brazil',
      name: 'FORMULA 1 MSC CRUISES GRANDE PRÊMIO DE SÃO PAULO 2025',
      circuit: 'São Paulo circuit',
    },
    { dateRange: '20-22Nov', country: 'Las Vegas', name: 'FORMULA 1 HEINEKEN LAS VEGAS GRAND PRIX 2025', circuit: 'Las Vegas circuit' },
    { dateRange: '28-30Nov', country: 'Qatar', name: 'FORMULA 1 QATAR AIRWAYS QATAR GRAND PRIX 2025', circuit: 'Lusail circuit' },
    {
      dateRange: '05-07Dec',
      country: 'Abu Dhabi',
      name: 'FORMULA 1 ETIHAD AIRWAYS ABU DHABI GRAND PRIX 2025',
      circuit: 'Yas Island circuit',
    },
  ];

  raceData.forEach((race) => {
    const raceDate = getSundayDate(race.dateRange);
    const timestamp = raceDate.getTime().toString();

    races.set(timestamp, {
      name: race.name,
      date: raceDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
    });
  });
};

/**
 * Get the Sunday date (last day) of the weekend of the race
 * @param dateRange - The date range of the race
 * @returns The Sunday date
 */
function getSundayDate(dateRange: string): Date {
  // Expected format: "dd-ddMMM" (e.g. "14-16Mar")
  const parts = dateRange.match(/(\d+)-(\d+)([A-Za-z]+)/);
  if (!parts) throw new Error(`Invalid date format: ${dateRange}`);

  const endDay = parseInt(parts[2]);
  const month = getMonthNumber(parts[3]);
  const year = 2025;

  return new Date(year, month, endDay);
}

/**
 * Convert month name to number (0-indexed)
 * @param monthName - The name of the month
 * @returns The number of the month
 */
function getMonthNumber(monthName: string): number {
  const months: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  return months[monthName];
}

/**
 * Get the latest race. If the result is undefined, it means that the race has not yet taken place.
 * @returns The latest race or undefined if there is no race
 */
export function getLatestRace(): Race | undefined {
  // Get the current date
  const today = new Date();

  // Subtract one day to get the Sunday date (race day)
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Get the timestamp of the Sunday to search in the map
  const sundayTimestamp = yesterday.setHours(0, 0, 0, 0).toString();

  // Search directly in the map using the timestamp
  return races.get(sundayTimestamp);
}
