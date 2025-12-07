import { render, screen } from '@testing-library/react';
import Page from './page';

const MockGreeting = () => <div data-testid="greeting" />;
MockGreeting.displayName = 'MockGreeting';
jest.mock('./Greeting', () => MockGreeting);

const MockScrollStaggeredFade = ({ children, htmlTag: Tag = 'div' }: any) => <Tag>{children}</Tag>;
MockScrollStaggeredFade.displayName = 'MockScrollStaggeredFade';
jest.mock('@/component/animate/ScrollStaggeredFade', () => MockScrollStaggeredFade);
jest.mock('@/constant/profileTests', () => ({
  profileText: {
    contextOne: 'Test context one',
    contextTwo: 'Test context two'
  }
}));
jest.mock('@/constant/routes', () => ({
  appRoutes: {
    profileInfo: { link: '/profile/info' },
    contact: { link: '/contact' }
  }
}));

describe('Profile Page', () => {
  it('renders profile page with greeting and content', () => {
    render(<Page />);
    
    expect(screen.getByTestId('greeting')).toBeInTheDocument();
    expect(screen.getByText('Test context one')).toBeInTheDocument();
    expect(screen.getByText('Test context two')).toBeInTheDocument();
  });

  it('renders edit profile and contact links', () => {
    render(<Page />);
    
    expect(screen.getByText('ویرایش اطلاعات')).toBeInTheDocument();
    expect(screen.getByText('ارتباط با ما')).toBeInTheDocument();
    
    const editLink = screen.getByText('ویرایش اطلاعات').closest('a');
    const contactLink = screen.getByText('ارتباط با ما').closest('a');
    
    expect(editLink).toHaveAttribute('href', '/profile/info');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
});