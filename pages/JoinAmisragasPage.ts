import { BasePage } from "./BasePage";
class JoinAmisragasPage extends BasePage{
    subjectField: string
    firstNameField: string
    lastNameField: string
    phoneCodeField: string
    phoneNumberField: string
    constructor(page: any){
        super(page)
        this.subjectField= `xpath=//div[@class='srv-form__items']/div[1]//select`
        this.firstNameField= `input[name="firstname"]`
        this.lastNameField= `input[name="surname"]`
        this.phoneCodeField= `select[name="phone-code"]`
        this.phoneNumberField= `input[name="phone-number"]`
    }

    async selectJoiAmisragas(): Promise<void>{
        await this.chooseFromList(this.subjectField, 1);
    }

    async fillFirstName(value: string): Promise<void>{
        await this.writeText(this.firstNameField, value);
    }

    async fillLastName(value: string): Promise<void>{
        await this.writeText(this.lastNameField, value);
    }

    async fillPhoneNumber(value: string): Promise<void>{
        await this.writeText(this.phoneNumberField, value);
    }

    async selectPhoneCode(value: number): Promise<void>{
       // await this.page.locator(this.phoneCodeField).selectOption({value: value});
       await this.chooseFromList(this.phoneCodeField, value);
    }

}export {JoinAmisragasPage}