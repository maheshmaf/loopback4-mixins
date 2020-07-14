import {Model} from '@loopback/repository';

/**
 * An interface to allow finding notes by title
 */
export interface FindByTitle<M extends Model> {
  find(filter: object): Promise<M[]>;

  // findByTitle(title: string): Promise<M[]>;
  // create(entity: DataObject<T>, options?: Options): Promise<T>;
  // createAll(entities: DataObject<T>[], options?: Options): Promise<T[]>;
  // save(entity: T, options?: Options): Promise<T>;
  // find(filter?: Filter<T>, options?: Options): Promise<(T & Relations)[]>;
  // findOne(filter?: Filter<T>, options?: Options): Promise<(T & Relations) | null>;
  // findById(id: ID, filter?: FilterExcludingWhere<T>, options?: Options): Promise<T & Relations>;
  // update(entity: T, options?: Options): Promise<void>;
  // delete(entity: T, options?: Options): Promise<void>;
  // updateAll(data: DataObject<T>, where?: Where<T>, options?: Options): Promise<Count>;
  // updateById(id: ID, data: DataObject<T>, options?: Options): Promise<void>;
  // replaceById(id: ID, data: DataObject<T>, options?: Options): Promise<void>;
  // deleteAll(where?: Where<T>, options?: Options): Promise<Count>;
  // deleteById(id: ID, options?: Options): Promise<void>;
  // count(where?: Where<T>, options?: Options): Promise<Count>;
  // exists(id: ID, options?: Options): Promise<boolean>;
}
