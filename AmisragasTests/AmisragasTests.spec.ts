import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';


test.describe('E2E Tests', () => {
    test('Send join-amisragas lead', async({page}) => { 
    const homePage=new HomePage(page);
    await homePage.openAmisragasWebsite();
    await homePage.closeCookieAcceptPopup();
    const joinAmisragasPage= await homePage.navigateToJoinPage();
    await joinAmisragasPage.selectJoiAmisragas();
    await joinAmisragasPage.fillFirstName("בדיקה");
    await joinAmisragasPage.fillLastName("בדיקה");
    await joinAmisragasPage.selectPhoneCode(1);
    await joinAmisragasPage.fillPhoneNumber("1234567");
    await joinAmisragasPage.fillPhone2("046288514");
    await joinAmisragasPage.fillFax("046288514");
    await joinAmisragasPage.fillCustomerId("123456");
    await joinAmisragasPage.fillCity("תל אביב");
    await joinAmisragasPage.fillStreet("הרצל 1");
    await joinAmisragasPage.fillZip("12345");
    await joinAmisragasPage.fillMessage("הודעת בדיקה");
    await page.pause();
     
   
    });
});