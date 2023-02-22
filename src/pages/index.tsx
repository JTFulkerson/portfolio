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
      <div className="mx-auto py-12 px-12">
        <div className="grid grid-flow-col">
          <img src={Headshot} alt="" className="w-[40vw]"></img>
          <div className="h-[10vh] w-[40vw]">
            <h1 className="text-left text-[7vw]">John</h1>
            <h1 className="text-left text-[7vw]">Fulkerson</h1>
            <h2 className="text-left text-[1.8vw] pb-3">
              BS Computer Science | University of Delaware ’26
            </h2>
            <div className="grid grid-flow-col">
              <img src={Email} alt=""></img>
              <img src={Github} alt=""></img>
              <img src={Linkedin} alt=""></img>
              <img src={Instagram} alt=""></img>
              <img src={Twitter} alt=""></img>
              <img src={Facebook} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
