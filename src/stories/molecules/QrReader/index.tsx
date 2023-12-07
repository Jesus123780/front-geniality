import { QrReader as  QrReaderDependencies } from 'react-qr-reader'

export const QrReader = ({
    setData = (res: unknown) => { return res },
}) => {
  return (
    <div>
          <div style={{ width: '400px' }}>
        <QrReaderDependencies
          constraints={{
            facingMode: 'environment',
            width: 400,
            height: 400,
           }}
          onResult={(result, error) => {
            if (result) {
              setData(result);
            }

            if (error) {
              console.info(error);
            }
          }}
        />
      </div>
    </div>
  )
}
