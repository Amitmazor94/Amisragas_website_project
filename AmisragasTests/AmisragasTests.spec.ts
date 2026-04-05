// Importing 'test' (for defining tests) and 'expect' (for assertions) from Playwright's test library
import { test, expect } from '@playwright/test';
// Importing the HomePage page object to interact with the Amisragas main website
import { HomePage } from '../pages/HomePage';
// Importing the JoinAmisragasPage page object to interact with the join/contact form
import { JoinAmisragasPage } from '../pages/JoinAmisragasPage';

test.describe('E2E Tests', () => {

    test('Send join-amisragas lead', async({page}) => { // Defines a single test; Playwright injects the 'page' browser instance

        const homePage=new HomePage(page); // Creates a HomePage instance using the Playwright page object
        await homePage.openAmisragasWebsite(); // Navigates the browser to the Amisragas home page
        await homePage.closeCookieAcceptPopup(); // Dismisses the cookie consent popup if it appears
        const joinAmisragasPage= await homePage.navigateToJoinPage(); // Clicks the join button and returns the new page as a JoinAmisragasPage object
        await joinAmisragasPage.selectSubject("הצטרפות לאמישראגז"); // Selects "Join Amisragas" as the subject of the inquiry
        await joinAmisragasPage.selectPhoneCode(1); // Selects the phone country code at index 1 (e.g. +972 for Israel)
        await joinAmisragasPage.selectSupplier("גז פיקס"); // Selects "Gaz Fix" as the current gas supplier
        await joinAmisragasPage.fillFirstName("בדיקה"); // Types "Test" (in Hebrew) into the first name field
        await joinAmisragasPage.fillLastName("בדיקה"); // Types "Test" (in Hebrew) into the last name field
        await joinAmisragasPage.fillPhoneNumber("0000000"); // Types a placeholder mobile phone number
        await joinAmisragasPage.fillPhone2("046288514"); // Types a secondary phone number
        await joinAmisragasPage.fillEmailField("test@test.com") // Types a test email address
        await joinAmisragasPage.fillFax("046288514"); // Types a fax number
        await joinAmisragasPage.fillCustomerId("123456"); // Types a test customer/ID number
        await joinAmisragasPage.fillCity("תל אביב"); // Types "Tel Aviv" as the city
        await joinAmisragasPage.fillStreet("הרצל 1"); // Types "Herzl 1" as the street address
        await joinAmisragasPage.fillZip("12345"); // Types a test zip/postal code
        await joinAmisragasPage.fillMessage("הודעת בדיקה"); // Types "Test message" (in Hebrew) into the message textarea
        await joinAmisragasPage.uploadFileToForm('C:/Users/amitm/automation_Projects/amisragas_project/Data/Capture.PNG'); // Attaches a local PNG file to the form's file upload input
        await joinAmisragasPage.clickSubmit(); // Clicks the submit button to send the form
        await joinAmisragasPage.waitForUrl('contact-success'); // Waits until the URL contains 'contact-success' (the success redirect)
        expect(joinAmisragasPage.getCurrentUrl()).toBe('https://www.amisragas.co.il/contact-success/'); // Asserts the final URL exactly matches the expected success page URL
        await page.pause(); // Pauses the test execution so the browser stays open for manual inspection
    });
});
