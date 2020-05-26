import IParseMailTemplateDTO from "@shared/container/provider/MailTempleteProvider/dtos/IParseMailTemplateDTO";

export default interface IMailTempleteProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>
}
