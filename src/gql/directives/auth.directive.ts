import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

import { validateToken } from './../../services/auth.service';

export const authDirective = (directiveName: string) => {
  const typeDirectiveArgumentMaps: Record<string, any> = {};
  return {
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { requires } = authDirective;
            if (requires) {
              const { resolve = defaultFieldResolver } = fieldConfig;
              fieldConfig.resolve = (source, args, context, info) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const user = validateToken(context?.authToken);
                if (user.rule !== requires) {
                  throw new Error('not authorized');
                }
                return resolve(source, args, context, info);
              };
              return fieldConfig;
            }
          }
        },
      }),
  };
};
