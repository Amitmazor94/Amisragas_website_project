import {Page, Locator, BrowserContext} from '@playwright/test';

  abstract class BasePage{
    
    protected page: Page;
    constructor(page: Page){
        this.page=page
    }

    async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    
  }

    async clickButton(locator: string): Promise<void>{
        const button= await this.page.locator(locator);
        await button.click();
    }

    async writeText(locator: string, text: string): Promise<void>{
        const input= this.page.locator(locator);
        await input.type(text)

    }

    async readText(locator: string): Promise<string|null>{
       const content= await this.page.locator(locator).textContent();
       return content;
    }

    async hoverElement(element:string): Promise<void>{
       await this.page.hover(element);
    }

    async checkVisibility(element: string): Promise<boolean>{
       return this.page.locator(element).isVisible();
    }

    async chooseFromList(element:string, i: number): Promise<void>{
       const field= this.page.locator(element);
       await field.selectOption({index: i})
    }

    async chooseFromListByValue(element:string, value: string): Promise<void>{
       await this.checkVisibility(element);
       const field= this.page.locator(element);
       await field.selectOption({label: value})
    }

    

    

    



    }export {BasePage}