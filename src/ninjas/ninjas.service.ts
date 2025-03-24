import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja-dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 1, name: 'Ninja 1', weapon: 'stars' },
    { id: 2, name: 'Ninja 2', weapon: 'nunchucks' },
    { id: 3, name: 'Ninja 3', weapon: 'Nunchaku' },
  ];

  getNinjas(weapon?: 'stars' | 'nunchucks' | 'Nunchaku') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  getNinjaById(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error(`Ninja with ID ${id} not found.`);
    }
    return ninja;
  }

  createNinja(CreateNinjaDto: CreateNinjaDto) {
    const newNinja = {
      id: Date.now(),
      ...CreateNinjaDto,
    };
    this.ninjas.push(newNinja);
    return {
      message: 'Ninja created successfully',
      ninja: newNinja,
    };
  }

  updateNinja(id: number, CreateNinjaDto: CreateNinjaDto) {
    const ninjaIndex = this.ninjas.findIndex((ninja) => ninja.id === id);
    if (ninjaIndex === -1) {
      throw new Error(`Ninja with ID ${id} not found.`);
    }

    this.ninjas[ninjaIndex] = {
      ...this.ninjas[ninjaIndex],
      ...CreateNinjaDto,
    };

    return {
      message: 'Ninja updated successfully',
      ninja: this.ninjas[ninjaIndex],
    };
  }

  removeNinja(id: number) {
    const ninjaIndex = this.ninjas.findIndex((ninja) => ninja.id === id);
    if (ninjaIndex === -1) {
      throw new NotFoundException(`Ninja with ID ${id} not found.`);
    }

    const deleteNinja = this.ninjas[ninjaIndex];
    this.ninjas.splice(ninjaIndex, 1);
    return {
      message: 'Ninja deleted successfully',
      ninja: deleteNinja,
    };
  }
}
