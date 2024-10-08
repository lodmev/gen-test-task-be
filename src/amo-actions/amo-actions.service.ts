import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { SimpleEntityDTO } from './dto/model';

const tokenProvider = {
  url: 'https://app2.gnzs.ru/amocrm/test/oauth/get-token.php',
  xClienId: '31992158',
};
type tokenProviderResponse = {
  access_token: string;
  base_domain: string;
};
@Injectable()
export class AmoActionsService {
  private accessToken = '';
  private baseDomain = '';
  constructor(private readonly httpService: HttpService) {}
  async getCredentials(): Promise<tokenProviderResponse> {
    if (this.accessToken && this.baseDomain) {
      return { access_token: this.accessToken, base_domain: this.baseDomain };
    }
    const { data } = await firstValueFrom(
      this.httpService
        .get<tokenProviderResponse>(tokenProvider.url, {
          headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': tokenProvider.xClienId,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error);
            throw new HttpException(error.message, 500);
          }),
        ),
    );
    this.accessToken = data.access_token;
    this.baseDomain = data.base_domain;
    return data;
  }
  async createEntity(data: SimpleEntityDTO, entity: string) {
    // Максимально упростил создание сущностей для экономии времени
    const { access_token, base_domain } = await this.getCredentials();
    const response = this.httpService
      .post(`https://${base_domain}/api/v4/${entity}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      })
      .pipe(
        catchError((error: AxiosError) => {
          console.error(error.response.data);
          throw new HttpException(
            error.response.data || error.message,
            Number(error.status),
          );
        }),
      );
    const result = await (await firstValueFrom(response)).data;
    return result;
  }
}
