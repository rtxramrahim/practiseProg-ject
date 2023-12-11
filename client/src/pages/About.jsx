import React from 'react'
import home from '../assets/home2.jpg'
import Footer from '../component/Footer'
function About() {
  return (
    <div>
       <div className=' mx-auto mt-4 p-10'>
      <div className='max-w-6xl mx-auto'>
      <h1 className='text-bold text-slate-800 text-3xl text-center'>About realEstate.com</h1>
      
      <p className='mb-4 text-slate-700 mt-5'>
      For years, millions of home shoppers have turned to realEstate.com to find their dream home. 
      Operated by Move Inc realEstate.com offers a comprehensive list of for-sale properties, as well as 
      the information and tools to make informed real estate decisions. Today, more than ever, realEstate.com is The Home of Home Search.
      realEstate.com also offers homeowners a bevy of useful tools and resources through the My Home dashboard. My Home dashboard allows 
      property owners to manage their home like the important investment it is by tracking their homes value over time, 
      researching and managing home improvements, and scouting other similar properties in the neighborhood.
      </p>
      
      <p className='mb-4 text-slate-700'>With intuitive search filters and detailed property listings, finding the perfect space has never been easier. 
        Dive into comprehensive descriptions, 
      vibrant photo galleries, and virtual tours that offer an in-depth view of each property's amenities, location, and unique features.
      </p>
      
      <p className='text-slate-700 mb-4'>Our platform goes beyond listings, providing valuable insights into local neighborhoods, market trends, and property values. 
      We aim to empower you with the knowledge needed to make informed decisions in your real estate journey.
      </p>
      
      <p className='mb-4 text-slate-700'>At realEstate.com, we prioritize your convenience and satisfaction. Our user-friendly interface,
       coupled with personalized recommendations and expert guidance
       from seasoned real estate professionals, ensures a seamless and fulfilling experience from search to purchase.
       </p>
      
      <p className='mb-4 text-slate-700'>Whether you're a seasoned investor, a first-time homebuyer, or a seller looking to showcase your property,
      realEstate.com is your trusted companion in the realm of real estate.
        Join our vibrant community and embark on a journey towards finding the perfect place to call home.</p>

      <div>
        {/* <img src={home} className='r '/> */}
        <p className='text-2xl text-slate-800'>No matter what stage of the <span className='text-red-700 underline italic '>home journey</span> you may be in, were here to empower you by making all things home <span className=''>simple, efficient, and enjoyable</span>.</p>
      </div>
      </div>

      
    </div>
    <Footer></Footer>
    </div>
  )
}

export default About