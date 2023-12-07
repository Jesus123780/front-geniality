import { InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'


type InputVProps = {
  border?: string;
  margin?: string;
  size?: number;
  width?: string;
  radius?: string;
  paddingInput?: string;
  value: string | number | readonly string[];
  error?: boolean | string;
  minWidth?: string;
  numeric?: 'true' | 'false';
  height?: string | number | boolean
}

type LabelInputProps = InputHTMLAttributes<HTMLInputElement> & {
    value?: string | number | readonly string[];
    labelTop?: string;
    labelColor?: string;
    error?: string;
    type?: string;
}


export const Tooltip = styled.div`
  display: block;
  background-color: transparent;
  border-radius: 2px;
  z-index: 10;
  font-size: 10px;
  color: blue;
`

export const LabelInput = styled.span<LabelInputProps>`
  position: absolute;
  transition: 0.2s ease;
  text-align: left;
  font-size: ${({ value }) => {
    return value ? '1rem' : '16px'
  }};
  top: ${({ value, labelTop }) => {
    return value ? '7px' : labelTop ?? '35px'
  }};
  left: ${({ value }) => {
    return value ? '10px' : '25px'
  }};
  color: ${({ value, error }) => {
    const errorColor = error ? 'red' : '#ccc'
    return value ? '#ccc' : errorColor
  }};
  pointer-events: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: PFont-Light;
  background-color: var(--color-base-white);
  ${({ type }) => {
    return (
      type === 'date' &&
      css`
        top: -8px;
        left: 5px;
      `
    )
  }}
`
type ContainerInputProps = {
  width?: string;
}

export const ContainInput  = styled.div<ContainerInputProps>`
  width: ${({ width }) => { return width }};
  display: flex;
  flex-direction: column;
  position: relative;
`

export const InputV  = styled.input<InputVProps>`
  outline: none;
  font-family: PFont-Light;
  font-weight: 500;
  border: 1px solid #D0D5DD;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 0px 1px inset;
    ${({ border = '#524e4e' }) => {
    return border
  }};
  font-size: ${({ size = '18px' }) => {
    return `${size}px` ?? '18px'
  }};
  width: ${({ width = '-webkit-fill-available' }) => {
    return width
  }};
  border-radius: ${({ radius = '15px 5px 5px 15px' }) => {
    return radius || '15px 5px 5px 15px'
  }};

  color: ${({ type, value }) => {
    return type === 'date' && !value ? '#0f0e0e' : '#707070'
  }};
  padding: ${({ type, paddingInput }) => {
    return type === 'date' ? '15px' : paddingInput ?? '20px 55px 20px 10px'
  }};

  &:focus {
    ~ ${LabelInput} {
      top: -6px;
      left: 0px;
      font-size: 18px;
      color: #ccc;
      background-color: red;
      padding: 0px 5px;
    }
  }

  &:disabled {
    cursor: no-drop;
  }

  // Hover Styles
  &:hover ~ ${Tooltip} {
    display: block;
  }

  // Error Styles
  ${({ error }) => {
    return (
      error &&
      css`
        border: 0.5px solid red;
      `
    )
  }}

  ${({ margin }) => {
    return (
      margin &&
      css`
        margin: ${margin};
      `
    )
  }}

  // Minimum Width
  ${({ minWidth }) => {
    return (
      minWidth &&
      css`
        min-width: ${minWidth};
      `
    )
  }}
`

export const ContentIcon  = styled.div`
  background: transparent;
  display: flex;
  height: 40.82px;
  margin: auto;
  place-content: center;
  place-items: center;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 40.82px;

`

export const MessageInput  = styled.span`
  background-color: var(--color-secondary-blue);
  border-radius: 5px;
  color: var(--color-text-white);
  font-family: PFont-Light;
  font-size: 16px;
  margin-top: 31px;
  overflow: hidden;
  padding: 15px;
  pointer-events: none;
  text-align: center;
  text-overflow: ellipsis;
  top: 90px;
  transition: 0.2s ease;
  white-space: nowrap;
  width: -webkit-fill-available;
`