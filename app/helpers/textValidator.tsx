type validationTest = (text:string) => [boolean, string]

interface TextValidators {
  [key: string]: (failMessage:string, ...input : any[]) => validationTest
}

class TextValidator {
  rules:validationTest[]
  constructor (){
    this.rules = []
  }
  required(failMessage:string='Value required'){
    this.rules.push(
      (text:string) => text && typeof text === 'string' && text.length > 0 ? [true, ''] : [false, failMessage],
    )
    return this
  }
  minLength(failMessage:string='Value to short', minLen: number){
    this.rules.push(
      (text:string) => text && typeof text === 'string' && text.length >= minLen ? [true, ''] : [false, failMessage],
    )
    return this
  }
  maxLength(failMessage:string='Value to long', maxLen: number){
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
  isNumberMinValue(failMessage:string, minVal: number){
    this.rules.push(
      (text: string) => text && typeof text === 'string' && /\d*(\.)?\d*/.test(text) && Number(text) >= minVal ? [true, ''] : [false, failMessage],
    )
    return this
  }
  isNumberMaxValue(failMessage:string, maxVal: number){
    this.rules.push(
      (text: string) => text && typeof text === 'string' && /\d*(\.)?\d*/.test(text) && Number(text) <= maxVal ? [true, ''] : [false, failMessage],
    )
    return this
  }
  isInteger(failMessage:string){
    this.rules.push(
      (text:string) => text && typeof text === 'string' && /\d+/.test(text) && Number.isInteger(Number(text)) ? [true, ''] : [false, failMessage],
    )
    return this
  }
  isUnquie(failMessage:string, takenValues:string[]){
    this.rules.push(
      (text:string) => text && typeof text === 'string' && !takenValues.includes(text) ? [true, ''] : [false, failMessage]
    )
    return this
  }
  oneOf(failMessage:string, values:string[]){
    this.rules.push(
      (text:string) => text && typeof text === 'string' && values.includes(text) ? [true, ''] : [false, failMessage]
    )
    return this
  }
  isCommaSeparatedIntegers(failMessage:string){
    this.rules.push(
      (text:string) => text && typeof text === 'string' && /^\d+(,\d+)*$/.test(text) ? [true, ''] : [false, failMessage]
    )
    return this
  }
  isCommaSeparatedIntegersNotInclude(failMessage: string, value:number){
    this.rules.push(
      (text:string) =>
        text &&
        typeof text === 'string' &&
        /^\d+(,\d+)*$/.test(text) &&
        text.split(',').every(item => Number(item) !== value)
          ? [true, '']
          : [false, failMessage]
    )
    return this
  }
  isCommaSeparatedIntegerAndEachValueInList(failMessage:string, fnToValues:() => number[]){
    this.rules.push(
      (text:string) =>
        text &&
        typeof text === 'string' &&
        /^\d+(,\d+)*$/.test(text) &&
        text.split(',').every(item => /^\d+$/.test(item) && fnToValues().includes(Number(item)))
          ? [true, '']
          : [false, failMessage]
    )
    return this
  }
  isCommaSeparatedIntegerInquieValues(failMessage:string){
    this.rules.push(
      (text:string) => 
        text &&
        typeof text === 'string' &&
        text.split(',').every(item => /\d+/.test(item)) &&
        text.split(',')
          .reduce<[boolean, number[]]>(
            (acc, next) => {
              // this test each item in array is unquie number
              const value = Number(next)
              // case previous fail
              if (!acc[0]) return acc
            
              // case new fail
              if (acc[1].includes(value)) return [false, acc[1]]

              // case pass
              return [true, [...acc[1], value]]
          },
          [true, []]
        )[0] ? [true, ''] : [false, failMessage]
    )
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
