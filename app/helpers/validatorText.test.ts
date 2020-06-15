import ValidatorText from './validatorText'
import { assert } from './index'

export default () => {
  {
      const failMessage = 'should be a string'
      const testResult = new ValidatorText().isString(failMessage).evaluate({})
      assert(
        testResult[0] === false && testResult[1] === failMessage,
        'assert isString fail case'
      )
  }
  {
      const failMessage = 'should be a string'
      const testResult = new ValidatorText().isString(failMessage).evaluate('')
      assert(
        testResult[0] === true && testResult[1] === '',
        'assert isString sucess case'
      )
  }
  {
      const failMessage = 'should be required'
      const testResult = new ValidatorText().required(failMessage).evaluate('')
      assert(
        testResult[0] === false && testResult[1] === failMessage,
        'assert required fail case'
      )
  }
  {
      const failMessage = 'should be required'
      const testResult = new ValidatorText().required(failMessage).evaluate('hello')
      assert(
        testResult[0] === true && testResult[1] === '',
        'assert required sucess case'
      )
  }
  {
      const failMessage = 'should be at least 10 char'
      const testResult = new ValidatorText().minLength(failMessage, 10).evaluate('12345678')
      assert(
        testResult[0] === false && testResult[1] === failMessage,
        'assert minLength fail case'
      )
  }
  {
      const failMessage = 'should be at least 10 char'
      const testResult = new ValidatorText().minLength(failMessage, 10).evaluate('1234567890')
      assert(
        testResult[0] === true && testResult[1] === '',
        'assert minLength sucess case'
      )
  }
  {
      const failMessage = 'length no greater than 10'
      const testResult = new ValidatorText().maxLength(failMessage, 10).evaluate('12345678901')
      assert(
        testResult[0] === false && testResult[1] === failMessage,
        'assert maxLength fail case'
      )
  }
  {
      const failMessage = 'length no greater than 10'
      const testResult = new ValidatorText().maxLength(failMessage, 10).evaluate('1234567890')
      assert(
        testResult[0] === true && testResult[1] === '',
        'assert maxLength succes case'
      )
  }
  {
      const failMessage = 'must Be Number'
      const testResult = new ValidatorText().isNumber(failMessage).evaluate('t')
      assert(
        testResult[0] === false && testResult[1] === failMessage,
        'assert isNumber fail case'
      )
  }
  {
      const failMessage = 'must Be Number'
      const testResult = new ValidatorText().isNumber(failMessage).evaluate('0.02')
      assert(
        testResult[0] === true && testResult[1] === '',
        'assert isNumber succes case'
      )
  }
  {
      const failMessage = 'must be a non-negative number'
      const testResult = new ValidatorText().isNumber('must be a number').MinValue(failMessage, 0).evaluate('-1')
      assert(
        testResult[0] === false && testResult[1] === failMessage,
        'assert MinValue fail case'
      )
  }
  {
      const failMessage = 'must be a non-negative number'
      const testResult = new ValidatorText().isNumber('must be a number').MinValue(failMessage, 0).evaluate('0')
      assert(
        testResult[0] === true && testResult[1] === '',
        'assert MinValue succes case'
      )
  }
  {
    const failMessage = 'must be a integer number'
      const test = new ValidatorText().isInteger(failMessage)
      assert(
        test.evaluate('0.01')[0] === false && test.evaluate('t')[0] === false && test.evaluate('t')[1] === failMessage,
        'assert isInteger fail case'
      )
  }
  {
    const failMessage = 'must be a integer number'
      const test = new ValidatorText().isInteger(failMessage)
      assert(
        test.evaluate('1')[0] && test.evaluate('-1')[0] && test.evaluate('-1')[1] === '',
        'assert isInteger success case'
      )
  }
  {
    const failMessage = 'must be a unquie value'
      const test = new ValidatorText().isUnquie(failMessage, ['a','b','c'])
      assert(
        !test.evaluate('a')[0] && !test.evaluate('b')[0] && test.evaluate('a')[1] === failMessage,
        'assert isUnquie fail case'
      )
  }
  {
    const failMessage = 'must be a unquie value'
      const test = new ValidatorText().isUnquie(failMessage, ['a','b','c'])
      assert(
        test.evaluate('d')[0] && test.evaluate('e')[0] && test.evaluate('e')[1] === '',
        'assert isUnquie succes case'
      )
  }
  {
    const failMessage = 'must be a isOneof value'
      const test = new ValidatorText().isOneOf(failMessage, ['a','b','c'])
      assert(
        !test.evaluate('d')[0] && !test.evaluate('e')[0] && test.evaluate('e')[1] === failMessage,
        'assert isOneOf fail case'
        )
      }
      {
        const failMessage = 'must be a isOneof value'
        const test = new ValidatorText().isOneOf(failMessage, ['a','b','c'])
        assert(
          test.evaluate('a')[0] && test.evaluate('b')[0] && test.evaluate('a')[1] === '',
          'assert isOneOf success case'
      )
  }
}