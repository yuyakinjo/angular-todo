export function Confirm(message: string) {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const agree = confirm(message);
      return agree ? original.apply(this, args) : null;
    };

    return descriptor;
  };
}
