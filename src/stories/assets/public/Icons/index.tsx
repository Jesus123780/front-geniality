import React from 'react'

export interface IconProps {
  style?: React.CSSProperties
  size?: number | string
  color?: string
  width?: number | string
  height?: number | string
}

export const IconMiniCheck = ({
  style = {},
  size,
  color
}: IconProps) => {
    return <svg
      fill={color}
      height={size}
      style={style}
      viewBox='0 0 17 14'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    ><path
        clipRule='evenodd'
        d='M2.59 6.57A1 1 0 0 0 1.19 8l5.16 5.09L16.72 2.36A1 1 0 1 0 15.28.97l-8.96 9.28-3.73-3.68z'
        fillRule='evenodd'
    ></path></svg>
}

export const IconClose = ({
  width = 56.923,
  height = 56.923,
  size,
  color,
  ...props
}: IconProps) => (
  <svg
  viewBox='0 0 56.923 56.923'
    xmlns='http://www.w3.org/2000/svg'
    width={size ?? width}
    height={size ?? height}
    data-name='cancel_black_24dp (1)'
    {...props}
  >
    <path
      fill='none'
      d='M0 0h56.923v56.923H0Z'
      data-name='Trazado 4378'
      opacity={0.87}
    />
    <path
      fill={color ?? '#666b76'}
      d='M28.462 4.744A23.718 23.718 0 1 0 52.18 28.462 23.7 23.7 0 0 0 28.462 4.744Zm10.2 33.917a2.362 2.362 0 0 1-3.344 0l-6.854-6.854-6.854 6.854a2.365 2.365 0 0 1-3.344-3.344l6.854-6.854-6.854-6.854a2.365 2.365 0 0 1 3.344-3.344l6.854 6.854 6.854-6.854a2.365 2.365 0 1 1 3.344 3.344l-6.854 6.854 6.854 6.854a2.406 2.406 0 0 1 0 3.344Z'
      data-name='Trazado 4379'
    />
  </svg>
)


export const IconChecked = ({
  width = 40.819,
  height = 40.819,
  color,
  ...props
}: IconProps) => (
  <svg
    viewBox='0 0 40.819 40.819'
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    {...props}
  >
    <path fill='none' d='M0 0h40.819v40.819H0Z' data-name='Trazado 4381' />
    <path
      fill={color || '#011e41'}
      d='M20.41 3.402A17.008 17.008 0 1 0 37.418 20.41 17.014 17.014 0 0 0 20.41 3.402Zm-4.608 24.3-6.107-6.1a1.7 1.7 0 1 1 2.4-2.4l4.915 4.9 11.7-11.7a1.7 1.7 0 1 1 2.4 2.4l-12.908 12.9a1.694 1.694 0 0 1-2.4 0Z'
      data-name='Trazado 4382'
    />
  </svg>
)


