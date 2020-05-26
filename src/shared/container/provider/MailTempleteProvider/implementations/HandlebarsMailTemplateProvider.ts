import handlebars from 'handlebars'
import fs from "fs";

import IParseMailTemplateDTO from "@shared/container/provider/MailTempleteProvider/dtos/IParseMailTemplateDTO";
import IMailTempleteProvider from '@shared/container/provider/MailTempleteProvider/models/IMailTempleteProvider'

class HandlebarsMailTemplateProvider implements IMailTempleteProvider {
  public async parse({
    file,
    variable
  }: IParseMailTemplateDTO): Promise<string> {
    const tempçateFoleContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })
    const parseTemplete = handlebars.compile(tempçateFoleContent)

    return parseTemplete(variable)
  }
}

export default HandlebarsMailTemplateProvider
