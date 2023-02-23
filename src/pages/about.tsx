import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold mb-8">About Me</h1>
        <div className="block rounded-lg overflow-hidden shadow-md p-3">
          <h1 className="text-l">
            Welcome to my portfolio! I am a computer science student at the
            University of Delaware and I am passionate about problem solving and
            exploring new technologies. I am set to graduate in 2026, and I am
            eager to use my skills and knowledge to create innovative solutions
            to complex problems.
            <br></br>
            In addition to my studies, I have a wide range of hobbies that keep
            me engaged and motivated. I am an avid sailor, scuba diver, and
            mountain biker, and I love to explore new places and challenge
            myself physically. I am also passionate about audio engineering,
            particually live sound, frequently working in a theatrical setting.
            <br></br>As a member of the sailing team, I have learned valuable
            teamwork and leadership skills that I believe will translate well to
            my career in computer science. I also enjoy spending time in the
            MakerGym, a tinkering space at the University of Delaware, where I
            can apply my problem-solving skills to real-world challenges and
            create functional prototypes.
            <br></br>I am excited to share my portfolio with you and showcase my
            projects, skills, and experiences. Whether you are an employer,
            fellow student, or simply someone interested in my work, I hope you
            find my portfolio informative and inspiring. Thank you for your
            interest, and please don't hesitate to reach out if you have any
            questions or comments.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default About;
