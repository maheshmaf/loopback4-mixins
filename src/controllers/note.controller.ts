/* eslint-disable no-shadow */
import {Constructor} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {
  FindByTitleControllerMixin,
  FindByTitleControllerMixinOptions,
} from '../mixins/find-by-title-controller-mixin';
import {Note} from '../models';
import {NoteRepository} from '../repositories';

const options: FindByTitleControllerMixinOptions = {
  basePath: '/notes',
  modelClass: Note,
};

export class NoteController extends FindByTitleControllerMixin<
  Note,
  Constructor<Object>
>(Object, options) {
  constructor(@repository(NoteRepository) public repository: NoteRepository) {
    super();
  }

  @post('/notes', {
    responses: {
      '200': {
        description: 'Note model instance',
        content: {'application/json': {schema: getModelSchemaRef(Note)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Note, {
            title: 'NewNote',
            exclude: ['id'],
          }),
        },
      },
    })
    note: Omit<Note, 'id'>,
  ): Promise<Note> {
    return this.repository.create(note);
  }

  @get('/notes/count', {
    responses: {
      '200': {
        description: 'Note model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Note) where?: Where<Note>): Promise<Count> {
    return this.repository.count(where);
  }

  @get('/notes', {
    responses: {
      '200': {
        description: 'Array of Note model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Note, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Note) filter?: Filter<Note>): Promise<Note[]> {
    return this.repository.find(filter);
  }

  @patch('/notes', {
    responses: {
      '200': {
        description: 'Note PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Note, {partial: true}),
        },
      },
    })
    note: Note,
    @param.where(Note) where?: Where<Note>,
  ): Promise<Count> {
    return this.repository.updateAll(note, where);
  }

  @get('/notes/{id}', {
    responses: {
      '200': {
        description: 'Note model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Note, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Note, {exclude: 'where'}) filter?: FilterExcludingWhere<Note>,
  ): Promise<Note> {
    return this.repository.findById(id, filter);
  }

  @patch('/notes/{id}', {
    responses: {
      '204': {
        description: 'Note PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Note, {partial: true}),
        },
      },
    })
    note: Note,
  ): Promise<void> {
    await this.repository.updateById(id, note);
  }

  @put('/notes/{id}', {
    responses: {
      '204': {
        description: 'Note PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() note: Note,
  ): Promise<void> {
    await this.repository.replaceById(id, note);
  }

  @del('/notes/{id}', {
    responses: {
      '204': {
        description: 'Note DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.repository.deleteById(id);
  }
}
