// Importing the 'write' function from Node.js built-in file system module (not used directly here but available)
import { write } from "node:fs";
// Importing the BasePage class to extend its shared page methods and properties
import { BasePage } from "./BasePage";

// ─────────────────────────────────────────────
// CLASS DECLARATION
// ─────────────────────────────────────────────
// JoinAmisragasPage extends BasePage, meaning it inherits all common browser interaction methods
class JoinAmisragasPage extends BasePage{

    // ─────────────────────────────────────────────
    // ELEMENT SELECTORS
    // CSS selectors used to locate form elements on the page
    // ─────────────────────────────────────────────
    subjectField: string       // Selector for the subject dropdown field
    firstNameField: string     // Selector for the first name input field
    lastNameField: string      // Selector for the last name input field
    phoneCodeField: string     // Selector for the phone country code dropdown
    mobilePhoneField: string   // Selector for the mobile phone number input field
    phoneField: string         // Selector for the secondary phone number input field
    faxField: string           // Selector for the fax number input field
    customerIdField: string    // Selector for the customer ID input field
    cityField: string          // Selector for the city input field
    streetField: string        // Selector for the street address input field
    zipField: string           // Selector for the zip/postal code input field
    messageField: string       // Selector for the message textarea field
    supplierField: string      // Selector for the supplier dropdown field
    fileUploadField: string    // Selector for the file upload input
    emailField: string         // Selector for the email input field
    submitButton: string       // Selector for the form submit button

    // ─────────────────────────────────────────────
    // CONSTRUCTOR
    // Initializes the page object and assigns CSS selectors to each element property
    // ─────────────────────────────────────────────
    constructor(page: any){
        super(page) // Calls the BasePage constructor and passes the Playwright page object
        this.subjectField= "select[name='subject']"              // Targets the <select> element with name="subject"
        this.firstNameField= `input[name="firstname"]`           // Targets the <input> with name="firstname"
        this.lastNameField= `input[name="surname"]`              // Targets the <input> with name="surname"
        this.phoneCodeField= `select[name="phone-code"]`         // Targets the <select> for phone country code
        this.mobilePhoneField= `input[name="phone-number"]`      // Targets the <input> for mobile phone number
        this.phoneField= `input[name="phone2"]`                  // Targets the <input> for a second phone number
        this.faxField= `input[name="fax"]`                       // Targets the <input> for fax number
        this.customerIdField= `input[name="customer_id"]`        // Targets the <input> for customer ID
        this.cityField= `input[name="city"]`                     // Targets the <input> for city name
        this.streetField= `input[name="street"]`                 // Targets the <input> for street address
        this.zipField= `input[name="zip"]`                       // Targets the <input> for zip/postal code
        this.messageField= `textarea[name="message"]`            // Targets the <textarea> for the message
        this.supplierField= `select[name="supplier"]`            // Targets the <select> dropdown for supplier
        this.fileUploadField= "input[type='file']"               // Targets the file upload <input> element
        this.emailField="input[name='email']"                    // Targets the <input> for email address
        this.submitButton= "button[type='submit'].srv-button"    // Targets the submit <button> with class 'srv-button'
    }

    // ─────────────────────────────────────────────
    // DROPDOWN METHODS
    // Methods that interact with <select> dropdown elements on the form
    // ─────────────────────────────────────────────

    // Selects a value from the subject dropdown by its option value attribute
    async selectSubject(value: string): Promise<void>{
        await this.chooseFromListByValue(this.subjectField, value) // Calls base method to select an option by value
    }

    // Selects a phone country code from the dropdown by its index position
    async selectPhoneCode(value: number): Promise<void>{
       await this.chooseFromListByIndex(this.phoneCodeField, value); // Calls base method to select an option by index number
    }

    // Selects a supplier from the supplier dropdown by its option value attribute
    async selectSupplier(value: string): Promise<void>{
        await this.chooseFromListByValue(this.supplierField, value); // Calls base method to select an option by value
    }

    // ─────────────────────────────────────────────
    // TEXT INPUT METHODS
    // Methods that type text into input and textarea fields on the form
    // ─────────────────────────────────────────────

    // Types the given value into the first name field
    async fillFirstName(value: string): Promise<void>{
        await this.writeText(this.firstNameField, value); // Calls base method to type text into the field
    }

    // Types the given value into the last name field
    async fillLastName(value: string): Promise<void>{
        await this.writeText(this.lastNameField, value); // Calls base method to type text into the field
    }

    // Types the given value into the mobile phone number field
    async fillPhoneNumber(value: string): Promise<void>{
        await this.writeText(this.mobilePhoneField, value); // Calls base method to type text into the field
    }

    // Types the given value into the secondary phone number field
    async fillPhone2(value: string): Promise<void>{
        await this.writeText(this.phoneField, value); // Calls base method to type text into the field
    }

    // Types the given value into the email address field
    async fillEmailField(value: string): Promise<void>{
        await this.writeText(this.emailField, value); // Calls base method to type text into the field
    }

    // Types the given value into the fax number field
    async fillFax(value: string): Promise<void>{
        await this.writeText(this.faxField, value); // Calls base method to type text into the field
    }

    // Types the given value into the customer ID field
    async fillCustomerId(value: string): Promise<void>{
        await this.writeText(this.customerIdField, value); // Calls base method to type text into the field
    }

    // Types the given value into the city field
    async fillCity(value: string): Promise<void>{
        await this.writeText(this.cityField, value); // Calls base method to type text into the field
    }

    // Types the given value into the street address field
    async fillStreet(value: string): Promise<void>{
        await this.writeText(this.streetField, value); // Calls base method to type text into the field
    }

    // Types the given value into the zip/postal code field
    async fillZip(value: string): Promise<void>{
        await this.writeText(this.zipField, value); // Calls base method to type text into the field
    }

    // Types the given value into the message textarea field
    async fillMessage(value: string): Promise<void>{
        await this.writeText(this.messageField, value); // Calls base method to type text into the field
    }

    // ─────────────────────────────────────────────
    // FILE UPLOAD METHOD
    // Method that handles uploading a file through the form's file input
    // ─────────────────────────────────────────────

    // Uploads a file to the form using the provided local file path
    async uploadFileToForm(filePath: string): Promise<void>{
        await this.uploadFile(this.fileUploadField, filePath); // Calls base method to set the file input's value to the given path
    }

    // ─────────────────────────────────────────────
    // SUBMIT METHOD
    // Method that submits the form by clicking the submit button
    // ─────────────────────────────────────────────

    // Clicks the submit button to send the form
    async clickSubmit(): Promise<void>{
        await this.clickButton(this.submitButton); // Calls base method to click the button element
    }

// Exports the JoinAmisragasPage class so it can be imported and used in test files
}export {JoinAmisragasPage}
