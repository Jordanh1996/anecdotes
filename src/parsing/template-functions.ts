export const templateFunctions: Record<string, (...args: unknown[]) => unknown> = {
  capitalize: (value: unknown) => {
    if (typeof value !== 'string') {
      throw new Error('capitalize expected a string');
    }

    return value[0].toUpperCase() + value.substring(1);
  },
  toString: (value: any) => {
    if (value?.toString && typeof value?.toString === 'function') {
      return value.toString();
    } else {
      throw new Error('cannot perform toString');
    }
  },
};
