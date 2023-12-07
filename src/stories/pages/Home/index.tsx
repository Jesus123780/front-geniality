import {
  Button,
  Column,
  Text
} from '../../atoms'
import quizMan from '../../assets/public/Images/QuizMan.png'
import styles from './Home.module.css'

export const Home = ({
  redirect = () => {}
 }) => {
  return (
    <div className={styles['container']}>
      <Column className={styles['col-1']}>
        <Text className={styles['start-title']}>Welcome to the</Text>
        <Text className={styles['start-title']}><span>T</span>rivia <span>C</span>hallenge!</Text>
        <div className={styles['container_icon']}>
          <img src={quizMan} alt='quizman' className={styles['quizMan']} />
        </div>
        <div className={styles['text-container']}>
        <Text className={styles['start-title']}>
          You Will be presented
          with 10 True or False
          questions.
        </Text>

        <Button width='400px' primary onClick={redirect}>
          <Text className={styles['start-button']}>BEGIN</Text>
        </Button>
      </div>
      </Column>
    </div>
  )
}
