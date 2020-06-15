export type validationResult = [boolean, string]
export type validationTest = (input:any) => validationResult

class Validator {
  rules: validationTest[]
  static resultGenerator(failmessage:string, condition:(input) => boolean):validationTest{
    return (input) => {
      const result = condition(input)
      return [result, result ? '' : failmessage]
    }
  }
  constructor(){ this.rules = []}
  evaluate(input:any):validationResult {
    return this.rules.reduce<validationResult>((acc, next) => {
      // previous fail
      if (acc[0] === false) return acc

      // run next test
      return next(input)
    }, [true, ''])
  }
}


export default Validator
