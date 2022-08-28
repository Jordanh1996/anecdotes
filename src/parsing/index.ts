import { executeAST, getAST } from './ast';
import { getVariables, removeVariableBrackets } from './utils';

export function createTransformerFunction(
  config: Record<string, string>
): (message: object) => Record<string, string> {
  const keyToFunction = Object.entries(config).reduce<Record<string, (message: object) => string>>(
    (result, [key, template]) => {
      const variables = getVariables(template);
      const asts = variables.map((variable) => getAST(removeVariableBrackets(variable)));

      const func = (message: object) => {
        for (let i = 0; i < variables.length; i++) {
          const variable = variables[i];
          const ast = asts[i];
          const astResult = executeAST(ast, message);

          if (typeof astResult !== 'string') {
            throw new Error('invalid ast result');
          }

          template = template.replace(variable, astResult);
        }

        return template;
      };

      result[key] = func;
      return result;
    },
    {}
  );

  return (message: object) => {
    return Object.keys(config).reduce<Record<string, string>>((result, key) => {
      result[key] = keyToFunction[key](message);
      return result;
    }, {});
  };
}
