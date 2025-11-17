import { metadata } from '../metadata';
import ProductPage from './page.client';

export { metadata };

export default function Product({ params }) {
  return <ProductPage params={params} />;
}
