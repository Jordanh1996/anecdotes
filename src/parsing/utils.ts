export function getFunction(key: string) {
  const match = key.match(/\(.*?\)$/g);

  if (!match || !match.length) {
    return null;
  }

  const functionName = key.split('(')[0];
  const functionContent = removeFunctionBrackets(match[0]);

  return { functionName, functionContent };
}

export function getVariables(key: string) {
  return key.match(/\{\{.*?\}\}/g) || [];
}

function trimSides(key: string, countStart: number, countEnd = countStart) {
  return key.substring(countStart, key.length - countEnd);
}

export function removeFunctionBrackets(key: string) {
  return trimSides(key, 1);
}

export function removeVariableBrackets(key: string) {
  return trimSides(key, 2);
}
