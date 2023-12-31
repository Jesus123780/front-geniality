import { ReactNode, useRef } from 'react';
import styles from './DraggableContainer.module.css';


interface DraggableContainerProps {
    children: ReactNode;
    isOpen: boolean;
    dragRatio?: number;
    halfScreen?: boolean;
    minFullscreenTranslation?: number;
    modalRef?: React.MutableRefObject<HTMLDivElement | null>;
    onClose: () => void;
    padding?: string;
}

interface DragProps {
    dragStartLeft: number;
    dragStartTop: number;
    dragStartX: number;
    dragStartY: number;
    transalteY: number;
}

export const DraggableContainer: React.FC<DraggableContainerProps> = ({
    children,
    isOpen,
    dragRatio = 0.5,
    halfScreen = false,
    minFullscreenTranslation = 0,
    modalRef = null,
    onClose,
    padding,
}) => {
    const dragProps = useRef<DragProps | null>(null);

    const handleDragStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
        document.body.style.overflowY = 'hidden'
        const { clientX, clientY } = e.touches[0]
        if (!modalRef || !modalRef.current) return
        const { offsetTop, offsetLeft } = modalRef.current
        const { left, top } = modalRef.current.getBoundingClientRect()

        dragProps.current = {
            dragStartLeft: left - offsetLeft,
            dragStartTop: top - offsetTop,
            dragStartX: clientX,
            dragStartY: clientY,
            transalteY: 0
        }

        window.addEventListener('touchmove', handleDrag, false)
        window.addEventListener('touchend', handleDragEnd, false)
    }

    const handleDragEnd = () => {
        document.body.style.overflowY = 'scroll'
        if (!dragProps.current) return
        const translateAmount = dragProps.current.transalteY
        const bodyHeight = halfScreen ? document.body.clientHeight / 4 : document.body.clientHeight
        const maxTranslation = dragRatio * bodyHeight

        if (minFullscreenTranslation && translateAmount > maxTranslation) {
            const originTranslateAmount = minFullscreenTranslation !== 0 ? translateAmount : minFullscreenTranslation
            if (!modalRef || !modalRef.current) return
            const animation = modalRef.current.animate(
                [
                    { transform: `translateY(${originTranslateAmount}px)` },
                    { transform: `translateY(${minFullscreenTranslation}px)` }
                ],
                {
                    duration: 200
                }
            )

            animation.addEventListener('finish', () => {
                if (!modalRef || !modalRef.current || !dragProps.current) return
                dragProps.current.transalteY = minFullscreenTranslation
                modalRef.current.style.transform = `translateY(${minFullscreenTranslation}px)`
            })

            animation.addEventListener('finish', () => {
                onClose()
            })
        }

        if (translateAmount < maxTranslation && translateAmount > 0) {
            if (!modalRef || !modalRef.current) return
            const animation = modalRef.current.animate(
                [
                    { transform: `translateY(${translateAmount}px)` },
                    { transform: `translateY(0px)` }
                ],
                {
                    duration: 200
                }
            )
            animation.addEventListener('finish', () => {
                if (!modalRef || !modalRef.current || !dragProps.current) return
                dragProps.current.transalteY = 0
                modalRef.current.style.transform = 'translateY(0px)'
            })
        }
        const minBottomDrag = window.screen.height - (window.screen.height * 0.3)
        if (translateAmount > minBottomDrag)
            onClose()
        window.removeEventListener('touchmove', handleDrag, false)
        window.removeEventListener('touchend', handleDragEnd, false)
    }

    const handleDrag = (e: TouchEvent) => {
        e.preventDefault();
        if (!e.touches?.length) return;
    
        const { clientY } = e.touches[0];
        if (dragProps.current) {
            dragProps.current.transalteY =
                dragProps.current.dragStartTop + clientY - dragProps.current.dragStartY;
    
            if (dragProps.current.transalteY < 0) dragProps.current.transalteY = 0;
    
            if (modalRef && modalRef.current) {
                modalRef.current.style.transform = `translateY(${dragProps.current.transalteY}px)`;
            }
        }
    };
    

    return (
        isOpen ? (
            <>
                <div className={styles.draggable__fullScreen} onClick={() => onClose()} />
                <div
                    className={styles.draggable__container}
                    ref={modalRef}
                    onTouchStart={handleDragStart}
                    style={{ padding: padding }}
                >
                    <div className={styles.drop__container}>
                        <div className={styles.draggable_button}></div>
                    </div>
                    {children}
                </div>
            </>
        ) : (
            <div ref={modalRef} />
        )
    )

};
