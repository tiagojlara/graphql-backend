import { isEmpty } from 'lodash';
import { getConnection } from 'typeorm';

import { Customer } from './../entities/customer.entity';

const repository = () => getConnection().getRepository(Customer);

export const findOrCreateCustomer = (customer: Customer) =>
  repository()
    .findOne({ where: { email: customer.email } })
    .then((c) =>
      isEmpty(c) ? repository().save(customer) : repository().save({ id: c.id, ...customer }),
    );
