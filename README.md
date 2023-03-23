# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_

### Screenshot

![](https://i.imgur.com/6mL3Qeo.png)

### Links

- [Solution URL](https://niemal.github.io/frontendmentor_17/)
- [Live Site URL](https://github.com/niemal/frontendmentor_17/)

## My process

### Built with

- [downshift](https://github.com/downshift-js/downshift) - For a combobox and selection baseline
- [react-window](https://github.com/bvaughn/react-window) - For performance optimization and virtualization
- [framer-motion](https://www.framer.com/motion/) - For animations and transitions
- [react](https://reactjs.org/) - JS library
- [styled-components](https://styled-components.com/) - For styles

### What I learned

I implemented `downshift` for the first time and it was a lot of fun. I learned how to implement a very powerful search combobox that is flavored with a cool animation thanks to `framer-motion`. I had to implement `react-window` along with it to avoid the tremendous cluttering that so many items can cause, which leverages a powerful performance. All in all, I enjoyed this challenge!
