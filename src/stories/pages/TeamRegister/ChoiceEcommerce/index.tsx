import { Text } from '../../../atoms/Text'
import { InputSelect } from '../../../molecules/Inputs/InputSelect'
import styles from './ChoiceCommerce.module.css'

export const ChoiceCommerce = ({
    options = ['novey', 'cochez'],
    onChange = () => { }
}) => {
  return (
    <div className={styles['container-choose-business']} >
       <Text weight='extrabold' customSize='1.5625rem' styles={{ marginBottom: '20px' }}>
          Escoge el comercio
        </Text>
      <InputSelect options={options} value={options[0]} onChange={onChange} />
    </div>
  )
}
