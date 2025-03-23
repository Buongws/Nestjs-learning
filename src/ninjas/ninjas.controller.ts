import { Controller } from '@nestjs/common';

@Controller('ninjas')
export class NinjasController {
  @Get()
  getNinjas() {
    return { message: 'I am a ninja' };
  }

  @Post()
  createNinja() {
    return { message: 'Ninja created' };
  }

  @Put(':id')
  updateNinja(@Param('id') id: string) {
    return { message: `Ninja ${id} updated` };
  }

  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return { message: `Ninja ${id} deleted` };
  }
}
