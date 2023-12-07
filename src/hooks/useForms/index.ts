import { useCallback, useEffect, useState } from 'react';
import { validationSubmitHooks } from '../../utils'

interface ChangeEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

type FormData = {
  [key: string]: string;
}

type FormErrors = {
  [key: string]: boolean;
}

type Notification = {
  message: string;
  description?: string;
  backgroundColor?: string;
}

type IHandleSubmit = {
  event: Event;
  msgError?: string;
  msgSuccess?: string;
  action?: () => Promise<unknown>;
  actionAfterSuccess?: () => void;
}

/**
 * @version 0.0.1
 * @description Hook con herramientas de validación y eventos de cambio
 * @return {Array} devuelve la función onChange a ejecutar y el estado de error de cada input
 */
export const useForms = ({
  sendNotification = ({
    message,
    description,
    backgroundColor,
  }: Notification) => {
    console.log(message, description, backgroundColor);
  },
} = {}) => {
  const [dataForm, setDataForm] = useState({});
  const [errorForm, setErrorForm] = useState({});
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [calledSubmit, setCalledSubmit] = useState(false);
  // Handle Change
  const handleChange = useCallback(
    (e: ChangeEvent, error: boolean) => {
      setDataForm({ ...dataForm, [e.target.name]: e.target.value });
      setErrorForm({ ...errorForm, [e.target.name]: error });
    },
    [setDataForm, dataForm, errorForm, setErrorForm]
  );

  const handleForcedData = useCallback(
    (data: FormData) => {
      setDataForm(data);
    },
    [setDataForm]
  );

  const setForcedError = useCallback(
    (errors: FormErrors) => {
      setErrorForm(errors);
    },
    [setErrorForm]
  );

  // Handle submit, al enviar formulario
  const listErrors = Object.values(errorForm);
  const errors = listErrors.find((error) => {
    return error === true;
  });

  const handleSubmit = ({
    event,
    msgError = '',
    msgSuccess,
    action = async () => {},
    actionAfterSuccess = () => {},
  }: IHandleSubmit) => {
    event.preventDefault();
    setCalledSubmit(true);
    let errSub = false;

    // Valida los errores locales
    for (const x in errorForm) {
      if (errorForm[x as keyof typeof errorForm]) {
        errSub = true;
      }
    }
    if (errSub) {
      sendNotification({
        message: 'Completa los campos requeridos',
        description: 'Error',
        backgroundColor: 'error',
      });
    }
    if (errors) {
      setErrorSubmit(true);
      return setForcedError({ ...errorForm });
    }

    if (errSub) return setErrorSubmit(errSub);

    // Valida los errores desde el evento
    const target = event.target as HTMLElement | HTMLFormElement;
    const elements = target instanceof HTMLFormElement ? Array.from(target.elements) : [];

    const errores = validationSubmitHooks(elements as HTMLInputElement[]);
    setErrorForm(errores);
    for (const x in errores) {
      if (errores[x]) errSub = true;
    }
    if (errSub) return setErrorSubmit(errSub);

    // Ejecuta la accion si es válido
    if (!errSub && action) {
      action()
        .then((res) => {
          if (res) {
            sendNotification({
              message: msgSuccess ?? 'Operación exitosa',
              description: 'Operación exitosa',
              backgroundColor: 'success',
            });
            !!actionAfterSuccess && actionAfterSuccess();
          }
        })
        .catch(() => {
          return sendNotification({
            message: msgError ?? 'Ha ocurrido un error',
            backgroundColor: 'error',
          });
        });
    }

    setErrorSubmit(errSub);
  };

  useEffect(() => {
    return setCalledSubmit(false);
  }, [calledSubmit]);
  useEffect(() => {
    return setCalledSubmit(false);
  }, []);

  return [
    handleChange,
    handleSubmit,
    handleForcedData,
    { dataForm, errorForm, errorSubmit, calledSubmit, setForcedError },
  ];
};
