import {
  ContainInput,
  ContentIcon,
  InputV,
  LabelInput,
  MessageInput
} from './styled'
import {
  isEmail,
  isPassword,
  onlyLetters,
  rangeLength,
} from '../../../../helpers'
import React, {
    useEffect,
    useState,
    ChangeEvent,
    FC,
    Dispatch,
    SetStateAction
} from 'react'
import { Icon } from '../../../atoms/Icon';

interface InputProps {
  autoComplete?: string;
  autoFocus?: boolean;
  border?: string;
  checked?: boolean;
  dataForm?: object | null;
  disabled?: boolean;
  email?: boolean;
  error?: string;
  fontSize?: number;
  height?: boolean | string;
  labelColor?: string;
  labelTop?: string;
  letters?: string;
  margin?: string;
  maxWidth?: string;
  minWidth?: string;
  name?: string;
  nit?: boolean;
  numeric?: boolean;
  padding?: string;
  paddingInput?: string;
  pass?: boolean;
  success?: boolean;
  passConfirm?: boolean;
  placeholder?: string;
  radius?: string;
  range?: ValidationRange;
  reference?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  title?: string;
  message?: string;
  type?: string;
  typeTextarea?: boolean;
  value?: string | number | readonly string[];
  width?: string;
  onBlur?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onInvalid?: () => void;
  setDataValue?: () => void;
  setSubmitState: Dispatch<SetStateAction<{ loading: boolean; success: boolean; message: string; }>>;

}

interface ValidationRange {
  min: number;
  max: number;
}

export const Input: FC<InputProps> = ({
  autoComplete = 'off',
  border = '',
  checked = false,
  autoFocus = false,
  disabled = false,
  email = false,
  success = false,
  error = '',
  labelTop,
  fontSize = 18,
  labelColor,
  letters,
  margin = '0',
  name = '',
  numeric = false,
  onChange = (e) => {
    return e;
  },
  setSubmitState = () => {
    return
  },
  paddingInput,
  pass,
  placeholder = '',
  radius = '',
  range,
  reference,
  required = false,
  title = '',
  type = 'text',
  value = '',
  width = '100%',
  message: customMessage,
  onFocus = (): void => {
    return;
  },
  onBlur = () => {
    return;
  },
  ...rest
}) => {
  const isAutoComplete = !autoComplete ? 'off' : autoComplete;
  const isEmailValue = email ? 'off' : isAutoComplete;
  const [errors, setErrors] = useState<string  | boolean>(error);
  const [message, setMessage] = useState('');

  const errorFunc = (
    e: ChangeEvent<HTMLInputElement>,
    v: boolean,
    m: string
  ) => {
    setErrors(v);
    v && setMessage(m);
    onChange(e);
  };
  useEffect(() => {
    setErrors(error)
  }, [error])

  const validations = (e: ChangeEvent<HTMLInputElement>) => {
    // Valida que el campo no sea nulo
    if (required) {
      if (e.target.value.length == 0)
        return errorFunc(e, true, 'El campo no debe estar vacío');
      errorFunc(e, false, '');
    }
    // Valida que el campo sea tipo numérico
    if (numeric) {
      if (isNaN(parseFloat(e.target.value)))
        return errorFunc(e, true, 'El campo debe ser numérico');
      errorFunc(e, false, '');
    }
    // Valida que el campo sea solo letras
    if (letters) {
      if (onlyLetters(e.target.value))
        return errorFunc(e, true, 'El campo debe contener solo letras');
      errorFunc(e, false, '');
    }
    // Valida que el campo esté en el rango correcto
    if (range) {
      if (rangeLength(e.target.value, range.min, range.max))
        return errorFunc(
          e,
          true,
          `El rango de caracteres es de ${range.min} a ${range.max}`
        );
      errorFunc(e, false, '');
    }
    // Valida si el campo tiene un formato de email correcto
    if (email) {
      if (isEmail(e.target.value))
        return errorFunc(e, true, 'El formato de email no es válido');
      errorFunc(e, false, '');
    }
    if (pass) {
      if (isPassword(e.target.value)) {
        return errorFunc(
          e,
          true,
          'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.'
        );
      }
      errorFunc(e, false, '');
    }
    if (e) {
      if (e.target.value.length > 0)  {
        setMessage('');
        setSubmitState({
          loading: false,
          success: false,
          message: '',
        })
      }
      return errorFunc(e, false, '');
    }
  }
  const successAll = customMessage && success && !errors
  return (
    <ContainInput width={width}>
      <InputV
        {...rest}
        autoComplete={type === 'password' ? 'current-password' : isEmailValue}
        autoFocus={autoFocus}
        border={border}
        checked={checked}
        data-required={required}
        disabled={disabled}
        error={errors}
        onFocus={onFocus}
        margin={margin}
        name={name}
        numeric={numeric ? 'true' : 'false'}
        onBlur={onBlur}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          return validations(e);
        }}
        paddingInput={paddingInput}
        placeholder={placeholder}
        radius={radius}
        ref={reference}
        size={fontSize}
        value={value}
      />
      {successAll &&
      <ContentIcon>
        <Icon icon='IconChecked' />
      </ContentIcon>
      }
      <LabelInput
        error={error}
        labelColor={labelColor}
        labelTop={labelTop}
        type={type}
        value={value}
      >
        {title}
      </LabelInput>
      {message &&
      <MessageInput>
        {message}
      </MessageInput>
      }
      {successAll &&
      <MessageInput>
        {customMessage}
      </MessageInput>
      }
    </ContainInput>
  );
};
