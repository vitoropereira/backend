import IMailTempleteProvider from '@shared/container/provider/MailTempleteProvider/models/IMailTempleteProvider'

class FakeMailTempleteProvider implements IMailTempleteProvider {
  public async parse(): Promise<string> {
    return 'Mail Content'
  }
}

export default FakeMailTempleteProvider
