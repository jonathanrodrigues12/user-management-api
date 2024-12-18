/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    findAllUsers: jest.fn(),
    findOneUser: jest.fn(),
    softDeleteUser: jest.fn(),
    restoreUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'Password1!',
      };

      const result = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      mockUserService.createUser.mockResolvedValue(result);

      expect(await userController.createUser(createUserDto)).toEqual(result);
      expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw BadRequestException if email is invalid', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'Password1!',
      };

      mockUserService.createUser.mockRejectedValue(
        new BadRequestException('Invalid email format'),
      );

      await expect(userController.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('getOneUser', () => {
    it('should return a user by ID successfully', async () => {
      const result = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      mockUserService.findOneUser.mockResolvedValue(result);

      expect(await userController.getOneUser('1')).toEqual(result);
      expect(mockUserService.findOneUser).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserService.findOneUser.mockRejectedValue(
        new NotFoundException('User not found'),
      );

      await expect(userController.getOneUser('999')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserService.findOneUser).toHaveBeenCalledWith('999');
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      };

      const result = {
        id: '1',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      };

      mockUserService.updateUser.mockResolvedValue(result);

      expect(await userController.updateUser('1', updateUserDto)).toEqual(
        result,
      );
      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        '1',
        updateUserDto,
      );
    });
  });

  describe('softDeleteUser', () => {
    it('should soft delete a user successfully', async () => {
      const id = '1';

      mockUserService.softDeleteUser.mockResolvedValue(undefined);

      await userController.softDeleteUser(id);
      expect(mockUserService.softDeleteUser).toHaveBeenCalledWith(id);
    });
  });

  describe('restoreUser', () => {
    it('should restore a soft deleted user successfully', async () => {
      const result = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      mockUserService.restoreUser.mockResolvedValue(result);

      expect(await userController.restoreUser('1')).toEqual(result);
      expect(mockUserService.restoreUser).toHaveBeenCalledWith('1');
    });
  });

  describe('getAllUsers', () => {
    it('should return all users paginated successfully', async () => {
      const result = {
        data: [
          { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
          { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
        ],
        total: 2,
        page: 1,
        limit: 10,
      };

      mockUserService.findAllUsers.mockResolvedValue(result);

      expect(await userController.getAllUsers(1, 10)).toEqual(result);
      expect(mockUserService.findAllUsers).toHaveBeenCalledWith(1, 10);
    });
  });
});
