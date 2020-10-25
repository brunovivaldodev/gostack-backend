import IParseMailTemplate from '../dtos/IParseMailTemplateDto';

export default interface IMailTemplateProvider {
    parse(data: IParseMailTemplate): Promise<string>;
}
