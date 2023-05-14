import { Test } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { User } from '../../user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('CatsController', () => {
  let personController: PersonController;
  let personService: PersonService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [TypeOrmModule.forFeature([User])],
        controllers: [PersonController],
        providers: [PersonService],
      }).compile();

    personService = moduleRef.get<PersonService>(PersonService);
    personController = moduleRef.get<PersonController>(PersonController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = [] as User[];
      jest.spyOn(personService, 'getAll').mockImplementation(() => Promise.resolve(result));

      expect(await personController.findAll()).toBe(result);
    });
  });
});
