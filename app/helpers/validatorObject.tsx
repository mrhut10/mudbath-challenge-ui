import Validator, {validationResult, validationTest} from './validator'

const regexNumber = /^(\d*\.?\d*)?$/
const regexInteger = /^\d*$/

class TextValidator extends Validator {
  constructor (){
    super()
  }
  isArray(failmessage:string){
    this.rules.push(
      Validator.resultGenerator(failmessage, (input) => Array.isArray(input))
    )
    return this
  }
  genericTest(failmessage:string, test:(input) => boolean):Validator{
    this.rules.push(
      Validator.resultGenerator(failmessage, test)
    )
    return this
  }
}

export default TextValidator;
export * from './validator'