import React, { CSSProperties } from "react"
import { Button } from "../../atoms"
import styles from "./styles.module.css"

interface CarouselProps {
  children: React.ReactNode
  active: number
  showNext?: boolean
  showPrev?: boolean
  moveRight?: () => void
  moveLeft?: () => void
  maxView?: number
}

type CustomCSSProperties = {
  "--active"?: number
  "--offset"?: number
  "--direction"?: number
  "--abs-offset"?: number
}

export const Carousel: React.FC<CarouselProps> = ({
  active,
  children,
  maxView,
  showNext = false,
  showPrev = false,
  moveRight = () => {
    return
  },
  moveLeft = () => {
    return
  },
}) => {
  const MAX_VISIBILITY = maxView ?? 3
  const count = React.Children.count(children)

  return (
    <div>
      <div className={styles["carousel"]}>
        {React.Children.map(children, (child, i) => {
          const customStyles: CSSProperties & CustomCSSProperties = {
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            pointerEvents: active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }

          return (
            <div className={styles["card-container"]} style={customStyles}>
              {child}
            </div>
          )
        })}
      </div>
      <div className={styles['counter']}>
          <span>{active + 1}/{count}</span>
        </div>
      <div className={styles['container-buttons-steps']}>
        {showPrev && <div>
          <Button
            padding="20px"
            borderRadius="5px"
            width="300px"
            primary
            disabled={active === 0}
            onClick={moveLeft}
          >
            false
          </Button>
        </div>}

        {showNext && <div>
          <Button
            padding="20px"
            borderRadius="5px"
            width="300px"
            primary
            disabled={active === count - 1}
            onClick={moveRight}
          >
            True
          </Button>
        </div>}
      </div>
    </div>
  )
}
