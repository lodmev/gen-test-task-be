import { Controller } from '@nestjs/common';
import { AmoActionsService } from './amo-actions.service';

@Controller('amo-actions')
export class AmoActionsController {
  constructor(private readonly amoActionsService: AmoActionsService) {}
  @POST('leads')
  createLeads() {

  }
  @POST('contacts')
  createContacts(){

  }
  @POST('companies') {
    createCompany() {
      
    }
  }
 }
