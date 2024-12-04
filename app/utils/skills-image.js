// apps/utils/skills-image.js

import * as adobeXd from '~static/svg/skills/adobe-xd.svg';
import adobeaudition from '~static/svg/skills/adobeaudition.svg';
import afterEffects from '~static/svg/skills/after-effects.svg';
import angular from '~static/svg/skills/angular.svg';
import aws from '~static/svg/skills/aws.svg';
import azure from '~static/svg/skills/azure.svg';
import blender from '~static/svg/skills/blender.svg';
import bootstrap from '~static/svg/skills/bootstrap.svg';
import bulma from '~static/svg/skills/bulma.svg';
import c from '~static/svg/skills/c.svg';
import canva from '~static/svg/skills/canva.svg';
import capacitorjs from '~static/svg/skills/capacitorjs.svg';
import coffeescript from '~static/svg/skills/coffeescript.svg';
import cplusplus from '~static/svg/skills/cplusplus.svg';
import csharp from '~static/svg/skills/csharp.svg';
import css from '~static/svg/skills/css.svg';
import dart from '~static/svg/skills/dart.svg';
import deno from '~static/svg/skills/deno.svg';
import django from '~static/svg/skills/django.svg';
import docker from '~static/svg/skills/docker.svg';
import fastify from '~static/svg/skills/fastify.svg';
import figma from '~static/svg/skills/figma.svg';
import firebase from '~static/svg/skills/firebase.svg';
import flutter from '~static/svg/skills/flutter.svg';
import gcp from '~static/svg/skills/gcp.svg';
import gimp from '~static/svg/skills/gimp.svg';
import git from '~static/svg/skills/git.svg';
import go from '~static/svg/skills/go.svg';
import graphql from '~static/svg/skills/graphql.svg';
import haxe from '~static/svg/skills/haxe.svg';
import html from '~static/svg/skills/html.svg';
import illustrator from '~static/svg/skills/illustrator.svg';
import ionic from '~static/svg/skills/ionic.svg';
import java from '~static/svg/skills/java.svg';
import javascript from '~static/svg/skills/javascript.svg';
import julia from '~static/svg/skills/julia.svg';
import kotlin from '~static/svg/skills/kotlin.svg';
import lightroom from '~static/svg/skills/lightroom.svg';
import markdown from '~static/svg/skills/markdown.svg';
import materialui from '~static/svg/skills/materialui.svg';
import matlab from '~static/svg/skills/matlab.svg';
import memsql from '~static/svg/skills/memsql.svg';
import microsoftoffice from '~static/svg/skills/microsoftoffice.svg';
import mongoDB from '~static/svg/skills/mongoDB.svg';
import mysql from '~static/svg/skills/mysql.svg';
import nextJS from '~static/svg/skills/nextJS.svg';
import nginx from '~static/svg/skills/nginx.svg';
import numpy from '~static/svg/skills/numpy.svg';
import nuxtJS from '~static/svg/skills/nuxtJS.svg';
import opencv from '~static/svg/skills/opencv.svg';
import photoshop from '~static/svg/skills/photoshop.svg';
import php from '~static/svg/skills/php.svg';
import picsart from '~static/svg/skills/picsart.svg';
import postgresql from '~static/svg/skills/postgresql.svg';
import premierepro from '~static/svg/skills/premierepro.svg';
import python from '~static/svg/skills/python.svg';
import pytorch from '~static/svg/skills/pytorch.svg';
import react from '~static/svg/skills/react.svg';
import ruby from '~static/svg/skills/ruby.svg';
import selenium from '~static/svg/skills/selenium.svg';
import sketch from '~static/svg/skills/sketch.svg';
import strapi from '~static/svg/skills/strapi.svg';
import svelte from '~static/svg/skills/svelte.svg';
import swift from '~static/svg/skills/swift.svg';
import tailwind from '~static/svg/skills/tailwind.svg';
import tensorflow from '~static/svg/skills/tensorflow.svg';
import typescript from '~static/svg/skills/typescript.svg';
import unity from '~static/svg/skills/unity.svg';
import vitejs from '~static/svg/skills/vitejs.svg';
import vue from '~static/svg/skills/vue.svg';
import vuetifyjs from '~static/svg/skills/vuetifyjs.svg';
import webix from '~static/svg/skills/webix.svg';
import wolframalpha from '~static/svg/skills/wolframalpha.svg';
import wordpress from '~static/svg/skills/wordpress.svg';


export const skillsImage = (skill) => {
    const skillID = skill.toLowerCase();
    switch (skillID) {
        case 'gcp':
            return gcp;
        case 'html':
            return html;
        case 'photoshop':
            return photoshop;
        case 'docker':
            return docker;
        case 'illustrator':
            return illustrator;
        case 'adobe xd':
            return adobeXd;
        case 'after effects':
            return afterEffects;
        case 'css':
            return css;
        case 'angular':
            return angular;
        case 'javascript':
            return javascript;
        case 'next js':
            return nextJS;
        case 'nuxt js':
            return nuxtJS;
        case 'react':
            return react;
        case 'svelte':
            return svelte;
        case 'typescript':
            return typescript;
        case 'vue':
            return vue;
        case 'bootstrap':
            return bootstrap;
        case 'bulma':
            return bulma;
        case 'capacitorjs':
            return capacitorjs;
        case 'coffeescript':
            return coffeescript;
        case 'memsql':
            return memsql;
        case 'mongodb':
            return mongoDB;
        case 'mysql':
            return mysql;
        case 'postgresql':
            return postgresql;
        case 'tailwind':
            return tailwind;
        case 'vitejs':
            return vitejs;
        case 'vuetifyjs':
            return vuetifyjs;
        case 'c':
            return c;
        case 'c++':
            return cplusplus;
        case 'c#':
            return csharp;
        case 'dart':
            return dart;
        case 'go':
            return go;
        case 'java':
            return java;
        case 'kotlin':
            return kotlin;
        case 'julia':
            return julia;
        case 'matlab':
            return matlab;
        case 'php':
            return php;
        case 'python':
            return python;
        case 'ruby':
            return ruby;
        case 'swift':
            return swift;
        case 'adobe audition':
            return adobeaudition;
        case 'aws':
            return aws;
        case 'deno':
            return deno;
        case 'django':
            return django;
        case 'firebase':
            return firebase;
        case 'gimp':
            return gimp;
        case 'git':
            return git;
        case 'graphql':
            return graphql;
        case 'lightroom':
            return lightroom;
        case 'materialui':
            return materialui;
        case 'nginx':
            return nginx;
        case 'numpy':
            return numpy;
        case 'opencv':
            return opencv;
        case 'premiere pro':
            return premierepro;
        case 'pytorch':
            return pytorch;
        case 'selenium':
            return selenium;
        case 'strapi':
            return strapi;
        case 'tensorflow':
            return tensorflow;
        case 'webix':
            return webix;
        case 'wordpress':
            return wordpress;
        case 'azure':
            return azure;
        case 'blender':
            return blender;
        case 'fastify':
            return fastify;
        case 'figma':
            return figma;
        case 'flutter':
            return flutter;
        case 'haxe':
            return haxe;
        case 'ionic':
            return ionic;
        case 'markdown':
            return markdown;
        case 'microsoft office':
            return microsoftoffice;
        case 'picsart':
            return picsart;
        case 'sketch':
            return sketch;
        case 'unity':
            return unity;
        case 'wolframalpha':
            return wolframalpha;
        case 'canva':
            return canva;
        default:
            break;
    }
}