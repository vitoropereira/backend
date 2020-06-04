interface IMailConfig {
  driver: "ethereal" | "ses"

  defaults:{
    from: {
      emailFrom: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      emailFrom: 'vitor.pereira@ivtecnologiasweb.com',
      name: 'Vitor'
    }
  }
} as IMailConfig
