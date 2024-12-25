// app/routes/home/home.jsx
import { useEffect, useRef, useState } from 'react';

import { Intro } from './intro';
import { ProjectSummary } from '~/components/project-summary';
import { Skills } from '~/components/skills';
import { baseMeta } from '~/utils/meta';
import { Footer } from '~/components/footer';

//import laptopCRM from '~/assets/img-projects/laptop-crm.png';
//import laptopTodo from '~/assets/img-projects/laptop-todo.png';
//import laptopGlobe from '~/assets/img-projects/laptop-globe.png';

import laptopCRM from '~/assets/img-projects/laptop-crm-grey.svg';
import laptopTodo from '~/assets/img-projects/laptop-todo-grey.svg';
import laptopGlobe from '~/assets/img-projects/laptop-globe-grey.svg';

import config from '~/config.json';
import styles from './home.module.css';


// Prefetch draco decoader wasm
export const links = () => {
    return [
        {
            rel: 'prefetch',
            href: '/static/draco/draco_wasm_wrapper.js',
            as: 'script',
            type: 'text/javascript',
            importance: 'low',
        },
        {
            rel: 'prefetch',
            href: '/static/draco/draco_decoder.wasm',
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

    useEffect(() => {
        const sections = [intro, skills, projectOne, projectTwo, projectThree];

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
                //index={1}
                title="Enhancing Skills for the Future"
                description="Building a toolkit for educators to create effective online learning experiences."
                buttonText="View skills"
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
                ghLink="https://github.com/Bubhux/CRM-App"
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
                ghLink="https://github.com/Bubhux/App-TodoListCalendar"
                demoLink="https://bubhux.github.io/App-TodoListCalendar/"
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
                ghLink="https://github.com/Bubhux/3d-globe"
                demoLink="https://bubhux.github.io/Projet-Web-HTML-CSS/"
            />
            <Footer />
        </div>
    );
};
