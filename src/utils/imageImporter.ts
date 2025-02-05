import Angular from '../assets/images/angular.svg';
import Ember from '../assets/images/ember.svg';
import NextJS from '../assets/images/nextjs.svg';
import React from '../assets/images/react.svg';
import Svelte from '../assets/images/svelte.svg';
import Vite from '../assets/images/vite.svg';
import Vue from '../assets/images/vue.svg';
import Webpack from '../assets/images/webpack.svg';

interface ImageMap {
  [key: string]: string;
}

const imageMap: ImageMap = {
  'angular.svg': Angular,
  'ember.svg': Ember,
  'nextjs.svg': NextJS,
  'react.svg': React,
  'svelte.svg': Svelte,
  'vite.svg': Vite,
  'vue.svg': Vue,
  'webpack.svg': Webpack,
};

export default Object.keys(imageMap);

export const getImage = (fileName: string): string => {
  return imageMap[fileName];
};