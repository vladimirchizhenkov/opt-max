import { MockObject } from '@Mocks/mockObject';

export class GetCartItemsMock extends MockObject {
    public constructor() {
        super();
        this.path = {
            url: 'https://mocki.io/v1/a92eda42-69d0-43c5-bc66-cd56e4b8c906',
            method: 'get',
        };
    }

    public getFixture(): Record<string, unknown>[] {
        return [
            {
                id: 1,
                name: 'Some weird name',
                price: 1000,
                quantity: 1,
            },
            {
                id: 2,
                name: 'This should`n be in snapshot!!',
                price: 42,
                quantity: 1,
            },
            {
                id: 3,
                name: 'Wrong Name',
                price: 100,
                quantity: 2,
            },
        ];
    }
}
