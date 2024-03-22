import { render, screen } from '@testing-library/react'

import Avatar from '.'

describe('<Avatar />', () => {
  const props = {
    src: 'https://gravatar.com/4405735f6f3129e0286d9d43e7b460d0',
    alt: 'Avatar'
  }

  it('should render the medium Avatar as default', () => {
    const { container } = render(<Avatar {...props} />)

    expect(screen.getByRole('img', { name: /Avatar/i })).toBeInTheDocument()

    expect(container.firstChild).toHaveClass(
      'inline-block w-12 h-12 rounded-full'
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the upload file invitation', () => {
    const { container } = render(<Avatar />)

    expect(screen.getByTestId('upload-file')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
