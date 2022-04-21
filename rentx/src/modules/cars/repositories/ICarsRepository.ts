import { ICreateCarDTO } from '../dtos/ICreateCar';
import { Car } from '../infra/database/entities/Car';

export interface ICarsRepository {
  list(): Promise<Car[]>;
  create(data: ICreateCarDTO): Promise<Car>;
  findByPlate(plate: string): Promise<Car>;
}
