import React from 'react'
import './home.css'
import Navbar from '../../components/Navbar/Navbar'
import img1 from '../../assets/boy_studying.png'
import card1 from '../../assets/card_img1.png'
import card2 from '../../assets/card_img2.png'
import card3 from '../../assets/card_img3.png'
import sec4img from '../../assets/sec4img.png'
import Airform from 'react-airform'
import Footer from '../../components/Footer/Footer'
import FeaturedCourses from '../../components/FeaturedCourses/FeaturedCourses'

const home = () => {
    return (
        <div>
            <Navbar />
            <section className='hero'>
                <div class="hero-header">
                    <h1 class="header1">Learn<span>ED.</span></h1>
                    <br />
                    <p class="header2">Fixing your skills loopholes.</p>
                </div>
                <img src={img1} />
            </section>
            <section className="sec2">
                <div className="wrapper">
                    <h2>Join the LearnED Revolution!</h2>
                </div>
                <div className="row">
                    <div className="col">
                        <p>Experience innovative learning techniques designed to captivate and engage.
                            Our unique blend of subjects and courses will keep you hooked and hungry for more.</p>
                    </div>
                    <div className="col">
                        <p>Our platform is the brainchild of the world’s leading educators, and we’re proud to be changing lives every day.
                            Dive head-first into the future of learning, and never look back!</p>
                    </div>
                </div>
            </section>
            <FeaturedCourses/>
            <section className="sec3">
                <div className="cards">
                    <h2>Why LearnED.?</h2>
                    <div className="card">
                        <div className="content">
                            <img src={card1} />
                        </div>
                        <div className="content">
                            <h2>50+ Online Personalised Curated Courses To Choose</h2>
                        </div>
                    </div>
                    <div className="card">
                        <div className="content">
                            <h2 class>1000+ Students Success Stories</h2>
                        </div>
                        <div className="content">
                            <img src={card2} />
                        </div>
                    </div>
                    <div className="card">
                        <div className="content">
                            <img src={card3} />
                        </div>
                        <div className="content">
                            <h2>99% Success Ratio With Collaborative Learning</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sec4">
                <h2>Ready to kickstart your journey through Learn<span>ED.</span>?</h2>
                <div className="buttons">
                    <a href="#"> Sign Up Now </a>
                </div>
                <img src={sec4img} />
            </section>

            <section className="contact">
                <h2>Got Questions?</h2>
                <br />

                <div className="contact-container">
                    <h2 className="contact-title">Contact Us</h2>
                    <Airform email="raghuvanshivaibhav01@gmail.com">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message"></textarea>
                        </div>
                        <div className="form-group">
                            <button>Send</button>
                        </div>
                    </Airform>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default home