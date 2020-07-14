/* eslint-disable @typescript-eslint/no-explicit-any */
import {MixinTarget} from '@loopback/core';
import {CrudRepository, Model, Where} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';

/**
 * Options to mixin
 */
export interface FindByTitleControllerMixinOptions {
  /**
   * Base path for the controller
   */
  basePath: string;
  /**
   * Model class for CRUD
   */
  modelClass: typeof Model;
}

/**
 * A mixin factory for controllers to be extended by `FindByTitle`
 * @param superClass - Base class
 * @param options - Options for the controller
 *
 * @typeParam M - Model class
 * @typeParam T - Base class
 */
export function FindByTitleControllerMixin<
  M extends Model,
  T extends MixinTarget<object>
>(superClass: T, options: FindByTitleControllerMixinOptions) {
  class MixedController extends superClass {
    repository: CrudRepository<M>;

    @get(`${options.basePath}/{title}`, {
      responses: {
        '200': {
          description: `Array of ${options.modelClass.modelName} model instances`,
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(options.modelClass, {
                  includeRelations: true,
                }),
              },
            },
          },
        },
      },
    })
    async findByTitle(
      @param.path.string('title') title: string,
    ): Promise<any[]> {
      const where = {title} as Where<M>;
      const titleFilter = {where};
      return this.repository.find(titleFilter);
    }
  }

  return MixedController;
}
