// Importing BasePage to extend its shared browser interaction methods
import { BasePage } from "./BasePage";
// Importing JoinAmisragasPage so it can be created and returned when navigating to the join form
import { JoinAmisragasPage } from "./JoinAmisragasPage";

// ─────────────────────────────────────────────
// CLASS DECLARATION
// HomePage extends BasePage, representing the Amisragas website's main home page
// ─────────────────────────────────────────────
class HomePage extends BasePage{

    // ─────────────────────────────────────────────
    // ELEMENT SELECTORS
    // CSS selectors used to locate interactive elements on the home page
    // ─────────────────────────────────────────────
    cookieAcceptButton: string   // Selector for the cookie consent acceptance button
    joinAmisragasButton: string  // Selector for the link that opens the "Join Amisragas" contact form

    // ─────────────────────────────────────────────
    // CONSTRUCTOR
    // Initializes the page object and assigns CSS selectors to each element property
    // ─────────────────────────────────────────────
    constructor(page: any){
        super(page) // Calls the BasePage constructor and passes the Playwright page object
        this.cookieAcceptButton= '#cookie-consent-acf-accept'    // Targets the cookie accept button by its HTML id
        this.joinAmisragasButton= "a[href='/contact-us/']"        // Targets the anchor link pointing to the contact/join page
    }

    // ─────────────────────────────────────────────
    // NAVIGATION METHODS
    // Methods that navigate the browser to specific pages
    // ─────────────────────────────────────────────

    // Navigates the browser to the Amisragas main website
    async openAmisragasWebsite(): Promise<void>{
        await this.navigateTo('https://www.amisragas.co.il/') // Calls the base method to load the home page URL
    }

    // ─────────────────────────────────────────────
    // POPUP HANDLING METHOD
    // Handles the cookie consent popup that appears on first visit
    // ─────────────────────────────────────────────

    // Closes the cookie consent popup if it is visible; does nothing if it's not shown
    async closeCookieAcceptPopup(): Promise<void|null>{
        if(await this.checkVisibility(this.cookieAcceptButton)) // Checks if the cookie popup button is currently visible
            await this.clickButton(this.cookieAcceptButton); // Clicks the accept button to dismiss the popup
        else return null; // If the popup is not visible, returns null and skips the click
    }

    // ─────────────────────────────────────────────
    // PAGE NAVIGATION METHOD
    // Clicks the join button and handles the new tab/page that opens as a result
    // ─────────────────────────────────────────────

    // Clicks the "Join Amisragas" button, waits for the new page to open, and returns it as a JoinAmisragasPage object
    async navigateToJoinPage(): Promise<JoinAmisragasPage> {
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'), // Starts listening for a new browser tab/page to open
          await this.clickButton(this.joinAmisragasButton) // Clicks the join button which triggers opening the new tab
        ]);
        await newPage.waitForLoadState(); // Waits for the new page to fully load before interacting with it
        return new JoinAmisragasPage(newPage); // Wraps the new page in a JoinAmisragasPage object and returns it
    }

// Exports the HomePage class so it can be imported and used in test files
}export {HomePage}
