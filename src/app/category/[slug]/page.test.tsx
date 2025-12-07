import { render, screen } from '@testing-library/react';
import Page from './page';
import http from '@/service/http';

jest.mock('@/service/http');
const MockBreadCrumb = () => <div data-testid="breadcrumb" />;
MockBreadCrumb.displayName = 'MockBreadCrumb';
jest.mock('@/component/AppBreadCrumb', () => MockBreadCrumb);

const MockErrorFallback = ({ message }: any) => <div data-testid="error-fallback">{message}</div>;
MockErrorFallback.displayName = 'MockErrorFallback';
jest.mock('@/component/ErrorFallback', () => MockErrorFallback);

const MockCategoryTitle = () => <div data-testid="category-title" />;
MockCategoryTitle.displayName = 'MockCategoryTitle';
jest.mock('./CategoryTitle', () => MockCategoryTitle);

const MockProductList = () => <div data-testid="product-list" />;
MockProductList.displayName = 'MockProductList';
jest.mock('./ProductList', () => MockProductList);

const MockSwiperSection = () => <div data-testid="swiper-section" />;
MockSwiperSection.displayName = 'MockSwiperSection';
jest.mock('./SwiperSection', () => MockSwiperSection);

const MockNoProductsToShow = () => <div data-testid="no-products" />;
MockNoProductsToShow.displayName = 'MockNoProductsToShow';
jest.mock('./NoProductsToShow', () => MockNoProductsToShow);

const mockHttp = http as jest.Mocked<typeof http>;

describe('Category Page', () => {
  const mockCategory = { _id: '1', slug: 'test-category', title: 'Test Category' };
  const mockSubCategories = [{ _id: '1', category: '1', title: 'Sub Category' }];
  const mockProducts = { products: { docs: [{ _id: '1', title: 'Product 1' }] } };

  beforeEach(() => {
    mockHttp.get.mockImplementation((url) => {
      if (url === '/category/list') {
        return Promise.resolve({ data: { data: { categories: [mockCategory] } } });
      }
      if (url === '/subcategory/list') {
        return Promise.resolve({ data: { data: { subCategories: mockSubCategories } } });
      }
      if (url === '/product/test-category') {
        return Promise.resolve({ data: mockProducts });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  it('renders category page with products', async () => {
    const component = await Page({ params: { slug: 'test-category' } });
    render(component);

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    expect(screen.getByTestId('category-title')).toBeInTheDocument();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
    expect(screen.getByTestId('swiper-section')).toBeInTheDocument();
  });

  it('renders no products message when no products found', async () => {
    mockHttp.get.mockImplementation((url) => {
      if (url === '/category/list') {
        return Promise.resolve({ data: { data: { categories: [mockCategory] } } });
      }
      if (url === '/subcategory/list') {
        return Promise.resolve({ data: { data: { subCategories: [] } } });
      }
      if (url === '/product/test-category') {
        return Promise.resolve({ data: { products: { docs: [] } } });
      }
      return Promise.reject(new Error('Not found'));
    });

    const component = await Page({ params: { slug: 'test-category' } });
    render(component);

    expect(screen.getByTestId('no-products')).toBeInTheDocument();
  });

  it('renders error fallback when category not found', async () => {
    mockHttp.get.mockImplementation((url) => {
      if (url === '/category/list') {
        return Promise.resolve({ data: { data: { categories: [] } } });
      }
      return Promise.reject(new Error('Not found'));
    });

    const component = await Page({ params: { slug: 'nonexistent' } });
    render(component);

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
    expect(screen.getByText('دستهبندی پیدا نشد')).toBeInTheDocument();
  });

  it('renders error fallback on service error', async () => {
    mockHttp.get.mockRejectedValue(new Error('Service error'));

    const component = await Page({ params: { slug: 'test-category' } });
    render(component);

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
    expect(screen.getByText('خطا در بارگذاری دادهها')).toBeInTheDocument();
  });
});