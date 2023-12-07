import React from 'react'
import { Text } from '../../atoms'
import styles from './Banner.module.css'

/**
 * Props for the Banner component.
 */
interface BannerProps {
  bannerText: string
}

/**
 * A banner component with text and background image.
 * @param {BannerProps} props - Props for the Banner component.
 * @returns {JSX.Element} - A React JSX Element.
 */
export const Banner: React.FC<BannerProps> = ({ bannerText }: BannerProps) => {
  /**
   * Inline style for the banner container.
   * @type {React.CSSProperties}
   */

  return (
    <div className={styles['container-banner']}>
      <Text color='white' size='lg'>
        {bannerText}
      </Text>
    </div>
  )
}

