interface ErrorForm {
  [key: string]: boolean;
}

interface ValidTypes {
  [key: string]: boolean;
}

const validTypes: ValidTypes = {
  text: true,
  password: true,
  email: true,
  number: true,
  hidden: true,
  textarea: true,
};

/**
 * @description It takes an array of elements and returns an object with a submit hook for each element.
 * @version 0.1.1
 * @param {Array<Element>} elements Array of form elements
 * @return {ErrorForm} Returns an object with boolean values for each element's validation state
 */
export const validationSubmitHooks = (
  elements: HTMLInputElement[]
): ErrorForm => {
  let errorForm: ErrorForm = {};

  for (const element of elements) {
    if (element.name) {
      const elementType =
        element.type || (element.tagName && element.tagName.toLowerCase());
      if (validTypes[elementType as string]) {
        if (element.dataset.required === "true") {
          if (!element.value) {
            errorForm = { ...errorForm, [element.name]: true };
          } else {
            errorForm = { ...errorForm, [element.name]: false };
          }
        } else {
          errorForm = { ...errorForm, [element.name]: false };
        }
      }
    }
  }

  return errorForm;
};
