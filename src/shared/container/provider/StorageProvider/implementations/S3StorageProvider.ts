import fs from 'fs'
import path from 'path'
import mime from 'mime'
import aws, { S3 } from 'aws-sdk'
import uploadConfig from '@config/upload'
import IStorageProvider from '@shared/container/provider/StorageProvider/models/IStorageProvider'

class DisckStorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1'
    })
  }

  public async saveFile(file: string): Promise<string> {
    const originalParh = path.resolve(uploadConfig.tmpFolder, file)

    const ContentType = mime.getType(originalParh)

    if (!ContentType) {
      throw new Error('File not found')
    }

    const fileContent = await fs.promises.readFile(originalParh)

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise()

    await fs.promises.unlink(originalParh)

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise()
  }

}

export default DisckStorageProvider
