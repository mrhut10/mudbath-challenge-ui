type validationTest = (text:string) => [boolean, string]

interface TextValidators {
  [key: string]: (failMessage:string, ...input : any[]) => validationTest
}

const validators : TextValidators = {
  isNumberMaxValue: (failMessage, maxVal: number) => (text: string) => text && typeof text === 'string' && /\d*(\.)?\d*/.test(text) && Number(text) <= maxVal ? [true, ''] : [false, failMessage],
  isInteger: (failMessage) => (text:string) => text && typeof text === 'string' && /\d+/.test(text) ? [true, ''] : [false, failMessage],
  isUnquie: (failMessage, takenValues:(string)[]) => (text:string) => text && typeof text === 'string' && !takenValues.includes(text) ? [true, ''] : [false, failMessage]
}

class TextValidator {
  rules:validationTest[]
  constructor (){
    this.rules = []
  }
  isString(){
    this.rules.push(validators.isString())
    return this
  }
  required(failMessage='Value required'){
    this.rules.push(
      (text:string) => text && typeof text === 'string' && text.length > 0 ? [true, ''] : [false, failMessage],
    )
    return this
  }
  minLength(failMessage='Value to short', minLen: number){
    this.rules.push(
      (text:string) => text && typeof text === 'string' && text.length >= minLen ? [true, ''] : [false, failMessage],
    )
    return this
  }
  maxLength(failMessage='Value to long', maxLen: number){
    this.rules.push(
      (text:string) => text && typeof text === 'string' && text.length <= maxLen ? [true, ''] : [false, failMessage],
    )
    return this
  }
  isNumber(failMessage:string){
    this.rules.push(
      (text: string) => text && typeof text === 'string' && /\d*(\.)?\d*/.test(text) ? [true, ''] : [false, failMessage],
    )
    return this
  }
  isNumberMinValue(failMessage, minVal: number){
    this.rules.push(
      (text: string) => text && typeof text === 'string' && /\d*(\.)?\d*/.test(text) && Number(text) >= minVal ? [true, ''] : [false, failMessage],
    )
    return this
  }
  isNumberMaxValue(maxVal:number){
    this.rules.push(validators.isNumberMaxValue(maxVal))
    return this
  }
  isInteger(){
    this.rules.push(validators.isInteger())
    return this
  }
  isUnquie(takenValues:(string|number)[]){
    this.rules.push(validators.isUnquie(takenValues))
    return this
  }
  validate(text:string):[boolean, string]{
    return this.rules.reduce<[boolean, string]>(
      (acc, next) => {
        // test already failed
        if (acc[0] === false) return acc

        // run next test
        return next(text)
      },
      [true, '']
    )
  }
}

export default TextValidator;
