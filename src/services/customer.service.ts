import { Customer } from './../entities/customer.entity';
import { getConnection } from 'typeorm';
import { isEmpty } from 'lodash';


const repository = () => getConnection().getRepository(Customer);

export const findOrCreateCustomer = (customer: Customer) => 
  repository()
    .findOne({ where: { email: customer.email } })
    .then((c) => isEmpty(c) ? repository().save(customer) : repository().save({ id: c.id, ...customer}));
