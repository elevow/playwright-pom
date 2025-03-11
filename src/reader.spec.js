// reader.spec.js
import { test } from "playwright/test";
import fs from "fs-extra";
import prettier from "prettier";
import * as utils from "./stringUtils";
// Allows locating elements by their ARIA role, ARIA attributes and accessible name.
const roles = [
  "alert","alertdialog","application","article","banner","blockquote","button","caption","cell","checkbox",
  "code","columnheader","combobox","complementary","contentinfo","definition","deletion","dialog",
  "directory","document","emphasis","feed","figure","form","generic","grid","gridcell","group","heading",
  "img","insertion","link","list","listbox","listitem","log","main","marquee","math","meter","menu",
  "menubar","menuitem","menuitemcheckbox","menuitemradio","navigation","none","note","option","paragraph",
  "presentation","progressbar","radio","radiogroup","region","row","rowgroup","rowheader","scrollbar",
  "search","searchbox","separator","slider","spinbutton","status","strong","subscript","superscript",
  "switch","tab","table","tablist","tabpanel","term","textbox","time","timer","toolbar","tooltip","tree",
  "treegrid","treeitem",
];
test.describe("POM", () => {
  test("Read", async ({ page }) => {
    let active = true;
    await page.goto("https://www.google.com"); // Any webpage to get started
    while (active) {
      await page.pause();
      const elements = [];
      try {
        const pageTitle = await page.title();
        // const pageURL = await page.url();
        // const urlSplit = pageURL.split("/");
        // const urlFinalPath = urlSplit[urlSplit.length - 1];
        // console.log(pageTitle);
        // Extract elements with stable attributes
        for (const role of roles) {
          const locs = await page.getByRole(role).all();
          if (locs.length > 0) {
            for (const loc of locs) {
              if (await loc.isVisible()) {
                // const nameLoc = await loc.getAttribute('name');
                let textLoc;
                try {
                  textLoc = await loc.innerText();
                } catch {
                  textLoc = false;
                }
                let newLocator = `page.getByRole('${role}')`;
                if (await loc.getAttribute("id"))
                  newLocator = `${newLocator}.getByAttribute('[id="${await loc.getAttribute("id")}"]')`;
                if (textLoc)
                  newLocator = `${newLocator}.getByText('${(await loc.innerText()).trim()}')`;
                // console.log('newLocator', newLocator)
                elements.push(newLocator);
              }
            }
          }
        }
        // console.log('elements', elements)
        await generatePOM(pageTitle, elements);
      } catch (e) {
        console.log("ERROR:", e);
        active = false;
      }
    }
  });
});
async function generatePOM(
  pageTitle,
  elements,
  outputDir = "./generatedPOM",
) {
  // Convert the page title to PascalCase for the class name
  const className = utils.pascalCase(pageTitle);
  // Generate the POM content
  const pomContent = `
import { type Locator, type Page } from '@playwright/test';
export class ${className} {
readonly page: Page;
${elements
  .map((el) => {
    const variableName = utils.getDescriptiveName(el);
    return `readonly ${variableName}: Locator;`;
  })
  .join("\n ")}
constructor(page: Page) {
this.page = page;
${elements
  .map((el) => {
    const variableName = utils.getDescriptiveName(el);
    return `this.${variableName} = ${el.replace(/\n/gm, " ")};`;
  })
  .join("\n ")}

}
}
`;
  // Format the generated POM content
  const formattedContent = await prettier.format(pomContent, {
    parser: "babel-ts",
  });
  // Ensure the output directory exists and save the POM file
  await fs.ensureDir(outputDir);
  let filePath = `${outputDir}/${className}Page.ts`;
  await fs.writeFile(filePath, formattedContent, "utf-8");
  console.log(`POM generated at ${filePath}`);
}
