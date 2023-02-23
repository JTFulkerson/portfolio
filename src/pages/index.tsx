import React from 'react';
import Navbar from '../components/Navbar';
import Headshot from '../images/headshot.png';
import Email from '../icons/email.svg';
import Github from '../icons/github.svg';
import Linkedin from '../icons/linkedin.svg';
import Instagram from '../icons/instagram.svg';
import Twitter from '../icons/twitter.svg';
import Facebook from '../icons/facebook.svg';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="py-12 px-12">
        <div className="grid grid-flow-col">
          <img src={Headshot} alt="" className="w-[40vw]"></img>
          <div className="flex justify-center items-center">
            <div className="">
              <h1 className="text-left text-[8vw] leading-none">John</h1>
              <h1 className="text-left text-[8vw] leading-none">Fulkerson</h1>
              <h2 className="text-left text-[1.8vw] pb-3">
                BS Computer Science | University of Delaware ’26
              </h2>
              <div className="grid grid-flow-col">
                <a href="mailto:johnfulky@mac.com">
                  <img src={Email} alt="" className="pr-2"></img>
                </a>
                <a href="https://github.com/JTFulkerson">
                  <img src={Github} alt="" className="pr-2"></img>
                </a>
                <a href="https://www.linkedin.com/in/jtfulkerson/">
                  <img src={Linkedin} alt="" className="pr-2"></img>
                </a>
                <a href="https://www.instagram.com/jt_fulkerson/">
                  <img src={Instagram} alt="" className="pr-2"></img>
                </a>
                <a href="https://twitter.com/JT_Fulkerson">
                  <img src={Twitter} alt="" className="pr-2"></img>
                </a>
                <a href="https://www.facebook.com/john.fulkerson.98837/">
                  <img src={Facebook} alt="" className="pr-2"></img>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
