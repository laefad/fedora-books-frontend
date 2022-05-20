
// TODO remove?? 
export const twoSideFilter = <T>(
  array: Readonly<Array<T>>,
  condition: (el: Readonly<T>) => boolean
) => array.reduce((acc, el) => {
        if (condition(el))
            acc.satisfied.push(el);
        else
            acc.rest.push(el);
        return acc;
  }, {
    satisfied: [] as Array<T>,
    rest: [] as Array<T>,
  })
;
