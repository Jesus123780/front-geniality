import React, { Dispatch, SetStateAction } from 'react'
import {
  Button,
  Column,
  Text
} from '../../atoms'
import { CreditMobilLayout } from '../../Layout/CreditMobilLayout'
import { Imei } from './IMEI'
import { Scan } from './Scan'
import styles from './TeamRegister.module.css'
import { ChoiceCommerce } from './ChoiceEcommerce'

interface TeamRegisterProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleClick: () => void
  goToTermsAndCondition: () => void
  value: string
  name: string
  success?: boolean
  message?: string
  setSubmitState: Dispatch<SetStateAction<{ loading: boolean; success: boolean; message: string; }>>;
}

export const TeamRegister = ({
  name,
  value,
  success,
  message,
  handleClick,
  onChange = () => {},
  setSubmitState = () => {},
  goToTermsAndCondition = () => {},
  onSubmit = () => {}
 }: TeamRegisterProps) => {
  return (
    <CreditMobilLayout>
      <div className={styles['container']}>
        <div className={styles['col-1']}>
          <Column>
            <Column>
              <Text
                customSize='4.0625rem'
                weight='medium'
                color='blue'
                styles={{ marginBottom: '5.9375rem' }}
              >
                Registrar equipo
              </Text>
              <Text
                className={styles['title']}
                customSize='2.1875rem'
                lineHeight='xl'
                styles={{ margin: '0 0 10px 0' }}
              >
                Puedes utilizar una de estas opciones
              </Text>
            </Column>

            <Scan handleClick={handleClick}  />

            <ChoiceCommerce  />
            <Imei onChange={onChange} setSubmitState={setSubmitState}  success={success} message={message} value={value} name={name} onSubmit={onSubmit} />
          </Column>
        </div>
        <div className={styles['col-2']}>
          {success && <div className={styles['contain-button_next']}>
            <Button fontSize='1.5625rem'  primary padding='20px 30px' width='274px' onClick={goToTermsAndCondition}>
            Continuar
            </Button>
          </div>
          }
        </div>
      </div>
    </CreditMobilLayout>
  )
}
