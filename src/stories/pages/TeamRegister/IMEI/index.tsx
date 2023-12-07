import React, { Dispatch, SetStateAction } from 'react'
import {
  Button,
  Column,
  Row,
  Text
} from '../../../atoms'
import { Input } from '../../../molecules/Inputs/Input'
import styles from './Imei.module.css'

interface ImeiProps {
  message?: string
  name?: string
  success?: boolean
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setSubmitState: Dispatch<SetStateAction<{ loading: boolean; success: boolean; message: string; }>>;
}

export const Imei = ({
  message,
  name,
  success,
  value,
  onChange,
  setSubmitState,
  onSubmit
}: ImeiProps) => {
  return (
    <Column className={styles['container_imei']}>
      <Row as='form' onSubmit={onSubmit} className={styles['container_imei--form']}>
        <Column>
        <Text weight='extrabold' customSize='1.5625rem' styles={{ marginBottom: '20px' }}>
        Digita el código IMEI
        </Text>
        <Row>
            <Input
              onChange={onChange}
              placeholder='Ingresa aquí'
              name={name}
              setSubmitState={setSubmitState}
              required
              success={success}
              message={message}
              value={value}
            />
            <Button
              padding='20px'
              styles={{ margin: '0px 0px 0px 5px' }}
              primary
              disabled={success}
              width='207px'
              borderRadius='5px 50px 50px 5px'
              fontSize='22px'
            >
              Registrar
            </Button>

        </Row>
        </Column>
      </Row>
    </Column>
  )
}
