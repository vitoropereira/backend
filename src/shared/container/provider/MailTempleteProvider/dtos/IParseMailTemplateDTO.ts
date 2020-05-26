interface ITempleteVariable {
  [key: string]: string | number
}

export default interface IParseMailTemplateDTO {
  file: string
  variable: ITempleteVariable
}
