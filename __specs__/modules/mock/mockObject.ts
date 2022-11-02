import type { MockedRequest } from 'msw/lib/types/handlers/requestHandler';

type Method = 'get' | 'post' | 'put' | 'delete';

export abstract class MockObject {
    protected path: { method: Method; url: string };

    public getPath(): { method: Method; url: string } {
        return this.path;
    }

    public abstract getFixture(
        req: MockedRequest
    ):
        | Promise<Record<string, unknown> | Record<string, unknown>[]>
        | Record<string, unknown>
        | Record<string, unknown>[];
}
