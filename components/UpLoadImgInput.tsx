import * as React from 'react'

interface IUploadImage {
  updateFunction: (file: Blob | null, index?: number) => void
  file: Blob | null
  index?: number
}

export default function UpLoadImgInput({
  updateFunction,
  file,
  index,
}: IUploadImage) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const [img, setImg] = React.useState<Blob | null>(null)

  React.useEffect(() => {
    if (canvasRef && canvasRef.current) {
      let ctx = canvasRef.current.getContext('2d')
      ctx && ctx.clearRect(0, 0, 200, 200)
    }
  }, [])

  React.useEffect(() => {
    if (file) {
      setImg(file)
    }
  }, [])

  React.useEffect(() => {
    if (img && canvasRef && canvasRef.current) {
      let ctx = canvasRef.current.getContext('2d')
      const _img = new Image()
      _img.onload = () => {
        let compressRatio = _img.height / 200
        let sWidth = 200 * compressRatio,
          sHeight = 200 * compressRatio
        let sx = (_img.width - sWidth) / 2
        ctx && ctx.drawImage(_img, sx, 0, sWidth, sHeight, 0, 0, 200, 200)
      }
      _img.src = URL.createObjectURL(img)
    }
  }, [img])

  // function ConvertToBase64(file: Blob) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onload = () => resolve(reader.result)
  //     reader.onerror = error => reject(error)
  //   })
  // }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target as HTMLInputElement
    if (files) {
      setImg(files[0])
      if (typeof index === 'number') {
        updateFunction(files[0], index)
      } else {
        updateFunction(files[0])
      }
    } else {
      return
    }
  }

  return (
    <>
      <div className='tt-mx-5 tt-h-36 tt-w-full tt-min-w-[16rem] tt-border-2 tt-border-slate-900 tt-bg-slate-400'>
        <div className='tt-m-auto tt-h-full tt-w-48 tt-border-r-2 tt-border-l-2 tt-border-slate-900 tt-bg-white'>
          <div className='tt-d-flex tt-relative tt-w-full tt-justify-center'>
            <canvas
              width={200}
              height={200}
              className='tt-absolute tt-max-h-[140px] tt-w-48'
              ref={canvasRef}
            ></canvas>
            {img === null && (
              <>
                <div className='tt-text-center'>點此選擇圖片</div>
              </>
            )}
          </div>
        </div>
      </div>
      <input
        type='file'
        accept='image/*'
        className='tt-mx-5 tt-hidden'
        name='image'
        onChange={handleImageUpload}
      />
    </>
  )
}
