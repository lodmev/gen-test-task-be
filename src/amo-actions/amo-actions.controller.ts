import { Body, Controller, Param, Post } from '@nestjs/common';
import { AmoActionsService } from './amo-actions.service';
import { SimpleEntityDTO } from './dto/model';

@Controller('amo-actions')
export class AmoActionsController {
  constructor(private readonly amoActionsService: AmoActionsService) {}
  @Post(':entity')
  createLeads(
    @Body() createLeadsDTO: SimpleEntityDTO,
    @Param('entity') entity: string,
  ) {
    return this.amoActionsService.createEntity(createLeadsDTO, entity);
  }
  // @POST('contacts')
  // createContacts(){

  // }
  // @POST('companies') {
  //   createCompany() {

  //   }
}
