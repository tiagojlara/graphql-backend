import { gql } from 'apollo-server';

import { server } from '../server';

describe('Apollo Server', () => {
  it('apollo server should be running', async () => {
    const GET_VERSION = gql`
      query {
        version
      }
    `;

    const result = await server.executeOperation({
      query: GET_VERSION,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.version).toBe('0.0.1');
  });
});
