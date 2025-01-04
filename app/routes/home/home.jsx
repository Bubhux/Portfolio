// app/routes/home/home.jsx
import { useEffect, useRef, useState } from 'react';

import { Intro } from './intro';
import { Profile } from './profile';
import { Skills } from '~/components/skills';
import { Footer } from '~/components/footer';
import { ProjectSummary } from '~/components/project-summary';
import { baseMeta } from '~/utils/meta';

import laptopCRM from '~/assets/img-projects/laptop-crm-grey.svg';
import laptopTodo from '~/assets/img-projects/laptop-todo-grey.svg';
import laptopGlobe from '~/assets/img-projects/laptop-globe-grey.svg';
import svgPython from '~/assets/img-cards/Python.svg';
import svgMySQL from '~/assets/img-cards/MySQL.svg';
import svgDjango from '~/assets/img-cards/Django.svg';
import svgReact from '~/assets/img-cards/React.svg';
import svgBootstrap from '~/assets/img-cards/Bootstrap.svg';
import svgSASS from '~/assets/img-cards/SASS.svg';
import svgThree from '~/assets/img-cards/Three.js.svg';

import config from '~/config.json';
import styles from './home.module.css';


// Prefetch draco decoader wasm
export const links = () => {
    return [
        {
            rel: 'prefetch',
            href: '/draco/draco_wasm_wrapper.js',
            as: 'script',
            type: 'text/javascript',
            importance: 'low',
        },
        {
            rel: 'prefetch',
            href: '/draco/draco_decoder.wasm',
            as: 'fetch',
            type: 'application/wasm',
            importance: 'low',
        },
    ];
};

export const meta = () => {
    return baseMeta({
        title: 'Developer Full-Stack',
        description: `Design portfolio of ${config.name} — develops applications and web apps.`,
    });
};

export const Home = () => {
    const [visibleSections, setVisibleSections] = useState([]);
    const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
    const intro = useRef();
    const skills = useRef();
    const projectOne = useRef();
    const projectTwo = useRef();
    const projectThree = useRef();
    const details = useRef();

    useEffect(() => {
        const sections = [intro, skills, projectOne, projectTwo, projectThree, details];

        const sectionObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const section = entry.target;
                        observer.unobserve(section);
                        if (visibleSections.includes(section)) return;
                        setVisibleSections(prevSections => [...prevSections, section]);
                    }
                });
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
        );

        const indicatorObserver = new IntersectionObserver(
            ([entry]) => {
                setScrollIndicatorHidden(!entry.isIntersecting);
            },
            { rootMargin: '-100% 0px 0px 0px' }
        );

        sections.forEach(section => {
            if (section.current) {  // Vérification que le ref est bien défini
                sectionObserver.observe(section.current);
            }
        });

        if (intro.current) {  // Vérification que intro est bien défini
            indicatorObserver.observe(intro.current);
        }

        return () => {
            sectionObserver.disconnect();
            indicatorObserver.disconnect();
        };
    }, [visibleSections]);

    return (
        <div className={styles.home}>
            <Intro
                id="intro"
                sectionRef={intro}
                scrollIndicatorHidden={scrollIndicatorHidden}
            />
            <Skills
                id="skills"
                sectionRef={skills}
                visible={visibleSections.includes(skills.current)}
                title="Enhancing Skills for the Future"
                description="My most frequently used tools for development, which help me stay productive and efficient in the field of software development and beyond."
                buttonText="View official documentation"
            />
            <ProjectSummary
                id="project-1"
                sectionRef={projectOne}
                visible={visibleSections.includes(projectOne.current)}
                index={1}
                title="Developing a Business CRM"
                description="Creating a comprehensive CRM system to streamline business operations and enhance customer relationships"
                buttonText="View project"
                buttonLink="/projects/crm"

                cardTitle="CRM Application"
                imgPath={laptopCRM}
                cardDescription="Building a customer relationship management system to manage client interactions, track sales, and automate workflows."
                svgBadge={
                    <>
                        <img src={svgPython} alt="Python Logo" />
                        <img src={svgMySQL} alt="MySQL Logo" />
                        <img src={svgDjango} alt="Django Logo" />
                    </>
                }
                ghLink="https://github.com/Bubhux/CRM-App"
                particlesActive={false}
            />
            <ProjectSummary
                id="project-2"
                sectionRef={projectTwo}
                visible={visibleSections.includes(projectTwo.current)}
                index={2}
                title="Todo List with Calendar Integration"
                description="Designing and developing a todo list app."
                buttonText="View project"
                buttonLink="https://todo-calendar.com"

                cardTitle="Todo List Calendar Application"
                imgPath={laptopTodo}
                cardDescription="Designing and developing a todo list app with integrated calendar features to help users organize tasks and schedule events efficiently."
                svgBadge={
                    <>
                        <img src={svgReact} alt="React Logo" />
                        <img src={svgBootstrap} alt="Bootstrap Logo" />
                        <img src={svgSASS} alt="SASS Logo" />
                    </>
                }
                ghLink="https://github.com/Bubhux/App-TodoListCalendar"
                demoLink="https://bubhux.github.io/App-TodoListCalendar/"
                particlesActive={false}
            />
            <ProjectSummary
                id="project-3"
                sectionRef={projectThree}
                visible={visibleSections.includes(projectThree.current)}
                index={3}
                title="Create an interactive 3D globe"
                description="Design a visually appealing, interactive 3D globe to add to your creative work and professional projects."
                buttonText="View project"
                buttonLink="/projects/portfolio-design"

                cardTitle="3D Globe Application"
                imgPath={laptopGlobe}
                cardDescription="Create a visually captivating and highly interactive 3D globe that enhances the aesthetics and functionality of your creative work."
                svgBadge={
                    <>
                        <img src={svgReact} alt="React Logo" />
                        <img src={svgThree} alt="Three.js Logo" />
                    </>
                }
                ghLink="https://github.com/Bubhux/3d-globe"
                demoLink="https://bubhux.github.io/Projet-Web-HTML-CSS/"
                particlesActive={false}
            />
            <Profile
                sectionRef={details}
                visible={visibleSections.includes(details.current)}
                id="details"
            />
            <Footer />
        </div>
    );
};
