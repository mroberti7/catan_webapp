import Button from '@/app/_components/button/button';
import { render } from '@testing-library/react';

describe('given the Button componet', () => {
  it('when I use it with basic configuration, then I should render the component successfully', () => {
    const { getByTestId } = render(<Button onClick={() => {}} />);
    expect(getByTestId('modal')).toBeDefined();
  });
});
