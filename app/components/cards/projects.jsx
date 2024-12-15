// app/components/cards/projects.jsx
import React from "react";
import { Cards } from './project-cards';
import laptopTodo from '~/assets/img-projects/laptop-todo.png';
import styles from './cards.module.css';


export function Projects() {
    return (
        <div className={styles.projectSection}>
            <div className={styles.projectCards}>
                <Cards
                    imgPath={laptopTodo}
                    isBlog={false}
                    title="Todo List with Calendar Integration"
                    description="Designing and developing a todo list app with integrated calendar features to help users organize tasks and schedule events efficiently."
                    ghLink="https://github.com/Bubhux/App-TodoListCalendar"
                    demoLink="https://bubhux.github.io/Projet-Web-HTML-CSS/"
                />
            </div>
        </div>
    );
}

export default Projects;
