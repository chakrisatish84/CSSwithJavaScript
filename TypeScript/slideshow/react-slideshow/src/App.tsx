import './App.css'
import img1 from './assets/1.jpg'
import img2 from './assets/2.jpg'
import img3 from './assets/3.jpg'
import img4 from './assets/4.jpg'
import img5 from './assets/5.jpg'
import { ImageSlider } from './components/ImageSlider'

const images = [
  { url: img1, alt:"Img one" },
  { url: img2,  alt:"Img two" },
  { url: img3,  alt:"Img three" },
  { url: img4,  alt:"Img four" },
  { url: img5,  alt:"Img five" }
]

function App() {
  return (
    <div className='appRoot'>
      <ImageSlider images={images} />
      <a href="/" style={{fontSize: '4rem'}}>Link</a>
    </div>
  )
}

export default App
