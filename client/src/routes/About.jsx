import { Button } from 'primereact/button'
import React, { useState} from 'react'
import { Ripple } from 'primereact/ripple';
import AboutFeature0 from '/aboutfeature0.jpg'
import AboutFeature1 from '/aboutfeature1.jpg'
import AboutFeature2 from '/aboutfeature2.png'
import { TabContents, Testimonials} from '../Constants'

const About = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleTabChange = (event, index) => {
    event.preventDefault();
    setActiveIndex(index);
    console.log("Tab Changed" ,index);
  };

  const FeatureTabPic = activeIndex === 0 ? AboutFeature0 : activeIndex === 1 ? AboutFeature1 : AboutFeature2

  return (
    <>
      <div className="relative p-8 overflow-hidden">
        <img src="/aboutpage.jpg" alt="about-hero" className="absolute top-0 left-0 w-auto h-full block md:w-full bg-auto" />
        <div className="text-center my-6 relative">
          <div className="text-6xl sm:text-7xl text-white font-bold mb-1">Your Journey to</div>
          <div className="text-6xl sm:text-7xl text-primary font-bold mb-4">A Healthier You</div>
          <p className="mt-0 mb-4 line-height-3 text-center mx-auto text-white" style={{maxWidth: "700px"}}>
            Your fitness journey starts now. With Fitness Tracker, you'll find the tools, support, and motivation you need to become the healthiest version of yourself.
          </p>
          <Button label='Learn More' severity='primary' />
        </div>
      </div>

      <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div className="text-center font-bold text-primary-600 mb-4">DISCOVER YOUR POTENTIAL</div>
        <div className="text-center font-bold text-900 mb-5 text-4xl">One Simple Platform</div>
        
        <div className="grid">
          <div className="col-12 lg:col-6 flex align-items-center justify-content-center">
            <img src={FeatureTabPic} alt="Image" className="w-full md:w-9" />
          </div>
          <div className="col-12 lg:col-6 mt-5 lg:mt-0">
            <ul className="list-none m-0 p-0">
              {TabContents.map((tabcontent, index) => (
                <li key={index} className={`border-left-3 p-4 cursor-pointer p-ripple ${activeIndex === index ? 'text-primary-900 bg-primary-100 border-primary-500' : 'surface-border'}`} onClick={(e) => handleTabChange(e, index)}>
                  <div className="text-2xl font-semibold">{tabcontent.title}</div>
                  <p className="line-height-3 text-lg">{tabcontent.content}</p>
                  <Ripple />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="surface-ground text-center px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-column md:flex-row">
          {Testimonials.map((testimonial, index) => (
            <div className="flex flex-grow-1 mb-4 md:mb-0 md:px-4 py-4 md:py-0" key={index}>
              <div className="shadow-2 surface-card border-round relative">
                <img src={testimonial.image} width="100" height="100" className="absolute left-50 border-circle" alt="testimonials" style={{marginLeft: "-50px", top: "-50px"}}/>
                <div className="px-4 pb-4 pt-8 relative">
                  <p className="text-900 font-italic line-height-3 text-lg m-0 pb-4 border-bottom-1 surface-border">
                    “{ testimonial.message}”
                  </p>
                  <div className="text-900 font-semibold line-height-3 mt-4">{testimonial.name}</div>
                  <div className="text-600 line-height-3 text-sm">{testimonial.companytitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default About