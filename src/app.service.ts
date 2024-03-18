import { Inject, Injectable } from '@nestjs/common';
import { S3_PROVIDER } from './s3-provider';
import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AppService {
  constructor(@Inject(S3_PROVIDER) private readonly s3Client: S3Client) {}

  getHello(): string {
    return 'Hello World!';
  }

  async testListBuckets() {
    const listBucketsCommand = new ListBucketsCommand();

    const buckets = await this.s3Client.send(listBucketsCommand);

    console.log(buckets);
  }
}
