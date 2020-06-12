type validationTest = (text:string) => [boolean, string]

interface TextValidators {
  [key: string]: (...input : any[]) => validationTest
}

const validators : TextValidators = {
  isString: () => (text:string) => text && typeof text === 'string' ? [true, ''] : [false, 'is not a string'],
  required: () => (text:string) => text && typeof text === 'string' && text.length > 0 ? [true, ''] : [false, 'A value is required'],
  minLength: (minLen: number) => (text:string) => text && typeof text === 'string' && text.length >= minLen ? [true, ''] : [false, 'length must be greater than ' + minLen],
  maxLength: (maxLen: number) => (text:string) => text && typeof text === 'string' && text.length <= maxLen ? [true, ''] : [false, 'length must be less than ' + maxLen],
  isNumber: () => (text: string) => text && typeof text === 'string' && /\d*(\.)?\d*/.test(text) ? [true, ''] : [false, 'must be a number'],
  isNumberMinValue: (minVal: number) => (text: string) => text && typeof text === 'string' && /\d*(\.)?\d*/.test(text) && Number(text) >= minVal ? [true, ''] : [false, 'must be a number and greater than ' + minVal],
  isNumberMaxValue: (maxVal: number) => (text: string) => text && typeof text === 'string' && /\d*(\.)?\d*/.test(text) && Number(text) <= maxVal ? [true, ''] : [false, 'must be a number and less than ' + maxVal],
  isInteger: () => (text:string) => text && typeof text === 'string' && /\d+/.test(text) ? [true, ''] : [false, 'value must be an integer'],
  isUnquie: (takenValues:(string | number)[]) => (text:string) => text && typeof text === 'string' && !takenValues.includes(text) ? [true, ''] : [false, 'value must be unquie']
}

class TextValidator {
  #rules:validationTest[]
  isString(){
    this.#rules.push(validators.isString())
    return this
  }
  required(){
    this.#rules.push(validators.required())
    return this
  }
  minLength(minLen: number){
    this.#rules.push(validators.minLength(minLen))
    return this
  }
  maxLength(maxLen: number){
    this.#rules.push(validators.maxLength(maxLen))
    return this
  }
  isNumber(){
    this.#rules.push(validators.isNumber())
    return this
  }
  isNumberMinValue(minVal:number){
    this.#rules.push(validators.isNumberMinValue(minVal))
    return this
  }
  isNumberMaxValue(maxVal:number){
    this.#rules.push(validators.isNumberMaxValue(maxVal))
    return this
  }
  isInteger(){
    this.#rules.push(validators.isInteger())
    return this
  }
  isUnquie(takenValues:(string|number)[]){
    this.#rules.push(validators.isUnquie(takenValues))
    return this
  }
  validate(text:string){
    this.#rules.reduce<[Boolean, string]>(
      (acc, next) => {
        // test already failed
        if (!acc[0]) {return acc}

        // run next test
        return next(text)
      },
      [true, '']
    )
  }
}

export default TextValidator;
