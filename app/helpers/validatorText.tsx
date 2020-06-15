import Validator, {validationResult, validationTest} from './validator'
import { assert } from './index'

const regexNumber = /^[-+]?(\d*\.?\d*)?$/
const regexInteger = /^[-+]?\d*$/

class ValidatorText extends Validator {
  constructor (){
    super()
  }
  isString(failMessage:string):ValidatorText{
    this.rules.push(
      Validator.resultGenerator(failMessage, (text:string) => typeof text === 'string')
    )
    return this
  }
  required(failMessage:string='Value required'):ValidatorText{
    this.rules.push(
      Validator.resultGenerator(failMessage, (text:string) => typeof text === 'string' && text.length > 0)
    )
    return this
  }
  minLength(failMessage:string='Value to short', minLen: number):ValidatorText{
    this.rules.push(
      Validator.resultGenerator(failMessage, (text:string) => typeof text === 'string' && text.length >= minLen)
    )
    return this
  }
  maxLength(failMessage:string='Value to long', maxLen: number):ValidatorText{
    this.rules.push(
      Validator.resultGenerator(failMessage, (text:string) => typeof text === 'string' && text.length <= maxLen)
    )
    return this
  }
  isNumber(failMessage:string):ValidatorText{
    this.rules.push(
      Validator.resultGenerator(failMessage, (text:string) => typeof text === 'string' && regexNumber.test(text))
    )
    return  this
  }
  isInteger(failMessage:string):ValidatorText{
    this.rules.push(
      Validator.resultGenerator(failMessage, (text:string) => typeof text === 'string' && regexInteger.test(text))
    )
    return this
  }
  MinValue(failMessage:string, minVal):ValidatorText{
    this.rules.push(
      Validator.resultGenerator(failMessage, (text) => typeof text === 'string' && regexNumber.test(text) && Number(text) >= minVal)
    )
    return this
  }
  MaxValue(failMessage:string, maxValue):ValidatorText{
    this.rules.push(
      Validator.resultGenerator(failMessage, (text) => typeof text === 'string' && regexNumber.test(text) && Number(text) <= maxValue)
    )
    return this
  }
  isUnquie(failMessage:string, takenValues:string[]):ValidatorText{
    this.rules.push(
      Validator.resultGenerator(failMessage, (text) => !takenValues.includes(text))
    )
    return this
  }
  isOneOf(failMessage:string, values:string[]):ValidatorText{
    this.rules.push(
      Validator.resultGenerator(failMessage, (text) => values.includes(text))
    )
    return this
  }
}

export default ValidatorText;
