/* eslint-disable @typescript-eslint/no-explicit-any */
import {Class} from '@loopback/repository';

export function LoggerMixin<T extends Class<any>>(baseClass: T) {
  return class extends baseClass {
    // add a new method `log()`
    logger(str: string) {
      console.log('Prints out a string: ' + str);
    }
  };
}
