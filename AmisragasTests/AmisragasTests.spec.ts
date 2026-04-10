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

        await test.step('Open Amisragas website', async () => {
            await homePage.openAmisragasWebsite();
        });

        await test.step('Close cookie popup', async () => {
            await homePage.closeCookieAcceptPopup();
        });

        const joinAmisragasPage = await test.step('Navigate to join page', async () => {
            return await homePage.navigateToJoinPage();
        });

        await test.step('Select subject', async () => {
            await joinAmisragasPage.selectSubject(formData.subject);
        });

        await test.step('Select phone code', async () => {
            await joinAmisragasPage.selectPhoneCode(formData.phoneCodeIndex);
        });

        await test.step('Select supplier', async () => {
            await joinAmisragasPage.selectSupplier(formData.supplier);
        });

        await test.step('Fill first name', async () => {
            await joinAmisragasPage.fillFirstName(formData.firstName);
        });

        await test.step('Fill last name', async () => {
            await joinAmisragasPage.fillLastName(formData.lastName);
        });

        await test.step('Fill phone number', async () => {
            await joinAmisragasPage.fillPhoneNumber(formData.phoneNumber);
        });

        await test.step('Fill secondary phone', async () => {
            await joinAmisragasPage.fillPhone2(formData.phone2);
        });

        await test.step('Fill email', async () => {
            await joinAmisragasPage.fillEmailField(formData.email);
        });

        await test.step('Fill fax', async () => {
            await joinAmisragasPage.fillFax(formData.fax);
        });

        await test.step('Fill customer ID', async () => {
            await joinAmisragasPage.fillCustomerId(formData.customerId);
        });

        await test.step('Fill city', async () => {
            await joinAmisragasPage.fillCity(formData.city);
        });

        await test.step('Fill street', async () => {
            await joinAmisragasPage.fillStreet(formData.street);
        });

        await test.step('Fill zip code', async () => {
            await joinAmisragasPage.fillZip(formData.zip);
        });

        await test.step('Fill message', async () => {
            await joinAmisragasPage.fillMessage(formData.message);
        });

        await test.step('Upload file', async () => {
            await joinAmisragasPage.uploadFileToForm(formData.filePath);
        });

        await test.step('Submit form', async () => {
            await joinAmisragasPage.clickSubmit();
        });

        await test.step('Wait for success redirect', async () => {
            await joinAmisragasPage.waitForUrl(formData.waitForUrlValue);
        });

        await test.step('Verify success URL', async () => {
            expect(joinAmisragasPage.getCurrentUrl()).toBe(formData.expectedSuccessUrl);
        });

        await page.pause();
    });
});
