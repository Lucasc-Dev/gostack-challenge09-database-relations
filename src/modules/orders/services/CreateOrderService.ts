import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IOrdersRepository from '../repositories/IOrdersRepository';

import Order from '../infra/typeorm/entities/Order';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('You cannot create an order with a customer that does not exists.');
    }

    const productsObject = await this.productsRepository.findAllById(
      products.map(product => ({ id: product.id })),
    );

    if (productsObject.length !== products.length) {
      throw new AppError('One or more products does not exists.');
    }
    
    const productQuantity = productsObject.find((product, index) => (
      product.quantity < products[index].quantity
    ))

    if (productQuantity) {
      throw new AppError('One or more products are out of stock.');
    }

    await this.productsRepository.updateQuantity(
      products.map(product => ({ 
        id: product.id, quantity: product.quantity 
      }))
    );

    const newProducts = products.map((product, index) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsObject[index].price,
    }))
    
    const order = await this.ordersRepository.create({ customer, products: newProducts });

    return order;
  }
}

export default CreateOrderService;
