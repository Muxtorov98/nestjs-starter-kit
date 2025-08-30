import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode} from '@nestjs/common';

interface Cat {
  id: number;
  name: string;
  age: number;
}

@Controller('cats')
export class CatsController {
  private cats: Cat[] = []; // in-memory saqlash
  private nextId = 1;

  // GET /cats
  @Get()
  @HttpCode(200)
  findAll(): Cat[] {
    return this.cats;
  }

  // GET /cats/:id
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string): Cat | string {
    const cat = this.cats.find(c => c.id === parseInt(id, 10));
    return cat || `Cat with id ${id} not found`;
  }

  // POST /cats
  @Post()
  @HttpCode(201)
  create(@Body() cat: Omit<Cat, 'id'>): Cat {
    const newCat: Cat = { id: this.nextId++, ...cat };
    this.cats.push(newCat);
    return newCat;
  }

  // PUT /cats/:id
  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() cat: Partial<Omit<Cat, 'id'>>): Cat | string {
    const index = this.cats.findIndex(c => c.id === parseInt(id, 10));
    if (index === -1) return `Cat with id ${id} not found`;
    this.cats[index] = { ...this.cats[index], ...cat };
    return this.cats[index];
  }

  // DELETE /cats/:id
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): string {
    const index = this.cats.findIndex(c => c.id === parseInt(id, 10));
    if (index === -1) return `Cat with id ${id} not found`;
    this.cats.splice(index, 1);
    return `Cat with id ${id} deleted`;
  }
}
