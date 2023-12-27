import { ArrowLeft, ArrowRight, CircleDot, Circle } from 'lucide-react';
import { useState } from 'react'
import './ImageSlider.css'
type ImageSliderProps = {
    images: {url:string, alt:string}[]
}
export const ImageSlider = ({ images }: ImageSliderProps): JSX.Element => {
    const [imageIndex, setImageIndex] = useState<number>(0);
    const showPreviousImage = () => {
        setImageIndex(index => {
            if (index === 0) return images.length - 1
            return index - 1
        })
    }
    const showNextImage = () => {
        setImageIndex(index => {
            if (index === images.length - 1) return 0
            return index + 1
        })
    }
    return (
        <section aria-label='Image Slider'  className='root'>
            <a href="#SkipContent" className="skiptoMainContent">Skip to Main content</a>
            <div className='imagesRoot'>
                {images.map(({url, alt}, index) => {
                    return <img src={url} alt={alt} aria-hidden={index !== imageIndex} className='img-slider-img' style={{ translate: `${-100 * imageIndex}%` }}></img>
                })}

            </div>
            <button className='img-slider-btn' type='button' onClick={showPreviousImage} title='' aria-label='View Previous image'>
                <ArrowRight aria-hidden />
            </button>
            <button className='img-slider-btn' type='button' onClick={showNextImage} title=''  aria-label='View next image'>
                <ArrowLeft aria-hidden/>
            </button>
            <div className='img-slider-dot-btn-root'>
                {
                    images.map((_, index) => {
                        return <button onClick={()=>setImageIndex(index)} type='button' aria-label={`Image ${imageIndex + 1}`} className='img-slider-dot-btn'>{index === imageIndex ? <CircleDot aria-hidden /> : <Circle aria-hidden />}</button>
                    })
                }
            </div>
            <div id="SkipContent"></div>
        </section>
    )
}