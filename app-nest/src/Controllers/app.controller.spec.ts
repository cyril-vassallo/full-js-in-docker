import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { HomeService } from '../Services/home.service';

describe('AppController', () => {
  let homeController: HomeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [HomeService],
    }).compile();

    homeController = app.get<HomeController>(HomeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(homeController.getFeatures()).toBe('Hello World!');
    });
  });
});
