import { IProcessedStyleSet, styled } from "@fluentui/react"
import { IAppStyles, getAppStyles, getClassNames } from "./App.styles"
import { default as star } from './assets/star.svg'
import { default as searchIcon } from './assets/searchIcon.svg'
import { useEffect } from "react"
import { Reviews } from './utils'

//Figma link https://www.figma.com/file/5xJN6VLkOGYXw9sBixYXYl/day_1573?type=design&node-id=1-2&mode=design&t=sq98vLp7u1uonZCk-0


const App = (props: any) => {
  const { styles, theme } = props
  const classNames: IProcessedStyleSet<IAppStyles> = getClassNames(styles, { theme })
  let totalReviews = 0
  useEffect(() => {

    const averageReviewElement = document.querySelector('[data-average-review]') as HTMLDivElement

    totalReviews = Object.values(Reviews).reduce((sum, value) => {
      return sum + value
    }, 0)

    const averageReview = Object.entries(Reviews).reduce((sum, [key, value]) => {
      return sum + parseInt(key) * value
    }, 0) / totalReviews

    averageReviewElement.textContent = (Math.round(averageReview * 10) / 10).toString()

    //Generare Review Reaiting Design Dynamically.
    generateReviewRatingDesign();


    //Show count on Animation.
    requestAnimationFrame(showCountonAnimation)

  }, [])

  let timeoffset: number
  const duration = 500
  let currentValue
  const showCountonAnimation = (time: number) => {
    if (timeoffset !== null && timeoffset !== undefined) {
      const timeElapsed = time - timeoffset
      const countElements = document.querySelectorAll('[data-end-value]')
      countElements.forEach((element: any) => {
        const endValue = element.dataset.endValue
        currentValue = Math.min(Math.round((endValue * timeElapsed) / duration), endValue)
        element.textContent = currentValue;
        // (element?.previousSibiling as HTMLDivElement) && (element?.previousSibiling as HTMLDivElement).style.setProperty('--progressbarWidth', `${(currentValue / totalReviews) * 100}%`)
      })

      if (timeElapsed >= duration) return
      requestAnimationFrame(showCountonAnimation)
    }
    else {
      timeoffset = time
      requestAnimationFrame(showCountonAnimation)
    }
  }


  const generateReviewRatingDesign = () => {

    const reviewStarSectionRoot = document.querySelector('[data-review-star-sectionroot]') as HTMLDivElement
    reviewStarSectionRoot.innerHTML = ''

    Object.entries(Reviews).sort(([a], [b]) => { return parseInt(b) - parseInt(a) }).forEach(([key, value]) => {

      const ratingelement = document.createElement('span')
      ratingelement.textContent = key.toString()
      reviewStarSectionRoot.append(ratingelement)

      const ratingImageElement = document.createElement('img') as HTMLImageElement
      ratingImageElement.src = `${star}`
      ratingImageElement.alt = 'star rating icon'
      reviewStarSectionRoot.append(ratingImageElement)

      const reviewProgressBarElement = document.createElement('div')
      reviewProgressBarElement.classList.add(`${classNames.reviewRatingProgress}`)
      // reviewProgressBarElement.dataset.progressBarWidth = (value - value).toString()
      reviewProgressBarElement.style.setProperty('--progressbarWidth', `${(value / totalReviews) * 100}%`)
      reviewStarSectionRoot.append(reviewProgressBarElement)

      const ratingQuantityelement = document.createElement('span')
      ratingQuantityelement.textContent = (value - value).toString()
      ratingQuantityelement.dataset.endValue = value.toString()
      reviewStarSectionRoot.append(ratingQuantityelement)


    })


    // <span>5</span>
    // <img src={star} alt="startIcon"></img>
    // <div className={classNames.reviewRatingProgress}></div>
    // <span>106</span>
  }
  return (
    <div className={classNames.pageRoot}>
      <section className={classNames.root}>
        <header className={classNames.reviewHeader}>
          <div className={classNames.reviewheaderTitle}>
            <span>What others think about the Product</span>
          </div>
          <div className={classNames.averageRatingRoot}>
            <div className={classNames.avergeRatingHeader}>
              <div className={classNames.ratingStarIcon}>
                <img src={star} ></img>
              </div>
              <div className={classNames.reviewRatingValue} data-average-review>4.8</div>
            </div>
            <div className={classNames.reviewAverageRatingText}>Average Customer Rating</div>
          </div>
        </header>
        <main className={classNames.mainRoot}>
          <div className={classNames.reviewSearchTopics}>
            <img src={searchIcon} alt="search Icon"></img>
            <input type="text" placeholder="Search topics and reviews" />
          </div>
          <div className={classNames.reviewStarSectionRoot}>
            <div>Reviews</div>
            <div className={classNames.reviewRatingGrid} data-review-star-sectionroot>
              {/* <span>5</span>
              <img src={star} alt="startIcon"></img>
              <div className={classNames.reviewRatingProgress}></div>
              <span>106</span>
              <span>4</span>
              <img src={star} alt="startIcon"></img>
              <div className={classNames.reviewRatingProgress}></div>
              <span>32</span>
              <span>3</span>
              <img src={star} alt="startIcon"></img>
              <div className={classNames.reviewRatingProgress}></div>
              <span>0</span>
              <span>2</span>
              <img src={star} alt="startIcon"></img>
              <div className={classNames.reviewRatingProgress}></div>
              <span>0</span>
              <span>1</span>
              <img src={star} alt="startIcon"></img>
              <div className={classNames.reviewRatingProgress}></div>
              <span>0</span> */}
            </div>
          </div>
        </main>
        <footer>
          <button className={classNames.writeaReviewButton}>Wriate a Review</button>
        </footer>
      </section>
    </div>
  )
}

export const StyledAppC = styled(App, getAppStyles)
