// Importing 'test' (for defining tests) and 'expect' (for assertions) from Playwright's test library
import { test, expect } from '@playwright/test';
// Importing the HomePage page object to interact with the Amisragas main website
import { HomePage } from '../pages/HomePage';
// Importing the JoinAmisragasPage page object to interact with the join/contact form
import { JoinAmisragasPage } from '../pages/JoinAmisragasPage';
// Importing the test data from the JSON file
import formData from '../Data/joinFormData.json';

test.describe('E2E Tests', () => {

    test('Send join-amisragas lead', async({page}) => { // Defines a single test; Playwright injects the 'page' browser instance

        const homePage=new HomePage(page); // Creates a HomePage instance using the Playwright page object
        await homePage.openAmisragasWebsite(); // Navigates the browser to the Amisragas home page
        await homePage.closeCookieAcceptPopup(); // Dismisses the cookie consent popup if it appears
        const joinAmisragasPage= await homePage.navigateToJoinPage(); // Clicks the join button and returns the new page as a JoinAmisragasPage object
        await joinAmisragasPage.selectSubject(formData.subject); // Selects "Join Amisragas" as the subject of the inquiry
        await joinAmisragasPage.selectPhoneCode(formData.phoneCodeIndex); // Selects the phone country code at index 1 (e.g. +972 for Israel)
        await joinAmisragasPage.selectSupplier(formData.supplier); // Selects "Gaz Fix" as the current gas supplier
        await joinAmisragasPage.fillFirstName(formData.firstName); // Types "Test" (in Hebrew) into the first name field
        await joinAmisragasPage.fillLastName(formData.lastName); // Types "Test" (in Hebrew) into the last name field
        await joinAmisragasPage.fillPhoneNumber(formData.phoneNumber); // Types a placeholder mobile phone number
        await joinAmisragasPage.fillPhone2(formData.phone2); // Types a secondary phone number
        await joinAmisragasPage.fillEmailField(formData.email) // Types a test email address
        await joinAmisragasPage.fillFax(formData.fax); // Types a fax number
        await joinAmisragasPage.fillCustomerId(formData.customerId); // Types a test customer/ID number
        await joinAmisragasPage.fillCity(formData.city); // Types "Tel Aviv" as the city
        await joinAmisragasPage.fillStreet(formData.street); // Types "Herzl 1" as the street address
        await joinAmisragasPage.fillZip(formData.zip); // Types a test zip/postal code
        await joinAmisragasPage.fillMessage(formData.message); // Types "Test message" (in Hebrew) into the message textarea
        await joinAmisragasPage.uploadFileToForm(formData.filePath); // Attaches a local PNG file to the form's file upload input
        await joinAmisragasPage.clickSubmit(); // Clicks the submit button to send the form
        await joinAmisragasPage.waitForUrl(formData.waitForUrlValue); // Waits until the URL contains 'contact-success' (the success redirect)
        expect(joinAmisragasPage.getCurrentUrl()).toBe(formData.expectedSuccessUrl); // Asserts the final URL exactly matches the expected success page URL
        await page.pause(); // Pauses the test execution so the browser stays open for manual inspection
    });
});
