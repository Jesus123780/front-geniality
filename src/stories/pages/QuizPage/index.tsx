import { Carousel } from "../../molecules/Slider";
import { Banner } from "../../molecules";
import { QuizQuestion } from "src/Container/Quiz";
import { Button, Icon } from "../../atoms";
import styles from "./QuizPage.module.css";

interface QuizPageProps {
  handleMoveLeft?: () => void;
  handleMoveRight?: () => void;
  data: QuizQuestion[];
  active: number;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  handleMoveLeft = () => {
    return;
  },
  handleMoveRight = () => {
    return;
  },
  data = [],
  active = 0,
}) => {
  return (
    <div className={styles["quiz-container"]}>
      <Carousel
        active={active}
        maxView={3}
      >
        {data.map((question, index) => (
          <div key={index} className={styles["contain_carrusel"]}>
            <div className={styles['contain_carrusel__category-name']}>
            {question?.category} hello
            </div>
            <Banner bannerText={question?.question ?? ""} />
          </div>
        ))}
      </Carousel>
      <div className={styles["container-response-quiz-buttons"]}>
        <div>
          <Button
            padding="20px"
            borderRadius="5px"
            width="300px"
            primary
            styles={{
                marginRight: "10px",
                display: "flex",
                justifyContent: "space-between"
             }}
            onClick={handleMoveLeft}
            fontSize="20px"

          >
            False
            <Icon color="#fff" height={40} width={40} icon="IconClose" />

          </Button>
        </div>

        <div>
          <Button
            padding="20px"
            borderRadius="5px"
            width="300px"
            primary
            fontSize="20px"
            styles={{
                display: "flex",
                justifyContent: "space-between"
            }}
            onClick={handleMoveRight}
          >
            True
            <Icon color="#fff" height={30} width={30} icon="IconChecked" />
          </Button>
        </div>
      </div>
    </div>
  );
};
