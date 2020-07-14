import {MixinTarget} from '@loopback/core';
import {Model, property} from '@loopback/repository';

/**
 * A mixin factory to add `category` property
 *
 * @param superClass - Base Class
 * @typeParam T - Model class
 */
export function AddCategoryPropertyMixin<T extends MixinTarget<Model>>(
  superClass: T,
) {
  class MixedModel extends superClass {
    @property({
      type: 'string',
      required: true,
    })
    category: string;
  }
  return MixedModel;
}
