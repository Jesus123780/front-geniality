import React, {
  useState,
  useRef,
  useEffect
} from 'react'
import { TeamRegister as TeamRegisterView } from '../../stories/pages/TeamRegister'
import { AwesomeModal } from '../../../src/stories/molecules/Modal'
import Quagga from 'quagga'
import { debounce, verifyIMEI } from './helpers'
import { ImeiCapture } from './ImeiCapture'
import { cropperOptions } from './ImeiCapture/helpers'
import { Cropper } from 'react-cropper'

import 'cropperjs/dist/cropper.css'
import styles from './RegisterImei.module.css'

export type IImei = {
  code: string
  preview: string
}

type IImeiDetected = {
  codeResult: {
    code: string
  }
}

export const TeamRegister = () => {
  // STATES

  const scannerRef = useRef<HTMLDivElement>(null)
  const [imeiScanned, setImeiScanned] = useState<IImei[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [cropOpen, setCropOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedImei, setSelectedImei] = useState<IImei>({
    code: '',
    preview: '',
  })
  const [value, setValue] = useState<string>('')

  // HANDLESS
  const handleAddImei = (imei: IImei) => {
    const { code, preview } = imei
    setImeiScanned((prevImeiCodes) => {
      const codeSet = new Set(prevImeiCodes.map((item) => item.code))
      if (!codeSet.has(code)) {
        codeSet.add(code)
        const uniqueImeiCodes = Array.from(codeSet).map((uniqueCode) => {
          const foundImei = prevImeiCodes.find(
            (item) => item.code === uniqueCode
          )
          return foundImei ?? { code: uniqueCode, preview: '' }
        })
        const updatedUniqueImeiCodes = uniqueImeiCodes.map((uniqCode) => {
          if (uniqCode.code === code) {
            uniqCode.preview = preview
          }
          return uniqCode
        })
        if (
          Array.isArray(updatedUniqueImeiCodes) &&
          updatedUniqueImeiCodes.length > 0
        ) {
          setSelectedImei(updatedUniqueImeiCodes[0])
        }
        return updatedUniqueImeiCodes
      }
      return prevImeiCodes
    })
  }
  const onDetectedImei = (result: IImeiDetected): void => {
    if (!result?.codeResult) return
    const code: string = result.codeResult.code || ''
    if (verifyIMEI(code)) {
      const canvasPreview: HTMLCanvasElement = document.createElement('canvas')
      const ctx: CanvasRenderingContext2D | null =
        canvasPreview.getContext('2d')
      const image: HTMLImageElement = new Image()

      // When the image has loaded, draw it to the canvas
      image.onload = function () {
        if (ctx) {
          canvasPreview.width = image.width
          canvasPreview.height = image.height
          // draw image as background
          ctx.drawImage(image, 0, 0)

          handleAddImei({
            code: code,
            preview: canvasPreview.toDataURL(),
          } as IImei)
        }
      }

      // Now set the source of the image that we want to load
      if (Quagga.canvas.dom.image instanceof HTMLCanvasElement) {
        image.src = Quagga.canvas.dom.image.toDataURL()
      }
    }
  }

  const destroy = () => {
    try {
      Quagga.stop()
    } catch (error) {
      console.log(error)
    }
  }
  const [{ success, message }, setSubmitState] = useState({
    loading: false,
    success: false,
    message: '',
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value?.trim()) return
    setSubmitState({
      loading: true,
      success: false,
      message: '',
    })

    setSubmitState({
      loading: true,
      success: true,
      message: 'Código registrado',
    })
  }
  console.log({ success, message })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
    initializeBarcodeScanner()
  }

  useEffect(() => {
    destroy()
 }, [])

  const initializeBarcodeScanner = async () => {
    try {
      setLoading(true)
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: scannerRef.current as HTMLElement,
            constraints: {
              facingMode: 'environment',
              width: 960,
              height: 430,
            },
          },
          locator: {
            patchSize: 'medium',
            halfSample: true,
          },
          numOfWorkers: 2,
          frequency: 10,
          decoder: {
            readers: [
              {
                format: 'code_128_reader',
                config: {
                  supplements: [],
                },
              },
            ],
          },
          locate: true,
        },
        function (err) {
          if (err) {
            return
          }
          Quagga.start()
        }
      )

      Quagga.onProcessed(function (result) {
        const drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay
        if (result) {
          const widthAttr = drawingCanvas.getAttribute('width')
          const heightAttr = drawingCanvas.getAttribute('height')
          if (result.boxes) {
            if (widthAttr && heightAttr) {
              const width = parseInt(widthAttr)
              const height = parseInt(heightAttr)
              drawingCtx.clearRect(0, 0, width, height)
            }
            result.boxes
              .filter(function (box) {
                return box !== result.box
              })
              .forEach(function (box) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                  color: 'green',
                  lineWidth: 2,
                })
              })
          }
          const verifyResult =
            result.codeResult && Boolean(result.codeResult.code)
          if (verifyResult) {
            Quagga.ImageDebug.drawPath(
              result.line,
              { x: 'x', y: 'y' },
              drawingCtx,
              { color: 'red', lineWidth: 3 }
            )
          }
        }
      })

      Quagga.onDetected(function (result) {
        debounce(() => onDetectedImei(result), 200)
      })
      setLoading(false)

      return destroy
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const onHideModal = () => {
    setOpenModal(false)
    setCropOpen(false)
    setImeiScanned([])
    if (openModal) {
      destroy()
    }
  }

  const onCaptureScan = () => {
    const fileInput = document.createElement('input')
    fileInput.id = `${Math.random()}`
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.capture = ''
    fileInput.style.position = 'fixed'
    document.body.appendChild(fileInput)
    fileInput.onchange = function (event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files) {
        selectImage(target.files)
      }
      document.body.removeChild(fileInput)
    }
    fileInput.click()
  }
  const [image, setImage] = useState('')

  const selectImage = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setCropOpen(true)
    const file = files[0]
    const fileURL = URL.createObjectURL(file)
    setImage(fileURL)
    processImage(fileURL)
  }

  const processImage = (fileURL: string) => {
    try {
      Quagga.decodeSingle(
        {
          decoder: {
            readers: ['code_128_reader'],
          },
          locate: true,
          src: fileURL,
        },
        function (result) {
          if (result.codeResult) {
            console.log('result', result.codeResult.code)
          } else {
            console.log('not detected')
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleSendImei = (): void => {
    if (selectedImei?.code === '') return
    onHideModal()
    return setValue(selectedImei?.code)
  }

  const onSelected = (imei: IImei) => {
    setSelectedImei(imei)
  }
  interface CropperRefType {
    cropper: Cropper | null
  }
  const cropperRef = useRef<CropperRefType>(null)

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas()
      if (croppedCanvas) {
        processImage(croppedCanvas.toDataURL())
      }
    }
  }

  const goToTermsAndCondition = () => {
    window.location.pathname = '/firmar-contrato';
    window.location.assign('/firmar-contrato');
  }

  return (
    <React.Fragment>
      <AwesomeModal
        buttons={[
          { primary: false, text: 'Cancelar', onClick: () => onHideModal() },
          {
            primary: false,
            text: 'Desde Imagen',
            onClick: () => onCaptureScan(),
          },
          { primary: true, text: 'Aceptar', onClick: () => handleSendImei() },
        ]}
        show={openModal}
        padding='0'
        title='Acerca el código de barras a la pantalla para su escaneo'
        iconSize={48}
        header={true}
        height='642px'
        customHeight='calc(642px - 200px)'
        footer={true}
        onHide={() => {
          onHideModal()
        }}
        size='961px'
        headerColor='var(--color-primary-green2)'
        iconColor='var(--color-icons-white)'
        justifyButtons='end'
      >
        {cropOpen ? (
          <Cropper
            ref={cropperRef as unknown as React.RefObject<Cropper>}
            style={{ height: 400, width: '100%' }}
            zoomTo={1 / 100}
            initialAspectRatio={cropperOptions.initialAspectRatio || 3 / 4}
            preview=''
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={() => {
              return
            }}
            guides={false}
            center={false}
            cropBoxResizable={cropperOptions.cropBoxResizable}
            dragMode='move'
            crop={onCrop}
            cropBoxMovable={cropperOptions.cropBoxMovable}
          />
        ) : (
          <div ref={scannerRef} className={styles['component-scanner']} />
        )}
        <ImeiCapture
          selectedImei={selectedImei}
          imeiScanned={imeiScanned}
          onSelected={onSelected}
        />
        {loading && <div>Loading...</div>}
      </AwesomeModal>
      <TeamRegisterView
        handleClick={handleOpenModal}
        name='imei'
        success={success}
        message={message}
        setSubmitState={setSubmitState}
        goToTermsAndCondition={goToTermsAndCondition}
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </React.Fragment>
  )
}
