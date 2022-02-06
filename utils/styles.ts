// Object where key is the classname and value is a boolean of whether to apply or not
type CXMap = Record<string, boolean>

/**
 * Classnames utility, formats arguments into CSS classname string
 */
export const cx = (...args: Array<CXMap | string>) => {
  return args.map(arg => {
    if (typeof arg === 'string') {
      return arg;
    }
    return Object.keys(arg).map(k => arg[k] ? k : '').filter(v => !!v).join(' ');
  }).filter(v => !!v).join(' ');
}