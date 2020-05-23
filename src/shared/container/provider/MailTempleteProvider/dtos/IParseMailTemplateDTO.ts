interface ITempleteVariable {
  [key: string]: string | number
}

export default interface IParseMailTemplateDTO {
  template: string
  variable: ITempleteVariable
}
