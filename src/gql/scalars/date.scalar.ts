import { GraphQLScalarType, Kind } from 'graphql';

export const DateScalar = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value: string | number) {
      return new Date(value);
    },
    serialize(value: Date) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 0));
      }
      return null;
    },
  }),
};
