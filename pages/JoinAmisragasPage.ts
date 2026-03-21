import { BasePage } from "./BasePage";
class JoinAmisragasPage extends BasePage{
    subjectField: string
    firstNameField: string
    lastNameField: string
    phoneCodeField: string
    mobilePhoneField: string
    phoneField: string
    faxField: string
    customerIdField: string
    cityField: string
    streetField: string
    zipField: string
    messageField: string
    constructor(page: any){
        super(page)
        this.subjectField= `xpath=//div[@class='srv-form__items']/div[1]//select`
        this.firstNameField= `input[name="firstname"]`
        this.lastNameField= `input[name="surname"]`
        this.phoneCodeField= `select[name="phone-code"]`
        this.mobilePhoneField= `input[name="phone-number"]`
        this.phoneField= `input[name="phone2"]`
        this.faxField= `input[name="fax"]`
        this.customerIdField= `input[name="customer_id"]`
        this.cityField= `input[name="city"]`
        this.streetField= `input[name="street"]`
        this.zipField= `input[name="zip"]`
        this.messageField= `textarea[name="message"]`
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
        await this.writeText(this.mobilePhoneField, value);
    }

    async fillPhone2(value: string): Promise<void>{
        await this.writeText(this.phoneField, value);
    }

    async fillFax(value: string): Promise<void>{
        await this.writeText(this.faxField, value);
    }

    async fillCustomerId(value: string): Promise<void>{
        await this.writeText(this.customerIdField, value);
    }

    async fillCity(value: string): Promise<void>{
        await this.writeText(this.cityField, value);
    }

    async fillStreet(value: string): Promise<void>{
        await this.writeText(this.streetField, value);
    }

    async fillZip(value: string): Promise<void>{
        await this.writeText(this.zipField, value);
    }

    async fillMessage(value: string): Promise<void>{
        await this.writeText(this.messageField, value);
    }

    async selectPhoneCode(value: number): Promise<void>{
       // await this.page.locator(this.phoneCodeField).selectOption({value: value});
       await this.chooseFromList(this.phoneCodeField, value);
    }

}export {JoinAmisragasPage}