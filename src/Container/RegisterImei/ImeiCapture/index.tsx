import { IImei } from '..'
import { RenderImei } from './RenderImei'
import './index.css'

interface IImeiCapture {
  imeiScanned: IImei[]
  selectedImei: IImei
  onSelected: (imei: IImei) => void
}

export const ImeiCapture = ({
  imeiScanned = [],
  onSelected,
  selectedImei,
}: IImeiCapture) => {
  return (
    <div>
      {imeiScanned && imeiScanned.length > 0 && (
        <ul className='barcode-selector__results'>
          {imeiScanned.map((imei: IImei) => {
            const code = imei.code
            return (
              <RenderImei
                key={code}
                {...imei}
                selected={selectedImei?.code === code}
                onSelected={onSelected}
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}
