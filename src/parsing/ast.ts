import get from 'lodash.get';
import { templateFunctions } from './template-functions';
import { getFunction } from './utils';

enum NodeType {
  Variable = 'variable',
  Function = 'function',
}

class AbstractNode {
  type: string;

  constructor(type: string) {
    this.type = type;
  }
}

class VariableNode extends AbstractNode {
  variableKey: string;

  constructor(variableKey: string) {
    super(NodeType.Variable);
    this.variableKey = variableKey;
  }
}

class FunctionNode extends AbstractNode {
  functionName: string;
  functionArguments: Node[];

  constructor(functionName: string, functionArguments: Node[]) {
    super(NodeType.Function);
    this.functionName = functionName;
    this.functionArguments = functionArguments;
  }
}

type Node = VariableNode | FunctionNode;

export function getAST(code: string): Node {
  const result = getFunction(code);
  if (!result) {
    return new VariableNode(code);
  }

  const { functionName, functionContent } = result;

  if (!(functionName in templateFunctions)) {
    throw new Error(`function name ${functionName} does not exist`);
  }

  const args = functionContent.split(',').map((el) => el.trim()); // remove stuff like "spaces"

  return new FunctionNode(
    functionName,
    args.map((arg) => getAST(arg))
  );
}

export function executeAST(ast: Node, message: object): unknown {
  if (ast instanceof VariableNode) {
    return get(message, ast.variableKey);
  }

  if (ast instanceof FunctionNode) {
    if (!(ast.functionName in templateFunctions)) {
      throw new Error('invalid function name');
    }

    const func = templateFunctions[ast.functionName];
    const args = ast.functionArguments.map((functionArgument) =>
      executeAST(functionArgument, message)
    );

    return func(...args);
  }

  throw new Error('invalid node type');
}
