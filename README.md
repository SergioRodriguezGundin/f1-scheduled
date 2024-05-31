# F1 Scraper Worker

![Cloudflare](https://img.shields.io/badge/Technology-Cloudflare-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

The F1 Scheduled Worker is a Cloudflare Worker designed to run as a scheduled task, fetching information about Formula One races and updating the data. It serves an educational purpose and is non-profit, intended to demonstrate the usage of Cloudflare cron Workers.

The worker is scheduled to run every Monday to ensure the data is up-to-date for the upcoming race week.

## Technologies Used

- **Cloudflare Workers**: The project is implemented using Cloudflare Workers, allowing for serverless execution and scheduled tasks.

## Features

The worker performs the following tasks:
- Cron to call a scraper to retrieve races information

## License

This project is licensed under an open-source license suitable for non-profit, educational purposes. For more details, refer to the [LICENSE](./license) file. ![License](https://img.shields.io/badge/License-Non--Profit%20Educational%20Use-lightgrey)
