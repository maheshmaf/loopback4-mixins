/* eslint-disable @typescript-eslint/no-unused-vars */
import {LoggerMixin} from '../mixins/logger.mixin';
import {TimeStampMixin} from '../mixins/time-stamp.mixin';

class SimpleController {
  constructor() {}
  greet() {
    console.log('hi!');
  }
}

class AdvancedController extends LoggerMixin(
  TimeStampMixin(SimpleController),
) {}

// verify new method and property are added to `AdvancedController`:
const aControllerInst = new AdvancedController();
aControllerInst.printTimeStamp();
// print out: Instance created at: Tue Oct 17 2017 22:28:49 GMT-0400 (EDT)
aControllerInst.logger('hello world!');
// print out: Prints out a string: hello world!
