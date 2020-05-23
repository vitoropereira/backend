import handlebars from 'handlebars'

import IParseMailTemplateDTO from "@shared/container/provider/MailTempleteProvider/dtos/IParseMailTemplateDTO";
import IMailTempleteProvider from '@shared/container/provider/MailTempleteProvider/models/IMailTempleteProvider'

class HandlebarsMailTemplateProvider implements IMailTempleteProvider {
  public async parse({
    template,
    variable
  }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplete = handlebars.compile(template)

    return parseTemplete(variable)
  }
}

export default HandlebarsMailTemplateProvider
