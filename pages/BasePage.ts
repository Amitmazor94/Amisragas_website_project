// Importing the Playwright 'Page' type for type-safe access to browser page actions
import {Page} from '@playwright/test';

// ─────────────────────────────────────────────
// CLASS DECLARATION
// Abstract base class — cannot be instantiated directly.
// All page objects extend this class to share common browser interaction methods.
// ─────────────────────────────────────────────
abstract class BasePage{

    // ─────────────────────────────────────────────
    // PROPERTY
    // The Playwright Page object used to interact with the browser
    // ─────────────────────────────────────────────
    protected page: Page; // 'protected' means only this class and its subclasses can access it

    // ─────────────────────────────────────────────
    // CONSTRUCTOR
    // Receives the Playwright page instance and stores it for use in all methods
    // ─────────────────────────────────────────────
    constructor(page: Page){
        this.page=page // Assigns the incoming page object to the class property
    }

    // ─────────────────────────────────────────────
    // NAVIGATION METHOD
    // Navigates the browser to a given URL
    // ─────────────────────────────────────────────

    // Opens the browser at the specified URL
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url); // Uses Playwright's goto() to load the page at the given URL
    }

    // ─────────────────────────────────────────────
    // CLICK METHOD
    // Finds an element by CSS selector and clicks it
    // ─────────────────────────────────────────────

    // Locates a button or clickable element using its CSS selector and clicks it
    async clickButton(locator: string): Promise<void>{
        const button= this.page.locator(locator); // Finds the element on the page using the CSS selector
        await button.click(); // Performs a mouse click on the located element
    }

    // ─────────────────────────────────────────────
    // TEXT INPUT METHODS
    // Methods for typing into or reading text from page elements
    // ─────────────────────────────────────────────

    // Locates an input field by CSS selector and types the given text into it
    async writeText(locator: string, text: string): Promise<void>{
        const input= this.page.locator(locator); // Finds the input element on the page
        await input.type(text) // Types the text character by character (simulates keyboard input)
    }

    // Locates an element and returns its visible text content
    async readText(locator: string): Promise<string|null>{
       const content= await this.page.locator(locator).textContent(); // Reads the inner text of the element
       return content; // Returns the text, or null if the element has no text content
    }

    // ─────────────────────────────────────────────
    // HOVER METHOD
    // Moves the mouse cursor over an element (useful for triggering hover menus)
    // ─────────────────────────────────────────────

    // Hovers the mouse over the element matching the given CSS selector
    async hoverElement(element:string): Promise<void>{
       await this.page.hover(element); // Moves mouse over the element to trigger hover state
    }

    // ─────────────────────────────────────────────
    // VISIBILITY CHECK METHOD
    // Checks whether an element is currently visible on the page
    // ─────────────────────────────────────────────

    // Returns true if the element is visible, false if it's hidden or not in the DOM
    async checkVisibility(element: string): Promise<boolean>{
       return this.page.locator(element).isVisible(); // Playwright's isVisible() checks the element's display state
    }

    // ─────────────────────────────────────────────
    // DROPDOWN SELECTION METHODS
    // Methods for selecting options from <select> dropdown elements
    // ─────────────────────────────────────────────

    // Selects an option from a dropdown by its position index (0 = first option)
    async chooseFromListByIndex(element:string, i: number): Promise<void>{
       const field= this.page.locator(element); // Finds the <select> dropdown element
       await field.selectOption({index: i}) // Selects the option at the given index number
    }

    // Selects an option from a dropdown by matching the option's visible label text
    async chooseFromListByValue(element:string, value: string): Promise<void>{
       await this.checkVisibility(element); // Verifies the dropdown is visible before interacting
       const field= this.page.locator(element); // Finds the <select> dropdown element
       await field.selectOption({label: value}) // Selects the option whose visible text matches the given value
    }

    // ─────────────────────────────────────────────
    // FILE UPLOAD METHOD
    // Sets a file path on a file input element to simulate uploading a file
    // ─────────────────────────────────────────────

    // Attaches a file to a file input element using the given local file path
    async uploadFile(locator: string, filePath: string): Promise<void>{
       const fileInput= this.page.locator(locator); // Finds the file <input> element on the page
       await fileInput.setInputFiles(filePath); // Sets the file input's value to the given file path
    }

    // ─────────────────────────────────────────────
    // URL UTILITY METHODS
    // Methods for reading and waiting on the browser's current URL
    // ─────────────────────────────────────────────

    // Returns the current URL of the browser page as a string
    getCurrentUrl(): string {
       return this.page.url(); // Playwright's url() method returns the active page URL
    }

    // Waits until the browser's URL contains the given string pattern (useful after form submissions)
    async waitForUrl(urlPart: string): Promise<void> {
       try {
           await this.page.waitForURL(new RegExp(urlPart), { waitUntil: 'commit' }); // Waits for URL to match the regex built from urlPart
       } catch {} // Silently ignores timeout errors if the URL never matches
    }

// Exports the BasePage class so it can be imported and extended by other page classes
}export {BasePage}
