import {
  InputType,
  Field,
} from "type-graphql";
import { Product } from "../../entity/Product";
import {createResolver} from '../../utils/createResolver'

@InputType()
class ProductInput {
  @Field()
  name: string;
}

export const CreateProductResolver = createResolver(
  "Product",
  Product,
  ProductInput,
  Product
);
