import IParseMailTemplateDTO from "@shared/container/provider/MailTempleteProvider/dtos/IParseMailTemplateDTO";
import IMailTempleteProvider from '@shared/container/provider/MailTempleteProvider/models/IMailTempleteProvider'

class FakeMailTempleteProvider implements IMailTempleteProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template
  }
}

export default FakeMailTempleteProvider
