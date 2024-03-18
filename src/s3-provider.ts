import { S3Client } from "@aws-sdk/client-s3";
import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export const S3_PROVIDER = Symbol('s3');

export const s3Provider: Provider = {
  provide: S3_PROVIDER,
  inject: [ConfigService],
  useFactory: (cfgService: ConfigService) => {
    const tenantId = cfgService.getOrThrow('S3_TENANT_ID');
    const endpoint = cfgService.getOrThrow('S3_ENDPOINT');
    const region = cfgService.getOrThrow('S3_REGION');
    const keyId = cfgService.getOrThrow('S3_ACCESS_KEY_ID');
    const secretAccessKey = cfgService.getOrThrow('S3_SECRET_KEY');

    const accessKeyId = tenantId + ':' + keyId;

    return new S3Client({
      region,
      endpoint,
      credentials: {
        secretAccessKey,
        accessKeyId,
      }
    })
  }
}