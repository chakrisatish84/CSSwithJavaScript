// Array

export const last = <T>(arr: T[]): T => {
    return arr[arr.length - 1]
}

const l = last([1, 2, '3'])

const l1 = last<string>(["a", "b"])

const l2 = last(["a", 6])

const makeArray = <T, Y = number>(x: T, y: Y): [T, Y] => {
    return [x, y]
}

const v = makeArray(5, 6);

const v1 = makeArray('a', 'b');

const v2 = makeArray<string | null>('a', 6);

const makeFullName = <T extends { firstName: string, lastName: string }>(obj: T) => {
    return {
        ...obj,
        fullName: obj.firstName + ' ' + obj.lastName
    }
}

const v3 = makeFullName({ firstName: 'satish', lastName: 'chava', age: 36 })


const a1 = <T>(arr: T[]): T => {
    return arr[arr.length - 1]
}

const a1Res = a1([1, 2, 3])

const a2Res = a1(['1', '2', '3'])


const makeArray1 = <T, Y = string>(a: T, b: Y): [T, Y] => {
    return [a, b]
}

const a1r = makeArray1(1, 2);

const a2r = makeArray1("a", "b");

const a3r = makeArray1<string | null>("a", '1');

const makeFullName1 = <T extends { firstName: string, lastName: string }>(obj: T) => {
    return { ...obj, fullName: obj.firstName + ' ' + obj.lastName }
}

const fullNam31 = makeFullName({ firstName: 'satish', lastName: 'chakri' })

interface tab<T>{
    id:string,
    data: T
}

type NumberTab = tab<number>;
type Number2Tab = tab<string>;