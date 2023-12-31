import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LazyLoad from 'react-lazy-load';
import { useInView } from "react-intersection-observer";
import Experiences from "./Experiences"; // Rename the import to match the component's file name

function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]); // Move experience state to the Skills component

  async function fetchData() {
    try {
      const skillsResponse = await fetch('https://script.google.com/macros/s/AKfycbxL_LuQfIpdix6NX4gOVihw0HvQB3mGMX3KAvATCQV-kj03e7i0UrjIJzoH62WrBzzCew/exec');
      const experienceResponse = await fetch('https://script.google.com/macros/s/AKfycbzqljs0bg34RZ93o06gLybwz89Fj5sZOjS2DLlCFo4zbANT4wWy5t019PpS1aCIEWlpog/exec');

      // if (!skillsResponse.ok || !experienceResponse.ok) {
      //   throw new Error('Network response was not ok');
      // }

      const skillsData = await skillsResponse.json();
      const experienceData = await experienceResponse.json();

      setSkills(skillsData);
      setExperience(experienceData);
    } catch (error) {
      // Handle the error
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <div className="w-10/12 mx-auto py-16">
        <motion.h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-14"
        ref={ref}
        initial={{ x: '-400px', opacity: 0 }} // Start position
        animate={inView ? { x: 0, opacity: 1} : { x: '-200px'}} // Slide in when inView is true
        transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 150, damping: 15}}
        >
          Skills &<br /> Experience
        </motion.h1>
        <div className="flex gap-4 h-80">
          <div className="skills flex flex-wrap justify-between gap-4 w-3/6 scroll-smooth overflow-y-auto">
          {skills.map(skill => (
              <div key={skill.Name} className="w-40 text-center">
                <LazyLoad offset={600}>
                <img
                  src={skill.Image}
                  alt={skill.Name}
                  className="mx-auto object-contain cursor-pointer w-14 h-14 md:w-auto md:h-auto"
                />
                </LazyLoad>
                <span>{skill.Name}</span>
              </div>
            ))}
          </div>
          <div className="exp w-3/6 flex flex-col gap-2 overflow-y-auto overscroll-contain">
            <Experiences experience={experience} /> {/* Pass experience data as a prop */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
