import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/entity/user.entity';
import { UserModule } from '../src/user/user.module';
import { Repository } from 'typeorm';
import * as request from 'supertest';

let app: INestApplication;
let repository: Repository<User>;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      
      // Use the e2e_test database to run the tests
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 6500,
        username: 'admin',
        password: 'password123',
        database: 'api_node',
        entities: ['./**/*.entity.ts'],
        synchronize: false,
      }),
      UserModule,
    ],
  }).compile();
  app = module.createNestApplication();
  await app.init();
  repository = module.get('UserRepository');
});

afterAll(async () => {
  await app.close();
});

describe('GET /user', () => {

  it('should return an array of users', async () => {
    // Pre-populate the DB with some dummy users
    // await repository.save([
    //   { name: 'test-name-0' },
    //   { name: 'test-name-1' },
    // ]);

    // Run your end-to-end test
    return request(app.getHttpServer())
    // const { body } = await supertest
      // .agent(app.getHttpServer())
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    // expect(body).toEqual([
    //   { id: expect.any(Number), name: 'test-name-0' },
    //   { id: expect.any(Number), name: 'test-name-1' },
    // ]);
  });
});
