import { BasePage } from "./BasePage";
import { JoinAmisragasPage } from "./JoinAmisragasPage";
class HomePage extends BasePage{
///////////////////////////
///variables deffinition///
//////////////////////////    
cookieAcceptButton: string
joinAmisragasButton: string
/////////////////////////
///elements' selectors///
////////////////////////
constructor(page: any){
    super(page)
    this.cookieAcceptButton= '#cookie-consent-acf-accept'
    this.joinAmisragasButton= "a[href='/contact-us/']"
    }
///////////////
///Functions///
//////////////
async openAmisragasWebsite(): Promise<void>{
    await this.navigateTo('https://www.amisragas.co.il/')
}
async closeCookieAcceptPopup(): Promise<void|null>{
    if(await this.checkVisibility(this.cookieAcceptButton))
    await this.clickButton(this.cookieAcceptButton);
        else return null;
}

async navigateToJoinPage(): Promise<JoinAmisragasPage> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      await this.clickButton(this.joinAmisragasButton)
    ]);
    await newPage.waitForLoadState();
    return new JoinAmisragasPage(newPage);
  }


}export {HomePage}