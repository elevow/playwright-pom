// readme.md
# Page Object Model Generator CLI
This project provides a tool to scan web pages and generate **Page Object Models (POM)**, which can be used in automated UI testing
frameworks. The tool uses Playwright to extract elements with stable role attributes (e.g., `data-test-id`, `id`) and outputs structured POM files.
---
## **Features**
- **Web Crawling**: Extracts elements role attributes from web pages.
- **POM Generation**: Creates JavaScript files that represent Page Object Models for automated testing.
- **Dynamic Class Naming**: The class name is based on the title of the crawled page.
---
## **Installation**
### **1. Clone the Repository**
```bash
git clone https://github.com/Eugene-Levow_fisglbl/pom-crawler.git
cd pom-crawler
```
### **2. Install Dependencies**
```bash
npm install
npx playwright install
```
---
## **Usage**
### **Basic Command**
```bash
npm run crawl
```
A new Chrome browser and Playwright Inspector will appear.
![New Browser Image](<images/webpage screenshot.png>)
![Playwright Inspector Image](<images/inspector screenshot.png>)
Using that new browser, go to the webpage you want to scan and press the "Play" button on the Inspector window to run the scan.
![Inspector Play Image](images/play.png)
You can continue to a different page, run the Play button and a new scan will be done.
### **Other Commands**
```bash
npm run crawl:large // Default value a large browser screen size
npm run crawl:medium // Starts a medium browser screen size
npm run crawl:small // Starts a small browser screen size
```

**Output:**
- Crawls the page at `https://demo.applitools.com/`.
- Generates a POM file in the `./generatedPOM`

**Contribution:**
This would not have been possible if this was not done first:
https://github.com/tanvirislam06/pom-crawler