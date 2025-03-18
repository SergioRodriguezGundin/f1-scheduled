const raceUrls = [
  'fastest-laps',
  'pit-stops',
  'qualifying',
  'starting-grid',
  'practice/1',
  'practice/2',
  'practice/3'
]

const sprintRaceUrls = [
  'sprint-grid',
  'sprint-qualifying',
  'sprint-results',
]

export type Race = {
  name: string;
  date: string;
  isSprintRace: boolean;
  urls: string[];
};

export const races = new Map<string, Race>();

/**
 * Initialize the races
 */
export const initializeRaces = (env: Env) => {
  const raceData = [
    { dateRange: '14-16Mar', name: 'australia', isSprintRace: false},
    { dateRange: '21-23Mar', name: 'china', isSprintRace: true},
    { dateRange: '04-06Apr', name: 'japan', isSprintRace: false},
    { dateRange: '11-13Apr', name: 'bahrain', isSprintRace: false},
    { dateRange: '18-20Apr', name: 'saudi-arabia', isSprintRace: false},
    { dateRange: '02-04May', name: 'miami', isSprintRace: true},
    { dateRange: '16-18May', name: 'italy', isSprintRace: false},
    { dateRange: '23-25May', name: 'monaco', isSprintRace: false},
    { dateRange: '30-01May-Jun', name: 'spain', isSprintRace: false},
    { dateRange: '13-15Jun', name: 'canada', isSprintRace: false},
    { dateRange: '27-29Jun', name: 'austria', isSprintRace: false},
    { dateRange: '04-06Jul', name: 'great-britain', isSprintRace: false},
    { dateRange: '25-27Jul', name: 'belgium', isSprintRace: true},
    { dateRange: '01-03Aug', name: 'hungary', isSprintRace: false},
    { dateRange: '29-31Aug', name: 'netherlands', isSprintRace: false},
    { dateRange: '05-07Sep', name: 'monza', isSprintRace: false},
    { dateRange: '19-21Sep', name: 'azerbaijan', isSprintRace: false},
    { dateRange: '03-05Oct', name: 'singapore', isSprintRace: false},
    { dateRange: '17-19Oct', name: 'united-states', isSprintRace: true},
    { dateRange: '24-26Oct', name: 'mexico', isSprintRace: false},
    { dateRange: '07-09Nov', name: 'brazil', isSprintRace: true},
    { dateRange: '20-22Nov', name: 'las-vegas', isSprintRace: false},
    { dateRange: '28-30Nov', name: 'qatar', isSprintRace: true},
    { dateRange: '05-07Dec', name: 'abu-dhabi', isSprintRace: false},
  ];

  raceData.forEach((race) => {
    const raceDate = getSundayDate(race.dateRange);
    const timestamp = raceDate.getTime().toString();

    races.set(timestamp, {
      name: race.name,
      date: raceDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
      urls: getRaceUrls(race.name, race.isSprintRace, env),
      isSprintRace: race.isSprintRace,
    });
  });
};

/**
 * Get the URLs for the race
 * @param raceName - The name of the race
 * @param raceNumber - The number of the race
 * @param isSprintRace - Whether the race is a sprint race
 * @returns The URLs for the race
 */
function getRaceUrls(raceName: string, isSprintRace: boolean, env: Env): string[] {
  let endpoints = [];
  let urls = raceUrls;

  endpoints.push(`${env.SCRAPER_URL}/race/${raceName}`);
  
  if (isSprintRace) {
    urls = [...urls, ...sprintRaceUrls];
  }

  for (const url of urls) {
    endpoints.push(`${env.SCRAPER_URL}race/${raceName}/${url}`);
  }


  return endpoints;
}

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
