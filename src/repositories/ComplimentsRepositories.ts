import { EntityRepository, Repository } from 'typeorm';
import { Compliment } from '../models/Compliment';

@EntityRepository(Compliment)
class ComplimentsRepository extends Repository<Compliment> {}

export { ComplimentsRepository };
