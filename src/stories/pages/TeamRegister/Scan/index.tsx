import {
    Button,
    Column,
    Row,
    Text
} from '../../../atoms'
import styles from './Scan.module.css'

type ScanProps = {
  handleClick: () => void
}

export const Scan = ({
  handleClick
}: ScanProps) => {
  return (
    <Column className={styles['container_scan']}>
      <Row>
        <Text weight='extrabold' customSize='1.5625rem'>
          Escanea el código IMEI
        </Text>
        <Button
            width='260px'
            padding='20px 35px'
            fontSize='1.375rem'
            primary
            onClick={handleClick}
        >
          Escanear aquí
        </Button>
      </Row>
    </Column>
  )
}
